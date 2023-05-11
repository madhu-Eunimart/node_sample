import {Router} from 'express';
import TrackController from './track.controller.js';

const router = new Router();
const trackController = new TrackController();

// track order v1
router.post(
    '/bap/eunimart_bap/track',
    trackController.ONDCTrackOrder,
);


export default router;
