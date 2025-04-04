const { Router } = require('express');
const { productModel } = require('../../models/products.model');
const { passportCall } = require('../../middleware/passportCall');
const { canManageProducts } = require('../../middleware/auth.middlewares');

const router = Router();

// http://localhost:8080 + /api/products
router.get('/', async (req, res, next) => {
    try {
        const products = await productModel.find();
        res.status(200).json({status: 'success', payload: products});
    } catch (error) {
        next(error);
    }
});

router.post('/', async (req, res, next) => {
    try {
  
        const result = await productModel.create(req.body);
        res.status(201).json({status: 'success', payload: result}); // 201 Created
    } catch (error) {
        next(error);
    }
});

// http://localhost:8080 + /api/products + /:pid
router.put('/:pid', async (req, res, next) => {
    try {
        const updatedProduct = await productModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json(updatedProduct);
    } catch (error) {
        next(error);
    }
});

router.delete('/:pid', async (req, res, next) => {
    try {
        const deletedProduct = await productModel.findByIdAndDelete(req.params.pid);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(204).send(); // 204 No Content (successful deletion)
    } catch (error) {
        next(error);
    }
});

router.post('/', passportCall('jwt'), canManageProducts, /* ... */);
router.put('/:pid', passportCall('jwt'), canManageProducts, /* ... */);
router.delete('/:pid', passportCall('jwt'), canManageProducts, /* ... */);

module.exports = router;