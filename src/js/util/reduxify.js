import pick from "lodash/pick";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

export const prepareActions = (actions, optionalMethods, dispatch) => {
  let output = {
    actions: bindActionCreators(actions, dispatch),
    dispatch
  };
  if (optionalMethods && typeof optionalMethods === "object") {
    for (let key in optionalMethods) {
      output[key] = optionalMethods[key];
    }
  }
  return output;
};

export const reduxify = (
  actionsToBind,
  reducerKeyList,
  component,
  optionalMethods
) => {
  const mapStateToProps = state => pick(state, reducerKeyList);
  const mapDispatchToProps = dispatch =>
    prepareActions(actionsToBind, optionalMethods, dispatch);

  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default reduxify;
