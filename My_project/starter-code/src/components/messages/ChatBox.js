import React, { Component } from 'react';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';

const ChatBox = ({ id, messages, users}) => {

  return(
    <Grid fluid>
      <h1>Chatbox</h1>
      <h2>Id of conversation is {id && id}</h2>
    </Grid>
  );
};

export default ChatBox;
