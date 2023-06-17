import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as AdminController from '../controllers/admin.js'

const router = express.Router();
const role = 'admin';

router.get('/', UserSessionController.auth(role), AdminController.index);

router.get('/home', UserSessionController.auth(role), AdminController.home);

router.get('/calon', UserSessionController.auth(role),  AdminController.calon);

router.get('/pemilih', UserSessionController.auth(role),  AdminController.pemilih);

router.post('/detailCalon', UserSessionController.auth(role),  AdminController.detailCalon);

router.post('/detailPemilih', UserSessionController.auth(role),  AdminController.detailPemilih);

router.post('/daerah',UserSessionController.auth(role),  AdminController.getDaerah);

router.post('/editPemilih',UserSessionController.auth(role),  AdminController.editPemilih);

router.post('/detailPemilihan',UserSessionController.auth(role), AdminController.detailPemilihan);

router.get('/tambahPemilihan',UserSessionController.auth(role), AdminController.tambahPemilihan);

router.post('/tambahPemilu',UserSessionController.auth(role),  AdminController.tambahPemilu);

export {
    router
};