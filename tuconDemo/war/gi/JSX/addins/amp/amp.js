jsx3.lang.Package.definePackage("jsx3.amp",function(o){var
ub={a:"http://www.generalinterface.org/gi/amp",b:"amp",c:"plugins.xml",d:"plugin.xml",e:"plugins",f:"jsx3.amp",g:"string",h:"function",i:"",j:/\s/g};o.NS=ub.a;o.jw={"http://www.tibco.com/gi/amp":true,"http://www.generalinterface.org/gi/amp":true};o.isNS=function(c){return o.jw[c];};o.getXmlNS=function(h){var
Nb={};Nb[h.getNamespaceURI()]=ub.b;return Nb;};o.DESCRIPTOR=ub.c;o.METAFILE=ub.d;o.DIR=ub.e;o.LOG=jsx3.util.Logger.getLogger(ub.f);o.ej=function(i){var
Q=i;if(typeof Q==ub.g)Q=jsx3.Class.forName(Q)||jsx3.lang.getVar(Q);if(Q instanceof jsx3.Class)Q=Q.getConstructor();if(typeof Q!=ub.h)Q=null;return Q;};o.Jf=function(h,n){var
eb=(jsx3.$S(h||ub.i)).trim();if(eb.length>0){var
ia=jsx3.$A(eb.split(ub.j));var
Z=n.getSearchPath();var
ua=(jsx3.$A(Z)).find(function(i){return ia.contains(i.toString());});if(ua)return ua.toString();}return ub.i;};});jsx3.lang.Package.definePackage("jsx3.amp.util",function(e){});jsx3.lang.Class.defineInterface("jsx3.amp.Bindable",null,function(b,g){g.f5=function(){if(!this._bindings)this._bindings=jsx3.$H();return this._bindings;};g.addBindableProp=function(d,i){var
ub=this.f5();ub[d]={a2:d,LM:i};};g.getBindableProps=function(){return (this.f5()).keys();};g.updateBindableOn=function(p,o,c){o.subscribe(c,(jsx3.$F(this.updateBindable)).bind(this,[p]));};g.updateBindable=function(f){var
Q=(this.f5())[f];this.setBindableProp(f,this.eval(Q.LM));};g.setBindableProp=function(q,p){var
ab=this[q];if(ab!==p){this[q]=p;if(this.publish)this.publish({subject:q,oldValue:ab,value:p});}};});jsx3.lang.Class.defineClass("jsx3.amp.Ext",null,null,function(f,q){var
ub={a:".",b:"?",c:"id",d:"name",e:"point"};var
w=jsx3.amp;q.init=function(i,c){this._xml=new
w.XML(c);this.n0=i;};q.getId=function(){var
la=this.getLocalId();return this.getPlugIn()+ub.a+(la||ub.b);};q.getLocalId=function(){return this._xml.attr(ub.c);};q.getName=function(){return this._xml.attr(ub.d);};q.getPlugIn=function(){return this.n0;};q.getEngine=function(){return this.n0.getEngine();};q.getPointId=function(){return this._xml.attr(ub.e);};q.getPoint=function(){return (this.getEngine()).getExtPoint(this.getPointId());};q.getData=function(){return this._xml.children();};q.toString=function(){return this.getId();};});jsx3.lang.Class.defineClass("jsx3.amp.ExtPoint",null,[jsx3.util.EventDispatcher],function(c,f){var
ub={a:"extended",b:".",c:"id",d:"name",e:"processor",f:"type",g:"Parameter objProcessor must not be null."};var
w=jsx3.amp;c.EXTENDED=ub.a;f.init=function(s,m){this._xml=new
w.XML(m,true);this.n0=s;};f.getId=function(){return this.n0.getId()+ub.b+this.getLocalId();};f.getLocalId=function(){return this._xml.attr(ub.c);};f.getName=function(){return this._xml.attr(ub.d);};f.getPlugIn=function(){return this.n0;};f.getEngine=function(){return this.n0.getEngine();};f.getExts=function(){return (this.getEngine()).getExts(this.getId());};f.processExts=function(e,k){if(!e){var
Xa=this._xml.child(ub.e);if(Xa)e=w.ExtProc.getProcessor(Xa.attr(ub.f),Xa);if(!e)throw new
jsx3.Exception(ub.g);}if(!k)k=this.getExts();return w.ExtProc.process(k,e);};f.onExtension=function(m){this.publish({subject:c.EXTENDED,exts:m});};f.toString=function(){return this.getId();};});jsx3.lang.Class.defineClass("jsx3.amp.ExtProc",null,null,function(n,p){var
ub={a:"function",b:"instance-class",c:"ext-class",d:"amp.36",e:"load",f:"true"};var
ca=jsx3.amp;n.process=function(q,a){var
pb=jsx3.$A();for(var
C=0;C<q.length;C++){var
Gb=q[C];var
t=Gb.getData();for(var
Ga=0;Ga<t.length;Ga++){var
Ha=t[Ga];if(typeof a==ub.a){pb.push(a(Gb,Ha));}else pb.push(a.process(Gb,Ha));}}return pb;};n.a0={eval:function(a){return n.EVAL;},"return":function(i){return n.RETURN;},"return-async":function(k){return n.RETURN_ASYNC;},instantiator:function(g){return n.newDescrProc(g.attr(ub.b));}};n.addProcessorFactory=function(l,c){n.a0[l]=c;};n.getProcessor=function(e,i){var
ib=n.a0[e];if(ib){return ib(i);}else return null;};n.iB=function(d){this._constructor=d;};n.iB.prototype.process=function(l,s){var
_=s.attr(ub.c);var
Ia=this._constructor;if(_){var
Hb=ca.ej(_);if(Hb)Ia=Hb;else ca.LOG.error(jsx3._msg(ub.d,_));}return new
Ia(l,s);};n.EVAL={process:function(e,s){var
Q=s.attr(ub.e)==ub.f;var
Na=s.value();if(Q){((e.getPlugIn()).load()).when(function(){e.eval(Na);});}else e.eval(Na);}};n.RETURN={process:function(l,s){var
N=s.value();return l.eval(N);}};n.RETURN_ASYNC={process:jsx3.$Y(function(a){var
Wa=(a.args())[0];var
S=(a.args())[1];var
na=S.attr(ub.e)==ub.f;var
_a=S.value();if(na){((Wa.getPlugIn()).load()).when(function(){a.done(Wa.eval(_a));});}else a.done(Wa.eval(_a));})};n.newDescrProc=function(a){return new
n.iB(ca.ej(a));};});jsx3.lang.Class.defineClass("jsx3.amp.PlugIn",null,[jsx3.util.EventDispatcher,jsx3.net.URIResolver,jsx3.amp.Bindable],function(i,o){var
ub={A:"amp.44",B:"{",C:"}",D:/[^\w\$]+/g,E:"with(this){",a:"ready",b:"extended",c:"id",d:"global",e:"true",f:"name",g:"version",h:"requires",i:"amp:plugin",j:"event",k:"extension-point",l:"class",m:"amp.38",n:"amp.39",o:"extension",p:"amp.40",q:"amp.41",r:"/",s:"Eu",t:"amp.42",u:"jsxapp",v:"jsxplugin",w:"Parent container not specified for loading resource ",x:".",y:"No resource ",z:" in plug-in "};var
La=jsx3.amp;i.READY=ub.a;i.EXTENDED=ub.b;i.X3=0;i.iL=1;i.ls=2;o.init=function(){this.oK=i.X3;this.RL=jsx3.$A();this.KR=jsx3.$A();this.ry={};this.xt=jsx3.$A();this.TT={};this.WW=jsx3.$A();this.u1={};this.f3=jsx3.$A();};o.setData=function(p){this.a2=p.getAttribute(ub.c);this.iv=p.getAttribute(ub.d)==ub.e;this.c7=p.getAttribute(ub.f);this.Dw=p.getAttribute(ub.g);var
ya=(p.getChildNodes()).toArray(true);for(var
E=0;E<ya.length;E++){var
qa=ya[E];var
Na=qa.getBaseName();if(Na==ub.h){for(var
ca=qa.selectNodeIterator(ub.i,La.getXmlNS(qa));ca.hasNext();)this.RL.push((ca.next()).getAttribute(ub.c));}else if(Na==ub.j){this.f3.push(qa.getAttribute(ub.c));}else if(Na==ub.k){var
Ja=null;var
N=qa.getAttribute(ub.l);if(N){Ja=La.ej(N);if(!Ja)La.LOG.error(jsx3._msg(ub.m,N));}if(!Ja)Ja=La.ExtPoint;var
lb=new
Ja(this,qa);var
Q=lb.getLocalId();if(this.TT[Q]){La.LOG.error(jsx3._msg(ub.n,this,Q));}else{La.Engine.xh(lb,qa);this.TT[Q]=lb;this.xt.push(lb);}}else if(Na==ub.o){var
Xa=null;var
V=qa.getAttribute(ub.l);if(V){Xa=La.ej(V);if(!Ja)La.LOG.error(jsx3._msg(ub.p,V));}if(!Xa)Xa=La.Ext;var
F=new
Xa(this,qa);var
Q=F.getLocalId();if(Q!=null)if(this.u1[Q]){La.LOG.error(jsx3._msg(ub.q,this,Q));}else this.u1[Q]=F;La.Engine.xh(F,qa);this.WW.push(F);}}};o.setEngine=function(a){this.S9=a;};o.setPath=function(a){this.nM=a;this.io=new
jsx3.net.URI(a+ub.r);this.Ge=(jsx3.app.Browser.getLocation()).resolve(this.io);};o.setResources=function(p){this.KR=jsx3.$A(p);this.ry={};for(var
Fb=0;Fb<p.length;Fb++){var
Pa=p[Fb];Pa.qm(this);if(!Pa.isLoaded())Pa.subscribe(La.Resource.READY,this,ub.s);this.ry[Pa.getLocalId()]=Pa;}};o.getId=function(){return this.a2;};o.isGlobal=function(){return this.iv;};o.getName=function(){return this.c7;};o.getVersion=function(){return this.Dw;};o.getResources=function(){return this.KR;};o.getEvents=function(){return this.f3;};o.getResource=function(a){return this.ry[a];};o.getRequires=function(){return this.RL;};o.load=jsx3.$Y(function(s){if(this.oK==i.X3){La.LOG.debug(jsx3._msg(ub.t,this));this.oK=i.iL;return this.S9.Cf(this);}else if(!this.isLoaded())this.subscribe(i.READY,(jsx3.$F(s.done)).bind(s));else s.done();});o.loaded=jsx3.$Y(function(c){if(this.isLoaded()){c.done();}else this.subscribe(i.READY,(jsx3.$F(c.done)).bind(c));});o.Eu=function(k){};o.Pi=function(){this.oK=i.ls;this.onLoaded();this.publish({subject:i.READY});};o.isLoaded=function(){return this.oK==i.ls;};o.getEngine=function(){return this.S9;};o.getServer=function(){return this.S9.getServer();};o.getExtPoints=function(){return this.xt;};o.getExtPoint=function(j){return this.TT[j];};o.getExts=function(){return this.WW;};o.getExt=function(r){return this.u1[r];};o.onRegister=function(){};o.onLoaded=function(){};o.onStartup=function(){};o.onExtension=function(n,k){this.publish({subject:i.EXTENDED,extpt:n,exts:k});};o.resolveURI=function(g){var
Nb=jsx3.net.URI.valueOf(g);if(Nb.getScheme()==ub.u&&!Nb.getHost())return (this.getServer()).resolveURI((Nb.getPath()).substring(1));if(!jsx3.net.URIResolver.isAbsoluteURI(Nb))Nb=this.io.resolve(Nb);return jsx3.net.URIResolver.DEFAULT.resolveURI(Nb);};o.getUriPrefix=function(){return this.io.toString();};o.relativizeURI=function(g,n){var
X=jsx3.app.Browser.getLocation();var
Ga=this.Ge.relativize(X.resolve(g));if(Ga.isAbsolute()||n)return Ga;else return jsx3.net.URI.fromParts(ub.v,null,this.getId(),null,ub.r+Ga.getPath(),Ga.getQuery(),Ga.getFragment());};o.toString=function(){return this.a2;};o.getLog=function(){return jsx3.util.Logger.getLogger(this.getId());};o.loadRsrcComponent=function(q,j,b){if(!j)throw new
jsx3.Exception(ub.w+q+ub.x);var
W=q instanceof La.Resource?q:this.getResource(q);if(!W)throw new
jsx3.Exception(ub.y+q+ub.z+this+ub.x);var
bb=j.loadXML(W.getData(),false,this);bb.getPlugIn=(jsx3.$F(function(){return this;})).bind(this);if(bb.onRsrcLoad)try{bb.onRsrcLoad();}catch(Kb){La.LOG.error(jsx3._msg(ub.A,q),jsx3.NativeError.wrap(Kb));}if(b!==false)j.paintChild(bb);return bb;};i.isBindExpr=function(d){return d.indexOf(ub.B)==0&&(jsx3.$S(d)).endsWith(ub.C);};o.regBindExpr=function(c,l){var
K=c.substring(1,c.length-1);var
v=jsx3.$H(K.split(ub.D));var
db=(this.getBindableProps()).filter(function(a){return v[a];});var
Ia=(jsx3.$F(function(){var
E=this.eval(ub.E+K+ub.C);l(E);})).bind(this);if(db.length>0)db.each((jsx3.$F(function(a){this.subscribe(a,Ia);})).bind(this));Ia();};});jsx3.lang.Class.defineClass("jsx3.amp.ClassPlugIn",jsx3.amp.PlugIn,null,function(c,n){var
ub={a:"class",b:"jsx:/js/",c:/\./g,d:"/",e:".js",f:"script"};var
ja=jsx3.amp;n.isLoaded=function(){return jsx3.Class.forName(this.getId())!=null;};n.setResource=function(h){};n.getResources=function(){if(!this.KR||this.KR.length==0){var
pb=new
ja.Resource(this,ub.a,{"@path":ub.b+(this.getId()).replace(ub.c,ub.d)+ub.e,"name()":ub.f});this.KR=jsx3.$A([pb]);}return this.KR;};});jsx3.lang.Class.defineClass("jsx3.amp.XML",null,null,function(k,n){var
ub={a:"@",b:"name()",c:"/",d:"children()",e:"value()",f:""};n.init=function(b){if(b instanceof jsx3.xml.Entity)this._native=true;this._xml=b;};n.attr=function(q){return this._native?this._xml.getAttribute(q):this._xml[ub.a+q];};n.nname=function(){return this._native?this._xml.getBaseName():this._xml[ub.b];};n.child=function(a){if(this._native){for(var
L=this._xml.getChildIterator();L.hasNext();){var
Z=L.next();if(Z.getBaseName()==a)return new
k(Z);}return null;}else{var
bb=this._xml[ub.c+a];return bb?new
k(bb):null;}};n.children=function(){if(this._native)return (jsx3.$A((this._xml.getChildNodes()).toArray())).map(function(b){return new
k(b);});else return (jsx3.$A(this._xml[ub.d])).map(function(l){return new
k(l);});};n.value=function(){if(this._native)return this._xml.getValue();else return this._xml[ub.e];};n.toNative=function(){if(this._native)return this._xml;};n.toString=function(){if(this._native)return this._xml.toString();else return ub.f;};});jsx3.lang.Class.defineClass("jsx3.amp.Resource",null,[jsx3.util.EventDispatcher],function(s,i){var
ub={a:"ready",b:"script",c:"css",d:"xml",e:"xsl",f:"jss",g:"propsbundle",h:"early",i:"normal",j:"manual",k:"_j",l:"ks",m:"uT",n:".",o:"path",p:"locales",q:/\s+/g,r:"/",s:"load",t:"iG"};var
Aa=jsx3.amp;s.READY=ub.a;s.TYPE_SCRIPT=ub.b;s.TYPE_CSS=ub.c;s.TYPE_XML=ub.d;s.TYPE_XSL=ub.e;s.TYPE_JSS=ub.f;s.TYPE_BUNDLE=ub.g;s.LOAD_EARLY=ub.h;s.LOAD_NORMAL=ub.i;s.LOAD_MANUAL=ub.j;s.fQ={early:1,normal:1,manual:1};s.X3=0;s.iL=1;s.ls=2;s.wh=function(d,e,o,p,l){var
t=new
s(null,o,p);t._j=d;t.ks=e;t.uT=l;return t;};i.init=function(c,d,h){this.ur=new
Aa.XML(h||{});this.CX=h;this.n0=c;this.a2=d;this.dD=jsx3.$A();this.oK=s.X3;this.iG=null;};i.qm=function(p){this.n0=p;delete this[ub.k];delete this[ub.l];delete this[ub.m];};i.attr=function(j){return this.ur.attr(j);};i.xml=function(){return this.CX;};i.getPlugIn=function(){return this.n0;};i.getId=function(){return (this.n0?this.n0.getId():this._j)+ub.n+this.a2;};i.getLocalId=function(){return this.a2;};i.getPath=function(){return this.attr(ub.o);};i.getFullPath=function(d){var
Ea=d||this.getPath();return this.n0?this.n0.resolveURI(Ea):this.ks+Ea;};i.getLocales=function(){var
ba=this.attr(ub.p);if(ba){ba=(jsx3.$S(ba)).trim();if(ba.length>0)return ba.split(ub.q);}return [];};i.getPathForLocale=function(d){var
Db=this.getPath();if(d){var
Ma=Aa.Jf(this.attr(ub.p),d);if(Ma){var
pb=Db.lastIndexOf(ub.n);if(pb<0||pb<Db.lastIndexOf(ub.r))pb=Db.length;Db=Db.substring(0,pb)+ub.n+Ma+Db.substring(pb);}}return Db;};i.getType=function(){return this.ur.nname();};i.getLoadType=function(){var
Ib=this.attr(ub.s);return s.fQ[Ib]?Ib:s.LOAD_NORMAL;};i.Ao=function(){return this.dD;};i.Bc=function(f,l){this.dD.push({id:f,type:l});};i.isLoaded=function(){return this.oK==s.ls;};i.loaded=jsx3.$Y(function(c){if(this.isLoaded()){c.done();}else this.subscribe(s.READY,(jsx3.$F(c.done)).bind(c));});i.load=jsx3.$Y(function(c){if(this.oK==s.X3){return (this.n0?this.n0.getEngine():this.uT).tk(this);}else if(!this.isLoaded())this.subscribe(s.READY,(jsx3.$F(c.done)).bind(c));else c.done();});i.Kc=function(h){this.oK=s.iL;};i.Ke=function(o){this.oK=s.ls;this.iG=o;this.publish({subject:s.READY});};i.getData=function(b){var
pb=this.iG;if(b)delete this[ub.t];return pb;};i.toString=function(){return this.getId();};});jsx3.lang.Class.defineClass("jsx3.amp.Engine",null,[jsx3.util.EventDispatcher],function(f,p){var
ub={A:"amp.07",Aa:"amp.17",Ab:"ix",B:"locales",Ba:"amp:script | amp:field | amp:method",Bb:"src",C:"/plugin.",Ca:"script",Cb:"text/javascript",D:".xml",Da:"amp.14",Db:"js.load",E:"amp.53",Ea:"field",Eb:"interactive",F:"amp.54",Fa:"amp.15",Fb:"complete",G:"extension-point",Ga:"method",Gb:"amp.34",H:"extension",Ha:"lazy",Hb:"amp.35",I:"amp:",Ia:"true",J:"[@id]",Ja:"params",K:'[@id="',Ka:" = function(",L:'"]',La:") {",M:"amp.55",Ma:"async",N:"amp:resources",Na:"amp.16",O:"amp.26",Oa:"Already loaded plug-in ",P:"amp.08",Pa:"plugin.load",Q:"_assigned_",Qa:"amp.18",R:"_",Ra:"property",S:"amp:prereq",Sa:"amp.43",T:"rsrc",Ta:"amp.20",U:"amp:requires/amp:plugin",Ua:"amp.21",V:"global",Va:"shared",W:"amp.09",Wa:"system",X:"function",Xa:"r.",Y:"amp.10",Ya:"amp.52",Z:"amp.11",Za:"amp.23",_:"amp.12",_a:"css",a:"load",aa:"amp:bindable",ab:"jss",b:"error",ba:"value",bb:"propsbundle",c:"register",ca:"subscribe",cb:"xml",d:"progress",da:/\s+/g,db:"xsl",e:"namespace",ea:"qw",eb:"eval",f:"CK",fa:"[not(@handler)]",fb:"js.eval",g:"jsxplugin",ga:"[@handler]",gb:"amp.32",h:"jsx3.amp.Engine",ha:"amp:subscribe",hb:"amp.33",i:"/",ia:"event",ib:"cache",j:'<?xml version="1.0" encoding="UTF-8"?><plugins xmlns="http://www.generalinterface.org/gi/amp" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.generalinterface.org/gi/amp http://www.generalinterface.org/xsd/plugins.xsd">\n\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.HotKey"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Heavyweight"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Interactive">\n    <requires>\n      <plugin id="jsx3.gui.HotKey"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Painted"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Block">\n    <requires>\n      <plugin id="jsx3.gui.Interactive"/>\n      <plugin id="jsx3.gui.Painted"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.app.UserSettings"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.net.Form"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.xml.Cacheable"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Form"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Alerts"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.BlockX">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.xml.Cacheable"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.ToolbarButton">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.WindowBar">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Dialog">\n    <requires>\n      <plugin id="jsx3.gui.Alerts"/>\n      <plugin id="jsx3.gui.ToolbarButton"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Button">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.TextBox">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.NumberInput">\n    <requires>\n      <plugin id="jsx3.gui.TextBox"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.CheckBox">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.RadioButton">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Splitter">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.LayoutGrid">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Stack">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.StackGroup">\n    <requires>\n      <plugin id="jsx3.gui.LayoutGrid"/>\n      <plugin id="jsx3.gui.Stack"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Tab">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.TabbedPane">\n    <requires>\n      <plugin id="jsx3.gui.Tab"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Select">\n    <requires>\n      <plugin id="jsx3.gui.Heavyweight"/>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.xml.Cacheable"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Menu">\n    <requires>\n      <plugin id="jsx3.gui.Heavyweight"/>\n      <plugin id="jsx3.xml.Cacheable"/>\n      <plugin id="jsx3.gui.Form"/>\n      <plugin id="jsx3.gui.ToolbarButton"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Tree">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.xml.Cacheable"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.DatePicker">\n    <requires>\n      <plugin id="jsx3.gui.Heavyweight"/>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Slider">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Sound">\n    <requires>\n      <plugin id="jsx3.gui.Interactive"/>\n      <plugin id="jsx3.gui.Painted"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Window"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.ImageButton">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.ColorPicker">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.TimePicker">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Matrix.Column">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Matrix">\n    <requires>\n      <plugin id="jsx3.xml.Cacheable"/>\n      <plugin id="jsx3.gui.Form"/>\n      <plugin id="jsx3.gui.Matrix.Column"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Image">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.net.Service"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Table">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.xml.Cacheable"/>\n      <plugin id="jsx3.gui.Form"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.html.DOM"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.html.Style"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.Template">\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n      <plugin id="jsx3.html.DOM"/>\n      <plugin id="jsx3.html.Style"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.util.Dojo"/>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.xml.DojoDataStore">\n    <requires>\n      <plugin id="jsx3.util.Dojo"/>\n    </requires>\n  </plugin>\n  <plugin class="jsx3.amp.ClassPlugIn" id="jsx3.gui.DojoWidget">\n    <requires>\n      <plugin id="jsx3.util.Dojo"/>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n  </plugin>\n\n  <plugin id="jsx3.gui.Alerts.alert">\n    <requires>\n      <plugin id="jsx3.gui.Button"/>\n      <plugin id="jsx3.gui.Alerts"/>\n    </requires>\n    <resources>\n      <xml cache="shared" cachekey="JSX/xml/components/dialog_alert.xml" id="xml" path="jsx:/xml/components/dialog_alert.xml"/>\n    </resources>\n  </plugin>\n  <plugin id="jsx3.gui.Alerts.confirm">\n    <requires>\n      <plugin id="jsx3.gui.Button"/>\n      <plugin id="jsx3.gui.Alerts"/>\n    </requires>\n    <resources>\n      <xml cache="shared" cachekey="JSX/xml/components/dialog_confirm.xml" id="xml" path="jsx:/xml/components/dialog_confirm.xml"/>\n    </resources>\n  </plugin>\n  <plugin id="jsx3.gui.Alerts.prompt">\n    <requires>\n      <plugin id="jsx3.gui.Button"/>\n      <plugin id="jsx3.gui.Alerts"/>\n    </requires>\n    <resources>\n      <xml cache="shared" cachekey="JSX/xml/components/dialog_prompt.xml" id="xml" path="jsx:/xml/components/dialog_prompt.xml"/>\n    </resources>\n  </plugin>\n\n  <plugin class="jsx3.amp.Main" id="jsx3.amp.main" name="Controller Plug-In" version="0.1">\n\n    <requires>\n      <plugin id="jsx3.gui.Block"/>\n    </requires>\n\n    <resources>\n      <script id="Main" load="early">\n        <data><![CDATA[jsx3.lang.Class.defineClass("jsx3.amp.Main",jsx3.amp.PlugIn,null,function(r,g){var\nub={a:"Main.onRegister",b:"Q8",c:"Main.onExtension ",d:" [",e:"]",f:"progress",g:"init",h:"layout",i:"onComplete",j:"setProgress",k:"Main.onStartup"};var\nw=jsx3.amp;g.onRegister=function(){w.LOG.debug(ub.a);this._progress=jsx3.$A();this._pctdone=0;this._mainComp=null;(this.getEngine()).subscribe(w.Engine.PROGRESS,this,ub.b);this.load();};g.onExtension=function(k,e){this.jsxsuper(k,e);w.LOG.debug(ub.c+k+ub.d+e+ub.e);var\nu=k.getLocalId();if(u==ub.f){(k.processExts(null,e)).each((jsx3.$F(function(c){c.when((jsx3.$F(function(m){m.setProgress(this._pctdone);this._progress.push(m);})).bind(this));})).bind(this));}else if(u==ub.g){(jsx3.$A(e)).each(function(q){(q.getPlugIn()).load();});}else if(u==ub.h)(jsx3.$A(e)).each(function(h){(h.getPlugIn()).load();});};g.Q8=function(i){this._pctdone=i.pct;var\nF=i.done?ub.i:ub.j;var\neb=this._pctdone;this._progress.each(function(a){a[F](eb);});};g.onStartup=function(){(this.loaded()).when((jsx3.$F(function(){w.LOG.debug(ub.k);(this.getExtPoint(ub.g)).processExts();var\nha=(this.getExtPoint(ub.h)).processExts();if(ha.length>0){var\nca=(this.getServer()).getBodyBlock();ha[0].when(function(j){j(ca);});}})).bind(this));};});]]></data>\n      </script>\n    </resources>\n\n    \n    <extension-point id="progress" name="Initialization Progress Extension Point">\n      \n      <processor type="return-async"/>\n    </extension-point>\n\n    \n    <extension-point id="init" name="Initialization Extension Point">\n      <processor type="eval"/>\n    </extension-point>\n\n    \n    <extension-point id="layout" name="Main Component Extension Point">\n      \n      <processor type="return-async"/>\n    </extension-point>\n\n  </plugin>\n\n  <plugin class="jsx3.amp.AutoReg" id="jsx3.amp.autoreg" name="Plug-In Auto-Registration Plug-In" version="0.1">\n\n    <resources>\n      <script id="js" load="early">\n        <data><![CDATA[jsx3.lang.Class.defineClass("jsx3.amp.AutoReg",jsx3.amp.PlugIn,null,function(l,q){var\nub={a:"plugins_auto",b:"/",c:"dirlist",d:/^([\\w\\-]+)(\\.[\\w\\-]+)*$/,e:"done"};var\nw=jsx3.amp;l.DIR=ub.a;q.hasProvider=function(){return this._hasProvider;};q.hasCompleted=function(){return this._done;};q.onRegister=function(){this._hasProvider=false;this._done=false;this._uri=(jsx3.app.Browser.getLocation()).resolve((this.getServer()).resolveURI(l.DIR+ub.b));};q.onExtension=function(d,s){this.jsxsuper(d,s);if(d.getLocalId()==ub.c)if(!this._hasProvider)for(var\nA=0;A<s.length;A++){var\nU=s[A];if(U.isAvailable(this._uri.getScheme())){this._hasProvider=true;this._loadWith(U);break;}}};q._loadWith=function(b){((b.getPlugIn()).load()).when((jsx3.$F(function(){var\nZ=b.getDirNames(this._uri);Z=Z.filter(function(r){return r.match(ub.d);});Z.each((jsx3.$F(function(a){(this.getEngine()).register(a,this._uri);})).bind(this));this._done=true;this.publish({subject:ub.e});})).bind(this));};});]]></data>\n      </script>\n    </resources>\n\n    \n    <event id="done"/>\n\n    <extension-point id="dirlist" name="Provide Directory Listing">\n      \n    </extension-point>\n  </plugin>\n\n  <plugin id="jsx3.amp.persist" name="Data Persistance Plug-In" version="0.1">\n\n    <method id="getFirstProvider">\n      return this.getExtPoint("provider").getExts().find(function(e) { return e.isAvailable(); });\n    </method>\n\n    <extension-point id="provider" name="Provide Persistance">\n      \n    </extension-point>\n\n    <extension id="cookie" point="jsx3.amp.persist.provider">\n      <method id="_getKey" params="k">\n        return "com_tibco_gi_amp_persist_" + k;\n      </method>\n\n      <method id="isAvailable">\n        var s = this.getPlugIn().getServer();\n        var k = this._getKey("__test"), v = "foobar";\n        s.setCookie(k, v);\n        var ok = s.getCookie(k) == v;\n        s.deleteCookie(k);\n        return ok;\n      </method>\n\n      <method id="get" params="k">\n        var s = this.getPlugIn().getServer();\n        return s.getCookie(this._getKey(k));\n      </method>\n\n      <method id="put" params="k, v">\n        var s = this.getPlugIn().getServer();\n        s.deleteCookie(this._getKey(k));\n        var now = new Date();\n        s.setCookie(this._getKey(k), v, new Date(now.getFullYear() + 1, now.getMonth(), now.getDate()));\n      </method>\n\n      <method id="remove" params="k">\n        var s = this.getPlugIn().getServer();\n        s.deleteCookie(this._getKey(k));\n      </method>\n    </extension>\n  </plugin>\n\n  <plugin id="jsx3.amp.util.menumgr" name="MenuManager Plug-In" version="0.1">\n    <requires>\n      <plugin id="jsx3.gui.Menu"/>\n    </requires>\n    <resources>\n      <script id="js" path="MenuManager.js"/>\n    </resources>\n  </plugin>\n\n  <plugin id="jsx3.amp.util.toolbarmgr" name="ToolbarManager Plug-In" version="0.1">\n    <requires>\n      <plugin id="jsx3.gui.ToolbarButton"/>\n    </requires>\n    <resources>\n      <script id="js" path="ToolbarManager.js"/>\n    </resources>\n  </plugin>\n\n  <plugin global="true" id="jsx3.amp.util.prefspanel" name="PrefsPane Plug-In" property="jsx3.amp.util.PrefsPane.PLUGIN" version="0.1">\n    <resources>\n      <script id="js" path="PrefsController.js"/>\n      <xml id="controller" path="controller.xml"/>\n    </resources>\n  </plugin>\n\n  <plugin global="true" id="jsx3.amp.util.wizard" name="Wizard Plug-In" property="jsx3.amp.util.Wizard.PLUGIN" version="0.1">\n    <resources>\n      <script id="js" path="Wizard.js"/>\n      <xml id="controller" path="controller.xml"/>\n    </resources>\n  </plugin>\n\n</plugins>',ja:"handler",jb:"cachekey",k:"engine.load",ka:"when",kb:"amp.22",l:"jsx3.amp.autoreg",la:"this.",lb:"amp.25",m:"done",ma:"(evt);",mb:"amp:data",n:"amp.02",na:"this.load().when(jsx3.$F(function(){",nb:"style",o:"plugins",oa:"}).bind(this));",ob:"type",p:"",pa:"loaded",pb:"text/css",q:"plugin",qa:"if(this.isLoaded()){",qb:"head",r:"amp.04",ra:"}",rb:"beforeEnd",s:"amp.03",sa:"_evt_",sb:'<style type="text/css">\n',t:"id",ta:/\./g,tb:"\n</style>",u:"class",ua:"var ",ub:"amp.29",v:"path",va:" = function(evt){",vb:"*",w:"p.",wa:"}; ",wb:"GET",x:"amp.01",xa:";",xb:"TG",y:"amp.05",ya:".",yb:"link",z:"amp.06",za:"amp.13",zb:"stylesheet"};var
na=jsx3.amp;var
wa=jsx3.xml.Document;var
S=jsx3.util.Job;f.LOAD=ub.a;f.ERROR=ub.b;f.REGISTER=ub.c;f.PROGRESS=ub.d;f.JM={};f.rY={};f.getEngine=function(a){var
I=a.getEnv(ub.e);if(!f.JM[I])f.JM[I]=new
f(a);return f.JM[I];};f.zi=function(b){var
Ab=b.getAddins();for(var
Cb=0;Cb<Ab.length;Cb++)if(Ab[Cb]==na.ADDIN){f.getEngine(b);return;}};f.gh=function(){var
Mb=jsx3.app.Server;var
ab=Mb.allServers();for(var
pb=0;pb<ab.length;pb++)f.zi(ab[pb]);Mb.subscribe(Mb.INITED,f,ub.f);};f.CK=function(s){f.zi(s.target);};jsx3.net.URIResolver.register(ub.g,function(q){var
Lb=q.getHost();for(var Wa in f.JM){var
ga=f.JM[Wa].getPlugIn(Lb);if(ga)return ga;}return null;});p.init=function(r){this.kG=r;this.j5=jsx3.$A();this.pQ={};this.fw={__ct:0};this.TT={};this.u1={};this.jx=0;this.kC=jsx3.util.EventDispatcher.jsxclass.newInnerClass();this.xI=0;this.WB={};this.mZ={};this.ev=new
db(this);this.BA=false;this.jV();};p.jV=jsx3.$Y(function(r){var
kb=new
jsx3.util.Timer(ub.h,(this.getServer()).getEnv(ub.e));var
da=na.DIR+ub.i+na.DESCRIPTOR;var
xa=na.ADDIN.resolveURI(da);var
lb=(new
jsx3.xml.Document()).loadXML(ub.j);var
Ga=this.uQ(lb,xa);Ga.when((jsx3.$F(function(){this.ev.E2();})).bind(this));var
A=f.JO(this.kG.resolveURI(da));var
Pa=this.uQ(A,Ga);var
T=this.dW(Pa);var
za=jsx3.$Z(this.xp,this)(T);za.when(function(){kb.log(ub.k);});return za;});p.dW=jsx3.$Y(function(r){var
Bb=this.getPlugIn(ub.l);(Bb.load()).when(function(){if(Bb.hasProvider()&&!Bb.hasCompleted())Bb.subscribe(ub.m,function(){r.done();});else r.done();});});p.uQ=jsx3.$Y(function(o){var
Mb=(o.args())[0];var
B=(o.args())[1]||Mb.getSourceURL();na.LOG.debug(jsx3._msg(ub.n,B));if(!Mb.hasError()){var
ra=Mb.getBaseName();var
ga=Mb.getNamespaceURI();if(ra==ub.o&&na.isNS(ga)){var
Bb=((new
jsx3.net.URI(B)).resolve(ub.p)).toString();Bb=Bb.substring(0,Bb.length-1);var
P=null;for(var
Y=(Mb.getChildNodes()).iterator();Y.hasNext();){var
Kb=Y.next();if(Kb.getBaseName()==ub.q&&na.isNS(Kb.getNamespaceURI())){var
X=this.sI(Kb,Bb);P=P?P.and(X):X;}}if(P)return P;o.done();}else{na.LOG.error(jsx3._msg(ub.r,ra,ga));this.publish({subject:f.ERROR,xml:Mb});o.done();}}else{na.LOG.error(jsx3._msg(ub.s,Mb.getError()));this.publish({subject:f.ERROR,xml:Mb});o.done();}});p.sI=jsx3.$Y(function(l){var
Eb=(l.args())[0],Ra=(l.args())[1];var
Ba=Eb.getAttribute(ub.t);this.fw[Ba]=this.fw.__ct++;var
_a=Eb.getFirstChild()==null&&Eb.getAttribute(ub.u)==null;var
O=Eb.getAttribute(ub.v);if(O)Ra=((jsx3.net.URI.valueOf(Ra)).resolve(O)).toString();return this.FV(Ra,Ba,_a?null:Eb);});p.FV=jsx3.$Y(function(s){var
D=s.args();var
ob=D[0],Wa=D[1],aa=D[2];this.ev.G3(ub.w+Wa);if(!aa){var
Ta=(ob?ob+ub.i:ub.p)+Wa+ub.i+na.METAFILE;na.LOG.debug(jsx3._msg(ub.x,Ta,Wa));aa=f.JO(Ta);}return this.E6(ob,Wa,aa);});p.E6=jsx3.$Y(function(i){var
Ka=i.args();var
B=Ka[0],Va=Ka[1],P=Ka[2];this.ev.S0(ub.w+Va);if(!P.hasError()){var
La=P.getBaseName();var
u=P.getNamespaceURI();if(La==ub.q&&na.isNS(u)){return this.w0(Va,B,P);}else{na.LOG.error(jsx3._msg(ub.y,Va,La,u));i.done();}}else{na.LOG.error(jsx3._msg(ub.z,Va,P.getError()));i.done();}});p.w0=jsx3.$Y(function(m){var
cb=m.args();var
Ga=cb[0],G=cb[1],Va=cb[2];var
M=Va.getAttribute(ub.t);if(!M||M!=Ga){na.LOG.error(jsx3._msg(ub.A,Ga,M));m.done();}else{var
Nb=na.Jf(Va.getAttribute(ub.B),(this.getServer()).getLocale());if(Nb){(this.gZ(G+ub.i+Ga,Va,Nb)).when((jsx3.$F(function(){m.done(this.Q0(Ga,G,Va));})).bind(this));}else return this.Q0(Ga,G,Va);}});p.gZ=jsx3.$Y(function(r){var
ga=r.args();var
Ka=ga[0],ab=ga[1],lb=ga[2];Ka=Ka+(ub.C+lb+ub.D);(f.JO(Ka)).when((jsx3.$F(function(k){if(k&&!k.hasError())this.Rs(ab,k);else na.LOG.error(jsx3._msg(ub.E,Ka,k?k.getError():null));r.done();})).bind(this));});f.YN={script:1,method:1,field:1,processor:1};f.xQ={script:1,method:1,field:1};p.Rs=function(e,g){if(g.getBaseName()!=ub.q||!na.isNS(g.getNamespaceURI())){na.LOG.error(jsx3._msg(ub.F,g.getSourceURL()));return;}(jsx3.$A(g.getAttributeNames())).each(function(l){e.setAttribute(l,g.getAttribute(l));});this.WF(e,g,ub.G,f.YN);this.WF(e,g,ub.H,f.xQ);};p.WF=function(m,r,d,b){for(var
ca=r.selectNodeIterator(ub.I+d+ub.J,na.getXmlNS(r));ca.hasNext();){var
_a=ca.next();var
ua=_a.getAttribute(ub.t);var
qa=m.selectSingleNode(ub.I+d+ub.K+ua+ub.L,na.getXmlNS(m));if(qa){(jsx3.$A(_a.getAttributeNames())).each(function(s){qa.setAttribute(s,_a.getAttribute(s));});var
nb=(_a.getChildNodes()).toArray();if(nb.length>0){(jsx3.$A(((qa.getChildNodes()).toArray()).reverse())).each(function(s){if(!na.isNS(s.getNamespaceURI())||!b[s.getBaseName()])qa.removeChild(s);});(jsx3.$A(nb)).each(function(g){qa.appendChild(g);});}}else na.LOG.error(jsx3._msg(ub.M,m.getAttribute(ub.t),d,ua));}};p.Q0=jsx3.$Y(function(d){var
ib=d.args();var
ea=ib[0],A=ib[1],R=ib[2];this.WB[ea]=R;var
O=this.w3(R.selectSingleNode(ub.N,na.getXmlNS(R)),ea,A);var
Jb=this.jP(ea,R);var
tb=this.Mx(ea,O,Jb);return jsx3.$Z(this._F,this)(ea,A,R,O,tb);});p.jP=jsx3.$Y(function(s){var
Xa=s.args();var
t=Xa[0],ea=Xa[1];var
R=this.Q9(ea);R=R.filter((jsx3.$F(function(m){var
fb=this.getPlugIn(m);if(!fb&&!this.fw[m])na.LOG.warn(jsx3._msg(ub.O,t,m));return !fb;})).bind(this));if(R.length>0){var
Wa=(jsx3.$F(function(g){R.remove(g.plugin.getId());if(R.length==0){this.unsubscribe(f.REGISTER,Wa);s.done();}})).bind(this);this.subscribe(f.REGISTER,Wa);}else s.done();});p.Mx=jsx3.$Y(function(r){var
Ba=r.args();var
hb=Ba[0],va=Ba[1];var
wb={};va.each(function(e){wb[e.getLocalId()]=e;});this.mZ[hb]=wb;var
B=null;va.each((jsx3.$F(function(j){if(j.getLoadType()==na.Resource.LOAD_EARLY){var
ab=this.W1(j);B=B?B.and(ab):ab;}})).bind(this));if(B)return B;r.done();});p.w3=function(h,a,i){var
Hb={};var
ua=jsx3.$A();if(h)for(var
ja=(h.getChildNodes()).iterator();ja.hasNext();){var
Ka=ja.next();if(na.isNS(Ka.getNamespaceURI())){var
T=Ka.getAttribute(ub.t);if(Hb[T]){na.LOG.error(jsx3._msg(ub.P,T,a));T=null;}if(T==null||T==ub.p)T=ub.Q+a+ub.R+
++this.jx;var
Db=na.Resource.wh(a,i+ub.i+a+ub.i,T,Ka,this);for(var
la=Ka.selectNodeIterator(ub.S,na.getXmlNS(Ka));la.hasNext();){var
Ga=la.next();var
ca=Ga.getAttribute(ub.t);if(ca)Db.Bc(ca,ub.T);else Db.Bc(Ga.getAttribute(ub.q),ub.q);}ua.push(Db);Hb[T]=Db;}}return ua;};p.Q9=function(o){var
Va=jsx3.$A();for(var
Ba=o.selectNodeIterator(ub.U,na.getXmlNS(o));Ba.hasNext();)Va.push((Ba.next()).getAttribute(ub.t));return Va;};p.Q8=function(){var
ca=this.ev.pct();var
ra={subject:f.PROGRESS,pct:100*ca};if(ca>=1)ra.done=true;this.publish(ra);};p._F=function(a,j,d,r){var
wb=d.getAttribute(ub.V);if(wb&&f.rY[a]){}var
Bb;var
Ea=d.getAttribute(ub.u);if(Ea){Bb=na.ej(Ea);if(!Bb)na.LOG.error(jsx3._msg(ub.W,Ea,a));}if(!Bb)Bb=na.PlugIn;var
ka=new
Bb();if(typeof ka.setEngine==ub.X)ka.setEngine(this);if(typeof ka.setPath==ub.X)ka.setPath(j+ub.i+a);if(typeof ka.setData==ub.X)ka.setData(d);if(typeof ka.setResources==ub.X)ka.setResources(r);this.j5.push(ka);this.pQ[a]=ka;na.LOG.debug(jsx3._msg(ub.Y,ka));var
Db=ka.getExtPoints();for(var
Sa=0;Sa<Db.length;Sa++){na.LOG.debug(jsx3._msg(ub.Z,Db[Sa]));this.TT[Db[Sa].getId()]=Db[Sa];}var
mb={};var
ia=ka.getExts();for(var
Sa=0;Sa<ia.length;Sa++){var
P=ia[Sa];var
Ya=P.getPointId();if(!this.u1[Ya])this.u1[Ya]=jsx3.$A();this.u1[Ya].push(P);this.u1[Ya].sort((jsx3.$F(function(h,i){var
Da=this.fw[(h.getPlugIn()).getId()]||0;var
Oa=this.fw[(i.getPlugIn()).getId()]||0;return Da>Oa?1:Da==Oa?0:-1;})).bind(this));na.LOG.debug(jsx3._msg(ub._,P,Ya));if(!mb[Ya])mb[Ya]=jsx3.$A();mb[Ya].push(P);}f.xh(ka,d);for(var Ya in mb){var
Qa=this.TT[Ya];if(Qa){(Qa.getPlugIn()).onExtension(Qa,mb[Ya]);Qa.onExtension(mb[Ya]);}}for(var
Sa=d.selectNodeIterator(ub.aa,na.getXmlNS(d));Sa.hasNext();){var
Cb=Sa.next();var
Ha=Cb.getAttribute(ub.t);ka.addBindableProp(Ha,Cb.getAttribute(ub.ba));ka[Ha]=null;var
ea=((jsx3.$S(Cb.getAttribute(ub.ca)||ub.p)).trim()).split(ub.da);(jsx3.$A(ea)).each((jsx3.$F(function(e){if(e)ka.updateBindableOn(Ha,this.kC,e);})).bind(this));ka.subscribe(Ha,this,ub.ea);}(jsx3.$A(ka.getEvents())).each((jsx3.$F(function(q){ka.subscribe(q,this,ub.ea);})).bind(this));this.bZ(ka,d,true);ka.onRegister();this.publish({subject:f.REGISTER,plugin:ka});};p.bZ=function(q,m,d){var
Na=d?ub.fa:ub.ga;for(var
Ia=m.selectNodeIterator(ub.ha+Na,na.getXmlNS(m));Ia.hasNext();){var
ua=Ia.next();var
C=(ua.getAttribute(ub.ia)).split(ub.da);var
ba=ua.getAttribute(ub.ja);var
yb=ua.getAttribute(ub.ka);var
Q=ba?ub.la+ba+ub.ma:ua.getValue();if(yb==ub.a){Q=ub.na+Q+ub.oa;}else if(yb==ub.pa)Q=ub.qa+Q+ub.ra;for(var
Xa=0;Xa<C.length;Xa++){var
Z=ub.sa+C[Xa].replace(ub.ta,ub.R)+ub.R+this.xI++;var
V=jsx3.eval(ub.ua+Z+ub.va+Q+ub.wa+Z+ub.xa);q[Z]=V;this.kC.subscribe(C[Xa],q,Z);}}};p.qw=function(a){var
y=(jsx3.$O(a)).clone();y.subject=a.target.getId()+ub.ya+a.subject;na.LOG.debug(jsx3._msg(ub.za,y.subject));this.kC.publish(y);if(window.OpenAjax&&OpenAjax.hub)try{OpenAjax.hub.publish(y.subject,y);}catch(y){na.LOG.error(jsx3._msg(ub.Aa,y.subject),jsx3.NativeError.wrap(y));}};f.xh=function(j,e){for(var
u=e.selectNodeIterator(ub.Ba,na.getXmlNS(e));u.hasNext();){var
sa=u.next();var
hb=sa.getBaseName();if(ub.Ca==hb){try{j.eval(sa.getValue());}catch(Kb){na.LOG.error(jsx3._msg(ub.Da,j),jsx3.NativeError.wrap(Kb));}}else if(ub.Ea==hb){try{j[sa.getAttribute(ub.t)]=j.eval(sa.getValue());}catch(Kb){na.LOG.error(jsx3._msg(ub.Fa,sa.getAttribute(ub.t),j),jsx3.NativeError.wrap(Kb));}}else if(ub.Ga==hb)try{var
y=sa.getAttribute(ub.t);if(sa.getAttribute(ub.Ha)==ub.Ia){Wa=this.r7(y);}else{var
Ka=sa.getAttribute(ub.Ja)||ub.p;var
Wa=jsx3.eval(ub.ua+y+ub.Ka+Ka+ub.La+sa.getValue()+ub.wa+y+ub.xa);if(sa.getAttribute(ub.Ma)==ub.Ia)Wa=jsx3.$Y(Wa);}j[y]=Wa;}catch(Kb){na.LOG.error(jsx3._msg(ub.Na,sa.getAttribute(ub.t),j),jsx3.NativeError.wrap(Kb));}(sa.getParent()).removeChild(sa);}};f.r7=function(q){return function(){(this.load()).when((jsx3.$F(function(i,c){this[i].apply(this,c);})).bind(this,[q,arguments]));};};p.isLoaded=function(){return this.BA;};p.getServer=function(){return this.kG;};p.getPlugIns=function(){return this.j5;};p.getPlugIn=function(r){return this.pQ[r];};p.getExtPoint=function(a){return this.TT[a];};p.getExts=function(r){return this.u1[r]||jsx3.$A();};p.register=jsx3.$Y(function(s){var
aa=s.args();var
Q=aa[0];var
H=aa[1];var
ta=aa[2];if(this.pQ[Q])throw new
jsx3.IllegalArgumentException(ub.Oa+Q+ub.ya);this.fw[Q]=this.fw.__ct++;return this.FV(H,Q,ta);});p.deregister=function(i){var
Pa=this.getPlugIn(i);if(Pa){this.j5.remove(Pa);var
Ea=Pa.getExtPoints();for(var
Ha=0;Ha<Ea.length;Ha++){var
Lb=Ea[Ha].getId();delete this.TT[Lb];delete this.u1[Lb];}var
zb=Pa.getExts();for(var
Ha=0;Ha<zb.length;Ha++){var
Xa=zb[Ha];var
Gb=this.u1[Xa.getPointId()];if(Gb)Gb.remove(Xa);}delete this.pQ[i];delete this.fw[i];delete this.WB[i];delete this.mZ[i];}};p.Cf=jsx3.$Y(function(r){var
ua=(r.args())[0];var
mb=this.FC(ua);var
t=new
jsx3.util.Timer(ub.h,ua.getId());var
hb=this.it(ua,mb);var
E=jsx3.$Z(this.cG,this)(ua,hb);E.when(function(){t.log(ub.Pa);});return E;});p.FC=jsx3.$Y(function(a){var
zb=(a.args())[0];var
Fb=null;var
Ya=zb.getRequires();Ya.each((jsx3.$F(function(j){var
Sa=this.getPlugIn(j);if(Sa){if(!Sa.isLoaded()){var
K=Sa.load();Fb=Fb?Fb.and(K):K;}}else na.LOG.error(jsx3._msg(ub.Qa,zb,j));})).bind(this));if(Fb)return Fb;else a.done();});p.it=jsx3.$Y(function(h){var
fa=(h.args())[0];var
aa=null;var
Ya=fa.getResources();Ya.each(function(e){if(!e.isLoaded()&&e.getLoadType()==na.Resource.LOAD_NORMAL){var
Nb=e.load();aa=aa?aa.and(Nb):Nb;}});if(aa)return aa;else h.done();});p.cG=function(m){var
Cb=this.WB[m.getId()];if(Cb){delete this.WB[m.getId()];delete this.mZ[m.getId()];this.bZ(m,Cb,false);(m.getBindableProps()).each(function(i){m.updateBindable(i);});var
ga=Cb.getAttribute(ub.Ra);if(ga)jsx3.lang.setVar(m.isGlobal()?ga:(m.getServer()).getEnv(ub.e)+ub.ya+ga,m);}m.Pi();na.LOG.debug(jsx3._msg(ub.Sa,m));};p.tk=jsx3.$Y(function(i){var
Fa=(i.args())[0];Fa.Kc();var
Oa=this.cz(Fa,Fa.getPlugIn());(this.jH(Fa,Oa)).when(function(j){Fa.Ke(j);i.done();});});p.W1=jsx3.$Y(function(a){var
Ua=a.args();var
ca=Ua[0];(this.cz(ca)).when(function(){(ca.load()).when(a);});});p._getSiblingResource=function(j,r){var
da=j.getPlugIn();return da?da.getResource(r):this.mZ[j._j][r];};p.cz=jsx3.$Y(function(d){var
za=d.args();var
R=za[0];var
aa=null;var
Gb=R.Ao();Gb.each((jsx3.$F(function(r){var
B=null;if(r.type==ub.q){var
Va=this.getPlugIn(r.id);if(Va){if(!Va.isLoaded())B=Va.load();}else na.LOG.error(jsx3._msg(ub.Ta,r.id,R));}else{var
Qa=this._getSiblingResource(R,r.id);if(Qa){if(!Qa.isLoaded())B=Qa.load();}else na.LOG.error(jsx3._msg(ub.Ua,r.id,R));}if(B)aa=aa?aa.and(B):B;})).bind(this));if(aa)return aa;else d.done();});p.xp=function(){this.BA=true;for(var
R=0;R<this.j5.length;R++)this.j5[R].onStartup();this.publish({subject:f.LOAD});};p.nP=function(s,d){if(ub.Va==d)return jsx3.getSharedCache();else if(ub.Wa==d)return jsx3.getSystemCache();else return s.getCache();};p.jH=jsx3.$Y(function(o){var
E=(o.args())[0];var
ua=this.getServer();var
Xa=E.getPathForLocale(ua.getLocale());var
sa=E.getType();var
N=ub.Xa+E.getId();this.ev.G3(N);if(Xa){var
Ga=E.getFullPath(Xa);na.LOG.debug(jsx3._msg(ub.Ya,E,Ga));var
_a=(jsx3.$F(function(n){na.LOG.debug(jsx3._msg(ub.Za,E,Ga));this.ev.S0(N);o.done(n);})).bind(this);switch(sa){case ub.Ca:if(E.attr(ub.eb)==ub.Ia)(f.Zx(Ga)).when((jsx3.$F(function(j){if(j!=null){var
kb=E.getPlugIn()||jsx3;try{var
Y=new
jsx3.util.Timer(ub.h,E.getId());kb.eval(j);Y.log(ub.fb);}catch(Kb){na.LOG.error(jsx3._msg(ub.gb,Ga,kb),jsx3.NativeError.wrap(Kb));}}else na.LOG.error(jsx3._msg(ub.hb,Ga));_a();})).bind(this));else (f.b9(Ga)).when(_a);break;case ub._a:(f.NZ(Ga)).when(_a);break;case ub.ab:(f.JO(Ga)).when((jsx3.$F(function(r){var
Ab=this.nP(ua,E.attr(ub.ib));var
Mb=E.attr(ub.jb)||E.getId();if(Ab)Ab.setDocument(Mb,r);ua.JSS.loadXML(r,Mb);_a(r);})).bind(this));break;case ub.bb:jsx3.app.PropsBundle.getPropsAsync(E.getFullPath(),ua.getLocale(),function(ba){ua.LJSS.addParent(ba);_a(ba);},ua.getCache());break;case ub.cb:(f.JO(Ga,jsx3.xml.CDF.Document.jsxclass)).when((jsx3.$F(function(d){d.convertProperties((this.getServer()).getProperties());var
Ta=this.nP(ua,E.attr(ub.ib));Ta.setDocument(E.attr(ub.jb)||E.getId(),d);_a(d);})).bind(this));break;case ub.db:(f.JO(Ga,jsx3.xml.XslDocument.jsxclass)).when((jsx3.$F(function(i){var
Aa=this.nP(ua,E.attr(ub.ib));if(Aa)Aa.setDocument(E.attr(ub.jb)||E.getId(),i);_a(i);})).bind(this));break;default:na.LOG.error(jsx3._msg(ub.kb,sa));_a();}}else{na.LOG.debug(jsx3._msg(ub.lb,E));var
Oa=E.xml();var
H=Oa.selectSingleNode(ub.mb,na.getXmlNS(Oa));var
pb=null;switch(sa){case ub.Ca:if(E.attr(ub.eb)==ub.Ia){var
Y=new
jsx3.util.Timer(ub.h,E.getId());(E.getPlugIn()||jsx3).eval((H||Oa).getValue());Y.log(ub.fb);}else if(!f.DA[E.getId()]){var
Y=new
jsx3.util.Timer(ub.h,E.getId());f.DA[E.getId()]=1;jsx3.eval((H||Oa).getValue());Y.log(ub.fb);}break;case ub._a:if(jsx3.CLASS_LOADER.IE){var
Jb=document.createElement(ub.nb);Jb.setAttribute(ub.ob,ub.pb);(document.getElementsByTagName(ub.qb))[0].appendChild(Jb);Jb.styleSheet.cssText=((H||Oa).getValue()).toString();}else jsx3.html.insertAdjacentHTML((document.getElementsByTagName(ub.qb))[0],ub.rb,ub.sb+(H||Oa).getValue()+ub.tb);break;case ub.ab:if(H){ua.JSS.loadXML(H.getFirstChild(),E.getId());pb=ua.JSS;}else na.LOG.error(jsx3._msg(ub.ub,E));break;case ub.bb:case ub.cb:if(H){pb=new
jsx3.xml.CDF.Document(H.getFirstChild());pb.convertProperties((this.getServer()).getProperties());var
Ya=this.nP(ua,E.attr(ub.ib));Ya.setDocument(E.attr(ub.jb)||E.getId(),pb);if(sa==ub.bb){var
yb=E.getFullPath(H.getAttribute(ub.v));Ya.setDocument(yb,pb);var
ba=jsx3.app.PropsBundle.getProps(yb,ua.getLocale(),Ya);ua.LJSS.addParent(ba);}}else na.LOG.error(jsx3._msg(ub.ub,E));break;case ub.db:if(H){pb=new
jsx3.xml.XslDocument(H.getFirstChild());(this.nP(ua,E.attr(ub.ib))).setDocument(E.attr(ub.jb)||E.getId(),pb);}else na.LOG.error(jsx3._msg(ub.ub,E));break;default:na.LOG.error(jsx3._msg(ub.kb,sa));}this.ev.S0(N);o.done(pb);}});f.JO=jsx3.$Y(function(k){var
Fb=k.args();var
qb=Fb[0],Pa=Fb[1];var
ta=(Pa||jsx3.xml.Document.jsxclass).newInstance();ta.setAsync(true);ta.subscribe(ub.vb,function(){k.done(ta);});ta.load(qb);});f.Zx=jsx3.$Y(function(e){var
L=e.args();var
ga=L[0];var
mb=jsx3.net.Request.open(ub.wb,ga,true);mb.subscribe(ub.vb,function(){e.done(mb.getResponseText());});mb.send();});f.NZ=jsx3.$Y(function(j){return this.py((j.args())[0],ub.xb);});f.TG=jsx3.$Y(function(h){var
Ma=(h.args())[0];var
Ca=document.createElement(ub.yb);Ca.href=Ma;Ca.rel=ub.zb;Ca.type=ub.pb;(document.getElementsByTagName(ub.qb))[0].appendChild(Ca);h.done();});f.b9=jsx3.$Y(function(a){return this.py((a.args())[0],ub.Ab);});f.ix=jsx3.$Y(function(h){var
F=(h.args())[0];var
ob=new
jsx3.util.Timer(ub.h,F);var
O=document.createElement(ub.Ca);O.setAttribute(ub.Bb,F);O.setAttribute(ub.ob,ub.Cb);if(O.addEventListener){var
Da=function(d){O.removeEventListener(ub.a,Da,false);ob.log(ub.Db);h.done();};O.addEventListener(ub.a,Da,false);}else O.onreadystatechange=function(){var
xa=this.readyState;if(xa==ub.pa||xa==ub.Eb||xa==ub.Fb){O.onreadystatechange=null;ob.log(ub.Db);h.done();}};(document.getElementsByTagName(ub.qb))[0].appendChild(O);});f.DA={};f.py=jsx3.$Y(function(b){var
Qa=(b.args())[0];var
C=f.DA[Qa];if(C){if(C instanceof jsx3.$AsyncRV)return C;else b.done();}else{var
Cb=(b.args())[1];var
xa=f.DA[Qa]=this[Cb](Qa);xa.when(function(){f.DA[Qa]=1;});return xa;}});var
db=function(l){this._eng=l;this._ids={};this._total=0;this._donect=0;this._on=0;};(jsx3.$O(db.prototype)).extend({E2:function(){this._on=1;},G3:function(c){if(this._ids[c])na.LOG.warn(jsx3._msg(ub.Gb,c));else if(this._on){this._ids[c]=1;this._total++;this._eng.Q8();}else this._ids[c]=-1;},S0:function(h){var
Xa=this._ids[h];if(Xa){delete this._ids[h];if(Xa>0){this._donect++;this._eng.Q8();}}else na.LOG.warn(jsx3._msg(ub.Hb,h));},pct:function(){return this._total>0?this._donect/this._total:0;}});});jsx3.amp.Engine.gh();