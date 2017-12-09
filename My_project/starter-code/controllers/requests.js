const Request = require('../models/request.js');
const User = require('../models/user.js');

function addFriend(req, res, next){

  Request
    .find({$or: [
      { sender: req.body.sender, receiver: req.params.id},
      { sender: req.params.id, receiver: req.body.sender}
    ]})
    .exec()
    .then(requests => {
      console.log('requests',requests);
      if (requests.length > 0) return res.status(500).json({message: 'you cannot add this friend twice'});
      Request
        .create(req.body)
        .then(friendRequest => {
          res.status(201).json(friendRequest);
        })
        .catch(next);
    })
    .catch(next);
}

function getRequests(req, res, next){

  Request
    .find({$or: [
      { sender: req.user._id },
      { receiver: req.user._id }
    ]})
    .exec()
    .then(requests => {
      return res.status(201).json(requests);
    })
    .catch(next);
}

function acceptRequest(req, res, next){
  Request
    .findByIdAndUpdate(req.params.id, req.body)
    .exec()
    .then(acceptedRequest => {
      acceptedRequest = Object.assign(acceptedRequest, req.body);
      // acceptedRequest = Object.assign(acceptedRequest, { status: 'accepted' });
      return acceptedRequest.save(), acceptedRequest;
    })
    .then(acceptedRequest => {
      User
        .findById({ _id: acceptedRequest.receiver })
        // .findById({$and: [ // ERR: can't set headers after they are sent
        //   { _id: acceptedRequest.receiver },
        //   { _id: acceptedRequest.sender }
        // ]})
        .exec()
        .then(users => {
// console.log('users in promise', users);
          // return users;
        })
        .catch(next);

// console.log('Currentuser outside promise', Currentuser);
// console.log('acceptedRequest', acceptedRequest);
    })
    .then(acceptedRequest => res.json(acceptedRequest))
    .catch(next);
}

// function acceptRequest(req, res, next){
//   GetCurrentUser(acceptedRequest)
//     .()
//
// }
//
// const GetCurrentUser = (acceptedRequest) => {
//   return new Promise((resolve, reject) => {
// console.log('fired');
//     User
//       .findById({ _id: acceptedRequest.receiver })
//       .exec()
//       .then(Currentuser => {
// console.log('Currentuser in promise', Currentuser);
//         return resolve(Currentuser);
//       })
//       .catch(reject);
//   });
// };

module.exports = {
  addFriend: addFriend,
  getRequests: getRequests,
  acceptRequest: acceptRequest
};
//
// -----
//
// User
//   .findById({ _id: acceptedRequest.receiver })
//   .exec()
//   .then(Currentuser => {
//     User
//       .findById({ _id: acceptedRequest.sender })
//       .exec()
//       .then(sender => {
//         return sender;
//       })
//       .catch(next);
//     console.log('Currentuser', Currentuser);
//     console.log('sender', sender);
//     // user = Object.assign(acceptedRequest, { friends: [].push(acceptedR) });
//   })
//   .catch(next);
