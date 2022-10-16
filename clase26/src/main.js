const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');
const productsRouter = require('./routes/products.js');
const onSocketConnection = require('./api/sockets.js');
const session = require('express-session');
const { sessionConfig } = require('./routes/session.js');
const { User } = require('./schemas/schemas');
const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bCrypt = require('bcrypt');
const loginController = require('./controllers/auth.js');
const registerController = require('./controllers/register.js');
const auth = require('./middlewares/index.js');
const { createHash, isValidPassword } = require('./helpers/index.js');

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

app.use(session(sessionConfig));

app.set('views', './views');
app.set('view engine', 'ejs');

io.on('connection', onSocketConnection);

app.use('/api/productos-test', productsRouter);

app.use(passport.initialize());
app.use(passport.session());

// //LOGIN
app.get('/', auth, loginController.home);
app.get('/login', loginController.login);
app.post('/login', passport.authenticate('login', { failureRedirect: '/failLogin' }), loginController.postLogin);
app.get('/failLogin', loginController.getFailLogin);
app.get('/logout', loginController.logout);

// REGISTER
app.get('/register', registerController.getRegister);
app.post('/register', passport.authenticate('register', { failureRedirect: '/failRegister' }), registerController.postRegister);
app.get('/failRegister', registerController.getFailRegister);

const connectedServer = httpServer.listen(process.env.PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
