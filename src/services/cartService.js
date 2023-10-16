import database from '../repository/connection.js';

// Verifica se o ID do informado existe na tabela User.
async function getUser(user_id) {
    const sql = "SELECT * FROM User WHERE id = ?";
    const data = [user_id];

    try {
        const conn = await database.connect();
        const [rows] = await conn.query(sql, data);
        conn.end();

        // Retorna o primeiro resultado encontrado caso o usuário existe, ou null se nenhum resultado for encontrado.

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error(`Erro ao buscar o usuário: ${error.message}`);
    }
}

// Verifica se o ID informado corresponde a algum item na tabela Menu.

async function getItem(item_id) {
    const sql = "SELECT * FROM Menu WHERE id = ?";
    const data = [item_id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    // Retorna o primeiro resultado encontrado caso o item exista, ou null se nenhum resultado for encontrado.
    return rows.length > 0 ? rows[0] : null;
}

// Verifica se o item já está no carrinho do usuário.
async function checkItemInCart(user_id, item_id) {
    const sql = "SELECT * FROM Cart WHERE user_id = ? AND item_id = ?";
    const data = [user_id, item_id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    return rows.length > 0;
}

// Adiciona um item ao carrinho de um usuário.
async function addItemCart(user_id, item_id) {
    const sql = "INSERT INTO Cart (user_id, item_id) VALUES (?, ?)";
    const data = [user_id, item_id];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

// Obtém todos os itens no carrinho de um usuário, incluindo a quantidade de cada item.
async function getCartItems(user_id) {
    const sql = `
    SELECT
        M.id,
        M.description,
        M.name,
        M.price,
        C.quantity
    FROM
        Cart AS C
    JOIN
        Menu AS M ON C.item_id = M.id
    WHERE
        C.user_id = ?;  
    `;

    const data = [user_id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    return rows;
}

// Remove um item do carrinho de um usuário.
async function removeItemFromCart(user_id, item_id) {
    const sql = "DELETE FROM Cart WHERE user_id = ? AND item_id = ?";
    const data = [user_id, item_id];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

// Aumenta a quantidade de um item no carrinho de um usuário.
async function increaseCartItem(user_id, item_id) {
    const sql = "UPDATE Cart SET quantity = quantity + 1 WHERE user_id = ? AND item_id = ?;"
    const data = [user_id, item_id];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

// Diminui a quantidade de um item no carrinho de um usuário.
async function decreaseCartItem(user_id, item_id) {
    const sql = "UPDATE Cart SET quantity = quantity - 1 WHERE user_id = ? AND item_id = ?;"
    const data = [user_id, item_id];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

async function clearCart(user_id) {
    const sql = "DELETE FROM Cart WHERE user_id = ?"
    const data = [user_id];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

export default {
    getUser, getItem, addItemCart, checkItemInCart, getCartItems, removeItemFromCart, increaseCartItem, decreaseCartItem, clearCart
};
