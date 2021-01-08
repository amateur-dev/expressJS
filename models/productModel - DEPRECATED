// const products = [];
const fs = require('fs');
const path = require('path');
const pathUtil = require('../utils/path');
const db = require('../utils/database');

const CartModel = require('./cartModel');

const path2file = path.join(pathUtil, "data", "products.json");


const ProductModel = class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.save().then(() => {
            console.log("New Product has been added to the DB");
        })
    }
    save() {
        // id will now be generated automatically by sql
        // this.prodID = ((Math.floor(Math.random() * 1000) + 1)).toString();
        try {
            return db.execute(`INSERT INTO products (title, price, description, imageUrl) VALUES (?,?,?,?)`, [this.title, this.price, this.description, this.imageUrl])
        } catch (err) {
            console.error(err);
        }
    }

    static fetchAll() {
        return db.execute("SELECT * FROM products")
    }

    static fetchSpecific(id) {
        return db.execute("SELECT * FROM products WHERE products.id = ?", [id])
    }

    static findById(id) {
        return fetchSpecific(id)
    }

    static updateProduct(updatedProd) {
        return db.execute("UPDATE products SET title = ?, price = ?, description = ?, imageUrl = ? WHERE products.id = ?", [updatedProd.title, updatedProd.price, updatedProd.description, updatedProd.imageUrl, updatedProd.prodID])
    }

    static deleteProduct(product) {
        return db.execute("DELETE FROM products WHERE (id = ?)", [product.id])
    }
}

module.exports = ProductModel;
