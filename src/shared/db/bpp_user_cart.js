import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const selectSchema = new mongoose.Schema(
    {
        context: { type: Object },
        message : { type: Object }
       
    },
    { _id: false }
);

const BPPUserCart = new mongoose.Schema({
    transactionId: {type: String},
    providerId: {type: String},
    select:{type:selectSchema},
    onselect:{type:selectSchema},
    init_req:{type:selectSchema},
    on_init:{type:selectSchema},
    products:{type:Object}
},
{ _id: true, timestamps: true }
);

BPPUserCart.index({userId: 1, createdAt: -1});
BPPUserCart.plugin(mongoosePaginate)

const BPP_User_Cart = mongoose.model('bpp_user_cart', BPPUserCart, "bpp_user_cart");

export default BPP_User_Cart;