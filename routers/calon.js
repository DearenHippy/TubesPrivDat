import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as CalonController from '../controllers/calon.js'

const router = express.Router();

router.get('/', UserSessionController.authenticate, UserSessionController.authorize, CalonController.index);

router.get('/insight', UserSessionController.authenticate, UserSessionController.authorize, CalonController.insight);

export {
    router
};