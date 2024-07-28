import database from '../repository/connection.js';

async function createItem(itemName, itemDescription, itemPrice, imageUrl) {
  const sql = "INSERT INTO Menu (name, description, price, image_url) VALUES (?, ?, ?, ?)";
  const data = [itemName, itemDescription, itemPrice, imageUrl];

  const conn = await database.connect();
  await conn.query(sql, data);
  conn.end();
}

async function updateItem(itemName, itemDescription, itemPrice, itemId) {
  const sql = "UPDATE Menu SET `name` = ?, `description` = ?, `price` = ? WHERE id = ?";
  const data = [itemName, itemDescription, itemPrice, itemId];

  const conn = await database.connect();
  await conn.query(sql, data);
  conn.end();
}

async function getItems() {
  const sql = "SELECT * FROM Menu";

  const conn = await database.connect();
  const results = await conn.query(sql);
  conn.end();

  return results;
}

async function getItem(itemId) {
  const sql = "SELECT * FROM Menu WHERE id = ?";
  const data = [itemId]

  const conn = await database.connect();
  const results = await conn.query(sql, data);
  conn.end();

  return results[0];
}

async function deleteItem(itemId) {
  const conn = await database.connect();

  try {
    await conn.beginTransaction();
    
    await conn.query("DELETE FROM cart WHERE item_id = ?", [itemId]);
    await conn.query("DELETE FROM ItemRequests WHERE item_id = ?", [itemId]);
    await conn.query("DELETE FROM Menu WHERE id = ?", [itemId]);

    await conn.commit();

    conn.end();
  } catch (err) {
    await conn.rollback();
    console.error('Erro ao deletar item do banco de dados:', err);
    throw err;
  }
}
export default { createItem, getItems, getItem, updateItem, deleteItem };
