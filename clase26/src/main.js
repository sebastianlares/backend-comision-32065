const express = require('express');
const { Server: HttpServer } = require('http');
const { Server: Socket } = require('socket.io');
const productsRouter = require('./routes/products.js');
const onSocketConnection = require('./api/sockets.js');
const session = require('express-session');
const homeRouter = require('./routes/home.js');
const { sessionConfig } = require('./routes/session.js');

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

// passport.use(
//   'signup',
//   new LocalStrategy(
//     {
//       passReqToCallback: true,
//     },
//     (req, username, password, done) => {
//       User.findOne({ username: username }, (err, user) => {
//         if (err) {
//           return done(err);
//         }

//         if (user) {
//           return done(null, false);
//         }

//         const newUser = {
//           username: username,
//           password: createHash(password),
//           email: req.body.email,
//           firstName: req.body.firstName,
//           lastName: req.body.lastName,
//         };

//         User.create(newUser, (err, userWithId) => {
//           if (err) {
//             return done(err);
//           }
//           return done(null, userWithId);
//         });
//       });
//     },
//   ),
// );

// passport.use(
//   'login',
//   new LocalStrategy((username, password, done) => {
//     User.findOne({ username }, (err, user) => {
//       if (err) {
//         return done(err);
//       }

//       if (!user) {
//         return done(null, false);
//       }

//       if (!isValidPassword(user, password)) {
//         return done(null, false);
//       }

//       return done(null, user);
//     });
//   }),
// );

// passport.serializeUser((user, done) => {
//   done(null, user._id);
// });

// passport.deserializeUser((id, done) => {
//   User.findById(id, done);
// });

// function createHash(password) {
//   return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
// }

// function isValidPassword(user, password) {
//   return bCrypt.compareSync(password, user.password);
// }

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(session(sessionConfig));

app.set('views', './views');
app.set('view engine', 'ejs');

io.on('connection', onSocketConnection);

app.use(homeRouter);
app.use('/api/productos-test', productsRouter);

// TODO

// app.use(passport.initialize());
// app.use(passport.session());

// //LOGIN
// app.get('/login', routes.getLogin);
// app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
// app.get('/faillogin', routes.getFailLogin);

// //SIGNUP
// app.get('/signup', routes.getSignUp);
// app.post(
//   '/signup',
//   passport.authenticate('signup', {
//     failureRedirect: '/failsignup',
//   }),
//   routes.postSignup,
// );
// app.get('/failsignup', routes.getFailsignup);

// //Last part
// function checkAuthentication(req, res, next) {
//   if (req.isAuthenticated()) {
//     next();
//   } else {
//     res.redirect('/login');
//   }
// }

// app.get('/ruta-protegida', checkAuthentication, (req, res) => {
//   const { user } = req;
//   console.log(user);
//   res.send('<h1>Ruta OK!</h1>');
// });

// //LOGOUT
// app.get('/logout', routes.getLogout);

const connectedServer = httpServer.listen(process.env.PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`);
});
connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
