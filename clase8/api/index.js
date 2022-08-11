const fs = require('fs');

class ProductsApi {
    constructor() {
        this.products = [];
        this.id = 0;
    }

    save(product) {
        product.id = this.id + 1;
        this.id++;
        this.products.push(product);
    }

    getById(id) {
        const filteredProduct = this.products.filter(product => product.id === id);
        return filteredProduct[0];
    }

    getAll() {
        return this.products;
    }

    deleteById(id) {
        const filteredProducstArray = this.products.filter(product => product.id !== id);
        return filteredProducstArray;
    }

    updateById(newProduct, id) {
        const updatedProductsArray = this.products.map(product => (product.id == id ? newProduct : product));
        this.products = updatedProductsArray;
        return updatedProductsArray;
    }
}

module.exports = ProductsApi;
