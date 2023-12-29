import database from '../repository/connection.js';

async function createItem(itemName, itemDescription, itemPrice, imageUrl) {
  const sql = "INSERT INTO Menu (name, description, price, image_url) VALUES (?, ?, ?, ?)";
  const dados = [itemName, itemDescription, itemPrice, imageUrl];

  const conn = await database.connect();
  await conn.query(sql, dados);
  conn.end();
}

async function updateItem(itemName, itemDescription, itemPrice, itemId) {
  const sql = "UPDATE Menu SET `name` = ?, `description` = ?, `price` = ? WHERE item_id = ?";
  const dados = [itemName, itemDescription, itemPrice, itemId];

  const conn = await database.connect();
  await conn.query(sql, dados);
  conn.end();
}

async function getItems() {
  const sql = "SELECT * FROM Menu";

  const conn = await database.connect();
  const results = await conn.query(sql);
  conn.end();

  return results;
}

async function deleteItem(itemId) {
  const conn = await database.connect();

  await conn.query("DELETE FROM ItemRequests WHERE item_id = ?", [itemId]);
  await conn.query("DELETE FROM Menu WHERE id = ?", [itemId]);

  conn.end();
}

export default { createItem, getItems, updateItem, deleteItem };
