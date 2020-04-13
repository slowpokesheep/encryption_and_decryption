import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import Home from './pages/Home/index';
import AESPage from './pages/AES';
import DESPage from './pages/DES';
import DES3Page from './pages/DES3';
import RSAPage from './pages/RSA';
import About from './pages/about';

export default function Routes(props) {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/aes' component={AESPage} />
        <Route exact path='/des' component={DESPage} />
        <Route exact path='/3des' component={DES3Page} />
        <Route exact path='/rsa' component={RSAPage} />
        <Route exact path='/about' component={About} />
      </Switch>
    </Router>
  )
}
