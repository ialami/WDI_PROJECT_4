import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../statics/Home';
import StartupsIndex from '../startups/StartupsIndex';
import StartupsNew from '../startups/StartupsNew';
import StartupsShow from '../startups/StartupsShow';
import StartupsEdit from '../startups/StartupsEdit';
import UserShow from '../user/UserShow';
import UserEdit from '../user/UserEdit';
import UserEditPassword from '../user/UserEditPassword';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return(
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route exact path="/" component={Home}/>
      <ProtectedRoute path="/startups/new" component={StartupsNew}/>
      <ProtectedRoute path="/startups/:id/edit" component={StartupsEdit}/>
      <Route path="/startups/:id" component={StartupsShow}/>
      <Route path="/startups" component={StartupsIndex}/>
      <Route path="/users/:id/edit/password" component={UserEditPassword}/>
      <Route path="/users/:id/edit" component={UserEdit}/>
      <ProtectedRoute path="/users/:id" component={UserShow}/>
    </Switch>
  );
};

export default Routes;
