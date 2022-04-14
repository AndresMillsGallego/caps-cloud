'use strict';

const AWS = require('aws-sdk');
AWS.config.update({region : "us-west-2"})

const sns = new AWS.SNS();

const topicArn = '';

const payload = {
  Message :  message,
  TopicArn : topicArn
}

sns.publish((payload) => {
  if(error){
    console.log(error);
  }
})