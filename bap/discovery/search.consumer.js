//@ts-check
import { consumeKafkaEvent, produceKafkaEvent, createKafkaTopic, kafkaClusters } from "../../shared/eda/kafka.js"
import Service from './search.service.js';
import BppService from './bppSearch.service.js';
import { topics } from '../../shared/eda/consumerInit/initConsumer.js'
import { redisClient } from "../../shared/database/redis.js";

const bapSearchConsumer = async (consumerConfig) => {

    let cluster = consumerConfig.cluster
    
    const service = new Service();

    let consumer = await consumeKafkaEvent(consumerConfig)

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {
            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            let request = JSON.parse(message.value.toString());
            
            let topic_ack = topics.CLIENT_API_BAP_SEARCH_ACK

            service.ONDCSearchEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapSearchAckConsumer = async (consumerConfig) => {
    
    let consumer = await consumeKafkaEvent(consumerConfig)

    // let ackResponse

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {

            let response = JSON.parse(message.value.toString());

            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            if (response.context?.message_id) {
                await redisClient.set(response.context?.message_id, JSON.stringify(response));
            }
        }
    }
    )
}

const bapBppSearchConsumer = async (consumerConfig) => {

    let cluster = consumerConfig.cluster

    const service = new BppService();

    let consumer = await consumeKafkaEvent(consumerConfig)

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {
            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            let request = JSON.parse(message.value.toString());
            
            let topic_ack = topics.BAP_BPP_SEARCH_ACK

            service.ONDCSearchEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapBppSearchAckConsumer = async (consumerConfig) => {
    
    let consumer = await consumeKafkaEvent(consumerConfig)

    await consumer.run({
        autoCommitInterval: 5000,
        eachMessage: async ({ topic, partition, message }) => {

            let response = JSON.parse(message.value.toString());

            // console.log({
            //     partition,
            //     topic: topic,
            //     offset: message.offset,
            //     value: message.value.toString(),
            // })

            if (response.context?.message_id) {
                await redisClient.set(response.context?.message_id, JSON.stringify(response));
            }
        }
    }
    )
}

export {
    bapSearchConsumer,
    bapSearchAckConsumer,
    bapBppSearchConsumer,
    bapBppSearchAckConsumer,
}