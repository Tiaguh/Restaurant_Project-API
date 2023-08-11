import database from '../repository/connection.js';

async function getUser(id) {
    const sql = "SELECT * FROM User WHERE id = ?";
    const data = [id];

    try {
        const conn = await database.connect();
        const [rows] = await conn.query(sql, data);
        conn.end();

        return rows.length > 0 ? rows[0] : null;
    } catch (error) {
        throw new Error(`Erro ao buscar o usuário: ${error.message}`);
    }
}

async function getItem(id) {
    const sql = "SELECT * FROM MenuItem WHERE item_id = ?";
    const data = [id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    return rows.length > 0 ? rows[0] : null;
}

async function checkItemInCart(user_id, item_id) {
    const sql = "SELECT * FROM Cart WHERE user_id = ? AND item_id = ?";
    const data = [user_id, item_id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    return rows.length > 0;
}

async function addItemCart(user_id, item_id) {
    const sql = "INSERT INTO Cart (user_id, item_id) VALUES (?, ?)";
    const data = [user_id, item_id];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

async function getCartItems(user_id) {
    const sql = "SELECT m.* FROM Cart c JOIN MenuItem m ON c.item_id = m.item_id WHERE c.user_id = ?";
    const data = [user_id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    return rows;
}

export default { getUser, addItemCart, checkItemInCart, getItem, getCartItems };
