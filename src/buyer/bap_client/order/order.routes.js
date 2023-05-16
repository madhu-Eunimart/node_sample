import {Router} from 'express';
import { authentication } from '../../../shared/middlewares/index.js';

import CancelOrderController from './cancel/cancelOrder.controller.js';
import ReturnOrderController from './return/returnOrder.controller.js';
import ConfirmOrderController from './confirm/confirmOrder.controller.js';
import InitOrderController from './init/initOrder.controller.js';
import OrderHistoryController from './history/orderHistory.controller.js';
import SelectOrderController from './select/selectOrder.controller.js';
import UpdateOrderController from './update/updateOrder.controller.js';
import OrderStatusController from './status/orderStatus.controller.js';
// import { searchProductbyName } from './db/dbService.js';

const rootRouter = new Router();

const cancelOrderController = new CancelOrderController();
const returnOrderController = new ReturnOrderController();
const confirmOrderController = new ConfirmOrderController();
const initOrderController = new InitOrderController();
const orderHistoryController = new OrderHistoryController();
const orderStatusController = new OrderStatusController();
const selectOrderController = new SelectOrderController();
const updateOrderController = new UpdateOrderController();

// select order v1
rootRouter.post(
    '/select',
    selectOrderController.selectOrder
);


rootRouter.get(
    '/test',
    selectOrderController.test,
);

// init order v1
rootRouter.post(
    '/init',
    initOrderController.initOrder
);

// confirm order v1
rootRouter.post(
    '/confirm',
    confirmOrderController.confirmOrder
);

// cancel order v1
rootRouter.post(
    '/cancel',
    cancelOrderController.cancelOrder
);

// return order v1
rootRouter.post(
    '/return',
    returnOrderController.returnOrder
);

// update order v1
rootRouter.post(
    '/update',
    updateOrderController.updateOrder
);

// status order v1
rootRouter.post(
    '/status',
    orderStatusController.statusOrder
);




//=================== multi - [select, init, confirm] =========================================================

rootRouter.post(
    '/multi_select',
    selectOrderController.selectMultipleOrder
);
rootRouter.post(
    '/multi_init',
    initOrderController.initMultipleOrder
);
rootRouter.post(
    '/multi_confirm',
    confirmOrderController.confirmMultipleOrder
);

export default rootRouter;
