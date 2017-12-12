const User = require('../models/user');
const Startup = require('../models/startup');
const Request = require('../models/request');
const _ = require('lodash');

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
    .fill('friends')
    .exec()
    .then(user => {
      if (!user) return res.status(404).json({ message: 'User not found.' });
      console.log('usersShow Controller >> user is:', user);
      //HERE: loop through ids to get common friends
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

  // User
  //   .findById(req.params.id)
  //   .exec()
  //   .then(user => {
  //     const userFriends = user.friends;
  //
  //     const filtereduserFriends = userFriends.map(friend => {
  //       delete friend.startups;
  //       delete friend.friends;
  //       delete friend.password;
  //       delete friend.__v;
  //       return friend;
  //     });
  //
  //     User
  //       .findById(req.params.with)
  //       .exec()
  //       .then(friend => {
  //         const friendFriends = friend.friends;
  //
  //         console.log('userFriends', userFriends);
  //         console.log('friendFriends', friendFriends);
  //
  //         const filteredfriendFriends = friendFriends.map(friend => {
  //           delete friend.startups;
  //           delete friend.friends;
  //           delete friend.password;
  //           delete friend.__v;
  //           return friend;
  //         });
  //         console.log('filteredfriendFriends without startups', filteredfriendFriends);
  //         console.log('filtereduserFriends without startups', filtereduserFriends);
  //
  //         const commonFriends = [];
  //
  //         for (let i = 0; i < filteredfriendFriends.length; i++) {
  //           for(let j = 0; j < filtereduserFriends.length; j++){
  //             if(_.isEqual(filteredfriendFriends[i], filtereduserFriends[j])) {
  //               console.log(filteredfriendFriends[i]);
  //               commonFriends.push(filteredfriendFriends[i]);
  //             }
  //           }
  //         }
  //         console.log(commonFriends);
  //         return res.json(commonFriends);
  //       })
  //       .catch(next);
  //   })
  //   .catch(next);
}

function deleteFriend(req, res, next){

  deleteFriendPromise(req.params.id, req.params.friend)
    .then(() => {
      res.json('Friend successfully deleted');
      res.status(204).end();
    })
    .catch(next);

  deleteFriendPromise(req.params.friend, req.params.id)
    .then(() => res.status(204).end())
    .catch(next);

  removeRequestPromise(req.params.id, req.params.friend, req.params.requestid)
    .then(() => res.status(204).end())
    .catch(next);

  removeRequestPromise(req.params.friend, req.params.id, req.params.requestid)
    .then(() => res.status(204).end())
    .catch(next);

}

const removeRequestPromise = (friendA, friendB, requestId) => {
  return new Promise((resolve, reject) => {
    Request
      .find({$or: [
        { sender: friendA },
        { receiver: friendA }
      ]})
      .exec()
      .then(requests => {
        removeRequest(requests, friendB);

        return Request.findById(requestId);
      })
      .then(request => {
        request.remove();
        resolve('Friend has been successfully deleted.');
      })
      .catch(reject);
  });
};

function removeRequest(arrayOfRequests, idToDelete){

  for(let i=0; i < arrayOfRequests.length; i++){
    let sender;
    let receiver;

    for(var key in arrayOfRequests[i]){
      if(key==='sender'){
        sender = arrayOfRequests[i][key];
      }
    }

    for(var prop in arrayOfRequests[i]){
      if(prop==='receiver'){
        receiver = arrayOfRequests[i][prop];
      }
    }

    if (sender==idToDelete || receiver==idToDelete){
      arrayOfRequests.splice(i, 1);
    }

    console.log('arrayOfRequests after splice', arrayOfRequests);
  }

  return arrayOfRequests;
}

function removeFriend(arrayOfFriends, idOfFriendToRemove){
  for(let i=0; i < arrayOfFriends.length; i++){

    //Looping through the object of friend
    for(var key in arrayOfFriends[i]){

      //get the id of each friend
      if(key==='_id'){
        let id = arrayOfFriends[i][key];
        console.log(i);
        console.log(id);
        //get the friend with the specific id and remove him from the array of friends - remember to save the array or the user
        if(id==idOfFriendToRemove){
          console.log('the ids match', id, idOfFriendToRemove);
          arrayOfFriends.splice(i, 1);
          console.log(arrayOfFriends);
        }
      }
    }
  }
}

const deleteFriendPromise = (friendA, friendB) => {
  return new Promise((resolve, reject) => {
    User
      .findById(friendA)
      .exec()
      .then(user => {
        const arrayOfFriends = user.friends;
        const idOfFriendToRemove = friendB;
        // console.log('friends before deleting', arrayOfFriends);
        // console.log('idOfFriendToRemove', idOfFriendToRemove);
        removeFriend(arrayOfFriends, idOfFriendToRemove);
        user.save();
        return resolve(user);
      })
      .catch(reject);
  });
};

module.exports = {
  index: usersIndex,
  show: usersShow,
  update: usersUpdate,
  delete: usersDelete,
  showStartups: showStartups,
  verifyPassword: VerifyPassword,
  commonFriends: commonFriends,
  deleteFriend: deleteFriend
};
