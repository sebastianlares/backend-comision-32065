const dotenv = require('dotenv');
dotenv.config();

const sessionConfig = {
  secret: 'secret',
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 600000,
  },
};

module.exports = { sessionConfig };
