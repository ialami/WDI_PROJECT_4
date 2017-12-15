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
      <Grid fluid style={styles.grid}>
        <Row>
          <Col
            lg={3} md={3} sm={3}
            style={styles.messagesIndex}
          >
            <MessagesIndex
              chats={this.state.chats}
              selectChat={this.selectChat}
            />
          </Col>
          <Col
            lg={9} md={9} sm={9}
            style={styles.chatbox}
          >
            <h1 style={styles.title}>Chatbox</h1>
            <hr style={styles.lineBreak}></hr>
            <div style={styles.history}>
              { this.state.chatbox.messages && this.state.chatbox.messages.map(message => <Chat
                key={message.id}
                {...message}
              />)
              }
            </div>
            <InputMessage
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
              message={this.state.message}
              style={styles.input}
            />
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Inbox;

const styles = {
  grid: {
    // border: '3px solid blue',
    height: '100vh'
  },
  messagesIndex: {
    // border: '2px solid black',
    height: '100vh'
  },
  lineBreak: {
    color: 'black',
    height: '2px',
    backgroundColor: 'black'
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    fontSize: '15px'
  },
  chatbox: {
    backgroundColor: 'white',
    maxHeight: '100vh'
    // overflow: 'auto'
  },
  history: {
    overflow: 'auto',
    maxHeight: '90vh'
  },
  input: {
    position: 'fixed',
    marginBottom: '0'
  }
};
