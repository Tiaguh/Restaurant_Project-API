import express from 'express';
import db from '../services/cartService.js';

const routes = express.Router();

// Rota para adicionar um item ao carrinho.

routes.post("/add-item-cart/:user_id/:item_id", async (req, res) => {
    const { user_id, item_id } = req.params;

    try {
        //Verficando se o usuário e o item existem.

        const userExists = await db.getUser(user_id);
        if (!userExists) return res.status(404).json({ message: "Usuário não encontrado" });

        const itemExists = await db.getItem(item_id);
        if (!itemExists) return res.status(404).json({ message: "Item não encontrado" });

        const itemInCart = await db.checkItemInCart(user_id, item_id);

        // Verificando se o item já está no carrinho.
        // Se o item já estiver no carrinho ele não é adicionado novamente.
        if (itemInCart === true) {
            return res.status(409).json({ message: "O item já está no carrinho" });
        } else {
            // Se o item não estiver no carrinho ele é adicionado.
            await db.addItemCart(user_id, item_id);
            return res.status(200).json({ message: "Adicionado ao carrinho com sucesso!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao adicionar o item ao carrinho" });
    }
});

// Rota para obter os itens do carrinho de um usuário.
routes.get("/get-items-cart/:user_id", async (req, res) => {
    const { user_id } = req.params;

    try {
        //Verficando se o usuário existe.

        const userExists = await db.getUser(user_id);
        if (!userExists) return res.status(404).json({ message: "Usuário não encontrado" });

        // Obtendo os itens do carrinho.
        const cartItems = await db.getCartItems(user_id);
        res.status(200).send({ message: "Carrinho encontrado com sucesso!", cartItems });
    } catch (error) {
        res.status(400).json({ message: "Carrinho não encontrado" });
    }
});

// Rota para remover um item do carrinho
routes.delete("/remove-from-cart/:user_id/:item_id", async (req, res) => {
    const { user_id, item_id } = req.params;

    try {
        //Verficando se o usuário e o item existem.

        const userExists = await db.getUser(user_id);
        if (!userExists) return res.status(404).json({ message: "Usuário não encontrado" });

        const itemExists = await db.getItem(item_id);
        if (!itemExists) return res.status(404).json({ message: "Item não encontrado" });

        // Verificando se o item está no carrinho.
        const itemInCart = await db.checkItemInCart(user_id, item_id);

        if (itemInCart === true) {
            // Removendo o item do carrinho.
            await db.removeItemFromCart(user_id, item_id);
            res.status(200).json({ message: "Item removido do carrinho com sucesso!" });
        } else {
            res.status(404).json({ message: "Item não encontrado no carrinho do usuário" });
        }
    } catch (error) {
        res.status(500).json({ message: "Erro ao remover item do carrinho", error: error.message });
    }
});

// routes.post("/finish-purchase/:user_id", async (req, res) => {
//     const { user_id } = req.params;

//     try {
//         //Verficando se o usuário e o item existem.

//         const userExists = await db.getUser(user_id);
//         if (!userExists) return res.status(404).json({ message: "Usuário não encontrado" });
//     } catch (error) {
//         res.status(500).json({ message: "Erro ao finalizar a compra" });
//     }

// })

export default routes;