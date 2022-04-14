'use strict';

const { Consumer } = require('sqs-consumer');
const { Producer } = require('sqs-producer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/306466932339/packages.fifo',
  handleMessage: async (message) => { 
    let messageString = JSON.stringify(message);
    console.log(messageString);

    // let cashmoney = messageString.something
    setTimeout(() => {
      const producer = Producer.create({
        queueUrl: cashmoney,
        region: 'us-west-2'
      });
      await producer.send('Your product was delivered!');
    }, 5000)
  }
});

app.on('error', (error) => {
  console.error(error.message);
})

app.start();
