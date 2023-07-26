import express from "express";

import items from './controllers/itemController.js';
import login from './controllers/loginController.js';

const route = express();

route.use('/management-item', items)
route.use('/login', login)

export default route;