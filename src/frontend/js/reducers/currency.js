import {
  SET_CURRENCY, CURRENCY_TYPES,
} from '../constants/index';


//TODO: For now, the switch case will not do anything as action is declared
//as an empty object argument, causing it to always default to return state
//since  action.type will never exist. - GMDIV
export function currency (state = CURRENCY_TYPES['USD'], action = {}) {
  switch(action.type){
  case SET_CURRENCY:
    return action.currency;
  default: return state;
  }
}
