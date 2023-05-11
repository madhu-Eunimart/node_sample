import mongoose from "mongoose";

const UserIssueCategoriesSchema = new mongoose.Schema(
    {
        category: { type: String },
        code: { type: String },
        description: { type: String },
        raised_by: { type: String },
        raised_on: { type: String },
        expected_response_time: { type: String },
        expected_resolution_time: { type: String }
       
    },
    { _id: true, timestamps: true }
);


const ApplicationIssueCategoriesSchema = new mongoose.Schema(
    {
        category: { type: String },
        code: { type: String },
        description: { type: String },
        raised_by: { type: String },
        raised_on: { type: String },
        expected_response_time: { type: String },
        expected_resolution_time: { type: String }
       
    },
    { _id: true, timestamps: true }
);

const IssueCategoriesSchema = new mongoose.Schema(
    {
        category: { type: String },
        code: { type: String },
        description: { type: String },
        raised_by: { type: String },
        raised_on: { type: String },
        expected_response_time: { type: String },
        expected_resolution_time: { type: String }
       
    },
    { _id: true, timestamps: true }
);

const SubIssueCategoriesSchema = new mongoose.Schema(
    {
        category: { type: String },
        code: { type: String },
        description: { type: String },
        raised_by: { type: String },
        raised_on: { type: String },
        expected_response_time: { type: String },
        expected_resolution_time: { type: String },
        parent_category: {type: String}
       
    },
    { _id: true, timestamps: true }
);

SubIssueCategoriesSchema.index({category: 1 });
IssueCategoriesSchema.index({category: 1 });
UserIssueCategoriesSchema.index({category: 1 });
ApplicationIssueCategoriesSchema.index({category: 1 });

const SubIssueCategories = mongoose.model('SubIssueCategories', SubIssueCategoriesSchema, "SubIssueCategories");

const IssueCategories = mongoose.model('IssueCategories', IssueCategoriesSchema, "IssueCategories");

 const UserIssueCategories = mongoose.model('UserIssueCategories', UserIssueCategoriesSchema, "UserIssueCategories");

 const ApplicationIssueCategories= mongoose.model('ApplicationIssueCategories', ApplicationIssueCategoriesSchema, "ApplicationIssueCategories");

export  {UserIssueCategories,ApplicationIssueCategories,IssueCategories,SubIssueCategories};

