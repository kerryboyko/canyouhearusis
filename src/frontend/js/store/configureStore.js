// ==========================
// ./store/configureStore.js
// ==========================

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware, push } from 'react-router-redux';
import {browserHistory} from 'react-router';
import rootReducer from '../reducers/index';
import { HYDRATE } from '../constants/index';

//import createLogger from 'redux-logger';
// let logger = createLogger({
//   duration: true,
//   timestamp: true,
//   collapsed: true,
// });

const enhancer = compose(applyMiddleware(routerMiddleware(browserHistory)));


function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const storeFunc = createStore(rootReducer, initialState, enhancer);

  return storeFunc;
}

const store = configureStore();

const routeTo = (url) => {
  store.dispatch(push(url));
};

export {
  store as default,
  routeTo,
};
