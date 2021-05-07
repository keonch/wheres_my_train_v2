import merge from 'lodash/merge';
import { RECEIVE_TRAINS, REMOVE_TRAIN } from '../actions/train';

const trainsById = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRAINS:
            return merge({}, oldState, action.trainsById);
        case REMOVE_TRAIN:
            const newState = merge({}, oldState);
            delete newState[action.train.id];
            return newState;
        default:
            return oldState;
    }
};

export default trainsById;