const path = require('path');

const pathUtil = require('../utils/path');

const path2views = path.join(pathUtil, "views");

const ProductModel = require('../models/productModel');

const getProducts = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        // console.log(products);
        res.render(path.join(path2views, 'shop', 'product-list'), { products, pageTitle: 'All Products', path: '/products' });
    })
}

const getSpecificProduct = (req, res, next) => {
    ProductModel.fetchSpecific(req.params.productid, (p) => {
        res.render(path.join(path2views, 'shop', 'product-detail'), { products: p, pageTitle: 'All Products', path: '/products' });
    })
}

const getIndex = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'shop', 'index'), { products, pageTitle: 'Shop', path: '/' });
    })
}

const getCart = (req, res, next) => {
    console.log(req.body.prodID);
    res.render(
        path.join(path2views, 'shop', 'cart'),
        { message: "This is a test message", pageTitle: 'Your Cart', path: '/cart' })
}

const getOrders = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'shop', 'orders'), { products, pageTitle: 'Your Orders', path: '/orders' });
    })
}

const getCheckout = (req, res, next) => {
    ProductModel.fetchAll((products) => {
        res.render(path.join(path2views, 'shop', 'checkout'), { products, pageTitle: 'Checkout', path: '/checkout' });
    })
}

module.exports = {
    getProducts,
    getSpecificProduct,
    getIndex,
    getCart,
    getOrders,
    getCheckout
}
