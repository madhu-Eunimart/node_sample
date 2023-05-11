import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const selectSchema = new mongoose.Schema(
    {
        context: { type: Object },
        message : { type: Object }
       
    },
    { _id: false }
);

const UserCart = new mongoose.Schema({
    itemId : {type: String},
    transactionId: {type: String},
    order_id:{type:String},
    providerId: {type: String},
    order: {type: Object},
    context:{type:Object},
    select:{type:selectSchema},
    onselect:{type:selectSchema},
    init_req :{ type : selectSchema},
    oninit :{ type : selectSchema},
    CreatedBy: {type: String},
    source: { type: String }
},
{ _id: true, timestamps: true }
);

UserCart.index({userId: 1, createdAt: -1});
UserCart.plugin(mongoosePaginate)

const User_Cart = mongoose.model('user_cart', UserCart, "user_cart");

export default User_Cart;