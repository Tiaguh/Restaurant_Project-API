import express from 'express';
import db from '../services/itemServices.js';
import { storage } from '../firebaseConfig.js';

const routes = express.Router();

import multer from 'multer';
const upload = multer({ storage: multer.memoryStorage() });

routes.post('/add-item', upload.single('itemImage'), async (req, res) => {
  const { itemName, itemDescription, itemPrice } = req.body;

  if (!itemName || !itemDescription || !itemPrice) {
    res.status(400).json({ message: "Insira todos os dados" });
    return;
  }

  const imageBuffer = req.file ? req.file.buffer : null;
  if (!imageBuffer) {
    res.status(400).json({ message: "Arquivo de imagem não encontrado" });
    return;
  }

  try {
    const imageRef = storage.ref().child(`images/${req.file.originalname}`);
    await imageRef.put(imageBuffer);

    const imageUrl = await imageRef.getDownloadURL();

    await db.createItem(itemName, itemDescription, itemPrice, imageUrl);

    res.status(200).send({ message: "Adicionado com sucesso!", imageUrl });
  } catch (err) {
    console.error('Erro ao adicionar o item:', err);
    res.status(500).json({ error: "Erro ao adicionar o item." });
  }
});

routes.post('/update-item/:id', async (req, res) => {
  const itemId = req.params.id

  const { itemName, itemDescription, itemPrice } = req.body;

  if (!itemName || !itemDescription || !itemPrice) res.status(400).json({ message: "Insira todos os dados" })

  try {
    await db.updateItem(itemName, itemDescription, itemPrice, itemId);
    res.status(200).send({ message: "Item atualizado com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao atualizar o item." });
  }

})

routes.get('/get-items', async (req, res) => {
  try {
    let result = await db.getItems();
    res.status(200).json(result[0]);
  } catch (err) {
    res.status(500).json({ error: "Erro ao obter os itens." });
  }
})

routes.delete('/delete-item/:id', async (req, res) => {
  const itemId = req.params.id

  try {
    await db.deleteItem(itemId);
    res.status(200).send({ message: "Excluído com sucesso!" });
  } catch (err) {
    res.status(500).json({ error: "Erro ao excluir o item." });
  }

})


export default routes;