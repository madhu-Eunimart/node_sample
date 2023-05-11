//const Validator = require('jsonschema').Validator;
import Validator from 'jsonschema'
import { onCancelContext, onCancelMessage, onCancel } from "./schemas/on_cancel.js";
import { onConfirmContext, onConfirmMessage, onConfirm, onConfirmPayment, onConfirmQuote, onConfirmPrice, onConfirmFulfillments, onConfirmStart, onConfirmEnd, onConfirmBilling, onConfirmItems, onConfirmProvider, onConfirmDocument } from "./schemas/on_confirm.js";
import { onInitContext, onInitMessage, onInit, onInitPayment, onInitQuote, onInitPrice, onInitFulfillments, onInitEnd, onInitItems, onInitBilling, onInitProvider } from "./schemas/on_init.js";
import { onSearchContext, onSearchMessage, onSearch, onSearchDescriptor, onSearchItems, onsearchTags, onsearchFulfillments, onSearchPackagedCommodities, onSearchPrepackagedfood, onsearchLocations, onsearchItemTags } from "./schemas/on_search.js";
import { onSelectContext, onSelectMessage, onSelect, onSelectBppFulfillments, onSelectItems, onSelectBppProviders, onSelectQuote, onSelectPrice } from "./schemas/on_select.js";
import { onStatusContext, onStatusMessage, onStatus } from "./schemas/on_status.js";
import { onSupportContext, onSupportMessage, onSupport } from "./schemas/on_support.js";
import { onTrackContext, onTrackMessage, onTrack } from "./schemas/on_track.js";
import { onUpdateContext, onUpdateMessage, onUpdate } from "./schemas/on_update.js";
import { issueContext, issueMessage, issue } from './schemas/issue.js';
import { issueStatusContext, issueStatusMessage, issueStatus } from './schemas/issue_status.js';

var v = new Validator.Validator();

class BAPValidator {


    async validateOnCancel(data) {
        v.addSchema(onCancelContext, '/onCancelContext');
        v.addSchema(onCancelMessage, '/onCancelMessage');
        var response = await v.validate(data, onCancel)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }

    async validateOnConfirm(data) {
        let schemaErrors = []

        v.addSchema(onConfirmPayment, '/onConfirmPayment');
        v.addSchema(onConfirmQuote, '/onConfirmQuote');
        v.addSchema(onConfirmPrice, '/onConfirmPrice');
        v.addSchema(onConfirmFulfillments, '/onConfirmFulfillments');
        v.addSchema(onConfirmStart, '/onConfirmStart');
        v.addSchema(onConfirmEnd, '/onConfirmEnd');
        v.addSchema(onConfirmBilling, '/onConfirmBilling');
        v.addSchema(onConfirmItems, '/onConfirmItems');
        v.addSchema(onConfirmProvider, '/onConfirmProvider');
        v.addSchema(onConfirmContext, '/onConfirmContext');
        v.addSchema(onConfirmMessage, '/onConfirmMessage');
        v.addSchema(onConfirmDocument, '/onConfirmDocument');

        var response = await v.validate(data, onConfirm)

        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }
        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }

    async validateOnInit(data) {
        let schemaErrors = []

        v.addSchema(onInitPayment, '/onInitPayment');
        v.addSchema(onInitQuote, '/onInitQuote');
        v.addSchema(onInitPrice, '/onInitPrice');
        v.addSchema(onInitFulfillments, '/onInitFulfillments');
        v.addSchema(onInitEnd, '/onInitEnd');
        v.addSchema(onInitItems, '/onInitItems');
        v.addSchema(onInitBilling, '/onInitBilling');
        v.addSchema(onInitProvider, '/onInitProvider');
        v.addSchema(onInitContext, '/onInitContext');
        v.addSchema(onInitMessage, '/onInitMessage');
        var response = await v.validate(data, onInit)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }
        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }

    async validateOnSearch(data) {
        let schemaErrors = []

        v.addSchema(onSearchContext, '/onSearchContext');
        v.addSchema(onSearchMessage, '/onSearchMessage');
        v.addSchema(onSearchDescriptor, '/onSearchDescriptor');
        v.addSchema(onsearchFulfillments, '/onsearchFulfillments');
        v.addSchema(onsearchLocations, '/onsearchLocations');
        v.addSchema(onsearchTags, '/onsearchTags');

        var response = await v.validate(data, onSearch)

        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }
        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }

    }
    async validateOnSearchItems(data) {
        v.addSchema(onSearchDescriptor, '/onSearchDescriptor');
        v.addSchema(onSearchPackagedCommodities, '/onSearchPackagedCommodities');
        v.addSchema(onsearchFulfillments, '/onsearchFulfillments');
        v.addSchema(onsearchTags, '/onsearchTags');
        v.addSchema(onSearchPrepackagedfood, '/onSearchPrepackagedfood');
        v.addSchema(onsearchLocations, '/onsearchLocations');
        v.addSchema(onsearchItemTags, '/onsearchItemTags');


        var response = await v.validate(data, onSearchItems)

        if (response["errors"].length == 0) {
            // // later on need to add validations for Packaged Commodities, Packaged Foods, Fruits and Vegetables

            // var bpp_providers = data["message"]["catlog"]["bpp/providers"]
            // var items = {}
            // var category_id = ""

            // // “bpp/providers”.”@ondc/org/fssai_license_no” is mandatory for category_id “F&B”
            // for (let i = 0; i < bpp_providers.length; i++) {
            //     items = bpp_providers[i]["items"]
            //     for (let j = 0; j < items.length; j++) {
            //         category_id = items[j]["category_id"]
            //         if (category_id == "F&B") {
            //             break
            //         }

            //     }

            //     if (category_id == "F&B") {
            //         if (!("@ondc/org/fssai_license_no" in bpp_providers[i])) {
            //             return false
            //         }
            //     }
            // }
            // // items.”@ondc/org/return_window” is mandatory only if items.”@ondc/org/returnable” is “true”;
            // for (let i = 0; i < bpp_providers.length; i++) {
            //     items = bpp_providers[i]["items"]
            //     for (let j = 0; j < bpp_providers.length; j++) {
            //         if (items[j]["@ondc/org/returnable"] == true) {
            //             if (!("@ondc/org/return_window" in bpp_providers[i])) {
            //                 return false
            //             }
            //         }
            //     }
            //      total = total + value
            // // }
            return true
        }
        return false
    }

    async validateOnSelect(data) {
        let schemaErrors = []

        v.addSchema(onSelectContext, '/onSelectContext');
        v.addSchema(onSelectMessage, '/onSelectMessage');
        v.addSchema(onSelectBppFulfillments, '/onSelectBppFulfillments');
        v.addSchema(onSelectItems, '/onSelectItems');
        v.addSchema(onSelectBppProviders, '/onSelectBppProviders');
        v.addSchema(onSelectQuote, "/onSelectQuote");
        v.addSchema(onSelectPrice, "/onSelectPrice");

        var response = await v.validate(data, onSelect)

        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }
        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }

    async validateOnStatus(data) {
        v.addSchema(onStatusContext, '/onStatusContext');
        v.addSchema(onStatusMessage, '/onStatusMessage');
        var response = await v.validate(data, onStatus)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }

    async validateOnSupport(data) {
        v.addSchema(onSupportContext, '/onSupportContext');
        v.addSchema(onSupportMessage, '/onSupportMessage');
        var response = await v.validate(data, onSupport)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }

    async validateIssue(data) {
        v.addSchema(issueContext, '/issueContext');
        v.addSchema(issueMessage, '/issueMessage');
        var response = await v.validate(data, issue)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }

    async validateIssueStatus(data) {
        v.addSchema(issueStatusContext, '/issueStatusContext');
        v.addSchema(issueStatusMessage, '/issueStatusMessage');
        var response = await v.validate(data, issueStatus)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }

    async validateOnTrack(data) {
        v.addSchema(onTrackContext, '/onTrackContext');
        v.addSchema(onTrackMessage, '/onTrackMessage');
        var response = await v.validate(data, onTrack)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }

    async validateOnUpdate(data) {
        v.addSchema(onUpdateContext, '/onUpdateContext');
        v.addSchema(onUpdateMessage, '/onUpdateMessage');
        var response = await v.validate(data, onUpdate)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }

    async validationErrorMessages(inputArray) {

        let schemaErrors = []
        for (let i = 0; i < inputArray.length; i++) {
            let errObject = {
                path: inputArray[i]?.property,
                message: inputArray[i]?.message,
                value: inputArray[i]?.instance
            }
            schemaErrors.push(errObject)
        }
        return schemaErrors
    }


}
export default BAPValidator;