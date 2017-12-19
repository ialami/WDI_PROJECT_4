import React from 'react';
import BackButton from '../utility/BackButton';
import { FormGroup, FormControl, Grid, Row, Col, Image, Button } from 'react-bootstrap';

const MyProfileEditPasswordForm = ({ handleChange, handleSubmit, passwords }) => {
  return(
    <Grid fluid style={styles.container}>
      <h1 style={styles.title}>Reset password</h1>
      <BackButton/>
      <form
        onSubmit={handleSubmit}
      >
        <FormGroup style={styles.formGroup}>
          <div style={styles.formContainer}>
            <Row style={styles.row}>
              <FormControl
                type="password"
                id="oldPassword"
                name="oldPassword"
                placeholder="Enter old password"
                value={passwords.oldPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
              <FormControl
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Enter new password"
                value={passwords.newPassword}
                onChange={handleChange}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
              <FormControl
                type="password"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Confirm new password"
                value={passwords.passwordConfirmation}
                onChange={handleChange}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
              <div style={styles.buttoncontainer}>
                <button
                  className="btn btn-primary"
                  style={styles.button}
                >
                  Reset
                </button>
              </div>
            </Row>
          </div>
        </FormGroup>
      </form>
    </Grid>
  );
};

export default MyProfileEditPasswordForm;

const styles = {
  container: {
    // border: '5px solid blue',
    height: '100vh',
    backgroundColor: 'rgba(31, 180, 255, 1)',
    color: 'white'
    // marginTop: '10px'
  },
  formContainer: {
    height: '100vh',
    margin: 'auto',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    // border: '2px solid black',
    textAlign: 'center',
    margin: '10px 0',
    fontSize: '50'
  },
  goback: {
    marginLeft: '10px'
  },
  input: {
    margin: '20px auto',
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
  }
};
