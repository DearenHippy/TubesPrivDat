import express from 'express';
import * as UserSessionController from '../controllers/user-session.js';
import * as CalonController from '../controllers/calon.js'

const router = express.Router();
const role = 'calon';

router.get('/', UserSessionController.auth(role), CalonController.index);

router.get('/insight', UserSessionController.auth(role), CalonController.insight);

export {
    router
};