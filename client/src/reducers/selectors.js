import { createSelector } from 'reselect'

export const getVisibilityFilter = state => state.visibilityFilter;

export const getTrains = state => state.trains;

export const getTrain = (trainsById, trainId) => trainsById && trainsById[trainId] || {};

export const getVisibleTrains = createSelector(
    [getVisibilityFilter, getTrains],
    (visibilityFilter, trains) => {
        return [...visibilityFilter].reduce((acc, trainRoute) => {
            const trainsByRoute = trains.trainsByRoute && trains.trainsByRoute[trainRoute] || [];
            return acc.concat(trainsByRoute);
        }, []);
    }
);