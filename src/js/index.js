import React, { Component } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store/configureStore";
import App from "./containers/App";
import Hero from "./containers/Hero";
import EnglishHero from "./components/EnglishHero";
import IcelandicHero from "./components/IcelandicHero";

import About from "./containers/About";
import Learn from "./containers/Learn";
import Subscribe from "./containers/Subscribe";
import ThankYou from "./containers/ThankYou";
import Parties from "./containers/Parties";
import TheConstitution from "./containers/TheConstitution";
import injectTapEventPlugin from "react-tap-event-plugin";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter, HashRouter, Switch, Route } from "react-router-dom";
import { StyleSheet, css } from "aphrodite";
injectTapEventPlugin();

import ReactGA from "react-ga";
ReactGA.initialize("UA-85600067-1");

import { SET_LANGUAGE } from "./constants/index";

const ANDERS_JILDEN = "../../img/Anders_Jilden.jpg";
const KALLE_K = "../../img/Kalle_K.jpg";
const TJ_HOLOWAYCHUK = "../../img/TJ_Holowaychuk.jpg";

const fireTracking = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

const MOUNT_NODE = document.getElementById("root");

const routes = [
  { path: "/", component: Hero },
  { path: "/home", component: Hero },
  { path: "/about", component: About },
  { path: "/learn", component: Learn },
  { path: "/constitution", component: TheConstitution },
  { path: "/thankyou", component: ThankYou },
  { path: "/subscribe", component: Subscribe },
  { path: "/parties", component: Parties },
  { path: "/land", component: IcelandicHero },
  { path: "/is", component: IcelandicHero },
  { path: "/en", component: EnglishHero }
];

let RouteGenerator = ({ location }) => (
  <Switch key={location.key} location={location}>
    {routes.map((r, i) => (
      <Route key={i} exact path={r.path} component={r.component} />
    ))}
  </Switch>
);

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider store={store}>
        <MuiThemeProvider>
          <BrowserRouter onUpdate={fireTracking}>
            <div>
              <Route path="/" component={App} />
              <Route component={RouteGenerator} />
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<Root store={store} />, MOUNT_NODE);

const backgroundStyles = StyleSheet.create({
  fixedBackground: {
    position: "fixed",
    width: "100vh",
    height: "100vh",
    overflow: "hidden"
  },
  picture: {
    position: "absolute",
    width: "100%",
    height: "auto",
    top: "50%",
    transform: "translateY(-50%)"
  }
});

const bgImageArray = [ANDERS_JILDEN, KALLE_K, TJ_HOLOWAYCHUK];

bgImageArray.forEach(function(img) {
  new Image().src = img;
  // caches images, avoiding white flash between background replacements
});

document.documentElement.style.background =
  "url(" + bgImageArray[2] + ") no-repeat center center fixed";
document.documentElement.style.backgroundSize = "cover";

const backgroundSequence = (index = 0) => {
  setTimeout(() => {
    document.documentElement.style.background =
      "url(" + bgImageArray[index] + ") no-repeat center center fixed";
    document.documentElement.style.backgroundSize = "cover";
    backgroundSequence((index + 1) % 3);
  }, 7000);
};

backgroundSequence();
