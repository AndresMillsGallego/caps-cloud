'use strict';

// Brings in dependencies
const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');
const Chance = require('chance');
const chance = new Chance();

// Instantiates the Consumer object and handles the message receipt
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/306466932339/packages.fifo',
  handleMessage: async (message) => {
    let parsedMessage = JSON.parse(message.Body);
    let parsedBody = JSON.parse(parsedMessage.Message);
    console.log(parsedBody);

    let cashMoney = parsedBody.vendorUrl;
    let order = parsedBody.orderId;
    // Publishes the delivered message to the vendor specivic queue
    try {
      setTimeout( async () => {
        const producer = Producer.create({
          queueUrl: cashMoney,
          region: 'us-west-2',
        });
        await producer.send([{
          id: chance.guid(),
          body: `Order: ${order} delivered!`,
        }]);
      }, 3000);

    } catch (error) {
      console.log('producer error', error.message);
    }
  },
});

app.on('error', (error) => {
  console.error(error.message);
});

app.start();
