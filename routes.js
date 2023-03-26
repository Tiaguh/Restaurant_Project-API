import express from "express";
import managementItem from './controllers/menuController.js'

const route = express();

route.use('/management-item', managementItem)

export default route;