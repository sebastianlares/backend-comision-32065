// Define root dir
global.__basedir = __dirname;
const app = require('./src/core/main.js');
const config = require('./src/config/config.js');
const { runAsCluster, runAsFork } = require('./src/core/helpers/index.js');
console.log(__dirname);

switch (config.args.MODE) {
  case 'FORK':
    runAsFork(process.env.PORT || 8090, app);
    break;
  case 'CLUSTER':
    runAsCluster(process.env.PORT || 8090, app);
    break;
  default:
    runAsFork(process.env.PORT || 8090, app);
    break;
}
