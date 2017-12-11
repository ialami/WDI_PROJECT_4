import React, { Component } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import Startup from '../startups/StartupUserShow';

export default class UsersShow extends Component {
  // make a get request to the user with the id defined below

  state = {
    user: '',
    showModal: false
  }

  closeModal = (e) => {
    e.preventDefault();
    console.log('closeModal fired');
    console.log(this);
    this.setState({ showModal: false });
    console.log('on closeModal', this.state.showModal);
  }

  openModal = (e) => {
    e.preventDefault();
    // console.log(this);
    this.setState({ showModal: true });
  }

  componentDidMount(){
    this.getUser();
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

  // sendFriendRequest(){
  //   const userId = this.props.match.params.id;
  //   Axios
  //     .post(`/requests/addfriend/${userId}`)
  //     .then(res => )
  //     .catch(err => console.err(err));
  // }

  render(){
    console.log(this);
    console.log('in render: ', this.state.showModal);
    const { fullName, id, email, startups, username} = this.state.user;
    return(
      <div>
        <h1>Fullname: {fullName}</h1>
        <p>id: {id}</p>
        <p>email: {email}</p>
        <p>username: {username}</p>
        <Button onClick={this.openModal} bsStyle="primary" bsSize="large">Connect</Button>
        { startups && startups.map(startup => <Startup key={startup._id} {...startup} />)
        }
        <Modal
          show={this.state.showModal}
          onHide={this.closeModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Send a friend request</Modal.Title>
          </Modal.Header>
          <Modal.body>
            <h2>Send a message</h2>
          </Modal.body>
          <Modal.Footer>
            <Button
              onClick={this.closeModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
