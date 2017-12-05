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
    }
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
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
      .catch(err => console.log(err));
  }

  render(){
    return(
      <div>
        <h1>Register page</h1>
        <RegisterForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
