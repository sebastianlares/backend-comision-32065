import app from './server.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = 8090;
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on('error', error => console.log(`Error en servidor ${error}`));
