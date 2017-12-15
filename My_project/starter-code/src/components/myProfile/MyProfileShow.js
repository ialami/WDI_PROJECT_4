import React, { Component } from 'react';
import Auth from '../../lib/Auth';
import Startup from '../startups/StartupUserShow';
import Axios from 'axios';
import _ from 'lodash';
import SearchBar from '../utility/SearchBar';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import MyProfileForm from './MyProfileForm';

export default class MyProfileShow extends Component {

  state = {
    user: '',
    query: '',
    sortBy: 'date',
    sortDirection: 'desc',
    boolean: true,
    connections: ''
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

  componentDidMount(){
    this.getUser();
  }

  deleteStartup = (e) => {
    Axios
      .delete(`/api/startups/${e.target.value}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
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

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign( {}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = e => {
    e.preventDefault();

    const userId = Auth.getCurrentUser();
    Axios
      .put(`/api/users/${userId}`, this.state.user, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.switchBoolean())
      .catch(err => console.error(err));
  }

  render(){
    const { sortBy, sortDirection, query, boolean } = this.state;
    const regex = new RegExp(query, 'i');

    const orderedStartups = _.orderBy(this.state.user.startups, [sortBy], [sortDirection]);
    const startups = _.filter(orderedStartups, startup => regex.test([startup.name, startup.industry, startup.country]));

console.log('MY PROFILE this.state.user', this.state.user);

    const { fullName, email, username, id } = this.state.user;

    return(
      <Grid fluid style={styles.grid}>
        <h1 style={styles.myprofile}>My profile</h1>
        <Row>
          {/* <Col
            lg={4} md={4} sm={4}
            style={styles.imagecontainer}
          >
            <Image src=""/>
          </Col> */}
          <Col lg={12} md={12} sm={12}>

            { boolean && <div style={styles.myDetails}>
              <p>{fullName}</p>
              <p>{email}</p>
              <p>{username}</p>
              <Button style={styles.button} onClick={this.switchBoolean}>
                Update details
              </Button>
              <LinkContainer style={styles.buttons} to={`/myprofile/${this.props.match.params.id}/edit/password`}>
                <div style={styles.buttoncontainer}>
                  <button
                    className="btn btn-primary"
                    style={styles.button}>
                    Update password
                  </button>
                </div>
              </LinkContainer>
            </div>
            }
            { !boolean && <MyProfileForm
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              user={this.state.user}
              history={this.props.history}
              switchBoolean={this.switchBoolean}
            />
            }
          </Col>
        </Row>
        <Row style={styles.myConnectionsContainer}>
          <Col lg={12} md={12} sm={12}>
            <h1 style={styles.myConnections}>My connections ({this.state.user.friends && this.state.user.friends.length})</h1>
            <Row>
              { this.state.user.friends && this.state.user.friends.map(friend => {
                return <Col
                  key={friend.id}
                  lg={12} md={12} sm={12}
                  style={styles.colConnections}
                >
                  <div style={styles.connection}>
                    <p style={styles.connectionName}>{friend.fullName}</p>
                    <LinkContainer to={`/users/${friend.id}`}>
                      <div style={styles.buttoncontainer}>
                        <button
                          className="btn btn-primary"
                          style={styles.button}>
                          See profile
                        </button>
                      </div>
                    </LinkContainer>
                  </div>
                </Col>;
              })}
            </Row>
          </Col>
        </Row>
        <Row style={styles.myStartupsContainer}>
          <Col lg={12} md={12} sm={12} style={styles.colMyStartups}>
            <h2 style={styles.myStartupsTitle}>My start-ups</h2>
            <SearchBar
              handleSearch={this.handleSearch}
              handleSort={this.handleSort}
            />
            { this.state.user.startups && this.state.user.startups.map(startup => <Startup key={startup.id}
              // value={startup._id}
              deleteStartup={this.deleteStartup}
              {...startup}
            />
            )}
          </Col>
        </Row>
      </Grid>
    );
  }
}

const styles = {
  grid: {
    paddingRight: '0',
    paddingLeft: '0'
  },
  myprofile: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 20px 0',
    fontWeight: 'bold',
    fontSize: '50px'
  },
  myDetails: {
    margin: 'auto',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imagecontainer: {
    border: '3px solid green',
    height: '100%'
  },
  myConnectionsContainer: {
    // width: '50%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // border: '2px solid red',
    color: 'rgba(31, 180, 255, 1)',
    backgroundColor: 'white'
  },
  myConnections: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 20px 0',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  connectionName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  connection: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    padding: '10px'
  },
  colMyStartups: {
    // border: '2px solid red',
    margin: 'auto',
    // width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  myStartupsContainer: {
    width: '80%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
  },
  myStartupsTitle: {
    padding: '20px 0 20px 0',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  buttoncontainer: {
    textAlign: 'center',
    margin: '10px 0',
    alignItems: 'center',
    justifyContent: 'center'
    // margin: 'auto'
  },
  button: {
    width: '200px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '20',
    fontWeight: 'bold',
    margin: '10px 0',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
