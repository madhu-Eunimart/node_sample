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
     ONDCTrackOrder(req, res, next) {
        const { body: trackRequest } = req;

        trackService.ONDCTrackOrder(trackRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }
}

export default TrackController;
