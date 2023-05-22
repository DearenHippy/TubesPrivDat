import * as DB from './db.js'

const get = async (akun_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            *
        FROM
            akun
        WHERE
            akun_id = ?
    `;

    return new Promise((resolve, reject) => {
        conn.query(sql, [`${akun_id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

const getAdminPemilu = async() => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            *
        FROM
            pemilihan
    `;
    return new Promise((resolve, reject) => {
        conn.query(sql, (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

export {
    get,
    getAdminPemilu
};