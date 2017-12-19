const router = require('express').Router();
const startUps  = require('../controllers/startups');
const users = require('../controllers/users');
const auth  = require('../controllers/auth');
const requests = require('../controllers/requests');
const chats = require('../controllers/chats');
const secureRoute = require('../lib/secureRoute');

router.route('/startups')
  .get(startUps.index)
  .post(secureRoute, startUps.create);

router.route('/startups/:id')
  .get(secureRoute, startUps.show)
  .put(secureRoute, startUps.update)
  .delete(secureRoute, startUps.delete);

router.route('/register')
  .post(auth.register);

router.route('/login')
  .post(auth.login);

router.route('/users')
  .get(users.index);
router.route('/users/:id')
  .all(secureRoute)
  .get(users.show)
  .put(users.update)
  .delete(users.delete);
router.route('/users/:id/passwords')
  .put(users.verifyPassword);
router.route('/users/:id/startups')
  .get(users.showStartups);
router.route('/users/commonfriends/:with')
  .get(secureRoute, users.commonFriends);

router.route('/requests')
  .get(secureRoute, requests.getRequests);
router.route('/requests/:userId/add')
  .post(secureRoute, requests.addFriend);
router.route('/requests/:id/accept')
  .put(secureRoute, requests.acceptRequest);
router.route('/requests/:id/refuse')
  .put(secureRoute, requests.refuseRequest);
router.route('/requests/:id/delete')
  .delete(secureRoute, requests.deleteFriend);

router.route('/chats')
  .get(secureRoute, chats.index);
router.route('/chats/:receiverId')
  .post(secureRoute, chats.create);
router.route('/chats/:chatId')
  .get(secureRoute, chats.show)
  .delete(secureRoute, chats.delete);
router.route('/chats/:chatId/message')
  .post(secureRoute, chats.messageCreate);
router.route('/chats/:chatId/message/:messageId')
  .delete(secureRoute, chats.messageDelete);

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
