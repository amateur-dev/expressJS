const path = require('path');

const express = require('express');

const rootDir = require('../utils/path');
const adminData = require('./adminRoute');

const router = express.Router();

router.get('/', (req, res, next) => {
    const products = adminData.products;
    res.render('shop', { products, pageTitle: 'Shop', path: '/' });
});

module.exports = router;
