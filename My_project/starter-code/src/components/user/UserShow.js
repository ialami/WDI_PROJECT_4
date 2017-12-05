import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Auth from '../../lib/Auth';
import Startup from '../startups/StartupUserShow';
import Axios from 'axios';
import _ from 'lodash';
import SearchBar from '../utility/SearchBar';

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
      <div>
        <h1>User profile page</h1>
        <button><Link to={`/users/${this.props.match.params.id}/edit`}>Edit users</Link></button>
        <button><Link to={`/users/${this.props.match.params.id}/edit/password`}>Reset password</Link></button>
        <p>Full name: {this.state.user.fullName}</p>
        <p>email: {this.state.user.email}</p>
        <p>username: {this.state.user.username}</p>
        <p>id: {this.state.user.id}</p>
        <h2>Your startups</h2>
        <SearchBar
          handleSearch={this.handleSearch}
          handleSort={this.handleSort}
        />
        { startups.map(startup => <Startup key={startup.id}
          deleteStartup={this.deleteStartup}
          {...startup}/>
        )}
      </div>
    );
  }
}

// Add edit link that links to edit page and delete button with a delete function

//then go to Edit User profile
