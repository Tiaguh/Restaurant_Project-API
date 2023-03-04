import express from 'express';
import db from '../services/userServices.js';

const routes = express.Router();

routes.post('/add-item', async (req, res) => {
  const { itemName, itemDescription, itemPrice } = req.body;

  if (!itemName || !itemDescription || !itemPrice) res.status(400).json({ message: "Insira todos os dados" })

  try {

    await db.createItem(itemName, itemDescription, itemPrice);

    res.status(200).send({ message: "Salvo com sucesso!" });
  } catch (err) {
    res.status(200).send(err);
  }

});

routes.get('/get-items', async (req, res) => {
  let result = await db.getItems()

  res.status(200).json(result[0]);
})

export default routes;