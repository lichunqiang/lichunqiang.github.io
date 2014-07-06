---
layout: post
title: 将本地目录添加到github的repos
keywords: Github, local repos, 本地项目
category: github
id: 1404654536857
---

1. 命令行切换到工作目录，并执行init 

	git init

2. 在github创建repos，并执行：

	git remote add origin git@github.com:xxx/xx.git

3. 获取同步

	git fetch

4. 切换本地工作目录的分支

	git checkout master

5. 更新
	git pull

6. 将本地修改提交

	git add --all
	git commit -m 'comments'

7. 推送

	git push origin master

