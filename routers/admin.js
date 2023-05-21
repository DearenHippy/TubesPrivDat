import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as AdminController from '../controllers/admin.js'

const router = express.Router();

router.get('/', UserSessionController.authenticate, UserSessionController.authorize, AdminController.index);

router.get('/home', UserSessionController.authenticate, UserSessionController.authorize, AdminController.home);

export {
    router
};