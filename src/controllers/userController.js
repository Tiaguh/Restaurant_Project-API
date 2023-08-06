import express from 'express';
import db from '../services/userService.js';

const routes = express.Router();

routes.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: "Insira todos os dados" })

    await db.createUser(name, email, password);

    res.status(200).send({ message: "Usuário criado com sucesso!" });
});

export default routes;