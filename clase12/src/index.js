const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: IOServer } = require('socket.io');
const ProductsApi = require('../containers/ProductsContainer');
const FileContainer = require('../containers/FileContainer');

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const path = require('path');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const messagesPath = path.join(__dirname, '/messages', '/messages.txt');

const productsApi = new ProductsApi();
const fileContainer = new FileContainer(messagesPath);

io.on('connection', async socket => {
    const products = productsApi.getAll();
    socket.emit('productos', products);

    socket.on('nuevo-producto', product => {
        productsApi.save(product);
        io.sockets.emit('productos', products);
    });

    const messages = await fileContainer.getAllMessages();
    socket.emit('messages', messages);

    socket.on('new-message', async message => {
        await fileContainer.save(message);
        const messages = await fileContainer.getAllMessages();
        socket.emit('messages', messages);
    });
});

const PORT = 8090;

const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
