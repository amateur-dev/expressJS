const fs = require('fs');
const path = require('path');
const pathUtil = require('../utils/path');

const path2Cartfile = path.join(pathUtil, "data", "cart.json");
const path2Productsfile = path.join(pathUtil, "data", "products.json");

/** how should my Cart look like?
it should have the following details
(A) prodID
(B) qty
eg
{"234": 5, "567": 10}
The cart view should total up the total of all the prices (by fetching the prices of the prodID) 

OR

cart = [{prods}, totalCost] 
in this the {prods} = {prodID, qty}

However, to make it simple Dipesh is going with the first option

*/

const CartModel = class Cart {
    static getCurrentCart = () => {
        fs.readFile(path2Cartfile, (err, fileContent) => {
            if (err) {
                let currentCart = {}
                return currentCart;
            }
            return JSON.parse(fileContent)
        })
    }

    static addProduct(prodID) {
        let currentCart = this.getCurrentCart();
        currentCart[prodID] = +1
    }
}

module.exports = CartModel;

/**

cartModel is done, need to import it in the ShopController and then use the funcitons to save the cart

 */