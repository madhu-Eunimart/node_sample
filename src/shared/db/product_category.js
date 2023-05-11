import mongoose from "mongoose";

const ProductCategorySchema = new mongoose.Schema({
    id: { type: String },
    created_by: { type: String },
    update_date: {type:String},
    updated_by:{type:String},
    created_date:{type:String},
    name:{type:String},
    parent_category_id:{type:String},
    external_id:{type:String},
    related_category_ids:{type:String},
    additives_information:{type:String},
    short_description:{type:String},
    domain_id:{type:String},
    category_code:{type:String},

   }  ,
   { _id: true, timestamps: true }
);

ProductCategorySchema.index({userId: 1, createdAt: -1});


const ProductCategory = mongoose.model('product_category', ProductCategorySchema, "product_category");

export default ProductCategory;
