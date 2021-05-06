const visibilityFilter = (oldState = new Set(), action) => {
    Object.freeze(oldState);
    switch (action.type) {
        case 'NEED AN ACTION':
            // return merge(new Set(), oldState, action.visibilityFilter);
            break;
        default:
            return new Set(['D']);
        // return oldState;
    }
};

export default visibilityFilter;