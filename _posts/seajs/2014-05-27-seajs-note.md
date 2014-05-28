---
layout: post
title: Seajs 笔记(一)
keywords: Seajs, Seajs笔记
category: seajs
id: 3
---

[玉伯的一份ppt][ppt]

[ppt]: https://speakerdeck.com/lifesinger/seajs

__在这份Seajs的PPT中，玉伯介绍到了Seajs的实现__		

	/*a.js*/
	define(function(require, exports, module){
		var b = require('./b');
		var c = require('./c');
		//other code
	});

	/*main.js*/
	seajs.use(./a);		

* Step1:  	解析 './a'
* Step2.1:  下载a
* Step2.2:	执行define,保存a的factory
* Step2.3: 	得到依赖b和c
* Step2.4：	加载b和c
* Step3:	执行a的factory，得到a的module.exports

__Step1: 路径解析__

在进行路径解析的时候```require('jquery')```,首先判断在```seajs.config```是否定义了该```alias```,	

如果存在替换.(*parseAlias*)		

这之后在根据```base```,将id值解析为uri.(*id2uri*)	

在接下来进行(*parseMap*), 即对```seajs.config```中的map进行解析。	

最终得到完整的路径！		


__Step2: 模块加载___

* 将上一步得到的路径通过 insert script 、xhr、web workder...等方式插入


__[More See PPT][ppt]__
