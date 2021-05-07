import { combineReducers } from 'redux';
import trainsById from './trainsById';
import trainsByRoute from './trainsByRoute';
import ui from './ui';

const rootReducer = combineReducers({
    trainsById,
    trainsByRoute,
    ui
});

export default rootReducer;