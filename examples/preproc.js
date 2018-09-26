const ossim = require('../lib/ossim.js')

const file = '/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTFs'

ossim.preproc(file)
.overviewType('ossim_kakadu_nitfy_j2k')
.createHistogram()
.execute()
.then(response => {
	console.log(response)
})
.catch(err => console.error(err))



