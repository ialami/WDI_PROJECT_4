import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Button, Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Axios from 'axios';

class Navigationbar extends Component {
// const Navigationbar = ({ history }) => {

  state= {
    pendingRequests: []
  }

  logout = (e) => {
    e.preventDefault();
    console.log(this);
    Auth.removeToken();
    Auth.removeCurrentUser();
    this.props.history.push('/');
  }

  userId(){
    return Auth.getCurrentUser();
  }

  getRequests(){
    Axios
      .get('/api/requests', {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(requests => {
        console.log('requests.data', requests.data);
        const pendingRequests = requests.data.filter(request => {
          return request.status === 'pending' && request.receiver === Auth.getCurrentUser();
        });
        this.setState({ pendingRequests });
      })
      .catch(err => console.error(err));
  }

  componentDidMount(){
    this.getRequests();
  }

  acceptFriend = e => {
    e.preventDefault();
    Axios
      .put(`/api/requests/${e.target.value}/accept`, null, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => console.log('You are now friends !'))
      .catch(err => console.error(err));
  }



  render(){
    console.log('pending requests', this.state.pendingRequests);
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
            <NavDropdown eventKey={3} title="Notifications" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>

              { this.state.pendingRequests && this.state.pendingRequests.map(request => <MenuItem key={request.id}>
                <LinkContainer to={`/users/${request.sender}`}>
                  <a href="">New request from {request.senderProfile.fullName}</a>
                </LinkContainer>
                <Button
                  value={request.id} onClick={this.acceptFriend}
                >
                  Accept
                </Button>
              </MenuItem>
              )}
            </NavDropdown>
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
                <NavItem onClick={this.logout}>Logout</NavItem>
            }
            { Auth.isAuthenticated() &&
                <NavItem>Hello</NavItem>
            }
            { Auth.isAuthenticated() &&
              <LinkContainer to={`/myprofile/${this.userId()}`}>
                <NavItem>Profile page</NavItem>
              </LinkContainer>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default withRouter(Navigationbar);

const styles = {
  navbar: {
    borderRadius: '0',
    border: '3px solid red',
    background: 'rgba(0, 0, 0, 0.7)',
    color: 'rgba(255, 255, 255, 1)!important',
    marginBottom: '0'
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
