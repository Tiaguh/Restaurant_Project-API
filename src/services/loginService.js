import database from '../repository/connection.js';

async function Login(email, password) {
  const sql = "SELECT * FROM Admin WHERE email = ?;";
  const data = [email, password];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, data);
  
  conn.end();
  
  return rows;
}

export default { Login }