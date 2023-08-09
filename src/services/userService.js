import database from '../repository/connection.js';

async function createUser(name, email, password) {
  const sql = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)"
  const dados = [name, email, password];

  const conn = await database.connect();
  conn.query(sql, dados);
  conn.end();
}

async function getUser(id) {
  const sql = "SELECT name FROM User WHERE id = ?";
  const dados = [id];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dados);
  conn.end();

  return rows[0];
}


export default { createUser, getUser };