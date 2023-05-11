import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const PaymentSchema = new mongoose.Schema(
    {
        id: { type: String },
        seller_id:{type: String,default:"SIVA-ONDC-STORE-1"},
        seller_name:{type: String,default:"Siva Store"},
        orderId: { type: String },
        invoiceId: { type: String },
        orderNumber: { type: String },
        orderDate: { type: Date },
        paymentStatus: { type: String },
        paidDate: { type: Date },
        orderStatus: { type: String },
        cartDiscount: { type: Number },
        orderCurrency: { type: String },
        paymentMethod: { type: String },
        txnDate: { type: Date },
        skuId: { type: String },
        lineItemAmount: { type: Number },
        itemSkuCount: { type: Number },
        orderType: { type: String },
        declaredPrice: { type: Number },
        ondcCommissionFee: { type: Number },
        ondcTax: { type: Number },
        ondcTotalAmount: { type: Number },
        buyerAppFee: { type: Number },
        buyerAppTax: { type: Number },
        buyerAppTotalAmount: { type: Number },
        sellerAppFee: { type: Number },
        sellerAppTax: { type: Number },
        sellerAppTotalAmount: { type: Number },
        paymentGatewayFee: { type: Number },
        paymentGatewayTax: { type: Number },
        paymentGatewayTotalAmount: { type: Number },
        gatewayFee: { type: Number },
        gatewayTax: { type: Number },
        gatewayTotal: { type: Number },
        shippingFee: { type: Number },
        shippingFeeTax: { type: Number },
        shippingTotal: { type: Number },
        orderTotal: { type: Number },
        taxGstTotal: { type: Number },
        withHoldingTaxBuyerApp: { type: Number },
        withHoldingTaxSellerApp: { type: Number },
        tdsByBuyerApp: { type: Number },
        tdsBySellerApp: { type: Number },
        tdsByOndc: { type: Number },
        tdsByGateway: { type: Number },
        createdBy: { type: String},
        createdAt: { type: Date, default: new Date()}
    },
    { _id: true, timestamps: true }
);

PaymentSchema.index({userId: 1, createdAt: -1});
PaymentSchema.plugin(mongoosePaginate)

const Payment = mongoose.model('payment', PaymentSchema, "payment");

export default Payment;
