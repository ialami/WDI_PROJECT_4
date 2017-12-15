const mongoose = require('mongoose');
const Message = require('./message');

const chatSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.ObjectId, ref: 'User',
    required: true,
    validate: [mustBeTwo, 'Please contain two users.']
  }],
  messages: [Message]
});

function mustBeTwo(){
  const self = this;
  return self.users.length === 2;
}

module.exports = mongoose.model('Chat', chatSchema);
