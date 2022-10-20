const auth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).redirect('/login');
  }
};

module.exports = auth;
