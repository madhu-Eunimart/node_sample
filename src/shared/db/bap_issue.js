import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from 'uuid';

const CommentSchema = new mongoose.Schema(
        {
        context: {type: String},
        description: {type: String},
        CreatedBy: {type: String}
    },
    { _id: true, timestamps: true }
)

const SourceSchema = new mongoose.Schema(
    {
        network_participant_id: {type: String},
        issue_source_type:{type: String, default:"CONSUMER"}
    },
    { _id: false, timestamps: false }
)

const MediaSchema = new mongoose.Schema(
    {
     mimetype:{type:String},
     url:{type:String},
     signature:{type:String},
     dsa:{type:String},
    },
    { _id: false, timestamps: false }
)

const AdditonalDescSchema= new mongoose.Schema(
    {
        url:{type:String},
        content_type:{type:String}  
      },
      { _id: false, timestamps: false }
)
const DescriptionSchema = new mongoose.Schema(
    {
      short_desc:{type:String},
      long_desc:{type:String},
      additional_desc: {type:AdditonalDescSchema},
      images: {type:Array}
    },
    { _id: false, timestamps: false }
)



const CredentialSubjectSchema = new mongoose.Schema(
    {
        id: {type: String},
        additionalProperties: {type: Object}
    },
    { _id: false, timestamps: false }
)

const CredentialSchema = new mongoose.Schema(
    {
        id: {type: String},
        type:{type:String}
    },
    { _id: false, timestamps: false }
)



const CredsSchema = new mongoose.Schema(
    {
        id: {type:String},
        type: {type:String},
        issuer: {type:String},
        insurance_date: {type: Date},
        credential_subject: {type:CredentialSubjectSchema},
        credential_schema: {type: CredentialSchema}
    },
    { _id: false, timestamps: false }
)

const TagsSchema = new mongoose.Schema(
    {
        description: {type:String}
    },
    { _id: false, timestamps: false }
)


const PersonSchema = new mongoose.Schema(
    {
        name: {type:String},
    },
    { _id: false, timestamps: false}
)

const ResolutionSourceSchema  = new mongoose.Schema(
    {
    description:{type:String},
    type: {type:String},
    link:{type:String}
    },
    { _id: false, timestamps: false }
    )

const AddressSchema = new mongoose.Schema(
    {
        description: {type:String},
        full:{type:String},
        format:{type:String}
   },
   { _id: false, timestamps: false }

)


const JcardSchema = new mongoose.Schema(
    {
        description:{type:String}
    },
    { _id: false, timestamps: false }

)

const ContactSchema = new mongoose.Schema(
    {
    // name:{type:String},
    phone:{type:String},
    email:{type:String}
    },
    { _id: false, timestamps: false }    
)

const ComplainantSchema = new mongoose.Schema(
    {
        person: {type:PersonSchema},
        contact: {type:ContactSchema},
    },
    { _id: false, timestamps: false }
)
const OrgSchema = new mongoose.Schema({
    name:{type:String}
 },
 { _id: false, timestamps: false }
)

const OrganizationSchema =new mongoose.Schema(
    {
        org:{type:OrgSchema},
        contact:{type:ContactSchema},
        person:{type:PersonSchema}
    },
    { _id: false, timestamps: false }
)

const PriceSchema = new mongoose.Schema(
    {
        currency:{type:String},
        value:{type:String}
    },
    { _id: false, timestamps: false }

)


// const StatusSchema = new mongoose.Schema(
//     {
//         id: {type: String, default: () => uuidv4()},
//         status: {type: String, default: "open"},
//         modified_by : {type:Object},
//         closing_reason : {type: String, default:""},
//         status_details: {type:Object},
//         closing_remarks: {type:String, default:""},
//         status_change_date: {type:TimeStampSchema,default:{timestamp:new Date().toISOString()}},
//         // issue_modification_date: {type:TimeStampSchema,default:{timestamp:new Date().toISOString()}},
//         modified_fields:{type:Array}
//     },
//     { _id: false, timestamps: false }
// )
const PricingModelSchema = new mongoose.Schema(
    {
    price: {type:PriceSchema},
    pricing_info:{type:String}
  },
  { _id: false, timestamps: false }
)

const RatingSchema = new mongoose.Schema(
    {
        rating_value:{type:String}
    },
    { _id: false, timestamps: false }

)

const ODRSchema = new mongoose.Schema (
    {
   
       name:{type:String},
       about_info:{type:String},
       url:{type:String},
       organization: {type:OrganizationSchema},
       pricing_model:{type:PricingModelSchema},
       resolution_ratings: {type:RatingSchema}
    },
       { _id: false, timestamps: false }
   )

   const ItemsSchema = new mongoose.Schema (
    {
          id:{type:String}
    },
    { _id: false, timestamps: false }

   )

   const FulfillmentsSchema = new mongoose.Schema({
    id:{type:String},
    state:{type:String}
   },
   { _id: false, timestamps: false }
   )
const OrderDetailsSchema = new mongoose.Schema(
    {
        id:{type:String},
        state:{type:String},
        items:{type:[ItemsSchema]},
        fulfillments:{type:[FulfillmentsSchema]},
        provider_id:{type:String},
        pos_id:{type:String}
    },
    { _id: false, timestamps: false }

)
const DurationSchema  = new mongoose.Schema(
    {
         duration: {type:String}
    },
    { _id: false, timestamps: false }

)

const InfoProvidedSchema = new mongoose.Schema({
    description :{type:DescriptionSchema},
    updated_at: {type:Date, default:new Date().toISOString},
    message_id:{type:String}
},
{ _id: false, timestamps: false }

)
const AdditionalInfoRequiredSchema = new mongoose.Schema(
    {
        info_provided:{type:InfoProvidedSchema}
    },
    { _id: false, timestamps: false }

)

const ComplainantActionSchema = new mongoose.Schema({
    complainant_action: { type: String, required: true },
    remarks: { type: String },
    updated_at: { type:Date,default:new Date().toISOString() },
    updated_by: {
      org: {type: OrgSchema},
      contact: {type:ContactSchema},
      person: { type: PersonSchema }
    },
  },
  { _id: false, timestamps: false }
  );
  
  const RespondentActionSchema = new mongoose.Schema({
    respondent_action: { type: String, required: true },
    remarks: { type: String },
    updated_at: { type:Date,default:new Date().toISOString() },
    updated_by: {
        org: {type: OrgSchema},
        contact: {type:ContactSchema},
        person: { type: PersonSchema }
    },
    cascaded_level: { type: Number }
  },
  { _id: false, timestamps: false }
  );
  
  const IssueActionsSchema = new mongoose.Schema({
    complainant_actions: {type:[ComplainantActionSchema]},
    respondent_actions: {type:[RespondentActionSchema]}
  },
  { _id: false, timestamps: false }
  );

  const ResolutionSchema = new mongoose.Schema(
    {
        id: {type: String, default: () => uuidv4()},
        resolution: {type: String},
        resolution_remarks: {type: String},
        gro_remarks: {type: String},
        dispute_resolution_remarks: {type: String},
        action_triggered: {type: String},
        resolution_action: {type: String}
    },
    { _id: false, timestamps: false }
    )
    
const GroSchema = new mongoose.Schema(
        {
            person: {type: Object},
            contact: {type: Object},
            gro_type: {type: String}
        },
        { _id: false, timestamps: false }
    )
 const FaqSchema = new mongoose.Schema(
        {
        description: {type:String},
        question:{type:String},
        answer:{type:String}
       },
       {
        _id: false, timestamps: false
  })
  
  const ResolutionSupportSchema = new mongoose.Schema(
      {
          respondentChatLink: {type: String},
          respondentEmail: {type: String},
          respondentContact: {type : ContactSchema},
          respondentFaqs: {type: FaqSchema},
          additional_sources: {type: ResolutionSourceSchema},
          gros: {type: [GroSchema]},
          selected_odrs: {type: [ODRSchema]}
        },
        { _id: false, timestamps: false }
        )
        
        
        const RespondentInfoSchema= new mongoose.Schema(
            {
                type: {type:String},
                organization:{type: OrganizationSchema},
                resolution_support: {type: ResolutionSupportSchema}
            },
            { _id: false, timestamps: false }
            )
            
            const ResolutionProviderSchema = new mongoose.Schema(
              {
                   description:{type:String},
                   respondent_info: {type : RespondentInfoSchema}
              },
              { _id: false, timestamps: false }
          )
const IssueSchema = new mongoose.Schema(
    {
        id: {type: String},
        complainant_info: {type: ComplainantSchema},
        order_details: {type:OrderDetailsSchema},
        description: {type:DescriptionSchema},
        category:{type:String},
        sub_category:{type:String},
        issue_type:{type:String,default:"ISSUE"},
        
        source:{type:SourceSchema},
        expected_response_time: {type: DurationSchema},
        expected_resolution_time: {type: DurationSchema},
        status:{type:String},
        issue_actions:{type:IssueActionsSchema},
        created_at: {type:Date,default:new Date().toISOString()},
        updated_at:{type:Date,default:new Date().toISOString()},
        resolution_provider: {type: ResolutionProviderSchema},
        resolution: {type: ResolutionSchema},
        // finalized_odr :{type:ODRSchema},
        rating: {type: String},
        additional_info_required: {type:[AdditionalInfoRequiredSchema]}
    },
    { _id: false, timestamps: false }
)
    





// const TimeStampSchema = new mongoose.Schema(
//     {
//         timestamp:{type:Date,default:new Date().toISOString()}
//     },
//     { _id: false, timestamps: false }
// )
const UserSchema = new mongoose.Schema ({
    org:{type:OrgSchema},
    contact:{type:ContactSchema},
    person:{type:PersonSchema}
})
const RespondentActionStatusSchema =new mongoose.Schema({
    respondent_action:{type:String},
    remarks:{type:String},
    updated_at:{type:Date,default:new Date().toISOString()},
    updated_by:{type:UserSchema},
    cascaded_level :{type:Number}
})
const ComplainantActionStatusSchema = new mongoose.Schema({
    complainant_action:{type:String},
    remarks:{type:String},
    updated_at: {type:Date,default:new Date().toISOString()},
    updated_by:{type:UserSchema}
    
})
const IssueActionSchema = new mongoose.Schema(
    {   
        
        complainant_actions:{type:[ComplainantActionStatusSchema]},
        respondent_actions:{type: [RespondentActionStatusSchema]},
        // id: {type: String, default: () => uuidv4()},
        // status: {type: String, default: "open"},
        // modified_by : {type:Object},
        // closing_reason : {type: String, default:""},
        // status_details: {type:Object},
        // closing_remarks: {type:String, default:""},
        // status_change_date: {type:TimeStampSchema,default:{timestamp:new Date().toISOString()}},
        // // issue_modification_date: {type:TimeStampSchema,default:{timestamp:new Date().toISOString()}},
        // modified_fields:{type:Array}
    },
    { _id: false, timestamps: false }
)


const BapIssueSchema = new mongoose.Schema(
    {
        context:{type:Object},
        network_issue_id: { type: String},
        issue_id_crm_bap: { type: String, default: () => uuidv4()},
        issue:{type:IssueSchema},
        ttl: {type: String},
        resolution_provider: {type: ResolutionProviderSchema},
        resolution: {type: ResolutionSchema},
        transactionId: { type: String},

        status: {type:String},      
        issue_actions:{type:IssueActionsSchema},
        comments: {type:[CommentSchema]},
        issue_category: {type:String},
        sub_category: {type: String},
        issue_type: {type: String},
        buyer: { type: String},
        seller: { type: String},
        provider_name: { type: String},
        CreatedBy: { type: String},
        AssignedFrom: {type: String},
        AssignedTo: { type: String},
        expected_resolution_timestamp: {type: Date},
        expected_response_timestamp: {type: Date},
        complainant_info_np: {type: Object}
        // issue_resolution_remarks: {type: String},
        // grievance_escalation_flag: {type: Boolean},
        // interfacing_app_gro_name: {type: String},
        // interfacing_app_gro_email: {type: String},
        // interfacing_app_gro_phone_number: {type: String},
        // interfacing_app_gro_remarks: {type: String},
        // counterparty_app_gro_name: {type: String},
        // counterparty_app_gro_email: {type: String},
        // counterparty_app_gro_phone_number: {type: String},
        // counterparty_app_gro_remarks: {type: String},
        // cascaded_app_gro_name: {type: String},
        // cascaded_app_gro_email: {type: String},
        // cascaded_app_gro_phone_number: {type: String},
        // cascaded_app_gro_remarks: {type: String},
        // dispute_escalation_flag: {type: Boolean},
        // selected_odrs: {type: [Object]},
        // issues: {type: [Object]},
        // comments: {type: [CommentSchema]},
        // buyer: { type: String},
        // seller: { type: String},
        // provider_name: { type: String},
        // resolution_provider: {type: Object},
        // resolution: {type: Object},
        // on_context: {type: Object},
    },
    { _id: true, timestamps: true }
)


BapIssueSchema.index({userId: 1, createdAt: -1});


// const Issue = mongoose.model('issue',IssueSchema,"issues")
BapIssueSchema.plugin(mongoosePaginate)
const BapIssue = mongoose.model('bap_issue',BapIssueSchema,"bap_issue")


export default BapIssue;