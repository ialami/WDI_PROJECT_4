const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');

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
  friends: []
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
//
// userSchema
//   .path('friends')
//   .set(addFriend);

userSchema.methods.addFriend = addFriend;

// userSchema.pre('init',checkFriends);

// async function checkFriends() {
//   const user = this;
//   // console.log(user._id);
//   const promise = new Promise((resolve, reject) => {
//     user
//       .model('Request')
//       .find({ $or: [
//         {sender: user._id, status: 'pending'},
//         {receiver: user._id, status: 'pending'}
//       ]})
//       .exec()
//       .then(requests => {
//         const friends = requests.map(request => request.id);
//         // console.log(self.friends);
//         return resolve(friends);
//       })
//       .catch(reject);
//   });
//
//   const friends = await promise;
//   user.friends = friends;
//   // return friends;
// }

// userSchema.virtual('myFriends', {
//   ref: 'Request',
//   localField: '_id',
//   foreignField: 'sender'
// });
//


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

// //pushing the friend's id in the friends array
function addFriend(friend) {
  this.friends.push(friend);
}
