import RatingService from './rating.service.js';
import BppRatingService from './bppRating.service.js';

const bppRatingService = new BppRatingService();

const ratingService = new RatingService();

class RatingController {

    /**
    * rating order
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    BapRating(req, res, next) {
        const { body: ratingRequest } = req;
        ratingService.BapRating(ratingRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

    /**
    * get Bap Rating Categories
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    getBapRatingCategories(req, res, next) {
        const { body: ratingCategoriesRequest } = req;

        ratingService.getBapRatingCategories(ratingCategoriesRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

    /**
    * get Bap Feedback Categories
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    getBapFeedbackCategories(req, res, next) {
        const { body: feedbackCategoriesRequest } = req;

        ratingService.getBapFeedbackCategories(feedbackCategoriesRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }

        /**
    * get Bap Feedback Form
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
    getBapFeedbackForm(req, res, next) {
        const { body: feedbackFormRequest } = req;

        ratingService.getBapFeedbackForm(feedbackFormRequest).then(response => {
            res.json({ ...response });
        }).catch((err) => {
            next(err);
        });
    }
}

export default RatingController;