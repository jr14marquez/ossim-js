'use strict';
const ossim = require('bindings')('ossim');
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'))

/**
 * Parses ossim arguments
 * @param {string} number
 * @param {object} options
 * @return Promise
 */
const argParser = (file,options) => {
	return new Promise((resolve,reject) => {
		fs.accessAsync(file, fs.constants.F_OK | fs.constants.R_OK)
			.then((ok) => {
				resolve({
					dumpFlag: options.dumpFlag || false,
					dnoFlag: options.dnoFlag || false,
					imageGeomFlag: options.imageGeomFlag || false,
					imageInfoFlag: options.imageInfoFlag || true,
					metaDataFlag: options.metaDataFlag || false,
					paletteFlag: options.paletteFlag || false
				})

			})
			.catch(err => {
				reject(`${file} ${err.code === 'ENOENT' ? 'does not exist' : 'is not readable'}`)
			})
	})
}
/**
 * Adds commas to a number
 * @param {string} A file to call ossim info on 
 * @param {object} options to gather info 
 * @return {string}
 */
const info = (file,options) => {
	return argParser(file,options)
		.then((parsed_options) => {
			return JSON.parse(ossim.info(file,parsed_options)).info
		})
		.catch((err) => {
			console.error(err)
		})
};

module.exports = {
    info: info
}