import { consumeKafkaEvent, produceKafkaEvent } from "../../shared/eda/kafka.js"
import Service from './rating.service.js';
import BppService from './bppRating.service.js';
import { topics } from '../../shared/eda/consumerInit/initConsumer.js'
import { redisClient } from "../../shared/database/redis.js";

const bapRatingConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.CLIENT_API_BAP_RATING_ACK
            // console.log("client api response",request)
            service.ONDCRatingOrderEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}


const bapRatingAckConsumer = async (consumerConfig) => {
    
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

const bapRatingCategoriesConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.CLIENT_API_BAP_RATING_CATEGORIES_ACK

            service.ONDCRatingCategoriesEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                // console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapRatingCategoriesAckConsumer = async (consumerConfig) => {
    
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

const bapFeedbackCategoriesConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.CLIENT_API_BAP_FEEDBACK_CATEGORIES_ACK

            service.ONDCFeedbackCategoriesEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                // console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapFeedbackCategoriesAckConsumer = async (consumerConfig) => {
    
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

const bapFeedbackFormConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.CLIENT_API_BAP_FEEDBACK_FORM_ACK

            service.ONDCFeedbackFormEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                // console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapFeedbackFormAckConsumer = async (consumerConfig) => {
    
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

const bapBppRatingConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.BAP_BPP_RATING_ACK

            service.ONDCRatingEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                // console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}


const bapBppRatingAckConsumer = async (consumerConfig) => {
    
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

const bapBppRatingCategoriesConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.BAP_BPP_RATING_CATEGORIES_ACK

            service.ONDCRatingCategoriesEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                // console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapBppRatingCategoriesAckConsumer = async (consumerConfig) => {
    
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

const bapBppFeedbackCategoriesConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.BAP_BPP_FEEDBACK_CATEGORIES_ACK

            service.ONDCFeedbackCategoriesEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                // console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapBppFeedbackCategoriesAckConsumer = async (consumerConfig) => {
    
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

const bapBppFeedbackFormConsumer = async (consumerConfig) => {

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
            
            let topic_ack = topics.BAP_BPP_FEEDBACK_FORM_ACK

            service.ONDCFeedbackFormEvent(request).then(response => {
                produceKafkaEvent(cluster, topic_ack, response);
            }).catch((err) => {
                // console.log(err);
                produceKafkaEvent(cluster, topic_ack, err);
            });
        },
    })
}

const bapBppFeedbackFormAckConsumer = async (consumerConfig) => {
    
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
    bapRatingConsumer,
    bapRatingAckConsumer,
    bapBppRatingConsumer,
    bapBppRatingAckConsumer,
    bapRatingCategoriesConsumer,
    bapRatingCategoriesAckConsumer,
    bapBppRatingCategoriesConsumer,
    bapBppRatingCategoriesAckConsumer,
    bapFeedbackCategoriesConsumer,
    bapFeedbackCategoriesAckConsumer,
    bapFeedbackFormConsumer,
    bapFeedbackFormAckConsumer,
    bapBppFeedbackCategoriesConsumer,
    bapBppFeedbackCategoriesAckConsumer,
    bapBppFeedbackFormConsumer,
    bapBppFeedbackFormAckConsumer
}