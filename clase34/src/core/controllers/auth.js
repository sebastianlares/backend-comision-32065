const logger = require('../helpers/logger.js');

class Controller {
  home(req, res) {
    res.render('home', { nombre: req.user.username });
  }

  login(req, res) {
    logger.info(req);

    res.render('login');
  }

  postLogin(req, res) {
    res.redirect('/');
  }

  logout(req, res) {
    req.session.destroy(err => {
      if (!err) res.render('logout', { nombre: req.user.username });
      else res.send({ status: 'Logout ERROR', body: err });
    });
  }

  getFailLogin(req, res) {
    res.render('failLogin');
  }
}

module.exports = new Controller();
