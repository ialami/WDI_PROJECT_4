import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Axios from 'axios';

class Navigationbar extends Component {
// const Navigationbar = ({ history }) => {

  state= {
    pendingRequests: []
  }

  logout(e) {
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
        // console.log(requests.data);
        requests.data.map(request => {
          // console.log('each request', request);
          // console.log('request status', request.status);
          // console.log('request receiver', request.receiver);
          // console.log('current user', Auth.getCurrentUser());
          if (request.status === 'pending' && request.receiver === Auth.getCurrentUser()){
            // console.log('it is a match!!!');
            // console.log(request)
            this.setState({ pendingRequests: this.state.pendingRequests.concat([request])});
          }
        });
        console.log('new pending requests', this.state.pendingRequests);
      })
      .catch(err => console.error(err));
  }

  componentDidMount(){
    this.getRequests();
  }



  render(){
// console.log('this in render', this);
// console.log(this.state.pendingRequests[0]);
  const requests = this.state.pendingRequests
  console.log('requesys', requests);

  const filteredRequests = requests.map(request => Object.assign({}, {sender: request.sender, id: request.id})
    );
  console.log('filteredRequests', filteredRequests);

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
              <MenuItem eventKey={3.2}>You have received friend req from { this.state.pendingRequests[0] && this.state.pendingRequests[0].sender}</MenuItem>

              { filteredRequests && filteredRequests.map((request, i) => {
                <MenuItem>
                  New request from
                  {/* {request.sender} */}
                </MenuItem>;
              })}
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
