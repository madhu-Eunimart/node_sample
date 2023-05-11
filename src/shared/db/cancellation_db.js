import mongoose from "mongoose";

const CancellationReasonSchema = new mongoose.Schema({
    code:{
        type:String
    },
    reason:{
        type:String
    },
    triggers_rto:{
        type:Boolean
    },
    cause_of_cancellation:{
        type:String
    },
    weather_applicable_for_part_cancel:{
        type:Boolean
    }
},{ _id: true, timestamps: true })

const CancellationReason= mongoose.model('cancellation_reason',CancellationReasonSchema , "cancellation_reason");

export  {CancellationReason};

