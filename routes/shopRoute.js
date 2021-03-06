const express = require('express');

const shopController = require('../controllers/shopController');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/product/:productid', shopController.getSpecificProduct);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/create-order', shopController.createOrder);

router.post('/delete-product', shopController.deleteCartProduct);

router.get('/orders', shopController.getOrders);

module.exports = router;
