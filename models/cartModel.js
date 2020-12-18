const fs = require('fs');
const path = require('path');
const pathUtil = require('../utils/path');

const path2Cartfile = path.join(pathUtil, "data", "cart.json");
const path2Productsfile = path.join(pathUtil, "data", "products.json");

const CartModel = class Cart {
    static AddProduct(prodID, prodPrice) {
        // fetch the old cart
        fs.readFile(path2Cartfile, (err, fileContent) => {
            let cart = { products: [], totalAmount: 0 };
            if (!err) {
                cart = JSON.parse(fileContent)
            }
            // see if the prod alredy exists
            const existingProdIndex = cart.products.findIndex((p) => {
                p.id === prodID
            })
            const existingProd = cart.products[existingProdIndex]
            let updatedProduct;
            if (existingProd) {
                updatedProduct = { ...existingProd }
                updatedProduct.qty++;
                cart.products = [...cart.products]
                cart.products[existingProdIndex] = updatedProduct

            } else {
                updatedProduct = { id: prodID, qty: 1 }
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalAmount = cart.totalAmount + prodPrice;
            fs.writeFile(path2Cartfile, JSON.stringify(cart), (e) => console.error(e))
        })
        // add prod or increase the qty
    }
}

const CartModelRevised = class Cart {
    static AddProduct = (prodId, prodPrice) => {
        let cart = { products: [], totalAmount: 0 };
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
                qty: 1
            }
            cart.products.push(newProductObj);
        } else {
            ++cart.products[prodIndex].qty;
        }
        cart.totalAmount = cart.totalAmount + Number(prodPrice)
        // save the new cart
        fs.writeFile(path2Cartfile, JSON.stringify(cart), (e) => {if (e != null) {console.error(e)}})
        
    })
    }
}

module.exports = CartModelRevised;

/**

cartModel is done, need to import it in the ShopController and then use the funcitons to save the cart

 */