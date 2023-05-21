const index = (req, res) => {
    res.redirect('/admin/home');
};

const home = (req, res) => {
    res.render('admin/home.ejs');
};

export {
    home,
    index
}