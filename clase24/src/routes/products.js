const express = require('express');
const { Router } = express;
const auth = require('../middlewares/index.js');
const controller = require('../controllers/products.js');

const productsRouter = new Router();

productsRouter.get('/', auth, controller.getRandomProducts);

module.exports = productsRouter;
