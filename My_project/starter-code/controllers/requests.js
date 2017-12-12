const Request = require('../models/request.js');
const User = require('../models/user.js');

function addFriend(req, res, next){

  Request
    .find({$or: [
      { sender: req.user._id, receiver: req.params.userId},
      { sender: req.params.userId, receiver: req.user._id}
    ]})
    .exec()
    .then(requests => {
      if (requests.length > 0) return res.status(500).json({ message: 'you cannot add this friend twice' });
      req.body.sender = req.user._id;

      return Request
        .create(req.body);
//         .then(friendRequest => {
// console.log('friendRequest.sender', friendRequest.sender);
//           User
//             .findById(friendRequest.sender)
//             .exec()
//             .then(sender => {
// console.log('sender', sender);
//               res.status(201).json([friendRequest, sender]);
//             })
//             .catch(next);
          // res.status(201).json(friendRequest);
        // })
        // .catch(next);
    })
    .then(friendRequest => Request.populate(friendRequest, 'sender'))
    .then(friendRequest => res.status(201).json(friendRequest))
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

//this was commented out
// function acceptFriend(req){
//   return new Promise((resolve, reject) => {
//     Request
//       .findByIdAndUpdate(req.params.id, req.body)
//       .exec()
//       .then(friendRequest => {
//         // friendRequest = Object.assign(friendRequest, req.body);
//         friendRequest = Object.assign(friendRequest, { status: 'accepted' });
//         return friendRequest.save();
//       })
//       .then(friendRequest => {
//         resolve(friendRequest);
//       })
//       .catch(reject);
//   });
// }

function acceptRequest(req, res, next){

  Request
    .findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true })
    .populate('sender receiver')
    .exec()
    .then(friendRequest => res.status(201).json(friendRequest))
    .catch(next);
}

//   return acceptFriend(req, res)
//     .then(friendRequest => {
//       const sender = friendRequest.sender;
//       const receiver = friendRequest.receiver;
//
//       getSender(sender)
//         .then(sender => {
//           getReceiver(receiver)
//             .then(receiver => {
//               // console.log('friendRequest', friendRequest);
//               // console.log('this is the sender:', sender);
//               // console.log('this is the receiver before pushing:', receiver);
// receiver.friends.push(sender);
//               // console.log('this is the receiver after pushing:', receiver);
//               receiver.save();
//               return res.json([friendRequest, sender, receiver]);
//             })
//             .catch(next);
//         })
//         .catch(next);
//
//       getReceiver(receiver)
//         .then(receiver => {
//           getSender(sender)
//             .then(sender => {
//               console.log('friendRequest', friendRequest);
//               console.log('this is the receiver:', receiver);
//               console.log('this is the sender before pushing:', sender);
// sender.friends.push(receiver);
//               console.log('this is the sender after pushing:', sender);
//               return sender.save();
//             })
//             .catch(next);
//         })
//         .catch(next);
//
//
//     })
//     .catch(next);
// }

const getReceiver = (receiverId) => {
  return new Promise((resolve, reject) => {
    User
      .findById({ _id: receiverId })
      .exec()
      .then(Currentuser => {
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
