import { createClient } from 'redis';

let redisClient;

const redisConnect = async () => {

    let url = `redis://${process.env.REDIS_USERNAME}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB}`

    redisClient = createClient({ url });

    redisClient.on("error", (error) => console.error(`Redis Error : ${error}`));

    await redisClient.connect();
};

const redisSubscribe = async (key) => {
    let message
    message = redisClient.get(key)
    
    for (let i = 0; i < 60; i++) {
        await new Promise(r => setTimeout(r, 1000));
        message = await redisClient.get(key)
        // console.log("message for key", key, "not found");
        if (message != null) {    
            await redisClient.del(key)
            return JSON.parse(message)
        }
    }
    
    return {
        message: {
            "ack": { "status": "NACK" },
            "error": { "type": "Event", "code": "10000", "message": "event timeout" }
        }
    }
}


export {
    redisConnect,
    redisClient,
    redisSubscribe
}