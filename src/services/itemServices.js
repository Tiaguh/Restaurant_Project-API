import database from '../repository/connection.js';

async function createItem(itemName, itemDescription, itemPrice) {
  try {
    const sql = "INSERT INTO MenuItem (item_name, item_description, item_price) VALUES (?, ?, ?)";
    const dados = [itemName, itemDescription, itemPrice];

    const conn = await database.connect();
    await conn.query(sql, dados);
    conn.end();
  } catch (err) {
    throw err;
  }
}

async function updateItem(itemName, itemDescription, itemPrice, itemId) {
  try {
    const sql = "UPDATE MenuItem SET `item_name` = ?, `item_description` = ?, `item_price` = ? WHERE item_id = ?";
    const dados = [itemName, itemDescription, itemPrice, itemId];

    const conn = await database.connect();
    await conn.query(sql, dados);
    conn.end();
  } catch (err) {
    throw err;
  }
}

async function getItems() {
  try {
    const sql = "SELECT * FROM MenuItem";

    const conn = await database.connect();
    const results = await conn.query(sql);
    conn.end();

    return results;
  } catch (err) {
    throw err;
  }
}

async function deleteItem(itemId) {
  try {
    const sql = "DELETE FROM MenuItem WHERE item_id = ?";
    const dados = [itemId];

    const conn = await database.connect();
    await conn.query(sql, dados);
    conn.end();
  } catch (err) {
    throw err;
  }
}

export default { createItem, getItems, updateItem, deleteItem };