#!/usr/bin/env node

const fs = require('fs')
const exec = require('./exec')

const stage = fs.readFileSync('stage.conf', 'utf8')

exec(`sls deploy --stage=${stage} --verbose`)
