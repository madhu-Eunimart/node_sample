import mongoose from "mongoose";

const IssueTypesSchema = new mongoose.Schema(
    {
        level: {type: Number},
        data: {type: String}
    },
    {_id:false}
)

IssueTypesSchema.index({category: 1 });

const IssueTypes = mongoose.model('issue_types', IssueTypesSchema, "issue_types");

export default IssueTypes;
