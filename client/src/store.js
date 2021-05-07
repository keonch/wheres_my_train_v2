import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './reducers/root';
import { composeWithDevTools } from 'redux-devtools-extension';

const middlewares = [thunk];

if (process.env.NODE_ENV !== 'production') {
    middlewares.push(logger);
}

const configureStore = (preloadedState = {}) => (
    createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middlewares)))
);

export default configureStore;