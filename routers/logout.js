import express from 'express';
import * as LogoutController from '../controllers/logout.js';

const router = express.Router();

router.get('/', LogoutController.logout);

export {
    router
}