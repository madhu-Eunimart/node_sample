import {Router} from 'express';
import { authentication } from '../../../shared/middlewares/index.js';

import TrackController from './track.controller.js';

const router = new Router();
const trackController = new TrackController();

// track order v1
router.post(
    '/track', authentication,
    trackController.trackOrder, 
);

export default router;
