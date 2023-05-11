import { Router } from 'express';
import { authentication, juspayAuthentication } from '../../../shared/middlewares/index.js';

import PaymentController from './payment.controller.js';

const router = new Router();
const paymentController = new PaymentController();

// sign payload
router.post(
    '/payment/signPayload',
    authentication,
    paymentController.signPayload,
);

// get order status
router.get('/payment/status/:orderId', authentication, paymentController.getOrderStatus);

// verify payment
router.post(
    '/payment/verify',
    juspayAuthentication(),
    paymentController.verifyPayment,
);

router.get('/payment/list/:id', paymentController.GetPayments);

router.get('/payments/list', paymentController.GetAllPayments);

router.get('/payment/download/:id', paymentController.DownloadPayments);

router.get('/payment/:id', paymentController.GetPayment);

router.post('/payment/:id', paymentController.UpdatePayment);

router.post('/payment/razorpay/callback', paymentController.UpdatePaymentRazorpayCallback);

router.post('/payments/settle', paymentController.settlePayout)

export default router;
