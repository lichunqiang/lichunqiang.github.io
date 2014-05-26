/*!
 * hubinfo - a github repo info javascript widget
 * v0.2.0
 * https://github.com/firstandthird/hubinfo
 * copyright First+Third 2014
 * MIT License
*/
!function(a){var b=function(b,c,d){a.ajax({url:"https://api.github.com/repos/"+b+"/"+c,dataType:"jsonp",success:function(a){if("Not Found"==a.data.message)throw new Error("Invalid user or repo");d(a.data)}})},c=function(b,c,d){a.ajax({url:"https://api.github.com/repos/"+b+"/"+c+"/commits",dataType:"jsonp",success:function(a){var b=a.data[0];d(b)}})},d=function(a,d,e){var f,g,h=0,i=2,j=function(){h==i&&e(f,g)};b(a,d,function(a){h++,f=a,j()}),c(a,d,function(a){h++,g=a,j()})},e=function(a){if("string"==typeof a){var b=a.split("T")[0].split("-");a=new Date(b[0],b[1]-1,b[2])}var c=(new Date).getTime(),d=c-a.getTime(),e=Math.floor(d/864e5);return 0===e?"today":e>30?Math.floor(e/30)+" month(s) ago":e+" day(s) ago"};a.fn.hubInfo=function(b){var c=a.extend({},a.fn.hubInfo.defaults,b),f=this;return d(c.user,c.repo,function(b,d){c.debug&&console.log(arguments),f.each(function(f,g){var h=a(c.template);h.find(".repo-lang").html(b.language).end().find(".repo-watchers").html(b.watchers).attr("href",b.html_url).end().find(".repo-forks").html(b.forks).attr("href",b.html_url).end().find(".repo-name").html(b.name).attr("href",b.html_url).end().find(".repo-commit-message").html(d.commit.message).attr("href","https://github.com/"+c.user+"/"+c.repo+"/commit/"+d.sha).end().find(".repo-commit-date span").html(e(d.commit.committer.date)).end();var i=a(g);i.html(h),i.trigger("render")})}),f},a.fn.hubInfo.defaults={user:"",repo:"",debug:!1,template:['<div class="github-repo">','<div class="repo-header">','<div class="repo-stats">','<span class="repo-lang"></span>','<a class="repo-watchers"></a>','<a class="repo-forks"></a>',"</div>","<div>",'<a class="repo-name"></a>',"</div>","</div>",'<div class="repo-commit">','<a class="repo-commit-message"></a>','<div class="repo-commit-date">committed <span></span></div>',"</div>","</div>"].join("")}}(jQuery);