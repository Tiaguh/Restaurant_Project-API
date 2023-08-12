import express from 'express';
import db from '../services/cartService.js';

const routes = express.Router();

routes.post("/add-item-cart/:user_id/:item_id", async (req, res) => {
    const { user_id, item_id } = req.params;

    if (!user_id || !item_id) {
        return res.status(400).json({ message: "Não foi possível enviar o item para o carrinho" });
    }

    try {
        // Verifica se o usuário e o item existem antes de adicionar ao carrinho.
        const userExists = await db.getUser(user_id);
        const itemExists = await db.getItem(item_id);

        if (!userExists || !itemExists) {
            return res.status(404).json({ message: "Usuário ou item não encontrado" });
        }

        // Verificar se o item já está no carrinho do usuário

        const itemInCart = await db.checkItemInCart(user_id, item_id);

        if (itemInCart) {
            return res.status(409).json({ message: "O item já está no carrinho" });
        } else {
            await db.addItemCart(user_id, item_id);
            return res.status(200).json({ message: "Adicionado ao carrinho com sucesso!" });
        }

    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar ao carrinho", error: error.message });
    }
});

routes.get("/get-items-cart/:user_id", async (req, res) => {
    const { user_id } = req.params;

    if (!user_id) {
        return res.status(400).json({ message: "Não foi possível encontrar o seu carrinho" });
    }

    try {
        const cartItems = await db.getCartItems(user_id);
        res.status(200).send({ message: "Carrinho encontrado com sucesso!", cartItems });
    } catch (error) {
        res.status(400).json({ message: "Carrinho não encontrado" });
    }    
});

routes.delete("/remove-from-cart/:user_id/:item_id", async (req, res) => {
    const { user_id, item_id } = req.params;

    try {
        const itemInCart = await db.checkItemInCart(user_id, item_id);

        if (itemInCart) {
            // Remover o item do carrinho
            await db.removeItemFromCart(user_id, item_id);
            res.status(200).json({ message: "Item removido do carrinho com sucesso!" });
        } else {
            res.status(404).json({ message: "Item não encontrado no carrinho do usuário" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover item do carrinho", error: error.message });
    }
});


export default routes;