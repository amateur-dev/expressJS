// const products = [];
const fs = require('fs');
const path = require('path');
const pathUtil = require('../utils/path');

const ProductModel = class Product {
    constructor(t) {
        this.title = t;
        this.save()
    }

    save() {

        try {
            const path2file = path.join(pathUtil, "data", "products.json");
            fs.readFile(path2file, (err, fileContent) => {
                let products = [];
                if (!err) {
                    products = JSON.parse(fileContent);
                }
                products.push(this);
                fs.writeFile(path2file, JSON.stringify(products), (err) => {
                    console.error(err);
                });
            })

        } catch (err) {
            console.error(err);
        }

    }

    static fetchAll(cb) {
        fs.readFile(path.join(pathUtil, "data", "products.json"), (err, fileContent) => {
            if (err) { cb([]) }
            cb(JSON.parse(fileContent));
        });

    }
}

module.exports = ProductModel;
