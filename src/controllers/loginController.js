import express from 'express';
import db from '../services/loginServices.js';

import { generatePassword } from '../helpers/loginActions.js';
import { generatedToken } from '../helpers/loginActions.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;


  if (!email || !password) res.status(400).json({ message: "Insira todos os dados" })

  try {

    const users = await db.login(email, password);

    if (users.length > 0) {
      const id_user = users[0].id_usuario;
      const name_user = users[0].nome;
      const email_user = users[0].email;
      const type_user = users[0].tipo_usuario;

      const token = generatedToken(id_user, name_user, email_user, type_user);
      res.status(200).send({ message: 'Login efetuado com sucesso', token });
    } else {
      res.status(401).send({ message: 'Login incorreto' });
    }
  } catch (error) {
    res.status(500).send({ message: `Houve um erro no banco de dados. ${error}` })
  }
});

router.post('/reset', async (req, res) => {

  const { email } = req.body;

  try {
    const user = email.db.checkEmail(email);

    if (user.length > 0) {
      const newPassword = generatePassword();
      await db.changePassword(email, newPassword);
      res.status(200).send({ message: `Nova senha ${newPassword}` });
    } else {
      res.status(404).send({ message: `Usuário não encontrado` });
    }
  } catch (error) {
    res.status(500).send({ message: `Houve um erro no banco de dados. ${error}` })
  }

})

export default router;