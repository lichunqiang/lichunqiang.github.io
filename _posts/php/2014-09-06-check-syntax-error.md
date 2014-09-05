---
layout: post
title: PHP 笔记(一)
description: PHP常用函数和常量
categories: [php]
tags: [technology]
---

## 如何检查PHP文件是否有语法错误

了解什么是语法错误：http://en.wikipedia.org/wiki/Syntax_error

> 编译器过程中，如果遇到不合法的语法的代码时会报语法错误。既不符合编程语言的语法规范。

对于编译型语言，语法错误发生在编译的时候。程序将不会编译通过直到所有的语法错误解决。

对于解释型语言，并不是所有的语法错误能被可靠的发现直到运行的时候。

使用命令行工具，如下:

```sh
$ php -l filename.php
```