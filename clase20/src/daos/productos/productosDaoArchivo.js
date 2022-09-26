import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

export default class ProductosDaoArchivos extends ContenedorArchivo {
  constructor() {
    super('./DB/dbProductos.json');
  }
}
