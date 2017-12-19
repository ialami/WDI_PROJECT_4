import React from 'react';
import { FormGroup, FormControl, ControlLabel, Button, Grid, Row, Col } from 'react-bootstrap';
import BackButton from '../utility/BackButton';

const MyProfileForm = ({ handleChange, handleSubmit, user, switchBoolean }) => {

  return(
    <Grid fluid style={styles.container}>
      <form
        onSubmit={handleSubmit}
      >
        {/* <BackButton/> */}
        <FormGroup style={styles.formGroup}>
          <div style={styles.formContainer}>
            <Row style={styles.row}>
              <FormControl
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Edit full name"
                value={user.fullName}
                onChange={handleChange}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
              <FormControl
                type="text"
                id="username"
                name="username"
                placeholder="Edit username"
                value={user.username}
                onChange={handleChange}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
              <FormControl
                type="text"
                id="email"
                name="email"
                placeholder="Edit email"
                value={user.email}
                onChange={handleChange}
                style={styles.input}
              />
            </Row>
            <Row style={styles.row}>
              <div style={styles.buttoncontainer}>
                <button
                // onClick={switchBoolean}
                  className="btn btn-primary"
                  style={styles.button}
                >
                Save
                </button>
              </div>
            </Row>
          </div>
        </FormGroup>
      </form>
    </Grid>
  );
};

export default MyProfileForm;

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
  }
};
