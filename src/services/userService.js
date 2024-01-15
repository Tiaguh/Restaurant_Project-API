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

async function updateUser(id, updatedFields) {
  const fieldsToUpdate = ['name', 'email', 'password', 'address'];

  const updates = fieldsToUpdate
      .filter(field => updatedFields[field] !== undefined)
      .map(field => `${field} = ?`);

  if (!updates.length) {
      throw new Error("Nenhum campo válido para atualizar");
  }

  const sql = `UPDATE User SET ${updates.join(', ')} WHERE id = ?`;
  const data = fieldsToUpdate.map(field => updatedFields[field]);
  data.push(id);

  const conn = await database.connect();

  try {
      await conn.query(sql, data);
  } finally {
      conn.end();
  }
}
export default { createUser, checkUserExist, getUser, updateUser };