import { Router } from 'express';
import authentication from '../../shared/middlewares/authentication.js';

import SseController from './sse.controller.js';

const sseController = new SseController();
const rootRouter = new Router();

rootRouter.get('/events', sseController.sendOnAction);

// rootRouter.post('/response/on_cancel', sseController.onCancel);
// rootRouter.post('/response/on_confirm', sseController.onConfirm);
// rootRouter.post('/response/on_init', sseController.onInit);

rootRouter.post('/bap/on_search', sseController.onSearch);
rootRouter.post('/bap/on_select', sseController.onSelect);
rootRouter.post('/bap/on_init', sseController.onInit);
rootRouter.post('/bap/on_confirm', sseController.onConfirm);
rootRouter.post('/bap/on_update', sseController.onUpdate);
rootRouter.post('/bap/on_cancel', sseController.onCancel);
rootRouter.post('/bap/on_status', sseController.onStatus);
rootRouter.post('/bap/on_track', sseController.onTrack);
rootRouter.post('/bap/on_support', sseController.onSupport);
rootRouter.post('/bap/rating_categories', sseController.ratingCategories);
rootRouter.post('/bap/feedback_categories', sseController.feedbackCategories);
rootRouter.post('/bap/feedback_form', sseController.feedbackForm);
rootRouter.post('/bap/on_rating', sseController.onRating);
rootRouter.post('/bap/on_issue', sseController.onBapIssue);
rootRouter.post('/bpp/on_issue', sseController.onBppIssue);
rootRouter.post('/bpp/on_issue_status', sseController.onIssueStatus);
rootRouter.post('/bap/on_issue_status', sseController.onIssueStatus);


// rootRouter.post('/response/on_select', sseController.onQuote);
// rootRouter.post('/response/on_status', sseController.onStatus);
// rootRouter.post('/response/on_support', sseController.onSupport);
// rootRouter.post('/response/on_track', sseController.onTrack);
// rootRouter.post('/response/on_update', sseController.onUpdate);

export default rootRouter;
