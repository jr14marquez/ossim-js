'use strict';
const ossim = require('bindings')('ossim');
const Promise = require("bluebird");
const parser = require('../util/parser.js')
const fh = require('../util/fileHandler.js')

module.exports = {

  addKwlKey: { option: '-K', fileRequired: false, numArgs: 2, argSeperator:'=' },
  bounds: { option: '--bounds', fileRequired: true, numArgs: 0, argSeperator:'' },
  canOpen: { option: '--can-open', fileRequired: false, numArgs: 0, argSeperator:'' },
  center: { option: '-c', fileRequired: true, numArgs: 0, argSeperator:'' },
  config: { option: '--config', fileRequired: false, numArgs: 0, argSeperator:'' },
  degToRad: { option: '--deg2rad', fileRequired: false, numArgs: 1, argSeperator:'' },
  disableElev: { option: '--disable-elev', fileRequired: false, numArgs: 0, argSeperator:'' },
  disablePlugin: { option: '--disable-plugin', fileRequired: false, numArgs: 0, argSeperator:'' },
  dumpState: { option: '--dump-state', fileRequired: true, numArgs: 0, argSeperator:'' },
  dno: { option: '--dno', fileRequired: true, numArgs: 0, argSeperator:'' },
  dump: { option: '--D', fileRequired: true, numArgs: 0, argSeperator:'' },
  ecefTollh: { option: '--ecef2ll', fileRequired: false, numArgs: 3, argSeperator:' ' },
  fonts: { option: '--fonts', fileRequired: false, numArgs: 0, argSeperator:'' },
  ftToMtrs: { option: '--ft2mtrs', fileRequired: false, numArgs: 1, argSeperator:'' },
  ftToMtrsUsSurvey: { option: '--ft2mtrs-us-survey', fileRequired: false, numArgs: 1, argSeperator:'' },
  grdToImg: { option: '--grd2img', fileRequired: true, numArgs: 3, argSeperator:' ' },
  height: { option: '--height', fileRequired: false, numArgs: 2, argSeperator:' ' },
  info: { option: '-i', fileRequired: true, numArgs: 0, argSeperator:'' },
  imgToGrd: { option: '--img2grd', fileRequired: true, numArgs: 2, argSeperator:' ' },
  loadPref: { option: '-P', fileRequired: false, numArgs: 1, argSeperator:'' },
  metadata: { option: '-m', fileRequired: true, numArgs: 0, argSeperator:'' },
  mtrsToFt: { option: '--mtrs2ft', fileRequired: false, numArgs: 1, argSeperator:'' },
  mtrsToFtUsSurvey: { option: '--mtrs2ft-us-survey', fileRequired: false, numArgs: 1, argSeperator:'' },
  mtrsPerDeg: { option: '--mtrsPerDeg', fileRequired: false, numArgs: 1, argSeperator:'' },
  north: { option: '-n', fileRequired: true, numArgs: 0, argSeperator:'' },
  projection: { option: '-p', fileRequired: true, numArgs: 0, argSeperator:'' },
  radToDeg: { option: '--rad2deg', fileRequired: false, numArgs: 1, argSeperator:'' },
  imgRect: { option: '-r', fileRequired: true, numArgs: 0, argSeperator:'' },
  revision: { option: '--revision', fileRequired: false, numArgs: 0, argSeperator:'' },
  setEnv: { option: '--env', fileRequired: false, numArgs: 2, argSeperator:'=' },
  up: { option: '-u', fileRequired: true, numArgs: 0, argSeperator:'' },
  gptToUp: { option: '--up-is-up-gpt', fileRequired: true, numArgs: 2, argSeperator:' ' },
  iptToUp: { option: '--up-is-up-ipt', fileRequired: true, numArgs: 2, argSeperator:' ' },
  version: { option: '-V', fileRequired: false, numArgs: 0, argSeperator:'' },
  execute: (data) => {
    //TODO: If empty/no args then push a default arg 

    // Combine optional initial args with chained args
    if(data.initArgs) data.args.push(...data.initArgs)

    if(!data.file && data.fileRequired.has('true')) {
      throw new Error('A file is required as input for one of the methods called.')
    } 
    else if(data.file && data.fileRequired.has('true')) {
      // check if file exists and can be accessed on filesystem
      return fh.exists(data.file)
        .then(() => {
          data.args.push(data.file)
          return parser(ossim.info(data.args))
        })
        .catch(onError)

    }
    else { // No file required or given
      return new Promise((resolve,reject) => {
        var res = parser(ossim.info(data.args))
        if(res){ resolve(res) }

        reject('fail')
      })
    }
  }
}



