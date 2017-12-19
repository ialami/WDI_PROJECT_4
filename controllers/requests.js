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

function acceptRequest(req, res, next){

  Request
    .findByIdAndUpdate(req.params.id, { status: 'accepted' }, { new: true })
    .populate('sender receiver')
    .exec()
    .then(friendRequest => res.status(201).json(friendRequest))
    .catch(next);
}

function refuseRequest(req, res, next){

  Request
    .findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true })
    .populate('sender receiver')
    .exec()
    .then(friendRequest => res.status(201).json(friendRequest))
    .catch(next);
}

function deleteFriend(req, res, next){

  Request
    .findOne({$or: [
      { sender: req.user._id, receiver: req.params.id },
      { receiver: req.user._id, sender: req.params.id }
    ]})
    .then(request => {
      console.log('the request is: ', request);
      if(!request) return res.notFound();
      return request.remove();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  addFriend: addFriend,
  getRequests: getRequests,
  acceptRequest: acceptRequest,
  refuseRequest: refuseRequest,
  deleteFriend: deleteFriend
};
