import React from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import Auth from '../../lib/Auth';

const Chat = ({ content, id, loadChatBox, sender, createdAt }) => {
  return(
    <Grid fluid>
      <p>{sender.fullName}</p>
      <p>{id}</p>
      <p>{content}</p>
      <p>{createdAt}</p>

    </Grid>
  );
};

export default Chat;
