import merge from 'lodash/merge';
import { RECEIVE_TRAINS } from '../actions/train';

const trainsById = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRAINS:
            return merge({}, oldState, action.trainsById);
        default:
            return oldState;
    }
};

export default trainsById;