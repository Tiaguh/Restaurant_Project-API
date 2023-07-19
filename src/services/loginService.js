import database from '../repository/connection.js'

async function login(email, password) {
  const sql = "SELECT * FROM tbl_usuario WHERE email= ? AND senha= ?;"
  const dataLogin = [email, password]

  const conn = await database.connect();
  const [rows] = await conn.query(sql, dataLogin);
  conn.end()
  console.log(rows)
  return rows
}

async function checkEmail(email) {
  const sql = "SELECT * FROM tbl_usuario WHERE email = ?"

  const conn = await database.connect()
  const [rows] = await conn.query(sql, email)
  conn.end()
  return rows[0];
}

async function changePassword(email, newPassword) {
  const sql = "UPDATE tbl_usuario SET senha = ?  WHERE email = ?"
  const dataNewPass = [newPassword, email];

  const conn = await database.connect();
  await conn.query(sql, dataNewPass);
  conn.end();
}

export default { login, checkEmail, changePassword }