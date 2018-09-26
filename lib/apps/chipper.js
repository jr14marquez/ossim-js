'use strict';
const ossim = require('bindings')('ossim');
const Promise = require("bluebird");
const parser = require('../util/parser.js')
const fh = require('../util/fileHandler.js')

module.exports = {
  twoCmvBlueOutputSrc: { option: '--2cmv-blue-output-source', fileRequired: true, numArgs: 1, argSeperator:'' },
  twoCmvGreenOutputSrc: { option: '--2cmv-green-output-source', fileRequired: true, numArgs: 1, argSeperator:'' },
  twoCmvNewInputBand: { option: '--2cmv-new-input-band', fileRequired: true, numArgs: 1, argSeperator:'' },
  twoCmvOldInputBand: { option: '--2cmv-old-input-band', fileRequired: true, numArgs: 1, argSeperator:'' },
  twoCmvRedOutputSrc: { option: '--2cmv-red-output-source', fileRequired: true, numArgs: 1, argSeperator:'' },
  azimuth: { option: '--azimuth', fileRequired: true, numArgs: 1, argSeperator:'' },
  brightness: { option: '--brightness', fileRequired: true, numArgs: 1, argSeperator:'' },
  centralMeridian: { option: '--centreal-meridian', fileRequired: true, numArgs: 1, argSeperator:'' },
  clipPolyLatLon: { option: '--clip-poly-lat-lon', fileRequired: true, numArgs: 'infinit', argSeperator:'' }, //need to test
  clipWmsBboxLL: { option: '--clip-wms-bbox-ll', fileRequired: true, numArgs: 4, argSeperator:',' },//test
  color:  { option: '--color', fileRequired: true, numArgs: 3, argSeperator:' ' },
  colorTable:  { option: '--color-table', fileRequired: true, numArgs: 1, argSeperator:'' },
  combinerType:  { option: '--combiner-type', fileRequired: true, numArgs:1, argSeperator:'' },
  contrast: { option: '--contrast', fileRequired: true, numArgs:1, argSeperator:'' },
  cutBboxLl: { option: '--cut-bbox-ll', fileRequired: true, numArgs: 4, argSeperator:' ' },
  cutBboxLlWh: { option: '--cut-bbox-llwh', fileRequired: true, numArgs: 6, argSeperator:' ' },//test
  cutBboxXyWh: { option: '--cut-bboxy-xywh', fileRequired: true, numArgs: 4, argSeperator:' ' },
  cutCenterLlr: { option: '--cut-bbox-llr', fileRequired: true, numArgs: 3, argSeperator:' ' },
  cutCenterLlwh: { option: '--cut-center-llwh', fileRequired: true, numArgs: 4, argSeperator:' ' },
  cutHeight: { option: '--cut-height', fileRequired: true, numArgs: 1, argSeperator:'' },
  cutWidth: { option: '--cut-width', fileRequired: true, numArgs: 1, argSeperator:'' },
  cutWmsBbox: { option: '--cut-wms-bbox', fileRequired: true, numArgs: 4, argSeperator:',' },
  cutWmsBboxLl: { option: '--cut-wms-bbox-ll', fileRequired: true, numArgs: 4, argSeperator:',' },
  degrees: { option: '--degrees', fileRequired: true, numArgs: 1, argSeperator:' ' },
  disableElev:  { option: '--disable-elev', fileRequired: false, numArgs: 0, argSeperator:'' },
  disablePlugin:  { option: '--disable-plugin', fileRequired: false, numArgs:0, argSeperator:'' },
  elevation: { option: '--elevation', fileRequired: true, numArgs: 1, argSeperator:'' },
  enableNullPxFlip: { option: '--enable-null-pixel-flip', fileRequired: true, numArgs: 0, argSeperator:'' },
  setEnv: { option: '--env', fileRequired: false, numArgs: 2, argSeperator:'=' },
  exaggeration: { option: '--exaggeration', fileRequired: true, numArgs: 1, argSeperator:'' },
  fullResXys: { option: '--fullres-xys', fileRequired: true, numArgs: 3, argSeperator:' ' },
  hemisphere: { option: '--hemisphere', fileRequired: true, numArgs: 1, argSeperator:'' },
  histogramAoi: { option: '--histogram-aoi', fileRequired: true, numArgs: 4, argSeperator:',' },
  histogramCenterTile: { option: '--histogram-center-tile', fileRequired: true, numArgs: 0, argSeperator:'' },
  histogramLlWh: { option: '--histogram-llwh', fileRequired: true, numArgs: 4, argSeperator:',' },
  histogramOp: { option: '--histogram-op', fileRequired: true, numArgs: 1, argSeperator:'' },
  imgSpaceScale: { option: '--image-space-scale', fileRequired: true, numArgs: 2, argSeperator:' ' },
  inputDem: { option: '--input-dem', fileRequired: true, numArgs: 1, argSeperator:'' },
  inputImg: { option: '--input-img', fileRequired: true, numArgs: 1, argSeperator:'' },
  inputSrc: { option: '--input-src', fileRequired: true, numArgs: 1, argSeperator:'' },
  meters: { option: '--meters', fileRequired: true, numArgs: 1, argSeperator:'' },
  op: { option: '--op', fileRequired: true, numArgs: 1, argSeperator:'' },
  options: { option: '--options', fileRequired: true, numArgs: 1, argSeperator:'' },
  originLat: { option: '--origin-latitude', fileRequired: true, numArgs: 1, argSeperator:'' },
  outputRadiometry: { option: '--output-radiometry', fileRequired: true, numArgs: 1, argSeperator:'' },
  padThumbnail: { option: '--pad-thumbnail', fileRequired: true, numArgs: 1, argSeperator:'' },
  projection: { option: '--projection', fileRequired: true, numArgs: 1, argSeperator:'' },
  readerProp: { option: '--reader-prop', fileRequired: true, numArgs: 2, argSeperator:'=' },
  resampleFilter: { option: '--resample-filter', fileRequired: true, numArgs: 1, argSeperator:'' },
  rrds: { option: '--rrds', fileRequired: true, numArgs: 1, argSeperator:'' },
  scale8bit: { option: '--scale-to-8-bit', fileRequired: true, numArgs: 0, argSeperator:'' },
  sharpenMode: { option: '--sharpen-mode', fileRequired: true, numArgs: 1, argSeperator:'' },
  snapTieToOrigin: { option: '--snap-tie-to-origin', fileRequired: true, numArgs: 0, argSeperator:'' },
  srs: { option: '--srs', fileRequired: true, numArgs: 1, argSeperator:'' },
  threeBandOut: { option: '--three-band-out', fileRequired: true, numArgs: 0, argSeperator:'' },
  hemisphere: { option: '--hemisphere', fileRequired: true, numArgs: 1, argSeperator:'' },
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


