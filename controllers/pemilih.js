import * as PemilihModel from '../models/pemilih.js';

const index = (req, res) => {
    res.redirect('/pemilih/pemilu');
};

const daftarPemilu = async (req, res) => {
    
    res.render('/pemilih/daftar-pemilu.ejs');
};

export {
    index,
    daftarPemilu
};