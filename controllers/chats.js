const Chat = require('../models/chat');

const sockets = require('../lib/sockets');
const io = sockets.getConnection();

// GET /chats
function chatsIndex(req, res, next){

  Chat
    .find({ users: req.user._id })
    .populate('users messages.sender')
    .exec()
    .then(allChats => res.json(allChats))
    .catch(next);
}

// POST /chats/:receiverId
function chatsCreate(req, res, next){
  req.body.users = [req.user._id, req.params.receiverId];

  Chat
    .create(req.body)
    .then(message => res.status(201).json(message))
    .catch(next);
}

// GET /chats/:chatId
function chatsShow(req, res, next){

  Chat
    .find({ users: req.user._id })
    .populate('users messages.sender')
    .exec()
    .then(myChats => {
      if (!myChats) return res.notFound();
      res.json(myChats);
    })
    .catch(next);
}

// POST /chats/:chatId/message
function messageCreate(req, res, next){
  Chat
    .findById(req.params.chatId)
    .populate('users messages.sender')
    .exec()
    .then(chat => {
      req.body.sender = req.user;
      chat.messages.push(req.body);
      return chat.save();
    })
    .then(chat => {
      io.emit('CHAT', chat);
    })
    .catch(next);
}

// DELETE a message /chats/:chatId/message/:messageId
function messageDelete(req, res, next){

  Chat
    .findById(req.params.chatId)
    .exec()
    .then(chat => {
      const message = chat.messages.id(req.params.messageId);
      if (message.sender !== req.user._id) return res.unauthorized();
      message.remove();
      chat.save();
    })
    .then(() => res.status(204).end())
    .catch(next);
}

// DELETE /chats/:chatId

function chatDelete(req, res, next){

  Chat
    .findById(req.params.chatId)
    .exec()
    .then(chat => {
      if (!chat) return res.notFound();
      const userId = req.user._id.toString();
      if(!chat.users.toString().includes(userId)) return res.unauthorized();
      chat.remove();
      //when I make a get req again it doesn't return chat not found
    })
    .then(() => res.status(204).end())
    .catch(next);
}

module.exports = {
  create: chatsCreate,
  index: chatsIndex,
  show: chatsShow,
  messageCreate: messageCreate,
  messageDelete: messageDelete,
  delete: chatDelete
};
