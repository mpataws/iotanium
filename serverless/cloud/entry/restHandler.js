'use strict'

const thingRepository = require('cloud/repository/thingRepository')
const dataRepository = require('cloud/repository/dataRepository')

module.exports.getThings = function(event, context, callback) {
  console.log("Event", event)

  return thingRepository
    .getThings()
    .then(results => {

      callback(null, successResponse(results))
    })
}

module.exports.getThing = function(event, context, callback) {
  console.log("Event", event)

  return thingRepository
    .getThings(event.pathParameters.thingId)
    .then(results => {

      callback(null, successResponse(results))
    })
}

module.exports.deleteThing = function(event, context, callback) {
  console.log("Event", event)

  return thingRepository
    .deleteThing(event.pathParameters.thingId)
    .then(() => {

      callback(null, successResponse({ status: "Success" }))
    })
}

module.exports.getThingData = function(event, context, callback) {
  console.log("Event", event)

  return dataRepository
    .getThingData(event.pathParameters.thingId)
    .then(results => {

      callback(null, successResponse(results))
    })
}

function successResponse(ret) {
  return {
    statusCode: 200,
    body: JSON.stringify(ret)
  }
}
