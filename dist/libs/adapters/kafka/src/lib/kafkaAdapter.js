"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.disconnect = exports.writeToKafka = void 0;
const tslib_1 = require("tslib");
const kafkajs_1 = require("kafkajs");
const kafka = new kafkajs_1.Kafka({
    clientId: 'services-vca-masterdata',
    brokers: ['pkc-kgj76.us-west-2.aws.confluent.cloud:9092'],
    ssl: true,
    sasl: {
        mechanism: 'plain',
        username: 'KTTMEBAIBJTXACAH',
        password: 'l03BBUmKbWAhVnW6F4cEcR+dLWR3vW1Wq6IKbEV8xjloUn7R+k5kRnw8GTt1QChs'
    },
    reauthenticationThreshold: 45000
});
const producer = kafka.producer();
const writeToKafka = (data, topic, type) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield producer.connect();
    yield producer.send({
        topic: topic,
        messages: [{ key: type, value: JSON.stringify(data) }],
    });
    yield producer.disconnect();
});
exports.writeToKafka = writeToKafka;
// # Required connection configs for Kafka producer, consumer, and admin
// bootstrap.servers = pkc - kgj76.us - west - 2.aws.confluent.cloud: 9092
// security.protocol = SASL_SSL
// sasl.mechanisms = PLAIN
// sasl.username = 7R2GQGB6W6VSCLEL
// sasl.password = ziQIeRdmFkNPvHuXAtJW5vlIen4xswWRv5adBqg + cVi / yzyzEiDtO5KfPmrEuzKW
// # Best practice for higher availability in librdkafka clients prior to 1.7
// session.timeout.ms = 45000
const disconnect = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    yield producer.disconnect();
});
exports.disconnect = disconnect;
//# sourceMappingURL=kafkaAdapter.js.map