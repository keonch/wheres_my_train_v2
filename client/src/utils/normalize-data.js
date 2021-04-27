import STATIONS from '../assets/data/STATIONS_STATIC.json';
import ROUTES_BY_KEYS from '../assets/data/ROUTES_BY_KEYS.json';
import ROUTES from '../assets/data/ROUTES.json';

export function normalizeTrainData(payload) {
    const result = { trainsById: {}, trainsByRoute: {} };
    Object.keys(ROUTES).forEach(trainRoute => result.trainsByRoute[trainRoute] = []);
    transformData(filterPayload(payload), result);
    return result;
};

function filterPayload(payload) {
    const now = Date.now();
    return payload.filter(entity => {
        const tripUpdate = entity.tripUpdate;
        if (tripUpdate && tripUpdate.stopTimeUpdate) {
            const stopTimeUpdate = tripUpdate.stopTimeUpdate;
            const finalDestination = stopTimeUpdate[stopTimeUpdate.length - 1];
            const timeObj = finalDestination.arrival || finalDestination.departure;
            const time = parseInt(timeObj.time, 10) * 1000;
            return now < time;
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
            hasOrigin: false,
            stops: [],
            latLngs: [],
            durations: []
        }
        setStops(tripUpdate.stopTimeUpdate, train);
        // setLatLngs();
        // setDurations();
        addTrainToResult(result, train);
    });
};

function setStops(trips, train) {
    const unvisitedStops = filterVisitiedStops(trips, train);
    const mergedStops = mergeWithStaticRoute(unvisitedStops, train);
};

function filterVisitiedStops(trips, train) {
    const now = Date.now();
    let i = 0
    while (i < trips.length) {
        const trip = trips[i];
        const timeObj = trip.arrival || trip.departure;
        const time = parseInt(timeObj.time, 10) * 1000;
        if (time > now) {
            break;
        }
        i++;
    }

    if (i > 0) {
        train.hasOrigin = true;
        return trips.slice(i - 1);
    } else {
        return trips;
    }
}

function mergeWithStaticRoute(trips, train) {
    const staticRoute = ROUTES[train.route];
    const staticRoutesByKeys = ROUTES_BY_KEYS[train.route];

    if (!train.hasOrigin) {
        const firstStopId = trips[0].stopId;
        const station = STATIONS[firstStopId] || {};
        const parentStopId = station.type === "1" ? firstStopId : station.parent;
        if (parentStopId in staticRoutesByKeys) {
            const stationIndex = staticRoutesByKeys[parentStopId] - 1;
            if (train.direction === 'S') {
                if (stationIndex === 0) {
                    train.isAtFirstStop = true;
                } else {
                    const prevStop = { stopId: staticRoute[stationIndex - 1] };
                    console.log(trips);
                    trips = [prevStop].concat(trips);
                    console.log(trips);
                    train.hasOrigin = true;
                }
            } else {
                if (stationIndex === staticRoute.length - 1) {
                    train.isAtFirstStop = true;
                } else {
                    const prevStop = { stopId: staticRoute[stationIndex + 1] }
                    console.log(trips);
                    trips = [prevStop].concat(trips);
                    console.log(trips);
                    train.hasOrigin = true;
                }
            }
        }
    }

    // TRIPS NOW HAVE STARTING POINTS
    // MERGE THEM
    let tripsIdx = 0;
    let staticIdx = 0;
    while (tripsIdx < trips.length && staticIdx < staticRoute.length) {

        tripsIdx++;
    }
};

function addTrainToResult(result, train) {
    const trainId = train.id;
    result.trainsById[trainId] = train;

    const route = train.route;
    (route in result.trainsByRoute) && result.trainsByRoute[route].push(trainId);
};

