import database from '../repository/connection.js';

async function getReport() {
    const sql = `
        SELECT
            SUM(m.price * it.quantity) AS sales,
            SUM(ir.quantity) AS sold
        FROM
            Menu AS m
        JOIN
            ItemRequests AS it ON it.item_id = m.id
        JOIN
            ItemRequests AS ir ON ir.item_id = m.id;
    `;

    const conn = await database.connect();
    const [results] = await conn.query(sql);
    conn.end();

    const { sales, sold } = results[0];
    return { sales, sold };
}

export default { getReport };
