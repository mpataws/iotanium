#!/usr/bin/env node

const fs = require('fs')
const exec = require('./exec')

const stage = fs.readFileSync('stage.conf', 'utf8')
const func = process.argv[2]

exec(`sls deploy function --function=${func} --stage=${stage}`)
