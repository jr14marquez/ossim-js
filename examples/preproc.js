'use strict';
const ossim = require('bindings')('ossim');
const options = ["ossim-preproc","--ot", "ossim_kakadu_nitf_j2k","--ch","/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF"]
var result = ossim.preproc(options)
console.log('result: ',result)


