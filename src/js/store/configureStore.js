// ==========================
// ./store/configureStore.js
// ==========================

import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import { HYDRATE } from "../constants/index";

import { createLogger } from "redux-logger";
let logger = createLogger({
  duration: true,
  timestamp: true,
  collapsed: true
});

const enhancer = compose(applyMiddleware(logger));

function configureStore(initialState) {
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  const storeFunc = createStore(rootReducer, initialState, enhancer);

  return storeFunc;
}

const store = configureStore();

export default store;
