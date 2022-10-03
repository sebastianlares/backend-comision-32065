const express = require('express');
const util = require('util');
const normalizr = require('normalizr');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');
const messagesApi = require('./api/messages.js');
const productsApi = require('./api/products.js');
const productsRouter = require('./routes/products.js');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const schema = normalizr.schema;

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

const userSchema = new schema.Entity('user');
const messageSchema = new schema.Entity('message', {
  author: userSchema,
});
const messagesListSchema = new schema.Entity('messagesList', {
  messages: [messageSchema],
});

io.on('connection', async socket => {
  const products = await productsApi.getAll();
  const messagesList = await messagesApi.getAll();
  const messages = {
    id: 'mensajes',
    messages: messagesList,
  };
  const normalizedMessages = normalize(messages, messagesListSchema);
  socket.emit('mensajes', normalizedMessages);
  socket.emit('productos', products);

  socket.on('nuevoMensaje', async message => {
    const denormalizedMessage = denormalize(message.result, messageSchema, message.entities);
    await messagesApi.save(denormalizedMessage);
    const messagesList = await messagesApi.getAll();
    const messages = {
      id: 'mensajes',
      messages: messagesList,
    };
    const normalizedMessages = normalize(messages, messagesListSchema);
    socket.emit('mensajes', normalizedMessages);
  });

  socket.on('update', async product => {
    await productsApi.save(product);
    const products = await productsApi.getAll();
    socket.emit('productos', products);
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/productos-test', productsRouter);

const PORT = 8090;
const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
