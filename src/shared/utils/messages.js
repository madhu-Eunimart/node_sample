import moment from 'moment';

const MESSAGES = {
    NOTIFICAION_NOT_FOUND: 'Notification does not exist',
    ORDER_NOT_EXIST:'Order not exist',
    PAYMENT_FAILED :'Refund Payment Failed'
};

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
}

function getAckResponse(context) {
    const message = {
        "ack": {
          "status": "ACK"
        }
      }
    const ack = {};
    // ack.context = context;
    // ack.context.timestamp = new Date().toISOString();
    ack.message = message;

    return ack;
}

function getNackResponse(context) {
    const message = {
        "ack": {
          "status": "NACK", "code": "10001"
        }
      }
    const ack = {};
    // ack.context = context;
    // ack.context.timestamp = new Date().toISOString();
    ack.message = message;

    return ack;
}

export default { MESSAGES, formatMessage,  getAckResponse, getNackResponse};