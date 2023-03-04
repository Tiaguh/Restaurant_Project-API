import database from '../repository/connection.js';

async function createItem(itemName, itemDescription, itemPrice) {
  const sql = "INSERT INTO Menu (item_name, item_description, item_price) VALUES (?, ?, ?)"
  const dados = [itemName, itemDescription, itemPrice];

  const conn = await database.connect();
  conn.query(sql, dados);
  conn.end();
}

async function getItems(){
  const sql = "SELECT * FROM Menu"

  const conn = await database.connect();
  const results = conn.query(sql)
  conn.end()

  return results
}

export default { createItem, getItems };