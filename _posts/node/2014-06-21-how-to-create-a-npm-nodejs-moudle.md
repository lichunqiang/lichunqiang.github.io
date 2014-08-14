---
layout: post
title: 创建一个NodeJS NPM 包
keywords: 如何创建一个NodeJS NPM 包
category: node
tag: javascript
id: 1403321082582
---

## 创建一个简单的NodeJS程序

创建一个文件夹test，并创建一个新文件uppercaseme.js

	// uppercaseme.js
	"use strict"
	var fs = require('fs');
	var myfile = "myfile.txt";

	if(fs.existsSync(myfile)) {
	    var content = fs.readFileSync(myfile, 'utf8');
	    fs.writeFileSync(myfile, content.toUpperCase());
	    console.log("Done");
	} else {
	    console.log("File does not exist - " + myfile);
	}

代码的目的是读取myfile.txt并转化内容为大写。

__(执行:)__

	node uppercaseme

> 执行命令行命令时需在同一个目录

在命令行可以查看输出，并得知是否执行成功。

## 使用命令行参数

上一个列子将读取的文件hardcoding了，我们稍作改进,通过命令行读取要执行操作的文件。

	//使用process.argv
	0: node
	1: <name-of-your-js-file>
	2+....<additional arguments passed>

更新代码：

	"use strict"
	var fs = require('fs');
	if(process.argv.length > 2) {
	    // Read the first additional argument passed to the program
	    var myfile = process.argv[2];

	    if(fs.existsSync(myfile)) {
	        var content = fs.readFileSync(myfile, 'utf8');
	        fs.writeFileSync(myfile, content.toUpperCase());
	        console.log("Done");
	    } else {
	        console.log("File does not exist - " + myfile);
	    }
	} else {
	    console.log("ERROR: Pass on a file name/path");
	}

代码做了简单的判断，当我们没有获取到输入的文件名时，抛出错误。

__(执行:)__

	node uppercaseme myfile.txt

## 创一个Node模块

将我们写好的模块发布出来，让更多人使用，发布之后其他人就可以像下面一样使用：

* 通过NPM安装

	npm install uppercase

* 在命令行中使用

	uppercaseme <filename>

* 被当作模块在其他模块中使用

	require('uppercaseme');

#### 为了做到以上的效果，我们将会创建一个NPM包

1. 首先我们需要做的是改变目录结构

	test
	    src
	      -- bin
	        -- uppercaseme
	      -- lib
	        -- uppercaseme.js
	      -- package.json
	      -- README.md

	    myfile.txt

将我们刚刚写好的uppercaseme.js移动到lib目录。其他文件先留空在接下来进行完善。

_(命令行仍然在test文件夹)_

	node ./src/lib/uppercaseme ./myfile.txt

和之前的运行效果相同。

2. 接下来创建 src/bin/uppercaseme

> 请注意这个文件没有扩展名

	#!/usr/bin/env node

	"use strict";
	var path = require('path');
	var fs = require('fs');
	var lib = path.join(path.dirname(fs.realpathSync(__filename)), '../lib');

	require(lib + '/uppercaseme.js').convert();

3. 改造文件为Node模块

	"use strict"
	var fs = require('fs');
	function convertThis() {
	    if(process.argv.length > 2) {
	        var myfile = process.argv[2];

	        if(fs.existsSync(myfile)) {
	            var content = fs.readFileSync(myfile, 'utf8');
	            fs.writeFileSync(myfile, content.toUpperCase());
	            console.log("Done");
	        } else {
	            console.log("File does not exist - " + myfile);
	        }
	    } else {
	        console.log("Pass on a file name/path");
	    }
	}
	exports.convert = convertThis;

> 暴露出convert接口

现在在进行测试，将会和之前效果相同

	node ./src/bin/uppercaseme ./myfile.txt

## 创建NPM包

1. 创建 src/package.json 和 src/README.md

package.json:

	{
	  "author": "authoer",
	  "name": "uppercaseme",
	  "description": "Converts files to uppercase",
	  "version": "0.0.1",
	  "repository": {
	    "url": ""
	  },
	  "main": "./lib/uppercaseme",
	  "keywords": [
	    "upper",
	    "case",
	    "file"
	  ],
	  "bin": {
	    "uppercaseme": "./bin/uppercaseme"
	  },
	  "dependencies": {},
	  "engines": {
	    "node": "*"
	  }
	}


> main是一个模块的ID，也是程序的主要入口。在例子中我们的package被命名为 uppercaseme 。当用户安装之后，并 require('uppercaseme')之后我们的主模块的export object会被返回。

> bin 我们会通过命令行在任何地方运行，安装之后，npm全局安装后会创建 bin/uppercaseme的符号链接，或者 ./node_modules/.bin/ 本地安装

> dependencies 我们package的所需的依赖列表

2. 发布

在发布之前，必须有一个user。如果没有:

	npm adduser

提供你的用户名和邮件地址，会为你新建一个用户。

假设你仍然在 test 目录，请执行：

	cd src
	npm publish

提示成功，则表明你已经成功发布一个NPM package

## 安装我们的NPM包

切换到其他目录，并输入命令：

	npm install uppercaseme

这将会获取 uppercaseme 包，并创建一个本地安装。这只是一个本地安装，我们并不能在任何地方使用。
这个命令会在目录创建一个 node_modules 目录，我们的 uppercaseme 模块就安装在此。并且在 .bin 中创建了一个链接。

接下来进行测试：

	echo 'my lowercase file' > myfile.txt

使用我们的模块进行转化：

	./node_modules/.bin/uppercaseme myfile.txt

	OR

	"./node_modules/.bin/uppercaseme" myfile.txt

检查执行之后的文件，是否被成功转化。

接下来进行全局安装，在这之前先将本地安装卸载：

	npm uninstall uppercaseme

这将会把我们的模块在node_modules中移除。

现在我们来进行全局安装：

	npm install -g uppercaseme

安装成功后，我们可以在任何目录进行操作：

	uppercaseme myfile.txt


[参考文章](http://www.tuicool.com/articles/F7f22i)


### [note]

在package.json所在目录下使用npm install . -g可先在本地安装当前命令行程序，可用于发布前的本地测试。