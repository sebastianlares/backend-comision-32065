const express = require('express');
const { Router } = express;
const ProductsApi = require('./api');

const productsApi = new ProductsApi();
const productsRouter = new Router();

productsRouter.use(express.json());
productsRouter.use(express.urlencoded({ extended: true }));

productsRouter.get('/', (req, res) => {
    const allProducts = productsApi.getAll();
    if (!allProducts.length) {
        res.status(404).json('No products were found');
        return;
    }
    res.json(allProducts);
});

productsRouter.post('/', (req, res) => {
    const newProduct = req.body;
    productsApi.save(newProduct);
    res.status(200).json(productsApi.getAll());
});

productsRouter.get('/:id', (req, res) => {
    const productId = Number(req.params.id);
    if (!productExists(productId)) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }
    res.json(product);
});

productsRouter.delete('/:id', (req, res) => {
    let productId = Number(req.params.id);
    if (!productExists(productId)) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }
    const productsAray = productsApi.deleteById(productId);
    res.json(productsAray);
});

productsRouter.put('/:id', (req, res) => {
    const productIdToUpdate = Number(req.params.id);
    if (!productExists(productIdToUpdate)) {
        res.status(404).json({ error: 'Product not found' });
        return;
    }
    let newProduct = req.body;
    newProduct.id = productIdToUpdate;
    const updatedProductsArray = productsApi.updateById(newProduct, productIdToUpdate);
    res.json(updatedProductsArray);
});

const productExists = id => {
    const product = productsApi.getById(id);
    return product;
};

const app = express();
app.use(express.static(__dirname + '/public'));
app.use('/api/products', productsRouter);

const PORT = 8090;
const server = app.listen(PORT, () => console.log(`Server listening on port ${server.address().port}`));

server.on('error', err => console.log(`Error on server ${err}`));
