---
layout: post
title: 怎样撤销一次错误的提交
keywords: Github
categories: [github]
tags: [technology]
id: 1405138557850
---

### 起因

一次在给一个项目提交pull request的时候，新建一个`patch`做修改并进行了`pull-request`。

但是在没有注意的情况下，我在本地有做了些修改。__PS:在提交pull-request的分支的操作__

我就不假思索的提交到了github,但是悲剧了：

> 当在某个分支向原项目提交`pull-request`后，如果你在自己fork的项目中向该分支进行任何提交都会自动的合并到之前的`pull-request`中。

### 解决

简单的搜索了下解决方案，如下:


1. 进入该分支的`Commits`历史页面，然后拷贝你错误提交的上一次提交的SHA

2. 然后执行：


		git push -f origin 342cd123132..dew1dd:patch-1


问题解决。

