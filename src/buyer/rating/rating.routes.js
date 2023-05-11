import { Router } from 'express';
import { authentication } from '../../shared/middlewares/index.js';

import RatingController from './rating.controller.js';

const router = new Router();
const ratingController = new RatingController();

router.post(
    '/bap/eunimart_bap/rating',
    ratingController.ONDCRatingOrder,
);

export default router;
