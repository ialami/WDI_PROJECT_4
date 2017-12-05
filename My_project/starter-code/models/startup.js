const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'Please provide the start-up\'s name'
  },
  description: {
    type: String,
    required: 'Please provide the start-up\'s description'
  },
  industry: {
    type: String,
    required: 'Please provide the start-up\'s industry'
  },
  founders: {
    type: String,
    required: 'Please provide the start-up\'s founders'
  },
  date: {
    type: Number,
    required: 'Please provide the start-up\'s fouded year'
  },
  country: {
    type: String,
    required: 'Please provide the start-up\'s country'
  },
  image: {
    type: String,
    required: 'Please provide the start-up\'s image'
  },
  incubator: {
    type: String
    // required: true
  },
  partnering: {
    type: String,
    required: 'Please provide the start-up\'s partnering strategy'
  },
  website: {
    type: String,
    required: 'Please provide the start-up\'s website url'
  },
  fundingtype: {
    type: String,
    required: 'Please provide the start-up\'s latest funding stage'
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
