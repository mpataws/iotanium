#!/usr/bin/env node

const fs = require('fs')

const stage = process.argv[2]

fs.writeFileSync('stage.conf', stage)
