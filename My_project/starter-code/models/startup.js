const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Name field is required.'
  },
  description: {
    type: String,
    required: 'Description field is required.'
  },
  industry: {
    type: String,
    required: 'Industry field is required.'
  },
  founders: {
    type: String,
    required: 'Founders field is required'
  },
  date: {
    type: Number,
    required: 'Founded year field is required'
  },
  country: {
    type: String,
    required: 'Country field is required'
  },
  image: {
    type: String,
    required: 'Image field is required'
  },
  incubator: {
    type: String
    // required: true
  },
  partnering: {
    type: String,
    required: 'Partnering strategy field is required'
  },
  website: {
    type: String,
    required: 'Website URL field is required'
  },
  fundingtype: {
    type: String,
    required: 'Latest funding stage is required'
  },
  createdBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
    // required: true
  }
});

startupSchema.methods.belongsTo = function startupBelongsTo(user) {
  if(typeof this.createdBy.id === 'string') return this.createdBy.id === user.id;
  return user.id === this.createdBy.toString();
};

module.exports = mongoose.model('Startup', startupSchema);
