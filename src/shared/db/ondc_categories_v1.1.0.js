import mongoose from "mongoose";

const OndcCategorySchema = new mongoose.Schema({
    name: { type: String },
},
    { _id: true }
);

// OndcCategorySchema.index({userId: 1, createdAt: -1});


const OndcCategory = mongoose.model('ondc_categories_v1.1.0', OndcCategorySchema, "ondc_categories_v1.1.0");

export default OndcCategory;
