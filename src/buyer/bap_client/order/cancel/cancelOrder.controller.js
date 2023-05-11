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

        let sourceType = req.headers['source-type']

        cancelOrderService.cancelOrder(orderRequest, sourceType).then(response => {
            res.json(response);
        }).catch((err) => {
            next(err);
        });
    }
}

export default CancelOrderController;
