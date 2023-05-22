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

const mulaiPemilu = async (req, res) => {
    const calon = await PemilihModel.getCalonTerdaftar(req.params.id);
    console.log(calon[0])
    res.render('pemilih/mulai-pemilu.ejs', {
        calon: calon
    });
};

export {
    index,
    daftarPemilu,
    mulaiPemilu
};