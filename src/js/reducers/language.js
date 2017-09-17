import { SET_LANGUAGE } from "../constants/index";

//TODO: For now, the switch case will not do anything as action is declared
//as an empty object argument, causing it to always default to return state
//since  action.type will never exist. - GMDIV
export function language(state = "IS", action = {}) {
  switch (action.type) {
    case SET_LANGUAGE:
      console.log("action", action);
      return action.language;
    default:
      return state;
  }
}
