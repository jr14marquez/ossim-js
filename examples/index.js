var ossim = require('../build/Release/native.node')

var metadata = JSON.parse(ossim.metadata("/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF"))
console.log("METADATA: ",metadata)
console.log('ossim: ', metadata.info.image0)
