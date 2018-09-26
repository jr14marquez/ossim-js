'use strict';
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'))

/**
 * Check if file exists on filesystem
 * @param {string} filepath
 * @return Promise
 */
const exists = (file) => {
	return new Promise((resolve,reject) => {
		fs.accessAsync(file, fs.constants.F_OK | fs.constants.R_OK)
			.then((ok) => {
				resolve('ok')
			})
			.catch(err => {
				reject(`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`)
			})
	})
}

module.exports = {
	exists: exists
}