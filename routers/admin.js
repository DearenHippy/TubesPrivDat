import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as AdminController from '../controllers/admin.js'

const router = express.Router();
const role = 'admin';

router.get('/', UserSessionController.auth(role), AdminController.index);

router.get('/home', UserSessionController.auth(role), AdminController.home);

export {
    router
};