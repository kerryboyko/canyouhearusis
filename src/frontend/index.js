import React, { Component } from 'react';
import request from 'request';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, {routeTo} from './js/store/configureStore';
import App from './js/containers/App';
import Hero from './js/containers/Hero';
import EnglishHero from './js/components/EnglishHero';
import IcelandicHero from './js/components/IcelandicHero';

import About from './js/containers/About';
import Learn from './js/containers/Learn';
import Subscribe from './js/containers/Subscribe';
import ThankYou from './js/containers/ThankYou';
import Parties from './js/containers/Parties';
import TheConstitution from './js/containers/TheConstitution';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, push} from 'react-router-redux';
import {StyleSheet, css} from 'aphrodite';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-85600067-1');

import {
  SET_LANGUAGE,
} from './js/constants/index';


const ANDERS_JILDEN = '../../img/Anders_Jilden.jpg';
const KALLE_K = '../../img/Kalle_K.jpg';
const TJ_HOLOWAYCHUK = '../../img/TJ_Holowaychuk.jpg';

const fireTracking = () => {
  ReactGA.set({ page: window.location.pathname });
  ReactGA.pageview(window.location.pathname);
};

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);
const MOUNT_NODE = document.getElementById('root');

export default class Root extends Component {
  render() {
    const { store } = this.props;
    return (
      <Provider routeTo={routeTo} store={store}>
          <Router onUpdate={fireTracking} history={history}>
            <Route path="/" component={App}>
              <IndexRoute component={Hero}/>
              <Route path="home" component={Hero}/>
              <Route path="about" component={About}/>
              <Route path="learn" component={Learn}/>
              <Route path="constitution" component={TheConstitution}/>
              <Route path="thankyou" component={ThankYou}/>
              <Route path="subscribe" component={Subscribe}/>
              <Route path="parties" component={Parties}/>
              {/* canyouhearus.is/land and canyouhearus.is/is should default to icelandic canyouhearus.is/en should default to english*/}
              <Route path="land" component={IcelandicHero}/>
              <Route path="is" component={IcelandicHero}/>
              <Route path="en" component={EnglishHero}/>
              {/* canyouhearus.is/land and canyouhearus.is/is should default to icelandic canyouhearus.is/en should default to english*/}
            </Route>
          </Router>
      </Provider>
    );
  }
}


ReactDOM.render(<Root store={store} />, MOUNT_NODE);

const backgroundStyles = StyleSheet.create({
  fixedBackground: {
    position:'fixed',
    width:'100vh',
    height:'100vh',
    overflow:'hidden',
  },
  picture: {
    position: 'absolute',
    width: '100%',
    height: 'auto',
    top: '50%',
    transform: 'translateY(-50%)'
  }
});

const bgImageArray = [ANDERS_JILDEN, KALLE_K, TJ_HOLOWAYCHUK];

bgImageArray.forEach(function(img){
  new Image().src = img;
  // caches images, avoiding white flash between background replacements
});

document.documentElement.style.background = 'url(' + bgImageArray[2] + ") no-repeat center center fixed";
document.documentElement.style.backgroundSize = "cover";

const backgroundSequence = (index = 0) => {
  setTimeout(() => {
    document.documentElement.style.background = 'url(' + bgImageArray[index] + ") no-repeat center center fixed";
    document.documentElement.style.backgroundSize = "cover";
    backgroundSequence((index + 1) % 3);
  }, 7000);
};

backgroundSequence();
