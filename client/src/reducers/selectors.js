import { createSelector } from 'reselect'

export const getActiveRoutes = state => state.ui.activeRoutes;

export const getTrainsById = state => state.trainsById;

export const getTrainsByRoute = state => state.trainsByRoute;

export const getTrain = (state, trainId) => state.trainsById[trainId] || {};

export const getVisibleTrains = createSelector(
    [getActiveRoutes, getTrainsByRoute],
    (activeRoutes, trainsByRoute) => {
        return [...activeRoutes].reduce((acc, route) => {
            const trainIds = trainsByRoute[route] || [];
            return acc.concat(trainIds);
        }, []);
    }
);