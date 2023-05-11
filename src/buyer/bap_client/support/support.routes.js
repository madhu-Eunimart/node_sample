import { Router } from 'express';
import { authentication } from '../../../shared/middlewares/index.js';

import SupportController from './support.controller.js';

const router = new Router();
const supportController = new SupportController();

router.post(
    '/support', authentication,
    supportController.supportOrder
);

export default router;
