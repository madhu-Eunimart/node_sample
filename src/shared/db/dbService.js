import NoRecordFoundError from "../lib/errors/no-record-found.error.js";
import OrderMongooseModel from './order.js';
import BppOrderMongooseModel from './bpp_order.js';
import CartMongooseModel from "./user_cart.js"
import BPPCartMongooseModel from "./bpp_user_cart.js"
import ProductMongooseModel from './product.js';
import StateMongooseModel from './state.js';
import ProviderMongooseModel from './provider.js';
import UserMongooseModel from './users.js';
import PaymentMongooseModel from "./payments.js";
import Issue from "./issue.js";
import { UserIssueCategories, ApplicationIssueCategories, IssueCategories, SubIssueCategories } from "./issue_categories.js";
import PayoutMongooseModel from "./payout_details.js"
import { v4 as uuidv4 } from 'uuid';
import IssueTypes from "./issue_types.js";
import { CancellationReason } from "./cancellation_db.js";
import { cancellation_reason } from "./cancellation_reason.js";
import { ReturnReasons } from "./return_reason_db.js";
import { returns_reason } from "./return_reason.js";
import BapIssue from "./bap_issue.js";
import LspIssue from "./lsp_issue.js";
import BppIssue from "./bpp_issue.js";
import User from "./user.js"
import { query } from "express";
import ProductCategory from "./product_category.js";
import Users from "./users.js";
import searchRequests from "./search_request.js";
import { IsoAndDateToDateConverter } from "../utils/isoDateConversion.js";
import buyerFinderFees from './buyer_finder_fee.js'
import mergeDeep from "merge-deep";
import { ActionsTriggered, ComplainantActions, ResolutionAction, RespondentActions, RespondentTypes } from "./igm_enums.js";
import OndcCategory from "./ondc_categories_v1.1.0.js";
import OnActionResults from "./on_search_results.js";
let issue_categories = [
    {
        "category": "ORDER",
        "code": "001",
        "description": "Incorrect product received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "P1D",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "ORDER",
        "code": "002",
        "description": "Damaged product received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "P1D",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "ORDER",
        "code": "003",
        "description": "Lower quality product received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "P1D",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "ORDER",
        "code": "004",
        "description": "Wrong quantity or number of product(s) received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "P1D",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "PAYMENT",
        "code": "021",
        "description": "Amount charged for an Order is different than what was shown",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "P1D",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "PAYMENT",
        "code": "022",
        "description": "Refund not received for return(s) or cancellation(s)",
        "raised_by": "Buyer",
        "raised_on": "Whoever collects payment",
        "expected_response_time": "P1D",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "PAYMENT",
        "code": "023",
        "description": "Invoice not received",
        "raised_by": "Buyer or Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "PT48H",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "PAYMENT",
        "code": "024",
        "description": "Incorrect Invoice",
        "raised_by": "Buyer or Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "PT48H",
        "expected_resolution_time": "P7D"
    },
    {
        "category": "FULFILLMENT",
        "code": "041",
        "description": "Order not received within TAT promised",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "PT12H",
        "expected_resolution_time": "PT12H"
    },
    {
        "category": "FULFILLMENT",
        "code": "042",
        "description": "Torn or damaged packaging",
        "raised_by": "Buyer",
        "raised_on": "Whoever collects payment",
        "expected_response_time": "PT6H",
        "expected_resolution_time": "PT6H"
    },
    {
        "category": "FULFILLMENT",
        "code": "043",
        "description": "Status not updated",
        "raised_by": "Buyer or Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "PT3H",
        "expected_resolution_time": "PT3H"
    },
    {
        "category": "TRANSACTION",
        "code": "081",
        "description": "Violation of transaction contracts (for mandatory attributes, values provided), also includes cases of malformed payload",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "PT1H",
        "expected_resolution_time": "3 days"
    },
    {
        "category": "TRANSACTION",
        "code": "082",
        "description": "Incorrect image(s) for item(s)",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "PT1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "TRANSACTION",
        "code": "083",
        "description": "Illegal item(s) shown",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "PT3H",
        "expected_resolution_time": "PT3H"
    },
    {
        "category": "TRANSACTION",
        "code": "084",
        "description": "Invalid Assortment (Category mismatch vis-e-vis item searched",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "PT72H",
        "expected_resolution_time": "PT72H"
    },
    {
        "category": "AGENT",
        "code": "122",
        "description": "",
        "raised_by": "Affected Participant",
        "raised_on": "",
        "expected_response_time": "PT1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "ITEM",
        "code": "123",
        "description": "",
        "raised_by": "Affected Participant",
        "raised_on": "",
        "expected_response_time": "PT1H",
        "expected_resolution_time": "P1D"
    }
]

let issue_types = [
    {
        "level": 1,
        "data": "ISSUE"
    },
    {
        "level": 2,
        "data": "GRIEVANCE"
    },
    {
        "level": 3,
        "data": "DISPUTE"
    }
]




let UserGrievances = [

    {
        "category": "contract",
        "code": "101",
        "description": "Return terms not followed",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "contract",
        "code": "102",
        "description": "Cancellation terms not followed",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "order",
        "code": "001",
        "description": "Incorrect product received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "24 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "order",
        "code": "002",
        "description": "Damaged product received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "24 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "order",
        "code": "003",
        "description": "Lower quality product received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "24 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "order",
        "code": "004",
        "description": "Wrong quantity or number of product(s) received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "24 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "billing",
        "code": "021",
        "description": "Amount charged for an order is different than what was shown",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "24 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "billing",
        "code": "022",
        "description": "Refund not received for return(s) or cancellation(s)",
        "raised_by": "Buyer",
        "raised_on": "Whoever collects payment",
        "expected_response_time": "24 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "Fulfillment",
        "code": "041",
        "description": "Order not received within TAT promised",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "12 hrs",
        "expected_resolution_time": "12 hrs"
    },
    {
        "category": "Fulfillment",
        "code": "042",
        "description": "Torn or damaged packaging",
        "raised_by": "Buyer",
        "raised_on": "Whoever collects payment",
        "expected_response_time": "6 hrs",
        "expected_resolution_time": "6 hrs"
    },
    {
        "category": "billing",
        "code": "023",
        "description": "Invoice not received",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "48",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "billing",
        "code": "024",
        "description": "Incorrect Invoice",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "48 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "Fulfillment",
        "code": "043",
        "description": "Status not updated",
        "raised_by": "Buyer",
        "raised_on": "Seller App",
        "expected_response_time": "3 hrs",
        "expected_resolution_time": "3 hrs"
    },
]


let ApplicationGrievances = [
    {
        "category": "contract",
        "code": "101",
        "description": "Return terms not followed",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "contract",
        "code": "102",
        "description": "Cancellation terms not followed",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "compliance",
        "code": "081",
        "description": "Violation of transaction contracts (for mandatory attributes, values provided), also includes cases of malformed payload",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "3 days"
    },
    {
        "category": "compliance",
        "code": "082",
        "description": "Incorrect image(s) for item(s)",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "compliance",
        "code": "083",
        "description": "Illegal item(s) shown",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "3 hrs",
        "expected_resolution_time": "3 hrs"
    },
    {
        "category": "compliance",
        "code": "084",
        "description": "Invalid Assortment (Category mismatch vis-e-vis item searched",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "72 hrs",
        "expected_resolution_time": "72 hrs"
    },
    {
        "category": "operations",
        "code": "062",
        "description": "Response time not acceptable for buyer experience",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "12 hrs",
        "expected_resolution_time": "12 hrs"
    },
    {
        "category": "billing",
        "code": "023",
        "description": "Invoice not received",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "48",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "billing",
        "code": "024",
        "description": "Incorrect Invoice",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "48 hrs",
        "expected_resolution_time": "7 days"
    },
    {
        "category": "Fulfillment",
        "code": "043",
        "description": "Status not updated",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "3 hrs",
        "expected_resolution_time": "3 hrs"
    },
    {
        "category": "operations",
        "code": "061",
        "description": "Endpoint not accessible",
        "raised_by": "Participant",
        "raised_on": "Affected Participant",
        "expected_response_time": "3 hrs",
        "expected_resolution_time": "3 hrs"
    },
    {
        "category": "operations",
        "code": "063",
        "description": "Security Policy Violation (Injection attacks, Virus threats etc)",
        "raised_by": "Any participant",
        "raised_on": "Affected Participant",
        "expected_response_time": "2 hrs",
        "expected_resolution_time": "2 hrs"
    },
    {
        "category": "contract",
        "code": "104",
        "description": "Network agreement terms not followed",
        "raised_by": "Participant",
        "raised_on": "Participant not following terms",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "contract",
        "code": "105",
        "description": "Legal terms and conditions not followed",
        "raised_by": "Participant",
        "raised_on": "Participant not following terms",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "Settlement",
        "code": "121",
        "description": "Incorrect amount settled",
        "raised_by": "Affected Participant",
        "raised_on": "Participant providing settlement data",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "Settlement",
        "code": "122",
        "description": "Settlement delayed",
        "raised_by": "Affected Participant",
        "raised_on": "Participant providing settlement data",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    },
    {
        "category": "Settlement",
        "code": "123",
        "description": "Recon issue incomplete or incorrect",
        "raised_by": "Affected Participant",
        "raised_on": "Participant providing settlement data",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D"
    }

]

let SubIssueCategoriesData = [
    {
        "category": "QUALITY",
        "code": "0",
        "description": "denotes the quality in it",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D",
        "parent_category": "ORDER"
    },
    {
        "category": "QUALITY",
        "code": "1",
        "description": "denotes the quality in it",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D",
        "parent_category": "PAYMENT"
    },
    {
        "category": "QUALITY",
        "code": "2",
        "description": "denotes the quality in it",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D",
        "parent_category": "FULFILLMENT"
    },
    {
        "category": "QUALITY",
        "code": "3",
        "description": "denotes the quality in it",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D",
        "parent_category": "TRANSACTION"
    },
    {
        "category": "QUALITY",
        "code": "4",
        "description": "denotes the quality in it",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D",
        "parent_category": "AGENT"
    },
    {
        "category": "QUALITY",
        "code": "5",
        "description": "denotes the quality in it",
        "raised_by": "Buyer App",
        "raised_on": "Seller App",
        "expected_response_time": "T1H",
        "expected_resolution_time": "P1D",
        "parent_category": "ITEM"
    }
]

let ComplainantActionsData = [
    {
        "action": "OPEN"
    },
    {
        "action": "ESCALATE"
    },
    {
        "action": "CLOSE"
    }
]

let RespondentActionsData = [
    {
        "action": "PROCESSING"
    },
    {
        "action": "CASCADED"
    },
    {
        "action": "RESOLVED"
    },
    {
        "action": "NEED-MORE-INFO"
    }
]

let RespondentTypesData = [
    {
        "type": "INTERFACING-NP"
    },
    {
        "type": "TRANSACTION-COUNTERPARTY-NP"
    },
    {
        "type": "CASCADED-COUNTERPARTY-NP"
    }
]

let ActionsTriggeredData = [
    {
        "action": "REFUND"
    },
    {
        "action": "REPLACEMENT"
    },
    {
        "action": "CANCEL"
    },
    {
        "action": "NO ACTION"
    }
]

let ResolutionActionData = [
    {
        "action": "REJECT"
    },
    {
        "action": "RESOLVE"
    }
]

let user = [
    {
        "username": "lekhh",
        "password": "abc",
        "confirm_password": "abc",
        "usertype": "buyer"

    },
    {
        "username": "Sramitha",
        "password": "srami",
        "confirm_password": "srami",
        "usertype": "buyer"

    },
    {
        "username": "Saira",
        "password": "saira",
        "confirm_password": "saria",
        "usertype": "buyer"

    },
    {
        "username": "Thanmai",
        "password": "thanu",
        "confirm_password": "thanu",
        "usertype": "buyer"

    },
    {
        "username": "Rupa",
        "password": "123",
        "confirm_password": "123",
        "usertype": "buyer"

    },
    {
        "username": "blesson",
        "password": "bless",
        "confirm_password": "bless",
        "usertype": "buyer"

    },

    {
        "username": "Drupadh",
        "password": "drups",
        "confirm_password": "dryps",
        "usertype": "buyer"

    },
    {
        "username": "Sridhar",
        "password": "sri",
        "confirm_password": "sri",
        "usertype": "buyer_admin"

    },
    {
        "username": "Praveen",
        "password": "189",
        "confirm_password": "189",
        "usertype": "buyer_admin"

    },
    {
        "username": "Harnath",
        "password": "hari",
        "confirm_password": "hari",
        "usertype": "buyer_admin"

    },
    {
        "username": "PJ",
        "password": "xyz",
        "confirm_password": "xyz",
        "usertype": "buyer_admin"

    },
    {
        "username": "kausic",
        "password": "jai",
        "confirm_password": "jai",
        "usertype": "buyer_admin"

    }
]
const seedDB = async () => {
    await IssueCategories.deleteMany({});
    await UserIssueCategories.deleteMany({});
    await ReturnReasons.deleteMany({})
    await IssueTypes.deleteMany({})
    await SubIssueCategories.deleteMany({})
    await IssueCategories.insertMany(issue_categories)
    await UserIssueCategories.insertMany(UserGrievances)
    await ApplicationIssueCategories.deleteMany({});
    await ApplicationIssueCategories.insertMany(ApplicationGrievances)
    await CancellationReason.deleteMany({});
    await CancellationReason.insertMany(cancellation_reason)
    await ReturnReasons.insertMany(returns_reason);
    await IssueTypes.insertMany(issue_types)
    await SubIssueCategories.insertMany(SubIssueCategoriesData)
    await User.deleteMany({})
    try {
        await User.insertMany(user)
    } catch (err) {
        if (err) { console.log("cannot insert duplicate test data") }

    }

    await ComplainantActions.deleteMany({})
    try {
        await ComplainantActions.insertMany(ComplainantActionsData)
    } catch (err) {
        if (err) { console.log("cannot insert duplicate test data") }
    }
    await RespondentActions.deleteMany({})
    try {
        await RespondentActions.insertMany(RespondentActionsData)
    } catch (err) {
        if (err) { console.log("cannot insert duplicate test data") }
    }
    await RespondentTypes.deleteMany({})
    try {
        await RespondentTypes.insertMany(RespondentTypesData)
    } catch (err) {
        if (err) { console.log("cannot insert duplicate test data") }
    }
    await ActionsTriggered.deleteMany({})
    try {
        await ActionsTriggered.insertMany(ActionsTriggeredData)
    } catch (err) {
        if (err) { console.log("cannot insert duplicate test data") }
    }
    await ResolutionAction.deleteMany({})
    try {
        await ResolutionAction.insertMany(ResolutionActionData)
    } catch (err) {
        if (err) { console.log("cannot insert duplicate test data") }
    }
}

async function AddSearchRequest(searchRequest) {
    return await searchRequests.create(searchRequest).then(response => {
        return response;
    }).catch(err => {
        console.log(err)
    })
}
async function GetSearchRequest(query) {
    return await searchRequests.findOne(query).then(response => {
        return response;
    }).catch(err => {
        console.log(err)
    })
}

async function FindUserGrievanceCategories() {
    return await UserIssueCategories.find({}).lean()


}

async function FindComplainantActions() {
    return await ComplainantActions.find({}).lean()
}

async function FindRespondentActions() {
    return await RespondentActions.find({}).lean()
}

async function FindRespondentTypes() {
    return await RespondentTypes.find({}).lean()
}

async function FindActionsTriggered() {
    return await ActionsTriggered.find({}).lean()
}

async function FindResolutionAction() {
    return await ResolutionAction.find({}).lean()
}

async function FindSubCategoriesList(issue_category) {
    return await SubIssueCategories.find({ parent_category: issue_category }).lean()
}

async function FindIssueCategoriesList() {
    return await IssueCategories.find({}).lean()
}

async function FindApplicationGrievanceCategories() {
    return await ApplicationIssueCategories.find({}).lean()
}

/**
* Add address
 * @param {String} createBy 
 * @param {Object} data 
 */
const addAddressById = async (createBy, data) => {
    return await UserMongooseModel.findOneAndUpdate(
        {
            id: createBy
        },
        {
            $push: { "details.address": data }
        },
        { upsert: true }
    )
};

/**
* Update address
 * @param {String} createBy 
 * @param {Object} data 
 */
const UpdateAddressById = async (createBy, payload) => {
    var data = await getUserById(createBy)
    var result = data.details?.address
    result.map((i) => {
        if (i.id === payload.id) {
            i.Name = payload.Name || i.Name
            i.address_line_1 = payload.address_line_1 || i.address_line_1
            i.address_line_2 = payload.address_line_2 || i.address_line_2
            i.address_line_3 = payload.address_line_3 || i.address_line_3
            i.phone_number = payload.phone_number || i.phone_number
            i.email = payload.email || i.email
            i.state = payload.state || i.state
            i.pincode = payload.pincode || i.pincode
            i.city = payload.city || i.city;
            return;


        }
    })
    return await UserMongooseModel.findOneAndUpdate(
        {
            id: createBy
        },
        {
            details: { address: result }
        },
        { upsert: true }
    )
};




const DeleteAddressById = async (user_id, address_id) => {
    var data = await getUserById(user_id)
    var result = data.details?.address
    var data_after_delete = result.filter(i => i.id !== address_id)
    // console.log(data_after_delete);
    return await UserMongooseModel.findOneAndUpdate(
        {
            id: user_id
        },
        {
            details: { address: data_after_delete }
        }
    )
};


/**
* Get payment
 * @param {String} UserId 
 */
const getPaymentByUserId = async (createdBy, pageNo, perPage) => {
    let extra_fields = { _id: 0, __v: 0 }
    return await PaymentMongooseModel.paginate({ createdBy: createdBy }, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            // console.log(e);
            throw new NoRecordFoundError();
        });
    // const payment = await PaymentMongooseModel.find({
    //     createdBy: createdBy
    // });

    // if (!(payment || payment.length))
    //     throw new NoRecordFoundError();
    // else
    //     return payment;
};

/**
* Get payment
 * @param {String} UserId 
 */
const getAllPayments = async (pageNo, perPage) => {
    let extra_fields = { _id: 0, __v: 0 }
    return await PaymentMongooseModel.paginate({}, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            // console.log(e);
            throw new NoRecordFoundError();
        });
    // const payment = await PaymentMongooseModel.find({
    //     createdBy: createdBy
    // });

    // if (!(payment || payment.length))
    //     throw new NoRecordFoundError();
    // else
    //     return payment;
};

const downloadPaymentByUserId = async (createdBy) => {
    const payment = await PaymentMongooseModel.find({
        createdBy: createdBy
    });

    if (!(payment || payment.length))
        throw new NoRecordFoundError();
    else
        return payment;
};

const getPaymentById = async (id) => {
    const payment = await PaymentMongooseModel.find({
        id: id
    });

    if (!(payment || payment.length))
        throw new NoRecordFoundError();
    else
        return payment?.[0];
};


const getPaymentByStatus = async (status) => {
    const payment = await PayoutMongooseModel.find({
        paymentStatus: status
    });
    if (!(payment || payment.length))
        throw new NoRecordFoundError();
    else
        return payment;
};


/**
* Update reconciliation
 * @param {String} UserId 
 */
const updatePaymentById = async (id, paymentSchema) => {
    return await PaymentMongooseModel.findOneAndUpdate(
        {
            id: id
        },
        {
            ...paymentSchema
        },
        { upsert: true }
    )
};

/**
* Get Orders
 * @param {String} transactionId 
 * @param {Object} orderSchema 
 */
const getBppOrderByUserId = async (createdBy, pageNo, perPage) => {
    let extra_fields = { confirm: 0, onConfirm: 0, _id: 0, __v: 0 }
    return await BppOrderMongooseModel.paginate({ CreatedBy: createdBy }, Object.assign({ page: pageNo, select: extra_fields, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });


    // const order = await OrderMongooseModel.find({
    //     CreatedBy: createdBy
    // }).sort({ createdAt: -1 });

    // if (!(order || order.length))
    //     throw new NoRecordFoundError();
    // else
    //     for (let i = 0; i < order.length; i++) {
    //         if (!order[i]["state"]) {
    //             order[i]["state"] = "Accepted"
    //         }
    //     }
    // return order;
};

const getAllBppOrders = async (pageNo, perPage) => {
    let extra_fields = { confirm: 0, onConfirm: 0, _id: 0 }
    return await BppOrderMongooseModel.paginate({}, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
    // const order = await OrderMongooseModel.find({}).sort({createdAt: -1})
    // if (!(order || order.length))
    //     throw new NoRecordFoundError();
    // else
    //     for (let i = 0; i < order.length; i++) {
    //         if (!order[i]["state"]) {
    //             order[i]["state"] = "Accepted"
    //         }
    //     }
    // return order;
}


/**
 * get the order with passed transaction id from the database
 * @param {String} transactionId 
 * @returns 
 */
const getBppOrderByTransactionId = async (transactionId, provider_id = undefined) => {
    const order = await BppOrderMongooseModel.find({
        transactionId: transactionId,
        ...(provider_id && { "provider.id": provider_id })
    }, { "confirm": 0, _id: 0, __v: 0 }).lean();

    if (!(order || order.length))
        throw new NoRecordFoundError();
    else
        return order?.[0];
};

const getBppOrderById = async (orderId) => {
    const order = await BppOrderMongooseModel.find({
        "id": orderId
    }, { "confirm": 0, "onConfirm": 0, "_id": 0, "__v": 0 }).lean();

    if (!(order || order.length))
        throw new NoRecordFoundError();
    else
        return order?.[0];
};

/**
* Get Orders
 * @param {String} transactionId 
 * @param {Object} orderSchema 
 */
const getOrderByUserId = async (createdBy, pageNo, perPage) => {
    let extra_fields = { confirm: 0, onConfirm: 0, _id: 0, __v: 0 }
    return await OrderMongooseModel.paginate({ CreatedBy: createdBy }, Object.assign({ page: pageNo, select: extra_fields, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });


    // const order = await OrderMongooseModel.find({
    //     CreatedBy: createdBy
    // }).sort({ createdAt: -1 });

    // if (!(order || order.length))
    //     throw new NoRecordFoundError();
    // else
    //     for (let i = 0; i < order.length; i++) {
    //         if (!order[i]["state"]) {
    //             order[i]["state"] = "Accepted"
    //         }
    //     }
    // return order;
};


const getAllOrders = async (pageNo, perPage) => {
    let extra_fields = { confirm: 0, onConfirm: 0, _id: 0 }
    return await OrderMongooseModel.paginate({}, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
    // const order = await OrderMongooseModel.find({}).sort({createdAt: -1})
    // if (!(order || order.length))
    //     throw new NoRecordFoundError();
    // else
    //     for (let i = 0; i < order.length; i++) {
    //         if (!order[i]["state"]) {
    //             order[i]["state"] = "Accepted"
    //         }
    //     }
    // return order;
}
const ListAllOrders = async (query = {}, pageNo, perPage) => {
    // let extra_fields = { confirm: 0, onConfirm: 0 }
    // const order = await OrderMongooseModel.paginate({}, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
    const order = await OrderMongooseModel.find(query).sort({ createdAt: -1 })

    if (!(order || order.length))
        throw new NoRecordFoundError();
    else
        return order;
}

const downloadOrderByUserId = async (createdBy) => {
    const order = await OrderMongooseModel.find({
        CreatedBy: createdBy
    }).sort({ createdAt: -1 });

    if (!(order || order.length))
        throw new NoRecordFoundError();
    else
        for (let i = 0; i < order.length; i++) {
            if (!order[i]["state"]) {
                order[i]["state"] = "Accepted"
            }
        }
    return order;
};

/**
* update order
 * @param {String} transactionId 
 * @param {Object} orderSchema 
 */
const addOrUpdateOrderWithTransactionId = async (transactionId, orderSchema = {}, provider_id = undefined) => {
    return await OrderMongooseModel.findOneAndUpdate(
        {
            transactionId: transactionId,
            ...(provider_id && { "provider.id": provider_id })
        },
        {
            ...orderSchema
        },
        { upsert: true, runValidators:true }
    );

};

const UpdateOrderWithTransactionId = async (transactionId, status) => {
    return await OrderMongooseModel.findOneAndUpdate(
        {
            transactionId: transactionId
        },
        {
            UpdateOrderWithTransactionId: status
        },
        { upsert: true,runValidators:true }
    );

};

/**
 * get the order with passed transaction id from the database
 * @param {String} transactionId 
 * @returns 
 */
const getOrderByTransactionId = async (transactionId, provider_id = undefined) => {
    const order = await OrderMongooseModel.find({
        transactionId: transactionId,
        ...(provider_id && { "provider.id": provider_id })
    }, { "confirm": 0, _id: 0, __v: 0 }).lean();

    if (!(order || order.length))
        throw new NoRecordFoundError();
    else
        return order?.[0];
      
};

const getOrderById = async (orderId) => {
    const order = await OrderMongooseModel.find({
        "id": orderId
    },{"confirm":0,"onConfirm":0,"_id":0,"__v":0},{runValidators:true}).lean();

    if (!(order || order.length))
        throw new NoRecordFoundError();
    else
        return order?.[0];
};


const getallOrdersQuery = async (query) => {
    const order = await OrderMongooseModel.find(query, { _id: 0 });
    return order;
};


const getProductById = async (productId) => {
    const product = await ProductMongooseModel.find({
        id: productId
    }).lean();


    
    if (!(product || product.length))
        throw new NoRecordFoundError();
    else {
        var provider_id = product?.[0].provider_id
        var provider = await getProviderById(provider_id)
        if (!(provider || provider.length))
            throw new NoRecordFoundError();

        product[0].provider_id = provider.id

        return product?.[0];
    }
};

const getStateByStateName = async (stateName) => {
    const state = await StateMongooseModel.find({
        "name": stateName
    }).lean();

    if (!(state || state.length))
        throw new NoRecordFoundError();
    else
        return state?.[0];
};

const searchProduct = async (query, options) => {
    const product = await ProductMongooseModel.find(query, { _id: 0, __v: 0, createdAt: 0, updatedAt: 0, created_by: 0, provider_id: 0 }).lean();
    if (!(product || product.length)) {
        throw new NoRecordFoundError
    }
    return product;
}

const getAllProviders = async (query) => {
    const providers = await ProviderMongooseModel.find().lean();
    if (!(providers || providers.length)) {
        throw new NoRecordFoundError
    }
    return providers;
}
const getAllActiveProviders = async (query) => {
    const providers = await ProviderMongooseModel.find({ "company_details.is_enabled": true }).lean();
    if (!(providers || providers.length)) {
        throw new NoRecordFoundError
    }
    return providers;
}
const searchProductbyName = async (name) => {
    const product = await ProductMongooseModel.find({
        "descriptor.name": new RegExp(name, 'i')
    }).lean();
    if (!(product || product.length)) {
        throw new NoRecordFoundError();
    }
    else {
        for (let i = 0; i < product.length; i++) {
            var providerDetails = await getProviderById(product[i]["provider_id"])
            product[i]["provider_details"] = providerDetails
        }
        return product;
    }
};

const getProviderById = async (providerId) => {
    const provider = await ProviderMongooseModel.find({
        "id": providerId
    }).lean();

    if (!(provider || provider.length))
        throw new NoRecordFoundError();
    else
        return provider?.[0];
};

const createProduct = async (ProductSchema = {}) => {
    let product = await ProductMongooseModel.create(ProductSchema);
    return product;
};

const listProduct = async (pageNo, perPage) => {
    let extra_fields = { _id: 0, __v: 0 }
    return await ProductMongooseModel.paginate({}, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
}

const viewProduct = async (id) => {
    return await ProductMongooseModel.findOne(
        { "id": id }
    ).lean();
}

const UpdateProduct = async (externalId, ProductSchema = {}) => {
    return await ProductMongooseModel.findOneAndUpdate(
        {
            external_id: externalId
        },
        {
            ...ProductSchema
        }
    );
}

const getProviders = async () => {
    const providers = await ProviderMongooseModel.find({}, { _id: 0, __v: 0 });
    // console.log(providers);
    return providers
};

const getProviderByName = async (providerName) => {

    const provider = await ProviderMongooseModel.find({
        "descriptor.name": new RegExp(providerName, 'i')
    }).lean();

    if (!(provider || provider.length))
        throw new NoRecordFoundError();
    else
        return provider;
};

/**
* update cart
 * @param {Object} query 
 * @param {Object} cart 
 */
const addOrUpdateBPPCartWithTransactionId = async (query, cart = {}) => {
    return await BPPCartMongooseModel.findOneAndUpdate(
        query,
        cart,
        { upsert: true, useFindAndModify: false },
    );

};

/**
+* delete cart
+ * @param {String} transactionId 
+ * @param {Object} cart 
+ */
const deleteBPPCartWithTransactionId = async (query) => {
    return await BPPCartMongooseModel.findOneAndDelete(query);
};


/**
* update order
 * @param {Object} UsersSchema
 */
const addOrUpdateUsers = async (UsersSchema = {}) => {


    return await UserMongooseModel.findOneAndUpdate(
        {
            details: UsersSchema
        },
        { upsert: true }
    );

};


const getBPPCartByTransactionId = async (query) => {
    const cart = await BPPCartMongooseModel.find(query);
    if (!(cart || cart.length))
        throw new NoRecordFoundError();
    else
        return cart?.[0];
};


const getCartByTransactionId = async (cartId, provider_id = undefined) => {
    const cart = await CartMongooseModel.find({
        transactionId: cartId,
        ...(provider_id && { providerId: provider_id })
    });
    if (!(cart || cart.length))
        throw new NoRecordFoundError();
    else
        return cart?.[0];
};

const listCartByTransactionId = async (query) => {
    const cart = await CartMongooseModel.find(query, { _id: 0, __v: 0 });
    if (!(cart || cart.length))
        throw new NoRecordFoundError();
    else
        return cart;
};

const getUserById = async (userId) => {
    const user = await UserMongooseModel.find({
        id: userId
    }, { _id: 0, __v: 0 });

    if (!(user || user.length))
        throw new NoRecordFoundError();
    else {
        return user?.[0];
    }
};


// const createIssue = async (IssueSchema) => {
//     return await Issue.create( IssueSchema );
// };

// // const createIssue =async (IssueSchema) => {
// //     return await IssuesModel.create( IssueSchema );
// // // }

// const FindIssue = async (message_id)=>{
//     return await Issue.find(
//         {message_id:message_id}
//     )
// }

const FindIssue = async (issue_id) => {
    return await Issue.findOne(
        { "issue_id": issue_id }
    ).lean();
}

const FindBapIssueStatusNp = async (issue_id) => {
    return await BapIssue.findOne(
        { "network_issue_id": issue_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
    ).lean()
}

const FindBppIssueStatusNp = async (issue_id) => {
    return await BppIssue.findOne(
        { "network_issue_id": issue_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
    ).lean()
}

const FindLspIssueStatusNp = async (issue_id) => {
    return await LspIssue.findOne(
        { "network_issue_id": issue_id, "AssignedTo": undefined }
    )
}

const FindBapIssueStatus = async (issue_id) => {
    return await BapIssue.findOne(
        { "network_issue_id": issue_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
    ).lean();
}


const FindBppIssueStatus = async (issue_id) => {
    return await BppIssue.findOne(
        { "network_issue_id": issue_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
    ).lean();
}

const FindLspIssueStatus = async (issue_id) => {
    return await LspIssue.findOne(
        { "network_issue_id": issue_id }
    ).lean();
}

const FindBapIssue = async (issue_id) => {
    return await BapIssue.findOne(
        { "issue_id_crm_bap": issue_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
    ).lean();
}
const FindBapIssueDuplicate = async (issue_id, network_id) => {
    if (network_id == "undefined") {
        return await BapIssue.findOne(
            { "issue_id_crm_bap": issue_id, $or: [{ "network_issue_id": { $exists: false } }, { "network_issue_id": "" }] }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
        ).lean();
    } else {
        return await BapIssue.findOne(
            { "issue_id_crm_bap": issue_id, "network_issue_id": network_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
        ).lean();
    }
}

const FindBppIssueDuplicate = async (issue_id, network_id) => {
    if (network_id == "undefined") {
        return await BppIssue.findOne(
            { "issue_id_crm_bpp": issue_id, $or: [{ "network_issue_id": { $exists: false } }, { "network_issue_id": "" }] }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
        ).lean();
    } else {
        return await BppIssue.findOne(
            { "issue_id_crm_bpp": issue_id, "network_issue_id": network_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
        ).lean();
    }
}

const FindBppIssue = async (issue_id) => {
    return await BppIssue.findOne(
        { "issue_id_crm_bpp": issue_id }, { resolution_provider: { respondent_info: { organization: { person: { creds: 0 } } } }, issue: { complainant_info: { person: { creds: 0 } } } }
    ).lean();
}

const FindLspIssue = async (issue_id) => {
    return await LspIssue.findOne(
        { "issue_id_crm_lsp": issue_id }
    ).lean();
}
// const addToIssuesList = async (IssueSchema) => {
//     var filter = {transactionId : IssueSchema.transactionId}
//     var IssueList = await IssuesModel.findOne(filter)
//     if (!(IssueList)){        
//         var data = []
//         var issueSchema = {
//         transactionId : IssueSchema.transactionId,
//         data : data.push(IssueSchema),
//         }
//         return await createIssue(issueSchema);
//     }
//     else {
//         IssueList.data=IssueList.data.$push(IssueSchema)
//         return await IssuesModel.findOneAndUpdate(filter,IssueList)
//     }
// }

/**
* Get payment
 * @param {String} UserId 
 */
const getPayoutsByUserId = async (query, pageNo, perPage) => {
    let extra_fields = { _id: 0, __v: 0 }
    return await PayoutMongooseModel.paginate(query, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            // console.log(e);
            throw new NoRecordFoundError();
        });


    // const payout = await PayoutMongooseModel.find({})
    // return payout
    // const payment = await PaymentMongooseModel.find({
    //     createdBy: createdBy
    // });

    // if (!(payment || payment.length))
    //     throw new NoRecordFoundError();
    // else
    //     return payment;
};

const downloadPayoutsByUserId = async () => {
    const payout = await PayoutMongooseModel.find({}, { _id: 0, __v: 0 }).sort({ createdAt: -1 })
    console.log("payout download details"); //, payout
    return payout
    // const payment = await PaymentMongooseModel.find({
    //     createdBy: createdBy
    // });

    // if (!(payment || payment.length))
    //     throw new NoRecordFoundError();
    // else
    //     return payment;
};

const getPayoutById = async (query) => {
    const payout = await PayoutMongooseModel.find(query);

    if (!(payout || payout.length))
        throw new NoRecordFoundError();
    else {
        return payout?.[0];
    }
};

const getPayoutByPaymentTransactionId = async (payoutId) => {
    const payout = await PayoutMongooseModel.find({
        paymentTransactionId: payoutId
    });

    if (!(payout || payout.length))
        throw new NoRecordFoundError();
    else {
        return payout?.[0];
    }
};


const createPayOut = async (PayOutSchema) => {
    return await PayoutMongooseModel.create(PayOutSchema);
   
}

const updatePayoutByPaymentTransactionId = async (payoutId, payoutSchema) => {
    return await PayoutMongooseModel.findOneAndUpdate(
        {
            paymentTransactionId: payoutId
        },
        {
            ...payoutSchema
        },
        {
         runValidators:true
        }
    );
};

const updatePayoutDetails = async (query, data) => {
    return await PayoutMongooseModel.updateMany(query, data);
};



// const FindIssueHistory = async (transaction_id)=>{
//     const data = await Issue.find(
//         {transaction_id:transaction_id,CreatedBy:created_by}
//     )
//     // data.col.aggregate(
//     //     [
//     //         { "$group": {
//     //             "_id": "$transaction_id",
//     //             "count": { "$sum": 1 }
//     //         }}
//     //     ],
//     //     function(err,docs) {
//     //        if (err) // console.log(err);
//     //        // console.log( docs );
//     //     }
//     // );
// }

// const FindIssueHistoryList = async ()=>{
//     return await Issue.aggregate([
//         {"$group": {_id:"$transaction_id",buyer:{$first:"$buyer"},data:{$addToSet:"$data"},buyers:{$addToSet:"$buyer"}}}
//     ])
// }

// const FindIssueList = async ()=>{
//     return await Issue.aggregate([
//         {"$group": {_id:"$message_id",data:{$addToSet:"$data"}}}
//     ])
// }

// const FindIssueList = async () => {
//     return await Issue.aggregate([
//         {"$group": {_id:"$issue_id",transaction_id:{$first: "$transaction_id"},buyer:{$first:"$buyer"},seller:{$last: "$seller"},provider_name:{$last: "$provider_name"},issue_category:{$first: "$issue_category"},data:{$addToSet:"$data"}}}
//     ])
// }



// const FindIssueHistory = async (transaction_id)=>{
//     const data = await Issue.find(
//         {transaction_id:transaction_id,CreatedBy:created_by}
//     )
//     // data.col.aggregate(
//     //     [
//     //         { "$group": {
//     //             "_id": "$transaction_id",
//     //             "count": { "$sum": 1 }
//     //         }}
//     //     ],
//     //     function(err,docs) {
//     //        if (err) // console.log(err);
//     //        // console.log( docs );
//     //     }
//     // );
// }

// const FindIssueHistoryList = async ()=>{
//     return await Issue.aggregate([
//         {"$group": {_id:"$transaction_id",buyer:{$first:"$buyer"},data:{$addToSet:"$data"},buyers:{$addToSet:"$buyer"}}}
//     ])
// }

// const FindIssueList = async ()=>{
//     return await Issue.aggregate([
//         {"$group": {_id:"$message_id",data:{$addToSet:"$data"}}}
//     ])
// }

// const FindIssueList = async () => {
//     return await Issue.aggregate([
//         {"$group": {_id:"$issue_id",transaction_id:{$first: "$transaction_id"},buyer:{$first:"$buyer"},seller:{$last: "$seller"},provider_name:{$last: "$provider_name"},issue_category:{$first: "$issue_category"},data:{$addToSet:"$data"}}}
//     ])
// }

const CreateBapIssue = async (request) => {
    let { message: message, context: context } = request
    let complainant_info_np = request?.complainant_info_np
    let buyer = request?.buyer
    if (buyer == undefined)
        buyer = context?.bap_id
    let seller = request?.seller
    if (seller == undefined)
        seller = context?.bpp_id
    let provider_name = request?.provider_name
    if (provider_name == undefined)
        provider_name = context?.bpp_id
    let CreatedBy = request?.CreatedBy
    let AssignedFrom = request?.AssignedFrom
    let AssignedTo = request?.AssignedTo

    let issue = message?.issue
    if (issue?.id == undefined)
        issue.id = uuidv4()
    let network_issue_id = issue?.id
    let issue_id_crm_bap = request?.issue_id_crm_bap

    let transaction_id = context?.transaction_id
    let status = issue?.status
    let issue_actions = issue?.issue_actions
    let issue_category = issue?.category
    let sub_category = issue?.sub_category
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let query = {
        "issue": issue,
        "context": context,
        "network_issue_id": network_issue_id,
        "transactionId": transaction_id,
        "status": status,
        "issue_actions": issue_actions,
        "issue_category": issue_category,
        "sub_category": sub_category,
        "buyer": buyer,
        "seller": seller,
        "provider_name": provider_name,
        "CreatedBy": CreatedBy,
        "AssignedTo": AssignedTo,
        "AssignedFrom": AssignedFrom,
        "expected_resolution_timestamp": expected_resolution_timestamp,
        "expected_response_timestamp": expected_response_timestamp,
        "complainant_info_np": complainant_info_np,
        "issue_id_crm_bap": issue_id_crm_bap
    }
    return await BapIssue.create(query)
}

const RaiseBapIssue = async (request) => {
    let { message: message, context: context } = request

    let buyer = request?.buyer
    if (buyer == undefined)
        buyer = context?.bap_id
    let seller = request?.seller
    if (seller == undefined)
        seller = context?.bpp_id
    let provider_name = request?.provider_name
    if (provider_name == undefined)
        provider_name = context?.bpp_id
    let CreatedBy = request?.CreatedBy
    let AssignedFrom = request?.AssignedFrom
    let AssignedTo = request?.AssignedTo

    let issue = message?.issue
    // if(issue?.id==undefined)
    //     issue.id=uuidv4()
    // let network_issue_id = issue?.id


    let transaction_id = context?.transaction_id
    let status = issue?.status
    let issue_actions = issue?.issue_actions
    let issue_category = issue?.category
    let sub_category = issue?.sub_category
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let comments = request?.comments
    let query = {
        "issue": issue,
        "context": context,
        // "network_issue_id":network_issue_id,
        "transactionId": transaction_id,
        "status": status,
        "issue_actions": issue_actions,
        "issue_category": issue_category,
        "sub_category": sub_category,
        "buyer": buyer,
        "seller": seller,
        "provider_name": provider_name,
        "CreatedBy": CreatedBy,
        "AssignedTo": AssignedTo,
        "AssignedFrom": AssignedFrom,
        "expected_resolution_timestamp": expected_resolution_timestamp,
        "expected_response_timestamp": expected_response_timestamp,
        "comments": comments
    }
    return await BapIssue.create(query)
}

const RaiseBppIssue = async (request) => {
    let { message: message, context: context } = request

    let buyer = request?.buyer
    if (buyer == undefined)
        buyer = context?.bap_id
    let seller = request?.seller
    if (seller == undefined)
        seller = context?.bpp_id
    let provider_name = request?.provider_name
    if (provider_name == undefined)
        provider_name = context?.bpp_id
    let CreatedBy = request?.CreatedBy
    let AssignedFrom = request?.AssignedFrom
    let AssignedTo = request?.AssignedTo

    let issue = message?.issue
    // if(issue?.id==undefined)
    //     issue.id=uuidv4()
    // let network_issue_id = issue?.id


    let transaction_id = context?.transaction_id
    let status = issue?.status
    let issue_actions = issue?.issue_actions
    let issue_category = issue?.category
    let sub_category = issue?.sub_category
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let comments = request?.comments
    let query = {
        "issue": issue,
        "context": context,
        // "network_issue_id":network_issue_id,
        "transactionId": transaction_id,
        "status": status,
        "issue_actions": issue_actions,
        "issue_category": issue_category,
        "sub_category": sub_category,
        "buyer": buyer,
        "seller": seller,
        "provider_name": provider_name,
        "CreatedBy": CreatedBy,
        "AssignedTo": AssignedTo,
        "AssignedFrom": AssignedFrom,
        "expected_resolution_timestamp": expected_resolution_timestamp,
        "expected_response_timestamp": expected_response_timestamp,
        "comments": comments
    }
    return await BppIssue.create(query)
}

const UpdateBppIssueData = async (request) => {
    let { message: message, context: context } = request
    let network_issue_id = message?.issue?.id
    let issue = message?.issue
    let status = issue?.status
    let issue_actions = issue?.issue_actions
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(updated_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let query = {
        "issue": issue,
        "context": context,
        "status": status,
        "issue_actions": issue_actions,
        "expected_resolution_timestamp": expected_resolution_timestamp,
        "expected_response_timestamp": expected_response_timestamp
    }
    let bpp_data = await BppIssue.findOne({ "network_issue_id": network_issue_id }).lean()
    let merged_query = mergeDeep(bpp_data, query)

    if (query?.issue?.issue_actions?.complainant_actions) {
        merged_query.issue.issue_actions.complainant_actions = query?.issue?.issue_actions?.complainant_actions
        merged_query.issue_actions.complainant_actions = query?.issue?.issue_actions?.complainant_actions
    }
    if (query?.issue?.issue_actions?.respondent_actions) {
        merged_query.issue.issue_actions.respondent_actions = query?.issue?.issue_actions?.respondent_actions
        merged_query.issue_actions.respondent_actions = query?.issue?.issue_actions?.respondent_actions
    }
    if (query?.issue?.additional_info_required)
        merged_query.issue.additional_info_required = query?.issue?.additional_info_required
    console.log("merged query - bpp", merged_query?.issue)
    return await BppIssue.findOneAndUpdate({ "network_issue_id": network_issue_id }, merged_query)
}

const UpdateBapIssueData = async (request) => {
    let { message: message, context: context } = request
    let network_issue_id = message?.issue?.id
    let issue = message?.issue
    let status = issue?.status
    let issue_actions = issue?.issue_actions
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(updated_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let query = {
        "issue": issue,
        "context": context,
        "status": status,
        "issue_actions": issue_actions,
        "expected_resolution_timestamp": expected_resolution_timestamp,
        "expected_response_timestamp": expected_response_timestamp
    }
    let bap_data = await BapIssue.findOne({ "network_issue_id": network_issue_id }).lean()
    let merged_query = mergeDeep(bap_data, query)
    if (query?.issue?.issue_actions?.complainant_actions)
        merged_query.issue.issue_actions.complainant_actions = query?.issue?.issue_actions?.complainant_actions
    if (query?.issue?.issue_actions?.respondent_actions)
        merged_query.issue.issue_actions.respondent_actions = query?.issue?.issue_actions?.respondent_actions
    if (query?.issue?.additional_info_required)
        merged_query.issue.additional_info_required = query?.issue?.additional_info_required
    console.log("merged query - bap", merged_query?.issue)
    return await BapIssue.findOneAndUpdate({ "network_issue_id": network_issue_id }, merged_query)
}

const CreateBppIssue = async (request) => {
    let { message: message, context: context } = request

    let buyer = request?.buyer
    if (buyer == undefined)
        buyer = context?.bap_id
    let seller = request?.seller
    if (seller == undefined)
        seller = context?.bpp_id
    let provider_name = request?.provider_name
    if (provider_name == undefined)
        provider_name = context?.bpp_id
    let CreatedBy = request?.CreatedBy
    let AssignedFrom = request?.AssignedFrom
    let AssignedTo = request?.AssignedTo

    let issue = message?.issue
    if (issue?.id == undefined)
        issue.id = uuidv4()
    let network_issue_id = issue?.id


    let transaction_id = context?.transaction_id
    let status = issue?.status
    let issue_actions = issue?.issue_actions
    let issue_category = issue?.category
    let sub_category = issue?.sub_category
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let query = {
        "issue": issue,
        "context": context,
        "network_issue_id": network_issue_id,
        "transactionId": transaction_id,
        "status": status,
        "issue_actions": issue_actions,
        "issue_category": issue_category,
        "sub_category": sub_category,
        "buyer": buyer,
        "seller": seller,
        "provider_name": provider_name,
        "CreatedBy": CreatedBy,
        "AssignedTo": AssignedTo,
        "AssignedFrom": AssignedFrom,
        "expected_resolution_timestamp": expected_resolution_timestamp,
        "expected_response_timestamp": expected_response_timestamp
    }
    return await BppIssue.create(query)
}
const CreateBppIssueFromApplication = async (request) => {
    let { message: message, context: context } = request

    let buyer = request?.buyer
    if (buyer == undefined)
        buyer = context?.bap_id
    let seller = request?.seller
    if (seller == undefined)
        seller = context?.bpp_id
    let provider_name = request?.provider_name
    if (provider_name == undefined)
        provider_name = context?.bpp_id
    let CreatedBy = request?.CreatedBy
    let AssignedFrom = request?.AssignedFrom
    let AssignedTo = request?.AssignedTo

    let issue = message?.issue
    // if(issue?.id==undefined)
    //     issue.id=uuidv4()
    // let network_issue_id = issue?.id


    let transaction_id = context?.transaction_id
    let status = issue?.status
    let issue_actions = issue?.issue_actions
    let issue_category = issue?.category
    let sub_category = issue?.sub_category
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let query = {
        "issue": issue,
        "context": context,
        // "network_issue_id":network_issue_id,
        "transactionId": transaction_id,
        "status": status,
        "issue_actions": issue_actions,
        "issue_category": issue_category,
        "sub_category": sub_category,
        "buyer": buyer,
        "seller": seller,
        "provider_name": provider_name,
        "CreatedBy": CreatedBy,
        "AssignedTo": AssignedTo,
        "AssignedFrom": AssignedFrom,
        "expected_resolution_timestamp": expected_resolution_timestamp,
        "expected_response_timestamp": expected_response_timestamp
    }
    return await BppIssue.create(query)
}

const UpsertBapIssue = async (body) => {
    // cosn
    //TODO:: change it from issue instead from message
    let issue_type = body?.message?.issue?.issue_type
    let issue = body?.message?.issue || {}
    issue.issue_type = issue_type
    let network_issue_id = issue?.id
    let status = issue?.status
    status.id = network_issue_id
    let complainant_info = issue?.complainant_info
    //TODO: remove check
    let issue_id_crm_bap = body?.message?.issue?.issue_id_crm_bap
    let context = body?.context
    if (context == undefined)
        context = issue?.order?.context
    let parent_issue_id = body?.parent_issue_id
    // let description = issue?.description
    let transactionId = context?.transaction_id
    let created_by = body?.CreatedBy
    let assigned_from = body?.AssignedFrom
    let assigned_to = body?.AssignedTo
    let buyer = context?.bap_uri
    let seller = context?.bpp_uri
    let provider_name = context?.bpp_uri
    let issue_category = issue?.category
    let supplementary_information = issue?.supplementary_information
    let comment = body?.comment
    //undefined
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    if (comment == undefined)
        if (supplementary_information.length > 0)
            comment = {
                context: "Reply",
                description: supplementary_information[supplementary_information.length - 1]?.issue_update_info?.long_desc || '',
                CreatedBy: complainant_info?.person?.name
            }
    let push_data = { "issue_status_history": status, "comments": comment }
    if (issue_id_crm_bap) {
        // console.log("Entered crm if")
        let old_issue_data = await BapIssue.findOne(
            { "issue_id_crm_bap": issue_id_crm_bap }
        )
        let issue_object = old_issue_data?.issue
        let issue_input
        if (issue !== undefined)
            issue_input = Object.assign(issue_object || {}, issue)
        let status = issue_input?.status
        // console.log("issue input--------->",issue_input?.supplementary_information)
        // console.log("supplementary info length------->",issue_input?.supplementary_information.length)
        // console.log("old issue data---->",old_issue_data?.comments)
        // console.log("comments length",old_issue_data?.comments.length)
        if (issue_input?.supplementary_information.length <= old_issue_data?.comments.length)
            push_data = { "issue_status_history": status }//comment=undefined
        if (issue_object?.issue_type == "Issue" && issue_input?.issue_type == "Grievance")
            issue_input.grievance_escalation_flag = true
        // var x={...issue_object,description:description}
        // if (description){
        //     issue_object.description=description
        // }
        return await BapIssue.findOneAndUpdate(
            { "issue_id_crm_bap": issue_id_crm_bap },
            { $push: push_data, "issue": issue_input, "context": context, "status": status, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }, { new: true }
        )
    } else {

        if (network_issue_id) {
            // console.log("ENtered network if")
            if (assigned_to) {
                // console.log("Entered assigned to if ")
                return await BapIssue.create(
                    { "network_issue_id": network_issue_id, "issue_status_history": [status], "parent_issue_id": parent_issue_id, "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }
                )
            }
            else {
                // console.log("Entered assigned to else")
                // = await BapIssue.findOneAndUpdate(
                //     {"issue_id_crm_bap":issue_id_crm_bap},
                //     {$push: {"issue_status_history":status, "comments":comment},"issue": {...issue_object,description:description},"status":status,"resolution":resolution,"resolution_provider":resolution_provider}
                //     )
                let old_issue_data = await BapIssue.findOne(
                    { "network_issue_id": network_issue_id, "AssignedTo": undefined }
                )
                let issue_object = old_issue_data?.issue
                let issue_input = Object.assign(issue_object || {}, issue)
                let status = issue_input?.status
                // console.log("issue input--------->",issue_input?.supplementary_information)
                // console.log("supplementary info length------->",issue_input?.supplementary_information.length)
                // console.log("old issue data---->",old_issue_data?.comments)
                // console.log("comments length",old_issue_data?.comments.length)
                if (issue_input?.supplementary_information.length <= old_issue_data?.comments.length)
                    push_data = { "issue_status_history": status }//comment=undefined
                if (issue_object?.issue_type == "Issue" && issue_input?.issue_type == "Grievance")
                    issue_input.grievance_escalation_flag = true
                let updatedData = await BapIssue.findOneAndUpdate(
                    { "network_issue_id": network_issue_id, "AssignedTo": undefined },
                    { $push: push_data, "issue": issue_input, "context": context, "status": status, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }, { new: true }
                )
                if (updatedData != null) {
                    // console.log("Entered else if update")
                    return updatedData
                }
                else {
                    // console.log("Entered else else create")
                    return await BapIssue.create(
                        { "network_issue_id": network_issue_id, "issue_status_history": [status], "parent_issue_id": parent_issue_id, "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }
                    )
                }
            }
        }
        else {
            // console.log("ENtered network else")
            network_issue_id = uuidv4()
            status.id = network_issue_id
            let create_payload = { "network_issue_id": network_issue_id, "parent_issue_id": parent_issue_id, "issue_status_history": [status], "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }
            if (comment !== undefined) {
                create_payload.comments = [comment]
            }
            return await BapIssue.create(
                create_payload
            )
        }
    }
}

const UpsertBppIssue = async (body) => {
    let issue_type = body?.message?.issue?.issue_type
    let issue = body?.message?.issue || {}
    issue.issue_type = issue_type
    let network_issue_id = issue?.id
    let status = issue?.status
    status.id = network_issue_id
    let issue_id_crm_bpp = body?.message?.issue?.issue_id_crm_bpp
    // let context = issue?.order?.context
    // let description = issue?.description
    let context = body?.context
    if (context == undefined)
        context = issue?.order?.context
    let parent_issue_id = body?.parent_issue_id
    let complainant_info = issue?.complainant_info
    let supplementary_information = issue?.supplementary_information
    let comment = body?.comment
    //undefined
    let created_at = issue?.created_at
    let updated_at = issue?.updated_at
    let expected_resolution_time_duration = issue?.expected_resolution_time?.duration
    let expected_response_time_duration = issue?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let transactionId = context?.transaction_id
    let created_by = body?.CreatedBy
    let assigned_from = body?.AssignedFrom
    let assigned_to = body?.AssignedTo
    let buyer = context?.bap_uri
    let seller = context?.bpp_uri
    let provider_name = context?.bpp_uri
    let issue_category = issue?.category
    if (comment == undefined)
        if (supplementary_information.length > 0)
            comment = {
                context: "Reply",
                description: supplementary_information[supplementary_information.length - 1]?.issue_update_info?.long_desc || '',
                CreatedBy: complainant_info?.person?.name
            }
    let push_data = { "issue_status_history": status, "comments": comment }
    if (issue_id_crm_bpp) {
        let old_issue_data = await BppIssue.findOne(
            { "issue_id_crm_bpp": issue_id_crm_bpp }
        )
        let issue_object = old_issue_data?.issue
        let issue_input = Object.assign(issue_object || {}, issue)
        let status = issue_input?.status
        if (issue_input?.supplementary_information.length <= old_issue_data?.comments.length)
            push_data = { "issue_status_history": status }//comment=undefined
        if (issue_object?.issue_type == "Issue" && issue_input?.issue_type == "Grievance")
            issue_input.grievance_escalation_flag = true
        return await BppIssue.findOneAndUpdate(
            { "issue_id_crm_bpp": issue_id_crm_bpp },
            { $push: push_data, "issue": issue_input, "context": context, "status": status, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }, { new: true }
        )
    } else {
        // const issue_type = issue?.message?.issue?.issue_type
        if (network_issue_id) {
            // console.log("ENtered networsid if")
            if (assigned_to) {
                // console.log("Entered assined to if ")
                return await BppIssue.create(
                    { "network_issue_id": network_issue_id, "issue_status_history": [status], "parent_issue_id": parent_issue_id, "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }
                )
            }
            else {
                // console.log("Entered assined to else ")
                let old_issue_data = await BppIssue.findOne(
                    { "network_issue_id": network_issue_id, "AssignedTo": undefined }
                )

                let issue_object = old_issue_data?.issue
                // console.log(old_issue_data,issue_object,issue)
                let issue_input = Object.assign(issue_object || {}, issue)
                let status = issue_input?.status
                if (issue_input?.supplementary_information.length <= old_issue_data?.comments.length)
                    push_data = { "issue_status_history": status }//comment=undefined
                if (issue_object?.issue_type == "Issue" && issue_input?.issue_type == "Grievance")
                    issue_input.grievance_escalation_flag = true
                let updatedData = await BppIssue.findOneAndUpdate(
                    { "network_issue_id": network_issue_id, "AssignedTo": undefined },
                    { $push: push_data, "issue": issue_input, "context": context, "status": status, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }, { new: true }
                )
                if (updatedData != null) {
                    // console.log("ENtered else if update")
                    return updatedData
                }
                else {
                    // console.log("ENtered else else create")
                    return await BppIssue.create(
                        { "network_issue_id": network_issue_id, "issue_status_history": [status], "parent_issue_id": parent_issue_id, "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }
                    )
                }
            }
        }
        else {
            // console.log("ENtered networsid else")
            network_issue_id = uuidv4()
            status.id = network_issue_id
            let create_payload = { "network_issue_id": network_issue_id, "parent_issue_id": parent_issue_id, "issue_status_history": [status], "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }
            if (comment !== undefined) {
                create_payload.comments = [comment]
            }
            return await BppIssue.create(
                create_payload
            )
        }
    }
}


const UpsertLspIssue = async (body) => {
    let issue_type = body?.message?.issue_type
    let issue = body?.message?.issue
    issue.issue_type = issue_type
    const network_issue_id = issue?.id
    const status = issue?.status
    const issue_id_crm_lsp = body?.message?.issue_id_crm_lsp
    const context = body?.context
    // // console.log(body.message)
    // if (!(status))
    //     status = issue?.message?.issue_resolution_details?.issue?.status
    if (issue_id_crm_lsp) {
        return await LspIssue.findOneAndUpdate(
            { "network_issue_id": network_issue_id, "issue_id_crm_lsp": issue_id_crm_lsp },
            { $push: { "issue_status_history": status }, "issue": issue }
        )
    } else {
        const transactionId = issue?.order?.transactionId
        const created_by = body?.message?.CreatedBy
        const assigned_from = body?.assigned_from
        const parent_issue_id = body?.parent_issue_id
        const assigned_to = body?.assigned_to
        const buyer = context?.bap_uri
        const seller = context?.bpp_uri
        const provider_name = context?.bpp_uri
        const issue_category = issue?.category
        // const issue_type = issue?.message?.issue?.issue_type
        if (network_issue_id)
            return await LspIssue.create(
                { "network_issue_id": network_issue_id, "parent_issue_id": parent_issue_id, "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "comments": [], "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context }
            )
        else
            return await LspIssue.create(
                { "parent_issue_id": parent_issue_id, "transactionId": transactionId, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issue": issue, "comments": [], "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "AssignedFrom": assigned_from, "context": context }
            )
    }
}

const UpsertOnBapIssue = async (body) => {
    const message = body?.message
    const issue_resolution_details = message?.issue_resolution_details
    const issue_data = issue_resolution_details?.issue
    // let description=issue_data?.description
    //TODO: remove check
    let created_at = issue_data?.created_at
    let updated_at = issue_data?.updated_at
    let expected_resolution_time_duration = issue_data?.expected_resolution_time?.duration
    let expected_response_time_duration = issue_data?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    let issue_type = issue_data?.issue_type
    const issue_id_crm_bap = body?.message?.issue_id_crm_bap
    const network_issue_id = issue_data?.id
    // const issue = body
    const status = issue_data?.status
    status.id = network_issue_id
    const resolution = issue_resolution_details?.resolution
    const resolution_provider = issue_resolution_details?.resolution_provider
    // console.log("Inside upsert on bap---->",resolution_provider)
    let supplementary_information = issue_data?.supplementary_information
    let comment = {
        context: "Reply",
        description: supplementary_information[supplementary_information.length - 1]?.issue_update_info?.long_desc || '',
        CreatedBy: resolution_provider?.respondent_info?.organization?.contact?.name
    }
    let push_data = { "issue_status_history": status, "comments": comment }
    // switch(body?.context?.bap_uri)
    // {
    //     case process.env.BAP_URL:{
    //     comment.CreatedBy = "BPP_ADMIN"
    // }
    // case process.env.BPP_URL:{
    //     comment.CreatedBy = "BAP_ADMIN"
    // }
    // }

    // const context = body?.context
    // if (!(status))
    //     status = message?.issue_resolution_details?.issue?.status
    if (issue_type == "Grievance") {
        issue_data.grievance_escalation_flag = true
    }
    if (network_issue_id) {
        let old_issue_data = await BapIssue.findOne(
            { "network_issue_id": network_issue_id, "AssignedTo": undefined }
        )
        let issue_object = old_issue_data?.issue
        if (issue_object?.issue_type == "Issue" && issue_data?.issue_type == "Grievance")
            issue_data.grievance_escalation_flag = true
        let issue_input = Object.assign(issue_object, issue_data)
        if (issue_input?.supplementary_information.length <= old_issue_data?.comments.length) {
            push_data = { "issue_status_history": status }//comment=undefined
            console.log("ENtered if of push data on bap issue")
        }
        return await BapIssue.findOneAndUpdate(
            { "network_issue_id": network_issue_id, "AssignedTo": undefined },
            { $push: push_data, "issue": issue_input, "status": status, "resolution": resolution, "resolution_provider": resolution_provider, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }, { new: true }
        )
    }
    else {
        console.log("Specified issue id bap -------> ", network_issue_id, " <--------- not found")
    }
}

const UpsertOnBppIssue = async (body) => {
    const message = body?.message
    // console.log("body-------->",body)
    // let orderData = body?.message?.issue?.order
    const issue_resolution_details = message?.issue_resolution_details
    const issue_data = issue_resolution_details?.issue
    const issue_id_crm_bpp = body?.message?.issue_id_crm_bpp
    const network_issue_id = issue_data?.id
    let issue_type = issue_data?.issue_type
    // const issue = body
    let created_at = issue_data?.created_at
    let updated_at = issue_data?.updated_at
    let expected_resolution_time_duration = issue_data?.expected_resolution_time?.duration
    let expected_response_time_duration = issue_data?.expected_response_time?.duration
    let expected_resolution_timestamp
    let expected_response_timestamp
    if (expected_resolution_time_duration && created_at)
        expected_resolution_timestamp = await IsoAndDateToDateConverter(created_at, expected_resolution_time_duration)
    if (expected_response_time_duration && updated_at)
        expected_response_timestamp = await IsoAndDateToDateConverter(updated_at, expected_response_time_duration)
    const status = issue_data?.status
    status.id = network_issue_id
    const resolution = issue_resolution_details?.resolution
    const resolution_provider = issue_resolution_details?.resolution_provider
    let supplementary_information = issue_data?.supplementary_information
    let comment = {
        context: "Reply",
        description: supplementary_information[supplementary_information.length - 1]?.issue_update_info?.long_desc || '',
        CreatedBy: resolution_provider?.respondent_info?.organization?.contact?.name
    }
    let push_data = { "issue_status_history": status, "comments": comment }
    // console.log("coment",comment)
    // switch(body?.context?.bap_uri)
    // {
    //     case process.env.BAP_URL:{
    //     comment.CreatedBy = "BPP_ADMIN"
    // }
    // case process.env.BPP_URL:{
    //     comment.CreatedBy = "BAP_ADMIN"
    // }
    // }
    // const context = body?.context
    // if (!(status))
    //     status = message?.issue_resolution_details?.issue?.status
    if (issue_type == "Grievance") {
        issue_data.grievance_escalation_flag = true
    }
    if (network_issue_id) {
        let old_issue_data = await BppIssue.findOne(
            { "network_issue_id": network_issue_id, "AssignedTo": undefined }
        )
        let issue_object = old_issue_data?.issue
        if (issue_object?.issue_type == "Issue" && issue_data?.issue_type == "Grievance")
            issue_data.grievance_escalation_flag = true
        let issue_input = Object.assign(issue_object, issue_data)
        if (issue_input?.supplementary_information.length <= old_issue_data?.comments.length) {
            push_data = { "issue_status_history": status }//comment=undefined
            // console.log("ENtered if of push data on bpp issue")
        }
        return await BppIssue.findOneAndUpdate(
            { "network_issue_id": network_issue_id, "AssignedTo": undefined },
            { $push: push_data, "issue": issue_input, "status": status, "resolution": resolution, "resolution_provider": resolution_provider, "expected_resolution_timestamp": expected_resolution_timestamp, "expected_response_timestamp": expected_response_timestamp }, { new: true }
        )
    }
    else {
        console.log("Specified issue id bpp -------> ", network_issue_id, " <--------- not found")
    }
}

const UpsertOnLspIssue = async (body) => {
    const message = body?.message
    const issue_resolution_details = message?.issue_resolution_details
    const issue_data = issue_resolution_details?.issue
    // const issue_id_crm_lsp = message?.issue_id_crm_lsp
    const network_issue_id = issue_data?.id
    // const issue = body
    const status = issue_data?.status
    const resolution = issue_resolution_details?.resolution
    const resolution_provider = issue_resolution_details?.resolution_provider
    const context = body?.context
    // if (!(status))
    //     status = message?.issue_resolution_details?.issue?.status
    if (network_issue_id) {
        return await BapIssue.findOneAndUpdate(
            { "network_issue_id": network_issue_id },
            { $push: { "issue_status_history": status }, "issue": issue_data, "status": status, "resolution": resolution, "resolution_provider": resolution_provider, "on_context": context }
        )
    }
    else {
        console.log("Specified issue id lsp -------> ", network_issue_id, " <--------- not found")
    }
}

const UpsertIssue = async (body) => {
    const issue_id = body?.message?.issue?.id
    const issue = body
    const status = issue?.message?.issue?.status
    // // console.log(body.message)
    // if (!(status))
    //     status = issue?.message?.issue_resolution_details?.issue?.status
    if (issue_id) {
        return await Issue.findOneAndUpdate(
            { "issue_id": issue_id },
            { $push: { "issues": issue }, "status": status }
        )
    } else {
        const created_by = body?.message?.CreatedBy
        const assigned_from = body?.assigned_from
        const parent_issue_id = body?.parent_issue_id
        const assigned_to = body?.assigned_to
        const transaction_id = issue?.context?.transaction_id
        const buyer = issue?.context?.bap_uri
        const seller = issue?.context?.bpp_uri
        const provider_name = issue?.context?.bpp_uri
        const issue_category = issue?.message?.issue?.category
        const issue_type = issue?.message?.issue?.issue_type
        return await Issue.create(
            { "issue_id": uuidv4(), "parent_issue_id": parent_issue_id, "transaction_id": transaction_id, "buyer": buyer, "seller": seller, "provider_name": provider_name, "issue_category": issue_category, "issues": [issue], "comments": [], "status": status, "AssignedTo": assigned_to, "CreatedBy": created_by, "level": issue_type, "AssignedFrom": assigned_from }
        )
    }
}

const UpsertOnIssue = async (body) => {
    const message = body?.message
    const issue_resolution_details = message?.issue_resolution_details
    const issue_data = issue_resolution_details?.issue
    const issue_id = issue_data?.id
    const issue = body
    const status = issue?.status
    const resolution = issue_resolution_details?.resolution
    const resolution_provider = issue_resolution_details?.resolution_provider
    const context = body?.context
    // if (!(status))
    //     status = message?.issue_resolution_details?.issue?.status
    if (issue_id) {
        return await Issue.findOneAndUpdate(
            { "issue_id": issue_id },
            { $push: { "issues": issue }, "status": status, "resolution": resolution, "resolution_provider": resolution_provider, "on_context": context }
        )
    }
    else {
        console.log("Specified issue id -------> ", issue_id, " <--------- not found")
    }
}

const UpdateIssue = async (body) => {
    const issue_id = body.issue_id
    const comment = body.comment
    const status = body.status
    const username = body.username
    return await Issue.findOneAndUpdate(
        { "network_issue_id": issue_id },
        { $push: { "comments": comment }, "status": status, "CreatedBy": username }
    )
}

const UpdateBapIssue = async (body) => {
    const issue_id = body.issue_id
    const comment = body.comment
    const status = body.status
    const created_by = body.CreatedBy
    const issue = body.issue
    return await BapIssue.findOneAndUpdate(
        { "issue_id_crm_bap": issue_id, $or: [{ "network_issue_id": { $exists: false } }, { "network_issue_id": "" }] },
        { $push: { "comments": comment }, "status": status, "CreatedBy": created_by, "issue": issue }
    )
}

const UpdateBppIssue = async (body) => {
    const issue_id = body.issue_id
    const comment = body.comment
    const status = body.status
    const created_by = body.CreatedBy
    const issue = body.issue
    return await BppIssue.findOneAndUpdate(
        { "issue_id_crm_bpp": issue_id, $or: [{ "network_issue_id": { $exists: false } }, { "network_issue_id": "" }] },
        { $push: { "comments": comment }, "status": status, "CreatedBy": created_by, "issue": issue }
    )
}

const UpdateLspIssue = async (body) => {
    const issue_id = body.issue_id
    const comment = body.comment
    const status = body.status
    const created_by = body.CreatedBy
    const issue = body.issue
    return await LspIssue.findOneAndUpdate(
        { "issue_id_crm_bap": issue_id },
        { $push: { "comments": comment }, "status": status, "CreatedBy": created_by, "issue": issue }
    )
}

const IssuesList = async () => {
    return await IssueTypes.find({}).lean();
}

const ListLspIssue = async (filters, pageNo, perPage) => {
    var conditions = {}
    let extra_fields = { _id: 0, __v: 0 }
    // var default_conditions =
    // if(filters.AssignedTo){
    //     conditions.AssignedTo=filters.AssignedTo
    // }
    // if(filters.CreatedBy){
    //     conditions.CreatedBy=filters.CreatedBy
    // }
    if (filters.status) {
        var x = "status.status"
        conditions[x] = filters.status
    }
    if (filters.level) {
        var x = "issue.issue_type"
        conditions[x] = filters.level
    }
    return await LspIssue.paginate({ $and: [{ $or: [{ "AssignedTo": filters.AssignedTo }, { "CreatedBy": filters.CreatedBy }] }, conditions] }, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
}

const ListBppIssue = async (filters, pageNo, perPage) => {
    var conditions = {}
    let extra_fields = { _id: 0, __v: 0 }

    // var default_conditions =
    // if(filters.AssignedTo){
    //     conditions.AssignedTo=filters.AssignedTo
    // }
    // if(filters.CreatedBy){
    //     conditions.CreatedBy=filters.CreatedBy
    // }
    if (filters.status) {
        var x = "issue.status"
        conditions[x] = filters.status
    }
    if (filters.level) {
        var x = "issue.issue_type"
        conditions[x] = filters.level
    }
    if (filters.network_issue_id) {
        var x = "network_issue_id"
        var pattern = filters.network_issue_id
        conditions[x] = new RegExp(pattern, "i")
        // console.log("cndio",conditions[x])
    }
    let filterForUser = { $and: [{ $or: [{ "AssignedTo": filters.AssignedTo }, { "CreatedBy": filters.CreatedBy }] }, conditions] }
    if (filters.user_type == "BPP_ADMIN") {
        filterForUser = { ...conditions }
    }
    return await BppIssue.aggregate([
        {
            $group: {
                _id: "$issue_id_crm_bpp",
                updatedAt: { $max: "$updatedAt" },
                status: { $max: "$status" },
                records: { $push: "$$ROOT" } // or add your field here
            }
        },
        {
            $group: {
                _id: "$issue_id_crm_bpp",
                updatedAt: { $max: "$updatedAt" },
                records: { $push: "$$ROOT" } // or add your field here
            }
        },
        { $sort: { "updatedAt": -1 } },
        {
            $facet: {
                data: [{ $skip: (pageNo - 1) * perPage }, { $limit: perPage }],
                count: [{ $count: "total" }]
            }
        }
    ]).then((response) => {
        let object = {};
        object["data"] = response[0].data;
        object["pagination"] = {};
        object["pagination"]["per_page"] = perPage;
        object["pagination"]["page_no"] = pageNo;
        object["pagination"]["total_rows"] = response[0].count[0].total;
        object["pagination"]["total_pages"] = Math.ceil(response[0].count[0].total / perPage);
        return object;
    })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
}

const ListInternalBppIssue = async (filters, pageNo, perPage) => {
    var conditions = {}
    let extra_fields = { _id: 0, __v: 0 }

    // var default_conditions =
    // if(filters.AssignedTo){
    //     conditions.AssignedTo=filters.AssignedTo
    // }
    // if(filters.CreatedBy){
    //     conditions.CreatedBy=filters.CreatedBy
    // }
    if (filters.status) {
        var x = "issue.status"
        conditions[x] = filters.status
    }
    if (filters.level) {
        var x = "issue.issue_type"
        conditions[x] = filters.level
    }
    if (filters.network_issue_id) {
        var x = "network_issue_id"
        var pattern = filters.network_issue_id
        conditions[x] = new RegExp(pattern, "i")
        // console.log("cndio",conditions[x])
    }
    let filterForUser = { $and: [{ $or: [{ "AssignedTo": filters.AssignedTo }, { "CreatedBy": filters.CreatedBy }] }, conditions] }
    if (filters.user_type == "BPP_ADMIN") {
        filterForUser = { ...conditions }
    }
    return await BppIssue.paginate(filterForUser, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
}

const SellerIssueList = async (filters) => {

    const date = new Date();
    date.setHours(0, 0, 0, 0);
    if (filters.start) {
        var start = filters.start
    } else {
        const today = new Date();
        const currentMonthStartDate = new Date(today.getFullYear(), today.getMonth(), 2);
    }

    const company_id = filters.company_id

    let result = await BppIssue.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: date,
                },
                CreatedBy: String(company_id),
            }
        },
        {
            $group: {
                _id: "$CreatedBy",
                count: { $sum: 1 },
                count2: {
                    $sum: {
                        $cond: {
                            if: { $eq: ["$status", "Resolved"] },
                            then: 1,
                            else: 0
                        }
                    }
                }
            }
        }
    ]).then((response) => {
        let object = {};
        object["data"] = response;
        return object;
    })
        .catch((e) => {
            console.log("error-------->", e);
            throw new NoRecordFoundError();
        });

    return result

}

const ListBapIssue = async (filters, pageNo, perPage) => {
    var conditions = {}
    let extra_fields = { _id: 0, __v: 0 }

    // var default_conditions =
    // if(filters.AssignedTo){
    //     conditions.AssignedTo=filters.AssignedTo
    // }
    // if(filters.CreatedBy){
    //     conditions.CreatedBy=filters.CreatedBy
    // }
    if (filters.status) {
        var x = "issue.status"
        conditions[x] = filters.status
    }
    if (filters.level) {
        var x = "issue.issue_type"
        conditions[x] = filters.level
    }
    if (filters.network_issue_id) {
        var x = "network_issue_id"
        var pattern = filters.network_issue_id
        conditions[x] = new RegExp(pattern, "i")
        // console.log("cndio",conditions[x])
    }
    let filterForUser = { $and: [{ $or: [{ "AssignedTo": filters.AssignedTo }, { "CreatedBy": filters.CreatedBy }] }, { $sort: { updatedAt: -1 } }, conditions] }
    // console.log(filterForUser)
    if (filters.user_type == "BAP_ADMIN") {
        filterForUser = { ...conditions }
    }
    // return await BapIssue.aggregate([
    //     {
    //       $group: {
    //         _id: "$issue_id_crm_bap",
    //         records: { $push: "$$ROOT" } // or add your field here
    //       }
    //     }
    //   ])

    return await BapIssue.aggregate([
        {
            $match: { ...filterForUser }
        },
        {
            $group: {
                _id: "$issue_id_crm_bap",
                updatedAt: { $max: "$updatedAt" },
                status: { $max: "$status" },
                records: { $push: "$$ROOT" } // or add your field here
            }
        },
        {
            $group: {
                _id: "$issue_id_crm_bap",
                updatedAt: { $max: "$updatedAt" },
                records: { $push: "$$ROOT" } // or add your field here
            }
        },
        { $sort: { "updatedAt": -1 } },
        {
            $facet: {
                data: [{ $skip: (pageNo - 1) * perPage }, { $limit: perPage }],
                count: [{ $count: "total" }]
            }
        }
    ]).then((response) => {
        let object = {};
        object["data"] = response[0].data;
        object["pagination"] = {};
        object["pagination"]["per_page"] = perPage;
        object["pagination"]["page_no"] = pageNo;
        object["pagination"]["total_rows"] = response[0].count[0].total;
        object["pagination"]["total_pages"] = Math.ceil(response[0].count[0].total / perPage);
        return object;
    })
        .catch((e) => {
            throw new NoRecordFoundError();
        });


}
const ListInternalBapIssue = async (filters, pageNo, perPage) => {
    var conditions = {}
    let extra_fields = { _id: 0, __v: 0 }

    // var default_conditions =
    // if(filters.AssignedTo){
    //     conditions.AssignedTo=filters.AssignedTo
    // }
    // if(filters.CreatedBy){
    //     conditions.CreatedBy=filters.CreatedBy
    // }
    if (filters.status) {
        var x = "issue.status"
        conditions[x] = filters.status
    }
    if (filters.level) {
        var x = "issue.issue_type"
        conditions[x] = filters.level
    }
    if (filters.network_issue_id) {
        var x = "network_issue_id"
        var pattern = filters.network_issue_id
        conditions[x] = new RegExp(pattern, "i")
        // console.log("cndio",conditions[x])
    }
    let filterForUser = { $and: [{ $or: [{ "AssignedTo": filters.AssignedTo }, { "CreatedBy": filters.CreatedBy }] }, { $sort: { updatedAt: -1 } }, conditions] }
    // console.log(filterForUser)
    if (filters.user_type == "BAP_ADMIN") {
        filterForUser = { ...conditions }
    }
    return await BapIssue.paginate(filterForUser, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
}

const ListIssue = async (filters, pageNo, perPage) => {
    var conditions = {}
    let extra_fields = { _id: 0 }
    // var default_conditions =
    // if(filters.AssignedTo){
    //     conditions.AssignedTo=filters.AssignedTo
    // }
    // if(filters.CreatedBy){
    //     conditions.CreatedBy=filters.CreatedBy
    // }
    if (filters.status) {
        var x = "issue.status.status"
        conditions[x] = filters.status
    }
    if (filters.level) {
        var x = "issue.issue_type"
        conditions[x] = filters.level
    }
    return await Issue.paginate({ $and: [{ $or: [{ "AssignedTo": filters.AssignedTo }, { "CreatedBy": filters.CreatedBy }] }, conditions] }, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {};
            object["data"] = response.docs;
            object["pagination"] = {};
            object["pagination"]["per_page"] = perPage;
            object["pagination"]["page_no"] = pageNo;
            object["pagination"]["total_rows"] = response.totalDocs;
            object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
}
const addOrUpdateProductsWithSkuId = async (ProductSchema = {}) => {
    return await ProductMongooseModel.findOneAndUpdate(
        {
            id: ProductSchema.id
        },
        {
            ...ProductSchema
        },
        { upsert: true },
    );

};

const cancellation = async () => {
    const cancellation = await CancellationReason.find({},{_id:0,__v:0},{runValidators:true});

    if (!(cancellation || cancellation.length))
        throw new NoRecordFoundError();
    else {
        return cancellation;
    }
};

const retention = async () => {
    const returns = await ReturnReasons.find({}, { _id: 0, __v: 0 });

    if (!(returns || returns.length))
        throw new NoRecordFoundError();
    else {
        return returns;
    }
};

const AssignBppIssue = async (body) => {
    return await BppIssue.create(body)
}

const AssignBapIssue = async (body) => {
    return await BapIssue.create(body)
}


const UpsertBapUserCartItem = async (query, data = {}) => {
    try{
        return await CartMongooseModel.findOneAndUpdate(query, data, { upsert: true ,runValidators:true});
    }catch(error){
        console.log(error)
    }
}
const GetBapUserCartItem = async (query) => {
    return await CartMongooseModel.findOne(query).lean();
};
const DeleteBapUserCartItem = async (query) => {
    return await CartMongooseModel.deleteOne(query);
};
const ListBapUserCartItems = async (query, pageNo, perPage) => {
    let extra_fields = { _id: 0, __v: 0 }
    return await CartMongooseModel.paginate(query, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage, sort: { createdAt: -1 } }), {})
        .then((response) => {
            let object = {
                pagination: {
                    page_no: pageNo,
                    per_page: perPage,
                    total_rows: response.totalDocs,
                    total_pages: Math.ceil(response.totalDocs / perPage),
                },
                data: response.docs
            };
            return object;
        })
        .catch((e) => {
            throw new NoRecordFoundError();
        });
};

const createUser = async (UserSchema) => {
    try {
        let user = await User.create(UserSchema);
        return user;
    }
    catch (error) {
        console.error(error)
        throw error;
    }

}

const getUser = async (query) => {
    try {
        let user = await User.findOne(query)
        return user
    }
    catch (error) {
        console.error(error)
        throw error;
    }
}

const updateUser = async (query, data) => {
    try {
        let user = await User.findOneAndUpdate(query, data)
    }
    catch (error) {
        console.error(error)
        throw error;
    }
}

// const validationUser = async (_id, UserSchema={}) => {
//     if UserSchema.pas

// }

const SearchProductCategory = async (name) => {
    const product = await ProductCategory.find({
        "name": new RegExp(name, 'i'),
        $and: [{ "category_code": { $ne: "NULL", $exists: true } }]
    }, { _id: 0, __v: 0 }).lean()
    if (!(product || product.length)) {
        throw new NoRecordFoundError
    }
    return product;
}
const AddBPPSearchRequest = async (data) => {
    return await buyerFinderFees.findOneAndUpdate(
        {
            bap_id: data.bap_id
        },
        {
            ...data
        },
        { upsert: true }
    );
}

const getBPPSearchRequest = async (query) => {
    try {
        let search_req = await buyerFinderFees.findOne(query)
        console.log("1");
        return search_req
    }
    catch (error) {
        console.log("2");
        console.error(error)
        throw error;
    }
}

const getBapOrder = async (query) => {
    const order = await OrderMongooseModel.find(query,
        { "confirm": 0, "onConfirm": 0, _id: 0, __v: 0 }).lean();
    if (!(order || order.length))
        throw new NoRecordFoundError();
    else
        return order?.[0];
};

const upsertBapOrder = async (query, orderSchema = {}) => {
    // console.log("---------------query",s JSON.stringify(orderSchema));

    return await OrderMongooseModel.findOneAndUpdate(
        query, orderSchema,
        { upsert: true }
    );
};

async function FindIssueTypeList() {
    return await IssueTypes.find({}).lean()
}

async function ListOndcCategoriesV1_1_0() {
    return await OndcCategory.find({}).lean()
}

async function ListOnActionResults(query = {}, pageNo, perPage) {

    let extra_fields = { _id: 0, __v: 0 };
    return await OnActionResults.find(query,extra_fields).lean().then(response => {
        return response;
    }).catch(err => {
        console.log(err)
    });

    // return await OnActionResults.paginate(query, Object.assign({ "lean": true, select: extra_fields, page: pageNo, limit: perPage }), {})
    //     .then((response) => {
    //         let object = {};
    //         object["data"] = response.docs;
    //         object["pagination"] = {};
    //         object["pagination"]["per_page"] = perPage;
    //         object["pagination"]["page_no"] = pageNo;
    //         object["pagination"]["total_rows"] = response.totalDocs;
    //         object["pagination"]["total_pages"] = Math.ceil(response.totalDocs / perPage);
    //         return object;
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     });

}


const AddOnActionResults = async (searchResponse = {}) => {
    return await OnActionResults.create(searchResponse).then(response => {
        return response;
    }).catch(err => {
        console.log(err)
    })
};

const DeleteOnActionResults = async (query = {}) => {
    return await OnActionResults.deleteMany(query).then(response => {
        return response;
    }).catch(err => {
        console.log(err)
    })
};


export {
    AddBPPSearchRequest,
    getBPPSearchRequest,
    addOrUpdateOrderWithTransactionId,
    getOrderByTransactionId,
    addOrUpdateUsers,
    getOrderById,
    getUserById,
    getallOrdersQuery,
    getProductById,
    getProviderById,
    searchProductbyName,
    getProviderByName,
    getAllProviders,
    createProduct,
    UpdateProduct,
    getProviders,
    addAddressById,
    getOrderByUserId,
    downloadOrderByUserId,
    UpdateAddressById,
    seedDB,
    AddSearchRequest,
    GetSearchRequest,
    // FindGrievanceCategories,
    ListIssue,
    UpdateIssue,
    UpsertIssue,
    // createIssue,
    // FindIssue,
    // FindIssueHistoryList,
    // FindIssueList,
    FindIssue,
    // FindIssueHistory,
    getPaymentById,
    getPaymentByUserId,
    downloadPaymentByUserId,
    updatePaymentById,
    createPayOut,
    getPayoutsByUserId,
    downloadPayoutsByUserId,
    getPayoutById,
    listProduct,
    viewProduct,
    updatePayoutByPaymentTransactionId,
    getPaymentByStatus,
    updatePayoutDetails,
    UpdateOrderWithTransactionId,
    getPayoutByPaymentTransactionId,
    DeleteAddressById,
    IssuesList,
    FindUserGrievanceCategories,
    FindApplicationGrievanceCategories,
    FindSubCategoriesList,
    FindComplainantActions,
    FindRespondentActions,
    FindRespondentTypes,
    FindActionsTriggered,
    FindResolutionAction,
    FindIssueTypeList,
    getAllOrders,
    getAllPayments,
    searchProduct,
    UpsertOnIssue,
    addOrUpdateProductsWithSkuId,
    cancellation,
    retention,
    ListBapIssue,
    ListInternalBapIssue,
    ListBppIssue,
    ListInternalBppIssue,
    SellerIssueList,
    ListLspIssue,
    UpsertBapIssue,
    UpsertBppIssue,
    UpsertLspIssue,
    FindBapIssue,
    FindBapIssueDuplicate,
    FindBppIssueDuplicate,
    FindBppIssue,
    FindLspIssue,
    UpdateBapIssue,
    UpdateBppIssue,
    UpdateLspIssue,
    UpsertOnBapIssue,
    UpsertOnBppIssue,
    UpsertOnLspIssue,
    CreateBppIssue,
    CreateBppIssueFromApplication,
    CreateBapIssue,
    RaiseBapIssue,
    RaiseBppIssue,
    AssignBapIssue,
    AssignBppIssue,
    FindBapIssueStatus,
    FindBppIssueStatus,
    FindLspIssueStatus,
    FindIssueCategoriesList,
    addOrUpdateBPPCartWithTransactionId,
    deleteBPPCartWithTransactionId,
    getBPPCartByTransactionId,
    ListAllOrders,

    //=========cart services==================================== 
    UpsertBapUserCartItem,
    GetBapUserCartItem,
    DeleteBapUserCartItem,
    ListBapUserCartItems,
    getCartByTransactionId,
    getStateByStateName,
    createUser,
    getUser,
    updateUser,
    SearchProductCategory,
    FindBapIssueStatusNp,
    FindBppIssueStatusNp,
    FindLspIssueStatusNp,
    getAllActiveProviders,
    getBppOrderByUserId,
    getAllBppOrders,
    getBppOrderByTransactionId,
    getBppOrderById,
    getBapOrder,
    UpdateBppIssueData,
    UpdateBapIssueData,
    upsertBapOrder,
    listCartByTransactionId,

    //ONDC categories v 1.1.0
    ListOndcCategoriesV1_1_0,

    //On Action results
    ListOnActionResults,
    AddOnActionResults,
    DeleteOnActionResults
}
