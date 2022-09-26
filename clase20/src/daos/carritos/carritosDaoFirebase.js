import ContenedorFirebase from '../../contenedores/ContenedorFirebase.js';
import admin from 'firebase-admin';

export default class CarritosDaoFirebase extends ContenedorFirebase {
  constructor() {
    super('carritos', {}, admin);
  }
}
