import EventEmitter from 'events';
const eventEmitter = new EventEmitter();

async function Emitter(message_id, data) {
    eventEmitter.emit(message_id,data)
}

export {Emitter,eventEmitter}