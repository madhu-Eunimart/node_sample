import UpdateOrderService from './updateOrder.service.js';


const updateOrderService = new UpdateOrderService();

class UpdateOrderController {
    
    /**
    * Update order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     updateOrder(req, res, next) {
        const { body: orderRequest } = req;

        updateOrderService.updateOrder(orderRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

    /**
    * Update order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     ONDCUpdateOrder(req, res, next) {
        const { body: orderRequest } = req;

        updateOrderService.ONDCUpdateOrder(orderRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }
}

export default UpdateOrderController;
