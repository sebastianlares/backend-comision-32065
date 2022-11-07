const yargs = require('yargs/yargs')(process.argv.slice(2));

const args = yargs
  .default({
    PORT: 8080,
    MODE: 'FORK',
  })
  .alias({
    p: 'PORT',
    m: 'MODE',
  }).argv;

module.exports = {
  mongodb: {
    cnxStr: 'mongodb://localhost/ecommerce',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  fileSystem: {
    path: './DB',
  },
  args,
};
