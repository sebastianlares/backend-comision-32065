const express = require('express');
const { Router } = express;
const { getRandomProducts } = require('../helpers/index.js');

const productsRouter = new Router();

productsRouter.get('/', (req, res) => {
  const products = getRandomProducts(5);
  console.log(products);
  res.json(products);
});

module.exports = productsRouter;
