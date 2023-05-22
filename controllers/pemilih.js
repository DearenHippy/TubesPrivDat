import * as PemilihModel from '../models/pemilih.js';

const index = (req, res) => {
    res.redirect('/pemilih/pemilu');
};

const daftarPemilu = async (req, res) => {
    const pemilu = await PemilihModel.getPemilu(req.session.role_id);
    res.render('pemilih/daftar-pemilu.ejs', {
        pemilu: pemilu
    });
};

export {
    index,
    daftarPemilu
};