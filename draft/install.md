./configure  

--prefix=/usr/local/webserver/php  

--with-config-file-path=/usr/local/PHP/etc               指定php.ini位置
--with-libXML-dir                                 打开libxml2库的支持

--enable-cli  ##open cli support
--enable-fpm 

--with-mysql=/usr/local/mysql   #mysql install dir

--with-gd --with-curl --with-gettext --enable-mbstring 

--with-mcrypt --with-openssl

--disable-debug

> eg: ./configure --prefix=/usr/local/webserver/php5.5 --enable-cli --enable-fpm --with-gd --with-curl  --with-gettext --enable-mbstring --with-mcrypt --with-openssl --disable-debug --with-mysql --with-pdo-mysql




## MySQL

./configure --prefix=/usr/local/mysql

--with-unix-socket-path=/usr/local/mysql/var/mysql.sock

--with-charset=utf8  --with-collation=utf8_general_ci --with-extra-charsets=all


## install c++ compiler (ubuntu)

```
$ apt-get install g++
```


# Preconfiguration setup
shell> groupadd mysql
shell> useradd -r -g mysql mysql
# Beginning of source-build specific instructions
shell> tar zxvf mysql-VERSION.tar.gz
shell> cd mysql-VERSION
shell> cmake .
shell> make
shell> make install
# End of source-build specific instructions
# Postinstallation setup
shell> cd /usr/local/mysql
shell> chown -R mysql .
shell> chgrp -R mysql .
shell> scripts/mysql_install_db --user=mysql
shell> chown -R root .
shell> chown -R mysql data
# Next command is optional
shell> cp support-files/my-medium.cnf /etc/my.cnf
shell> bin/mysqld_safe --user=mysql &
# Next command is optional
shell> cp support-files/mysql.server /etc/init.d/mysql.server

> http://dev.mysql.com/doc/refman/5.6/en/<installing-source-distribution class="html"></installing-source-distribution>

> http://www.cnblogs.com/fly1988happy/archive/2011/11/21/2257682.html

## nginx

info: require OpenSSL Library, go like following:

--with-openssl=/usr/bin # this is where is openssl locate(if installed openssl)



