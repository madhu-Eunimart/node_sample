import mongoose from "mongoose";

// const ComplainantActions = new mongoose.Schema(
//     {

//     },
//     { _id: true, timestamps: true }
// );

const ActionSchema = new mongoose.Schema(
    {
        action:{type: String}
    },
    {_id:false, timestamps: false}
)

const TypeSchema = new mongoose.Schema(
    {
        type:{type: String}
    },
    {_id:false, timestamps: false}
)

const ComplainantActions = mongoose.model('ComplainantActions', ActionSchema, "ComplainantActions");

const RespondentActions = mongoose.model('RespondentActions', ActionSchema, "RespondentActions");

const ActionsTriggered = mongoose.model('ActionsTriggered', ActionSchema, "ActionsTriggered");

const ResolutionAction = mongoose.model('ResolutionAction', ActionSchema, "ResolutionAction");

const RespondentTypes = mongoose.model('RespondentTypes', TypeSchema, "RespondentTypes"); 

export {ComplainantActions,RespondentActions,ActionsTriggered,ResolutionAction,RespondentTypes}