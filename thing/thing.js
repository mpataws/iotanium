const awsIot = require('aws-iot-device-sdk')

const host = process.argv[2]
const stage = process.argv[3]
const clientId = process.argv[4]
const topic = `iotsample/${stage}/${clientId}/data`

start()

function start(profile) {
  console.log(`Host: ${host} | ClientId: ${clientId} | Topic: ${topic}`)

  const device = awsIot.device({
    host: host,
    keyPath: 'private.pem',
    certPath: 'cert.pem',
    caPath: 'ca.pem',
    clientId: clientId,
    will: {
      topic: topic,
      payload: JSON.stringify({
        thingId: clientId,
        disconnected: true
      })
    }
  });

  device
    .on('connect', function() {
      console.log('connected');
    })
    .on('close', function() {
      console.log('closed');
    })
    .on('reconnect', function() {
      console.log('reconnecting');
    })
    .on('message', function(topic, payload) {
      console.log('message', topic, payload.toString());
    });

    let temperature = getRandomInt(-20, 40)
    let humidity = getRandomInt(0, 100)

    setInterval(function() {
      temperature = temperature + temperature * getRandom(-0.05, 0.05);
      humidity = humidity + humidity * getRandom(-0.05, 0.05);

      device.publish(topic, JSON.stringify({
        thingId: clientId,
        time: Date.now(),
        temperature: temperature,
        humidity: humidity
      }));
    }, 5000);
}

function getRandom(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}
