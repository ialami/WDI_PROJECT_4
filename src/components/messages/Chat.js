import React from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import Auth from '../../lib/Auth';

const Chat = ({ content, id, loadChatBox, sender, createdAt }) => {

  // const align = sender.id === Auth.getCurrentUser() ? {styles.right} :

  return(
    <Grid fluid style={styles.grid}>
      <p style={styles.sender}>{sender.fullName}<p style={styles.createdAt}>{createdAt}</p></p>
      <p style={styles.content}>{content}</p>
    </Grid>
  );
};

export default Chat;

const styles = {
  grid: {
    // border: '3px solid red',
    // float: 'right',
    color: 'black',
    marginTop: '5px'
  },
  content: {
    fontWeight: 'bold'
  },
  sender: {
    fontSize: '10px',
    padding: '0'
  },
  right: {

  },
  createdAt: {
    fontSize: '8px',
    padding: '0'
  }
};
