import React, { Component } from "react";
import { setLanguage } from "../actions/language";
import reduxify from "../util/reduxify";
import Header from "./Header";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme";
import request from "superagent";

class App extends Component {
  constructor(props) {
    super(props);
    this.componentWillMount = this.componentWillMount.bind(this);
  }
  componentWillMount() {
    request
      .get("https://ipinfo.io/country")
      .set("Accept", "text/html")
      .set(("Access-Control-Allow-Origin": "*"))
      .end((err, res) => {
        if (err || !res.ok) {
          console.error("Error with looking up country", err);
          return;
        }
        const country = res.text.substring(0, 2);
        if (["US", "GB", "CA", "AU", "NZ", "PR", "ZA"].includes(country)) {
          console.log("SETTING LANGUAGE TO ENGLISH");
          this.props.actions.setLanguage("EN");
        }
        if (country === "IS") {
          console.log("SETTING LANGUAGE TO ISLANDIC");
          this.props.actions.setLanguage("IS");
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

export default reduxify({ setLanguage }, ["language"], App);
