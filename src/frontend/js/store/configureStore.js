// ==========================
// ./store/configureStore.js
// ==========================

import { createStore, applyMiddleware, compose } from 'redux';
import multi from 'redux-multi';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware, push } from 'react-router-redux';
import {browserHistory} from 'react-router';

import rootReducer from '../reducers/index';
import createLogger from 'redux-logger';
// import { localLog, logToLocal, detectCrashes } from '../utilities/loggers'
import { HYDRATE } from '../constants/index';

let logger = createLogger({
  duration: true,
  timestamp: true,
  collapsed: true,
});



const enhancer = compose(applyMiddleware(thunkMiddleware, multi, routerMiddleware(browserHistory)));


function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const storeFunc = createStore(rootReducer, initialState, enhancer);

  return storeFunc;
}

const store = configureStore();

var backup = {};

// we MUST make sure we've got a confirmed backup store before we continue on.
function backupStore(){
  backup = store.getState();
  // we must make one quick change to the backup to prevent an infinite loop.
  // backup.tourActive = true right now (because we just went to tutorial mode.).
  // however, if we restore THAT, we'll go right back into tutorial mode at the end of tutorial mode.
  // so we make one tiny change.
  backup.tourActive = false;
}

function restoreStore(){
  store.dispatch({type: HYDRATE, payload: backup});
}

const routeTo = (url) => {
  store.dispatch(push(url));
};

export {
  store as default,
  backupStore,
  restoreStore,
  routeTo,
};
