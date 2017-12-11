import React, { Component } from 'react';
import { Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Startup from '../startups/StartupUserShow';
import BackButton from '../utility/BackButton';

export default class UsersShow extends Component {
  // make a get request to the user with the id defined below

  state = {
    user: '',
    showModal: false,
    request: {
      text: '',
      sender: Auth.getCurrentUser(),
      receiver: this.props.match.params.id,
      senderProfile: ''
    },
    connectButton: 'Connect',
    commonFriends: ''
  }

  closeModal = () => {
    this.setState({ showModal: false });
  }

  openModal = () => {
    this.setState({ showModal: true });
  }

  componentDidMount(){
    this.getUser();
    this.getCurrentUser();
    this.getCommonFriends();
  }

  getCurrentUser(){
    const userId = Auth.getCurrentUser();
    Axios
      .get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        const request = Object.assign({}, this.state.request, { senderProfile: res.data } );
        this.setState({ request });
      })
      .catch(err => console.error(err));
  }

  getUser(){
    const userId = this.props.match.params.id;
    Axios
      .get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { value } }) => {
    const request = Object.assign({}, this.state.request, { text: value } );
    // this.setState({ request.text: text });
    this.setState({ request }, () => console.log(this.state.request.text));
  }

  handleSubmit = e => {
    e.preventDefault();
    console.log('current user', Auth.getCurrentUser());
    console.log(this.props.match.params.id);
    Axios
      .post(`/api/requests/addfriend/${this.props.match.params.id}`, this.state.request, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => console.log('this is the response from handleSubmit', res))
      .then(() => this.setState({ showModal: false, connectButton: 'Pending...' }))
      .catch(err => console.error(err));
  }

  getCommonFriends(){
    const currentUserId = Auth.getCurrentUser();
    const userProfileId = this.props.match.params.id;

    Axios
      .get(`/api/users/${currentUserId}/commonfriends/${userProfileId}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ commonFriends: res.data }))
      .catch(err => console.error(err));
  }

  render(){
    console.log('commonFriends', this.state.commonFriends);
    // console.log('this.state.showModal in render: ', this.state.showModal);
    const { fullName, id, email, startups, username} = this.state.user;

    const showModal = this.state.showModal;
    return(
      <div>
        <h1>Fullname: {fullName}</h1>
        <p>id: {id}</p>
        <p>email: {email}</p>
        <p>username: {username}</p>
        <BackButton />

        <button onClick={this.openModal} bsStyle="primary" bsSize="large">{this.state.connectButton}</button>
        <h2>Start-ups</h2>
        { startups && startups.map(startup => <Startup key={startup._id} {...startup} />)
        }
        <h2>Common friends</h2>
        { this.state.commonFriends && this.state.commonFriends.map((friend, i) => {
          return <div key={i}>
            {friend.fullName}
            <LinkContainer to={`/users/${friend._id}`}>
              <Button>
                Show profile
              </Button>
            </LinkContainer>
          </div>
        })}
        <div style={ showModal ? styles.showModal : styles.hideModal }>
          <h2>Send a friend request</h2>
          <form
            onSubmit={this.handleSubmit}
          >
            <FormGroup controlId="formControlsTextarea">
              {/* <ControlLabel>Textarea</ControlLabel> */}
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

      </div>
    );
  }
}

const styles = {
  hideModal: {
    opacity: '0',
    zIndex: '-1'
  },
  showModal: {
    opacity: '1',
    zIndex: '2'
  }
};
