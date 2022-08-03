const express = require('express');
const Container = require('./container');
const getRandomProductById = require('./helpers');

const app = express();
const PORT = 8080;
const productsContainer = new Container('products.txt');

app.get('/', (req, res) => {
    res.send('Welcome to the products server');
});

app.get('/products', async (req, res) => {
    const allProducts = await productsContainer.getAll();
    res.send(allProducts);
});

app.get('/randomProduct', async (req, res) => {
    const randomProduct = await getRandomProductById(productsContainer);
    res.send(randomProduct);
});

const server = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
