import {Router} from 'express';

import SearchController from './search.controller.js';

const router = new Router();
const searchController = new SearchController();

// client APIs BAP search
router.post(
    '/search',  // authentication,
    searchController.search
);

export default router;
