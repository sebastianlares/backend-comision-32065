import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { productschema } from '../../schemas/mongoDB/schemas.js';
import config from '../../config/config.js';

export default class ProductosDaoMongoDb extends ContenedorMongoDB {
  constructor() {
    super('products', productschema, config);
  }
}
