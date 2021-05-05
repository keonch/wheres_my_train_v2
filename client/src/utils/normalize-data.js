import STATIONS from '../assets/data/STATIONS_STATIC.json';
import ROUTES_BY_KEYS from '../assets/data/ROUTES_BY_KEYS.json';
import ROUTES from '../assets/data/ROUTES.json';

export function normalizeTrainData(payload) {
    setTimeNow();
    const result = { trainsById: {}, trainsByRoute: {} };
    Object.keys(ROUTES).forEach(trainRoute => result.trainsByRoute[trainRoute] = []);
    transformData(filterPayload(payload), result);
    return result;
};

let timeNow = Date.now();

function setTimeNow() {
    timeNow = Date.now();
}

function filterPayload(payload) {
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

function transformData(filteredPayload, result) {
    filteredPayload.forEach(entity => {
        const tripUpdate = entity.tripUpdate;
        const train = {
            id: tripUpdate.trip.tripId,
            route: tripUpdate.trip.routeId,
            direction: tripUpdate.trip.tripId[tripUpdate.trip.tripId.length - 1],
            isAtFirstStop: false,
            stops: [],
            latLngs: [],
            durations: []
        }
        const visitingStops = getUpcomingStops(tripUpdate.stopTimeUpdate, train);
        setStops(visitingStops, train);
        setLatLngs(visitingStops, train);
        setDurations(visitingStops, train);
        addTrainToResult(result, train);
    });
};

function getUpcomingStops(trips) {
    let i = 0
    while (i < trips.length) {
        const trip = trips[i];
        const timeObj = trip.arrival || trip.departure;
        const time = parseInt(timeObj.time, 10) * 1000;
        if (time > timeNow) {
            break;
        }
        i++;
    }

    if (i > 0) {
        trips[i - 1].isOrigin = true;
        return trips.slice(i - 1);
    } else {
        const origin = { ...trips[0] };
        return [origin, ...trips];
    }
};

function setStops(trips, train) {
    trips.forEach(trip => {
        const stationId = getParentStopId(trip.stopId);
        if (stationId) {
            train.stops.push(stationId);
        }
    });
};

function getParentStopId(stopId) {
    const station = STATIONS[stopId];
    if (!station) {
        console.log(`UNDEFINED STATION ID: ${stopId}`);
        return false;
    }
    if (station.type === "0") {
        return station.parent;
    }
    return stopId;
};

function setLatLngs(trips, train) {
    train.latLngs = trips.map(trip => getLatLng(trip.stopId));
};

function getLatLng(stopId) {
    return STATIONS[stopId] && { lat: parseFloat(STATIONS[stopId].lat), lng: parseFloat(STATIONS[stopId].lon) };
}

function setDurations(trips, train) {
    for (let i = 1; i < trips.length; i++) {
        const prevTrip = trips[i - 1];
        const prevTimeObj = prevTrip.arrival || prevTrip.departure;
        const prevTime = i === 1 ? timeNow : parseInt(prevTimeObj.time, 10) * 1000;
        const trip = trips[i];
        const timeObj = trip.arrival || trip.departure;
        const time = parseInt(timeObj.time, 10) * 1000;
        const duration = time - prevTime;
        train.durations.push(duration);
    }
}

function addTrainToResult(result, train) {
    const trainId = train.id;
    result.trainsById[trainId] = train;

    const route = train.route;
    (route in result.trainsByRoute) && result.trainsByRoute[route].push(trainId);
};
