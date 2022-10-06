const ContenedorMongoDB = require('../contenedores/ContenedorMongoDB.js');
const config = require('../config/config.js');
const { productschema } = require('../schemas/mongoDB/schemas.js');

const productosApi = new ContenedorMongoDB('products', productschema, config);

module.exports = productosApi;
