import merge from 'lodash/merge';
import { RECEIVE_TRAINS, REMOVE_TRAIN } from '../actions/train';

const trainsByRouteReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRAINS:
            return merge({}, oldState, action.trainsByRoute);
        case REMOVE_TRAIN:
            const newState = merge({}, oldState);
            const route = newState[action.train.route];
            const i = route.indexOf(action.train.id);
            if (i > -1) {
                route.splice(i, 1);
            }
            return newState;
        default:
            return oldState;
    }
};

export default trainsByRouteReducer;