import express from 'express';
import * as UserModel from '../models/user.js';
import * as Auth from './user-session.js';

const router = express.Router();

router.get('/calon', Auth.checkAuthentication('calon'), async (req, res) => {
    let userData = await UserModel.read(req.user.username);
    res.render('profile.ejs', {
        user: userData,
        type: 'calon'
    });
});

router.get('/admin', Auth.checkAuthentication('admin'), async (req, res) => {
    let userData = await UserModel.read(req.user.username);
    res.render('profile.ejs', {
        user: userData,
        type: 'admin'
    });
});

export {
    router
};