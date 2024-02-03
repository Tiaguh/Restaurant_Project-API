import database from '../repository/connection.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

async function createUser(name, email, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)";
  const data = [name, email, hashedPassword];

  const conn = await database.connect();
  await conn.query(sql, data);
  conn.end();
}

async function checkUserExist(email) {
  const sql = "SELECT * FROM User WHERE email = ?";
  const data = [email];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, data);
  conn.end();

  return rows.length > 0;
}

async function getUser(id) {
  const sql = "SELECT * FROM User WHERE id = ?";
  const data = [id];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, data);
  conn.end();

  return rows[0];
}

async function validPassword(id, currentPassword) {
  const sql = "SELECT * FROM User WHERE id = ?";
  const data = [id];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, data);
  conn.end();

  if (rows.length > 0) {
    const hashedPassword = rows[0].password;
    return await bcrypt.compare(currentPassword, hashedPassword);
  }

  return false;
}

async function updateUser(id, name, email, password) {
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const sql = `UPDATE User SET name = ?, email = ?, password = ? WHERE id = ?`;
  const data = [name, email, hashedPassword, id];

  const conn = await database.connect();
  await conn.query(sql, data);
  conn.end();
}

export default { createUser, checkUserExist, getUser, validPassword, updateUser };
