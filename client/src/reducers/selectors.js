import { createSelector } from 'reselect'
import stations from '../assets/data/stations.json';

export const getVisibilityFilter = state => state.visibilityFilter;

export const getTrains = state => state.trains;

export const getTrain = (state, trainId) => state.trains.trainsById[trainId] || {};

export const getVisibleTrains = createSelector(
    [getVisibilityFilter, getTrains],
    (visibilityFilter, trains) => {
        return [...visibilityFilter].reduce((acc, trainRoute) => {
            const trainsByRoute = trains.trainsByRoute && trains.trainsByRoute[trainRoute] || [];
            return acc.concat(trainsByRoute);
        }, []);
    }
);

export const getTimeIntervals = createSelector(
    [getTrain],
    (train) => {
        const timeIntervals = [];
        for (let i = 1; i < train.trip.length; i++) {
            const toStop = train.trip[i];
            const toTimeObj = toStop.arrival || toStop.departure;
            const fromStop = train.trip[i - 1];
            const fromTimeObj = fromStop.arrival || fromStop.departure;
            timeIntervals.push(parseInt(toTimeObj.time) - parseInt(fromTimeObj.time));
        }
        return timeIntervals;
    }
);

export const getStations = createSelector(
    [getTrain],
    (train) => {
        const trip = [];
        let stationNotFound = false;
        for (let i = 0; i < train.trip.length; i++) {
            const stop = train.trip[i];
            const station = stations[stop.stopId];
            if (station) {
                trip.push({ lat: parseFloat(station.lat), lng: parseFloat(station.lon) });
            } else {
                stationNotFound = true;
                break;
            }
        }

        if (!stationNotFound) {
            return trip;
        } else {
            return [];
        }
    }
);