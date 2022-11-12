const yargs = require('yargs/yargs')(process.argv.slice(2));
const dotenv = require('dotenv');
dotenv.config();

const args = yargs
  .default({
    PORT: 8090,
    MODE: 'FORK',
  })
  .alias({
    p: 'PORT',
    m: 'MODE',
  }).argv;

module.exports = {
  mongodb: {
    cnxStr: `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.89vsy.mongodb.net/?retryWrites=true&w=majority`,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  fileSystem: {
    db: `${__basedir}/DB/messages.json`,
  },
  args,
  session: {
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  },
};
