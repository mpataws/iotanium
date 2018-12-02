AWS Account Setup
==============

- Use a sandbox/lab account for this lab.  Onica users can use thier sso lab account.
- Login to AWS account with an IAM user with admin permissions
- Navigate to Cloud9 in N. Virginia/us-east 1 region: https://console.aws.amazon.com/cloud9/home?region=us-east-1
- Create a cloud9 environment called 'admin', accept all other defaults
- When the cloud9 environemnt is ready, open the cloud9 console in your browser
- In your cloud9 environment, do::

    git clone https://bitbucket.org/nbdev/serverless-workshop.git
    cd serverless-workshop
    git checkout cloud9-setup
    ./setup.sh

- When ``setup.sh`` is finished, run the following::

    git reset --hard
    git checkout step-1
    cd serverless
    npm install

- When ``npm install`` is complete, run the following replacing ``COMPANYNAME`` with the name of the customer for whom we are doing the lab, or another name appropriate for the lab event::

    npm run setStage COMPANYNAME

- Finally, run the following::

    git reset --hard
    git checkout step-10
    npm start