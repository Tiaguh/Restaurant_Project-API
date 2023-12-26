import express from "express";
import db from '../services/reportService.js';

const routes = express.Router();

routes.get("/get-reports", async (req, res) => {
    try {
        const reports = await db.getReport();
        res.status(200).json({ message: "Relatório recebido com sucesso!", reports })
    } catch (error) {
        res.status(400).json({ message: "Não foi possível receber o relatório." });
    }
})

export default routes;