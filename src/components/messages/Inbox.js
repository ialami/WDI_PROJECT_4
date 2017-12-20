import React, { Component } from 'react';
import { Grid, Row, Col, Image, Button } from 'react-bootstrap';
import MessagesAside from './MessagesAside';
import Message from './Message';
import InputMessage from './InputMessage';
// import ChatBox from './ChatBox';
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
    },
    friends: [],
    friendName: 'Chatbox'
    // input: ''
  }

  componentDidMount(){
    this.getFriends();
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
    console.log('e.target.value', e.target.value);
  }

  handleChange = ({ target: { name, value } }) => {
    const message = Object.assign({}, this.state.message, { [name]: value } );
    this.setState({ message });
  }

  handleSubmit = e => {
    e.preventDefault();
    const messageId = this.state.chatbox.id;
    // console.log('messageId', messageId);
    Axios
      .post(`/api/chats/${messageId}/message`, this.state.message, {
        headers: {'Authorization': `Bearer ${Auth.getToken()}`}
      })
      // .then(() => this.getChats())
      .then(res => {
        this.setState({ message: { content: '' } });
        console.log('Message successfully sent', res.data);
      })
      .catch(err => console.error(err));
  }

  getFriends(){
    const userId = Auth.getCurrentUser();
    Axios
      .get(`/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(res => {
        const friends = res.data.friends.map(friend => {
          return {value: friend.id, label: friend.fullName};
        });
        this.setState({ friends });
      })
      .catch(err => console.error(err));
  }

  loadConversation = e => {
    // console.log('e.value', e.value);

    Axios
      .post(`/api/chats/${e.value}`, null, {
        headers: { Authorization: `Bearer ${Auth.getToken()}`}
      })
      .then(() => this.getChats())
      .catch(err => console.error(err));
  }

  render(){
    // console.log('this.state.chatbox', this.state.chatbox);
    // console.log('this.state.chats', this.state.chats);
    // console.log('this.state.friends', this.state.friends);

    const userId = Auth.getCurrentUser();
    const friendName = this.state.chatbox.users && this.state.chatbox.users.find(friend => friend.id !== userId);
    // console.log('friendName dsadasd', friendName.fullName);
    // console.log('friendName.label', friendName.label);


    // console.log('this.state.chatbox.users', this.state.chatbox.users)

    return(
      <Grid fluid style={styles.grid}>
        <Row>
          <Col
            lg={3} md={3} sm={3}
            style={styles.messagesIndex}
          >
            <MessagesAside
              chats={this.state.chats}
              selectChat={this.selectChat}
              friends={this.state.friends}
              loadConversation={this.loadConversation}
            />
          </Col>
          <Col
            lg={9} md={9} sm={9}
            style={styles.chatbox}
          >
            <h1 style={styles.title}>{ friendName ? friendName.fullName : 'Chatbox' }</h1>
            <hr style={styles.lineBreak}></hr>
            <div style={styles.history}>
              { this.state.chatbox.messages && this.state.chatbox.messages.map(message => <Message
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
    height: '70vh'
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
    height: '100vh'
    // overflow: 'auto'
  },
  history: {
    overflow: 'auto',
    height: '70vh'
  },
  input: {
    position: 'fixed',
    marginBottom: '0'
  }
};
