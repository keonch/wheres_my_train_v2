import merge from 'lodash/merge';

const trainsReducer = (oldState = {}, action) => {
    Object.freeze(oldState);
    switch (action.type) {
        default:
            return oldState;
    }
};

export default trainsReducer;