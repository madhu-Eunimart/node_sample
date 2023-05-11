import { Router } from 'express';
import { authentication } from '../../../shared/middlewares/index.js';

import RatingController from './rating.controller.js';

const router = new Router();
const ratingController = new RatingController();

router.post(
    '/rating', authentication,
    ratingController.BapRating,
);

router.post(
    '/get_rating_categories',
    ratingController.getBapRatingCategories,
)

router.post(
    '/get_feedback_categories',
    ratingController.getBapFeedbackCategories,
)

router.post(
    '/get_feedback_form',
    ratingController.getBapFeedbackForm,
)

export default router;
