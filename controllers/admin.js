import * as Model from '../models/admin.js';

const index = (req, res) => {
    res.redirect('/admin/home');
};

const home = async(req, res) => {
    const allPemilihan = await Model.getAdminPemilu();
    console.log(allPemilihan);
    res.render('admin/home.ejs',{
        table: allPemilihan
    });
};

const calon = async(req, res) => {
    res.render('admin/calon.ejs');
};

export {
    home,
    index,
    calon
}