import React from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

import { Calendar } from '../../components';

const App = (props) => {
  return (
    <Switch>
      <Route path="/" component={Calendar} />
    </Switch>
  )
};

export default withRouter(App);
