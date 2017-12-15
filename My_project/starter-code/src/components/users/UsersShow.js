import React, { Component } from 'react';
import { Grid, Row, Col, Image, Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Startup from '../startups/StartupUserShow';
import BackButton from '../utility/BackButton';
import Promise from 'bluebird';

export default class UsersShow extends Component {
  // make a get request to the user with the id defined below

  state = {
    user: '',
    showModal: false,
    request: {
      text: '',
      receiver: this.props.match.params.id
    },
    status: 'Connect',
    commonFriends: '',
    disabled: '',
    boolean: false
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  componentDidMount(){
    this.getUser();

  }

  componentWillUpdate(nextProps) {
    if(nextProps.match.params.id !== this.props.match.params.id) this.getUser(nextProps.match.params.id);
  }

  handleButtons(){
    const currentUserId = Auth.getCurrentUser();
    const { user } = this.state;

    switch(true) {
      case user.friends.map(friend => friend.id).includes(currentUserId):
        return <div style={styles.buttoncontainer}>
          <button
            className="btn btn-primary"
            style={styles.button}
            // disabled={true}
          >
            You are friends
          </button>
        </div>;

      case user.pendingReceivedRequests.map(request => request.sender.id).includes(currentUserId):
        return <div style={styles.buttoncontainer}>
          <button
            className="btn btn-primary"
            style={styles.button}
            // disabled={true}
          >
          Pending
          </button>
        </div>;

      case user.pendingSentRequests.map(request => request.receiver.id).includes(currentUserId):
        return [
          <div key={0} style={styles.buttoncontainer}>
            <button
              className="btn btn-primary"
              style={styles.button}
              onClick={this.acceptFriend}
            >
              Accept
            </button>
          </div>,
          <div key={1} style={styles.buttoncontainer}>
            <button
              className="btn btn-primary"
              style={styles.button}
              onClick={this.refuseFriend}
            >
              Reject
            </button>
          </div>
        ];

      default:
        return <div style={styles.buttoncontainer}>
          <button
            onClick={this.openModal}
            className="btn btn-primary"
            style={styles.button}
          >
          Connect
          </button>
        </div>;
    }

  }

  getUser(id){
    id = id || this.props.match.params.id;
    const promises = {
      user: Axios.get(`/api/users/${id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      }).then(res => res.data),
      commonFriends: Axios.get(`/api/users/commonfriends/${id}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      }).then(res => res.data)
    };

    Promise.props(promises)
      .then(data => this.setState(data))
      .catch(err => console.error(err));
  }


  handleChange = ({ target: { value } }) => {
    const request = Object.assign({}, this.state.request, { text: value } );
    this.setState({ request });
  }

  handleSubmit = e => {
    e.preventDefault();

    Axios
      .post(`/api/requests/${this.props.match.params.id}/add`, this.state.request, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => {
        this.setState({ showModal: false });
        return this.getUser();
      })
      .catch(err => console.error(err));
  }

  acceptFriend = e => {
    e.preventDefault();
    const currentUserId = Auth.getCurrentUser();
    const requestId = this.state.user.pendingSentRequests.map(request => {
      if (request.receiver.id === currentUserId) return request.id;
    });

    Axios
      .put(`/api/requests/${requestId}/accept`, null, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => {
        console.log('You are now friends');
        return this.getUser();
      })
      .catch(err => console.error(err));
  }

  refuseFriend = e => {
    e.preventDefault();
    const currentUserId = Auth.getCurrentUser();
    const requestId = this.state.user.pendingSentRequests.map(request => {
      if (request.receiver.id === currentUserId) return request.id;
    });

    Axios
      .put(`/api/requests/${requestId}/refuse`, null, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() => {
        console.log('You have refused the friend request');
        return this.getUser();
      })
      .catch(err => console.error(err));
  }

  render(){
    const { fullName, id, email, startups, username} = this.state.user;
    let { showModal, boolean } = this.state;

    return(
      <Grid fluid style={styles.grid}>
        <Row>
          <h1 style={styles.profileName}>{fullName}</h1>
          {/* <BackButton /> */}
        </Row>
        <Row>
          {/* <Col
            lg={4} md={4} sm={4}
            style={styles.imagecontainer}
          >
            <Image src=""/>
          </Col> */}
          <Col lg={12} md={12} sm={12}>
            <div style={styles.profileDetails}>
              {/* <p>id: {id}</p> */}
              <p>{email}</p>
              <p>{username}</p>
            </div>
          </Col>
        </Row>

        { this.state.user && this.handleButtons()}
        <Row style={styles.myConnectionsContainer}>
          <Col lg={12} md={12} sm={12}>
            <h2 style={styles.myConnections}>Common friends ({this.state.commonFriends && this.state.commonFriends.length})</h2>
            <Row>
              { this.state.commonFriends && this.state.commonFriends.map((friend) => {
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
                        Show profile
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
            <h2 style={styles.myStartupsTitle}>Start-ups</h2>
            { startups && startups.map(startup => <Startup key={startup.id} {...startup} />)
            }
          </Col>
        </Row>
        <div style={ showModal ? styles.showModal : styles.hideModal }>
          <h2>Send a friend request</h2>
          <form
            onSubmit={this.handleSubmit}
          >
            <FormGroup controlId="formControlsTextarea">
              <FormControl
                componentClass="textarea"
                placeholder="Send a message"
                onChange={this.handleChange}
              />
              <button
                className="btn btn-primary"
                // style={styles.button}
              >
                Send request
              </button>
            </FormGroup>
          </form>
          <button
            onClick={this.closeModal}
          >
            Close
          </button>
        </div>

      </Grid>
    );
  }
}

const styles = {
  grid: {
    paddingRight: '0',
    paddingLeft: '0'
  },
  profileDetails: {
    margin: 'auto',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  hideModal: {
    opacity: '0'
    // zIndex: '-1'
  },
  showModal: {
    opacity: '1'
    // zIndex: '2'
  },
  showAcceptOrRefuseButtons: {
    opacity: '1'
  },
  hideAcceptOrRefuseButtons: {
    opacity: '0'
  },
  profileName: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 20px 0',
    fontWeight: 'bold',
    fontSize: '50px'
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
    margin: '10px 10px',
    alignItems: 'center',
    justifyContent: 'center'
  }

};
