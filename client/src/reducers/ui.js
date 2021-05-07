import { combineReducers } from 'redux';
import activeRoutes from './activeRoutes';
import fetchedTimeStamps from './fetchedTimeStamps';

const uiReducer = combineReducers({
    activeRoutes,
    fetchedTimeStamps
});

export default uiReducer;