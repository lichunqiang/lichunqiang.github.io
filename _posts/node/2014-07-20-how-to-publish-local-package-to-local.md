---
layout: post
title: 全局运行本地 NPM 包
keywords: 全局运行本地 NPM 包
category: node
id: 1403321082583
---

1. In package directory

        $ npm link

This createsa symlink to the current folder in npm's global installation directory.

2. Somewhere else, where you want to use the modules:

        $npm  link <pkgname>

This will  create a symlink in your project's `node_modules/` folder to the global installation.
