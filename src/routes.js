import express from "express";

import items from './controllers/itemController.js';
import login from './controllers/loginController.js';
import user from './controllers/userController.js';
import cart from './controllers/cartController.js'

const route = express();

route.use('/management-item', items)
route.use('/login', login)
route.use('/user', user)
route.use('/cart', cart)

export default route;