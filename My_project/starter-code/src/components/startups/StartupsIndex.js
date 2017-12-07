import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Startup from './StartupIndex';
import Auth from '../../lib/Auth';
import SearchBar from '../utility/SearchBar';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';

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
      <Grid fluid style={styles.container}>
        <Row>
          <Col
            lg={12} md={12} ls={12}
          >
            <Row>
              <h1 style={styles.header}>Explore start-ups and discover new opportunities</h1>
            </Row>
            <Row style={styles.searchbar}>
              <SearchBar
                handleSearch={this.handleSearch}
                handleSort={this.handleSort}
              />
            </Row>
          </Col>
        </Row>
        <Row>
          { Auth.isAuthenticated() && <h2><Link to="/startups/new">Add a start-up</Link></h2> }
          { startups.map(startup => <Startup key={startup.id} {...startup}/>) }
        </Row>
      </Grid>
    );
  }
}

const styles = {
  container: {
    // paddingLeft: '0',
    // paddingRight: '0'
  },
  header: {
    border: '3px solid black',
    margin: 'auto',
    padding: '10px',
    width: '100%',
    textAlign: 'center'
  },
  searchbar: {
    border: '3px solid pink'
    // paddingLeft: '0',
    // marginLeft: '0'
  }
};
