import ProductosDaoMongoDb from './productos/productosDaoMongoDB.js';
import ProductosDaoFirebase from './productos/productosDaoFirebase.js';
import ProductosDaoArchivos from './productos/productosDaoArchivo.js';
import CarritosDaoMongoDB from './carritos/carritosDaoMongoDB.js';
import CarritosDaoFirebase from './carritos/carritosDaoFirebase.js';
import CarritosDaoArchivos from './carritos/carritosDaoArchivos.js';

let carritosDao;
let productosDao;
const DAOENV = process.env.DAO;

switch (DAOENV) {
  case 'mongo':
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDB();
    break;
  case 'firebase':
    productosDao = new ProductosDaoFirebase();
    carritosDao = new CarritosDaoFirebase();
    break;
  case 'archivos':
    productosDao = new ProductosDaoArchivos();
    carritosDao = new CarritosDaoArchivos();
    break;
  default:
    productosDao = new ProductosDaoMongoDb();
    carritosDao = new CarritosDaoMongoDB();
    break;
}

export { carritosDao, productosDao };
