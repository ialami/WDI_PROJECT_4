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

function acceptFriend(req, res){
  return new Promise((resolve, reject) => {
    Request
      .findByIdAndUpdate(req.params.id, req.body)
      .exec()
      .then(friendRequest => {
        friendRequest = Object.assign(friendRequest, req.body);
        return friendRequest.save();
      })
      .then(friendRequest => {
        // res.json(friendRequest);
        resolve(friendRequest);
      })
      .catch(reject);
  });
}

function acceptRequest(req, res, next){
  return acceptFriend(req, res)
    .then(friendRequest => {
      // console.log('friendRequest', friendRequest);
      const sender = friendRequest.sender;
      const receiver = friendRequest.receiver;

      getSender(sender)
        .then(sender => {
          getReceiver(receiver)
            .then(receiver => {
              // console.log('friendRequest', friendRequest);
              // console.log('this is the sender:', sender);
              // console.log('this is the receiver before pushing:', receiver);
              receiver.friends.push(sender);
              // console.log('this is the receiver after pushing:', receiver);
              return res.json([friendRequest, sender, receiver]);
            })
            .catch(next);
        })
        .catch(next);

      getReceiver(receiver)
        .then(receiver => {
          getSender(sender)
            .then(sender => {
              console.log('friendRequest', friendRequest);
              console.log('this is the receiver:', receiver);
              console.log('this is the sender before pushing:', sender);
              sender.friends.push(receiver);
              console.log('this is the sender after pushing:', sender);
            })
            .catch(next);
        })
        .catch(next);


    })
    .catch(next);
}
//
// function acceptRequest(req, res, next){
//   Request
//     .findByIdAndUpdate(req.params.id, req.body)
//     .exec()
//     .then(acceptedRequest => {
//       acceptedRequest = Object.assign(acceptedRequest, req.body);
//       // acceptedRequest = Object.assign(acceptedRequest, { status: 'accepted' });
//       return [acceptedRequest.save(), acceptedRequest, 'hey man'];
//     })
//     .then((res) => {
// // console.log('req.body', req.body);
// // console.log('res', res);
// console.log('res[1]', res[1]);
// // console.log('res[1].receiver', res[1].receiver);
// // console.log('res[1].sender', res[1].sender);
//       const receiverId = res[1].receiver;
//       // const currentUser = () => {
//       //   return GetCurrentUser(receiverId);
//       // };
//       // const currentUser = GetCurrentUser(receiverId);
//       const currentUser = GetCurrentUser.resolve(receiverId);
// //         .then(currentUser => {
// // console.log('response from .then', currentUser);
// //           return currentUser;
// //         });
// console.log('currentUser in controller', currentUser);
//       return currentUser;
//     })
// //     .then(acceptedRequest => {
// //       User
// //         .findById({ _id: acceptedRequest.receiver })
// //         // .findById({$and: [ // ERR: can't set headers after they are sent
// //         //   { _id: acceptedRequest.receiver },
// //         //   { _id: acceptedRequest.sender }
// //         // ]})
// //         .exec()
// //         .then(users => {
// // // console.log('users in promise', users);
// //           // return users;
// //         })
// //         .catch(next);
// //
// // // console.log('Currentuser outside promise', Currentuser);
// // // console.log('acceptedRequest', acceptedRequest);
// //     })
//     .then(acceptedRequest => res.json(acceptedRequest))
//     .catch(next);
// }

const getReceiver = (receiverId) => {
  return new Promise((resolve, reject) => {
    User
      .findById({ _id: receiverId })
      .exec()
      .then(Currentuser => {
// console.log('Currentuser in promise', Currentuser);
        return resolve(Currentuser);
      })
      .catch(reject);
  });
};

const getSender = (senderId) => {
  return new Promise((resolve, reject) => {
    User
      .findById({ _id: senderId })
      .exec()
      .then(sender => {
// console.log('sender in getSender', sender);
        return resolve(sender);
      })
      .catch(reject);
  });
};

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
