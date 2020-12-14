const ProductModel = require('../models/productModel');

const addProduct = (req, res, next) => {
    res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product' });
}

const postAddProduct = (req, res, next) => {
    const product = new ProductModel(req.body.title);
    // product.save()
    res.redirect('/');
}

const allProducts = (req, res, next) => {
    const products = ProductModel.fetchAll()
    res.render('shop', { products, pageTitle: 'Shop', path: '/' });
}

module.exports = {
    addProduct,
    postAddProduct,
    allProducts
}