const router = require('express').Router();
const startUps  = require('../controllers/startups');
const users = require('../controllers/users');
const auth  = require('../controllers/auth');
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

router.route('/*')
  .all((req, res) => res.notFound());

module.exports = router;
