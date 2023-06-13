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
        });

        conn.release();
    });
}

const getPemiluUser = async (id) => {
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
        });

        conn.release();
    });
};

const getStatusUser = async (id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT
            pemilihan_id
        FROM
            status_memilih
        WHERE
            pemilih_id = ?
    `;

    return new Promise((resolve, reject) => {
        conn.query(sql, [`${id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
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
        });

        conn.release();
    });
};

const getProvinsiId = async (kota_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT 
            provinsi_id
        FROM 
            kota
        WHERE
            kota_id=?
    `;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${kota_id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getKotaId = async (desa_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT 
            kota_id
        FROM 
            desa
        WHERE
            desa_id=?
    `;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${desa_id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getCalonId = async (pasangan_calon, pemilihan_id) => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT 
            calon_id
        FROM 
            calon 
        WHERE
            pemilihan_id = ?
            AND no_urut LIKE '?%'
    `;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${pemilihan_id}`, Number(pasangan_calon)], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const getLatestSuaraId = async () => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT 
            suara_id 
        FROM 
            suara 
        ORDER BY 
            suara_id 
            DESC LIMIT 1;
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

const insertSuara = async (anonimized_data, provinsi_id) => {
    const conn = await DB.getConnection();
    const umur = anonimized_data[0];
    const pendidikan = anonimized_data[1];
    const sql = `
        INSERT INTO suara(umur, pendidikan, provinsi_id)
        VALUES (?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${umur}`, `${pendidikan}`, `${provinsi_id}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        });

        conn.release();
    });
};

const updateMemilih = async (pemilih_id, calon_id, suara_id) => {
    const conn = await DB.getConnection();
    const sql = `
        INSERT INTO memilih(pemilih_id, calon_id, suara_id)
        VALUES (?, ?, ?);
    `;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${Number(pemilih_id)}`, `${Number(calon_id)}`, `${Number(suara_id)}`], (error, res) => {
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
    getPemiluUser,
    getStatusUser,
    getCalonTerdaftar,
    insertSuara,
    getLatestSuaraId,
    updateMemilih,
    getCalonId,
    getProvinsiId,
    getKotaId
};