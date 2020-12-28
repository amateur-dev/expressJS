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

    static fetchSpecific(id, cb) {
        goGetSpecificProduct(id, cb);
    }

    static findById(id, cb) {
        goGetProducts(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static updateProduct(updatedProd) {
        goGetProducts((products) => {
            // console.log(updatedProd);
            let prod2BeUpdatedIndex = products.findIndex((element) =>
                element.prodID == updatedProd.prodID
            )
            products[prod2BeUpdatedIndex] = updatedProd;
            fs.writeFile(path2file, JSON.stringify(products), (err) => {
                if (err != null) { console.error(`There is an error in saving the file`) };
            });
        })
    }

    static deleteProduct(IdOfTheProd2BeDeleted) {
        goGetProducts((products) => {
            console.log(IdOfTheProd2BeDeleted);
            let prod2BeUpdatedIndex = products.findIndex((element) =>
                element.prodID == IdOfTheProd2BeDeleted
            )
            products.splice(prod2BeUpdatedIndex, 1);
            CartModel.deleteProduct(IdOfTheProd2BeDeleted)
            fs.writeFile(path2file, JSON.stringify(products), (err) => {
                if (err != null) { console.error(`There is an error in saving the file`) };
            });
        })
    }
}

module.exports = ProductModel;
