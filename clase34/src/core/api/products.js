const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB.js');
const config = require('../../config/config.js');
const { productschema } = require('../schemas/schemas.js');

const productosApi = new ContenedorMongoDB('products', productschema, config);

module.exports = productosApi;
