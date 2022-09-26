import express from 'express';
import productsRouter from './routes/products.js';
import carritosRouter from './routes/carritos.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos', productsRouter);
app.use('/api/carritos', carritosRouter);

app.use((req, res) => {
  // Invalid request
  res.json({
    error: -2,
    descripcion: 'ruta y método inválidos!',
  });
});

export default app;
