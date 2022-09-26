import express from 'express';
const { Router } = express;
import { carritosDao as carritosApi, productosDao as productosApi } from '../daos/index.js';
const carritosRouter = new Router();

carritosRouter.post('/', async (req, res) => {
  const cart = req.body;
  cart.products = [];
  carritosApi.save(cart).then(car => res.json(car));
});

carritosRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const carts = await carritosApi.deleteById(Number(id));
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

export default carritosRouter;
