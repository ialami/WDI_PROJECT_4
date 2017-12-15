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
          <button
            onClick={selectChat}
            value={id}
          >
            {user.fullName}
            {' '}
            {id}
          </button>
        </Col>
      </Row>
    </Grid>
  );
};

export default Message;
