var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var kafkaAdapter_exports = {};
__export(kafkaAdapter_exports, {
  disconnect: () => disconnect,
  writeToKafka: () => writeToKafka
});
module.exports = __toCommonJS(kafkaAdapter_exports);
var import_kafkajs = require("kafkajs");
const kafka = new import_kafkajs.Kafka({
  clientId: "services-vca-masterdata",
  brokers: ["pkc-kgj76.us-west-2.aws.confluent.cloud:9092"],
  ssl: true,
  sasl: {
    mechanism: "plain",
    // scram-sha-256 or scram-sha-512
    username: "KTTMEBAIBJTXACAH",
    password: "l03BBUmKbWAhVnW6F4cEcR+dLWR3vW1Wq6IKbEV8xjloUn7R+k5kRnw8GTt1QChs"
  },
  reauthenticationThreshold: 45e3
});
const producer = kafka.producer();
const writeToKafka = async (data, topic, type) => {
  await producer.connect();
  await producer.send({
    topic,
    messages: [{ key: type, value: JSON.stringify(data) }]
  });
  await producer.disconnect();
};
const disconnect = async () => {
  await producer.disconnect();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  disconnect,
  writeToKafka
});
