import * as Model from '../models/admin.js';

const index = (req, res) => {
    res.redirect('/admin/home');
};

const home = async(req, res) => {
    const allPemilihan = await Model.getAdminPemilu();
    res.render('admin/home.ejs',{
        table: allPemilihan
    });
};

const calon = async(req, res) => {
    const allCalon = await Model.getAdminCalon();
    res.render('admin/calon.ejs',{
        table: allCalon
    });
};

const pemilih = async(req, res) => {
    const allPemilih = await Model.getAdminPemilih();
    res.render('admin/pemilih.ejs',{
        table: allPemilih
    });
};

const detailCalon = async(req, res) => {
    const detail = await Model.getDetailCalon(req.body.idCalon);
    res.render('admin/editCalon.ejs',{
        row: detail
    });
};

const detailPemilih = async(req, res) => {
    const detail = await Model.getDetailPemilih(req.body.idPemilih);
    res.render('admin/editPemilih.ejs',{
        row: detail
    });
};

export {
    home,
    index,
    calon,
    pemilih,
    detailCalon,
    detailPemilih
}