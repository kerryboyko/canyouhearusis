// ==========================
// ./reducers/index.js
// ==========================

import { combineReducers } from 'redux';
import * as language from './language';
import * as currency from './currency';
import { routerReducer } from 'react-router-redux';

const appReducer = combineReducers(Object.assign({}, {routing: routerReducer}, language, currency));

const rootReducer = (state, action) => appReducer(state, action);

export default rootReducer;
