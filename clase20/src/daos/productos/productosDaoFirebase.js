import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';
import config from '../../config/config.js';
import admin from 'firebase-admin';

export default class ProductosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('products', config, admin);
  }
}
