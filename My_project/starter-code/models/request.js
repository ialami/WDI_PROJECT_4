const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
  text: {
    type: String
    // required: true
  },
  receiver: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  sender: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    required: true,
    default: 'pending'
  }
  // senderProfile: {
  //   type: Object
  //   required: true
  // }
});

module.exports = mongoose.model('Request', requestSchema);
