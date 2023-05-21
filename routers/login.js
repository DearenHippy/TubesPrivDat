import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as LoginController from '../controllers/login.js';

const router = express.Router();

router.get('/', LoginController.index);

router.post('/', LoginController.login);

export {
    router
};
