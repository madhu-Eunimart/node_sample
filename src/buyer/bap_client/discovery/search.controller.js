import SearchService from "./search.service.js";
import NoRecordFoundError from "../../../shared/lib/errors/no-record-found.error.js";
import JsonWebToken from '../../../shared/lib/authentication/json-web-token.js'; 


const searchService = new SearchService();
const jsonWebToken = new JsonWebToken();

class SearchController {
  /**
   * search
   * @param {*} req    HTTP request object
   * @param {*} res    HTTP response object
   * @param {*} next   Callback argument to the middleware function
   * @return {callback}
   */
  async search(req, res, next) {
    const searchRequest = req.body;
    console.log("-----came here",req)

    let sourceType = req.headers['source-type']

    let companyId = 1
    searchService
      .search(searchRequest, companyId, req.headers.authorization, sourceType)
      .then((response) => {
        if (!response || response === null)
          throw new NoRecordFoundError("No result found");
        else res.json(response);
      })
      .catch((err) => {
        next(err);
      });
  }
}

export default SearchController;
