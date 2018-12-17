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
thingId = 'team_name'
company_name = 'your_company_name'
endpoint = 'aws_iot_endpoint_dns_hostname'

publish_rate = 5 # seconds between publishing messages
fnames = os.listdir()
cert = read_pem('.crt')
key = read_pem('.key')
topic = "iotsample/%s/%s/data" % (company_name, thingId)

client = mqtt.MQTTClient(thingId,endpoint,ssl = True, ssl_params = {'key': key,'cert': cert})

while True:
    client.connect()
    '''
    data = {
        "thingId": thingId,
        "time": time(),
        "temperature": foo,
        "humidity": bar,
        "light": baz
    }
    '''
    data = {'message': "Hello World from %s" % thingId}

    client.publish(topic, json.dumps(data))
    print("published to topic %s: %s" % (topic, data))
    client.disconnect()
    sleep(publish_rate)