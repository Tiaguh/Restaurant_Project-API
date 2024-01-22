import database from '../repository/connection.js';

async function createUser(name, email, password) {
  const sql = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)"
  const dados = [name, email, password];

  const conn = await database.connect();
  conn.query(sql, dados);
  conn.end();
}

async function checkUserExist(email) {
  const sql = "SELECT * FROM User WHERE email = ?";
  const dados = [email];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dados);
  conn.end();

  return rows.length > 0;
}

async function getUser(id) {
  const sql = "SELECT * FROM User WHERE id = ?";
  const dados = [id];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dados);
  conn.end();

  return rows[0];
}

async function validPassword(id, password) {
  const sql = "SELECT * FROM User WHERE id = ? AND password = ?";
  const dados = [id, password];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dados);
  conn.end();

  return rows.length > 0;
}

async function updateUser(id, name, email, password) {
  const sql = `UPDATE User SET name = ?, email = ?, password = ? WHERE id = ?`;
  const data = [name, email, password, id];

  const conn = await database.connect();
  await conn.query(sql, data);
  conn.end();
}

export default { createUser, checkUserExist, getUser, validPassword, updateUser };