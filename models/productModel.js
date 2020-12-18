// const products = [];
const fs = require('fs');
const path = require('path');
const pathUtil = require('../utils/path');

const path2file = path.join(pathUtil, "data", "products.json");

const goGetProducts = (cb) => {
    fs.readFile(path2file, (err, fileContent) => {
        if (err) {
            console.log(`There is an error in reading the file from the fetchAll function ${err}`);
            return cb([])
        }
        // JSON.parse(fileContent) is an array of objects
        cb(JSON.parse(fileContent));
    });
}

const goGetSpecificProduct = (id, cb) => {
    fs.readFile(path2file, (err, fileContent) => {
        if (err) {
            console.log(`There is an error in reading the file from the fetchAll function ${err}`);
            return cb([])
        }
        cb(JSON.parse(fileContent).filter(p => p.id == id));
    });
}

const ProductModel = class Product {
    constructor(title, price, description, imageUrl) {
        this.title = title;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.save()
    }
    save() {
        this.id = ((Math.floor(Math.random() * 1000) + 1)).toString();
        try {
            goGetProducts((products) => {
                products.push(this);
                fs.writeFile(path2file, JSON.stringify(products), (err) => {
                    if (err != null) { console.error(`There is an error in saving the file`) };
                });
            })
        } catch (err) {
            console.error(err);
        }
    }

    static fetchAll(cb) {
        goGetProducts(cb);
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
}

module.exports = ProductModel;
