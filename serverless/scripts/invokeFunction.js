#!/usr/bin/env node

const fs = require('fs')
const exec = require('./exec')

const stage = fs.readFileSync('stage.conf', 'utf8')
const func = process.argv[2]

exec(`sls invoke --function=${func} --path=cloud/entry/test-events/${func}.json --stage=${stage} --log`)
