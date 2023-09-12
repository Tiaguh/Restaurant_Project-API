import database from '../repository/connection.js';

async function getRequests(){
    const sql = "SELECT * FROM Requests";

    const conn = await database.connect();
    const [rows] = conn.query(sql)

    conn.end();

    // Retorna o primeiro resultado encontrado caso o item exista, ou null se nenhum resultado for encontrado.
    return rows.length > 0 ? rows[0] : null;
}

export default { getRequests };