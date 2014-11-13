Tuning NGINX for Performance
------------
NGINX is well known as a high performance [load balancer](http://nginx.com/solutions/load-balancing/), [cache](http://nginx.com/products/content-caching-nginx-plus/) and [web server](http://nginx.com/resources/admin-guide/web-server/), powering over 40% of the busiest websites in the world.  Most of the default NGINX and Linux settings work well for most use cases, but it can be necessary to do some tuning to achieve optimal performance.  This blog post will discuss some of the NGINX and Linux settings to consider when tuning a system.  There are many settings available, but for this post we will cover the few settings recommended for most users to consider adjusting.  The settings not covered in this post are ones that should only be considered by those with a deep understanding of NGINX and Linux, or after a recommendation by the NGINX support or professional services teams.  NGINX professional services has worked with some of the world’s busiest websites to tune NGINX to get the maximum level of performance and are available to work with any customer who needs to get the most out of their system.

## Introduction

A basic understanding of the NGINX architecture and configuration concepts is assumed.  This post will not attempt to duplicate the NGINX documentation, but will provide an overview of the various options with links to the relevant documentation.

A good rule to follow when doing tuning is to change one setting at a time and if it does not result in a positive change in performance, then to set it back to the default value.

We will start with a discussion of Linux tuning since some of these values can impact some of the values you will use for your NGINX configuration.
Linux Configuration

Modern Linux kernels (2.6+) do a good job in sizing the various settings but there are some settings that you may want to change.  If the operation system settings are too low then you will see errors in the kernel log to help indicate that you should adjust them.  There are many possible Linux settings but we will cover those settings that are most likely in need of tuning for normal workloads.  Please refer to Linux documentation for details on adjusting these settings.

__The Backlog Queue__

The following settings relate directly to connections and how they are queued.  If you have high rate of incoming connections and you are setting uneven levels of performance, for example some connections appear to be stalling, then running these settings may help.

net.core.somaxconn: This sets the size of the queue for connections waiting for NGINX to accept them.  Since NGINX accepts connections very quickly, this value does not usually need to be very large, but the default can be very low, so increasing can be a good idea if you have a high traffic website.  If the setting is too low then you should see error message in the kernel log and increase this value until the errors stop.  Note: if you set this to a value greater then 512, you should change your NGINX configuration using the backlog parameter of the listen directive to match this number.

net.core.netdev_max_backlog: This sets the rate at which packets can be buffered by the network card before being handed off the the CPU.  For machines with a high amount of bandwidth this value may need to increased.  Check the documentation for your network card for advice on this setting or check the kernel log for errors relating to this setting.

__File Descriptors__

File descriptors are operating system resources used to handle things such as connections and open files.  NGINX can use up to two file descriptors per connection, for example if it is proxying, then it can have one for the client connection and another for the connection to the proxied server, although if HTTP keepalives are used this ratio will be much lower.  For a system that will see a large number of connections, these settings may need to be adjusted:

sys.fs.file_max: This is the system wide limit for file descriptors.

nofile: This is the user file descriptor limit and is set in the /etc/security/limits.conf file.

__Ephemeral ports__

When NGINX is acting as a proxy, each connection to an upstream server uses a temporary, or ephemeral port.

net.ipv4.ip_local_port_range: This specifies the starting and ending port value to use.  If you see that you are running out of ports, you can increase this range.  A common setting it use ports 1024 to 65000.

net.ipv4.tcp_fin_timeout: This specifies how long after port is no being used that it can be used again for another connection.  This usually defaults to 60 seconds but can usually be safely reduced to 30 or even 15 seconds.

 
## NGINX Configuration

The following are some NGINX directives that can impact performance.  As stated above, we will only be discussing those directives that we recommend most users look at adjusting.  Any directive not mentioned here is one that we recommend not to be changed without direction from the Nginx team.

__Worker Processes__

NGINX can run multiple worker processes, each capable of processing a large number of connections. You can control how many worker processes are run and how connections are handled with the following directives:

worker_processes:  This controls the number of worker processes that NGINX will run.  In most cases, running one worker process per CPU core works well.  This can be achieved by setting this directive to “auto”.   There are times when you may want to increase this number, such as when the work processes have to do a lot of disk I/O.  The default is 1.

worker_connections: This is the maximum number of connections that can be processed at one time by each worker process.  The default is 512, but most systems can handle a larger number.   What this number should be set to will depend on the size of the server and the nature of the traffic and can be discovered through testing.

__Keepalives__

Keepalive connections can have a major impact on performance by reducing the CPU and network overhead needed for opening and closing connections.  NGINX terminates all client connections and has separate and independent connections to the upstream servers.  NGINX supports keepalives for the client and upstream servers.  The following directives deal with client keepalives:

keepalive_requests:  This is the number of requests a client can make over a single keepalive connection.  The default is 100, but can be set to a much higher value and this can be especially useful for testing where the load generating tool is sending many requests from a single client.

keepalive_timeout:  How long a keepalive connection will remain open once it becomes idle.

The following directives deal with upstream keepalives:

keepalive: This specifies the number of idle keepalive connections to an upstream server that remain open for each worker process.  There is no default value for this directive.

To enable keepalive connections to the upstream you must add the following directives:

proxy_http_version 1.1;
proxy_set_header Connection “”;

__Access Logging__

Logging each requests takes both CPU and I/O cycles and one way to reduce this impact is to enable access log buffering.  This will cause NGINX to buffer a series of log entries and write them to the file at one time rather then as separate write operation.  Access log buffering is enabled by specifying the “buffer=size” option of the access_log directive.  This sets the size of the buffer to be used.  You can also use the “flush=time” option to tell NGINX to write the entries in the buffer after this amount of time.  With these two options defined, NGINX will write entries to the log file when the next log entry will not fit into the buffer or if the entries in the buffer are older than the time specified for the flush parameter.  Log entries will also be written when a worker process is re-opening log files or is shutting down.   It is also possible to disable access logging completely.

__Sendfile__

Sendfile is an operating system feature that can be enabled on NGINX.  It can provide for faster tcp data transfers by doing in-kernel copying of data from one file descriptor to another, often achieving zero-copy. NGINX can use it to write cached or on-disk content down a socket, without any context switching to user space, making it extremely fast and using less CPU overhead. Because the data never touches user space, it’s not possible to insert filters that need to access the data into the processing chain, so you cannot use any of the NGINX filters that change the content, e.g. the gzip filter.  It is disabled by default.

__Limits__

NGINX and NGINX Plus allow you to set various limits that can be used to help control the resources consumed by clients and therefore impact the performance of your system and also affect user experience and security.  The following are some of these directives:

limit_conn/limit_conn_zone:  These directives can be used to limit the number of connections NGINX will allow, for example from a single client IP address.  This can help prevent individual clients from opening too many connections and consuming too many resources.

limit_rate: This will limit the amount of bandwidth allowed for a client on a single connection. This can prevent the system from being overloaded by certain clients and can help to ensure that all clients receive good quality of service.

limit_req/limit_req_zone: These directives can be used to limit the rate of requests being processed by NGINX.  As with limit_rate this can help prevent the system from being overloaded by certain clients and can help to ensure that all clients receive good quality of service.  They can also be used to improve security, especially for login pages, by limiting the requests rate so that it is adequate for a human user but one that will slow programs trying to access your application.

max_conns: This is set for a server in an upstream group and is the maximum number of simultaneous connections allowed to that server.  This can help prevent the upstream servers from being overloaded.  The default is zero, meaning that there is no limit.

queue: If max_conns is set for any upstream servers, then the queue directive governs what happens when a request cannot be processed because there are no available servers in the upstream group and some of those servers have reached the max_conns limit.  This directive can be set to the number of requests to queue and for how long.  If this directive is not set, then no queueing will occur.

 
## Additional considerations

There are additional features of NGINX that can be used to increase the performance of a web application that don’t really fall under the heading of tuning but are worth mentioning because their impact can be considerable.  We will discuss two of these features.

__Caching__

By enabling caching on an NGINX instance that is load balancing a set of web or application servers, you can dramatically increase the response time to the client while at the same time dramatically reducing the load on the backend servers.  Caching is a subject of its own and will not be covered here.  For more information on configurating NGINX for caching please see: NGINX Admin Guide – Caching.

__Compression__

Compressing the responses to clients can greatly reduce the size of the responses, requiring less bandwidth, however it does require CPU resources to do the compression so is best used when there is value to reducing bandwidth.  It is important to note that you should not enable compression for objects that are already compressed, such as jpegs.   For more information on configuring NGINX for compression please see: [NGINX Admin Guide – Compression and Decompression](http://nginx.com/resources/admin-guide/compression-and-decompression/)

 

For more information please see:

* [Benchmarking NGINX](http://pages.nginx.com/2014_04_Website_Whitepaper_BenchmarkingNGINX_12014_04_Website_Whitepaper_BenchmarkingNGINXLandingPage.html?_ga=1.62446700.1759659709.1415862211)
* [NGINX documentation](http://nginx.org/en/docs/?_ga=1.70897744.1759659709.1415862211)
* [NGINX and NGINX Plus features](http://nginx.com/products/feature-matrix/)
* [NGINX Plus Technical Specifications](http://nginx.com/products/technical-specs/)

## 原文地址

http://nginx.com/blog/tuning-nginx/
