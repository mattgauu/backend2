const { Router } = require('express');
const router = Router();
const { passportCall } = require('../middleware/passportCall');
const CartController = require('../controllers/carts.controller');

router.post('/:cid/purchase', 
  passportCall('jwt'),
  CartController.purchase
);

module.exports = router;