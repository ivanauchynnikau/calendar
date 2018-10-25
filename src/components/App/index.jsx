import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Calendar } from '../../components';

const App = () => {
  return (
    <Switch>
      <Route exact path="/" component={Calendar} />
    </Switch>
  )
};

export default withRouter(App);
