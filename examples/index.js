//var ossim = require('../build/Release/ossim.node')
var ossim = require('../src/index.js')

var options = {
	dumpFlag: options.dumpFlag || false,
	dnoFlag: options.dnoFlag || false,
	imageGeomFlag: options.imageGeomFlag || false,
	imageInfoFlag: options.imageInfoFlag || true,
	metaDataFlag: options.metaDataFlag || false,
	paletteFlag: options.paletteFlag || false
}

var info = ossim.info("/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF",options)
console.log('ossim info: ', info)
