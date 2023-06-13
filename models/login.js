import * as DB from './db.js';

const get = async (username, password) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            akun_id, username, role
        FROM
            akun
        WHERE
            username = ? AND
            password = ?
    `;

    return new Promise((resolve, reject) => {
        conn.query(sql, [`${username}`, `${password}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
}

export {
    get
};