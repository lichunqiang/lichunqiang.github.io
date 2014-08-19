---
layout: post
title: PHP Every Day
description: 和PHP命名空间有关
categories: [php]
tags: [technology]
---

> PHP命名空间提供了一种将相关的类、函数和常量组合到一起的途径。PHP 在 5.3.0 以后的版本开始支持命名空间。

## 定义命名空间

命名空间通过关键字namespace来声明。如果一个文件中包含命名空间，它必须在其它所有代码之前声明命名空间。

将全局的非命名空间中的代码和命名空间的代码组合在一起，只能使用大括号的形式。全局代码必须用一个不带名称的namespace语句加上大括号括起来：

    namespace MyPorject {
      const CONNECT_OK = 1;
      class Connection {};
      function connect() {};
    }
    namespace {
      session_start();
      $a = new MyProject\Connection();
    }

## 使用命名空间

1. 非限定名称，或不包含前缀的类型名称。

> 名称中不包含命名空间分隔符的标识符，例如 Foo

2. 限定名称，或包含前缀的名称。

> 名称中含有命名空间分隔符的标识符，例如 Foo\Bar

3. 完全限定名称，或包含了全局前缀操作符的名称。

> 名称中包含命名空间分隔符，并以命名空间分隔符开始的标识符，例如 \Foo\Bar。 namespace\Foo 也是一个完全限定名称.

> 注意访问任意全局类、函数或常量，都可以使用完全限定名称，例如 \strlen() 或 \Exception 或 \INI_ALL。

    namespace Foo \ Bar;

    function strlen($str) {
      return $str;
    }

    echo strlen('test'); //print test

    echo \strlen('test'); //print 4

### 命名空间和动态语言特征

必须使用完全限定名称（包括命名空间前缀的类名称）。注意因为在动态的类名称、函数名称或常量名称中，限定名称和完全限定名称没有区别，因此其前导的反斜杠是不必要的。

PHP支持两种抽象的访问当前命名空间内部元素的方法， __NAMESPACE__ 魔术常量和namespace关键字。

常量__NAMESPACE__的值是包含当前命名空间名称的字符串。在全局的，不包括在任何命名空间中的代码，它包含一个空的字符串。

关键字 namespace 可用来显式访问当前命名空间或子命名空间中的元素。它等价于类中的 self 操作符。

    namespace MyProject;

    function foo() {};

    namespace \ foo(); // calls function MyProject \ foo()

### 使用命名空间：别名/导入

> 注意PHP不支持导入函数或常量。

导入的命名空间必须是完全限定的，不会根据当前的命名空间做相对解析，所以前道的反斜杠是不必要的也不允许有反斜杠。

##### 导入操作是在编译的时候执行的，但动态的类名称、函数名称或常量名则不是。

    use My \ Full \ classname as Another, My \ Full \ NSname;

    $obj = new Another; //实例化 My \ Full \ classname 对象
    $a = 'Another';
    $obj2 = new $a; //实例化一个Another对象

> 另外，导入操作只影响非限定名称和限定名称。完全限定名称由于是确定的，故不受导入的影响

    use My \ Full \ classname as Another, My \ Full \ NSname;

    $obj = new Another; // My\Full\classname
    $obj = new \Another; // instance of class Another
    $obj = new Another \ thing; // My\Full\classname\thing;
    $obj = new \Another\thing; // Another\thing


##### 后备全局函数/常量

在命名空间中遇到一个非限定的类、函数和常量名称时，使用不同的优先策略来解析该名称。

类名称总是解析到当前命名空间中的名称。

    namespace MyProject;

    $a = new Exception('hi'); //会报错：Class 'MyProject\Exception' not found.

因此在访问系统内部或不包含在命名空间中的类名称时，必须使用完全限定名称。

    namspace MyProject;

    $a = new \Exception('hi');// success

对于函数和常量来说，如果当前命名空间中不存在该函数或常量，PHP 会退而使用全局空间中的函数或常量。

## 名称解析规则

1. 对完全限定名称的函数、类和常量的调用在编译时解析.例如 new \A\B 解析为类 A\B.

2. 所有的非限定名称和限定名称根据当前的导入规则在编译时进行转换。例如,如果命名空间A\B\C被导入C，那么对 C\D\e() 的调用会被转换为 A\B\C\D\e().

3. 在命名空间内部，所有的没有根据导入规则转换的限定名称均会在其前面加上当前的命名空间名称。例如，如果命名空间 A\B 内容中调用 C\D\e(),则会转换为 A\B\C\D\e().

4. 非限定名称根据当前的导入规则在编译时转换(用全名代替短的导入名)。例如，如果命名空间 A\B\C 导入为 C，则 new C() 被转化为 new A\B\C().

5. 在命名空间(例如A\B)内部对非限定名称或限定名称类的调用是在运行时解析的。下面是调用 new C() 及 new D\E()的解析过程：

   * new C()的解析:

      1. 在当前命名空间中查找 A\B\C 类
      2. 尝试自动加载类 A\B\C

   * new D\E()的解析：

      1. 在类名称前加上当前命名空间名称变成：A\B\D\E,然后查找该类。
      2. 尝试自动加载类 A\B\D\E

> 为了引用全局命名空间中的全局类，必须使用完全限定名称 new \C();