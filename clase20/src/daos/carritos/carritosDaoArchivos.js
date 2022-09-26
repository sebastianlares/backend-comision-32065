import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';

export default class CarritosDaoArchivos extends ContenedorArchivo {
  constructor() {
    super('./DB/dbCarritos.json');
  }
}
