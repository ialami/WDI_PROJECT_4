import React, { Component } from 'react';
import LoginForm from './LoginForm';
import Axios     from 'axios';
import Auth from '../../lib/Auth';

export default class Login extends Component {

  state = {
    user: {
      email: '',
      password: ''
    },
    errors: {}
  };

handleChange = ({ target: { name, value } }) => {
  const user = Object.assign({}, this.state.user, { [name]: value });
  const errors = Object.assign({}, this.state.errors, { [name]: '' });
  this.setState({ user, errors });
}

handleSubmit = (e) => {
  e.preventDefault();

  Axios
    .post('/api/login', this.state.user)
    .then(res => {
      Auth.saveCurrentUser(res.data.user.id);
      Auth.setToken(res.data.token);
      this.props.history.push('/');
    })
    .catch(err => this.setState({ errors: err.response.data.errors }));
}

render(){
  return(
    <div>
      <h1>Login page</h1>
      <LoginForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    </div>
  );
}

}