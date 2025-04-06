const { Router } = require('express');
const router = Router();
const CartController = require('../../controllers/carts.controller');
const { passportCall } = require('../../middleware/passportCall');
const { canManageCart } = require('../../middleware/auth.middlewares');


router.post('/', passportCall('jwt'), CartController.createCart);


router.get('/:cid', passportCall('jwt'), canManageCart, CartController.getCart);


router.put('/:cid', passportCall('jwt'), canManageCart, CartController.updateCart);


router.post('/:cid/products/:pid', passportCall('jwt'), canManageCart, CartController.addProduct);


router.delete('/:cid/products/:pid', passportCall('jwt'), canManageCart, CartController.removeProduct);


router.post('/:cid/purchase', passportCall('jwt'), canManageCart, CartController.purchase);

module.exports = router;
