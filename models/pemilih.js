import * as DB from './db.js';

const get = async (akun_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            *
        FROM
            (
                SELECT
                    pemilih_id
                FROM
                    akun_pemilih
                WHERE
                    akun_id = ?
            ) AS idPemilih INNER JOIN pemilih
                ON idPemilih.pemilih_id = pemilih.pemilih_id;
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

export {
    get
};