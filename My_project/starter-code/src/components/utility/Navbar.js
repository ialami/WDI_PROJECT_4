import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.removeToken();
    Auth.removeCurrentUser();
    history.push('/');
  }

  function userId(){
    return Auth.getCurrentUser();
  }

  return(

    <nav>
      <Link to="/">Home</Link>
      {' '}
      <Link to="/startups">See start-ups</Link>
      {' '}
      { !Auth.isAuthenticated() && <Link to="/login">Login</Link> }
      {' '}
      { !Auth.isAuthenticated() && <Link to="/register">Register</Link> }
      {' '}
      { Auth.isAuthenticated() && <a href="#" onClick = {logout}>Logout</a> }
      {' '}
      { Auth.isAuthenticated() && <p>Hello!</p> }
      {' '}
      { Auth.isAuthenticated() && <Link to={`/users/${userId()}`}>Profile page</Link> }
    </nav>
  );
};

export default withRouter(Navbar);
