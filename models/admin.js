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
        conn.release();
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
        conn.release();
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
        conn.release();
    });
}

const getAdminPemilih = async() => {
    const conn = await DB.getConnection();
    const sql = `
        SELECT 
            pemilih.pemilih_id,
            pemilih.nama,
            pemilih.umur,
            pemilih.jenis_kelamin,
            pemilih.alamat,
            pemilih.pendidikan,
            desa.nama as 'nama_desa',
            kota.nama as 'nama_kota',
            provinsi.nama as 'nama_provinsi'
        FROM 
            pemilih INNER JOIN desa 
                ON desa.desa_id = pemilih.desa_id 
            INNER JOIN kota 
                ON kota.kota_id = desa.kota_id 
            INNER JOIN provinsi 
                ON provinsi.provinsi_id = kota.provinsi_id
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

        conn.release();
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
        conn.release();
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
        conn.release();
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
        conn.release();
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
        conn.release();
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
        conn.release();
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
        conn.release();
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
        conn.release();
    });
}

const getJenisPemilihan = async() => {
    const conn = await DB.getConnection();
    const sql = `SELECT * FROM jenis_pemilihan`;
    return new Promise((resolve, reject) => {
        conn.query(sql,(error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const tambahPemilu = async(nama, mulai, selesai, jenis) => {
    const conn = await DB.getConnection();
    const sql = `INSERT INTO pemilihan(nama,tgl_mulai,tgl_selesai,jenis_pemilihan_id) VALUES(?,?,?,(SELECT jenis_pemilihan_id FROM jenis_pemilihan WHERE jenis = ?))`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${nama}`,`${mulai}`,`${selesai}`,`${jenis}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const getAllPemilihan = async(nama, mulai, selesai, jenis) => {
    const conn = await DB.getConnection();
    const sql = `SELECT * FROM pemilihan`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${nama}`,`${mulai}`,`${selesai}`,`${jenis}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const getNoUrutLast = async(namaPemilihan) => {
    const conn = await DB.getConnection();
    const sql = `SELECT no_urut FROM calon INNER JOIN pemilihan ON pemilihan.pemilihan_id = calon.pemilihan_id WHERE pemilihan.pemilihan_id = (SELECT pemilihan_id FROM pemilihan WHERE nama = ? ) ORDER BY no_urut DESC LIMIT 1;`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${namaPemilihan}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const tambahCalon = async(nama, path_foto, no_urut, nama_pemilihan) => {
    const conn = await DB.getConnection();
    const sql = `INSERT INTO calon(nama,path_foto,no_urut,pemilihan_id) VALUES(?,?,?,(SELECT pemilihan_id FROM pemilihan WHERE nama = ?));`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${nama}`,`${path_foto}`,`${no_urut}`,`${nama_pemilihan}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const tambahAkunCalon = async(username) => {
    const conn = await DB.getConnection();
    const sql = `INSERT INTO akun(username,password,role) VALUES(?,'XohImNooBHFR0OVvjcYpJ3NgPQ1qq73WKhHvch0VQtg=','calon')`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${username}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const tambahAkunCalon2 = async(username) => {
    const conn = await DB.getConnection();
    const sql = `INSERT INTO akun_calon(akun_id,calon_id) VALUES((SELECT akun_id FROM akun WHERE username = ?),(SELECT calon_id FROM calon WHERE nama = ?))`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${username}`,`${username}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const daftarPemilih = async(idPemilih,namaPemilihan) => {
    const conn = await DB.getConnection();
    const sql = `INSERT INTO terdaftar(pemilih_id,pemilihan_id) VALUES(?,(SELECT pemilihan_id FROM pemilihan WHERE nama = ?))`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [Number(idPemilih),`${namaPemilihan}`],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
    });
}

const editCalon = async(nama,path_foto,id) => {
    const conn = await DB.getConnection();
    const sql = `UPDATE calon SET nama = ?,path_foto = ? WHERE calon_id = ?`;
    return new Promise((resolve, reject) => {
        conn.query(sql, [`${nama}`,`${path_foto}`,Number(id)],  (error, res) => {
            if (error) {
                reject(error)
            } else {
                resolve(res)
            }
        })
        conn.release();
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
    getCalonPemilihan,
    getJenisPemilihan,
    tambahPemilu,
    getAllPemilihan,
    getNoUrutLast,
    tambahCalon,
    tambahAkunCalon,
    tambahAkunCalon2,
    daftarPemilih,
    editCalon
};