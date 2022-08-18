const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const ProductsApi = require('../api');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const productsApi = new ProductsApi();

app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: path.join(__dirname, '..', 'views', 'layouts'),
        partialsDir: path.join(__dirname, '..', 'views', 'partials'),
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '..', 'views'));

app.post('/products', (req, res) => {
    const newProduct = req.body;
    productsApi.save(newProduct);
    res.redirect('/');
});

app.get('/products', (req, res) => {
    const products = productsApi.getAll();
    if (!products.length) {
        res.render('main', { listExists: false });
        return;
    }
    res.render('main', { productsList: products, listExists: true });
});

const PORT = 8090;

const server = app.listen(PORT, () => console.log(`Server listening on Port ${server.address().port}`));

server.on('error', error => console.log(`Error on server ${error}`));
