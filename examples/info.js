//var ossim = require('../build/Release/ossim.node')
var ossim = require('../lib/ossim.js')

var options = {
	dumpFlag: false,
	dnoFlag: false,
	imageGeomFlag: false,
	imageInfoFlag: true,
	metaDataFlag: false,
	paletteFlag: false
}

ossim.info("/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF",options)
.then(data => {
	console.log('data: ', data)
})


