/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.html.DOM",null,null,function(g,j){var
ub={a:/(-\S)/gi,b:/\s*;\s*/g,c:"",d:/\s*:\s*/,e:"string",f:/\//g,g:"function",h:/^on/,i:"event"};var
pb=jsx3.util.Logger.getLogger(g.jsxclass.getName());var
B=jsx3.gui.Event;var
L=jsx3.gui.Interactive;g.REGEXP_CAMEL=ub.a;j.init=function(){this.jsxsuper();};g.setStyle=function(r,l,q){r.style[l.replace(g.REGEXP_CAMEL,function(n,m){return (m.substring(1)).toUpperCase();})]=q;};g.setStyles=function(q,b){var
Va=(jsx3.util.strTrim(b)).split(ub.b);for(var
U=0;U<Va.length;U++){var
sa=Va[U];if(sa==ub.c)continue;var
Na=sa.split(ub.d);if(Na&&Na.length==2)g.setStyle(q,Na[0],Na[1]);}};g.getExtendedOffsetWidth=function(r){return parseInt(r.offsetWidth)+(r.nodeType==1?parseInt(r.style.marginLeft)+parseInt(r.style.marginRight):0);};g.getExtendedOffsetHeight=function(a){return parseInt(a.offsetHeight)+parseInt(a.style.marginTop)+parseInt(a.style.marginBottom);};g.clearStyles=function(h,k){var
Ga=(jsx3.util.strTrim(k)).split(ub.b);for(var
_a=0;_a<Ga.length;_a++){var
lb=Ga[_a];if(lb==ub.c)continue;var
ea=lb.split(ub.d);if(ea&&(ea.length==1||ea.length==2))g.setStyle(h,ea[0],ub.c);}};g.selectSingleElm=function(k,f){var
Ra=1,wa=arguments;if(arguments.length==2)if(typeof f==ub.e){Ra=0;wa=f.split(ub.f);}else if(jsx3.$A.is(f)){Ra=0;wa=f;}var
Z=k;for(var
La=Ra;Z!=null&&La<wa.length;La++){var
T=wa[La];if(!isNaN(T)){var
Sa=Number(T);var
Ta=Z.childNodes.length;var
mb=0,X=0;for(;mb<Ta&&X<Sa;mb++)if(Z.childNodes[mb].nodeType==1)X++;Z=Z.childNodes[mb];}else throw new
jsx3.Exception();}return Z;};if(jsx3.CLASS_LOADER.IE){g.addEventListener=function(k,r,d){k[r]=typeof d==ub.g?d:new
Function(d);};g.removeEventListener=function(q,e,o){q[e]=null;};g.addBridgedEvent=function(i,p,b){g.addEventListener(i,p,b);};g.removeBridgedEvent=function(c,b,o){g.removeEventListener(c,b,o);};}else{g.addEventListener=function(o,c,h){c=c.replace(ub.h,ub.c);o.addEventListener(c,typeof h==ub.g?h:new
Function(ub.i,h),false);};g.removeEventListener=function(i,p,b){p=p.replace(ub.h,ub.c);i.removeEventListener(p,b,false);};g.addBridgedEvent=function(n,b,p){n[b]=typeof p==ub.g?p:new
Function(ub.i,p);};g.removeBridgedEvent=function(h,o){h[o]=null;};}});
