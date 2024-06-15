import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import store from './store';
import { Provider } from 'react-redux';
import { INIT_STATE } from './usersSlice';

let reduxState = localStorage.getItem('reduxState') 
if (reduxState) {
  reduxState = JSON.parse(reduxState)
  store.dispatch(INIT_STATE(reduxState));
}

const root = document.getElementById('root');
createRoot(root).render(

    <Provider store={store}>
      <App />
    </Provider>

);
