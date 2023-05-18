// import cron from 'node-cron';
// import PaymentService from '../../bap/bap_client/payment/payment.service.js';
// import { protocolConfirm } from './protocolApis/index.js';
// import { DeleteOnActionResults, ListAllOrders, addOrUpdateOrderWithTransactionId } from '../db/dbService.js';
// import { v4 as uuidv4 } from 'uuid';
// import { RETAIL_ORDER_STATE } from './constants.js';
// import moment from 'moment-timezone';

// const paymentService = new PaymentService()

// const confirmOrderRetry = async () => {

//   try {

//     let orders = await ListAllOrders({ state: { $ne: 'Cancelled' }, received_on_confirm: false, retry_count: { $lte: 3 } })

//     await Promise.all(orders.map(async order => {

//       order.confirm.message_id = uuidv4();
//       order.confirm.timestamp = new Date();

//       if (retry_count == 3) {

//         addOrUpdateOrderWithTransactionId(order?.transaction_id, { state: RETAIL_ORDER_STATE.CANCELLED }, order?.provider?.id)

//       } else {

//         const response = await protocolConfirm(uri, order.confirm);

//         if (response.message.ack.status == 'ACK') {
//           addOrUpdateOrderWithTransactionId(order?.transaction_id, { confirm: order.confirm, retry_count: retry_count + 1 }, order?.provider?.id)

//         } else {
//           addOrUpdateOrderWithTransactionId(order?.transaction_id, { state: RETAIL_ORDER_STATE.CANCELLED }, order?.provider?.id)
//         }
//       }

//       return response;

//     }));

//   }
//   catch (err) {
//     throw err;
//   }

// }

// const deleteOnActionResponse = async () => {

//   try {
//     await DeleteOnActionResults({
//       validTime: {
//         $lte: moment().tz("Asia/Calcutta"),
//       }
//     })
//   }
//   catch (err) {
//     throw err;
//   }

// }

// // schedule for 10 seconds "*/10 * * * * *" 
// //schedule for 30 minutets "00 */30 * * * *" 

// const scheduler = () => {

//   // cron.schedule("20 * * * *", function () {
//   //   console.log("cron ===============> confirmOrderRetry");
//   //   confirmOrderRetry()
//   // });

//   cron.schedule('30 * * * *', () => {
//     console.log("cron ===============> deleteOnActionResponse");
//     deleteOnActionResponse()
//   }, {
//     scheduled: true,
//     timezone: "Asia/Calcutta"
//   });

//   // cron.schedule('00 10 * * *', () => {
//   //   console.log("================Scheduler started================");
//   //    paymentService.settlePayout()
//   // }, {
//   //   scheduled: true,
//   //   timezone: "Asia/Calcutta"
//   // });
// }


// export default scheduler;