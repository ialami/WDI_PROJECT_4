import React from 'react';
import { FormGroup, FormControl, Grid, Row, Col, Image, Button } from 'react-bootstrap';

const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {

  const formInvalid = Object.keys(errors).some(key => errors[key]);

  return (
    <Grid fluid style={styles.container}>
      <form
        onSubmit={handleSubmit}
        style={styles.container}
      >
        <FormGroup style={styles.formGroup}>
          <div style={styles.formContainer}>
            <Row style={styles.row}>
              <FormControl
                type="text"
                name="fullName"
                placeholder="Full name"
                onChange={handleChange}
                value={user.fullName}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
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
            </Row>
            <Row style={styles.row}>
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
            </Row>
            <Row style={styles.row}>
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
            </Row>
            <Row style={styles.row}>
              <FormControl
                type="password"
                name="passwordConfirmation"
                placeholder="Confirm Password"
                onChange={handleChange}
                value={user.passwordConfirmation}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
              <div style={styles.buttoncontainer}>
                <button
                  disabled={formInvalid}
                  className="btn btn-primary"
                  style={styles.button}
                >
                  Register
                </button>
              </div>
            </Row>
          </div>
        </FormGroup>
      </form>
    </Grid>
  );
};

export default RegisterForm;

const styles = {
  container: {
    height: '100vh',
    backgroundColor: 'rgba(31, 180, 255, 1)',
    color: 'white'
  },
  row: {
    margin: '20px'
  },
  formContainer: {
    height: '100vh',
    margin: 'auto',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    margin: '15px auto',
    width: '400px',
    textAlign: 'center',
    padding: '20px'
  },
  buttoncontainer: {
    textAlign: 'center'
  },
  button: {
    width: '200px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '20',
    fontWeight: 'bold'
  },
  error: {
    textAlign: 'center',
    color: 'red',
    marginTop: '-5'
  }

};
