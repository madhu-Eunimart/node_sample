import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const onActionResultsSchema = new mongoose.Schema(
    {
        transaction_id: { type: String },
        response: { type: Object },
        message_id: { type: String },
        validTime: { type: Date }
    },
    { _id: true, timestamps: true }
);



onActionResultsSchema.index({ createdAt: -1 });
onActionResultsSchema.plugin(mongoosePaginate)

const OnActionResults = mongoose.model('OnActionResults', onActionResultsSchema, "OnActionResults");

export default OnActionResults;