import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Startup from '../startups/StartupUserShow';
import Axios from 'axios';
import _ from 'lodash';
import SearchBar from '../utility/SearchBar';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import UserEdit from './UserEdit';

export default class UserShow extends Component {

  state = {
    user: '',
    startups: [],
    query: '',
    sortBy: 'date',
    sortDirection: 'desc',
    boolean: true
  }

  getUser(){
    const userId = Auth.getCurrentUser();
    Axios
      .get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  getStartups(){
    const userId = Auth.getCurrentUser();

    Axios
      .get(`/api/users/${userId}/startups`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ startups: res.data }))
      .catch(err => console.error(err));
  }

  componentDidMount(){
    this.getUser();
    this.getStartups();
  }

  deleteStartup = (e) => {
    Axios
      .delete(`/api/startups/${e.target.value}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(window.location.reload())
      .then(() => this.props.history.push(`/users/${this.props.match.params.id}`))
      .catch(err => console.log(err));
  }

  handleSearch = e => {
    this.setState({ query: e.target.value });
  }

  handleSort = e => {
    const [sortBy, sortDirection] = e.target.value.split('|');
    this.setState({ sortBy, sortDirection });
  }

  switchBoolean = () => {
    this.setState({ boolean: !this.state.boolean });
  }

  render(){
    const { sortBy, sortDirection, query, boolean } = this.state;
    const regex = new RegExp(query, 'i');

    const orderedStartups = _.orderBy(this.state.startups, [sortBy], [sortDirection]);
    const startups = _.filter(orderedStartups, startup => regex.test([startup.name, startup.industry, startup.country]));
console.log('boolean in user show', this.state.boolean);
    return(
      <Grid fluid>
        <h1 style={styles.myprofile}>My profile</h1>
        <Row>
          <Col
            lg={4} md={4} ls={4}
            style={styles.imagecontainer}
          >
            <Image src=""/>
          </Col>
          <Col lg={8} md={8} ls={8}>

            { boolean && <div>
              <p>Full name: {this.state.user.fullName}</p>
              <p>email: {this.state.user.email}</p>
              <p>username: {this.state.user.username} - id: {this.state.user.id}</p>
              {/* <LinkContainer style={styles.buttons} to={`/users/${this.props.match.params.id}/edit`}> */}
              <Button onClick={this.switchBoolean}>
                Update details
              </Button>
              {/* </LinkContainer> */}
              <LinkContainer style={styles.buttons} to={`/users/${this.props.match.params.id}/edit/password`}>
                <Button>
                  Update password
                </Button>
              </LinkContainer>
            </div>
            }
            { !boolean && <UserEdit switchBoolean={this.switchBoolean}/>}
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} ls={12}>
            <h1>My connections</h1>
          </Col>
        </Row>
        <Row>
          <Col lg={12} md={12} ls={12}>
            <h2>My startups</h2>
            <SearchBar
              handleSearch={this.handleSearch}
              handleSort={this.handleSort}
            />
            { startups.map(startup => <Startup key={startup.id}
              deleteStartup={this.deleteStartup}
              {...startup}/>
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  myprofile: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0 40px 0'
  },
  imagecontainer: {
    border: '3px solid green',
    height: '100%'
  },
  buttons: {
    margin: '0 10px 10px 0'
  }
};
