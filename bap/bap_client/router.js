import { Router } from 'express';

// import accountRoutes from "./accounts/accounts.routes.js";
// import migrationsRoutes from "./migrations/migrations.routes.js";
// import orderRoutes from "./order/order.routes.js";
// import paymentRoutes from "./payment/payment.routes.js";
import searchRoutes from "./discovery/search.routes.js";
// import supportRoutes from "./support/support.routes.js";
// import trackRoutes from "./fulfillment/track.routes.js";
// import rateRoutes from "./rating/rating.routes.js";
// import applicationRoutes from "./application/application.routes.js";
// import productRoutes from "./products/products.route.js";
// import userRoutes from "./user/user.routes.js";

const router = new Router();

// router.use(accountRoutes);
// router.use(migrationsRoutes);
// router.use(orderRoutes);
// router.use(paymentRoutes);
router.use(searchRoutes);
// router.use(supportRoutes);
// router.use(trackRoutes);
// router.use(applicationRoutes);
// router.use(rateRoutes);
// router.use(productRoutes);
// router.use(userRoutes);


export default router;