const path = require('path');

const pathUtil = require('../utils/path');

const path2views = path.join(pathUtil, "views");

const ProductModel = require('../models/productModel');
const CartModel = require('../models/cartModel');
const { request } = require('express');

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

// TODO: dipesh to work on rendering the cart page
const getCart = (req, res, next) => {
    let cart = [
        {
            "prodID": "794",
            "qty": 4,
            "prodCost": 3500
        },
        {
            "prodID": "569",
            "qty": 4,
            "prodCost": 40
        },
        {
            "prodID": "391",
            "qty": 2,
            "prodCost": 40
        }
    ]
    res.render(
        path.join(path2views, 'shop', 'cart'),
        { cart: cart, pageTitle: 'Your Cart', path: '/cart' })
}

const postCart = (req, res, next) => {
    // this route is getting the id and the price of the product from the FE
    // req.body.prodID and req.body.price
    CartModel.AddProduct(req.body.prodID, req.body.price);
    res.redirect("/products")
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
    postCart,
    getOrders,
    getCheckout
}
