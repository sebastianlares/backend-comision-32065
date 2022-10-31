const express = require('express');
const { Router } = express;
const controller = require('../controllers/register.js');

const registerRouter = new Router();

registerRouter.get('/', controller.getRegister);
registerRouter.post('/', controller.postRegister);

module.exports = registerRouter;
