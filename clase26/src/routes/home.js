const express = require('express');
const { Router } = express;
const auth = require('../middlewares/index.js');
const controller = require('../controllers/auth.js');

const homeRouter = new Router();

homeRouter.get('/', auth, controller.home);
// homeRouter.get('/login', auth, controller.login);
// homeRouter.post('/login', auth, controller.postLogin);

homeRouter.get('/logout', controller.logout);

module.exports = homeRouter;
