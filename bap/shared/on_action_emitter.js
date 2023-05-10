import eventEmitter from "../emitter/emitter.js"

const Onactionemitter = async(data)=>{
    let messege_id = data.context.message_id
    eventEmitter.emit(messege_id)   
}

export default Onactionemitter