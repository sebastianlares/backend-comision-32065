const faker = require('faker');
const bCrypt = require('bcrypt');
const numCpus = require('os').cpus().length;
const os = require('os');
const cluster = require('cluster');

const generateRandomProduct = () => {
  return {
    title: faker.name.findName(),
    price: faker.finance.amount(20, 500, 2, '$'),
    thumbnail: faker.image.avatar(),
  };
};

const getRandomProducts = amount => {
  const products = [];
  let incrementor = 0;
  while (incrementor < amount) {
    const product = generateRandomProduct();
    products.push(product);
    incrementor++;
  }
  return products;
};

const getFormatedDate = () => {
  const date = new Date().toLocaleDateString([], {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return date;
};

const getProcessInfo = () => {
  console.log(os.cpus().length);
  return {
    argvs: process.argv,
    so: process.platform,
    nodeV: process.version,
    memoryUsage: process.memoryUsage().rss,
    id: process.pid,
    cwd: process.cwd(),
    path: process.title,
    processors: os.cpus().length,
  };
};

const runAsFork = (port, app) => {
  const connectedServer = app.listen(port, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}  PID ${process.pid}`);
  });
  connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
  console.log(`Worker ${process.pid} started`);
};

const runAsCluster = (port, app) => {
  console.log(`Primary ${process.pid} is running`);
  if (cluster.isMaster) {
    for (let i = 0; i < numCpus; i++) {
      cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
      console.log(`Work ${worker.process.pid} died`);
      cluster.fork();
    });
  } else {
    const connectedServer = app.listen(port, () => {
      console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}  PID ${process.pid}`);
    });
    connectedServer.on('error', error => console.log(`Error en servidor ${error}`));
    console.log(`Worker ${process.pid} started`);
  }
};

const createHash = password => bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);

const isValidPassword = (user, password) => bCrypt.compareSync(password, user.password);

module.exports = { getRandomProducts, getFormatedDate, createHash, isValidPassword, getProcessInfo, runAsCluster, runAsFork };
