const express = require('express');
const Container = require('./container');
const generateRandomNumber = require('./helpers');

const app = express();
const PORT = 8090;
const productsContainer = new Container('products.txt');

const getRandomProductById = async () => {
    const allProducts = await productsContainer.getAll();
    const lastProductId = allProducts[allProducts.length - 1].id;
    const randomId = generateRandomNumber(1, lastProductId);
    const randomProduct = allProducts.filter(product => product.id === randomId);
    return randomProduct[0];
};

app.get('/', (req, res) => {
    res.send('Welcome to the products server');
});

app.get('/products', async (req, res) => {
    const allProducts = await productsContainer.getAll();
    res.send(allProducts);
});

app.get('/randomProduct', async (req, res) => {
    const randomProduct = await getRandomProductById();
    res.send(randomProduct);
});

const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
