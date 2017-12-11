import React from 'react';
import BackButton from '../utility/BackButton';
import { FormGroup, FormControl } from 'react-bootstrap';

const MyProfileEditPasswordForm = ({ handleChange, handleSubmit, passwords }) => {
  return(
    <div>
      <h1 style={styles.title}>Reset password</h1>
      <BackButton/>
      <form
        onSubmit={handleSubmit}
      >
        <FormGroup>
          <FormControl
            type="text"
            id="oldPassword"
            name="oldPassword"
            placeholder="Enter old password"
            value={passwords.oldPassword}
            onChange={handleChange}
            style={styles.input}
          />
          <FormControl
            type="text"
            id="newPassword"
            name="newPassword"
            placeholder="Enter new password"
            value={passwords.newPassword}
            onChange={handleChange}
            style={styles.input}
          />
          <FormControl
            type="text"
            id="passwordConfirmation"
            name="passwordConfirmation"
            placeholder="Confirm new password"
            value={passwords.passwordConfirmation}
            onChange={handleChange}
            style={styles.input}
          />
          <div style={styles.buttoncontainer}>
            <button
              className="btn btn-primary"
              style={styles.button}
            >
              Reset
            </button>
          </div>
        </FormGroup>
      </form>
    </div>
  );
};

export default MyProfileEditPasswordForm;

const styles = {
  title: {
    // border: '2px solid black',
    textAlign: 'center',
    margin: '10px 0'
  },
  goback: {
    marginLeft: '10px'
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
  }
};
