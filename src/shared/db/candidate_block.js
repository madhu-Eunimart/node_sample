import mongoose from "mongoose";

const CandidateBlockSchema = new mongoose.Schema(
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

CandidateBlockSchema.index({userId: 1, createdAt: -1});

const CandidateBlock = mongoose.model('candidate_block', CandidateBlockSchema, "candidate_block");

export default CandidateBlock;
