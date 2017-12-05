import React, { Component } from 'react';
import UserForm from './UserForm';
import BackButton from '../utility/BackButton';
import Axios from 'axios';
import Auth from '../../lib/Auth';

export default class UserEdit extends Component {

  state = {
    user: {
      fullName: '',
      username: '',
      email: ''
    }
  }

  componentDidMount(){
    Axios
      .get(`/api/users/${this.props.match.params.id}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ user: res.data }))
      .catch(err => console.error(err));
  }

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign( {}, this.state.user, { [name]: value });
    this.setState({ user});
  }

  handleSubmit = e => {
    e.preventDefault();

    Axios
      .put(`/api/users/${this.props.match.params.id}`, this.state.user, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      .then(() =>
        this.props.history.push(`/users/${this.props.match.params.id}`))
      .catch(err => console.error(err));
  }

  render(){
    return(
      <div>
        <h1>User edit page</h1>
        <BackButton />
        <UserForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          user={this.state.user}
          history={this.props.history}
        />
      </div>
    );
  }
}
