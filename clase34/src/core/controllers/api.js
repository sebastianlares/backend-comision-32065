const { getRandomProducts } = require('../helpers/index.js');
const { fork } = require('child_process');

class Controller {
  getRandomProducts(req, res) {
    const products = getRandomProducts(5);
    console.log(products);
    res.json(products);
  }

  getRandomNumbers(req, res) {
    let numbers = req.query.cant;
    if (!numbers) numbers = 100000000;
    const forkedExec = fork('./src/helpers/fork.js', [`${numbers}`]);
    forkedExec.send('start');
    forkedExec.on('message', suma => {
      res.json(suma);
    });
  }
}

module.exports = new Controller();
