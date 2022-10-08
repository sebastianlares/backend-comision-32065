const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');
const productsRouter = require('./routes/products.js');
const onSocketConnection = require('./api/sockets.js');
const session = require('express-session');
const homeRouter = require('./routes/home.js');
const { sessionConfig } = require('./routes/session.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session(sessionConfig));

app.set('views', './views');
app.set('view engine', 'ejs');

io.on('connection', onSocketConnection);

app.use(homeRouter);
app.use('/api/productos-test', productsRouter);

const connectedServer = httpServer.listen(process.env.PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
