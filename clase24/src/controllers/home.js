class Controller {
  home(req, res) {
    const user = req.session.user;
    res.render('home', { nombre: user });
  }

  login(req, res) {
    res.render('login');
  }

  postLogin(req, res) {
    const { nombre } = req.body;
    req.session.user = nombre;
    res.redirect('/');
  }

  logout(req, res) {
    const user = req.session.user;
    req.session.destroy(err => {
      if (!err) res.render('logout', { nombre: user });
      else res.send({ status: 'Logout ERROR', body: err });
    });
  }
}

module.exports = new Controller();
