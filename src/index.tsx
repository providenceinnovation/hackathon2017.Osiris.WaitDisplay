import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as firebase from 'firebase/app';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './containers/App';
require('../assets/manifest.json');

const store = configureStore();
const history = createBrowserHistory();

var firebaseConfig = {
  apiKey: "AIzaSyAK85QlhMVUyDgMZYaXDX3wWaTUnhHAoPo",
  authDomain: "osiris-26b00.firebaseapp.com",
  databaseURL: "https://osiris-26b00.firebaseio.com",
  projectId: "osiris-26b00",
  storageBucket: "osiris-26b00.appspot.com",
  messagingSenderId: "608884455613"
};
console.log('Configuring firebase: ', firebaseConfig);
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
