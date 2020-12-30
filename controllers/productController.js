const path = require('path');
const pathUtil = require('../utils/path');
const path2views = path.join(pathUtil, "views");

const ProductModel = require('../models/productModel');
const { json } = require('express');

const addProduct = (req, res, next) => {
    res.render(path.join(path2views, 'admin', 'add-product'), { pageTitle: 'Add Product', path: '/admin/add-product' });
}

const postAddProduct = (req, res, next) => {
    const product = new ProductModel(req.body.title, req.body.price, req.body.description, req.body.imageUrl);
    res.redirect('/');
}
const allProducts = (req, res, next) => {
    ProductModel.fetchAll().then((result) => {
        res.render(path.join(path2views, 'admin', 'products'), { products: result[0], pageTitle: 'Admin Products', path: '/admin/products'})
    }).catch(error => console.error(error))
}

const editProduct = (req, res, next) => {
    res.render(path.join(path2views, 'admin', 'edit-product'), { product:JSON.parse(req.body.product), pageTitle: 'Admin Edit Product', path: '/admin/edit-product' })
}

const updateProduct = (req, res, next) => {
    ProductModel.updateProduct(req.body).then(()=> res.redirect("/admin/products")).catch(err=>console.error(err));
}

const deleteProduct = (req, res, next) => {
    ProductModel.deleteProduct(req.body.product).then(() => {
        res.redirect("/admin/products")    
    }).catch((err) => {
        console.error(err)
    })
}


module.exports = {
    addProduct,
    postAddProduct,
    allProducts,
    editProduct,
    updateProduct,
    deleteProduct
}
