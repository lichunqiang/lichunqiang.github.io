<?php
// +----------------------------------------------------------------------
// | Writen By lichunqiang
// +----------------------------------------------------------------------
// | Copyright (c) 2012-2014, All rights reserved.
// +----------------------------------------------------------------------
// | Author: Light <light-li@hotmail.com>
// +----------------------------------------------------------------------

/**
 *  节点信息
 */
class Node
{
  public $value;
  public $next; //前驱节点
  public $prev; //后继节点

  public function __construct($value)
  {
    $this->value = $value;
    $this->next = null;
    $this->prev = null;
  }
}

/**
 * 实现堆栈
 */

class Stack
{
  public $size;
  public $top; //栈顶
  public $bottom; // 栈底

  //进栈
  public function enstack($value)
  {
    $node = new Node($value);
    $this->size++;
    if(null == $this->bottom) {
      $this->bottom = $node;
      $this->top = $node;
    } else {
      $this->top->next = $node;
      $node->prev = $this->top;
      $this->top = $node;
    }
  }

  //出栈
  public function destack()
  {
    if(null == $this->top) {
      return null;
    } else {
      $this->size--;
      $node = $this->top; //出栈元素
      $this->top = $node->prev;
      return $node->value;
    }
  }

  //栈长度
  public function size()
  {
    return $this->size;
  }
}

$stack = new Stack();
//test
for($i = 0; $i < 10; $i++) {
  $stack->enstack($i);
}

while(null !== ($val = $stack->destack())) {
  var_dump($val);
}