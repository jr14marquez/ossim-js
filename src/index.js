'use strict';
const ossim = require('../build/Release/ossim.node')
const Promise = require("bluebird");
const fs = Promise.promisifyAll(require('fs'))


//var metadata = JSON.parse(ossim.info("/home/rmarquez/Downloads/images/17MAR20054817-P1BS-056599362010_01_P004.NTF"))
//goal: ossim.info(file,{options})

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
}
/**
 * Adds commas to a number
 * @param {number} number
 * @param {string} locale
 * @return {string}
 */
const info = (file,options) => {
	argParser(file,options)
		.then((flags) => {
			return JSON.parse(ossim.info(file,options))
		})
		.catch((err) => {
			console.err(err)
		})
};

module.exports = {
    info: info
}