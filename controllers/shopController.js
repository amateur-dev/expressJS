const path = require('path');

const pathUtil = require('../utils/path');

const path2views = path.join(pathUtil, "views");

const ProductModel = require('../models/productModel');

// const addProduct = (req, res, next) => {
//     res.render(path.join(path2views, 'admin', 'add-product'), { pageTitle: 'Add Product', path: '/admin/add-product' });
// }

const getProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'shop', 'product-list'), { products, pageTitle: 'All Products', path: '/products' });
    })
}

const getIndex = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'shop', 'index'), { products, pageTitle: 'Shop', path: '/' });
    })
}

const getCart = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'shop', 'cart'), { products, pageTitle: 'Your Cart', path: '/cart' });
    })
}

const getCheckout = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'shop', 'checkout'), { products, pageTitle: 'Checkout', path: '/checkout' });
    })
}

module.exports = {
    getProducts,
    getIndex,
    getCart,
    getCheckout
}
