import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from '../containers/Intro';
import Home from '../containers/Home';
import NotFound from '../containers/NotFound';

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Intro}/>
    <Route exact path='/app' component={Home}/>
    <Route path='*' component={NotFound}/>
  </Switch>
)

export default Routes;