import React, { Component } from 'react';
import * as actions from '../actions/index';
import reduxify from 'reduxify';
import Header from './Header';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import request from 'request';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      onlyDoOnce: true,
    };
  }

  componentWillMount () {
    if(this.state.onlyDoOnce){
      request('http://ipinfo.io', function(error, res, body) {
        if(JSON.parse(body).country === "IS"){
          this.props.actions.setLanguage("IS");
        }
      });
      this.setState({onlyDoOnce: false});
    }
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div ref="App">
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default reduxify(actions, ['language'], App);
