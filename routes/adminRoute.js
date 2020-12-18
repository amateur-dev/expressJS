const path = require('path');
const express = require('express');
const router = express.Router();

const productController = require('../controllers/adminController');

// /admin/add-product => GET
router.get('/add-product', productController.addProduct);
router.post('/edit-product', productController.editProduct);
router.post('/update-product', productController.updateProduct);
router.get('/products', productController.allProducts);

// /admin/add-product => POST
router.post('/add-product', productController.postAddProduct);

// module.exports = router;
module.exports = router;
