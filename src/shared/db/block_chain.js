import mongoose from "mongoose";

const BlockSchema = new mongoose.Schema(
    {
        id: { type: String },
        index: { type: Number },
        transaction_id: { type: String },
        timestamp: { type: String },
        data: { type: String },
        hash: { type: String },
        prev_hash: { type: String },
        validator: { type: String },
    },
    { _id: true, timestamps: true }
);


const BlockChainSchema = new mongoose.Schema(
    {
        transaction_id: { type: String },
        blocks: [BlockSchema],
    },
    { _id: true, timestamps: true }
);


BlockChainSchema.index({userId: 1, createdAt: -1});

const BlockChain = mongoose.model('block_chain', BlockChainSchema, "block_chain");

export default BlockChain;
