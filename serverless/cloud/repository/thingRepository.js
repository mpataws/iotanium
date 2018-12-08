'use strict';

const AWS = require('aws-sdk')

class ThingRepository {

  constructor() {
    this._docClient = new AWS.DynamoDB.DocumentClient()
  }

  getThing(thingId) {
    const params = {
      TableName: process.env.thingsTable,
      Key: {
        thingId
      }
    }

    return this._docClient.get(params).promise()
      .then(data => data.Item)
  }

  deleteThing(thingId) {
    const params = {
      TableName: process.env.thingsTable,
      Key: {
        thingId
      }
    }

    return this._docClient.delete(params).promise()
  }

  getThings() {
    const params = {
      TableName: process.env.thingsTable
    }

    return this._docClient.scan(params).promise()
      .then(data => data.Items)
  }

  updateThing(reading) {
    let thingId = reading.thingId

    const params = {
      TableName: process.env.thingsTable,
      Key: {
        thingId
      },
      ConditionExpression: "attribute_not_exists(lastUpdateTime) OR lastUpdateTime < :updateTime"
    }

    if (reading.disconnected)  {
      params.UpdateExpression = "SET lastUpdateTime = :updateTime, connected = :connected"
      params.ExpressionAttributeValues = {
        ":updateTime": Date.now(),
        ":connected": false
      }

    } else {
      params.UpdateExpression = "SET lastReading = :reading, lastUpdateTime = :updateTime, connected = :connected"
      params.ExpressionAttributeValues = {
        ":updateTime": reading.time,
        ":reading": reading,
        ":connected": true
      }
    }

    return this._docClient.update(params).promise()
  }
}

module.exports = new ThingRepository()
