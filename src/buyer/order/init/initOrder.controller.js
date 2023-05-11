import InitOrderService from './initOrder.service.js';

const initOrderService = new InitOrderService();

class InitOrderController {


    /**
    * init order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     ONDCInitOrder(req, res, next) {
        const { body: orderRequest } = req;

        initOrderService.ONDCInitOrder(orderRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }
}

export default InitOrderController;
