const path = require('path');
const pathUtil = require('../utils/path');
const path2views = path.join(pathUtil, "views");

const ProductModel = require('../models/productModel');
const { json } = require('express');


const addProduct = (req, res, next) => {
    res.render(path.join(path2views, 'admin', 'add-product'), { pageTitle: 'Add Product', path: '/admin/add-product' });
}

const postAddProduct = (req, res, next) => {
    ProductModel.create({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }).then().catch(error => console.log(error))
}
const allProducts = (req, res, next) => {
    ProductModel.findAll().then((result) => {
        res.render(path.join(path2views, 'admin', 'products'), { products: result, pageTitle: 'Admin Products', path: '/admin/products' })
    }).catch(error => console.error(error))
}

const editProduct = (req, res, next) => {
    res.render(path.join(path2views, 'admin', 'edit-product'), { product: JSON.parse(req.body.product), pageTitle: 'Admin Edit Product', path: '/admin/edit-product' })
}

const updateProduct = (req, res, next) => {
    // console.log(req.body)
    ProductModel.update({
        title: req.body.title,
        price: req.body.price,
        imageUrl: req.body.imageUrl,
        description: req.body.description
    }, {
        where: { id: req.body.prodID }
    }).then(() => res.redirect("products")).catch(err => console.log(err))
}

const deleteProduct = (req, res, next) => {
    product = JSON.parse(req.body.product)
    ProductModel.destroy({
        where: {
            id: product.id
        }
    }).then(() => {
        res.redirect("/admin/products")
    }).catch((err) => {
        console.error(err) })
    }


module.exports = {
            addProduct,
            postAddProduct,
            allProducts,
            editProduct,
            updateProduct,
            deleteProduct
        }
