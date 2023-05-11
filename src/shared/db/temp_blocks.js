import mongoose from "mongoose";

const TempBlockSchema = new mongoose.Schema(
    {
        id: { type: String },
        index: { type: Number },
        transaction_id: { type: String },
        timestamp: { type: String },
        data: { type: String },
        hash: { type: String },
        prev_hash: { type: String },
        validator: { type: String },
        candidate_timestamp: { type: String }, 
        temp_timestamp: { type: String },
    },
    { _id: true, timestamps: true }
);



TempBlockSchema.index({userId: 1, createdAt: -1});

const TempBlock = mongoose.model('temp_block', TempBlockSchema, "temp_block");

export default TempBlock;
