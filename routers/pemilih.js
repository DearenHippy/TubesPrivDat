import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as PemilihController from '../controllers/pemilih.js';

const router = express.Router();
const role = 'pemilih';

router.get('/', UserSessionController.auth(role), PemilihController.index);
router.get('/pemilu', UserSessionController.auth(role), PemilihController.daftarPemilu);
router.get('/pemilu/mulai/:id', UserSessionController.auth(role), PemilihController.mulaiPemilu);

export {
    router
};