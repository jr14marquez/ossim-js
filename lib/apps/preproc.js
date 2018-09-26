'use strict';
const ossim = require('bindings')('ossim');
const Promise = require("bluebird");
const parser = require('../util/parser.js')
const fh = require('../util/fileHandler.js')

module.exports = {
  addKwlKey: { option: '-K', fileRequired: false, numArgs: 2, argSeperator:'=' },
  createHistogram: { option: '--ch', fileRequired: true, numArgs: 0, argSeperator:'' },
  createHistogramFast: { option: '--chf', fileRequired: true, numArgs: 0, argSeperator:'' },
  compressionQuality: { option: '--ccompression-quality', fileRequired: true, numArgs: 1, argSeperator:'' },
  compressionType: { option: '--compression-type', fileRequired: true, numArgs: 1, argSeperator:'' },
  computeMinMax: { option: '--compute-min-max', fileRequired: true, numArgs: 0, argSeperator:'' },
  computeMinMaxNull: { option: '--compute-min-max-null', fileRequired: true, numArgs: 0, argSeperator:'' },
  createHistogramR0: { option: '--create-histogram-r0', fileRequired: true, numArgs: 0, argSeperator:'' },
  createThumbnail:  { option: '--ct', fileRequired: true, numArgs: 0, argSeperator:'' },
  disableElev:  { option: '--disable-elev', fileRequired: false, numArgs: 0, argSeperator:'' },
  disablePlugin:  { option: '--disable-plugin', fileRequired: false, numArgs:0, argSeperator:'' },
  includeFullRes: { option: '-a', fileRequired: true, numArgs:0, argSeperator:'' },
  loadPref: { option: '-P', fileRequired: false, numArgs: 1, argSeperator:'' },
  max: { option: '--max', fileRequired: true, numArgs: 0, argSeperator:'' },
  min: { option: '--min', fileRequired: true, numArgs: 0, argSeperator:'' },
  null: { option: '--null', fileRequired: true, numArgs: 1, argSeperator:'' },
  optionsKwl: { option: '--options', fileRequired: false, numArgs: 1, argSeperator:'' },
  outputDir: { option: '-d', fileRequired: true, numArgs: 1, argSeperator:'' },
  overviewStopDimension: { option: '-s', fileRequired: true, numArgs: 1, argSeperator:'' },
  overviewType: { option: '--ot', fileRequired: true, numArgs: 1, argSeperator:'' },
  readerProp: { option: '--reader-prop', fileRequired: true, numArgs: 2, argSeperator:'=' },
  rebuildHistogram: { option: '--rebuild-histogram', fileRequired: true, numArgs: 0, argSeperator:'' },
  rebuildOverviews: { option: '-r', fileRequired: true, numArgs: 0, argSeperator:'' },
  threads: { option: '--threads', fileRequired: true, numArgs: 1, argSeperator:'' },
  tileSize: { option: '--tile-size', fileRequired: true, numArgs: 1, argSeperator:'' },
  thumbnailStretchType: { option: '--tst', fileRequired: true, numArgs: 1, argSeperator:'' },
  thumbnailType: { option: '--tt', fileRequired: true, numArgs: 1, argSeperator:'' },
  writerProp: { option: '--writer-prop', fileRequired: true, numArgs: 2, argSeperator:'=' },
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


