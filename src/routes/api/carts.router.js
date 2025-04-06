const { Router } = require('express');
const router = Router();
const CartController = require('../../controllers/carts.controller');
const { passportCall } = require('../../middleware/passportCall');
const { canManageCart } = require('../../middleware/auth.middlewares');

// Crear un nuevo carrito
router.post('/', passportCall('jwt'), CartController.createCart);

// Obtener un carrito por ID
router.get('/:cid', passportCall('jwt'), canManageCart, CartController.getCart);

// Actualizar el carrito completo
router.put('/:cid', passportCall('jwt'), canManageCart, CartController.updateCart);

// Agregar producto al carrito
router.post('/:cid/products/:pid', passportCall('jwt'), canManageCart, CartController.addProduct);

// Eliminar producto del carrito
router.delete('/:cid/products/:pid', passportCall('jwt'), canManageCart, CartController.removeProduct);

// Finalizar compra
router.post('/:cid/purchase', passportCall('jwt'), canManageCart, CartController.purchase);

module.exports = router;
