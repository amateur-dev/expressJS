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
        // console.log(productsInCart)
        // console.log(productsInCart[0].cartitem.quantity)
        // console.log(productsInCart[0].cartitem.amount)
        let totalAmount = 0;
        productsInCart.forEach(product => {
            // console.log(product.cartitem.amount)
            totalAmount = totalAmount+product.cartitem.amount
        });
        res.render(
            path.join(path2views, 'shop', 'cart'),
            { currentCart: productsInCart, totalAmount: totalAmount, pageTitle: 'Your Cart', path: '/cart' })
    }).catch((err) => {
        console.error(err);
    });
}

const postCart = (req, res, next) => {
    // req.body.prodID is the ID of the product and req.body.price is the price of the product when it was added to the cart
    // CartModel.AddProduct(req.body.prodID, req.body.price);
    let fetchedCart;  // this is just declaring a variable
    req.user.getCart().then((cart) => {  // here we are getting the cart of the user
        fetchedCart = cart; // assigning it to the variable declared above
        return cart.getProducts({where: {id: req.body.prodID}}) // here we are attempting to get the info of prod (from the prod table)(using the prodId), but filtering it if it already exists in the cart.  Which means that if the product does not exist in the cart, will not show up.
    }).then((products) => {
        // console.log(products); // this is an empty array if the product that is being added to the cart is not already exisiting in the cart
        let product;
        let newQuantity = 1;
        if (products.length>0){
            product = products[0];
        }
        if (product) {
            let oldQuantity = product.cartitem.quantity;
            let oldAmount = product.cartitem.amount;
            return fetchedCart.addProduct(product, { // even though this command it addProduct it is actually just updating the quantity and the amount of the previosuly existing product
                through: {
                    quantity: oldQuantity+newQuantity,
                    amount: oldAmount+product.price
                }
            })
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
    req.user.getCart().then((cart) => {
        cart.getProducts({where: {
            id: req.body.prodID
        }}).then((products) => {
            let product = products[0]
            return product.cartitem.destroy()
        }).then((result) => {
            res.redirect("/cart");
        })
    }).catch((err) => {
        console.error(err);
    });
    
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
