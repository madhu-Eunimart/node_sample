import InitOrderService from './initOrder.service.js';
import JsonWebToken from '../../../../shared/lib/authentication/json-web-token.js'; 



const initOrderService = new InitOrderService();
const jsonWebToken = new JsonWebToken();

class InitOrderController {

    /**
    * init order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async initOrder(req, res, next) {
        const { body: orderRequest } = req;

        let sourceType = req.headers['source-type']

        // let decoded = await jsonWebToken.verify((req.headers.authorization).split(" ")[1])
        // if (!decoded) {
            // res.json([{"message": {"ack": { "status": "token expired"}}}]);
        //   }
        
        const company_id = decoded?.company_id || 1

        initOrderService.initOrder(orderRequest, company_id, req.headers.authorization, sourceType).then(response => {
        if(response?.error){
            res.status(401)
        }
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

    /**
    * init multiple orders
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    async initMultipleOrder(req, res, next) {
        const { body: requests} = req;

        let sourceType = req.headers['source-type']

        // let decoded = await jsonWebToken.verify((req.headers.authorization).split(" ")[1])
        // if (!decoded) {
        //     res.json([{"message": {"ack": { "status": "token expired"}}}]);
        //   }
        
        const company_id = decoded?.company_id || 1

        let length = requests.length;
        let requestArray = [];

        if ( typeof length == 'undefined') {
            requestArray.push(requests);
        }
        else{
            requestArray = requests
        }

        await initOrderService.initMultipleOrder(requestArray, company_id, sourceType).then(response => {
            return res.json(response);
        }).catch((err) => {
            // console.log("inintOrder.controller.js 59");
            next(err);
        });

    }
}

export default InitOrderController;
