import React from 'react';
import { FormGroup, FormControl } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <form
      onSubmit={handleSubmit}
      style={styles.container}
    >
      <h1 style={styles.title}>Register</h1>
      <FormGroup>
        <FormControl
          type="text"
          name="fullName"
          placeholder="Full name"
          onChange={handleChange}
          value={user.fullName}
          style={styles.input}
        />
        <FormControl
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
          style={styles.input}
        />
        <div style={styles.error}>
          { errors && <small>{errors.username}</small>}
        </div>
        <FormControl
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          style={styles.input}
        />
        <div style={styles.error}>
          { errors && <small>{errors.email}</small>}
        </div>
        <FormControl
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          style={styles.input}
        />
        <div style={styles.error}>
          { errors && <small>{errors.password}</small>}
        </div>
        <FormControl
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.passwordConfirmation}
          style={styles.input}
        />
        <div style={styles.buttoncontainer}>
          <button
            disabled={formInvalid}
            className="btn btn-primary"
            style={styles.button}
          >
            Register
          </button>
        </div>
      </FormGroup>
    </form>
  );
};

export default RegisterForm;

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
