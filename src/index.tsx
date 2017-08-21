import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router';
import { createBrowserHistory } from 'history';
import { configureStore } from './store';
import { App } from './containers/App';
import { ControllerOne } from './containers/ControllerOne';
import { ControllerMulti } from './containers/ControllerMulti';
import { WaitTimeWidget } from './containers/WaitTimeWidget';
import { DentalWidget } from './containers/DentalWidget';

require('../assets/manifest.json');
require('../assets/CareIQLogo.png');
require('../assets/favicon.ico');
const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/urgentCare" component={ControllerOne} />
        <Route path="/dental" component={ControllerMulti} />
        <Route path="/waitTimeWidget" component={WaitTimeWidget} />
        <Route path="/dentalWidget" component={DentalWidget} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById('root')
);
