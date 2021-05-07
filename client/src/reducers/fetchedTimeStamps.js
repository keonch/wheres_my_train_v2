import { RECEIVE_TRAINS } from '../actions/train';
import merge from 'lodash/merge';

const activeRoutes = (oldState = new Set(), action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRAINS:
            return merge({}, oldState, { [action.trainGroup]: Date.now() });
        default:
            return oldState;
    }
};

export default activeRoutes;