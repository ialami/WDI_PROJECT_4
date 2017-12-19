const User = require('../models/user');
const Startup = require('../models/startup');
const Request = require('../models/request');
const _ = require('lodash');
const Promise = require('bluebird');

function usersIndex(req, res) {
  User
    .find()
    .populate('myFriends')
    .exec()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .populate('startups sentRequests receivedRequests')
    .fill('friends pendingReceivedRequests pendingSentRequests')
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      console.log('usersShow Controller >> user is:', user);
      return res.status(200).json(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: 'Something went wrong.' });
    });
}

function usersUpdate(req, res, next) {
  User
    .findByIdAndUpdate(req.params.id, req.body, { new: true })
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.status(200).json({ user });
    })
    .catch(next);
}

function usersDelete(req, res) {
  User
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.sendStatus(204);
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

function showStartups(req, res) {
  Startup
    .find({ createdBy: req.params.id })
    .exec()
    .then(files => res.status(200).json(files))
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

function VerifyPassword(req, res, next){
  User
    .findById(req.params.id)
    .exec()
    .then(user => {

      //check if the user knows his old password
      const isOldPasswordRight = user.validatePassword(req.body.oldPassword);

      if (isOldPasswordRight) {
        user.password = req.body.newPassword;
        user.passwordConfirmation = req.body.passwordConfirmation;
        user.save();
        return res.status(200).json({ user });
      } else {
        return res.status(500).json({ message: 'Try again, did you forget your password?' });
      }
    })
    .catch(next);
}

function commonFriends(req, res, next){
  const promises = {
    currentUser: User.findById(req.user.id).fill('friends').exec(),
    friend: User.findById(req.params.with).fill('friends').exec()
  };

  Promise
    .props(promises)
    .then(data => {
      const myFriendsIds = data.currentUser.friends.map(friend => `${friend._id}`);
      const commonFriends = data.friend.friends.filter(friend => myFriendsIds.includes(`${friend._id}`));
      return res.status(200).json(commonFriends);
    })
    .catch(next);
}

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  showStartups: showStartups,
  verifyPassword: VerifyPassword,
  commonFriends: commonFriends
};
