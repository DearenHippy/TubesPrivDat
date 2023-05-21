const logout = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.redirect('login')
            }
        });
    }
};

export {
    logout
};