import React, { Component } from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import MessagesAsideUser from './MessagesAsideUser';
import Select from 'react-select';

const MessagesAside = ({ chats, selectChat, friends, loadConversation }) => {

  return(
    <Grid fluid style={styles.grid}>
      <h1 style={styles.title}>Chats</h1>
      { friends &&
          <Select
            name="users"
            onChange={loadConversation}
            options={friends}
            style={styles.searchBar}
          />
      }
      <Row>
        <Col
          lg={12} md={12} sm={12}
        >
          { chats.map(chat => {
            return <MessagesAsideUser
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

export default MessagesAside;

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
