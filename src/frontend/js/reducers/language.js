import {
  SET_LANGUAGE,
} from '../constants/index';

export function language(state = 'EN', action = {}) {
  switch(action.type){
  case SET_LANGUAGE:
    return action.language;
  default: return state;
  }
}
