import STATIONS from '../assets/data/STATIONS_STATIC.json';
import ROUTES from '../assets/data/ROUTES.json';
import ROUTES_BY_KEYS from '../assets/data/ROUTES_BY_KEYS.json';

export function normalizeTrainData(payload) {
    const filteredPayload = filterPayload(payload);
    const trainsById = getTrainsById(filteredPayload);
    const trainsByRoute = getTrainsByRoute(trainsById);
    return { trainsById, trainsByRoute };
};

function getTrainsByRoute(trainsById) {
    const trainsByRoute = {};
    Object.values(trainsById).forEach(train => {
        const route = train.route;
        if (route in trainsByRoute) {
            trainsByRoute[route].push(train.id);
        } else {
            trainsByRoute[route] = [train.id];
        }
    });
    return trainsByRoute;
};

function getTrainsById(payload) {
    const trainsById = {};
    payload.forEach(entity => {
        const trip = entity.tripUpdate.trip;
        const train = {
            id: trip.tripId,
            route: trip.routeId,
            direction: trip.tripId[trip.tripId.length - 1],
            stations: getStations(entity.tripUpdate.stopTimeUpdate)
        };

        const isValidTrain = setMarkerParams(train);
        if (isValidTrain) {
            trainsById[train.id] = train;
        }

    });
    return trainsById;
}

function setMarkerParams(train) {
    const latLngs = [];
    const durations = [];
    const timeNow = Date.now();
    train.stations.forEach((station, idx) => {
        if (timeNow > station.time) {
            return;
        }

        if (idx === 0) {
            const prevStation = findPreviousStopFromRoute(train, station);
            if (prevStation) {
                latLngs.push(prevStation.latLng);
            } else {
                latLngs.push(station.latLng);
            }
            latLngs.push(station.latLng);
            durations.push(station.time - timeNow);
            return;
        }

        const prevStation = stations[idx - 1];
        if (latLngs.length === 0) {
            latLngs.push(prevStation.latLng);
            latLngs.push(station.latLng);
            durations.push(station.time - timeNow);
        } else {
            latLngs.push(station.latLng);
            durations.push(station.time - prevStation.time);
        }
    });

    train.latLngs = latLngs;
    train.durations = durations;

    return latLngs.length > 0;
};

function findPreviousStopFromRoute(train, currentStop) {
    if (currentStop.id in ROUTES_BY_KEYS[train.route]) {
        const direction = train.direction;
        const route = ROUTES[train.route];
        const stopIdx = route.indexOf(currentStop.id);
        if (direction === 'N') {
            if (stopIdx > 0) {
                const prevStopId = route[stopIdx - 1];
                return STATIONS[prevStopId];
            }
        } else {
            if (stopIdx < route.length - 1) {
                const prevStopId = route[stopIdx + 1];
                return STATIONS[prevStopId];
            }
        }
    }
    return false;
}

function getStations(trip) {
    const stations = {};
    for (let i = 0; i < trip.length; i++) {
        const stop = trip[i];
        const stationId = getParentStopId(stop.stopId);
        if (stationId) {
            const timeObj = stop.arrival || stop.departure;
            const time = parseInt(timeObj.time, 10) * 1000;
            stations.push({
                id: stationId,
                latLng: getStationLatLng(stationId),
                time,
            });
        }
    }
    return stations;
}

function filterPayload(payload) {
    const timeNow = Date.now();
    return payload.filter(entity => {
        const tripUpdate = entity.tripUpdate;
        if (tripUpdate && tripUpdate.stopTimeUpdate) {
            const stopTimeUpdate = tripUpdate.stopTimeUpdate;
            const finalDestination = stopTimeUpdate[stopTimeUpdate.length - 1];
            const timeObj = finalDestination.arrival || finalDestination.departure;
            const time = parseInt(timeObj.time, 10) * 1000;
            return timeNow < time;
        }
        return false;
    });
};



// function transformData(filteredPayload, result) {
//     filteredPayload.forEach(entity => {
//         const tripUpdate = entity.tripUpdate;
//         const train = {
//             id: tripUpdate.trip.tripId,
//             route: tripUpdate.trip.routeId,
//             direction: tripUpdate.trip.tripId[tripUpdate.trip.tripId.length - 1],
//             stops: [],
//             latLngs: [],
//             durations: []
//         }
//         const visitingStops = getUpcomingStops(tripUpdate.stopTimeUpdate, train);
//         setStops(visitingStops, train);
//         setLatLngs(visitingStops, train);
//         setDurations(visitingStops, train);
//         addTrainToResult(result, train);
//     });
// };

// function getUpcomingStops(trips) {
//     let i = 0
//     while (i < trips.length) {
//         const trip = trips[i];
//         const timeObj = trip.arrival || trip.departure;
//         const time = parseInt(timeObj.time, 10) * 1000;
//         // if (time > timeNow) {
//         //     break;
//         // }
//         i++;
//     }

//     if (i > 0) {
//         trips[i - 1].isOrigin = true;
//         return trips.slice(i - 1);
//     } else {
//         const origin = { ...trips[0] };
//         return [origin, ...trips];
//     }
// };

// function setStops(trips, train) {
//     trips.forEach(trip => {
//         const stationId = getParentStopId(trip.stopId);
//         if (stationId) {
//             train.stops.push(stationId);
//         }
//     });
// };

function getParentStopId(stopId) {
    const station = STATIONS[stopId];
    if (!station) {
        console.log(`UNDEFINED STATION ID: ${stopId} - SKIPPING DESTINATION`);
        return false;
    }
    if (station.type === "0") {
        return station.parent;
    }
    return stopId;
};

// function setLatLngs(trips, train) {
//     train.latLngs = trips.map(trip => getLatLng(trip.stopId));
// };

// function getLatLng(stopId) {
//     return STATIONS[stopId] && { lat: parseFloat(STATIONS[stopId].lat), lng: parseFloat(STATIONS[stopId].lon) };
// }

// function setDurations(trips, train) {
//     // for (let i = 1; i < trips.length; i++) {
//     //     const prevTrip = trips[i - 1];
//     //     const prevTimeObj = prevTrip.arrival || prevTrip.departure;
//     //     const prevTime = i === 1 ? timeNow : parseInt(prevTimeObj.time, 10) * 1000;
//     //     const trip = trips[i];
//     //     const timeObj = trip.arrival || trip.departure;
//     //     const time = parseInt(timeObj.time, 10) * 1000;
//     //     const duration = time - prevTime;
//     //     train.durations.push(duration);
//     // }
// }

// function addTrainToResult(result, train) {
//     const trainId = train.id;
//     result.trainsById[trainId] = train;

//     const route = train.route;
//     (route in result.trainsByRoute) && result.trainsByRoute[route].push(trainId);
// };
