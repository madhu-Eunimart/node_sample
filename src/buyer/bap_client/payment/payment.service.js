import HttpRequest from '../../../shared/utils/HttpRequest.js';
import moment from 'moment-timezone';
import axios from 'axios';
import { downloadPayoutsByUserId, getOrderById, updatePayoutDetails } from '../../../shared/db/dbService.js';
import { PROTOCOL_PAYMENT, SETTLEMENT_STATUS } from '../../../shared/utils/constants.js';
import BppUpdateService from '../../order/update/bppUpdate.service.js';
// import { settlement_states } from '../../../rsp/utils/constants.js';
const bppUpdateService = new BppUpdateService()
class PaymentService {

    // async settlePayout() {

    //     try {
    //         let data = await downloadPayoutsByUserId()

    //         await Promise.all(data.map(async each_payout => {
    //             if (each_payout.settlementStatus != settlement_states.SETTLED) {
    //                 var orderDetails = await getOrderById(each_payout.buyerAppOrderId);
    //                 if (orderDetails) {
    //                     if (moment(each_payout.orderReturnPeriodExpiryDate, 'DD-MM-YYYY').isBefore(moment().tz("Asia/Calcutta")) && orderDetails?.state != 'Cancelled' && orderDetails?.state == "Completed") {

    //                         // let account = this.sellerNPAccountCreation()

    //                         let url = "https://api.razorpay.com/v1/transfers";
    //                         let transfer_data = {
    //                             "account": "acc_LXgaOff0vASpbe",
    //                             "amount": parseInt(each_payout.merchantPayableAmount) * 100,
    //                             "currency": "INR"
    //                         };



    //                         try {

    //                             // Razorppay transfer API call
    //                             const result = await axios.post(url, transfer_data, {
    //                                 auth: {
    //                                     username: envdata?.RAZOR_PAY_KEY_ID,
    //                                     password: envdata?.RAZOR_PAY_KEY_SECRET
    //                                 }
    //                             });


    //                             console.log("result=====================>", result.data);

    //                             //updating settlement_status to PAID
    //                             updatePayoutDetails({ paymentTransactionId: each_payout.paymentTransactionId }, { settlementStatus: SETTLEMENT_STATUS.SETTLED, settlementTransactionId: result.data.id })
    //                             console.log("orderDetails", each_payout.buyerAppOrderId);
    //                             let settle = bppUpdateService.settlementUpdate({}, orderDetails)
    //                         }
    //                         catch (err) {
    //                             console.log("Error =====>>> ", err?.response?.data);
    //                         }
    //                     }
    //                 }
    //             }
    //         }));

    //     } catch (error) {
    //         return { status: false, message: "Unable to make the settlement" };

    //     }

    // }

    async sellerNPAccountCreation() {
        let account_creation_url = `https://api.razorpay.com/v2/accounts`

        let account_data = {
            "email": "gaurav.kumar@example.com",
            "phone": "9000090000",
            "type": "route",
            "reference_id": "124124",
            "legal_business_name": "Acme Corp",
            "business_type": "partnership",
            "contact_name": "Gaurav Kumar",
            "profile": {
                "category": "healthcare",
                "subcategory": "clinic",
                "addresses": {
                    "registered": {
                        "street1": "507, Koramangala 1st block",
                        "street2": "MG Road",
                        "city": "Bengaluru",
                        "state": "KARNATAKA",
                        "postal_code": "560034",
                        "country": "IN"
                    }
                }
            },
            "legal_info": {
                "pan": "AAACL1234C",
                "gst": "18AABCU9603R1ZM"
            }
        }

        const apiCall = new HttpRequest(
            account_creation_url,
            "POST",
            account_data,
            {
                "Accept": "application/json"
            }
        );


        try {
            const result = await apiCall.send();

            // var response = {
            //     status: result.status,
            //     statusText: result.statusText || "OK",
            // }

            return result;
        }
        catch (err) {
            console.log("Error =====>>> ", err?.response?.data);
            res.json({ status: false, message: "Unable to create Settlement Account creation" });
        }
    }
}
export default PaymentService;