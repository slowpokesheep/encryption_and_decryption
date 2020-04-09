import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/Home/index';

export default function Routes(props) {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
      </Switch>
    </Router>
  )
}
