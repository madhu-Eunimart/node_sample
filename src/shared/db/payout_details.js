import mongoose from "mongoose";

import mongoosePaginate from "mongoose-paginate-v2";
import { PROTOCOL_PAYMENT } from "../utils/buyer_enums.js";



const PayoutDetailsSchema = new mongoose.Schema(
        {

                orderCreatedDateTime: { type: Date },
                orderCreatedDate: { type: String },
                orderCreatedTime: { type: String },
                buyerAppOrderId: { type: String },
                buyerAppOrderItemId: { type: String },
                networkOrderId: { type: String },
                transactionId: { type: String },
                sellerNetworkParticipant: { type: String },
                sellerName: { type: String },
                orderReturnPeriodExpiryDate: { type: String },
                settlementDueDate: { type: String },
                skuName: { type: String },
                orderQuantity: { type: Number },
                totalItemValueIncludingTax: { type: Number },
                shippingCharges: { type: Number },
                packagingCharges: { type: Number },
                convenienceCharges: { type: Number },
                totalOrderValue: { type: Number },
                buyerFinderFeeonTotalOrderValue: { type: Number },
                merchantPayableAmount: { type: Number },
                transaction: { type: Object },
                transactionStatus: { type: Object },
                paymentTransactionId: { type: String },
                paymentStatus: { type: String, enum: PROTOCOL_PAYMENT }, 
                settlementStatus: { type: String },
                createdBy: { type: String },
                settlementTransactionId: { type: String }
        },
        { _id: true, timestamps: true }
);

PayoutDetailsSchema.index({ userId: 1, createdAt: -1 });
PayoutDetailsSchema.plugin(mongoosePaginate)

const PayoutDetails = mongoose.model('payout_details', PayoutDetailsSchema, "payout_details");

export default PayoutDetails;
