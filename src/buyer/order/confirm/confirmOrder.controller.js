import ConfirmOrderService from './confirmOrder.service.js';

const confirmOrderService = new ConfirmOrderService();
class ConfirmOrderController {

    /**
    * confirm order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    confirmOrder(req, res, next) {
        const { body: orderRequest } = req;

        confirmOrderService.confirmOrder(orderRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

    /**
    * confirm order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     ONDCConfirmOrder(req, res, next) {
        const { body: orderRequest } = req;

        confirmOrderService.ONDCConfirmOrder(orderRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

}

export default ConfirmOrderController;
