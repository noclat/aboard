// Generated by CoffeeScript 1.6.3
var app,board,hashAppend,hashList,hashLoad,hashRemove,hashToggle,updateImages,__indexOf=[].indexOf||function(e){for(var t=0,n=this.length;t<n;t++)if(t in this&&this[t]===e)return t;return-1};board=document.querySelector(".board");updateImages=function(){return setTimeout(function(){var e,t,n,r,i;r=document.querySelectorAll(".js-img");i=[];for(t=0,n=r.length;t<n;t++){e=r[t];e.getBoundingClientRect().top<window.innerHeight*2&&!e.style.backgroundImage&&i.push(e.style.backgroundImage="url("+e.dataset.src+")")}return i},0)};board.addEventListener("scroll",updateImages);board.addEventListener("touchmove",updateImages);window.addEventListener("resize",updateImages);hashList=function(){var e,t,n,r,i;r=window.location.hash.substring(1).split("-");i=[];for(t=0,n=r.length;t<n;t++){e=r[t];e&&i.push(e)}return i};hashToggle=function(e){return __indexOf.call(hashList(),e)>=0?hashRemove(e):hashAppend(e)};hashRemove=function(e){return window.location.hash=hashList().filter(function(t){return t!==e}).join("-")};hashAppend=function(e){if(__indexOf.call(hashList(),e)<0)return window.location.hash=hashList().concat(e).sort(function(e,t){return parseInt(e,16)-parseInt(t,16)}).join("-")};hashLoad=function(e){return window.location.hash=e.sort(function(e,t){return parseInt(e,16)-parseInt(t,16)}).join("-")};localStorage["hash"]!=null&&!hashList().length&&(window.location.hash=localStorage.hash);app=angular.module("aboard",[]);app.filter("mature",function(){return function(e){return __indexOf.call(e.split(" "),"mature")>=0?"*":""}});app.filter("hashList",function(){return function(e){var t,n,r,i,s;s=[];for(n=0,r=e.length;n<r;n++){t=e[n];(i=t.id,__indexOf.call(hashList(),i)>=0)&&s.push(t)}return s}});app.filter("inHashList",function(){return function(e){return __indexOf.call(hashList(),e)>=0}});app.controller("main",["$scope","$http","$compile",function(e,t,n){var r;e.feeds=[];e.items=[];e.current=!1;r=t.jsonp("http://spreadsheets.google.com/feeds/list/0AnqTdoRZw_IRdHctX2RyQncwRVA0eWZsSERsdUxOT0E/od6/public/basic?alt=json-in-script&callback=JSON_CALLBACK");r.success(function(t){var n;e.feeds=function(){var e,r,i,s;i=t.feed.entry;s=[];for(e=0,r=i.length;e<r;e++){n=i[e];s.push(JSON.parse('{"id":"'+n.title.$t+'", '+n.content.$t.replace(/([a-z]+)[\s]*\:[\s]*([^,]+)/g,'"$1":"$2"')+"}"))}return s}().filter(function(e){return e.online!=="0"});return hashList().length?e.loadItems():hashLoad(function(){var t,r,i,s;i=e.feeds;s=[];for(t=0,r=i.length;t<r;t++){n=i[t];n.status==="1"&&s.push(n.id)}return s}())});e.loadFeed=function(n){var i,s;i=function(){var t,r,i,o;i=e.feeds;o=[];for(t=0,r=i.length;t<r;t++){s=i[t];s.id===n&&o.push(s)}return o}().pop();r=t.jsonp("https://ajax.googleapis.com/ajax/services/feed/load?v=2.0&callback=JSON_CALLBACK&num=100&q="+encodeURIComponent(i.feed));r.error(function(){return hashRemove(i.id)});return r.success(function(t){var n,r,o,u;u=t.responseData.feed.entries;for(r=0,o=u.length;r<o;r++){s=u[r];e.items.push({feed:i.id,source:i.url.replace(/^http(?:s)?\:\/\/([^\/]+)\/*$/,"$1"),title:s.title,author:s.author,date:new Date(s.publishedDate),url:s.link,image:(n=s.content.match(/<img[^<>]+src=[\"\']([^\"\']+)[\"\'][^<>]*>/))?n[1]:!1})}e.items=e.items.filter(function(e){return e.image});return e.setCurrent(e.current)})};e.loadItems=function(){var t,n,r,i,s;e.items=e.items.filter(function(e){var t;return t=e.feed,__indexOf.call(hashList(),t)>=0});s=hashList();for(r=0,i=s.length;r<i;r++){t=s[r];__indexOf.call(function(){var t,r,i,s;i=e.items;s=[];for(t=0,r=i.length;t<r;t++){n=i[t];s.push(n.feed)}return s}(),t)<0&&e.loadFeed(t)}if(!e.$$phase)return e.$apply()};e.resetCurrent=function(){return e.setCurrent(!1)};e.setCurrent=function(t){var n,r,i;e.current=t;i=[document.querySelector("#feed-"+t),document.querySelector(".nav-feeds")],n=i[0],r=i[1];n&&(r.scrollLeft=n.offsetLeft-r.offsetLeft-r.offsetWidth/2+n.offsetWidth/2);board.scrollTop=0;updateImages();if(!e.$$phase)return e.$apply()};window.addEventListener("hashchange",function(){localStorage.hash=window.location.hash.substring(1);e.loadItems();if(!e.$$phase)return e.$apply()});return window.addEventListener("keydown",function(t){var n;switch(t.which){case 37:n=e.current?document.querySelector("#feed-"+e.current).previousSibling:document.querySelector(".nav-feed:last-child");break;case 39:n=e.current?document.querySelector("#feed-"+e.current).nextSibling:document.querySelector(".nav-feed:first-child")}if(n)return n.getAttribute?e.setCurrent(n.getAttribute("id").replace("feed-","")):e.resetCurrent()})}]);app.controller("feed",["$scope","$http",function(e,t){e.showItems=function(){return e.setCurrent(e.feed.id)};return e.toggleFeed=function(){var t;hashToggle(e.feed.id);return e.setCurrent((t=e.feed.id,__indexOf.call(hashList(),t)>=0)?e.feed.id:!1)}}]);(function(){var e,t,n,r,i,s,o,u;o=function(){var e,n,r,i;r=["logo","wave","boat"];i=[];for(e=0,n=r.length;e<n;e++){t=r[e];i.push(document.getElementById(t))}return i}(),n=o[0],s=o[1],e=o[2];u=[0,!1],r=u[0],i=u[1];n.addEventListener("mouseout",function(){return clearInterval(i)});return n.addEventListener("mouseover",function(){var t,n,o;o=[1e3/24,4],n=o[0],t=o[1];return i=setInterval(function(){var i;i=t*Math.sin(r*Math.PI*n/1e3/2);s.setAttribute("transform","translate(-"+i+")");e.setAttribute("transform","translate("+i+")");return r++},n)})})();