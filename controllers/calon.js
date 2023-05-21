const index = (req, res) => {
    res.redirect('/calon/insight');
};

const insight = (req, res) => {
    res.render('calon/insight.ejs');
};

export {
    index,
    insight
}