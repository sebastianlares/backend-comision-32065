const yargs = require('yargs/yargs')(process.argv.slice(2));

const args = yargs
  .default({
    PORT: 8080,
  })
  .alias({
    p: 'PORT',
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
