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
};
