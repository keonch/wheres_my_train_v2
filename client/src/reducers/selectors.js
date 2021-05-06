import { createSelector } from 'reselect'

export const getActiveRoutes = state => state.ui.activeRoutes;

export const getTrains = state => state.trains;

export const getTrain = (trainsById, trainId) => (trainsById && trainsById[trainId]) || {};

export const getVisibleTrains = createSelector(
    [getActiveRoutes, getTrains],
    (activeRoutes, trains) => {
        return [...activeRoutes].reduce((acc, trainRoute) => {
            const trainsByRoute = (trains.trainsByRoute && trains.trainsByRoute[trainRoute]) || [];
            return acc.concat(trainsByRoute);
        }, []);
    }
);