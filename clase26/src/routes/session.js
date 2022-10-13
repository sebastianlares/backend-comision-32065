const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPass = process.env.MONGO_PASSWORD;
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

const sessionConfig = {
  store: MongoStore.create({
    mongoUrl: `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.89vsy.mongodb.net/sessions?retryWrites=true&w=majority`,
    mongoOptions: advancedOptions,
  }),
  secret: 'secret',
  resave: true,
  saveUninitialized: false,
  rolling: true,
  cookie: {
    maxAge: 60000,
  },
};

module.exports = { sessionConfig };
