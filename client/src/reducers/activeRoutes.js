import { RECEIVE_ACTIVE_ROUTE, RECEIVE_DEACTIVE_ROUTE } from '../actions/ui_actions';

const activeRoutes = (oldState = new Set(), action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_ACTIVE_ROUTE:
            return new Set([...oldState, action.route]);
        case RECEIVE_DEACTIVE_ROUTE:
            const newState = new Set([...oldState]);
            newState.delete(action.route);
            return newState;
        default:
            return oldState;
    }
};

export default activeRoutes;