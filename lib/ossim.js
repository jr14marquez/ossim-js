const schema = require('./apps/schema')
const s = require('underscore.string')
const ossimCmds = {}

// function which receives an optional file, initital args 
// and returns a default ossim info(oi) object. 
// The info function contains all the actions the oi object can perform 
// like bounds, center and execute.
Object.keys(schema).map(app => {
  ossimCmds[app] = (file,initArgs) => oi({
    file,
    fileRequired: new Set(),
    initArgs,
    args: [`ossim-${app}`],
    app
  })
})

const createFuncs = (data) => {
  var obj = {}

  Object.keys(schema[data.app]).map(key => {
    if(key != 'execute') {
      obj[key] = (...args) => {
        if(args.length != schema[data.app][key].numArgs && schema[data.app][key].numArgs != 'infinit') {
          onError(`Expected ${schema[data.app][key].numArgs} # of args`)
        }

        data.args.push(`${schema[data.app][key].option} ${s.join(schema[data.app][key].argSeperator,...args)}`)
        data.fileRequired = schema[data.app][key].fileRequired
        return oi(data)
      }
    }
    else {
      obj['execute'] = () => {
        return schema[data.app][key](data)
      } 
    }
  })
  return obj
}

const oi = (data) => (createFuncs(data))

const onError = (msg) => {
  throw new Error(msg)
}

module.exports = ossimCmds