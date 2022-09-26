import ContenedorMongoDB from '../../contenedores/ContenedorMongoDB.js';
import { carritosSchema } from '../../schemas/mongoDB/schemas.js';

export default class CarritosDaoMongoDB extends ContenedorMongoDB {
  constructor() {
    super('carritos', carritosSchema);
  }
}
