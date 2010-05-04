/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.net.Form",null,[jsx3.util.EventDispatcher],function(q,d){var
ub={A:": <textarea name='",B:"'></textarea></div>",C:"",D:" ",E:": <input type='file' name='",F:"'/></div>",G:"htfrm.dup",H:"htfrm.prompt",I:"htfrm.no_file",J:"htfrm.sec",K:"complete",L:"loaded",M:"htfrm.bad_xml",N:"UniversalBrowserRead",O:"htfrm.bad_dt",P:"htfrm.destr",Q:"px",R:"-50px",S:"0px",T:"10px",U:"@Form ",a:"get",b:"post",c:"application/x-www-form-urlencoded",d:"multipart/form-data",e:"file",f:"response",g:"error",h:"timeout",i:"jsx_httpform_",j:'<form method="get" action=""></form>',k:'<html><body class="jsx30form">',l:"</body></html>",m:"beforeEnd",n:"<span id='",o:"_ispan' style='border:2px solid black;position:absolute;left:-50px;top:0px;width:10px;height:10px;overflow:hidden;'><iframe id='",p:"_frame' style='width:100%;height:100%;'></iframe></span>",q:"_ispan",r:"_frame",s:"htfrm.no_ifr",t:"form",u:"htfrm.bad_frag",v:"method",w:"action",x:"encoding",y:"object",z:"<div>"};var
Lb=jsx3.util.Logger.getLogger(q.jsxclass.getName());q.lp=0;q.oS=250;q.t6=30000;q.METHOD_GET=ub.a;q.METHOD_POST=ub.b;q.SJ=ub.c;q.NH=ub.d;q.EVENT_FILE_SELECTED=ub.e;q.EVENT_ON_RESPONSE=ub.f;q.EVENT_ON_ERROR=ub.g;q.EVENT_ON_TIMEOUT=ub.h;d.init=function(g,s,m){this.a2=ub.i+q.lp++;if(g==-1){this.I4(s);}else{this.I4();this.setMethod(g!=null?g:ub.a);this.setAction(s);this.setMultipart(m);}};q.newFromFragment=function(k){return new
q(-1,k);};d.I4=function(l){var
qa=l;if(!qa)qa=ub.j;var
ab=ub.k+qa+ub.l;jsx3.html.insertAdjacentHTML(document.body,ub.m,ub.n+this.a2+ub.o+this.a2+ub.p);this.or=document.getElementById(this.a2+ub.q);this.LR=this.eval(this.a2+ub.r);var
t=this.LR.document||this.LR.contentDocument;if(t==null)throw new
jsx3.Exception(jsx3._msg(ub.s,this));t.open();t.write(ab);t.close();this._form=(t.getElementsByTagName(ub.t))[0];if(l){if(this._form==null)throw new
jsx3.Exception(jsx3._msg(ub.u,l));if(!this._form.method)this._form.method=ub.a;this.NA=this._form.action;this.SS=this._form.method.toLowerCase();this.bE=Boolean(this._form.encoding)&&this._form.encoding.toLowerCase()==q.NH;}};d.getMethod=function(){return this.SS;};d.setMethod=function(k){k=k!=null?k.toLowerCase():ub.a;this.SS=k;(this.eW()).setAttribute(ub.v,k);};d.getAction=function(){return this.NA;};d.setAction=function(i){if(!jsx3.CLASS_LOADER.IE)i=((jsx3.app.Browser.getLocation()).resolve(i)).toString();this.NA=i;(this.eW()).setAttribute(ub.w,i);};d.getMultipart=function(){return this.bE;};d.setMultipart=function(p){this.bE=p;(this.eW()).setAttribute(ub.x,p?q.NH:q.SJ);};d.EU=function(){return this.or;};d.xS=function(){return this.LR;};d.eW=function(){return this._form;};d.getField=function(g){var
Ua=(this.eW()).elements[g];return Ua!=null&&typeof Ua==ub.y?Ua.value:null;};d.getFields=function(){var
La=[];var
I=(this.eW()).elements;for(var
Eb=0;Eb<I.length;Eb++)La.push(I[Eb].name);return La;};d.setField=function(i,f,m){var
ua=this.eW();var
fa=ua.elements[i];if(fa==null||typeof fa!=ub.y){jsx3.html.insertAdjacentHTML(ua,ub.m,ub.z+i+ub.A+i+ub.B);fa=ua.elements[i];}if(f==null)f=ub.C;if(m&&fa.value){fa.value=fa.value+ub.D+f;}else fa.value=f;};d.removeField=function(s){var
Ya=this.eW();var
Kb=Ya.elements[s];if(Kb!=null&&Kb.parentNode)jsx3.html.removeNode(Kb.parentNode);};d.addFileUploadField=function(a){var
Jb=this.eW();var
jb=Jb.elements[a];if(jb==null||typeof jb!=ub.y){jsx3.html.insertAdjacentHTML(Jb,ub.m,ub.z+a+ub.E+a+ub.F);jb=Jb.elements[a];var
eb=this;jb.onchange=function(){eb.Iu(a,jb.value);};}else throw new
jsx3.Exception(jsx3._msg(ub.G,this,a));};d.promptForFile=function(f){var
Ca=this.eW();var
ia=Ca.elements[f];if(ia!=null&&ia.type==ub.e){if(jsx3.CLASS_LOADER.IE){ia.click();}else{Lb.warn(jsx3._msg(ub.H));ia.click();}}else throw new
jsx3.Exception(jsx3._msg(ub.I,this,f));};d.Iu=function(r,p){this.publish({subject:ub.e,field:r,value:p});};d.nQ=function(){this._form=null;this.publish({subject:ub.f});};if(jsx3.CLASS_LOADER.IE||jsx3.CLASS_LOADER.SAF){d.send=function(s,m){if(s==null)s=q.oS;if(m==null)m=q.t6;var
M=this.LR.document;this._form.submit();var
Ya=0;var
ma=m<=0?Number.MAX_VALUE:Math.ceil(m/s);var
xb=this;this.aF=window.setInterval(function(){xb.e0(++Ya<ma,M!==xb.LR.document);},s);};d.e0=function(j,k){try{this.LR.document.readyState==ub.C;}catch(Kb){window.clearInterval(this.aF);this.aF=null;this.HW(jsx3._msg(ub.J,this,jsx3.NativeError.wrap(Kb)));return;}if(k&&(this.LR.document.readyState==ub.K||this.LR.document.readyState==ub.L)){window.clearInterval(this.aF);this.aF=null;this.nQ();}else if(!j){window.clearInterval(this.aF);this.aF=null;this.destroy();this.publish({subject:ub.h});}};d.HW=function(r){this._form=null;this.publish({subject:ub.g,message:r});};d.abort=function(){window.clearInterval(this.aF);};d.getResponseText=function(){var
B=this.LR.document;var
Mb=B?B.documentElement:null;if(Mb&&Mb.textContent){return Mb.textContent;}else if(B.body&&B.body.childNodes[0])return B.body.childNodes[0].innerHTML;return null;};d.getResponseXML=function(){var
Ea=this.LR.document;var
Ab=new
jsx3.xml.Document();if(Ea.XMLDocument&&Ea.XMLDocument.documentElement){Ab.loadXML(Ea.XMLDocument.documentElement.xml);}else{var
Ha=null;if(Ea.documentElement){Ha=window.XMLSerializer?(new
XMLSerializer()).serializeToString(Ea):Ea.xml;}else if(Ea.body)Ha=Ea.body.innerHTML;Ab.loadXML(Ha);if(Ab.hasError()){Lb.error(jsx3._msg(ub.M,Ab.getError()));Ab=null;}}return Ab;};}else{d.send=function(p,j){if(p==null)p=q.oS;if(j==null)j=q.t6;var
_a=this;this.LR.onload=function(){_a.I1();};try{this._form.submit();}catch(Kb){this.HW((jsx3.NativeError.wrap(Kb)).toString());return;}this.aF=window.setTimeout(function(){_a.HX();},j);};d.abort=function(){this.LR.onload=null;window.clearTimeout(this.aF);};d.HW=function(p){this.LR.onload=null;window.clearTimeout(this.aF);this.publish({subject:ub.g,message:p});};d.I1=function(){this.LR.onload=null;if(this.aF){window.clearTimeout(this.aF);this.aF=null;}try{try{if(window.netscape&&netscape.security)netscape.security.PrivilegeManager.enablePrivilege(ub.N);}catch(Kb){}var
ta=this.LR.contentDocument;var
va=ub.D+ta.childNodes[0];}catch(Kb){this.publish({subject:ub.g,message:(jsx3.NativeError.wrap(Kb)).toString()});return;}this.nQ();};d.HX=function(){this.LR.onload=null;this.aF=null;this.destroy();this.publish({subject:ub.h});};d.getResponseText=function(){var
ia=this.LR.contentDocument;if(ia instanceof XMLDocument){return (new
XMLSerializer()).serializeToString(ia);}else if(ia instanceof HTMLDocument){return ia.body.childNodes[0].innerHTML;}else{Lb.warn(jsx3._msg(ub.O,ia));return ub.C;}};d.getResponseXML=function(){var
pb=this.LR.contentDocument;var
Xa=new
jsx3.xml.Document();if(pb instanceof XMLDocument){Xa.loadXML((new
XMLSerializer()).serializeToString(pb));}else if(pb instanceof HTMLDocument){Xa.loadXML(jsx3.html.getOuterHTML(pb));}else{Lb.warn(jsx3._msg(ub.O,pb));Xa=null;}if(Xa.hasError()){Lb.error(jsx3._msg(ub.M,Xa.getError()));Xa=null;}return Xa;};}d.destroy=function(){var
Ya=this.EU();if(Ya!=null){jsx3.html.removeNode(Ya);this.or=null;this.LR=null;this._form=null;}else Lb.warn(jsx3._msg(ub.P,this));};d.reveal=function(r,j,g,c){if(r==null)r=10;if(j==null)j=10;if(g==null)g=Math.round(this.or.parentNode.offsetWidth/3);if(c==null)c=Math.round(this.or.parentNode.offsetHeight/3);var
Ca=this.or.style;Ca.left=r+ub.Q;Ca.top=j+ub.Q;Ca.width=g+ub.Q;Ca.height=c+ub.Q;Ca.zIndex=30000;};d.conceal=function(){var
Z=this.or.style;Z.left=ub.R;Z.top=ub.S;Z.width=ub.T;Z.height=ub.T;Z.zIndex=0;};d.toString=function(){return ub.U+this.getAction();};});jsx3.HttpForm=jsx3.net.Form;
