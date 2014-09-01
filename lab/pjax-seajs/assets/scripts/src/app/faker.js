define(function(require, exports, module){

	function Faker() {
		this.name = 'faker';
	}

	Faker.prototype.getName = function(){
		return this.name;
	}

	module.exports = new Faker();
});