import database from '../repository/connection.js';

async function createUser(name, email, password) {
  const sql = "INSERT INTO User (name, email, password) VALUES (?, ?, ?)"
  const dados = [name, email, password];

  const conn = await database.connect();
  conn.query(sql, dados);
  conn.end();
}

export default { createUser };