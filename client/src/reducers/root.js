import { combineReducers } from 'redux';
import trains from './trains';
import ui from './ui';

const rootReducer = combineReducers({
    trains,
    ui
});

export default rootReducer;