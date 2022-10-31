const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js');

const messagesApi = new ContenedorArchivo('./DB/messages.json');

module.exports = messagesApi;
