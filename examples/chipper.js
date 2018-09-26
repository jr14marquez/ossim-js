'use strict';
const ossim = require('bindings')('ossim');
const options = [
	"--cut-bbox-ll","41.939493 12.551042 41.939851 12.551769",
	"--op","chip",
	"-w","jpeg",
	"B.NTF",
	"output/C_chip.jpeg"
]

var input_file = "/home/rmarquez/Downloads/images-2/B.NTF"
var output = "/home/rmarquez/Downloads/images-2/output/output.jpeg"

var options = 

var result = ossim.chipper(input_file,output,options)
console.log(options)