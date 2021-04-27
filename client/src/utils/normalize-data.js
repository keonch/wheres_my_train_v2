import STATIONS from '../assets/data/STATIONS.json';
import ROUTES from '../assets/data/ROUTES.json';

export function normalizeTrainData(payload) {
    const result = {
        trainsById: {},
        trainsByRoute: {}
    };

    Object.keys(ROUTES).forEach(trainRoute => result.trainsByRoute[trainRoute] = []);

    // runtime epoch timestamp ms
    const now = Date.now();

    // select trains with tripUpdate elements within payload
    payload.forEach((entity, i) => {
        if (!entity.tripUpdate) {
            return;
        }

        const tripUpdate = entity.tripUpdate;

        // select trains with valid stopTimeUpdate available
        if (tripUpdate.stopTimeUpdate && isBeforeDestination(tripUpdate.stopTimeUpdate, now)) {
            console.log('------');
            const train = {
                id: tripUpdate.trip.tripId,
                route: tripUpdate.trip.routeId,
                direction: tripUpdate.trip.tripId[tripUpdate.trip.tripId.length - 1],
                isAtFirstStop: false,
                stops: [],
                latLngs: [],
                durations: []
            }
            setIterators(train, tripUpdate.stopTimeUpdate, now)
            console.log({ train });
            addTrainToResult(result, train);
        }
    });

    return result;
};

// Checks if train has not yet reached its final destination
function isBeforeDestination(trip, currentTime) {
    const finalDestination = trip[trip.length - 1];
    const timeObj = finalDestination.arrival || finalDestination.departure;
    const time = parseInt(timeObj.time, 10) * 1000;
    return currentTime < time;
};

// returns array of Stops starting before its next stop
function setIterators(trainObj, trips, currentTime) {
    let prevTime = currentTime;
    let isFirstDestination = true;

    for (let i = 0; i < trips.length; i++) {
        const trip = trips[i];
        const timeObj = trip.arrival || trip.departure;
        const time = parseInt(timeObj.time, 10) * 1000;
        if (time < currentTime) {
            continue;
        }

        if (isFirstDestination) {
            if (i === 0) {
                // look for prev stop
                const prevStation = getPreviousStation(trip.stopId, trainObj.direction, trainObj.route);
                if (prevStation) {

                } else {
                    trainObj.isAtFirstStop = true
                }

                isFirstDestination = false;
            } else {
                const prevTrip = trips[i - 1];
                const prevStopId = prevTrip.stopId;
                const prevStation = STATIONS[prevStopId] || {};
                const prevLatLng = { lat: parseFloat(prevStation.lat, 10), lng: parseFloat(prevStation.lon, 10) };
                trainObj.stopIds.push(prevStopId);
                trainObj.latLngs.push(prevLatLng);
                isFirstDestination = false;
            }
        }

        const stopId = trip.stopId;
        const station = STATIONS[stopId] || {};
        const latLng = { lat: parseFloat(station.lat, 10), lng: parseFloat(station.lon, 10) };
        const duration = time - prevTime;
        trainObj.stopIds.push(stopId);
        trainObj.latLngs.push(latLng);
        trainObj.durations.push(duration);
        prevTime = time;
    }
};

function getPreviousStation(stopId, direction, trainRoute) {
    const station = STATIONS[stopId] || {};
    const stationId = (station.type === "0") ? station.parent : stopId;
    const r = ROUTES[trainRoute] || [];
    const stopIdx = r.indexOf(stationId);
    let nextStation;
    if (stopIdx === -1) {
        return;
    } else if (direction === "N") {
        // nextStation = stopIdx - 1 
    } else {
        // stopIdx++;
    }
    return true;
}

function addTrainToResult(result, train) {
    const trainId = train.id;
    result.trainsById[trainId] = train;

    const route = train.route;
    (route in result.trainsByRoute) && result.trainsByRoute[route].push(trainId);
};

