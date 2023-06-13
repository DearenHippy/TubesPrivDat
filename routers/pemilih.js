import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as PemilihController from '../controllers/pemilih.js';

const router = express.Router();
const role = 'pemilih';

router.get('/', UserSessionController.auth(role), PemilihController.index);
router.get('/pemilu', UserSessionController.auth(role), PemilihController.daftarPemilu);
router.get('/pemilu/mulai/:pemilihan_id', UserSessionController.auth(role), PemilihController.mulaiPemilu);
router.post('/pemilu/pilih', UserSessionController.auth(role), PemilihController.pilihPemilu);
router.post('/pemilu/abstain', UserSessionController.auth(role), PemilihController.abstainPemilu);

export {
    router
};