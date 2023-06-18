import * as DB from './db.js';

const get = async (akun_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            *
        FROM
            (
                SELECT
                    calon_id
                FROM
                    akun_calon
                WHERE
                    akun_id = ?
            ) AS idCalon INNER JOIN calon
                ON idCalon.calon_id = calon.calon_id;
    `;

    return new Promise((resolve, reject) => {
        conn.query(sql, [`${akun_id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getAllPemilihan = async (calon_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            pemilihan_id
        FROM
            calon
        WHERE
            calon_id=?
    `;

    return new Promise((resolve, reject) => {
        conn.query(sql, [`${calon_id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getInsight = async (calon_id, pemilihan_id, type) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            himp.${type} AS 'label', COUNT(himp.${type}) AS 'data'
        FROM
        (
            SELECT
            ${type}
            FROM
                suara
            WHERE
                calon_id=${calon_id}
        ) as himp
        GROUP BY himp.${type};
    `;


    return new Promise((resolve, reject) => {
        conn.query(sql, (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getNumberOfVoter = async (pemilihan_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            COUNT(pemilihan_id) AS 'num'
        FROM
            terdaftar
        WHERE
            pemilihan_id=?
    `;


    return new Promise((resolve, reject) => {
        conn.query(sql, [Number(pemilihan_id)], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getNumberOfAbstainVoter = async (calon_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
        COUNT(umur) AS 'num'
        FROM
            suara
        WHERE
            calon_id=? AND umur='NULL'
    `;


    return new Promise((resolve, reject) => {
        conn.query(sql, [calon_id], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getNumberOfVotedVoter = async (calon_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
        COUNT(umur) AS 'num'
        FROM
            suara
        WHERE
            calon_id=? AND umur!='NULL'
    `;


    return new Promise((resolve, reject) => {
        conn.query(sql, [calon_id], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

export {
    get,
    getAllPemilihan,
    getInsight,
    getNumberOfVoter,
    getNumberOfAbstainVoter,
    getNumberOfVotedVoter
};