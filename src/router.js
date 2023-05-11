import { Router } from 'express';

// import orderRoutes from "./order/order.routes.js";
// import searchRoutes from "./discovery/search.routes.js";
import sseRoutes from "./buyer/sse/sse.routes.js";
// import supportRoutes from "./support/support.routes.js";
// import trackRoutes from "./fulfillment/track.routes.js";
// import rateRoutes from "./rating/rating.routes.js";
import bapClientRoutes from "./buyer/bap_client/router.js";
// import cacheRoutes from "./cache_search/cacheSearch.routes.js"

// import rspRoutes from './rsp/rsp.routes.js'
const router = new Router();

// router.use(orderRoutes);
// router.use(searchRoutes);
router.use(sseRoutes);
// router.use(supportRoutes);
// router.use(trackRoutes);
// router.use(rateRoutes);
router.use(bapClientRoutes);
// router.use(cacheRoutes);
// router.use(rspRoutes);

export default router;