const express = require('express');
const { Router } = express;
const auth = require('../middlewares/index.js');
const controller = require('../controllers/api.js');

const apiRouter = new Router();

apiRouter.get('/productos-test', auth, controller.getRandomProducts);
apiRouter.get('/random', auth, controller.getRandomNumbers);

module.exports = apiRouter;
