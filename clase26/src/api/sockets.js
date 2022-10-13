const normalizr = require('normalizr');
const normalize = normalizr.normalize;
const denormalize = normalizr.denormalize;
const messagesApi = require('./messages.js');
const productsApi = require('./products.js');
const { messageSchema, messagesListSchema } = require('../schemas/normalzrSchemas.js');

const onSocketConnection = async socket => {
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
};

module.exports = onSocketConnection;
