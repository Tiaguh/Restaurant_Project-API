import express from "express";

import managementItem from './controllers/itemController.js'

const route = express();

route.use('/management-item', managementItem)

export default route;