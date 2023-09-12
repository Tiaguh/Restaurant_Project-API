import express from "express";
import db from '../services/requestService.js';

const routes = express.Router();

routes.get("/get-all-requests", async (req, res) => {
    try {
        const requests = await db.getRequests();
        res.status(200).json({message: "Pedidos recebidos com sucesso!", requests })
    } catch (error) {
        res.status(400).json({ message: "Não foi possível pegar os pedidos." });
    }
} )