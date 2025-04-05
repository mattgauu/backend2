const { Router } = require('express');

const ProductController = require('../../controllers/products.controller');


const router = Router();
const {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
} = new ProductController()

router.get('/', getProducts)

router.post('/', createProduct)

router.get('/:pid', getProduct);

router.put('/:pid', updateProduct);

router.delete('/:pid', deleteProduct);

module.exports = router