---
layout: post
title: PHP 接口
description: PHP接口介绍
categories: [php]
tags: [technology]
---

> 接口可以指定某些类必须实现哪些方法，但不需要定义这些方法的具体内容， 所以定义的所有方法都是空的

### 需要注意的点

要实现一个接口，使用`implements`操作符。类中必须实现接口中定义的所有方法，类可以实现多个接口，用逗号来分割多个接口名称。

* 接口中所有的方法都必须是公有的，这是接口的特性

* 实现多个接口时，接口中的方法不能有重名

* 接口也可以通过`extends`操作符实现继承

* 类要实现接口，必须使用和接口中所定义的方法完全一致的方式。

* 接口中也可以定义常量，不能被子类或子接口所覆盖

  <?php
    //声明一个'iTemplate'接口
    interface iTemplate
    {
      public function setVariable ($name, $var);
      public function getHtml ($template);
    }

    //实现接口
    class Template implement iTemplate
    {
      private $vars = array();

      public function setVariable($name, $var)
      {
        $this->vars[$name] = $var;
      }

      public function getHtml($template)
      {
        foreach($this->vars as $name => $value)
        {
          $template = str_repleace('{' . $name . '}', $value, $template);
        }
        return $template;
      }
    }
