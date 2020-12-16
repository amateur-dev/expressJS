const path = require('path');

const pathUtil = require('../utils/path');

const path2views = path.join(pathUtil, "views");

const ProductModel = require('../models/productModel');

const addProduct = (req, res, next) => {
    res.render(path.join(path2views, 'admin', 'add-product'), { pageTitle: 'Add Product', path: '/admin/add-product' });
}

const postAddProduct = (req, res, next) => {
    const product = new ProductModel(req.body.title, req.body.price, req.body.description, req.body.imageUrl);
    // product.save()
    res.redirect('/');
}
const allProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'admin', 'products'), { products, pageTitle: 'Admin Products', path: '/admin/products' });
    })
}


module.exports = {
    addProduct,
    postAddProduct,
    allProducts
}
