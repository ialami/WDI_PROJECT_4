import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Startup from './StartupIndex';
import Auth from '../../lib/Auth';
import SearchBar from '../utility/SearchBar';
import _ from 'lodash';
import { Grid, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

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
            lg={12} md={12} sm={12}
          >
            { Auth.isAuthenticated() && <LinkContainer to="/startups/new">
              <div style={styles.buttoncontainer}>
                <button
                  className="btn btn-primary"
                  style={styles.button}>
                  Add a start-up
                </button>
              </div>
            </LinkContainer> }
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
          { startups.map(startup => {
            return  <Col
              key={startup.id}
              lg={4} md={4} sm={12}
              style={styles.card}
            >
              <Startup
                {...startup}
                // key={startup.id}
                // style={styles.card}
              />
            </Col>;
          })
          }
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
    // border: '3px solid black',
    margin: 'auto',
    padding: '20px',
    width: '100%',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  searchbar: {
    // border: '3px solid pink'
    // paddingLeft: '0',
    // marginLeft: '0'
  },
  card: {
    // paddingRight: '0',
    // paddingLeft: '0',
    // border: '1px solid green'
  },
  buttoncontainer: {
    textAlign: 'center',
    margin: '10px 0'
  },
  button: {
    width: '200px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '20',
    fontWeight: 'bold',
    margin: '10px 0'
  }
};
