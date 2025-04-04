const { Router } = require('express');
const viewsController = require('../controllers/views.controller.js');

const router = Router();

router.get('/', viewsController.home);
router.get('/login', viewsController.login);
router.get('/register', viewsController.register);

module.exports = router;