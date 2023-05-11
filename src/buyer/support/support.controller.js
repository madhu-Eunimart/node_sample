import SupportService from './support.service.js';

const supportService = new SupportService();

class SupportController {

     /**
    * support order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
      ONDCSupportOrder(req, res, next) {
        const { body: supportRequest } = req;

        supportService.ONDCSupportOrder(supportRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }
}

export default SupportController;
