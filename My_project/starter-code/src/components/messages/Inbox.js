import React, { Component } from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import MessagesIndex from './MessagesIndex';
import ChatBox from './ChatBox';
import Message from './Message';
import InputMessage from './InputMessage';
import Chat from './Chat';
import Axios from 'axios';
import Auth from '../../lib/Auth';
import socketIOClient from 'socket.io-client';

class Inbox extends Component {
  webSocket = socketIOClient('/socket');

  state = {
    chats: [],
    chatbox: {},
    message: {
      content: ''
    }
    // input: ''
  }

  componentDidMount(){
    this.getChats();

    this.webSocket.on('CHAT', newChat => {
      const newMessage = newChat.messages[newChat.messages.length -1];
      const chatbox = Object.assign({}, this.state.chatbox, { messages: this.state.chatbox.messages.concat(newMessage)});
      this.setState({ chatbox, message: { content: ''} });
    });
  }

  getChats(){
    Axios
      .get('/api/chats', {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => this.setState({ chats: res.data }))
      .catch(err => console.log(err));
  }

  selectChat = (e) => {
    this.setState({ chatbox: this.state.chats.find(chat => chat.id === e.target.value )});
  }

  handleChange = ({ target: { name, value } }) => {
    const message = Object.assign({}, this.state.message, { [name]: value } );
    this.setState({ message });
  }

  handleSubmit = e => {
    e.preventDefault();
    const messageId = this.state.chatbox.id;
    console.log('messageId', messageId);
    Axios
      .post(`/api/chats/${messageId}/message`, this.state.message, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      // .then(() => this.getChats())
      .then(res => {
        this.setState({ message: { content: '' } });
        // this.setState({ input: '' });
        console.log('sent message', res.data);
      })
      .catch(err => console.error(err));
  }

  render(){
    console.log('this.state.chatbox', this.state.chatbox);
    console.log('this.state.chats', this.state.chats);
    return(
      <Grid fluid>
        <Row>
          <Col
            lg={3} md={3} sm={3}
          >
            <MessagesIndex
              chats={this.state.chats}
              selectChat={this.selectChat}
            />
          </Col>
          <Col
            lg={9} md={9} sm={9}
          >
            <Grid fluid>
              <h1>Chatbox</h1>
              { this.state.chatbox.messages && this.state.chatbox.messages.map(message => <Chat
                key={message.id}
                {...message}
              />)
              }
              <InputMessage
                handleSubmit={this.handleSubmit}
                handleChange={this.handleChange}
                message={this.state.message}
              />
            </Grid>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Inbox;
