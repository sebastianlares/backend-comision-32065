const { getProcessInfo } = require('../helpers/index.js');

class Controller {
  info(req, res) {
    const info = getProcessInfo();
    res.render('info', { info });
  }
}

module.exports = new Controller();
