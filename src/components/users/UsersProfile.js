import React from 'react';
import { Grid, Row, Col, Image, Button, Modal, FormControl, FormGroup, ControlLabel } from 'react-bootstrap';
import Startup from '../startups/StartupUserShow';
import { LinkContainer } from 'react-router-bootstrap';

const UsersProfile = ({ user, startups, handleButtons, showModal, closeModal, handleSubmitRequest, handleChangeRequest, commonFriends }) => {
  return(
    <Grid fluid
      // style={styles.grid}
    >
      <Row>
        <h1
          // style={styles.profileName}
        >
          {user.fullName}
        </h1>
        {/* <BackButton /> */}
      </Row>
      <Row>
        {/* <Col
          lg={4} md={4} sm={4}
          style={styles.imagecontainer}
        >
          <Image src=""/>
        </Col> */}
        <Col lg={12} md={12} sm={12}>
          <div
            // style={styles.profileDetails}
          >
            <p>id: {user.id}</p>
            <p>{user.email}</p>
            <p>{user.username}</p>
          </div>
        </Col>
      </Row>

      { user && handleButtons}
      <Row
        // style={styles.myConnectionsContainer}
      >
        <Col lg={12} md={12} sm={12}>
          <h2
            // style={styles.myConnections}
          >
            Common friends ({commonFriends && commonFriends.length})
          </h2>
          <Row>
            { commonFriends && commonFriends.map((friend) => {
              return <Col
                key={friend.id}
                lg={12} md={12} sm={12}
                style={styles.colConnections}
              >
                <div style={styles.connection}>
                  <p style={styles.connectionName}>{friend.fullName}</p>
                  <LinkContainer to={`/users/${friend.id}`}>
                    <div style={styles.buttoncontainer}>
                      <button
                        className="btn btn-primary"
                        style={styles.button}>
                      Show profile
                      </button>
                    </div>
                  </LinkContainer>
                </div>
              </Col>;
            })}
          </Row>
        </Col>
      </Row>
      <Row
        // style={styles.myStartupsContainer}
      >
        <Col
          lg={12} md={12} sm={12}
          // style={styles.colMyStartups}
        >
          <h2
            // style={styles.myStartupsTitle}
          >
            Start-ups
          </h2>
          { startups && startups.map(startup => <Startup key={startup.id} {...startup} />)
          }
        </Col>
      </Row>
      <div
        style={ showModal ? styles.showModal : styles.hideModal }
      >
        <h2>Send a friend request</h2>
        <form
          onSubmit={handleSubmitRequest}
        >
          <FormGroup controlId="formControlsTextarea">
            <FormControl
              componentClass="textarea"
              placeholder="Send a message"
              onChange={handleChangeRequest}
            />
            <button
              className="btn btn-primary"
              // style={styles.button}
            >
              Send request
            </button>
          </FormGroup>
        </form>
        <button
          onClick={closeModal}
        >
          Close
        </button>
      </div>

    </Grid>
  );
};

export default UsersProfile;

const styles = {
  hideModal: {
    opacity: '0'
  },
  showModal: {
    opacity: '1'
  }
};
