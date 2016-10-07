import React, { Component } from 'react';
import * as actions from '../actions/index';
import reduxify from '../utilities/reduxify';

class App extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
      {"Test Text"}
      </div>
    );
  }
}

export default reduxify(actions, ['counter'], App);
