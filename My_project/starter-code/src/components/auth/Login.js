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
    errors: ''
  };

handleChange = ({ target: { name, value } }) => {
  const user = Object.assign({}, this.state.user, { [name]: value });
  this.setState({ user, errors: '' });
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
    .catch(err =>{
      console.dir(err);
      this.setState({ errors: err.response.data.message });
    });
}

render(){
  return(
    <LoginForm
      user={this.state.user}
      handleChange={this.handleChange}
      handleSubmit={this.handleSubmit}
      errors={this.state.errors}
      style={styles.main}
    />
  );
}

}

const styles = {
  main: {
    backgroundColor: 'rgba(31, 180, 255, 1)',
    color: 'white'
  }
};
