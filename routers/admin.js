import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as AdminController from '../controllers/admin.js'
import multer from 'multer';

const router = express.Router();
const role = 'admin';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'views/images/calon'); // Directory where the uploaded files will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  
const upload = multer({ storage: storage });

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

router.get('/tambahCalonPemilihan',UserSessionController.auth(role), AdminController.tambahCalonPemilihan);

router.post('/tambahCalon', upload.fields([{name:'fotoCalon1',maxCount:1},{name:'fotoCalon2',maxCount:1}]), UserSessionController.auth(role),  AdminController.tambahCalon);

export {
    router
};