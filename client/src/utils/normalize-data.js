import { findNextStopIndex_Linear } from './algos';
import { TRAIN_ROUTES } from './constants';

export const normalizeTrainData = (payload) => {
    const result = {
        trainsById: {},
        trainsByRoute: {}
    };

    TRAIN_ROUTES.forEach(trainRoute => result.trainsByRoute[trainRoute] = []);

    // runtime epoch timestamp
    const now = Date.now() / 1000 | 0;

    // select trains with tripUpdate elements within payload
    payload.forEach((entity, i) => {
        if (!entity.tripUpdate) {
            return;
        }

        const tripUpdate = entity.tripUpdate;

        // select trains with valid stopTimeUpdate available
        if ("stopTimeUpdate" in tripUpdate && isBeforeDestination(tripUpdate.stopTimeUpdate, now)) {
            const train = {
                id: tripUpdate.trip.tripId,
                route: tripUpdate.trip.routeId,
                direction: tripUpdate.trip.tripId[tripUpdate.trip.tripId.length - 1],
                isAtStart: false,
                trip: []
            }
            setNextStops(train, tripUpdate.stopTimeUpdate, now)
            addTrainToResult(result, train);
        }
    });

    return result;
};

// Checks if train has not yet reached its final destination
const isBeforeDestination = (trip, currentTime) => {
    const finalDestination = trip[trip.length - 1];
    const arrivalTime = parseInt(finalDestination.arrival.time, 10);
    return currentTime < arrivalTime;
};

// returns array of Stops starting before its next stop
const setNextStops = (trainObj, trip, currentTime) => {
    let i = findNextStopIndex_Linear(trip, currentTime);
    if (i === 0) {
        trainObj.isAtStart = true;
    } else {
        i--
    }
    trainObj.trip = trip.slice(i);
};

const addTrainToResult = (result, train) => {
    const trainId = train.id;
    result.trainsById[trainId] = train;

    const route = train.route;
    (route in result.trainsByRoute) && result.trainsByRoute[route].push(trainId);
};