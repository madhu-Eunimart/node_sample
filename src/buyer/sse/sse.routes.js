import { Router } from 'express';
import authentication from '../../shared/middlewares/authentication.js';

import SseController from './sse.controller.js';

const sseController = new SseController();
const rootRouter = new Router();

rootRouter.get('/events', sseController.sendOnAction);

// rootRouter.post('/response/on_cancel', sseController.onCancel);
// rootRouter.post('/response/on_confirm', sseController.onConfirm);
// rootRouter.post('/response/on_init', sseController.onInit);

rootRouter.post('/on_search', sseController.onSearch);
rootRouter.post('/on_select', sseController.onSelect);
rootRouter.post('/on_init', sseController.onInit);
rootRouter.post('/on_confirm', sseController.onConfirm);
rootRouter.post('/on_update', sseController.onUpdate);
rootRouter.post('/on_cancel', sseController.onCancel);
rootRouter.post('/on_status', sseController.onStatus);
rootRouter.post('/on_track', sseController.onTrack);
rootRouter.post('/on_support', sseController.onSupport);
rootRouter.post('/rating_categories', sseController.ratingCategories);
rootRouter.post('/feedback_categories', sseController.feedbackCategories);
rootRouter.post('/feedback_form', sseController.feedbackForm);
rootRouter.post('/on_rating', sseController.onRating);
rootRouter.post('/on_issue', sseController.onBapIssue);
rootRouter.post('/on_issue', sseController.onBppIssue);
rootRouter.post('/on_issue_status', sseController.onIssueStatus);
rootRouter.post('/on_issue_status', sseController.onIssueStatus);


// rootRouter.post('/response/on_select', sseController.onQuote);
// rootRouter.post('/response/on_status', sseController.onStatus);
// rootRouter.post('/response/on_support', sseController.onSupport);
// rootRouter.post('/response/on_track', sseController.onTrack);
// rootRouter.post('/response/on_update', sseController.onUpdate);

export default rootRouter;
