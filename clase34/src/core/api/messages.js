const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js');
const config = require('../../config/config.js');

const messagesApi = new ContenedorArchivo(config.fileSystem.db);

module.exports = messagesApi;
