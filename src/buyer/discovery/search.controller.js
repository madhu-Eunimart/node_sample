import SearchService from './search.service.js';
import NoRecordFoundError from "../../shared/lib/errors/no-record-found.error.js";
import { Emitter } from '../../emitter/emitter.js';


const searchService = new SearchService();

class SearchController {
    /**
    * search
    * @param {*} req    HTTP request object
    * @param {*} res    HTTP response object
    * @param {*} next   Callback argument to the middleware function
    * @return {callback}
    */
     ONDCSearch(req, res, next) {
        const searchRequest = req.body;

        searchService.ONDCSearch(searchRequest, res).then(response => {
            if(!response || response === null)
                throw new NoRecordFoundError("No result found");
            else{
                Emitter("search",response)
                res.json(response);
            }
        }).catch((err) => {
            next(err);
        });
    }
}

export default SearchController;
