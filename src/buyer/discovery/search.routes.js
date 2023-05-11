import {Router} from 'express';
import { authentication } from '../../shared/middlewares/index.js';

import SearchController from './search.controller.js';

const router = new Router();
const searchController = new SearchController();

// ONDC BAP search
router.post(
    '/search',
    searchController.ONDCSearch,
);

export default router;
