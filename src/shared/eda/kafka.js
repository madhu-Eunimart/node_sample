import { Kafka, logLevel } from 'kafkajs'

export var kafkaClusters  = {
  BG:  {},
  BAP: {},
  BPP: {},
  LSP: {},
  RSP: {},
  IGM: {},
  Tech: {},
  WEB3: {}
}

const kafkaLogLevel = logLevel.NOTHING

export const NewKafka = () => {
  
  kafkaClusters.BAP.prefix = process.env.BAP_TOPIC_PREFIX
  kafkaClusters.BPP.prefix = process.env.BPP_TOPIC_PREFIX
  kafkaClusters.LSP.prefix = process.env.LSP_TOPIC_PREFIX
  kafkaClusters.RSP.prefix = process.env.RSP_TOPIC_PREFIX
  kafkaClusters.IGM.prefix = process.env.IGM_TOPIC_PREFIX
  kafkaClusters.BG.prefix = process.env.BG_TOPIC_PREFIX
  kafkaClusters.Tech.prefix = process.env.CORE_TOPIC_PREFIX
  kafkaClusters.WEB3.prefix = process.env.WEB3_PREFIX


  kafkaClusters.BG.kafka = new Kafka({
    clientId: 'gateway-client',
    brokers: [process.env.BG_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })
  kafkaClusters.BAP.kafka = new Kafka({
    clientId: 'bap-client',
    brokers: [process.env.BAP_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })
  kafkaClusters.BPP.kafka = new Kafka({
    clientId: 'bpp-client',
    brokers: [process.env.BPP_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })
  kafkaClusters.LSP.kafka = new Kafka({
    clientId: 'lsp-client',
    brokers: [process.env.LSP_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })
  kafkaClusters.RSP.kafka = new Kafka({
    clientId: 'rsp-client',
    brokers: [process.env.RSP_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })
  kafkaClusters.IGM.kafka = new Kafka({
    clientId: 'igm-client',
    brokers: [process.env.IGM_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })
  kafkaClusters.Tech.kafka = new Kafka({
    clientId: 'my-app',
    brokers: [process.env.TECH_KAFKA_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })
  kafkaClusters.WEB3.kafka = new Kafka({
    clientId: 'web3-client',
    brokers: [process.env.DATA_SCIENCE_KAFKA_BROKER_ADDRESS],
    logLevel: kafkaLogLevel
  })

}

export const produceKafkaEvent = async (cluster, topic, data) => {
  // const kafka = new Kafka({
  //   clientId: 'my-app',
  //   brokers: [process.env.KAFKA_BROKER_ADDRESS]
  // })
            
 try{ 
  if (typeof cluster.kafka === 'undefined') {
    return
  }
            
  topic = cluster.prefix + '.' + topic

  console.log("Producing Topic ==========>>>> ", topic)
  
  const producer = cluster.kafka.producer()
  await producer.connect()
  await producer.send({
    topic: topic,
    messages: [
      { value: JSON.stringify(data) },
    ],
  })
}
catch(error){
  console.log("Error message =========> ",error)
}
  
}

export const consumeKafkaEvent = async ({cluster, topic, groupId = 'ondc-beckn'}) => {
  // const kafka = new Kafka({
  //   clientId: 'my-app',
  //   brokers: [process.env.KAFKA_BROKER_ADDRESS]
  // })

  if (typeof cluster.kafka === 'undefined') {
    return
  }

  topic = cluster.prefix + '.' + topic
  groupId = cluster.prefix + '.' + groupId

  console.log("Consuming Topic ==========>>>>> ", topic)

  const consumer = cluster.kafka.consumer({ groupId: groupId })
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: topic, fromBeginning: false })
  return consumer
}

export const deleteKafkaTopic = async (kafkaClusters, topic) => {
  // const kafka = new Kafka({
  //   clientId: 'my-app',
  //   brokers: [process.env.KAFKA_BROKER_ADDRESS]
  // })
  const admin = kafkaClusters.admin()
  await admin.connect()

  await admin.deleteTopics({
    topics: topic
  })
  await admin.disconnect()
}

export const createKafkaTopic = async (kafkaClusters, topic) => {
  // const kafka = new Kafka({
  //   clientId: 'my-app',
  //   brokers: [process.env.KAFKA_BROKER_ADDRESS]
  // })
  const admin = kafkaClusters.admin()
  await admin.connect()
  await admin.createTopics({
    waitForLeaders: true,
    topics: [
      { topic: topic },
    ],
  });
  await admin.disconnect()
}
