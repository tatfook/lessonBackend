const _ = require("lodash");
const jwt = require("jwt-simple");

const util = {};

util.getDate = function() {
	const date = new Date();
	const year = _.padStart(date.getFullYear(), 4, "0");
	const month =  _.padStart(date.getMonth() + 1, 2, "0");
    const day = _.padStart(date.getDate(), 2, "0");
    const hour = _.padStart(date.getHours(), 2, "0");
    const minute = _.padStart(date.getMinutes(), 2, "0");
	const second = _.padStart(date.getSeconds(), 2, "0");
	
	const datetime = year + month + day + hour + minute + second;
	const datestr = year + month + day;
	const timestr = hour + minute + second;
	return {year, month, day, hour, minute, second, datetime, datestr, timestr};
}

util.jwt_encode = function(payload, key, expire = 3600 * 24 * 100) {
	payload = payload || {};
	payload.exp = Date.now() / 1000 + expire;

	//return jwt.encode(payload, key, "HS1");
	return jwt.encode(payload, key);
}

util.jwt_decode = function(token, key, noVerify) {
	//return jwt.decode(token, key, noVerify, "HS1");
	return jwt.decode(token, key, noVerify);
}

module.exports = util;
