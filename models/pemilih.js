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

const getPemilu = async (id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            *
        FROM
            (
                SELECT
                    pemilihan_id
                FROM
                    terdaftar
                WHERE
                    pemilih_id = ?
            ) AS idPemilihan INNER JOIN pemilihan
                ON idPemilihan.pemilihan_id = pemilihan.pemilihan_id
    `;

    return new Promise((resolve, reject) => {
        conn.query(sql, [`${id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
};

const getCalonTerdaftar = async (id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            *
        FROM
            calon
        WHERE
            pemilihan_id = ?
    `;

    return new Promise((resolve, reject) => {
        conn.query(sql, [`${id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
};

export {
    get,
    getPemilu,
    getCalonTerdaftar
};