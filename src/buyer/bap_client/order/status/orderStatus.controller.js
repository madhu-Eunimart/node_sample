import OrderStatusService from './orderStatus.service.js';

const orderStatusService = new OrderStatusService();

class OrderStatusController {

    /**
    * Update status
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     statusOrder(req, res, next) {
        const { body: statusRequest } = req;

        let sourceType = req.headers['source-type']

        orderStatusService.orderStatus(statusRequest, sourceType).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }
}

export default OrderStatusController;
