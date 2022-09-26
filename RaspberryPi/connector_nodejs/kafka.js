const { Kafka } = require('kafkajs')

const bootstrapServers = ['pkc-2396y.us-east-1.aws.confluent.cloud:9092'];
const sasl = {
  username: '[username]',
  password: '[password]',
  mechanism: 'plain'
};
const ssl = true;

// This creates a client instance that is configured to connect to the Kafka broker provided by
// the environment variable KAFKA_BOOTSTRAP_SERVER
const kafka = new Kafka({
  clientId: 'mobile_media_controller',
  brokers: bootstrapServers,
  ssl,
  sasl
})

module.exports = kafka;
