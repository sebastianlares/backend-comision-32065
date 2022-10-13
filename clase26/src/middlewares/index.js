const auth = (req, res, next) => {
  if (req.originalUrl === '/login' && req.session?.user) {
    return res.redirect('/');
  } else if (req.originalUrl === '/login' && !req.session?.user) {
    return next();
  }
  if (req.session?.user) {
    return next();
  }
  return res.status(401).redirect('/login');
};

module.exports = auth;
