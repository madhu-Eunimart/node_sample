import { Router } from 'express';

import orderRoutes from "./buyer/order/order.routes.js";
import searchRoutes from "./buyer/discovery/search.routes.js";
import sseRoutes from "./buyer/sse/sse.routes.js";
// import supportRoutes from "./buyer/support/support.routes.js";
import trackRoutes from "./buyer/fulfillment/track.routes.js";
import rateRoutes from "./buyer/rating/rating.routes.js";
// import bapClientRoutes from "./buyer/bap_client/router.js";
// import cacheRoutes from "./cache_search/cacheSearch.routes.js"

// import rspRoutes from './rsp/rsp.routes.js'
const router = new Router();

router.use(orderRoutes);
// router.use(searchRoutes);
router.use(sseRoutes);
// router.use(supportRoutes);
router.use(trackRoutes);
router.use(rateRoutes);
// router.use(bapClientRoutes);
router.use(searchRoutes)
// router.use(cacheRoutes);
// router.use(rspRoutes);

export default router;