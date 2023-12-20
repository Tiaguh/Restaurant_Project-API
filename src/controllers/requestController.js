import express from "express";
import db from '../services/requestService.js';

const routes = express.Router();

routes.get("/get-all-requests", async (req, res) => {
    try {
        const requests = await db.getRequests();
        res.status(200).json({ message: "Pedidos recebidos com sucesso!", requests })
    } catch (error) {
        res.status(400).json({ message: "Não foi possível pegar os pedidos." });
    }
})

routes.post("/new-request/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        const userExists = await db.getUser(user_id);
        if (!userExists) return res.status(404).json({ message: "Usuário não encontrado" });

        await db.newRequest(user_id);
        res.status(200).json({ message: "Pedido realizado!" })

    } catch (err) {
        res.status(400).json({ message: "Não foi possível enviar o pedido" })
    }
})

routes.put("/finalize-request/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        const userExists = await db.getUser(user_id);
        if (!userExists) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }

        await db.finalizeRequest(user_id);
        res.status(200).json({ message: "Pedido finalizado com sucesso!" });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Não foi possível finalizar o pedido" });
    }
});

export default routes;