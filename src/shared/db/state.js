import mongoose from "mongoose";
import {LocationSchema} from './provider.js'
import mongoosePaginate from "mongoose-paginate-v2";


const StateSchema = new mongoose.Schema(
    {
        name: { type: String },
        state_code: { type: String}
    },
    { _id: true, timestamps: true }
);

StateSchema.index({userId: 1, createdAt: -1});
StateSchema.plugin(mongoosePaginate)
const Product = mongoose.model('states', StateSchema, "states");

export default Product;