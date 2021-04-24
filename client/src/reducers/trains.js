import merge from 'lodash/merge';
import { RECEIVE_TRAINS } from '../actions/train_actions';

const trainsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case RECEIVE_TRAINS:
            return merge({}, oldState, action.trains);
        default:
            return oldState;
    }
};

export default trainsReducer;