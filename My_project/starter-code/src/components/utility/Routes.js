import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../statics/Home';
import StartupsIndex from '../startups/StartupsIndex';
import StartupsNew from '../startups/StartupsNew';
import StartupsShow from '../startups/StartupsShow';
import StartupsEdit from '../startups/StartupsEdit';
import MyProfileShow from '../myProfile/MyProfileShow';
import MyProfileEdit from '../myProfile/MyProfileEdit';
import MyProfileEditPassword from '../myProfile/MyProfileEditPassword';
import UsersShow from '../users/UsersShow';
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
  return(
    <Switch>
      <Route path="/login" component={Login}/>
      <Route path="/register" component={Register}/>
      <Route exact path="/" component={Home}/>
      <ProtectedRoute path="/startups/new" component={StartupsNew}/>
      <ProtectedRoute path="/startups/:id/edit" component={StartupsEdit}/>
      <ProtectedRoute path="/startups/:id" component={StartupsShow}/>
      <Route path="/startups" component={StartupsIndex}/>
      <ProtectedRoute path="/myprofile/:id/edit/password" component={MyProfileEditPassword}/>
      <ProtectedRoute path="/myprofile/:id/edit" component={MyProfileEdit}/>
      <ProtectedRoute path="/myprofile/:id" component={MyProfileShow}/>
      <Route path="/users/:id" component={UsersShow}/>
    </Switch>
  );
};

export default Routes;
