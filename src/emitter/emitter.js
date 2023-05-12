import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

async function Emitter(message_id, data) {
    console.log("emitted a message with name -----> ",message_id)
    eventEmitter.emit(message_id,data)
}

export {Emitter,eventEmitter}