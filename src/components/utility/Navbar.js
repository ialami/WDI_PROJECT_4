import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';
import { Button, Navbar, NavItem, Nav, NavDropdown, MenuItem, Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Axios from 'axios';
import UserSearchBar from './UserSearchBar';
import _ from 'lodash';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import fetch from 'isomorphic-fetch';
import Promise from 'bluebird';

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
    this.setState({ user: '' });
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
      .then(res => {
        this.setState({ user: res.data });
        // window.location.reload();
      })
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
        this.setState({ acceptButon: 'Request refused'});
        console.log('You have refused the friend request');
        window.location.reload();
      })
      .catch(err => console.error(err));
  }
  //
  // setSelectedOption = (e) => {
  //   if (e){
  //     this.setState({ selectedOption: e.value });
  //   } else {
  //     this.setState({ selectedOption: ''});
  //   }
  // }

  render(){
    console.log('user in navbar', this.state.user);
    // console.log('this.state.user.friends', this.state.user.friends);
    // console.log('this.state.selectedOption', this.state.selectedOption);
    // let finalOptions = null;
    //
    // if (this.state.users){
    //   console.log('this.state.users fdfdfd', this.state.users);
    //   finalOptions = this.state.users.map(user => {
    //     console.log('user fullname is ', user.fullName);
    //       return {fullName: user.fullName};
    //   });
    // }
    // console.log('finalOptions', finalOptions);


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
            {/* { Auth.isAuthenticated() && <NavItem>
              <Select
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
            { finalOptions && <Select
              name="users"
              value={this.state.selectedOption}
              onChange={this.setSelectedOption}
              options={finalOptions.fullName}
            />} */}
            { Auth.isAuthenticated() && <LinkContainer to="/inbox"><NavItem>Inbox</NavItem></LinkContainer>
            }
            { Auth.isAuthenticated() && <NavDropdown eventKey={3} title="Notifications" id="basic-nav-dropdown">
              { this.state.user.pendingReceivedRequests && this.state.user.pendingReceivedRequests.map(request => <MenuItem key={request.id} style={styles.notificationsMenuItem}>
                <Grid fluid>
                  <hr style={styles.lineBreak}></hr>
                  <Row div={styles.notificationsRow}>
                    <Col lg={6} md={6} sm={6} style={styles.sender}>
                      <LinkContainer style={styles.senderName} to={`/users/${request.sender.id}`}>
                        <div style={styles.senderFullName}>{request.sender.fullName}</div>
                      </LinkContainer>
                    </Col>
                    <Col lg={6} md={6} sm={6} style={styles.buttoncontainer}>
                      <div style={styles.buttoncontainer}>
                        <button
                          value={request.id}
                          onClick={this.acceptFriend}
                          className="btn btn-primary"
                          style={styles.button}
                        >
                          {this.state.acceptButton}
                        </button>
                      </div>
                      <div style={styles.buttoncontainer}>
                        <button
                          value={request.id}
                          onClick={this.refuseFriend}
                          className="btn btn-primary"
                          style={styles.button}
                        >
                          Refuse
                        </button>
                      </div>
                    </Col>
                  </Row>
                  <hr style={styles.lineBreak}></hr>
                </Grid>
              </MenuItem>
              )}
            </NavDropdown>}
          </Nav>
          <Nav pullRight>
            { Auth.isAuthenticated() && <NavDropdown
              eventKey={3}
              title={`Hello ${this.state.user.username} !`}
              id="basic-nav-dropdown"
            >
              <LinkContainer to="/inbox">
                <MenuItem eventKey={3.1}>Inbox</MenuItem>
              </LinkContainer>
              <LinkContainer to={`/users/${this.userId()}`}>
                <MenuItem eventKey={3.2}>Profile page</MenuItem>
              </LinkContainer>
              <LinkContainer to={`/users/${this.userId()}/edit/password`}>
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
  },
  buttoncontainer: {
    textAlign: 'center'
  },
  button: {
    width: '100px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '10',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: '2px 0'
  },
  sender: {
    // border: '2px solid green',
    textAlign: 'center',
    margin: 'auto',
    justifyContent: 'center',
    height: '62px',
    verticalAlign: 'middle',
    display: 'flex'
  },
  senderName: {
    margin: 'auto',
    fontWeight: 'bold'
    // border: '2px solid red'
  },
  senderFullName: {
    textAlign: 'center',
    verticalAlign: 'middle'
  },
  notificationsRow: {
    width: '100%',
    border: '2px solid green',
    height: '100px'
  },
  notificationsMenuItem: {
    justifyContent: 'center',
    width: '300px'
  },
  lineBreak: {
    color: 'black',
    height: '2px',
    backgroundColor: 'black',
    margin: '2px 0'
  }
};
