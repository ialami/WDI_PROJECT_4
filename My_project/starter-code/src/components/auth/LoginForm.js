import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.container}
    >
      <h1 style={styles.title}>Login</h1>
      <FormGroup>
        <FormControl
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          style={styles.input}
        />
        <FormControl
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          style={styles.input}
        />
        <div style={styles.error}>
          <small>{errors}</small>
        </div>
        <div style={styles.buttoncontainer}>
          <button
            className="btn btn-primary"
            style={styles.button}
          >
            Login
          </button>
        </div>
      </FormGroup>
    </form>
  );
};

export default LoginForm;

const styles = {
  container: {
    border: '5px solid blue',
    height: '100vh'
  },
  title: {
    // border: '2px solid black',
    textAlign: 'center',
    margin: '10px 0'
  },
  input: {
    margin: '15px auto',
    width: '400px',
    textAlign: 'center'
  },
  buttoncontainer: {
    textAlign: 'center'
  },
  button: {
    width: '400px'
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: '-5'
  }

};
