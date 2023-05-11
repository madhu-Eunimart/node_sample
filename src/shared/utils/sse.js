import { produceKafkaEvent, kafkaClusters } from "../eda/kafka.js"
import { topics } from '../eda/consumerInit/initConsumer.js'


const SSE_CONNECTIONS = {};

/**
 * store sse connection object
 * @param {String} messageId
 * @param {Object} sse
 */
function addSSEConnection(messageId, sse) {
  console.log("addSSEConnection", messageId, sse, SSE_CONNECTIONS)
  if (!SSE_CONNECTIONS?.[messageId]) {
    SSE_CONNECTIONS[messageId] = sse;
  }
}

function sendSSEResponse(messageId, action, response, killProcess = false) {
  if (action != 'on_search') {
    produceKafkaEvent(kafkaClusters.WEB3, topics.WEB3_LIVE_FEED, response)
  }

  // console.log('LISTENER PID:', process.pid, Object.keys(SSE_CONNECTIONS))

  console.log("sendSSEResponse", messageId, action, killProcess, JSON.stringify(response))

  if (!SSE_CONNECTIONS?.[messageId]) {
    console.log("messageId0000",messageId);
    console.log("killProcess0000",killProcess);
    setTimeout(() => {
      SSE_CONNECTIONS?.[messageId]?.send(response, action, messageId);
    }, process.env.SSE_TIMEOUT);
    if (killProcess){
      delete SSE_CONNECTIONS[messageId]
    }
  } else {
    console.log("messageId11111",messageId);
    console.log("killProcess1111",killProcess);
    SSE_CONNECTIONS?.[messageId]?.send(response, action, messageId);
    if (killProcess){
      delete SSE_CONNECTIONS[messageId]
    }
  }
}

export { addSSEConnection, sendSSEResponse, SSE_CONNECTIONS };
