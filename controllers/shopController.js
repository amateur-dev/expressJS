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
    // req.body.prodID is the ID of the product and req.body.price is the price of the product when it was added to the cart
    // CartModel.AddProduct(req.body.prodID, req.body.price);
    let fetchedCart;
    req.user.getCart().then((cart) => {
        fetchedCart = cart;
        return cart.getProducts({where: {id: req.body.prodID}})
    }).then((products) => {
        let product;
        let newQuantity = 1;
        if (products.length>0){
            product = products[0];
        }
        if (product) {
            // WIP
        }
        return ProductModel.findByPk(req.body.prodID).then((product)=> {
            return fetchedCart.addProduct(product, {through: {
                quantity: newQuantity,
                amount: product.price
            }})
        })
    })
    .catch((err) => {
        console.error(err);
    });
    res.redirect("/cart")
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
