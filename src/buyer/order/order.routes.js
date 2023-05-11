import {Router} from 'express';
import { authentication } from '../../shared/middlewares/index.js';

import CancelOrderController from './cancel/cancelOrder.controller.js';
import ConfirmOrderController from './confirm/confirmOrder.controller.js';
import InitOrderController from './init/initOrder.controller.js';
import OrderHistoryController from './history/orderHistory.controller.js';
import SelectOrderController from './select/selectOrder.controller.js';
import UpdateOrderController from './update/updateOrder.controller.js';
import OrderStatusController from './status/orderStatus.controller.js';
// import { searchProductbyName } from './db/dbService.js';

const rootRouter = new Router();

const cancelOrderController = new CancelOrderController();
const confirmOrderController = new ConfirmOrderController();
const initOrderController = new InitOrderController();
const orderHistoryController = new OrderHistoryController();
const orderStatusController = new OrderStatusController();
const selectOrderController = new SelectOrderController();
const updateOrderController = new UpdateOrderController();


rootRouter.get(
    '/test',
    selectOrderController.test,
);

// select order v1
rootRouter.post(
    '/bap/select',
    selectOrderController.ONDCSelectOrder,
);

// select order v1
rootRouter.post(
    '/bap/full_details/select',
    selectOrderController.selectOrder,
);

// init order v1
rootRouter.post(
    '/bap/init',
    initOrderController.ONDCInitOrder,
);

// init order v1
// rootRouter.post(
//     '/bap/full_details/init',
//     initOrderController.initOrder,
// );

// confirm order v1
rootRouter.post(
    '/bap/confirm',
    confirmOrderController.ONDCConfirmOrder,
);

// confirm order v1
rootRouter.post(
    '/bap/full_details/confirm',
    confirmOrderController.confirmOrder,
);

// cancel order v1
rootRouter.post(
    '/bap/cancel',
    cancelOrderController.ONDCCancelOrder,
);

// cancel order v1
rootRouter.post(
    '/bap/full_details/cancel',
    cancelOrderController.cancelOrder,
);

// update order v1
rootRouter.post(
    '/bap/update',
    updateOrderController.ONDCUpdateOrder,
);


// update order v1
rootRouter.post(
    '/bap/full_detatils/update',
    updateOrderController.updateOrder,
);

// status order v1
rootRouter.post(
    '/bap/status',
    orderStatusController.ONDCStatusOrder,
);

// update order v1
rootRouter.post(
    '/bap/full_details/status',
    orderStatusController.statusOrder,
);

export default rootRouter;
