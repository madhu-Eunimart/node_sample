import TrackService from './track.service.js';

const trackService = new TrackService();

class TrackController {

    /**
    * Track order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     trackOrder(req, res, next) {
        console.log("-----12")
        const { body: trackRequest } = req;

        let sourceType = req.headers['source-type']

        trackService.trackOrder(trackRequest, sourceType).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

}

export default TrackController;
