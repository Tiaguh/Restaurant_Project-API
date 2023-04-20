import express from 'express';
import db from '../services/itemServices.js';

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

routes.post('/update-item/:id', async (req, res) => {
  const itemId = req.params.id

  const { itemName, itemDescription, itemPrice } = req.body;

  if (!itemName || !itemDescription || !itemPrice) res.status(400).json({ message: "Insira todos os dados" })

  try {
    await db.updateItem(itemName, itemDescription, itemPrice, itemId);

    res.status(200).send({ message: "Atualizado com sucesso!" });
  } catch (err) {
    res.status(200).send(err);
  }
})

routes.get('/get-items', async (req, res) => {
  let result = await db.getItems()

  res.status(200).json(result[0]);
})

routes.delete('/delete-item/:id', async (req, res) => {
  const itemId = req.params.id

  if (!itemId) res.status(400).json({message: "Não foi possível apagar"})

  try {
    await db.deleteItem(itemId);

    res.status(200).send({ message: "Excluído com sucesso!" });
  } catch (err) {
    res.status(200).send(err);
  }
})


export default routes;