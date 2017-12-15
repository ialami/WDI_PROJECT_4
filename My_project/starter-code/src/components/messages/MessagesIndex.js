import React, { Component } from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import Message from './message';

const MessagesIndex = ({chats, selectChat}) => {

  return(
    <Grid fluid style={styles.grid}>
      <h1 style={styles.title}>Chats</h1>
      <Row>
        <Col
          lg={12} md={12} sm={12}
        >
          { chats.map(chat => {
            return <Message
              {...chat}
              key={chat.id}
              onClick={() => selectChat(chat.id)}
              selectChat={selectChat}
            />;
          })
          }
        </Col>
      </Row>
    </Grid>
  );
};

export default MessagesIndex;

const styles = {
  grid: {
    // border: '2px solid red',
    height: '100vh'
  },
  title: {
    margin: '10px auto',
    textAlign: 'center'
  }
};
