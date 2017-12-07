import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Startup from '../startups/StartupUserShow';
import Axios from 'axios';
import _ from 'lodash';
import SearchBar from '../utility/SearchBar';
import { Grid, Row, Col } from 'react-bootstrap';

export default class UserShow extends Component {

  state = {
    user: '',
    startups: [],
    query: '',
    sortBy: 'date',
    sortDirection: 'desc'
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

  render(){
    const { sortBy, sortDirection, query } = this.state;
    const regex = new RegExp(query, 'i');

    const orderedStartups = _.orderBy(this.state.startups, [sortBy], [sortDirection]);
    const startups = _.filter(orderedStartups, startup => regex.test([startup.name, startup.industry, startup.country]));

    return(
      <Grid fluid>
        <Row>
          <Col lg={4} md={4} ls={4}>
            <h1>Image</h1>
          </Col>
          <Col lg={8} md={8} ls={8}>
            <p>Full name: {this.state.user.fullName}</p>
            <p>email: {this.state.user.email}</p>
            <p>username: {this.state.user.username}</p>
            <p>id: {this.state.user.id}</p>
            <button><Link to={`/users/${this.props.match.params.id}/edit`}>Edit users</Link></button>
            <button><Link to={`/users/${this.props.match.params.id}/edit/password`}>Reset password</Link></button>
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
