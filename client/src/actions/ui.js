export const RECEIVE_ACTIVE_ROUTE = 'RECEIVE_ACTIVE_ROUTE';
export const RECEIVE_DEACTIVE_ROUTE = 'RECEIVE_DEACTIVE_ROUTE';

export const activateRoute = (route) => {
    return ({
        type: RECEIVE_ACTIVE_ROUTE,
        route
    });
};

export const deactivateRoute = (route) => {
    return ({
        type: RECEIVE_DEACTIVE_ROUTE,
        route
    });
};