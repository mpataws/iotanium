'use strict'

const dataRepository = require("../repository/dataRepository")

module.exports.processEvent = function(event, context, callback) {

    let promises = event.Records.map(record => {
        // Kinesis base64 encodes payloads
        let decoded = new Buffer(record.kinesis.data, 'base64').toString('ascii')
        let data = JSON.parse(decoded)

        // Store records in DDB.
        return dataRepository.saveThingData(data)
    });

    Promise.all(promises).then(() => callback(null, "done"))
}