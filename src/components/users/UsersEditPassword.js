import React, { Component } from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import MyProfileEditPasswordForm from './MyProfileEditPasswordForm.js';

export default class MyProfileEditPassword extends Component {

  state = {
    passwords: {
      oldPassword: '',
      newPassword: '',
      passwordConfirmation: ''
    },
    errors: ''
  }

  handleChange = ({ target: { name, value }}) => {
    const passwords = Object.assign( {}, this.state.passwords, { [name]: value });
    this.setState({ passwords, error: '' });
  }

  handleSubmit = e => {
    e.preventDefault();
    Axios
      .put(`/api/users/${this.props.match.params.id}/passwords`, this.state.passwords, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() =>
        this.props.history.push(`/users/${this.props.match.params.id}`))
      // .then(res => console.log(res))
      .catch(err => {
        console.error(err);
        this.setState({ errors: err.response.data.message });
      });
  }

  render(){
    return(
      <div>
        <MyProfileEditPasswordForm
          passwords ={this.state.passwords}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          errors={this.state.errors}
        />
      </div>
    );
  }
}
