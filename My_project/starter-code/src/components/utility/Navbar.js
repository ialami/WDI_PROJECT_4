import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Button, Navbar, NavItem, Nav, NavDropdown, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Axios from 'axios';
import UserSearchBar from './UserSearchBar';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import fetch from 'isomorphic-fetch';

class Navigationbar extends Component {

  state= {
    user: '',
    acceptButton: 'Accept',
    users: '',
    query: '',
    selectedOption: '',
    value: ''
  }

  logout = (e) => {
    e.preventDefault();
    Auth.removeToken();
    Auth.removeCurrentUser();
    this.props.history.push('/');
  }

  userId(){
    return Auth.getCurrentUser();
  }

  getCurrentUser(){
    const userId = Auth.getCurrentUser();
    Axios
      .get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  getAllUsers(){
    Axios
      .get('/api/users', {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.error(err));
  }

  handleSearch = e => {
    this.setState({ query: e.target.value });
  }

  componentDidMount(){
    this.getCurrentUser();
    this.getAllUsers();
  }

  acceptFriend = e => {
    e.preventDefault();
    Axios
      .put(`/api/requests/${e.target.value}/accept`, null, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => {
        this.setState({ acceptButon: 'Request accepted'});
        console.log('You are now friends');
      })
      .catch(err => console.error(err));
  }

  refuseFriend = e => {
    e.preventDefault();
    Axios
      .put(`/api/requests/${e.target.value}/refuse`, null, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => {
        console.log('You have refused the friend request');
      })
      .catch(err => console.error(err));
  }

// -------------------------------------- react-select

  onChange (value) {
    console.log(value, 'firing');
    this.setState({value}, () => {
      console.log(this.state);
    });
  }

  toggleCreatable () {
    this.setState({
      creatable: !this.state.creatable
    });
  }
  async getUsers (input) {
    if (!input) {
      return { options: [] };
    }

    const response = await Axios
      .get('/api/users', {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      });

    this.setState({options: response.data});
    console.log('response', response);
    console.log('response.data', response.data);
    return response.data;
  }

  gotoUser (value, event) {
    console.log(value, event);
  }

// -------------------------------------------

  render(){
    // console.log('this.state.user', this.state.user);
    /*
    const regex = new RegExp(query, 'i');

    const { query, users } = this.state;

    const users = _.filter(users, user => regex.test([user.fullName, user.id]));
    */

    const AsyncComponent = this.state.creatable ? Select.AsyncCreatable : Select.Async;

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
            <LinkContainer style={styles.text} to="/startups">
              <NavItem>Explore start-ups !</NavItem>
            </LinkContainer>
            {/* <NavItem>
              <UserSearchBar
                handleSearch={this.handleSearch}
              />
            </NavItem> */}
            { Auth.isAuthenticated() && <NavItem>
              <AsyncComponent
                // multi={this.state.multi}
                value={this.state.value}
                onChange={this.onChange}
                onValueClick={this.gotoUser}
                valueKey="id"
                labelKey="login"
                loadOptions={this.getUsers}
                style={styles.searchBar}
                // backspaceRemoves={this.state.backspaceRemoves}
              />
            </NavItem> }
            { Auth.isAuthenticated() && <LinkContainer to="/inbox"><NavItem>Inbox</NavItem></LinkContainer>
            }
            { Auth.isAuthenticated() && <NavDropdown eventKey={3} title="Notifications" id="basic-nav-dropdown">
              { this.state.user.pendingReceivedRequests && this.state.user.pendingReceivedRequests.map(request => <MenuItem key={request.id}>
                <LinkContainer to={`/users/${request.sender.id}`}>
                  <p>New request from {request.sender.fullName}</p>
                </LinkContainer>
                <Button
                  value={request.id} onClick={this.acceptFriend}
                >
                  {this.state.acceptButton}
                </Button>
                <Button
                  value={request.id} onClick={this.refuseFriend}
                >
                  Refuse
                </Button>
              </MenuItem>
              )}
            </NavDropdown>}
          </Nav>
          <Nav pullRight>
            { Auth.isAuthenticated() && <NavDropdown eventKey={3} title={`Hello ${this.state.user.username} !`} id="basic-nav-dropdown">
              <LinkContainer to="/inbox">
                <MenuItem eventKey={3.1}>Inbox</MenuItem>
              </LinkContainer>
              <LinkContainer to={`/myprofile/${this.userId()}`}>
                <MenuItem eventKey={3.2}>Profile page</MenuItem>
              </LinkContainer>
              <LinkContainer to={`/myprofile/${this.userId()}/edit/password`}>
                <MenuItem eventKey={3.3}>Edit password</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <MenuItem eventKey={3.4} onClick={this.logout}>Logout</MenuItem>
            </NavDropdown> }
            { !Auth.isAuthenticated() && <LinkContainer to="/login"><NavItem>Login</NavItem></LinkContainer>
            }
            { !Auth.isAuthenticated() &&
              <LinkContainer to="/register">
                <NavItem>Register</NavItem>
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
    // border: '3px solid red',
    backgroundColor: 'rgba(0, 0, 0, 1)',
    color: 'rgba(255, 6, 255, 1)!important',
    marginBottom: '0',
    height: '100%'
  },
  brandContainer: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0)!important',
    height: '100%'
  },
  brand: {
    color: 'rgba(255, 255, 255, 1)!important',
    fontSize: '30'
  },
  text: {
    color: 'white',
    // fontSize: '10',
    // border: '1px solid red',
    height: '100%',
    paddingBottom: '0px'
  },
  searchBar: {
    // border: '2px solid red',
    width: '200px'
  }
};
