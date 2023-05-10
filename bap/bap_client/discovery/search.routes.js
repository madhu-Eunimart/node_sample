import {Router} from 'express';
import { authentication } from '../../../shared/middlewares/index.js';

import SearchController from './search.controller.js';

const router = new Router();
const searchController = new SearchController();

// client APIs BAP search
router.post(
    '/clientApis/bap/search',  // authentication,
    searchController.search
);

export default router;
