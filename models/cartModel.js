const fs = require('fs');
const path = require('path');
const pathUtil = require('../utils/path');

const path2Cartfile = path.join(pathUtil, "data", "cart.json");
const path2Productsfile = path.join(pathUtil, "data", "products.json");

const CartModelRevised = class Cart {
    static AddProduct = (prodId, prodPrice) => {
        let cart = [{ products: [] }];
        // read the current file and get cart
        fs.readFile(path2Cartfile, (err, fileContent) => {
            if (!err) {
                cart = JSON.parse(fileContent)
                // this means we have a cart
            }
            // finding the product
            let prodIndex = cart.products.findIndex((element) => element.prodID == prodId)
            if (prodIndex === -1) {
                let newProductObj = {
                    prodID: prodId,
                    qty: 1,
                    prodCost: Number(prodPrice)
                }
                cart.products.push(newProductObj);
            } else {
                ++cart.products[prodIndex].qty;
                cart.products[prodIndex].prodCost = cart.products[prodIndex].prodCost + Number(prodPrice);
            }
            // save the new cart
            fs.writeFile(path2Cartfile, JSON.stringify(cart), (e) => { if (e != null) { console.error(e) } })

        })
    }

    static deleteProduct(prodId) {
        fs.readFile(path2Cartfile, (err, fileContent) => {
            if (err) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.prodID === prodId);
            if (!product) {
                return;
            }
            // const productQty = product.qty;
            updatedCart.products = updatedCart.products.filter(
                prod => prod.prodID !== prodId
            );
            // updatedCart.totalPrice =
            //     updatedCart.totalPrice - productPrice * productQty;
            fs.writeFile(path2Cartfile, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(path2Cartfile, (err, fileContent) => {
            if (!err) {
                cb(JSON.parse(fileContent));
            } else {
                cb({})
            }
        })
    }

}

module.exports = CartModelRevised;