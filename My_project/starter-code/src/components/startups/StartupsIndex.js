import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Startup from './StartupIndex';
import Auth from '../../lib/Auth';
import SearchBar from '../utility/SearchBar';
import _ from 'lodash';

export default class StartupsIndex extends Component {

  state = {
    startups: [],
    query: '',
    sortBy: 'date',
    sortDirection: 'desc'
  }

  componentWillMount(){
    Axios
      .get('/api/startups')
      .then(res => this.setState({ startups: res.data }))
      .catch(err => console.error(err));
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
        <h1>Index page</h1>
        <SearchBar
          handleSearch={this.handleSearch}
          handleSort={this.handleSort}
        />
        { Auth.isAuthenticated() && <h2><Link to="/startups/new">Add a start-up</Link></h2> }
        { startups.map(startup => <Startup key={startup.id} {...startup}/>) }
      </div>
    );
  }
}
