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
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentWillMount (){
    let options = {
      url: "http://ipinfo.io/country",
      method: 'GET',
      headers: {
        "Access-Control-Allow-Origin": '*',
        'Access-Control-Allow-Credentials': false,
      },
      withCredentials: false,
    };
    request(options, (error, res, body) =>{
      body = body.substring(0, 2);
      if(body === "US"){
        this.props.actions.setLanguage("EN");
      }
      if(body === "IS"){
        this.props.actions.setLanguage('IS');
      }
    });
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
