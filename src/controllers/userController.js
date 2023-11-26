import express from 'express';
import db from '../services/userService.js';

const routes = express.Router();

routes.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) return res.status(400).json({ message: "Insira todos os dados" })

    await db.createUser(name, email, password);

    res.status(200).send({ message: "Usuário criado com sucesso!" });
});

routes.get('/get-user/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: "Não foi possível identificar o usuário" });

    try {
        const user = await db.getUser(id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: "Não foi possível encontrar o usuário" });
    }
});

routes.post('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, address } = req.body;

    if (!id || (!name && !email && !password && !address)) {
        return res.status(400).json({ message: "Parâmetros inválidos" });
    }

    try {
        await db.updateUser(id, { name, email, password, address });

        res.status(200).json({ message: "Perfil do usuário atualizado com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Não foi possível atualizar o perfil do usuário" });
    }
});

export default routes;