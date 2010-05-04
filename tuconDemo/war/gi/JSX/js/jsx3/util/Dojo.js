/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.util.DojoPubSub",null,[jsx3.util.EventDispatcher],function(c,e){var
V={};var
fa=jsx3.util.EventDispatcher.prototype.publish;e.publish=function(n){if(jsx3.util.Dojo.isLoaded()){n._fromGI=true;dojo.publish(n.subject,[n]);return fa.call(this,n);}};e.subscribe=function(s,a,p){if(jsx3.util.Dojo.isLoaded()){var
sb=this;if(!V[s])V[s]=dojo.subscribe(s,null,function(k){if(!(k&&k._fromGI)){var
cb={subject:s};for(var
ua=0;ua<arguments.length;ua++)cb[ua]=arguments[ua];fa.call(sb,cb);}});return this.jsxsupermix(s,a,p);}};});jsx3.Class.defineClass("jsx3.util.Dojo",null,null,function(j){var
ub={a:"jsx_dojo",b:"jsx:/../dojo-toolkit",c:"",d:"undefined",e:"/dojo/",f:/rhino|spidermonkey/,g:"browser",h:"/dojo/dojo.js",i:"load",j:'[label="JSXBODY"]'};j.hub=new
jsx3.util.DojoPubSub();j.getPath=function(n){var
na=jsx3.getEnv(ub.a)||ub.b;return jsx3.resolveURI(na+(n?n:ub.c));};j.load=function(){if(typeof dojo==ub.d){window.djConfig=typeof djConfig==ub.d?{baseUrl:jsx3.util.Dojo.getPath(ub.e),afterOnLoad:true}:djConfig;load=(function(s){jsx3.CLASS_LOADER.loadJSFileSync(s.replace(ub.f,ub.g));});jsx3.CLASS_LOADER.loadJSFileSync(jsx3.util.Dojo.getPath(ub.h));delete load[ub.i];dojo.body=function(){return (dojo.query(ub.j))[0];};}};j.isLoaded=function(){return typeof dojo!=ub.d;};});
