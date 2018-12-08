'use strict'

module.exports.handler = function(event, context, callback) {
  console.log("Event", event)

  callback(null, {
    statusCode: 200,
    body: "Hello, world!"
  })
}
