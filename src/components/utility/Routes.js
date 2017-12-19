import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Home from '../statics/Home';
import StartupsIndex from '../startups/StartupsIndex';
import StartupsNew from '../startups/StartupsNew';
import StartupsShow from '../startups/StartupsShow';
import StartupsEdit from '../startups/StartupsEdit';
import UsersShow from '../users/UsersShow';
import UsersEditPassword from '../users/UsersEditPassword';
// import UsersShow from '../users/UsersShow';
import Inbox from '../messages/Inbox';
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
      <ProtectedRoute path="/users/:id/edit/password" component={UsersEditPassword}/>
      {/* <ProtectedRoute path="/users/:id/edit" component={MyProfileEdit}/> */}
      <ProtectedRoute path="/users/:id" component={UsersShow}/>
      {/* <Route path="/users/:id" component={UsersShow}/> */}
      <Route path="/inbox" component={Inbox}/>
    </Switch>
  );
};

export default Routes;
