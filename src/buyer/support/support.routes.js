import { Router } from 'express';

import SupportController from './support.controller.js';

const router = new Router();
const supportController = new SupportController();

router.post(
    '/bap/eunimart_bap/support',
    supportController.ONDCSupportOrder,
);

export default router;
