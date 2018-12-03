import machine
import json
import umqtt.simple as mqtt
from time import sleep, time
import iotanium
import os

def read_pem(ext):
    for fname in filter(lambda x:x.endswith((ext)), fnames):
        with open(fname) as f:
            contents = f.read()
    return contents

# config
device_id = 'first_last'
company_name = 'your_company_name'
endpoint = 'aws_iot_endpoint_dns_hostname'

publish_rate = 5 # seconds between publishing messages
fnames = os.listdir()
cert = read_pem('.crt')
key = read_pem('.key')
topic = "iotsample/%s/%s/data" % (company_name, device_id)

client = mqtt.MQTTClient(device_id,endpoint,ssl = True, ssl_params = {'key': key,'cert': cert})

while True:
    client.connect()
    data = {'message': "Hello World from %s" % device_id}
    client.publish(topic, json.dumps(data))
    print("published to topic %s: %s" % (topic, data))
    client.disconnect()
    sleep(publish_rate)