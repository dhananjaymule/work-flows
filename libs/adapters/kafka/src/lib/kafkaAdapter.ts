import { Kafka } from 'kafkajs'
const kafka = new Kafka({
    clientId: 'services-vca-masterdata',
    brokers: ['pkc-kgj76.us-west-2.aws.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain', // scram-sha-256 or scram-sha-512
        username: 'KTTMEBAIBJTXACAH',
        password: 'l03BBUmKbWAhVnW6F4cEcR+dLWR3vW1Wq6IKbEV8xjloUn7R+k5kRnw8GTt1QChs'
    },
    reauthenticationThreshold: 45000

})
const producer = kafka.producer()
export const writeToKafka = async (data: any, topic: string, type: string) => {
    await producer.connect();
    await producer.send({
        topic: topic,
        messages: [{ key: type, value: JSON.stringify(data) }],
    })

    await producer.disconnect();

}


// # Required connection configs for Kafka producer, consumer, and admin
// bootstrap.servers = pkc - kgj76.us - west - 2.aws.confluent.cloud: 9092
// security.protocol = SASL_SSL
// sasl.mechanisms = PLAIN
// sasl.username = 7R2GQGB6W6VSCLEL
// sasl.password = ziQIeRdmFkNPvHuXAtJW5vlIen4xswWRv5adBqg + cVi / yzyzEiDtO5KfPmrEuzKW

// # Best practice for higher availability in librdkafka clients prior to 1.7
// session.timeout.ms = 45000



export const disconnect = async () => {

    await producer.disconnect()
}