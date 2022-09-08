import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import DB from '../src/models/database.js';
import config from './config/index.js';
import { getFormatedDate } from './helpers/index.js';

const app = express();
const httpServer = http.Server(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const messagesDB = new DB(config.sqlite3, 'messages');
const productsDB = new DB(config.mariaDb, 'products');

io.on('connection', async socket => {
  const products = await productsDB.getData();
  socket.emit('productos', products);

  const messages = await messagesDB.getData();
  socket.emit('messages', messages);

  socket.on('nuevo-producto', async product => {
    await productsDB.insert(product);
    const products = await productsDB.getData();
    io.sockets.emit('productos', products);
  });

  socket.on('new-message', async message => {
    message.date = getFormatedDate();
    await messagesDB.insert(message);
    const messages = await messagesDB.getData();
    socket.emit('messages', messages);
  });
});

const PORT = 8090;

const connectedServer = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
