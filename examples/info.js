const ossim = require('../lib/ossim.js')

const file = '/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF'

ossim.info(file).bounds().center().execute()
.then(data => {
	console.log(data)
})
.catch(err => console.error(err))

// or

ossim.info(file,['--bounds', '-c']).execute()
.then(data => {
	console.log(data)
})
.catch(err => console.error(err))


