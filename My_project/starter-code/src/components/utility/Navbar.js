import React from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Navbar, NavItem, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Navigationbar = ({ history }) => {

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

    <Navbar inverse collapseOnSelect style={styles.navbar}>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to="/" style={styles.brandContainer}>
            <NavItem style={styles.brand}>techXpartners</NavItem>
          </LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle/>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/startups">
            <NavItem>See start-ups</NavItem>
          </LinkContainer>
        </Nav>
        <Nav pullRight>
          { !Auth.isAuthenticated() && <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>
          }
          { !Auth.isAuthenticated() &&
            <LinkContainer to="/register">
              <NavItem>Register</NavItem>
            </LinkContainer>
          }
          { Auth.isAuthenticated() &&
              <NavItem onClick={logout}>Logout</NavItem>
          }
          { Auth.isAuthenticated() &&
              <NavItem>Hello</NavItem>
          }
          { Auth.isAuthenticated() &&
            <LinkContainer to={`/users/${userId()}`}>
              <NavItem>Profile page</NavItem>
            </LinkContainer>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withRouter(Navigationbar);

const styles = {
  navbar: {
    borderRadius: '0',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'rgba(255, 255, 255, 1)!important'
  },
  brandContainer: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)!important'
  },
  brand: {
    color: 'rgba(255, 255, 255, 1)!important',
    fontSize: '30'
  }
};
