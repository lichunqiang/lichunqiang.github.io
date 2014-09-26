---
layout: post
title: Hello Github
keywords: Hello Github
categories: [javascript]
tags: [anguarJS]
description: angularJS中各种的provider不同之处
---

> 原文http://blog.xebia.com/2013/09/01/differences-between-providers-in-angularjs/

## 什么是Provider

AngularJS官方文档定义：

> A provider is an object with a $get() method.
> The injector calls the $get method to create a new instance of a service.
> The Provider can have additional methods which would allow for configuration of the provider.

AngularJS使用$provide 来注册新的provider. 每个Provider只进行一次实例的创建。

$provide 有六个方法来创建定制化的Provider：

* constant
* value
* service
* factory
* decorator
* provider


### constant

constant能够被注入到任何地方。constant不能被装饰器拦截，这意味着contant的值将永远无法改变。

	var app = angular.module('app', []);

	app.config(function($provide){
		$provide.constant('movieTitle', 'The Matrix');
	});

	app.controller('ctrl', function(movieTitle){
	    expect(movieTitle).toEqual('The Matrix');
	});

AngularJs提供一种更加简便的方式创建constant:

	app.constant('movieTitle', 'The Matrix');

### value

value只是一个简单的可注入的值，这个值可以是字符串、数字和方法。和constant不同的是它不能够被注入到配置，但是能够被装饰器拦截。

	var app = angular.module('app', []);

	app.config(function($provide){
	 	$provide.value('movieTitle', 'The Matrix');
	});

	app.controller('ctrl', function(movieTitle){
		expect(movieTitle).toEqual('The Matrix');
	});

AngularJs提供一种更加简便的方式创建value:

	app.value('movieTitle', 'The Matrix');


### service

service 是一个可注入的构造函数。你可以在函数中指定依赖。service是单例的，只被anguarJs创建一次。service是一个非常棒的方法来进行controller之间的通信，例如共享数据.

	var app = angular.module('app', []);

	app.config(function($provide){
		$provide.service('movie', function(){
			this.title = 'The Matrix';
		});
	});

	app.controller('ctrl', function(movie){
		expect(movive.title).toEequal('The Matrix');
	});

AngularJs提供一种更加简便的方式创建service:

	app.service('movieTitle', function(){
		this.title = 'The Matrix';
	});

### Factory

factory是一个可注入的方法。从某种的意义而言factory非常像service，它也是单例的同样能够在函数中定义依赖。两者不同的是，factory注入是一个plain function，所以angularjs能够执行该方法，而service注入的是一个构造函数。当去new一个serivce的时候，构造函数创建一个新的对象。但是使用factory你可以让函数返回任何东西。

稍后你会看见，factory仅仅是一个拥有 $get 方法的provider。

	var app = angular.module('app', []);

	app.config(function($provide){
		$provide.factory('movie', function() {
			return {
				movie: 'The Matrix'
			};
		});
	});

	app.controlller('ctrl', function(movie){
		expect(movive.title).toEequal('The Matrix');
	});

AngularJS还提供一种更加简便的方法：

 	app.factory('movie', function() {
 		return {
 			movie: 'The Matrix'
 		};
 	});

### Decorator

decorator能够修改和压缩其他provider，正如上面提到的constant是一个列外。

	var app = angular.module('app', []);

	app.value('movieTitle', 'The Matrix');

	app.config(function($provide){
		$provide.decorator('movieTitle', function($delegate){
			return $delegate + ' - starring Keanu Reeves'
		});
	});

	app.controller('myCtrl', function(movieTile){
		expect(movieTitle).toEqual('The Matrix - starring Keanu Reeves');
	});

### Provider

provide在所有的provider中是最复杂的方法，它允许你创建一个复杂的功能和配置选项.

provide 实际上是一个配置的factory.它可以是一个对象或者构造函数。

	var app = angular.module('app', []);

	app.provider('movie', function(){
		var version;
		return {
			setVersion: function(value) {
				version = value;
			},
			$get: function() {
				return {
					title: 'The Matrix' + ' ' + version
				}
			}
		};
	});

	app.config(function(movieProvider){
		movieProvider.setVersion('Reloaded');
	});

	app.controller('ctrl', function(movie) {
		expect(movieTitle).toEqual('The Matrix Reloaded');
	});

## 总结

* 所有的provider只被实例化一次，它们全是单例的。
* 除了constant的所有provider都能够被装饰
* constant是一个能被注入到任何地方的值，而且不能被修改
* value只是一个简单能被注入的值
* service是一个能被注入的构造方法
* factory是一个能被注入的函数
* decoratory能够修改压缩除了constant的其他provider
* provider是一个可配置的facotry