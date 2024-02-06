import express from 'express';
import db from '../services/loginService.js';
import cookieParser from 'cookie-parser';

const routes = express.Router();

routes.use(cookieParser());

// ADMIN

//LOGIN ADMIN

routes.post('/admin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) res.status(400).json({ message: "Insira todos os dados" });

  try {
    const users = await db.LoginAdmin(email, password);

    if (users.length > 0) {
      const user = users[0];
      const userId = user.id_usuario;

      res.cookie('userId', userId, { httpOnly: true, maxAge: 3600000 }); // O cookie expira em 1 hora (3600000 milissegundos)

      res.status(200).json({ message: 'Login bem-sucedido' });
    } else {
      res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
  } catch (error) {
    res.status(500).json({ message: `Erro no login. Tente novamente. ${error}` });
  }
});

// CLIENT

// LOGIN CLIENT

routes.post('/client', async (req, res) => {
  const { email, password } = req.body;

  try {
    const users = await db.LoginClient(email, password);

    if (users.length > 0) {
      const user = users[0];
      const userId = user.id;

      res.cookie('userId', userId, { httpOnly: true, maxAge: 3600000 });

      res.status(200).json({ message: 'Login bem-sucedido', id: userId });
    } else {
      res.status(401).json({ message: 'Email ou senha incorretos.' });
    }
  } catch (error) {
    res.status(500).json({ message: `Erro no login. Tente novamente. ${error}` });
  }
});

export default routes;