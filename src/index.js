import React from 'react';
import createHistory from 'history/createBrowserHistory';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Route, Switch, Router } from 'react-router-dom';

import store from './components/store';
import { App } from './components';

import './components/App/app.scss';
import './components/Calendar/calendar.scss';
import './components/Calendar/Day/day.scss';
import './components/Calendar/Day/Hour/hour.scss';
import './components/Calendar/Day/Hour/Event/event.scss';

ReactDOM.render(
  <Router history={createHistory()}>
    <Provider store={store}>
      <Switch>
        <Route path='/' component={App} />
      </Switch>
    </Provider>
  </Router>,
  document.getElementById('root'),
);
