const User = require('../models/user');
const Startup = require('../models/startup');
const _ = require('lodash');

function usersIndex(req, res) {
  User
    .find()
    // .populate('myFriends')
    .exec()
    .then(users => res.status(200).json(users))
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
}

function usersShow(req, res) {
  User
    .findById(req.params.id)
    .populate('startups')
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      return res.status(200).json(user);
    })
    .catch(() => res.status(500).json({ message: 'Something went wrong.' }));
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

  User
    .findById(req.params.id)
    .exec()
    .then(user => {
      const userFriends = user.friends;

      const filtereduserFriends = userFriends.map(friend => {
        delete friend.startups;
        delete friend.friends;
        delete friend.password;
        delete friend.__v;
        return friend;
      });

      User
        .findById(req.params.with)
        .exec()
        .then(friend => {
          const friendFriends = friend.friends;

          console.log('userFriends', userFriends);
          console.log('friendFriends', friendFriends);

          const filteredfriendFriends = friendFriends.map(friend => {
            delete friend.startups;
            delete friend.friends;
            delete friend.password;
            delete friend.__v;
            return friend;
          });
          console.log('filteredfriendFriends without startups', filteredfriendFriends);
          console.log('filtereduserFriends without startups', filtereduserFriends);

          const commonFriends = [];

          for (let i = 0; i < filteredfriendFriends.length; i++) {
            for(let j = 0; j < filtereduserFriends.length; j++){
              if(_.isEqual(filteredfriendFriends[i], filtereduserFriends[j])) {
                console.log(filteredfriendFriends[i]);
                commonFriends.push(filteredfriendFriends[i]);
              }
            }
          }
          console.log(commonFriends);
          return res.json(commonFriends);
        })
        .catch(next);
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
