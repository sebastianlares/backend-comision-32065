const express = require('express');
const { Router } = express;

const ContenedorArchivo = require('./contenedores/ContenedorArchivo.js');

//--------------------------------------------
// instancio servidor y persistencia

const app = express();

const productosApi = new ContenedorArchivo('dbProductos.json');
const carritosApi = new ContenedorArchivo('dbCarritos.json');

//--------------------------------------------
// permisos de administrador

const esAdmin = true;

function crearErrorNoEsAdmin(ruta, metodo) {
    const error = {
        error: -1,
    };
    if (ruta && metodo) {
        error.descripcion = `ruta '${ruta}' metodo '${metodo}' no autorizado`;
    } else {
        error.descripcion = 'no autorizado';
    }
    return error;
}

function soloAdmins(req, res, next) {
    if (!esAdmin) {
        res.json(crearErrorNoEsAdmin());
    } else {
        next();
    }
}

//--------------------------------------------
// configuro router de productos

const productosRouter = new Router();

productosRouter.post('/', soloAdmins, async (req, res) => {
    const product = req.body;
    productosApi.save(product).then(prod => res.json(prod));
});

productosRouter.get('/:id?', async (req, res) => {
    const id = req.params.id;
    if (id) {
        const product = await productosApi.getById(id.toString());
        res.json(product);
        return;
    }
    const products = await productosApi.getAll();
    res.json(products);
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id;
    const newProduct = req.body;
    const products = await productosApi.updateById(newProduct, id).then(() => productosApi.getAll());
    res.json(products);
});

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
    const id = req.params.id;
    const products = await productosApi.deleteById(id.toString()).then(() => productosApi.getAll());
    res.json(products);
});

//--------------------------------------------
// configuro router de carritos

const carritosRouter = new Router();

carritosRouter.post('/', async (req, res) => {
    const cart = req.body;
    cart.products = [];
    carritosApi.save(cart).then(car => res.json(car));
});

carritosRouter.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const carts = await carritosApi.deleteById(Number(id)).then(() => carritosApi.getAll());
    res.json(carts);
});

carritosRouter.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const cart = await carritosApi.getById(Number(id));
    res.json(cart.products);
});

carritosRouter.post('/:id/productos', async (req, res) => {
    const cartId = req.params.id;
    const productId = req.body.id;
    const cart = await carritosApi.getById(Number(cartId));
    const product = await productosApi.getById(productId.toString());
    cart.products.push(product);
    carritosApi.updateById(cart, cartId).then(response => res.json(response));
});

//--------------------------------------------
// configuro el servidor

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', productosRouter);
app.use('/api/carritos', carritosRouter);

app.use((req, res) => {
    // Invalid request
    res.json({
        error: -2,
        descripcion: 'ruta y método inválidos!',
    });
});

module.exports = app;
