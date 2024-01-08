import database from '../repository/connection.js'

async function getUser(user_id) {
    const sql = "SELECT * FROM User WHERE id = ?";
    const data = [user_id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    // Retorna o primeiro resultado encontrado caso o usuário existe, ou null se nenhum resultado for encontrado.

    return rows[0];
}

async function newRequest(user_id) {
    const conn = await database.connect();

    const Insert_Request = `
        INSERT INTO Requests 
            (user_id, status)
        VALUES 
            (?, 'Pendente')
        ;
    `;
    const data = [user_id];

    const [Insert_Request_Result] = await conn.query(Insert_Request, data);
    const request_id = Insert_Request_Result.insertId;

    console.log(Insert_Request_Result.insertId);

    const Insert_Item_Request = `
        INSERT INTO 
            ItemRequests (id_request, item_id, quantity)
        SELECT ?, 
            c.item_id, c.quantity
        FROM 
            Cart c
        WHERE c.user_id = ?;
    `;
    const Insert_Data = [request_id, user_id];

    await conn.query(Insert_Item_Request, Insert_Data);
    conn.end();
}

async function getUserRequests(user_id) {
    const sql = `
        SELECT
            R.id_request,
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
            R.user_id = ?
        GROUP BY
            R.id_request, R.user_id, R.status;    
    `
    const data = [user_id];

    const conn = await database.connect();
    const [rows] = await conn.query(sql, data);
    conn.end();

    return rows;
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

async function finalizeRequest(id_request) {
    const sql = `
        UPDATE Requests 
        SET STATUS = 'FINALIZADO'
        WHERE id_request = ? AND STATUS = 'Pendente';
    `;

    const data = [id_request];

    const conn = await database.connect();
    await conn.query(sql, data);
    conn.end();
}

export default { getUser, newRequest, getAllRequests, getUserRequests, finalizeRequest };