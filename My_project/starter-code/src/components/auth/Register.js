import React, { Component }   from 'react';
import RegisterForm           from './RegisterForm';
import Axios                  from 'axios';
import Auth                   from '../../lib/Auth';

export default class Register extends Component {

  state = {
    user: {
      fullName: '',
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    },
    errors: {}
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    const errors = Object.assign({}, this.state.errors, { [name]: '' });
    this.setState({ user, errors });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    Axios
      .post('/api/register', this.state.user)
      .then(res => {
        Auth.saveCurrentUser(res.data.user.id);
        Auth.setToken(res.data.token);
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({ errors: err.response.data.errors });
        console.dir(err);
      });
  }

  render(){
    return(
      <RegisterForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
        errors={this.state.errors}
      />
    );
  }
}
