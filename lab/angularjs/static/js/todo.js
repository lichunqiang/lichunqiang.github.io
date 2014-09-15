angular.module('todoApp', [])
	.controller('TodoController', ['$scope', function($scope){
		$scope.todos = [
			{text: 'learn angular', done: true, doneText: '已完成'},
			{text: 'build angular app', done: false, doneText: '未完成'}
		];

		$scope.addTodo = function() {
			$scope.todos.push({text: $scope.todoText, done: false, doneText: '未完成'});
			$scope.todoText = '';
		};

		$scope.remaining = function() {
			var count = 0;
			angular.forEach($scope.todos, function(todo){
				count += todo.done ? 1 : 0;
				todo.doneText = todo.done ? '已完成' : '未完成';
			});
			return count;
		};

		$scope.archive = function() {
			var oldTodos = $scope.todos;
			$scope.todos = [];
			angular.forEach(oldTodos, function(todo){
				if(!todo.done) $scope.todos.push(todo);

			});
		};

		$scope.change = function(todo){
			console.log(todo);
		};

	}]);
