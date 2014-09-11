var greetingModule = angular.module('GreetModule', []);


greetingModule.controller('greet.ctrl.hello', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.greeting = {hello: 'hello world!'};

	$rootScope.text = 'this is root scope!';
}]);


greetingModule.controller('greet.ctrl.test', ['$scope', function($scope){
	$scope.local = 'this is local scope';
}]);