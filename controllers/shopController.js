const path = require('path');
const pathUtil = require('../utils/path');
const path2views = path.join(pathUtil, "views");

const ProductModel = require('../models/productModel');
const CartModel = require('../models/cartModel');
const { request } = require('express');
const { error } = require('console');

const getProducts = (req, res, next) => {
    ProductModel.findAll().then((result) => {
        res.render(path.join(path2views, 'shop', 'index'), { products: result, pageTitle: 'All Products', path: '/products' });
    });
}

const getSpecificProduct = (req, res, next) => {
    ProductModel.findByPk(req.params.productid).then((result) => { res.render(path.join(path2views, 'shop', 'product-detail'), { products: result, pageTitle: 'All Products', path: '/products' }) })
    // ProductModel.fetchSpecific(req.params.productid, (p) => {
    //     res.render(path.join(path2views, 'shop', 'product-detail'), { products: p, pageTitle: 'All Products', path: '/products' });
    // })
}

const getIndex = (req, res, next) => {
    ProductModel.findAll().then((result) => {
        res.render(path.join(path2views, 'shop', 'index'), { products: result, pageTitle: 'Shop', path: '/' });
    })
}

// TODO: WIP
const getCart = (req, res, next) => {
    req.user.getCart().then((cart) => {
        return cart.getProducts()
    }).then((productsInCart) => {
        res.render(
            path.join(path2views, 'shop', 'cart'),
            { currentCart: productsInCart, pageTitle: 'Your Cart', path: '/cart' })
    }).catch((err) => {
        console.error(err);
    });
    // ProductModel.fetchAll((products) => {
    //     CartModel.getCart((cart) => {
    //         if (Object.keys(cart).length == 0) {
    //             res.render(
    //                 path.join(path2views, 'shop', 'cart'),
    //                 { currentCart: [], totalAmount: 0, pageTitle: 'Your Cart', path: '/cart' })
    //         } else {
    //             let totalAmount = 0;
    //             cart.products.forEach(e => {
    //                 totalAmount = totalAmount + e.prodCost
    //             })
    //             cart.products.forEach(e => {
    //                 let item = products.find(element =>
    //                     element.prodID == e.prodID
    //                 )
    //                 e.name = item.title
    //             })
    //             res.render(
    //                 path.join(path2views, 'shop', 'cart'),
    //                 { currentCart: cart.products, totalAmount, pageTitle: 'Your Cart', path: '/cart' })
    //         }
    //     })
    // })
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

const deleteCartProduct = (req, res, next) => {
    CartModel.deleteProduct(req.body.prodID)
    res.redirect("/cart");
}

module.exports = {
    getProducts,
    getSpecificProduct,
    getIndex,
    getCart,
    postCart,
    getOrders,
    getCheckout,
    deleteCartProduct
}
