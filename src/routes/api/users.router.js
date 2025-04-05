const { Router } = require('express');
const { UserController } = require('../../controllers/users.controller');

const router = Router();
const userController = new UserController();

router.post('/', (req, res) => userController.createUser(req, res));
router.get('/', (req, res) => userController.getUsers(req, res));
router.get('/:uid', (req, res) => userController.getUser(req, res));
router.put('/:uid', (req, res) => userController.updateUser(req, res));
router.delete('/:uid', (req, res) => userController.deleteUser(req, res));

module.exports = router;
