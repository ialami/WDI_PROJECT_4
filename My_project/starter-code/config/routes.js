const router = require('express').Router();
const startUps  = require('../controllers/startups');
const users = require('../controllers/users');
const auth  = require('../controllers/auth');
const requests = require('../controllers/requests');
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
router.route('/users/:id/commonfriends/:with')
  .get(secureRoute, users.commonFriends);
router.route('/users/:id/deletefriend/:friend/:requestid')
  .get(secureRoute, users.deleteFriend);

router.route('/requests')
  .get(secureRoute, requests.getRequests);
router.route('/requests/addfriend/:id')
  .post(secureRoute, requests.addFriend);
router.route('/requests/:id/accept')
  .put(secureRoute, requests.acceptRequest);


router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
