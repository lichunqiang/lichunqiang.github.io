---
layout: post
title: 使用命令行添加一个存在的项目
keywords: 使用命令行添加一个存在的项目 Adding an existing project to GitHub using the command line
category: github
id: 1403321082581
---

1. 首先在Github上新建一个repos

2. 在命令行工具中进入到项目文件夹

3. 初始化

		git init

4. 为初次提交添加文件

		git add .

5. 提交

		git commit -m  'First Commit'

6. 将远程地址添加到本地repos

		git remote add origin <remote repos URL>
		# Sets the new remote
		git remote -v
		# Verifies the new remote URL

7. 推送

		git push origin master