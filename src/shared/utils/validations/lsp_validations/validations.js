import Validator from 'jsonschema';
import { searchContext, searchMessage, searchValidation } from "./schemas/search.js"
import { initContext, initMessage, initValidation } from "./schemas/init.js"
import { confirmContext, confirmMessage, confirmValidation } from "./schemas/confirm.js"
import { updateContext, updateMessage, updateValidation } from "./schemas/update.js"
import { statusContext, statusMessage, statusValidation } from "./schemas/status.js";
import { cancelContext, cancelMessage, cancelValidation } from "./schemas/cancel.js";
import { trackContext, trackMessage, trackValidation } from "./schemas/track.js";
import { supportContext, supportMessage, supportValidation } from "./schemas/support.js";


//===================== on_actions =================================================================================================================================
import { onsupportContext, onsupportMessage, onsupportValidation } from "./schemas/on_support.js";
import { ontrackContext, ontrackMessage, ontrackValidation } from "./schemas/on_track.js";
import { oncancelContext, oncancelMessage, oncancelValidation } from "./schemas/on_cancel.js";
import { onstatusContext, onstatusMessage, onstatusValidation } from "./schemas/on_status.js";
import { onupdateContext, onupdateMessage, onupdateValidation } from "./schemas/on_update.js";
import { onconfirmContext, onconfirmMessage, onconfirmValidation } from "./schemas/on_confirm.js";
import { oninitContext, oninitMessage, oninitValidation } from "./schemas/on_init.js";
import { onsearchContext, onsearchMessage, onsearchValidation } from "./schemas/on_search.js";


var v = new Validator.Validator();

class LSPValidator {

    async validateSearch(data) {
        v.addSchema(searchContext, '/searchContext');
        v.addSchema(searchMessage, '/searchMessage');

        var response = await v.validate(data, searchValidation)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }
    async validateInit(data) {
        v.addSchema(initContext, '/initContext');
        v.addSchema(initMessage, '/initMessage');

        var response = await v.validate(data, initValidation)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }
    async validateConfirm(data) {
        v.addSchema(confirmContext, '/confirmContext');
        v.addSchema(confirmMessage, '/confirmMessage');

        var response = await v.validate(data, confirmValidation)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }
    async validateUpdate(data) {
        v.addSchema(updateContext, '/updateContext');
        v.addSchema(updateMessage, '/updateMessage');

        var response = await v.validate(data, updateValidation)
        if (response["errors"].length == 0) {
            return true
        }
        // console.log(response["errors"])
        return false
    }
    async validateStatus(data) {
        v.addSchema(statusContext, '/statusContext');
        v.addSchema(statusMessage, '/statusMessage');
        var response = await v.validate(data, statusValidation)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }
    async validateCancel(data) {
        v.addSchema(cancelContext, '/cancelContext');
        v.addSchema(cancelMessage, '/cancelMessage');
        var response = await v.validate(data, cancelValidation)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }
    async validateTrack(data) {
        v.addSchema(trackContext, '/trackContext');
        v.addSchema(trackMessage, '/trackMessage');
        var response = await v.validate(data, trackValidation)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }
    async validateSupport(data) {
        v.addSchema(supportContext, '/supportContext');
        v.addSchema(supportMessage, '/supportMessage');
        var response = await v.validate(data, supportValidation)
        if (response["errors"].length == 0) {
            return true
        }
        return false
    }



    //======================== on_actions =================================================================================================================================
    async validateOnSupport(data) {
        let schemaErrors = []
        v.addSchema(onsupportContext, '/onsupportContext');
        v.addSchema(onsupportMessage, '/onsupportMessage');
        var response = await v.validate(data, onsupportValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }
    async validateOnTrack(data) {
        let schemaErrors = []
        v.addSchema(ontrackContext, '/ontrackContext');
        v.addSchema(ontrackMessage, '/ontrackMessage');
        var response = await v.validate(data, ontrackValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }
    async validateOnCancel(data) {
        let schemaErrors = []
        v.addSchema(oncancelContext, '/oncancelContext');
        v.addSchema(oncancelMessage, '/oncancelMessage');
        var response = await v.validate(data, oncancelValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }
    async validateOnStatus(data) {
        let schemaErrors = []
        v.addSchema(onstatusContext, '/onstatusContext');
        v.addSchema(onstatusMessage, '/onstatusMessage');
        var response = await v.validate(data, onstatusValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }
    async validateOnUpdate(data) {
        let schemaErrors = []
        v.addSchema(onupdateContext, '/onupdateContext');
        v.addSchema(onupdateMessage, '/onupdateMessage');
        var response = await v.validate(data, onupdateValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }
    async validateOnConfirm(data) {
        let schemaErrors = []
        v.addSchema(onconfirmContext, '/onconfirmContext');
        v.addSchema(onconfirmMessage, '/onconfirmMessage');
        var response = await v.validate(data, onconfirmValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }
    async validateOnInit(data) {
        let schemaErrors = []
        v.addSchema(oninitContext, '/oninitContext');
        v.addSchema(oninitMessage, '/oninitMessage');
        var response = await v.validate(data, oninitValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
    }
    async validateOnSearch(data) {
        let schemaErrors = []
        v.addSchema(onsearchContext, '/onsearchContext');
        v.addSchema(onsearchMessage, '/onsearchMessage');
        var response = await v.validate(data, onsearchValidation)
        if (response["errors"].length == 0) {
            return { validation_flag: true, error_list: schemaErrors }
        }

        schemaErrors = await this.validationErrorMessages(response["errors"])
        return { validation_flag: false, error_list: schemaErrors }
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


export default LSPValidator