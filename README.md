# AWS Account Setup (Lab Instructor Only)

  - Use a sandbox/lab account for this lab. Onica users can use thier
    sso lab account.

  - Login to AWS account with an IAM user with admin permissions

  - Navigate to Cloud9 in N. Virginia/us-east 1 region:
    <https://console.aws.amazon.com/cloud9/home?region=us-east-1>

  - Create a cloud9 environment called 'admin', accept all other
    defaults

  - When the cloud9 environment is ready, open the cloud9 console in
    your browser

  - In your cloud9 environment, do:
    
        git clone -b lab-setup https://github.com/onicagroup/iotanium.git
        cd iotanium
        ./setup.sh

  - When `setup.sh` is finished, *open a new terminal window* to get the latest node version in your env.  Then, run the following:
    
        cd iotanium/serverless
        npm install

  - When `npm install` is complete, run the following replacing
    `company_name` with the name of the customer for whom we are doing
    the lab, or another name appropriate for the lab event:
        
        #avoid _ and - in the company name, they cause naming issues with some services in this lab
        npm run setStage company 

  - Finally, run the following to deploy the backend infrastructure for the lab:

        npm start

  - Observe the console log output of stack deployment progress. When
    the stack deployment completes, **take note** of the API-Gateway
    endpoint values similar to those one below. You can ignore endpoints not listed below, the are not used in this lab.  You can also get
    these values later from the API-Gatway console if need be:
    
        endpoints: #these are examples, don't use these values for your lab
        GET - https://uh8cgm2ht8.execute-api.us-east-1.amazonaws.com/onica/things
        GET - https://uh8cgm2ht8.execute-api.us-east-1.amazonaws.com/onica/things/{thingId}/data

  - You can test the deployment and the two endpoints above, by sending an MQTT message in the IoT Core console:

        # topic: iotsample/company/thingId/data
        # message:
        {
          "thingId": "7",
          "time": 5543543,
          "temperature": 54,
          "humidity": 77
        }


  - In the AWS IoT console in region us-east-1 <https://console.aws.amazon.com/iot/home?region=us-east-1#/dashboard>:
        
    - Create a new certificate, use "One-click certificate
      creation (recommended)"
    - **download** the cert (GUID.cert.pem) and private key
      (GUID.private.key)
    - activate the certificate
    - attach a suitable IAM policy

    - IN the AWS IoT Console, choose **Settings** and note the IoT
      Endpoint Value, similar to:
    
        1234abcd5678-ats.iot.us-east-1.amazonaws.com

  -   Have the following items gathered in previous steps, prepared to
        share with the lab attendees:
        
    - The AWS API-Gateway `ServiceEndpoint` GET- values above
    - The AWS IoT Core `Endpoint` value
    - The certificate file (GUID.cert.pem)
    - The private key file (GUID.private.key)
    - SSID, username, and password for a wifi network provided by
      the facility hosting the lab. This network must not require
      the use any web interface during the login process, just
      simple u/p auth. If such a network is not available, bring a
      wifi hotspot. The lab activities cannot be completed using a
      network that requires web auth.

  - When the lab is finished, tear down:
    
        # back in your Cloud9 environment
        node_modules/.bin/sls remove --stage=company_name