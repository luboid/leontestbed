/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.app.UserSettings",null,null,function(o,g){var
ub={A:"<m/>",B:"undefined",C:"string",D:"number",E:"boolean",F:"0",G:"function",H:"usrset.persist",a:"object",b:"user-settings",c:"domain",d:"path",e:/\*/g,f:"%2A",g:/\+/g,h:"%2B",i:/</g,j:"*",k:/>/g,l:"+",m:"usrset.large",n:"NAMESPACE",o:"_ses",p:"_ind",q:"<",r:">",s:"s",t:"n",u:"m",v:"a",w:"b",x:"1",y:"u",z:"usrset.deser"};var
C=jsx3.xml.Entity;var
A=jsx3.util.Logger.getLogger(o.jsxclass.getName());o.PERSIST_SESSION=1;o.PERSIST_INDEFINITE=2;g.N2=null;g.X1=null;g.zH=null;g.init=function(e,n){if(n==null)n=2;this.N2=e;this.X1=n;var
wb=this.CI();this.zH=o.uw(wb);};g.get=function(i){var
Fa=this.zH;for(var
wa=0;wa<arguments.length;wa++){if(typeof Fa!=ub.a||jsx3.$A.is(Fa))return null;Fa=Fa[arguments[wa]];}return Fa;};g.set=function(a,k){var
ob=this.zH;for(var
Mb=0;Mb<arguments.length-2;Mb++){var
aa=ob[arguments[Mb]];if(typeof aa!=ub.a||jsx3.$A.is(aa))aa=ob[arguments[Mb]]=null;if(aa==null)aa=ob[arguments[Mb]]={};ob=aa;}ob[arguments[arguments.length-2]]=arguments[arguments.length-1];return ob;};g.remove=function(m){var
fa=this.zH;for(var
ab=0;ab<arguments.length-1;ab++){var
Za=fa[arguments[ab]];if(Za==null||typeof Za!=ub.a||jsx3.$A.is(Za))return;fa=Za;}delete fa[arguments[arguments.length-1]];};g.clear=function(){this.zH={};var
fb=this.oU();var
pa=this.N2.getSettings();var
ga=pa.get(ub.b,ub.c);var
ka=pa.get(ub.b,ub.d);this.N2.deleteCookie(fb,ka,ga);};g.save=function(){var
S=o.tD(this.zH);S=S.replace(ub.e,ub.f);S=S.replace(ub.g,ub.h);S=S.replace(ub.i,ub.j);S=S.replace(ub.k,ub.l);S=escape(S);var
Ha=S.length;if(Ha>4096)A.warn(jsx3._msg(ub.m,Ha));this.Rw(S);};g.oU=function(){return this.N2.getEnv(ub.n)+(this.X1==1?ub.o:ub.p);};g.CI=function(){var
xb=this.oU();var
ha=this.N2.getCookie(xb,true);if(ha){ha=ha.replace(ub.e,ub.q);ha=ha.replace(ub.g,ub.r);ha=unescape(ha);}return ha;};g.Rw=function(e){var
Qa=this.oU();var
qb=this.N2.getSettings();var
gb=qb.get(ub.b,ub.c);var
za=qb.get(ub.b,ub.d);var
Aa=new
Date();var
ab=this.X1==1?null:new
Date(Aa.getFullYear()+1,Aa.getMonth(),Aa.getDate());this.N2.setCookie(Qa,e,ab,za,gb,null,true);};o.uw=function(r){if(!r)return {};var
Xa=new
jsx3.xml.Document();Xa.loadXML(r);return o.pZ(Xa.getRootNode());};o.pZ=function(j){var
Cb=j.getNodeName();if(Cb==ub.s){return j.getValue();}else if(Cb==ub.t){return Number(j.getValue());}else if(Cb==ub.u){return (j.getChildNodes()).map(function(i){return [i.getAttribute(ub.t),o.pZ(i)];},false,true);}else if(Cb==ub.v){return ((j.getChildNodes()).map(function(m){return o.pZ(m);})).toArray(true);}else if(Cb==ub.w){return j.getValue()==ub.x;}else if(Cb==ub.y){return null;}else{A.warn(jsx3._msg(ub.z,Cb));return null;}};o.tD=function(f){var
Ta=new
jsx3.xml.Document();Ta.loadXML(ub.A);var
cb=Ta.getRootNode();for(var oa in f)o.tB(f[oa],oa,cb);return cb.getXML();};o.tB=function(p,l,q){var
Ga=null;var
Nb=typeof p;if(p==null||Nb==ub.B){Ga=q.createNode(1,ub.y);}else if(Nb==ub.C){Ga=q.createNode(1,ub.s);Ga.setValue(p);}else if(Nb==ub.D){Ga=q.createNode(1,ub.t);Ga.setValue(p);}else if(Nb==ub.E){Ga=q.createNode(1,ub.w);Ga.setValue(p?ub.x:ub.F);}else if(Nb==ub.a){if(jsx3.$A.is(p)){Ga=q.createNode(1,ub.v);for(var
fb=0;fb<p.length;fb++)o.tB(p[fb],fb.toString(),Ga);}else{Ga=q.createNode(1,ub.u);for(var kb in p)o.tB(p[kb],kb,Ga);}}else if(Nb==ub.G){}else throw new
jsx3.Exception(jsx3._msg(ub.H,Nb));Ga.setAttribute(ub.t,l);q.appendChild(Ga);};g.toString=function(){return this.jsxsuper()+this.N2.getAppPath();};});jsx3.UserSettings=jsx3.app.UserSettings;
