var greetingModule = angular.module('GreetModule', []);


greetingModule.controller('greet.ctrl.hello', ['$scope', '$rootScope', function($scope, $rootScope){
	$scope.greeting = {hello: 'hello world!'};

	$rootScope.text = 'this is root scope!';
}]);


greetingModule.controller('greet.ctrl.test', ['$scope', '$http', function($scope, $http){
	$scope.local = 'this is local scope';

	// $http.get('http://news.at.zhihu.com/api/2/news/latest')
	// 	.success(function(resp){
	// 		console.info(resp);
	// 		$scope.daliyList = resp;
	// 	})

}]);