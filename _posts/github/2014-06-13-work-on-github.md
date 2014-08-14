---
layout: post
title: 如何在Github上贡献开源项目代码
keywords: 在Github上贡献代码, 如何在Github上贡献开源项目代码
categories: [github]
tags: [technology]
id: 1
---

##### 首先Fork项目


	$ git clone xxxx
	$ git branch fix-error
	$ git checkout branch

将项目代码clone到本地，__(然后创建修改分支，修改分支在本branch进行)__


##### 添加上游远程仓库

	$ git remote add  upstream git@github.com:xx.git

> 更新原作者代码

	$ git fetch upstream
	$ git merge upstream/master

##### 将本地修改branch提交

	$ git add --all
	$ git commit -m 'some text'
	$ git push origin fix-error


删除分支

	$ git branch -d fix-error


## GIT 操作集锦

#### git删除远程分支

	git push origin :branch-name

冒号前面的空格不能少，原理是把一个空分支push到server上，相当于删除该分支。