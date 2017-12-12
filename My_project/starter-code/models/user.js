const mongoose = require('mongoose-fill');
const bcrypt = require('bcrypt');
const validator = require('validator');

const Request = require('./request');
const _ = require('lodash');

const userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'Please provide a full name'
  },
  username: {
    type: String,
    required: 'Please provide a username',
    unique: 'Sorry, this username has already been taken.'
  },
  email: {
    type: String,
    required: 'Please provide a valid email',
    unique: 'Sorry, this email has already been taken.'
  },
  password: {
    type: String, required: 'Please provide a password'
  },
  // friends: [],
  startups: []
});

userSchema
  .virtual('sentRequests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'sender'
  });

userSchema
  .virtual('receivedRequests', {
    ref: 'Request',
    localField: '_id',
    foreignField: 'receiver'
  });

userSchema
  .fill('friends')
  .get(getFriends);

//where can I write logic ?
function getFriends(next) {
  Request
    .find({
      $or: [{ sender: this._id }, { receiver: this._id }],
      status: 'accepted'
    })
    .populate('sender receiver')
    .select('sender receiver')
    // .exec()
    // .then(() => console.log('then fired'))
    // .then(res => console.log(res))
    // .then(res => console.log(res))
    .exec(next);
}

userSchema
  .fill('pendingReceivedRequests')
  .get(function(next){
    this.db.model('Request')
      .find({
        receiver: this._id,
        status: 'pending'
      })
      .populate('sender')
      .exec(next);
  });

userSchema
  .path('username')
  .validate(validateUsername);

userSchema
  .path('email')
  .validate(validateEmail);

userSchema
  .path('password')
  .validate(validatePasswordInfo);

userSchema
  .virtual('passwordConfirmation')
  .set(setPasswordConfirmation);

userSchema.pre('save', hashPassword);

userSchema.methods.validatePassword = validatePassword;

module.exports = mongoose.model('User', userSchema);

// FUNCTIONS -------------------------------------------------------------------

function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
}

function setPasswordConfirmation(passwordConfirmation) {
  this._passwordConfirmation = passwordConfirmation;
}

function validatePasswordInfo() {
  if (this.isNew) {
    if (!this.password) return this.invalidate('password', 'A password is required.');
    if (this.password.length < 6) return this.invalidate('password', 'Password must be longer than 6 characters.');
    if (this.password !== this._passwordConfirmation) return this.invalidate('password', 'Passwords do not match.');
    if (this.password.indexOf(' ') > 0) return this.invalidate('password', 'Password must not contain white spaces.');
  }
}

function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
}

function validateEmail(email) {
  if (!validator.isEmail(email)) return this.invalidate('email', 'It must be a valid email address.');
}

function validateUsername(username){
  if (username.indexOf(' ') > 0) return this.invalidate('username', 'Username must not contain white spaces.');
}
