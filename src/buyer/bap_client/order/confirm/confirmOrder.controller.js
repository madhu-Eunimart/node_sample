// import { addOrUpdateOrderWithTransactionId } from '../../../../shared/db/dbService.js';
import JsonWebToken from '../../../../shared/lib/authentication/json-web-token.js';
import ConfirmOrderService from './confirmOrder.service.js';



const confirmOrderService = new ConfirmOrderService();
const jsonWebToken = new JsonWebToken();
class ConfirmOrderController {

    /**
    * confirm order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async confirmOrder(req, res, next) {
        const { body: orderRequest } = req;

        let sourceType = req.headers['source-type']

        // let decoded = await jsonWebToken.verify((req.headers.authorization).split(" ")[1])
        // if (!decoded) {
        // res.json([{"message": {"ack": { "status": "token expired"}}}]);
        //   }
        
        let createdBy =1
    
        confirmOrderService.confirmOrder(orderRequest,createdBy,sourceType).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

    /**
    * confirm multiple orders
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    confirmMultipleOrder(req, res, next) {
        const { body: requests } = req;
    
        let sourceType = req.headers['source-type']

        let length = requests.length;
        let requestArray = [];
        
        if ( typeof length == 'undefined') {
            requestArray.push(requests);
        }
        else{
            requestArray = requests
        }
    
        confirmOrderService.confirmMultipleOrder(requestArray, sourceType).then(response => {
            res.json(response);
        }).catch((err) => {
            next(err);
        });
    }
}

export default ConfirmOrderController;
