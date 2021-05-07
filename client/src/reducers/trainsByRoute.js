import merge from 'lodash/merge';
import { RECEIVE_TRAINS } from '../actions/train';

const trainsByRouteReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRAINS:
            return merge({}, oldState, action.trainsByRoute);
        default:
            return oldState;
    }
};

export default trainsByRouteReducer;