import CancelOrderService from './cancelOrder.service.js';

const cancelOrderService = new CancelOrderService();

class CancelOrderController {
    /**
    * cancel order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    cancelOrder(req, res, next) {
        const { body :orderRequest } = req;

        cancelOrderService.cancelOrder(orderRequest).then(response => {
            res.json(response);
        }).catch((err) => {
            next(err);
        });
    }


    /**
    * cancel order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     ONDCCancelOrder(req, res, next) {
        const { body :orderRequest } = req;

        cancelOrderService.ONDCCancelOrder(orderRequest).then(response => {
            res.json(response);
        }).catch((err) => {
            next(err);
        });
    }
}

export default CancelOrderController;
