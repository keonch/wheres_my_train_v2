import { combineReducers } from 'redux';
import activeRoutes from './activeRoutes';

const uiReducer = combineReducers({
    activeRoutes
});

export default uiReducer;