import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const searchRequest = new mongoose.Schema(
    {
        transaction_id:{type: String},
        context: { type: Object },
        message : { type: Object },
        CreatedBy: {type: String},
        source: {type: String}
       
    },
    { _id: true, timestamps: true }
);



searchRequest.index({userId: 1, createdAt: -1});
searchRequest.plugin(mongoosePaginate)

const searchRequests = mongoose.model('search_request', searchRequest, "search_request");

export default searchRequests;