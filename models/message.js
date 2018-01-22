const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.ObjectId, ref: 'User' },
  content: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Unknown modifier: $pushAll
// https://github.com/Automattic/mongoose/issues/5574
messageSchema.set('usePushEach', true);

module.exports = ('Message', messageSchema);
