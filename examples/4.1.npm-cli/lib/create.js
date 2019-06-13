const cryptoRandomString = require('crypto-random-string')
const debug = require('debug')('pw:create')

module.exports = function(account,options) {
	debug(options)
	return cryptoRandomString(options)
}