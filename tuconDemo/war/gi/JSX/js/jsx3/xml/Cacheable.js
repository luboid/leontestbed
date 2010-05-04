/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.xml.Template","jsx3.xml.CDF");jsx3.Class.defineInterface("jsx3.xml.Cacheable",null,function(p,s){var
ub={A:"string",B:"xml.err_load_xsl",C:"_XSL",D:/\s*,\s*/g,E:",",F:"xml.trans_bad",G:"xml.trans_err",H:"3.00.00",a:"jsx:///xsl/xml.xsl",b:"JSX_XML_XSL",c:"",d:"jsxasyncmessage",e:"jsx3.xml.Cacheable.",f:"jsx3.xml.Cacheable.data",g:"xml.err_trans",h:/\s*<\/?JSX_FF_WELLFORMED_WRAPPER( [^>]*)?\/?>\s*/g,i:"jsxxslparams",j:"xml.err_load",k:"data",l:"jsxassignids",m:"1",n:"_XML",o:"xmlbind",p:"load",q:"onChangeServer",r:"h7",s:"onAfterAttach",t:"TC",u:"_jsxbG",v:"onDestroy",w:"lV",x:"loading",y:"k1",z:"load."};var
t=jsx3.xml.Document;var
x=jsx3.xml.CDF;var
xb=jsx3.util.Logger.getLogger(p.jsxclass.getName());p.DEFAULTSTYLESHEET=jsx3.resolveURI(ub.a);p.DEFAULTXSLCACHEID=ub.b;p.CLEANUPRESOURCES=0;p.SHARERESOURCES=1;s.doTransform=function(h){var
ca=this.getXML();if(this.getNodeSet())ca=this.getNodeSet();var
N=this.getXSL();if(ca.hasError()||N.hasError())return ub.c;if(h==null)h=this.jsxxslparams;var
la=ub.c;var
K=null;if(N instanceof jsx3.xml.XslDocument){K=N;K.reset();}else K=new
jsx3.xml.Template(N);if(!K.hasError()){if(h)K.setParams(h);if(ca.getNamespaceURI()==jsx3.app.Cache.XSDNS){var
da=this.getServer();K.setParam(ub.d,da.getDynamicProperty(ub.e+ca.getNodeName(),h&&h.jsxtitle||da.getDynamicProperty(ub.f)));}la=K.transform(ca);if(K.hasError()){xb.error(jsx3._msg(ub.g,this,K.getError()));la=ub.c;}}else xb.error(jsx3._msg(ub.g,this,K.getError()));return la;};s.Xl=function(g){return g.replace(ub.h,ub.c);};s.getXSLParams=function(){if(this.jsxxslparams==null)this.jsxxslparams={};return this.jsxxslparams;};s.setXSLParam=function(h,g){if(g!=null)(this.getXSLParams())[h]=g;else delete this.getXSLParams()[h];return this;};s.removeXSLParam=function(i){delete this.getXSLParams()[i];return this;};s.removeXSLParams=function(){delete this[ub.i];return this;};s.getNodeSet=function(){return this._jsxbG;};s.setNodeSet=function(d){this._jsxbG=d;};s.resetCacheData=function(l){var
Za=(l||this.getServer()).getCache();Za.clearById(this.getXSLId());Za.clearById(this.getXMLId());};s.resetXmlCacheData=function(g){var
rb=(g||this.getServer()).getCache();rb.clearById(this.getXMLId());};s.resetXslCacheData=function(n){var
C=(n||this.getServer()).getCache();C.clearById(this.getXSLId());};s.clearXmlData=function(){((this.getServer()).getCache()).setDocument(this.getXMLId(),x.newDocument());};s.getShareResources=function(){return this.jsxshare==null?0:this.jsxshare;};s.setShareResources=function(l){this.jsxshare=l;return this;};s.getXML=function(){var
Ia=this.getServer();if(Ia==null)return x.newDocument();var
W=Ia.getCache();var
jb=this.getXMLId();var
Y=W.getDocument(jb);if(Y==null){var
Q=this.getXMLString();if(!jsx3.util.strEmpty(Q)){Y=new
t();Y.loadXML(Q);}else{var
Qa=this.getXMLURL();if(!jsx3.util.strEmpty(Qa)){Qa=(this.getUriResolver()).resolveURI(Qa);if(this.jsxxmlasync){Y=W.getOrOpenAsync(Qa,jb);this.pC(0,Y);}else Y=(new
t()).load(Qa);}else Y=x.newDocument();}if(Y.hasError()){xb.error(jsx3._msg(ub.j,this,Y.getError()));return Y;}Y=this.setSourceXML(Y,W);}return Y;};s.setSourceXML=function(g,q){g=this.FM(g);if(!q)q=(this.getServer()).getCache();var
yb=this.getXMLId();if(q.getDocument(yb)!=g)this.Y8(q,this.getXMLId(),g);this.Tt(g);return g;};s.Tt=function(h){if(this.instanceOf(x))if(!h._jsxEF){h._jsxEF=true;if(h.getNodeName()==ub.k&&h.getAttribute(ub.l)==ub.m)this.assignIds();this.convertProperties((this.getServer()).getProperties());}};s.Y8=function(g,d,q){var
Ma=this._jsxqs;if(Ma)this.pC(false);g.setDocument(d,q);if(Ma)this.pC(true);};s.getXMLId=function(){return this.jsxxmlid||this.getId()+ub.n;};s.setXMLId=function(k){this.jsxxmlid=k;return this;};s.getXMLString=function(){return this.jsxxml;};s.setXMLString=function(a){this.jsxxml=a;return this;};s.getXMLURL=function(){return this.jsxxmlurl;};s.setXMLURL=function(d){this.jsxxmlurl=d;return this;};s.getXmlAsync=function(){return this.jsxxmlasync;};s.setXmlAsync=function(e){this.jsxxmlasync=jsx3.Boolean.valueOf(e);return this;};s.getXmlBind=function(){return this.jsxxmlbind;};s.setXmlBind=function(i){this.jsxxmlbind=jsx3.Boolean.valueOf(i);this.pC(this.jsxxmlbind);return this;};s.onXmlBinding=function(a){var
Fa=a.target.getDocument(a.id);if(this.publish)this.publish({subject:ub.o,xml:Fa});};s.k1=function(k){var
kb=k.action==ub.p;if(this.jsxxmlbind&&!kb||!this.jsxxmlbind&&kb){var
hb=k.target.getDocument(k.id);this.pC(0,hb);if(kb)this.setSourceXML(hb);this.onXmlBinding(k);}};s.h7=function(h,i){var
Ya=i.getCache(),T=h.getCache();var
vb=this.getXMLId(),N=this.getXSLId();var
wa=Ya.getDocument(vb);var
ib=Ya.getDocument(N);if(this.getShareResources()!=1)this.resetCacheData(i);if(wa)T.setDocument(vb,wa);if(ib)T.setDocument(N,ib);this.pC(false,0,i);this.pC(this.jsxxmlbind,0,h);};jsx3.app.Model.jsxclass.addMethodMixin(ub.q,p.jsxclass,ub.r);s.TC=function(){this.pC(this.jsxxmlbind);};jsx3.app.Model.jsxclass.addMethodMixin(ub.s,p.jsxclass,ub.t);s.lV=function(d){var
C=d.getServer();this.pC(false,0,C);if(this.getShareResources()==0)this.resetCacheData(C);delete this[ub.u];};jsx3.app.Model.jsxclass.addMethodMixin(ub.v,p.jsxclass,ub.w);s.pC=function(b,r,q){if(!q)q=this.getServer();if(q){var
D=q.getCache();var
Db=this.getXMLId();var
Wa=null;if(r){if(!this.jsxxmlbind)Wa=!r.hasError()&&r.getNamespaceURI()==jsx3.app.Cache.XSDNS&&r.getNodeName()==ub.x;}else Wa=b;if(Wa!=null&&Boolean(this._jsxqs)!=Wa){if(Wa){D.subscribe(Db,this,ub.y);D.subscribe(ub.z+Db,this,ub.y);}else{D.unsubscribe(Db,this);D.unsubscribe(ub.z+Db,this);}this._jsxqs=Wa;}}};s.getXSL=function(){return this.qj(p.DEFAULTSTYLESHEET);};s.qj=function(d,k){var
Bb=jsx3.xml.XslDocument;var
tb=this.getXSLId();var
I=(this.getServer()).getCache();var
kb=I.getDocument(tb);if(kb==null){if(this.getXSLString()!=null){kb=(new
Bb()).loadXML(this.getXSLString());}else if(this.getXSLURL()!=null){kb=(new
Bb()).load((this.getUriResolver()).resolveURI(this.getXSLURL()));}else{var
w=jsx3.getSharedCache();if(k){kb=w.getDocument(d);if(!kb){kb=typeof k==ub.A?(new
Bb()).loadXML(k):k;w.setDocument(d,kb);}}else kb=w.getOrOpenDocument(d,null,Bb.jsxclass);}if(kb.hasError()){xb.error(jsx3._msg(ub.B,this,kb.getError()));return kb;}I.setDocument(tb,kb);}return kb;};s.getXSLId=function(){var
J=null;J=this.jsxxslid;return J||this.getId()+ub.C;};s.setXSLId=function(f){this.jsxxslid=f;return this;};s.getXSLString=function(){return this.jsxxsl;};s.setXSLString=function(h){this.jsxxsl=h;return this;};s.getXSLURL=function(){return this.jsxxslurl;};s.setXSLURL=function(f){this.jsxxslurl=f;return this;};s.getXMLTransformers=function(){return this.jsxxmltrans!=null?this.jsxxmltrans.split(ub.D):[];};s.setXMLTransformers=function(h){this.jsxxmltrans=h!=null?jsx3.$A.is(h)?h.join(ub.E):h:null;};s.FM=function(c){var
Ha=this.getXMLTransformers();if(Ha.length>0){var
Wa=this.getServer();var
ia=Wa.getCache();var
z=c;for(var
G=0;G<Ha.length;G++){var
Ua=Ha[G];var
Y=ia.getDocument(Ua);if(Y==null){Ua=(this.getUriResolver()).resolveURI(Ua);Y=ia.openDocument(Ua,Ua);}if(Y==null||Y.hasError()){xb.warn(jsx3._msg(ub.F,Ua,this,Y.getError()));ia.clearById(Ua);continue;}var
B=new
jsx3.xml.Template(Y);B.setParams(this.getXSLParams());z=B.transformToObject(z);if(B.hasError())throw new
jsx3.Exception(jsx3._msg(ub.G,Ua,this,B.getError()));if(z.hasError())throw new
jsx3.Exception(jsx3._msg(ub.G,Ua,this,z.getError()));}return z;}else return c;};p.getVersion=function(){return ub.H;};});jsx3.xml.Cacheable.prototype.resetData=jsx3.xml.Cacheable.prototype.clearXmlData;
