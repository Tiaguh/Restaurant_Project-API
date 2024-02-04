import database from '../repository/connection.js';
import bcrypt from 'bcrypt';

async function LoginAdmin(email, password) {
  const sql = "SELECT * FROM Admin WHERE email = ? AND password = ?;";
  const data = [email, password];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, data);

  conn.end();

  return rows;
}

async function LoginClient(email, password) {
  const sql = "SELECT * FROM User WHERE email = ?;";
  const data = [email];

  const conn = await database.connect();
  const [rows] = await conn.query(sql, data);

  conn.end();

  if (rows.length > 0) {
    const user = rows[0];
    const hashedPassword = user.password;

    const isPlainTextPassword = !/^\$2[aby]\$[0-9]+\$/.test(hashedPassword);

    let passwordMatch;

    if (isPlainTextPassword) {
      passwordMatch = await bcrypt.compare(password, hashedPassword);
    } else {
      passwordMatch = await bcrypt.compare(password, hashedPassword);
    }

    if (passwordMatch) {
      return [user];
    }
  }

  return [];
}

export default { LoginAdmin, LoginClient };
