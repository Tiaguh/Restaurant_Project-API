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

async function getAllRequests() {
    const sql = `
    SELECT
        R.id_request,
        R.user_id,
        U.name AS user_name,
        R.status,
        GROUP_CONCAT(CONCAT(Menu.name, ' (', It.quantity, ')') SEPARATOR ', ') AS items
    FROM
        Requests AS R
    JOIN 
        ItemRequests AS It ON R.id_request = It.id_request
    JOIN
        Menu ON It.item_id = Menu.id
    JOIN
        User AS U ON R.user_id = U.id
    WHERE
        R.status = 'Pendente'
    GROUP BY
        R.id_request, R.user_id, R.status;
`;

    // COALESCE é uma função que concatena valores da coluna, nesse caso o nome do item com a quantidade.

    const conn = await database.connect();
    const [rows] = await conn.query(sql)

    conn.end();

    return rows;
}

async function finalizeRequest(user_id) {
    const sql = `
        UPDATE Requests 
        SET STATUS = 'FINALIZADO'
        WHERE user_id = ? AND STATUS = 'Pendente';
    `;

    const data = [user_id];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

export default { getUser, newRequest, getAllRequests, finalizeRequest };

