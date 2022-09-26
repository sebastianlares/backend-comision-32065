import { crearErrorNoEsAdmin } from '../helpers/index.js';

const soloAdmins = (req, res, next) => {
  const esAdmin = true;
  if (!esAdmin) {
    res.json(crearErrorNoEsAdmin());
  } else {
    next();
  }
};

export default soloAdmins;
