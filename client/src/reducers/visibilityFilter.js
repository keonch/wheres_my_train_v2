import merge from 'lodash/merge';

const visibilityFilter = (oldState = new Set(), action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case 'NEED AN ACTION':
        // return merge(new Set(), oldState, action.visibilityFilter);
        default:
            return new Set(['H']);
        // return oldState;
    }
};

export default visibilityFilter;