import database from '../repository/connection.js'

async function getUser(user_id) {
    const sql = "SELECT * FROM User WHERE id = ?";
    const data = [user_id];

    try {
        const conn = await database.connect();
        const [rows] = await conn.query(sql, data);
        conn.end();

        // Retorna o primeiro resultado encontrado caso o usuário existe, ou null se nenhum resultado for encontrado.

        return rows[0];
    } catch (error) {
        throw new Error(`Erro ao buscar o usuário: ${error.message}`);
    }
}

async function newRequest(user_id) {
    const sql = `
        INSERT INTO 
            Requests 
                (item_id, user_id, quantity)
        SELECT 
            item_id, 
            user_id,
            quantity
        FROM 
            Cart 
        WHERE 
            user_id = ?
        ;
    `
    const data = [user_id]

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

async function getRequests() {
    const sql = `
        SELECT
            R.id,
            M.id AS item_id,
            R.date, 
            R.hour,
            M.name, 
            M.description, 
            C.quantity,
            U.name
        FROM 
            Requests AS R
        JOIN 
            Menu AS M 
        ON 
            R.item_id = M.id
        JOIN 
            User AS U 
        ON 
            R.user_id = U.id
        LEFT JOIN 
            Cart AS C 
        ON 
            R.user_id = C.user_id 
        AND 
            R.item_id = C.item_id
        GROUP BY 
            item_id
        ORDER BY 
            R.id
    `;

    const conn = await database.connect();
    const [rows] = await conn.query(sql)

    conn.end();

    return rows;
}

export default { getUser, newRequest, getRequests };