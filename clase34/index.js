const app = require('./src/core/main.js');
const config = require('./src/config/config.js');
const { runAsCluster, runAsFork } = require('./src/core/helpers/index.js');
// Test

switch (config.args.MODE) {
  case 'FORK':
    runAsFork(config.args.PORT, app);
    break;
  case 'CLUSTER':
    runAsCluster(config.args.PORT, app);
    break;
  default:
    runAsFork(config.args.PORT, app);
    break;
}
