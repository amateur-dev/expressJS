const products = [];

const ProductModel = class Product {
    constructor(t) {
        this.title = t;
        this.save()
    }

    save() {
        products.push(this);
    }

    static fetchAll() {
        return products;
    }
}

module.exports = ProductModel;
