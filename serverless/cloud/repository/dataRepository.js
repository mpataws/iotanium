'use strict';

const AWS = require('aws-sdk')

class DataRepository {

  constructor() {
    this._docClient = new AWS.DynamoDB.DocumentClient()
  }

  saveThingData(event) {

    // Add time representing when we received the event.
    event.receiveTime = Date.now()

    const params = {
      TableName: process.env.dataTable,
      Item: event 
    }

    return this._docClient.put(params).promise()
  }

  getThingData(thingId) {
    const params = {
      TableName: process.env.dataTable,
      KeyConditionExpression: 'thingId = :thingId',
      ExpressionAttributeValues: {
        ':thingId': thingId
      }
    }

    return this._docClient.query(params).promise()
      .then(data => data.Items)
  }
}

module.exports = new DataRepository()
