const fs = require('fs');

class Container {
    constructor(fileRoute) {
        this.fileRoute = fileRoute;
    }

    async save(product) {
        const allProducts = await this.getAll();
        if (!allProducts.length) product.id = 1;
        else {
            const lastProductId = allProducts[allProducts.length - 1].id;
            product.id = lastProductId + 1;
        }
        allProducts.push(product);
        try {
            await fs.promises.writeFile(this.fileRoute, JSON.stringify(allProducts));
            return product.id;
        } catch (error) {
            console.error(error);
        }
    }

    async getById(id) {
        try {
            const allProducts = await this.getAll();
            const filteredProduct = allProducts.filter(product => product.id === id);
            return filteredProduct || null;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            let productsArray = await fs.promises.readFile(this.fileRoute, 'utf-8');
            if (!productsArray.length) return [];
            const parsedArray = JSON.parse(productsArray);
            return parsedArray;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            const allProducts = await this.getAll();
            const filteredProductArray = allProducts.filter(product => product.id !== id);
            console.log(filteredProductArray);
            await fs.promises.writeFile(this.fileRoute, JSON.stringify(filteredProductArray));
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteAll() {
        try {
            await fs.promises.writeFile(this.fileRoute, '');
        } catch (error) {
            throw new Error(error);
        }
    }
}

module.exports = Container;
