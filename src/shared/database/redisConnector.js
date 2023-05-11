import redis from 'redis'

const redisConnect = async () => {

    // Need to read this from a configuration file
    if (!process.env.REDIS_CONNECTION_STRING) {
        throw new Error("Redis Database connection string not configured in ENV file");
    }
    const redisUri = process.env.REDIS_CONNECTION_STRING;
    
    const client = redis.createClient();
    // const client = redis.createClient({
    //     url: redisUri,
    //     legacyMode: true
    //   });
    await client.connect()
    return client;
};

export default redisConnect;
