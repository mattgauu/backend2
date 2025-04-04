const { Router } = require('express');
const SessionsController = require('../../controllers/sessions.controller');
const { passportCall } = require('../../middleware/passportCall.js');
const { authorization } = require('../../middleware/auth.middlewares.js')

const router = Router();
const sessionsController = new SessionsController();

router.post('/register', (req, res) => sessionsController.register(req, res));
router.post('/login', (req, res) => sessionsController.login(req, res));
router.get('/logout', (req, res) => sessionsController.logout(req, res));
router.get('/current', 
  passportCall('jwt'), 
  authorization('admin'), 
  (req, res) => sessionsController.current(req, res)
);

module.exports = router


