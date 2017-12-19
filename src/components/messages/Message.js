import React from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import Auth from '../../lib/Auth';
// import { LinkContainer } from 'react-router-bootstrap';

const Message = ({ users, id, selectChat }) => {
  const userId = Auth.getCurrentUser();
  const user = users.find(user => user.id !== userId);
  return(
    <Grid fluid>
      <Row>
        <Col
          lg={12} md={12} sm={12}
        >
          <div style={styles.buttoncontainer}>
            <button
              onClick={selectChat}
              value={id}
              style={styles.button}
            >
              {user.fullName}
            </button>
          </div>
        </Col>
      </Row>
    </Grid>
  );
};

export default Message;

const styles = {
  buttoncontainer: {
    textAlign: 'center',
    margin: '10px auto',
    alignItems: 'center',
    justifyContent: 'center'
    // margin: 'auto',
    // border: '2px solid yellow'
  },
  button: {
    width: '100%',
    color: 'black',
    backgroundColor: 'white',
    fontSize: '15',
    fontWeight: 'bold',
    margin: 'auto',
    alignItems: 'center',
    justifyContent: 'center'
  }
};
