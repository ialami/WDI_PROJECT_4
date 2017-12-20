import React from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Auth from '../../lib/Auth';
import MyProfileForm from './MyProfileForm';
import Startup from '../startups/StartupUserShow';

const MyProfile = ({ boolean, user, switchBoolean, handleChange, handleSubmit, deleteStartup, deleteFriend }) => {
  return(
    <Grid fluid
      style={styles.grid}
    >
      <h1
        style={styles.myprofile}
      >
        My profile
      </h1>
      <Row
        style={styles.screen}
      >
        <Col lg={12} md={12} sm={12}>

          { boolean && <div style={styles.myDetails}>
            <p>{user.fullName}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
            <Button
              style={styles.button}
              onClick={switchBoolean}
            >
              Update details
            </Button>
            <LinkContainer
              style={styles.buttons} to={`/users/${Auth.getCurrentUser()}/edit/password`}
            >
              <div
                style={styles.buttoncontainer}
              >
                <button
                  className="btn btn-primary"
                  style={styles.button}
                >
                  Update password
                </button>
              </div>
            </LinkContainer>
          </div>
          }
          { !boolean && <MyProfileForm
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            user={user}
            // history={this.props.history}
            switchBoolean={switchBoolean}
          />
          }
        </Col>
      </Row>
      <Row style={styles.myConnectionsContainer}>
        <Col lg={12} md={12} sm={12}>
          <h1
            style={styles.myConnections}
          >
            My connections ({user.friends && user.friends.length})
          </h1>
          <Row>
            { user.friends && user.friends.map(friend => {
              return <Col
                key={friend.id}
                lg={12} md={12} sm={12}
                style={styles.colConnections}
              >
                <div style={styles.connection}>
                  <p
                    style={styles.connectionName}
                  >
                    {friend.fullName}
                  </p>
                  <LinkContainer to={`/users/${friend.id}`}>
                    <div style={styles.buttoncontainer}>
                      <button
                        className="btn btn-primary"
                        style={styles.button}>
                        See profile
                      </button>
                    </div>
                  </LinkContainer>
                  <div style={styles.buttoncontainer}>
                    <button
                      className="btn btn-primary"
                      style={styles.button}
                      onClick={deleteFriend}
                      value={friend.id}
                    >
                    Delete Friend
                    </button>
                  </div>
                </div>
              </Col>;
            })}
          </Row>
        </Col>
      </Row>
      <Row style={styles.myStartupsContainer}>
        <Col lg={12} md={12} sm={12} style={styles.colMyStartups}>
          <h2 style={styles.myStartupsTitle}>My start-ups</h2>
          { user.startups && user.startups.map(startup => <Startup key={startup.id}
            deleteStartup={deleteStartup}
            {...startup}
          />
          )}
        </Col>
      </Row>
    </Grid>
  );
};

export default MyProfile;


const styles = {
  grid: {
    paddingRight: '0',
    paddingLeft: '0'
  },
  myprofile: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 20px 0',
    fontWeight: 'bold',
    fontSize: '50px'
  },
  screen: {
    // height: '100vh'
  },
  myDetails: {
    margin: 'auto',
    // display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold'
  },
  imagecontainer: {
    border: '3px solid green',
    height: '100%'
  },
  myConnectionsContainer: {
    // width: '50%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    // border: '2px solid red',
    color: 'rgba(31, 180, 255, 1)',
    backgroundColor: 'white'
    // height: '100vh'
  },
  myConnections: {
    margin: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 0 20px 0',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  connectionName: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '20px'
  },
  connection: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 'auto',
    padding: '10px'
  },
  colMyStartups: {
    // border: '2px solid red',
    margin: 'auto',
    // width: '80%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  myStartupsContainer: {
    width: '80%',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
    // height: '100vh'
  },
  myStartupsTitle: {
    padding: '20px 0 20px 0',
    fontWeight: 'bold',
    fontSize: '30px'
  },
  buttoncontainer: {
    textAlign: 'center',
    margin: '10px 0',
    alignItems: 'center',
    justifyContent: 'center'
    // margin: 'auto'
  },
  button: {
    width: '200px',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '20',
    fontWeight: 'bold',
    margin: '10px 0',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
