import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './containers/App';
import { ControllerOne } from './containers/ControllerOne';
import { ControllerMulti } from './containers/ControllerMulti';

require('../assets/manifest.json');

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/urgentCare" component={ControllerOne} />
        <Route path="/dental" component={ControllerMulti} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
