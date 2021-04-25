import React from 'react';
import ReactDOM from 'react-dom';
import './assets/stylesheets/index.css';
import App from './containers/AppContainer';
import configureStore from './store/store';
import { Provider } from 'react-redux';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={configureStore()}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
});