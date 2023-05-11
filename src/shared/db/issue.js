import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";


const CommentSchema = new mongoose.Schema(
    {
        context: {type: String},
        description: {type: String},
        CreatedBy: {type: String}
    },
    { _id: true, timestamps: true }
)

const IssueSchema = new mongoose.Schema(
    {
        transaction_id: { type: String},
        issue_id: { type: String},
        parent_issue_id: { type: String},
        message_id: {type: String},
        issues: {type: [Object]},
        comments: {type: [CommentSchema]},
        status: {type: Object},
        buyer: { type: String},
        seller: { type: String},
        provider_name: { type: String},
        issue_category: { type: String},
        CreatedBy: { type: String},
        AssignedFrom: {type: String},
        AssignedTo: { type: String},
        level:{type:String,default:"Issue"},
        resolution_provider: {type: Object},
        resolution: {type: Object},
        on_context: {type: Object},
        createdAt: { type: Date, default: new Date()}
    },
    { _id: true, timestamps: true }
)


IssueSchema.index({userId: 1, createdAt: -1});


// const Issue = mongoose.model('issue',IssueSchema,"issues")
IssueSchema.plugin(mongoosePaginate)
const Issue = mongoose.model('issue',IssueSchema,"issues")


export default Issue;