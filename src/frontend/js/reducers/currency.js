import {
  SET_CURRENCY, CURRENCY_TYPES,
} from '../constants/index';

export function currency (state = CURRENCY_TYPES['USD'], action = {}) {
  switch(action.type){
  case SET_CURRENCY:
    return action.currency;
  default: return state;
  }
}
