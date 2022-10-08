const { getRandomProducts } = require('../helpers/index.js');

class Controller {
  getRandomProducts(req, res) {
    const products = getRandomProducts(5);
    console.log(products);
    res.json(products);
  }
}

module.exports = new Controller();
