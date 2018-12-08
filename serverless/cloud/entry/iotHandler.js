'use strict'

const thingRepository = require('cloud/repository/thingRepository')

module.exports.handler = function(event, context, callback) {
  console.log("Event", event)

  return thingRepository.updateThing(event)
    .then(() => {
      callback(null, "Processed")
    })
}

