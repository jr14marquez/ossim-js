'use strict';
var dot = require('dot-object');
var _s = require('underscore.string');

module.exports = (data) => {
	var result = data.split('\n').reduce((acc,cur,i) => {
			if(cur == ''){
				return acc
			}
			var x = cur.split(':')
			var key = _s(x[0]).clean().value()
			var val = _s(x[1]).clean().unquote().unquote().unquote().clean().value()
			if(key == 'geoid_ngs_directory') {
				key = 'geoid_ngs_directory.path'
			}
			dot.str(key,val,acc)
			return acc
		}, {})

	return(JSON.stringify(result,null,2))
}