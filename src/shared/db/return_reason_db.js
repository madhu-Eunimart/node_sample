import mongoose from "mongoose";

const ReturnReasonsSchema = mongoose.Schema({
    code:{
        type:String
    },
    reason:{
        type:String
    },
    whether_applicable_for_refund_for_non_returnable_items:{
        type:Boolean
    }
},{ _id: true, timestamps: true })

const ReturnReasons= mongoose.model('return_reason',ReturnReasonsSchema , "return_reason");

export  {ReturnReasons};