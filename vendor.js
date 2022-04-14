'use strict';

// Brings in AWS and sets the region
const AWS = require('aws-sdk');
AWS.config.update({region : 'us-west-2'});

// Brings in the Consumer object that will subscribe to the queue
const { Consumer } = require('sqs-consumer');

// Handles the message receipt from the queue
const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/306466932339/vendor',
  handleMessage: async (message) => { 
    console.log(message.Body);
  },
});

const Chance = require('chance');
const chance = new Chance();

const sns = new AWS.SNS();

// SNS arn 
const topicArn = 'arn:aws:sns:us-west-2:306466932339:pickup.fifo';

// Randomizes the payload message  
function createMessage() {
  let message = {
    orderId : chance.guid(),
    customer: chance.name(),
    vendorUrl: 'https://sqs.us-west-2.amazonaws.com/306466932339/vendor',
  };
  return message;
}

// Randomizes the whole payload
function createPayload() {
  let payload = {
    Message :  JSON.stringify(createMessage()),
    TopicArn : topicArn,
    MessageGroupId: chance.guid(),
    MessageDeduplicationId: chance.guid(),
  };
  return payload;
}

// Publishes orders at an interval
setInterval(() => {
  const payload = createPayload();
  sns.publish(payload).promise()
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
}, 8000);

app.start();

