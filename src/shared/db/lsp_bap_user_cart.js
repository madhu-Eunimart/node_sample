import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const lspselectSchema = new mongoose.Schema(
    {
        context: { type: Object },
        message : { type: Object }
       
    },
    { _id: false }
);

const lspMsnSchema = new mongoose.Schema(
    {
        fulfillment_id : { type: String},
        item_ids : { type: [String]},
        location_id : { type: String},
        location : { type: Object},
        preferences : { type: Object },
        package_details : { type: Object },
        lsp_response :{
            best_lsp_provider: { type: Object },
            mapping_details : { type: Object},
            best_provider:{ type: Object },
            fulfillment_id : { type: String },
            item_id : { type: String },
        },
        estimated_shipping_details : {type : Object} 
    },
    { _id: false }
);

const LspBapUserCart = new mongoose.Schema({
        parent_transaction_id : { type : String},
        transaction_id: {type: String},
        search : { type : Object },
        on_search:{type:lspselectSchema},
        msn_lsp_on_search_response : {type: lspMsnSchema},
        CreatedBy: {type: String},
        context:{type:Object},
    },
    { _id: true, timestamps: true }
);

LspBapUserCart.index({userId: 1, createdAt: -1});
LspBapUserCart.plugin(mongoosePaginate)

const Lsp_bap_user_cart = mongoose.model('lsp_bap_user_cart', LspBapUserCart, "lsp_bap_user_cart");

export default Lsp_bap_user_cart;