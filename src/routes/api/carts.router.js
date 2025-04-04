const { Router } = require('express');
const router = Router();
const { passportCall } = require('../../middleware/passportCall');
const { canManageCart } = require('../../middleware/auth.middlewares');
const CartController = require('../../controllers/carts.controller');

router.post('/:cid/purchase', 
  passportCall('jwt'),
  canManageCart,
  CartController.purchase
);

module.exports = router;