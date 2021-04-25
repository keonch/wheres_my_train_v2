import { combineReducers } from 'redux';
import trains from './trains';
import visibilityFilter from './visibilityFilter';

const rootReducer = combineReducers({
    trains,
    visibilityFilter
});

export default rootReducer;