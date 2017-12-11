import React, { Component } from 'react';
// import UserForm from './UserForm';
// import BackButton from '../utility/BackButton';
// import Axios from 'axios';
// import Auth from '../../lib/Auth';

export default class MyProfileEdit extends Component {

  state = {
    user: {
      fullName: '',
      username: '',
      email: ''
    },
    switchBoolean: this.props.switchBoolean
  }

  // componentDidMount(){
  //   const userId = Auth.getCurrentUser();
  //   console.log(this);
  //   Axios
  //     // .get(`/api/users/${this.props.match.params.id}`, {
  //     .get(`/api/users/${userId}`, {
  //       headers: { Authorization: `Bearer ${Auth.getToken()}`}
  //     })
  //     .then(res => this.setState({ user: res.data }))
  //     .catch(err => console.error(err));
  // }

  // handleChange = ({ target: { name, value }}) => {
  //   const user = Object.assign( {}, this.state.user, { [name]: value });
  //   this.setState({ user });
  // }

  // handleSubmit = e => {
  //   e.preventDefault();
  //   const userId = Auth.getCurrentUser();
  //   Axios
  //     .put(`/api/users/${userId}`, this.state.user, {
  //       headers: {'Authorization': `Bearer ${Auth.getToken()}`}
  //     })
  //     .then(() => {
  //       // this.setState({ switchBoolean: !this.state.switchBoolean});
  //       return this.state.switchBoolean;
  //     })
  //     // this.props.history.push(`/users/${userId}`))
  //     .catch(err => console.error(err));
  // }

  render(){
    return(
      <div>
        {/* <UserForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          user={this.state.user}
          history={this.props.history}
          switchBoolean={this.state.switchBoolean}
        /> */}
      </div>
    );
  }
}
