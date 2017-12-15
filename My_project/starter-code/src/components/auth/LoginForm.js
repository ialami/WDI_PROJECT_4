import React from 'react';
import { FormGroup, FormControl, Grid, Row, Col, Image, Button } from 'react-bootstrap';

const LoginForm = ({ handleChange, handleSubmit, user, errors }) => {

  return (
    <Grid fluid style={styles.container}>
      <form
        onSubmit={handleSubmit}
      >
        {/* <h1 style={styles.title}>Login</h1> */}
        <FormGroup style={styles.formGroup}>
          <div style={styles.formContainer}>
            <Row style={styles.row}>
              <FormControl
                type="text"
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={user.email}
                style={styles.input}
              />
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
                <small>{errors}</small>
              </div>
            </Row>
            <Row style={styles.row}>
              <div style={styles.buttoncontainer}>
                <button
                  className="btn btn-primary"
                  style={styles.button}
                >
                  Login
                </button>
              </div>
            </Row>
          </div>
        </FormGroup>
      </form>
    </Grid>
  );
};

export default LoginForm;

const styles = {
  container: {
    // border: '5px solid blue',
    height: '100vh',
    backgroundColor: 'rgba(31, 180, 255, 1)',
    color: 'white'
    // marginTop: '10px'
  },
  row: {
    margin: '40px'
  },
  formContainer: {
    height: '100vh',
    margin: 'auto',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    margin: 'auto',
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
