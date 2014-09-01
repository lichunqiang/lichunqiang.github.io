define(function(require, exports, module){
	var util =require('./util');

	var faker = require('./faker')
	var page = {};

	page.init = function() {
		console.log('this is init function');
	}
	page.name = 'light';

	function selfCall() {
		console.log('self called');
	}

	page.say = util.say;

	page.getName = faker.getName;

	page.selfCall = selfCall;
	// selfCall();
	module.exports = page;
});
