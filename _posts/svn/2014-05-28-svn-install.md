---
layout: post
title: Centos安装配置SVN
keywords:  Centos安装配置SVN
description: Centos安装配置SVN遇到问题
category: svn
tag: technology
id: 1401264307339
---

#### centos 配置svn ####
***

* 检查是否安装svn

		$rpm -qa subversion

* 卸载旧版本的svn

		$yum remove subversion

* 安装需要的apache模块

		$yum install mod_dav_svn mod_auth_mysql
		//确认是否安装
		$ls /etc/httpd/modules | grep svn
			mod_authz_svn.so
			mod_dav_svn.so

* 验证安装

		$svnserve --version
			svnserve，版本 1.6.11 (r934486)
			编译于 Jun 23 2012，00:44:03
			版权所有 (C) 2000-2009 CollabNet。
			Subversion 是开放源代码软件，请参阅 http://subversion.tigris.org/ 站点。
			此产品包含由 CollabNet(http://www.Collab.Net/) 开发的软件。

			下列版本库后端(FS) 模块可用:

			* fs_base : 模块只能操作BDB版本库。
			* fs_fs : 模块与文本文件(FSFS)版本库一起工作。

			Cyrus SASL 认证可用。

以上的配置参考[CentOS-6.3安装配置SVN](http://my.oschina.net/junn/blog/164041)

### 配置apache ###
***
由于我的服务器80端口被nginx占用，所以采用nginx反向代理的办法,apache监听8080端口，
配置nginx

	proxy_pass http://127.0.0.1:8080

#### 配置svn用户密码 ####

> 设置密码

	$sudo htpasswd -c /opt/svn/passwd abc

创建用户abc并按照提示设置密码，网页认证的时候使用该用户名和密码登录。后面再添加用户的时候去掉-c选项。

*初始化版本仓库，导入原始代码

	$ svn import /data/www/code file:///opt/svn/repos1 -m 'first init'
	$ chown -R apache.apache repos

#### 创建svn版本库 ####

	$ svnadmin create /opt/svn/testrepos

> svnadmin在创建版本库时是root身份，需使用```chown```改变，保证svn对文件目录有权限