---
layout: post
title: use yum in ubuntu
description: use yum in ubuntu
categories: [linux]
tags: [linux]
---

1. install yum

        $ apt-get install yum
    
2. add repos

        $ cd /etc/yum/repos.d
        $ weget wget http://mirrors.sohu.com/help/CentOS-Base-sohu.repo
        $ vi CentOS-Base-sohu.repo
        & :%s/$releasever/5/g
        > replace $releasever with 5, in the repo file. the release number must be exist in the server

3. cache

        $ yum makecache

Done!
