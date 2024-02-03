import express from 'express';
import db from '../services/userService.js';
import bcrypt from 'bcrypt';

const routes = express.Router();
const saltRounds = 10;

routes.post('/create-user', async (req, res) => {
    const { name, email, password } = req.body;

    const userExists = await db.checkUserExist(email);
    if (userExists) return res.status(404).json({ message: "Já existe uma conta vinculada a esse email." });

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        await db.createUser(name, email, hashedPassword);

        res.status(200).send({ message: "Usuário criado com sucesso!" });
    } catch (err) {
        res.status(500).json({ error: "Não foi possível criar sua conta." });
    }
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

routes.put('/update-user/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, currentPassword } = req.body;

    if (!id || !name || !email || !password || !currentPassword) return res.status(400).json({ message: "Parâmetros inválidos" });

    try {
        const response = await db.validPassword(id, currentPassword);

        if (response) {
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            await db.updateUser(id, name, email, hashedPassword);
            res.status(200).json({ message: "Perfil do usuário atualizado com sucesso!" });
        } else {
            res.status(500).json({ message: "Senha incorreta!" });
        }
    } catch (err) {
        res.status(500).json({ error: "Não foi possível atualizar o perfil do usuário" });
    }
});

export default routes;