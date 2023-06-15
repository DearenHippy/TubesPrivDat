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

const getAdminCalon = async() => {
    const conn = await DB.getConnection();
    const sql = `SELECT calon.calon_id,calon.nama,pemilihan.nama as 'nama_pemilihan',calon.no_urut,calon.path_foto 
                FROM pemilihan INNER JOIN calon ON pemilihan.pemilihan_id = calon.pemilihan_id`;
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

const getAdminPemilih = async() => {
    const conn = await DB.getConnection();
    const sql = `SELECT pemilih.pemilih_id,pemilih.nama,pemilih.umur,pemilih.jenis_kelamin,pemilih.alamat,pemilih.pendidikan,
                desa.nama as 'nama_desa',kota.nama as 'nama_kota',provinsi.nama as 'nama_provinsi'
                FROM pemilih INNER JOIN desa ON desa.desa_id = pemilih.desa_id INNER JOIN kota ON kota.kota_id = desa.kota_id 
                INNER JOIN provinsi ON provinsi.provinsi_id = kota.provinsi_id`;
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

const getDetailPemilih = async(idPemilih) => {
    const conn = await DB.getConnection();
    const sql = `SELECT pemilih.pemilih_id,pemilih.nama,pemilih.umur,pemilih.jenis_kelamin,pemilih.alamat,pemilih.pendidikan FROM pemilih WHERE pemilih.pemilih_id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql,  [`${idPemilih}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

const getDetailCalon = async(idCalon) => {
    const conn = await DB.getConnection();
    const sql = `SELECT calon.calon_id,calon.nama,pemilihan.nama as 'nama_pemilihan',calon.no_urut,calon.path_foto 
                FROM pemilihan INNER JOIN calon ON pemilihan.pemilihan_id = calon.pemilihan_id WHERE calon.calon_id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${idCalon}`], (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

const getDesa = async() => {
    const conn = await DB.getConnection();
    const sql = `SELECT desa.desa_id,desa.nama FROM desa`;
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

const getDaerah = async(namaDesa) => {
    const conn = await DB.getConnection();
    const sql = `SELECT desa.nama as 'nama_desa',kota.nama as 'nama_kota',provinsi.nama as 'nama_provinsi'
                FROM pemilih INNER JOIN desa ON desa.desa_id = pemilih.desa_id INNER JOIN kota ON kota.kota_id = desa.kota_id 
                INNER JOIN provinsi ON provinsi.provinsi_id = kota.provinsi_id WHERE desa.nama = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${namaDesa}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

const updatePemilih = async(namaPemilih,umur,jenis_kelamin,alamat,pendidikan,namaDesa,idPemilih) => {
    const conn = await DB.getConnection();
    const sql = `UPDATE pemilih SET nama = \?\, umur = ?, jenis_kelamin = \?\, alamat = \?\, pendidikan = \?\, desa_id = (SELECT desa_id FROM desa WHERE nama = \?\) WHERE pemilih_id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${namaPemilih}`,Number(umur),`${jenis_kelamin}`,`${alamat}`,`${pendidikan}`,`${namaDesa}`,Number(idPemilih)],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

const getPemilihan = async(pemilihanId) => {
    const conn = await DB.getConnection();
    const sql = `SELECT * FROM pemilihan WHERE pemilihan_id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [Number(pemilihanId)],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

const getCalonPemilihan = async(pemilihanId) => {
    const conn = await DB.getConnection();
    const sql = `SELECT * FROM calon WHERE pemilihan_id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [Number(pemilihanId)],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
    });
}

const getCalonBelumTerdaftar = async() => {
    const conn = await DB.getConnection();
    const sql = `SELECT * FROM calon WHERE pemilihan_id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [Number(pemilihanId)],  (error, res) => {
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
    getAdminPemilu,
    getAdminCalon,
    getAdminPemilih,
    getDetailCalon,
    getDetailPemilih,
    getDesa,
    getDaerah,
    updatePemilih,
    getPemilihan,
    getCalonPemilihan
};