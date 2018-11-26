import ubinascii
import machine
import json
import umqtt.simple as mqtt
from time import sleep
import iotanium
import os

def read_pem(ext):
    for fname in filter(lambda x:x.endswith((ext)), fnames):
        with open(fname) as f:
            contents = f.read()
    return contents

fnames = os.listdir()
thingId = ubinascii.hexlify(machine.unique_id())
publish_rate = 5 # seconds between publishing messages
topic = 'iotanium'
endpoint = 'REPLACE_WITH_YOUR_ENDPOINT'
cert = read_pem('.crt')
key = read_pem('.key')

client = mqtt.MQTTClient(thingId,endpoint,ssl = True, ssl_params = {'key': key,'cert': cert})
client.connect()

while True:
    data = {'message': 'Hello World!'}
    client.publish(topic, json.dumps(data))
    print("published to topic %s: %s" % (topic, data))
    sleep(publish_rate)