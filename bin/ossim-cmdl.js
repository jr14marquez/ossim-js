#!/usr/bin/env node

const path = require('path')
const ossim = require('bindings')('ossim');

// Determine which ossim cmd the user wants  and grab args
const cmd = path.basename(process.argv[1].split('-').pop())
const args = process.argv.slice(1,process.argv.length)

// If no arguments are supplied display help information
if (process.argv.length <= 2) {
    args.push('-h')
}

console.log(ossim[cmd](args))

