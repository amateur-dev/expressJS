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
        cb(JSON.parse(fileContent));
    });
}

const ProductModel = class Product {
    constructor(t) {
        this.title = t;
        this.save()
    }
    save() {
        try {
            goGetProducts((products) => {
                products.push(this);
                fs.writeFile(path2file, JSON.stringify(products), (err) => {
                    if (err == null) { console.error(`This is the ${err}`) };
                });
            })
        } catch (err) {
            console.error(err);
        }
    }

    static fetchAll(cb) {
        goGetProducts(cb);
    }
}

module.exports = ProductModel;
