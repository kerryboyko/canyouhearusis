import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store, {routeTo} from './js/store/configureStore';
import App from './js/containers/App';
import Hero from './js/containers/Hero';
import About from './js/containers/About';
import Learn from './js/containers/Learn';
import Donate from './js/containers/Donate';
import ThankYou from './js/containers/ThankYou';
import TheConstitution from './js/containers/TheConstitution';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, push} from 'react-router-redux';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const history = syncHistoryWithStore(browserHistory, store);
const MOUNT_NODE = document.getElementById('root');

export default class Root extends Component {
  render() {
    console.log(push('foo'))
    const { store } = this.props;
    return (
      <Provider routeTo={routeTo} store={store}>
          <Router history={history}>
            <Route path="/" component={App}>
              <IndexRoute component={Hero}/>
              <Route path="home" component={Hero}/>
              <Route path="about" component={About}/>
              <Route path="learn" component={Learn}/>
              <Route path="constitution" component={TheConstitution}/>
              <Route path="donate" component={Donate}/>
              <Route path="thankyou" component={ThankYou}/>

            </Route>
          </Router>
      </Provider>
    );
  }
}


ReactDOM.render(<Root store={store} />, MOUNT_NODE);
