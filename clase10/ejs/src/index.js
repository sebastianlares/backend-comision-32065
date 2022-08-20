const express = require('express');
const ProductsApi = require('../api');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const productsApi = new ProductsApi();

app.set('views', './views');
app.set('view engine', 'ejs');

app.post('/products', (req, res) => {
    const newProduct = req.body;
    productsApi.save(newProduct);
    res.redirect('/');
});

app.get('/products', (req, res) => {
    const products = productsApi.getAll();
    if (!products.length) {
        console.log('entra');
        res.render('index', { message: 'No se encontraron productos', listExists: false });
        return;
    }
    res.render('index', { products, listExists: true });
});

const PORT = 8090;

const server = app.listen(PORT, () => console.log(`Server listening on Port ${server.address().port}`));

server.on('error', error => console.log(`Error on server ${error}`));
