'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region : "us-west-2"})

const { Consumer } = require('sqs-consumer');

const app = Consumer.create({
  queueUrl: 'https://sqs.us-west-2.amazonaws.com/306466932339/vendor',
  handleMessage: async (message) => { 
    let messageString = JSON.stringify(message);
    console.log(messageString);
  }
});

const Chance = require('chance');
const chance = new Chance();

const sns = new AWS.SNS();

const topicArn = 'arn:aws:sns:us-west-2:306466932339:pickup.fifo';



const message = {
  orderId : chance.guid(),
  customer: chance.name(),
  vendorUrl: 'https://sqs.us-west-2.amazonaws.com/306466932339/vendor',

}

let payload = {
  Message :  message,
  TopicArn : topicArn
}

sns.publish((payload) => {
  if(error){
    console.log(error);
  }
  console.log(payload);
})

