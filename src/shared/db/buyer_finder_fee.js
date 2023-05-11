import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const buyerFinderFee = new mongoose.Schema(
    {
        bap_id: { type: String },
        buyer_finder_fee_type:{type: String},
        buyer_finder_fee_amount:{type: String},
        transaction_id:{type: String},
        context: { type: Object },
        message : { type: Object }
    },
    { _id: true, timestamps: true }
);

buyerFinderFee.index({ createdAt: -1 });
buyerFinderFee.plugin(mongoosePaginate)

const buyerFinderFees = mongoose.model('buyer_finder_fee', buyerFinderFee, "buyer_finder_fee");

export default buyerFinderFees;