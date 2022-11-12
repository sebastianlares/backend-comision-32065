const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');
const apiRouter = require('./routes/api.js');
const onSocketConnection = require('./api/sockets.js');
const session = require('express-session');
const { User } = require('./schemas/schemas');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const loginController = require('../core/controllers/auth.js');
const infoController = require('../core/controllers/info.js');
const registerController = require('./controllers/register.js');
const auth = require('./middlewares/index.js');
const { createHash, isValidPassword } = require('./helpers/index.js');
const compression = require('compression');
const logger = require('./helpers/logger.js');
const config = require('../config/config.js');
const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

passport.use(
  'register',
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      User.findOne({ username: username }, (err, user) => {
        if (err) {
          return done(err);
        }

        if (user) {
          return done(null, false);
        }

        const newUser = {
          username: username,
          password: createHash(password),
        };

        User.create(newUser, (err, userWithId) => {
          if (err) {
            return done(err);
          }
          return done(null, userWithId);
        });
      });
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy((username, password, done) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return done(err);
      }

      if (!user) {
        return done(null, false);
      }

      if (!isValidPassword(user, password)) {
        return done(null, false);
      }
      return done(null, user);
    });
  }),
);

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser((id, done) => User.findById(id, done));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session(config.session));

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(passport.initialize());
app.use(passport.session());

// //LOGIN
app.get('/', auth, loginController.home);
app.get('/login', loginController.login);
app.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), loginController.postLogin);
app.get('/failLogin', loginController.getFailLogin);
app.get('/logout', loginController.logout);

// RANDOM API
app.use('/api', apiRouter);

// SOCKETS
io.on('connection', onSocketConnection);

// INFO
app.get('/info', [auth, compression()], infoController.info);
app.get('/info-zip', [auth, compression()], infoController.info);

// REGISTER
app.get('/register', registerController.getRegister);
app.post('/register', passport.authenticate('register', { failureRedirect: '/failRegister' }), registerController.postRegister);
app.get('/failRegister', registerController.getFailRegister);

app.use((req, res) => {
  // Invalid request
  logger.warn(`Ruta inexistente`);
  res.json({
    error: -2,
    descripcion: 'ruta y método inválidos!',
  });
});

module.exports = httpServer;
