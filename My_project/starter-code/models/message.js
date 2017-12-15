const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
  content: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = ('Message', messageSchema);
