import ReturnOrderService from './returnOrder.service.js';


const returnOrderService = new ReturnOrderService();

class ReturnOrderController {
    /**
    * return order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    returnOrder(req, res, next) {
        const { body :orderRequest } = req;

        returnOrderService.returnOrder(orderRequest).then(response => {
            res.json(response);
        }).catch((err) => {
            next(err);
        });
    }
}

export default ReturnOrderController;
