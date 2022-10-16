class Controller {
  getRegister(req, res) {
    res.render('register');
  }

  postRegister(req, res) {
    res.render('home', { nombre: req.body.username });
  }

  getFailRegister(req, res) {
    res.render('failRegister');
  }
}

module.exports = new Controller();
