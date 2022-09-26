import express from 'express';
const { Router } = express;
import soloAdmins from '../middlewares/index.js';
import { productosDao as productsApi } from '../daos/index.js';
const productosRouter = new Router();

productosRouter.post('/', soloAdmins, async (req, res) => {
  const product = req.body;
  const response = await productsApi.save(product);
  res.json(response);
});

productosRouter.get('/:id?', async (req, res) => {
  const id = req.params.id;
  if (id) {
    const product = await productsApi.getById(id);
    res.json(product);
    return;
  }
  const products = await productsApi.getAll();
  res.json(products);
});

productosRouter.put('/:id', soloAdmins, async (req, res) => {
  const id = req.params.id;
  const newProduct = req.body;
  const updatedProduct = await productsApi.updateById(newProduct, id);
  res.json(updatedProduct);
});

productosRouter.delete('/:id', soloAdmins, async (req, res) => {
  const id = req.params.id;
  const products = await productsApi.deleteById(id);
  res.json(products);
});

export default productosRouter;
