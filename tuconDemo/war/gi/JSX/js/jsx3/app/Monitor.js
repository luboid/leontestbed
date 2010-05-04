/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.app.Monitor",jsx3.util.Logger.FormatHandler,null,function(f,k){var
ub={a:"jsx:///html/jsx3.app.Monitor.html",b:"jsx3.lang.System",c:"TR",d:"m",e:"namespace",f:"memory",g:"Monitor_",h:"directories=no,location=no,menubar=no,status=yes,personalbar=no,titlebar=yes,toolbar=no,resizable=yes,scrollbars=no,width=500,height=400",i:"function"};var
t=jsx3.app.Server;f._8=false;f.KZ=jsx3.net.URIResolver.DEFAULT.resolveURI(ub.a);f.ideDidLoad=function(){f._8=true;};k.vu=false;k.xW=true;k.Qt=null;k.K6=false;k.kG=null;k.Rv=null;k.init=function(p){this.jsxsuper(p);};k.onAfterInit=function(){if(this.Qt!=null){var
ja=null;if(jsx3.Class.forName(ub.b))ja=jsx3.System.getApp(this.Qt);if(ja!=null){this.qE(ja);}else t.subscribe(t.INITED,this,ub.c);}else{this.xW=false;this.K6=false;this.vu=true;this.vs();}};k.qE=function(c){this.vu=true;this.kG=c;if(this.K6){var
nb=this;c.registerHotKey(function(o){nb.zw();},ub.d,false,true,true);}else this.vs();};k.TR=function(r){var
sa=r.target;if(sa.getEnv(ub.e)==this.Qt){if(!f._8||!this.xW)this.qE(sa);t.unsubscribe(t.INITED,this);}};k.handle=function(b){if(this.vu&&(!f._8||!this.xW)){var
gb=this.Rv;if(gb){if(gb.closed)if(!this.K6)this.vs();try{if(!gb.closed&&gb.appendMessage){if(gb.isFirstTime()){var
_=jsx3.util.Logger.Manager.getManager();var
Sa=_.getHandler(ub.f);if(Sa)(jsx3.$A(Sa.getRecords())).each((jsx3.$F(function(r){if(r!==b)gb.appendMessage(this.format(r),jsx3.util.Logger.levelAsString(r.getLevel()));})).bind(this));}gb.appendMessage(this.format(b),jsx3.util.Logger.levelAsString(b.getLevel()));}}catch(Kb){}}}};k.zw=function(){if(this.Rv==null||this.Rv.closed)this.vs();};k.vs=function(){this.Rv=window.open(f.KZ,ub.g+this.getName(),ub.h);if(this.Rv){if(this.kG)if(typeof this.Rv.setName==ub.i)this.Rv.setName(this.kG.getEnv(ub.e));else this.Rv._jsxname=this.kG.getEnv(ub.e);window.focus();}};k.getDisableInIDE=function(){return this.xW;};k.setDisableInIDE=function(g){this.xW=g;};k.getServerNamespace=function(){return this.Qt;};k.setServerNamespace=function(n){this.Qt=n;};k.getActivateOnHotKey=function(){return this.K6;};k.setActivateOnHotKey=function(p){this.K6=p;};});jsx3.util.Logger.Handler.registerHandlerClass(jsx3.app.Monitor.jsxclass);
