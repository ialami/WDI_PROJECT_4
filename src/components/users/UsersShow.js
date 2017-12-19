import React, { Component } from 'react';
import Auth from '../../lib/Auth';
import Axios from 'axios';
import _ from 'lodash';
import MyProfile from './MyProfile';
import UsersProfile from './UsersProfile';
import Promise from 'bluebird';


export default class UsersShow extends Component {

  state = {
    user: '',
    boolean: true,
    connections: '',
    showModal: false,
    request: {
      text: '',
      receiver: this.props.match.params.id
    },
    status: 'Connect',
    commonFriends: '',
    disabled: ''
  }

  componentDidMount(){
    this.getUser();
  }

// MY PROFILE ------------------------------------------------------------------
  deleteStartup = (e) => {
    Axios
      .delete(`/api/startups/${e.target.value}`, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() =>{
        this.props.history.push(`/users/${this.props.match.params.id}`);
        this.getUser();
      })
      .catch(err => console.log(err));
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

// -----------------------------------------------------------------------------

// ANY USER --------------------------------------------------------------------

closeModal = () => {
  this.setState({ showModal: false });
}

openModal = () => {
  this.setState({ showModal: true });
}

componentWillUpdate(nextProps) {
  if(nextProps.match.params.id !== this.props.match.params.id) this.getUser(nextProps.match.params.id);
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

handleButtons(){
  const currentUserId = Auth.getCurrentUser();
  const { user } = this.state;

  switch(true) {
    case user.friends && user.friends.map(friend => friend.id).includes(currentUserId):
      return <div
        // style={styles.buttoncontainer}
      >
        <button
          className="btn btn-primary"
          // style={styles.button}
          disabled={true}
        >
          You are friends
        </button>
      </div>;

    case user.pendingReceivedRequests && user.pendingReceivedRequests.map(request => request.sender.id).includes(currentUserId):
      return <div
        // style={styles.buttoncontainer}
      >
        <button
          className="btn btn-primary"
          // style={styles.button}
          disabled={true}
        >
        Pending
        </button>
      </div>;

    case user.pendingReceivedRequests && user.pendingSentRequests.map(request => request.receiver.id).includes(currentUserId):
      return [
        <div
          key={0}
          // style={styles.buttoncontainer}
        >
          <button
            className="btn btn-primary"
            // style={styles.button}
            onClick={this.acceptFriend}
          >
            Accept
          </button>
        </div>,
        <div
          key={1}
          // style={styles.buttoncontainer}
        >
          <button
            className="btn btn-primary"
            // style={styles.button}
            onClick={this.refuseFriend}
          >
            Reject
          </button>
        </div>
      ];

    default:
      return <div
        // style={styles.buttoncontainer}
      >
        <button
          onClick={this.openModal}
          className="btn btn-primary"
          // style={styles.button}
        >
        Connect
        </button>
      </div>;
  }

}

acceptFriend = e => {
  e.preventDefault();
  const currentUserId = Auth.getCurrentUser();
  const requestId = this.state.user.pendingSentRequests && this.state.user.pendingSentRequests.map(request => {
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
  const requestId = this.state.user.pendingSentRequests && this.state.user.pendingSentRequests.map(request => {
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

handleChangeRequest = ({ target: { value } }) => {
  const request = Object.assign({}, this.state.request, { text: value } );
  this.setState({ request });
}

handleSubmitRequest = e => {
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

// -------------------------------------------------------------------------


render(){

  // console.log('UsersShow.js >> this.state.user', this.state.user);

  const isCurrentUser = this.props.match.params.id === Auth.getCurrentUser() ? true : false;

  return(
    <div>
      { isCurrentUser && <MyProfile
        user={this.state.user}
        boolean={this.state.boolean}
        switchBoolean={this.switchBoolean}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        deleteStartup={this.deleteStartup}
      /> }
      { !isCurrentUser && <UsersProfile
        user={this.state.user}
        startups={this.state.user.startups}
        handleButtons={this.handleButtons()}
        showModal={this.state.showModal}
        closeModal={this.closeModal}
        handleChangeRequest={this.handleChangeRequest}
        handleSubmitRequest={this.handleSubmitRequest}
        commonFriends={this.state.commonFriends}
      /> }
    </div>
  );
}

}
