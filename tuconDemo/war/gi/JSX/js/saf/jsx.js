/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
Array.prototype.indexOf=function(j,g){if(g==null)g=0;for(var
Ka=g;Ka<this.length;Ka++)if(this[Ka]==j)return Ka;return -1;};Array.prototype.lastIndexOf=function(f,n){if(n==null)n=this.length-1;for(var
rb=n;rb>=0;rb--)if(this[rb]==f)return rb;return -1;};Array.prototype.contains=function(o){return this.indexOf(o)>=0;};Array.prototype.remove=function(l){var
ba=this.indexOf(l);if(ba>=0)return (this.splice(ba,1))[0];return null;};Array.prototype.clone=function(){return this.concat();};Array.prototype.pushAll=function(s){this.push.apply(this,s);};Array.prototype.contentsEqual=function(f){if(f==null)return false;if(this.length!=f.length)return false;for(var
mb=0;mb<f.length;mb++)if(this[mb]!=f[mb])return false;return true;};Array.prototype.filter=function(g){var
K=[];for(var
B=0;B<this.length;B++)if(g(this[B]))K.push(this[B]);return K;};Array.prototype.map=function(f,i,d){var
Aa=null;if(i){if(d){Aa={};for(var
hb=0;hb<this.length;hb++){var
ia=f(this[hb]);for(var
fa=0;fa<ia.length;fa=fa+2)Aa[ia[hb]]=ia[hb+1];}}else{Aa=[];for(var
hb=0;hb<this.length;hb++){var
C=f(this[hb]);if(C instanceof Array)Aa.pushAll(C);else Aa.push(C);}}}else if(d){Aa={};for(var
hb=0;hb<this.length;hb++){var
ma=f(this[hb]);Aa[ma[0]]=ma[1];}}else{Aa=new
Array(this.length);for(var
hb=0;hb<this.length;hb++)Aa[hb]=f(this[hb]);}return Aa;};Math.modpos=function(n,i){return jsx3.util.numMod(n,i);};Math.isNaN=function(b){return jsx3.util.numIsNaN(b);};Number.prototype.roundTo=function(s){return jsx3.util.numRound(this,s);};Number.prototype.zeroPad=function(e){var
Ga=""+this;while(Ga.length<e)Ga="0"+Ga;return Ga;};Date.prototype.getLastDateOfMonth=function(){var
ja=this.getMonth();return Date.AH[ja]||((new
Date(this.getYear(),ja,29)).getMonth()==ja?29:28);};Date.prototype.equals=function(l){return l!=null&&l instanceof Date&&l.valueOf()==this.valueOf();};Date.prototype.compareTo=function(g){var
Jb=this.valueOf();var
eb=g.valueOf();return Jb==eb?0:Jb>eb?1:-1;};Date.AH=[31,null,31,30,31,30,31,31,30,31,30,31];String.prototype.trim=function(){return jsx3.util.strTrim(this);};String.prototype.doReplace=function(f,h){var
ba=new
RegExp(f,["g"]);return this.replace(ba,h);};String.prototype.escapeHTML=function(){return jsx3.util.strEscapeHTML(this);};String.prototype.doTruncate=function(q){return jsx3.util.strTruncate(this,q,"...",1);};String.prototype.toAbsolute=function(){var
ca;if(this.substring(0,1)=="/"||(this.substring(0,7)).toUpperCase()=="HTTP://"||(this.substring(0,8)).toUpperCase()=="HTTPS://"){ca=this.toString();}else if(this.substring(0,4)=="JSX/"){ca=jsx3.getEnv("jsxabspath")+this;}else ca=jsx3.getEnv("jsxhomepath")+this;return ca;};String.prototype.urlTo=function(r){var
B=null;var
Bb=this.lastIndexOf("/");if(Bb==this.length-1)B=this+r;else if(Bb<0)B=r;else B=this.substring(0,Bb+1)+r;B=B.replace(/\\/g,"/");var
wa=B.split("/");for(var
P=0;P<wa.length;P++){var
ka=wa[P];if(ka=="."){wa.splice(P--
,1);}else if(ka=="..")if(P>0&&wa[P-1]!=".."){wa.splice(P--
,1);wa.splice(P--
,1);}}return wa.join("/");};String.prototype.endsWith=function(r){return jsx3.util.strEndsWith(this,r);};String.prototype.constrainLength=function(i,q){return jsx3.util.strTruncate(this,i,q,0.6666666666666666);};String.prototype.toBase64=function(){return jsx3.util.strEncodeBase64(this);};String.prototype.fromBase64=function(){return jsx3.util.strDecodeBase64(this);};(function(c){var
ub={a:"undefined",b:"null",c:"[",d:",",e:"]",f:"object",g:":",h:"{",i:"}",j:"string",k:/(^\s*)|(\s*$)/g,l:"",m:"hL",n:"May not call $AsyncRV.rv() before the return value is set.",o:"function",p:"YZ",q:"number"};var
R=function(l,n){for(var B in n)l[B]=n[B];return l;};var
fb=function(b,q){if(typeof q==ub.a)q=true;var
qa;if(b==null)qa=ub.b;else if(c.$A.is(b)){var
Ja=[];for(var
y=0;y<b.length;y++)Ja.push(q?fb(b[y]):b[y]);qa=ub.c+Ja.join(ub.d)+ub.e;}else if(typeof b==ub.f){var
Ja=[];for(var H in b)if(!b.hasOwnProperty||b.hasOwnProperty(H))Ja.push(H+ub.g+(q?fb(b[H]):b[H]));qa=ub.h+Ja.join(ub.d)+ub.i;}else if(typeof b==ub.j){qa=c.util.strEscapeJSON(b);}else qa=b.toString();return qa;};c.$Object={extend:function(j){return R(this,j);},clone:function(){var
gb=c.$O();gb.extend(this);return gb;}};c.$O=function(n){return R(n||{},c.$Object);};c.$O.json=fb;c.$Array={each:function(d){for(var
ja=0;ja<this.length;ja++)d(this[ja]);},map:function(k){var
Za=c.$A();for(var
wb=0;wb<this.length;wb++)Za[wb]=k(this[wb]);return Za;},filter:function(p){var
Ga=c.$A();for(var
_a=0;_a<this.length;_a++)if(p(this[_a]))Ga.push(this[_a]);return Ga;},indexOf:function(f){for(var
Qa=0;Qa<this.length;Qa++)if(this[Qa]===f)return Qa;return -1;},contains:function(p){return this.indexOf(p)>=0;},remove:function(s){var
Da=this.indexOf(s);if(Da>=0)return (this.splice(Da,1))[0];},find:function(e){for(var
M=0;M<this.length;M++)if(e(this[M]))return this[M];},unique:function(){var
sa=this.concat();for(var
x=sa.length-1;x>=1;x--)for(var
ua=x-1;ua>=0;ua--)if(sa[x]===sa[ua]){sa.splice(x,1);break;}return c.$A(sa);},addAll:function(p){this.push.apply(this,p);},clone:function(){return c.$A(this.concat());}};c.$Hash=(c.$Object.clone()).extend({each:function(i){for(var Ib in this)if(this[Ib]!=this.constructor.prototype[Ib]&&this[Ib]!=c.$Hash[Ib])i(Ib,this[Ib]);},keys:function(){var
mb=[];for(var na in this)if(this[na]!=this.constructor.prototype[na]&&this[na]!=c.$Hash[na])mb.push(na);return c.$A(mb);},values:function(){var
Cb=[];for(var v in this)if(this[v]!=this.constructor.prototype[v]&&this[v]!=c.$Hash[v])Cb.push(this[v]);return c.$A(Cb);}});c.$Function={bind:function(g,o){var
kb=this;if(o==null||o.length==0){return c.$F(function(){return kb.apply(g,arguments);});}else return function(){var
rb;if(arguments.length>0){rb=[];for(var
Z=0;Z<o.length;Z++)rb.push(o[Z]);for(var
Z=0;Z<arguments.length;Z++)rb.push(arguments[Z]);}else rb=o;return kb.apply(g,rb);};},throttled:function(){var
Ib=this;return c.$F(function(){if(Ib._thlto)window.clearTimeout(Ib._thlto);Ib._thlto=window.setTimeout((c.$F(Ib)).bind(this,arguments));});},slept:function(){var
nb=this;return c.$F(function(){window.setTimeout(nb.bind(this,arguments));});}};c.$String=(c.$Object.clone()).extend({endsWith:function(r){return this.lastIndexOf(r)==this.length-r.length;},trim:function(){return c.$S(this.replace(ub.k,ub.l));}});c.$F=function(b){return R(b,c.$Function);};var
K=c.$F(function(e,i,m){e[i]=m.rv();});var
tb=function(d){var
X=null;for(var
va=0;va<d.length;va++){var
Ga=d[va];if(Ga instanceof Ha)if(Ga.S0){d[va]=Ga.rv();}else{Ga.when(K.bind(null,[d,va,Ga]));X=X?X.and(Ga):Ga;}}return X;};c.$AsyncCB=function(q,p){this.a7=q;this.c4=p;this.ku=tb(p);};R(c.$AsyncCB.prototype,{Qp:c.$F(function(p,a){this.c4[p]=a.rv();}),done:function(n){this.S0=true;this.wK=n;if(this.YZ)this.YZ(n);},args:function(){return this.c4;}});var
Ha=c.$AsyncRV=function(){};R(Ha.prototype,{o7:function(a){this.S0=true;this.wK=a;if(this.hL){this.hL.each(function(d){d(a);});delete this[ub.m];}},rv:function(){if(!this.S0)throw new
Error(ub.n);return this.wK;},when:function(d,m){var
Ua=null;if(typeof d==ub.o)Ua=d;else if(d instanceof c.$AsyncCB){if(arguments.length>1)Ua=(function(){d.done(m);});else Ua=(function(i){d.done(i);});}else throw new
Error();if(this.S0){Ua(this.wK);}else{if(!this.hL)this.hL=c.$A();this.hL.push(Ua);}},and:function(n){var
Ea=[this];for(var
ea=0;ea<arguments.length;ea++)Ea.push(arguments[ea]);return new
zb(Ea);},or:function(b){var
sb=[this];for(var
Oa=0;Oa<arguments.length;Oa++)sb.push(arguments[Oa]);return new
pb(sb);}});var
ia=function(b){this.Oz=b;b.YZ=this.KD.bind(this);};ia.prototype=new
Ha();R(ia.prototype,{KD:c.$F(function(n){delete this.Oz[ub.p];this.o7(n);})});var
zb=function(l){this.gA=l.length;this.lA=0;(c.$A(l)).each((c.$F(function(e){if(e.S0)this.lA++;else e.when(this.AO.bind(this));})).bind(this));if(this.gA==this.lA)this.o7();};zb.prototype=new
Ha();R(zb.prototype,{AO:c.$F(function(){this.lA++;if(this.lA==this.gA)this.o7();})});var
pb=function(k){(c.$A(k)).each((c.$F(function(m){if(m.S0)this.AO();else m.when(this.AO.bind(this));})).bind(this));};pb.prototype=new
Ha();R(pb.prototype,{AO:c.$F(function(){if(!this.S0)this.o7();})});c.$A=function(e){if(e==null){e=[];}else if(e instanceof Array){}else if(c.$A.is(e)){var
Db=[];for(var
Ra=0;Ra<e.length;Ra++)Db[Ra]=e[Ra];e=Db;}else e=[e];return R(e,c.$Array);};c.$A.is=function(q){return q&&typeof q==ub.f&&(q instanceof Array||typeof q.length==ub.q);};c.$H=function(h){if(c.$A.is(h)){var
mb={};for(var
C=0;C<h.length;C++)mb[h[C]]=1;return R(mb,c.$Hash);}else return R(h||{},c.$Hash);};c.$S=function(e){if(e==null)return e;return R(new
String(e),c.$String);};c.$Y=function(a){return function(){var
rb=new
c.$AsyncCB(this,arguments);var
qa=new
ia(rb);if(rb.ku){var
ca=this;rb.ku.when(function(){var
vb=a.apply(ca,[rb]);if(vb instanceof Ha)vb.when(rb);});}else{var
vb=a.apply(this,[rb]);if(vb instanceof Ha)vb.when(rb);}return qa;};};c.$Z=function(g,p){if(p instanceof Ha)p.when(function(l){p=l;});return function(){var
bb=new
Ha();var
wb=c.Method.argsAsArray(arguments);if(p instanceof Ha){p.when(function(){Y(p,g,wb,bb);});}else Y(p||this,g,wb,bb);return bb;};};var
Y=function(h,o,s,j){var
Ab=typeof o==ub.o?o:h[o];var
za=tb(s);if(za){za.when(function(){j.o7(Ab.apply(h,s));});}else j.o7(Ab.apply(h,s));};})(jsx3);if(jsx3.lang==null)jsx3.lang={};(function(d){var
ub={a:"."};d.STACK_MAX=50;d.getCaller=function(q){var
ia=(q!=null?q:0)+1;var
gb=arguments;if(gb.callee){for(gb=gb.callee;gb!=null;gb=gb.caller){if(--ia>=0)continue;return gb.caller;}}else for(gb=gb.caller;gb!=null;gb=gb.caller){if(--ia>=0)continue;return gb.callee;}return null;};d.getStack=function(q){var
zb=[];var
Ya=(q!=null?q:0)+1;var
fa=arguments;if(fa.callee){for(fa=fa.callee;fa&&fa.caller&&zb.length<jsx3.lang.STACK_MAX;fa=fa.caller){if(--Ya>=0)continue;zb[zb.length]=fa.caller;}}else for(fa=fa.caller;fa&&fa.callee;fa=fa.caller){if(--Ya>=0)continue;zb[zb.length]=fa.callee;}return zb;};d.setVar=function(s,n){var
fa=s.split(ub.a);var
Ib=window;for(var
ca=0;ca<fa.length-1;ca++){var
hb=fa[ca];if(!Ib[hb])Ib[hb]={};Ib=Ib[hb];}Ib[fa[fa.length-1]]=n;};d.getVar=function(h){var
Cb=h.split(ub.a);var
pb=window;for(var
sa=0;sa<Cb.length;sa++){if(pb==null)return;pb=pb[Cb[sa]];}return pb;};})(jsx3.lang);if(window["jsx3"]==null)window["jsx3"]={};if(jsx3.lang==null)jsx3.lang={};jsx3.lang.Uj=new
window.Object();jsx3.lang.Jl=new
window.Object();jsx3.lang.Vc=function(){var
ub={a:"obj.no_inst"};return function(){if(arguments[0]!=jsx3.lang.Uj){var
db=this.getClass?this.getClass():null;throw new
jsx3.Exception(jsx3._msg(ub.a,db||this));}};};jsx3.lang.jm=function(){var
ub={a:"obj.no_init"};return function(){if(arguments[0]!==jsx3.lang.Jl)if(this.init){this.init.apply(this,arguments);}else{var
ha=jsx3.lang.getCaller(-1);throw new
jsx3.Exception(jsx3._msg(ub.a,ha.jsxclass));}};};jsx3.lang.Object=function(){this.init();};window._jsxDX=function(r,j){var
ub={a:"function",b:"string",c:"objClass",d:"@",e:"obj.super_funct",f:"obj.super_static",g:"obj.super_none",h:"undefined",i:"obj.supmx_funct",j:"obj.supmx_static",k:"obj.supmx_none",l:"INTERFACES",m:/jsx3/g,n:"jsx3.gui",o:"SUPERS",p:"",q:"."};j.init=function(){};j.getClass=function(){return this.__jsxclass__.jsxclass;};j.equals=function(i){return this===i;};j.clone=function(){return (this.getClass()).bless(this);};j.instanceOf=function(o){if(o instanceof jsx3.lang.Class){return o.isInstance(this);}else if(typeof o==ub.a&&o.prototype!=null){return this instanceof o||o.jsxclass!=null&&o.jsxclass.isInstance(this);}else if(typeof o==ub.b){o=jsx3.lang.Class.forName(o);if(o!=null)return o.isInstance(this);}throw new
jsx3.IllegalArgumentException(ub.c,o);};j.toString=function(){return ub.d+(this.getClass()).getName();};j.jsxsuper=function(f){var
La=jsx3.Exception;var
gb=jsx3.lang.getCaller();var
la=gb!=null?gb.jsxmethod:null;if(la==null||!(la instanceof jsx3.lang.Method))throw new
La(jsx3._msg(ub.e,gb));if(la.isStatic())throw new
La(jsx3._msg(ub.f,la));var
sb=la.getDeclaringClass();var
Ua=sb.Bl(la);if(Ua==null)throw new
La(jsx3._msg(ub.g,la));var
F=Ua.apply(this,arguments);if(typeof F!=ub.h)return F;};j.jsxsupermix=function(d){var
cb=jsx3.Exception;var
Oa=jsx3.lang.getCaller();var
z=Oa!=null?Oa.jsxmethod:null;if(z==null||!(z instanceof jsx3.lang.Method))throw new
cb(jsx3._msg(ub.i,Oa));if(z.isStatic())throw new
cb(jsx3._msg(ub.j,z));var
pb=z.getDeclaringClass();var
xb=pb.gk(z);if(xb==null)throw new
cb(jsx3._msg(ub.k,z));var
ta=xb.apply(this,arguments);if(typeof ta!=ub.h)return ta;};j.jsxmix=function(g){};j.isInstanceOf=function(d,q,h){if(this.getClass()&&(typeof d!=ub.b||jsx3.lang.Class.forName(d)!=null))return this.instanceOf(d);var
A=jsx3.getClass(this.getInstanceOf());if(A==null)A=this.constructor;if(typeof A==ub.a){var
Kb=A[q?q:ub.l];var
zb=Kb?Kb[d]:null;if(zb==1){return true;}else if(h){return false;}else return this.isInstanceOf(d.replace(ub.m,ub.n),q,true);}return false;};j.isSubclassOf=function(a){return this.isInstanceOf(a,ub.o);};j.getInstanceOf=function(){if(this.getClass())return (this.getClass()).getName();return this.jsxinstanceof?this.jsxinstanceof:this.constructor.className;};j.setInstanceOf=function(o){this.jsxinstanceof=o;return this;};j.getInstanceOfPackage=function(){if(this.getClass())return (this.getClass()).getPackageName();var
O=this.getInstanceOf();if(O==null)return ub.p;var
zb=O.lastIndexOf(ub.q);if(zb>=0)return O.substring(0,zb);else return ub.p;};j.getInstanceOfClass=function(){if(this.getClass()){var
L=(this.getClass()).getName();return L.substring(L.lastIndexOf(ub.q)+1);}var
ma=this.getInstanceOf();if(ma==null)return ub.p;var
X=ma.lastIndexOf(ub.q);if(X>=0)return ma.substring(X+1);else return ma;};j.eval=function(q,i){return jsx3.eval.call(this,q,i);};};window._jsxDX(jsx3.lang.Object,jsx3.lang.Object.prototype);window._jsxDX=null;jsx3.lang.Object.prototype.__noSuchMethod__=function(o,s){throw new
jsx3.Exception(jsx3._msg("class.nsm",(this.getClass()).getName()+"#"+o+"()"));};window.inheritance=jsx3.lang.Object;if(window["jsx3"]==null)window["jsx3"]={};if(jsx3.lang==null)jsx3.lang={};jsx3.lang.Method=jsx3.lang.Vc();jsx3.lang.Method.prototype=new
jsx3.lang.Object();jsx3.lang.Method.prototype.constructor=jsx3.lang.Method;window._jsxDX=function(d,f){var
ub={a:/^\s*function(\s+\w+)?\s*\(\s*([^\)]*?)\s*\)/,b:/\s*,\s*/,c:"method.call",d:".",e:"",f:/^[a-zA-Z_]\w*$/,g:"paramNames[",h:"]",i:"'",j:"', ",k:'var method = arguments.callee.jsxmethod;if (method instanceof jsx3.lang.Method) {  throw new jsx3.Exception("method " + method.getName() + " in class " + method.getDeclaringClass() +    " is abstract and may not be invoked");} else {  throw new jsx3.Exception("invoked abstract method improperly initialized");}',l:"new Function(",m:"');",n:"return this.",o:".apply(this.",p:", arguments);"};d.C2=ub.a;f.dB=function(){if(d.C2.exec((this.getFunction()).toString())){var
Z=RegExp.$2;this.cQ=Z?Z.split(ub.b):[];}else this.cQ=[];};f.getName=function(){return this.c7;};f.getArity=function(){if(this.cQ==null)this.dB();return this.cQ.length;};f.getParameterNames=function(){if(this.cQ==null)this.dB();return this.cQ.concat();};f.getParameterName=function(h){if(this.cQ==null)this.dB();return this.cQ[h];};f.getDeclaringClass=function(){return this.mv;};f.isPackageMethod=function(){return this.mv instanceof jsx3.lang.Package;};f.isStatic=function(){return this.mg;};f.isAbstract=function(){return this.co;};f.getFunction=function(){if(this.isPackageMethod()){return (this.mv.getNamespace())[this.c7];}else if(this.mg){return (this.mv.getConstructor())[this.c7];}else return (this.mv.getConstructor()).prototype[this.c7];};f.apply=function(e,n){return (this.getFunction()).apply(e,n);};f.call=function(j){var
Hb=arguments;if(Hb.length>11)throw new
jsx3.Exception(jsx3._msg(ub.c,+Hb.length));return (this.getFunction()).call(Hb[0],Hb[1],Hb[2],Hb[3],Hb[4],Hb[5],Hb[6],Hb[7],Hb[8],Hb[9],Hb[10]);};f.toString=function(){return this.mv.getName()+ub.d+this.c7;};d.newAbstract=function(k){var
cb=ub.e;for(var
y=0;y<arguments.length;y++){if(!arguments[y].match(ub.f))throw new
jsx3.IllegalArgumentException(ub.g+y+ub.h,arguments[y]);cb=cb+(ub.i+arguments[y]+ub.j);}var
W=ub.k;var
Ma=jsx3.eval(ub.l+cb+ub.i+W+ub.m);Ma.co=true;return Ma;};d.newDelegate=function(r,o){var
pa=ub.n+o+ub.d+r+ub.o+o+ub.p;return new
Function(pa);};d.argsAsArray=function(n,e,l){if(e==null)e=0;if(l==null)l=n.length;else l=Math.min(l,n.length);var
v=l-e;if(v<=0)return [];var
Db=new
Array(v);for(var
qb=0;qb<v;qb++)Db[qb]=n[qb+e];return Db;};};window._jsxDX(jsx3.lang.Method,jsx3.lang.Method.prototype);window._jsxDX=null;if(window["jsx3"]==null)window["jsx3"]=new
window.Object();if(jsx3.lang==null)jsx3.lang=new
window.Object();jsx3.lang.Class=jsx3.lang.Vc();jsx3.lang.Class.prototype=new
jsx3.lang.Object();jsx3.lang.Class.prototype.__jsxclass__=jsx3.lang.Class;window._jsxDX=function(a,e){var
ub={a:"toString",b:"valueOf",c:"jsx3.util.Logger.Manager",d:"jsx3.lang.Class",e:".",f:"jsx3.lang.Object",g:"function",h:"class.bad_super",i:"class.redefine",j:"class.int_ext_class",k:"class.class_ext_int",l:"object",m:"jsx3.lang",n:"class.def_error",o:"class.no_init",p:"loaded ",q:"class.bad_int",r:"class.class_imp_class",s:"class.redef_method"};a.lX={"jsx3.lang.Object":1,"jsx3.lang.Method":1,"jsx3.lang.ClassLoader":1,"jsx3.lang.Class":2};a.W2=[ub.a,ub.b];a.wx={prototype:1,constructor:1,jsxclass:1,__jsxclass__:1};a.aM=null;a.defineClass=function(c,l,q,o){this.E8(c,l,q,o,false);};a.defineInterface=function(p,f,b){this.E8(p,f,null,b,true);};a.E8=function(b,k,r,p,h){if(a.aM==null&&a.forName&&a.forName(ub.c)&&jsx3.util.Logger.Manager.getManager())a.aM=jsx3.util.Logger.getLogger(ub.d);var
xb=b.split(ub.e);var
Ra=xb.pop();var
_=this.Lj(xb);var
ha=this.lX[b]!=null;var
Bb=null;if(k==null){Bb=h||b==ub.f?window.Object:jsx3.lang.Object;}else if(k instanceof a){Bb=k.getConstructor();}else if(typeof k==ub.g&&k.prototype!=null){Bb=k;}else a.R2(jsx3._msg(ub.h,k));if(_[Ra]&&_[Ra].jsxclass){a.R2(jsx3._msg(ub.i,b,_[Ra].jsxclass),null,2);}else{var
V=false;if(!ha){if(Bb.jsxclass!=null){if(h&&!Bb.jsxclass.isInterface())a.R2(jsx3._msg(ub.j,b,Bb.jsxclass));if(!h&&Bb.jsxclass.isInterface())a.R2(jsx3._msg(ub.k,b,Bb.jsxclass));}if(typeof _[Ra]==ub.g){V=true;}else if(h){_[Ra]=jsx3.lang.Vc();}else if(typeof _[Ra]==ub.l){var
Nb=_[Ra];_[Ra]=jsx3.lang.jm();for(var Na in Nb)_[Ra][Na]=Nb[Na];}else _[Ra]=jsx3.lang.jm();_[Ra].prototype=this.Bz(Bb,h);}_[Ra].prototype.__jsxclass__=_[Ra];var
t=_[Ra];if(xb.join(ub.e)==ub.m)jsx3[Ra]=t;var
fb=a.gi(a);fb.c7=b;fb.t0=t;if(Bb!=null)fb.AE=Bb.jsxclass;fb.Wt=h;fb.DZ=[];fb.VN=[];fb.DJ=[];var
qb=fb.TH=[];var
Lb=fb.cF=[];fb.rE={};fb.VG={};t.jsxclass=fb;try{p(t,t.prototype);}catch(Kb){var
za=jsx3.NativeError?jsx3.NativeError.wrap(Kb):null;a.R2(jsx3._msg(ub.n,b,za||Kb.description),za);}for(var Na in t){if(a.wx[Na])continue;if(typeof t[Na]==ub.g){this.hv(t[Na],fb,Na,true);}else qb[qb.length]=Na;}for(var
R=0;R<a.W2.length;R++){var
ua=a.W2[R];if(t[ua]!=null&&t[ua]!=window.Function.prototype[ua]&&t[ua].jsxmethod==null)this.hv(t[ua],fb,ua,true);}for(var Na in t.prototype){if(a.wx[Na])continue;var
ib=t.prototype[Na];if(typeof ib==ub.g){if(Bb==null||ib!=Bb.prototype[Na])this.hv(ib,fb,Na,false);}else Lb[Lb.length]=Na;}for(var
R=0;R<a.W2.length;R++){var
ua=a.W2[R];if(t.prototype[ua]!=null&&t.prototype[ua]!=window.Object.prototype[ua]&&t.prototype[ua].jsxmethod==null)this.hv(t.prototype[ua],fb,ua,false);}if(!V&&!h&&!(typeof t.prototype.init==ub.g))a.R2(jsx3._msg(ub.o,b));if(jsx3.$A.is(r))for(var
R=r.length-1;R>=0;R--)a.YP(fb,t,r[R]);if(a.aM)a.aM.trace(ub.p+b);jsx3.CLASS_LOADER.Xf(fb);}};a.YP=function(b,s,o){if(typeof o==ub.g&&o.jsxclass!=null)o=o.jsxclass;else if(!(o instanceof a))a.R2(jsx3._msg(ub.q,b,o));if(!o.isInterface())a.R2(jsx3._msg(ub.r,b,o));var
t=(o.getConstructor()).prototype;for(var Ib in t){var
eb=t[Ib];var
ea=typeof eb==ub.g?eb.jsxmethod:null;if(ea==null)continue;var
W=s.prototype[Ib];if(W==null){s.prototype[Ib]=eb;}else if(!(W.jsxmethod.getDeclaringClass()).equals(b))s.prototype[Ib]=eb;}b.DZ.unshift(o);};a.Lj=function(g){var
Ia=window;for(var
Va=0;Va<g.length;Va++){var
Ea=g[Va];if(Ia[Ea]==null)Ia[Ea]=new
window.Object();Ia=Ia[Ea];}return Ia;};a.hv=function(o,c,h,d){if(o.jsxmethod instanceof jsx3.lang.Method)if((o.jsxmethod.getDeclaringClass()).equals(c))a.R2(jsx3._msg(ub.s,o.jsxmethod,c+ub.e+h));else return;var
jb=a.gi(jsx3.lang.Method);jb.mv=c;jb.c7=h;jb.mg=d;jb.co=Boolean(o.co);o.jsxmethod=jb;var
Qa=d?c.VN:c.DJ;Qa[Qa.length]=jb;};a.Bz=function(g,f){if(g==Object)return {};return new
g(f?jsx3.lang.Uj:jsx3.lang.Jl);};a.gi=function(n){return new
n(jsx3.lang.Uj);};a.R2=function(n,d,b){if(a.aM){a.aM.log(b||1,n,d);}else if(jsx3.Exception){var
Oa=new
jsx3.Exception(n,d);window.alert(Oa.printStackTrace());}else window.alert(n);};};window._jsxDX(jsx3.lang.Class,jsx3.lang.Class.prototype);window._jsxDX=null;jsx3.lang.Class.defineClass("jsx3.lang.Class",null,null,function(f,s){var
ub={a:".",b:"",c:"class.new_inst",d:"class.bless_int",e:"function",f:"get",g:"is",h:"set",i:"class.int_imp_int",j:"class.class_imp_class",k:"class.already_imp",l:"xV",m:"class.mmix_bad",n:"class.no_aop",o:"m:",p:"undefined"};f.forName=function(l){var
Xa=jsx3.lang.getVar(l);return Xa?Xa.jsxclass:null;};s.getName=function(){return this.c7;};s.getPackage=function(){var
bb=this.c7;while(true){var
ob=bb.lastIndexOf(ub.a);if(ob<0)break;bb=bb.substring(0,ob);var
A=jsx3.lang.Package.forName(bb);if(A!=null)return A;if(f.forName(bb)==null)break;}return null;};s.getPackageName=function(){var
Va=this.getPackage();if(Va){return Va.getName();}else{var
S=this.c7.lastIndexOf(ub.a)+1;return S>=0?this.c7.substring(0,S-1):ub.b;}};s.getConstructor=function(){if(this.t0!=null)return this.t0;var
wb=jsx3.lang.getVar(this.c7);return wb||null;};s.getSuperClass=function(){return this.AE;};s.isInterface=function(){return this.Wt;};s.toString=function(){return this.c7;};s.newInstance=function(o){if(arguments.length>10)throw new
jsx3.Exception(jsx3._msg(ub.c));var
ob=arguments;var
Fb=this.getConstructor();return new
Fb(ob[0],ob[1],ob[2],ob[3],ob[4],ob[5],ob[6],ob[7],ob[8],ob[9]);};s.isInstance=function(n){var
Ga=n.__jsxclass__?n.__jsxclass__.jsxclass:null;return Ga!=null&&this.isAssignableFrom(Ga);};s.isAssignableFrom=function(k){if(this.equals(k))return true;if(k.xV==null)k.dF();return k.xV[this.getName()]==true;};s.dF=function(){this.xV={};for(var
Ja=0;Ja<this.DZ.length;Ja++){var
Ra=this.DZ[Ja];this.xV[Ra.getName()]=true;if(Ra.xV==null)Ra.dF();for(var I in Ra.xV)this.xV[I]=true;}if(this.AE!=null){this.xV[this.AE.getName()]=true;if(this.AE.xV==null)this.AE.dF();for(var I in this.AE.xV)this.xV[I]=true;}};s.mixin=function(l,r,b){if(b){for(var
Aa=0;Aa<b.length;Aa++){var
ka=this.getInstanceMethod(b[Aa]);if(ka&&l[ka.getName()]==null||!r)l[ka.getName()]=ka.getFunction();}}else for(var
Aa=0;Aa<this.DJ.length;Aa++){var
ka=this.DJ[Aa];if(l[ka.getName()]==null||!r)l[ka.getName()]=ka.getFunction();}};s.bless=function(e){if(this.isInterface())throw new
jsx3.Exception(jsx3._msg(ub.d,this));var
N=f.Bz(this.getConstructor());if(e!=null)for(var aa in e)if(!(typeof e[aa]==ub.e))N[aa]=e[aa];return N;};s.newInnerClass=function(c){if(this.isInterface()){return f.gi(this.getConstructor());}else return this.newInstance.apply(this,arguments);};s.getStaticMethods=function(){return this.VN.concat();};s.getInstanceMethods=function(){return this.DJ.concat();};s.getStaticMethod=function(q){for(var
bb=0;bb<this.VN.length;bb++)if(q==this.VN[bb].getName())return this.VN[bb];return null;};s.getInstanceMethod=function(d){if(!this.II){this.II={};for(var
Da=0;Da<this.DJ.length;Da++)this.II[this.DJ[Da].getName()]=this.DJ[Da];}return this.II[d]||null;};s.getGetter=function(p){p=(p.charAt(0)).toUpperCase()+p.substring(1);return this.dM(ub.f+p)||this.dM(ub.g+p);};s.getSetter=function(r){r=(r.charAt(0)).toUpperCase()+r.substring(1);return this.dM(ub.h+r);};s.getStaticFieldNames=function(){return this.TH.concat();};s.getInstanceFieldNames=function(){return this.cF.concat();};s.getInterfaces=function(){return this.DZ.concat();};s.addInterface=function(p){var
Db=null;if(this.isInterface())Db=ub.i;else if(!p.isInterface())Db=ub.j;else if(p.isAssignableFrom(this))Db=ub.k;if(Db)throw new
jsx3.Exception(jsx3._msg(Db,this,p));f.YP(this,this.getConstructor(),p);delete this[ub.l];};s.getInheritance=function(){var
Lb=this.DZ.concat();if(this.AE!=null){Lb[Lb.length]=this.AE;Lb.push.apply(Lb,this.AE.getInheritance());}return Lb;};s.getClasses=function(){var
G=this.getConstructor();var
y=[];for(var xb in G)if(typeof G[xb]==ub.e&&G[xb].jsxclass instanceof f){y[y.length]=G[xb].jsxclass;y.push.apply(y,G[xb].jsxclass.getClasses());}return y;};s.addMethodMixin=function(l,c,e){var
J=this.getInstanceMethod(l);if(!J)f.R2(jsx3._msg(ub.m,this,l));var
eb=jsx3.AOP;if(!eb)f.R2(jsx3._msg(ub.n,this,l));var
pb=this.getName()+ub.a+l+ub.a+c.getName();(eb.pc(pb,{classes:this,methods:l,type:c})).after(pb,function(){this[e].apply(this,jsx3.Method.argsAsArray(arguments,1));});};s.dM=function(m,c){var
Ba=null;if(!c)Ba=this.getInstanceMethod(m);var
W=this.getInheritance();for(var
bb=0;Ba==null&&bb<W.length;bb++)Ba=W[bb].getInstanceMethod(m);return Ba;};s._v=function(d,g){var
pa=null;if(!g)pa=this.getInstanceMethod(d);if(pa==null&&this.AE!=null)pa=this.AE._v(d);return pa;};s.Ey=function(o){var
ba=null;for(var
gb=0;gb<this.DZ.length&&ba==null;gb++)ba=this.DZ[gb].getInstanceMethod(o);if(ba==null&&this.AE!=null)ba=this.AE.Ey(o);return ba;};s.Bl=function(j){var
Q=j.getName();var
L=this.rE[ub.o+Q];if(typeof L==ub.p)this.rE[ub.o+Q]=L=this._v(Q,true);return L;};s.gk=function(k){var
R=k.getName();var
Za=this.VG[ub.o+R];if(typeof Za==ub.p)this.VG[ub.o+R]=Za=this.Ey(R);return Za;};});jsx3.lang.Class.defineClass("jsx3.lang.Object",null,null,function(){});jsx3.lang.Class.defineClass("jsx3.lang.Method",null,null,function(){});jsx3.lang.Class.jsxclass.AE=jsx3.lang.Object.jsxclass;jsx3.Class.defineClass("jsx3.lang.AOP",null,null,function(o,q){var
ub={a:"$",b:"vP",c:"G3",d:"qW",e:"NO",f:"YG",g:/^\w+$/,h:"^",i:"*",j:"\\w*",k:"string",l:"function",m:"strClass"};var
yb=jsx3.IllegalArgumentException;o.Kz={};o.ZT={};o.pc=function(m,r){if(o.Kz[m])throw new
yb();var
Xa=o.Kz[m]={c7:m,qW:[],NO:[],YG:[],QA:r,nD:[]};var
sb=o.So(r);for(var
wb=0;wb<sb.length;wb++){var
Ma=sb[wb];var
Oa=o.uq(Ma);o.ZT[Oa].bG.push(Xa);Xa.nD.push(Oa);}return o;};o.pcrem=function(f){var
S=o.Kz[f];if(S){var
ya=S.nD;for(var
tb=0;tb<ya.length;tb++){var
ib=o.ZT[ya[tb]];ib.bG.splice(jsx3.util.arrIndexOf(ib.bG,S),1);if(ib.bG.length==0)o.fS(ya[tb]);}delete o.Kz[f];}};o.uq=function(b){var
lb=b[0],oa=b[1];var
Ta=lb.getName()+ub.a+oa;if(!o.ZT[Ta]){var
Ha=(lb.getConstructor()).prototype;o.ZT[Ta]={SS:Ha[oa],bG:[]};var
pa=Ha[oa].jsxmethod;Ha[oa]=o.BD(Ta);Ha[oa].jsxmethod=pa;}return Ta;};o.fS=function(n){var
I=o.ZT[n];var
u=I.SS;var
wb=u.jsxmethod;((wb.getDeclaringClass()).getConstructor()).prototype[wb.getName()]=u;delete o.ZT[n];};o.before=function(f,a,n){o[n?ub.b:ub.c](f,a,ub.d);};o.after=function(b,e,j){o[j?ub.b:ub.c](b,e,ub.e);};o.around=function(p,j,e){o[e?ub.b:ub.c](p,j,ub.f);};o.G3=function(p,j,a){o.Kz[p][a].push(j);};o.vP=function(c,d,n){var
jb=o.Kz[c][n];for(var
Sa=jb.length-1;Sa>=0;Sa--)if(jb[j]===d)jb.splice(Sa,1);};o.BD=function(d){var
ga=function(){return o.qX(d,this,arguments);};ga.jsxmethod=o.qX.jsxmethod;return ga;};o.qX=function(p,m,l){var
U=o.gx(m,o.ZT[p].bG);var
G=o.aN(U,ub.f);if(G.length>0){return (new
o.Vt(p,G,m,l)).E2();}else return o.aW(p,m,l,U);};o.aW=function(k,l,d,h){if(!h)h=o.gx(l,o.ZT[k].bG);var
la=o.aN(h,ub.d);for(var
rb=0;rb<la.length;rb++)la[rb].apply(l,d);var
Ea=o.ZT[k].SS.apply(l,d);var
va=o.aN(h,ub.e);if(va.length>0){var
Gb=jsx3.Method.argsAsArray(d);Gb.unshift(Ea);for(var
rb=0;rb<va.length;rb++)va[rb].apply(l,Gb);}return Ea;};o.gx=function(n,j){var
Ja=[];for(var
Mb=0;Mb<j.length;Mb++){var
za=j[Mb];var
da=za.QA;if(!da||!da.type||n.instanceOf(da.type))Ja.push(za);}return Ja;};o.aN=function(c,r){var
Ja=[];for(var
ca=0;ca<c.length;ca++)Ja.push.apply(Ja,c[ca][r]);return Ja;};o.So=function(l){var
S=[];var
I=o.a4(l.classes);for(var
nb=0;nb<I.length;nb++)S.push.apply(S,o.WE(I[nb],l.methods));return S;};o.a4=function(l){if(!jsx3.$A.is(l))l=[l];var
T=[];for(var
E=0;E<l.length;E++)T[E]=o.tI(l[E]);return T;};o.WE=function(k,a){var
v=[];var
qb=(k.getConstructor()).prototype;if(!jsx3.$A.is(a))a=[a];for(var
Ea=0;Ea<a.length;Ea++){var
qa=a[Ea];if(qa.match(ub.g)){var
H=qb[qa];if(H)v.push([k,qa]);}else{var
wb=new
RegExp(ub.h+qa.replace(ub.i,ub.j)+ub.a);for(var Ua in qb)if(Ua.match(wb))v.push([k,Ua]);}}return v;};o.tI=function(d){if(typeof d==ub.k)return jsx3.Class.forName(d);else if(typeof d==ub.l)return d.jsxclass;else if(d instanceof jsx3.Class)return d;else throw new
yb(ub.m,d);};o.Vt=function(i,f,a,s){this.HG=i;this.wB=f;this.a7=a;this.c4=s;};o.Vt.prototype.E2=function(){return this.proceed.apply(this,this.c4);};o.Vt.prototype.proceed=function(){var
va=this.wB.shift();if(va){var
Mb=jsx3.Method.argsAsArray(arguments);Mb.unshift(this);return va.apply(this.a7,Mb);}else return o.aW(this.HG,this.a7,arguments);};});jsx3.Class.defineClass("jsx3.lang.Exception",null,null,function(n,o){var
ub={a:"jsxsuper",b:"jsxsupermix",c:"__noSuchMethod__",d:"",e:"\n",f:"    at ",g:"#",h:".",i:"()",j:"^function(\\s+\\w+)?\\s*\\(([^\\)]*)\\)\\s*{",k:"anonymous",l:/\s+/g,m:" ",n:"(",o:/\s*,\s*/,p:", ",q:")",r:" { ",s:"anonymous()",t:": ",u:"\nCaused By:\n"};var
xb=jsx3.lang.Method;n.Pp=false;n.je=null;o.init=function(f,l){n.je=this;this.Wx=f;this.JK=l;this.Gl=[];this.k4();if(n.Pp&&window.onerror==null)window.alert(f+this.printStackTrace());var
Q=jsx3.util.Logger;if(Q){var
zb=Q.getLogger(n.jsxclass.getName());if(zb.isLoggable(6))zb.trace(f,this);}};o.toString=function(){return this.Wx;};o.getMessage=function(){return this.Wx;};o.getCause=function(){return this.JK;};o.getStack=function(){return this.Gl;};n.L0=[jsx3.Object.jsxclass.getInstanceMethod(ub.a),jsx3.Object.jsxclass.getInstanceMethod(ub.b),jsx3.Object.jsxclass.getInstanceMethod(ub.c)];n.formatStack=function(c){var
S=ub.d;if(!jsx3.util||!jsx3.util.jsxpackage)return S;for(var
vb=0;vb<c.length;vb++){var
J=c[vb];if(J==null)continue;if(J.jsxmethod instanceof xb){var
Jb=c[vb+1];if(Jb!=null&&jsx3.util.arrIndexOf(n.L0,Jb.jsxmethod)>=0)if(J==xb.prototype.apply)continue;if(jsx3.util.arrIndexOf(n.L0,J.jsxmethod)>=0)continue;if(S.length>0)S=S+ub.e;S=S+ub.f;S=S+(J.jsxmethod.getDeclaringClass()).getName();S=S+(J.jsxmethod.isStatic()?ub.g:ub.h);S=S+(J.jsxmethod.getName()+ub.i);}else{if(S.length>0)S=S+ub.e;S=S+ub.f;if(J.jsxclass instanceof jsx3.lang.Class){S=S+(J.jsxclass.getName()+ub.i);}else{var
Gb=J.toString();if(Gb.match(new
RegExp(ub.j))){var
Q=RegExp.$1||ub.k;var
ia=RegExp.$2;var
ba=RegExp.rightContext;ba=jsx3.util.strTruncate((jsx3.util.strTrim(ba)).replace(ub.l,ub.m),70);S=S+(jsx3.util.strTrim(Q)+ub.n+((jsx3.util.strTrim(ia)).split(ub.o)).join(ub.p)+ub.q+(ba?ub.r+ba:ub.d));}else S=S+ub.s;}}}return S;};o.printStackTrace=function(){var
Ba=(this.getClass()).getName()+ub.t+this+ub.e+n.formatStack(this.Gl);if(this.JK!=null)Ba=Ba+(ub.u+this.JK.printStackTrace());return Ba;};o.k4=function(){var
rb=jsx3.lang.getStack(1);var
N=-1;for(var
G=0;G<rb.length;G++)if(rb[G].jsxclass!=null){N=G;break;}if(N>=0)rb.splice(0,N+1);this.Gl=rb;};});jsx3.Class.defineClass("jsx3.lang.IllegalArgumentException",jsx3.lang.Exception,null,function(d,o){var
ub={a:"exc.ill_arg"};o.init=function(g,n){this.jsxsuper(jsx3._msg(ub.a,g,n));};});jsx3.Class.defineClass("jsx3.lang.NativeError",jsx3.lang.Exception,null,function(d,g){var
ub={a:"",b:"uncaught exception:",c:"jsx3.util.Logger",d:"string",e:"error.trap",f:"error.uncaught",g:"\n",h:"error.trap_err",i:"objError",j:/\s*$/,k:"EvalError",l:"RangeError",m:"ReferenceError",n:"SyntaxError",o:"TypeError",p:"Error",q:": ",r:"\nCaused By:\n",s:" (type:",t:", ",u:"line:",v:"file:",w:")"};var
mb=jsx3.Exception;d.D1=false;d.EW=true;d.wrap=function(s){if(s instanceof Error)return new
d(s);else if(s instanceof mb)return s;else return new
mb(ub.a+s);};d.initErrorCapture=function(l){window.onerror=arguments.length>0?l:d.S3;};d.stopErrorCapture=function(r){window.onerror=null;};d.Pr=ub.b;d.S3=function(b,p,h){try{if(!d.D1&&jsx3.Class.forName(ub.c)!=null&&jsx3.util.Logger.GLOBAL!=null){if(typeof b==ub.d&&b.indexOf(d.Pr)>=0)if(mb.je!=null){var
Ba=jsx3.lang.getStack(0);if(Ba.length<2||Ba.contentsEqual(mb.je.getStack())){if(Ba.length<2)jsx3.util.Logger.GLOBAL.logStack(2,jsx3._msg(ub.e,b,d.tx(h),p),1);jsx3.util.Logger.GLOBAL.error(jsx3._msg(ub.f),mb.je);mb.je=true;return true;}}jsx3.util.Logger.GLOBAL.logStack(2,jsx3._msg(ub.e,b,d.tx(h),p),1);return true;}else if(d.EW){if(typeof b==ub.d&&b.indexOf(d.Pr)>=0)if(mb.je!=null){var
Ba=jsx3.lang.getStack(0);if(Ba.contentsEqual(mb.je.getStack())){window.alert(jsx3._msg(ub.f)+ub.g+mb.je.printStackTrace());return true;}}var
Ba=jsx3.lang.getStack(0);window.alert(jsx3._msg(ub.e,b,d.tx(h),p)+ub.g+mb.formatStack(Ba));return true;}else return false;}catch(Kb){window.alert(jsx3._msg(ub.h,d.wrap(Kb),b,d.tx(h),p));}};g._x=null;g.init=function(h){if(!(h instanceof Error))throw new
jsx3.IllegalArgumentException(ub.i,h);this._x=h;this.jsxsuper();};g.getMessage=function(){return (this._x.message||this._x.toString()).replace(ub.j,ub.a);};g.getFileName=function(){return this._x.sourceURL;};g.getLineNumber=function(){return this._x.line;};d.tx=function(a){if(jsx3.util.numIsNaN(a))return null;return a;};g.getName=function(){return this._x.name;};g.isStructural=function(){return false;};g.getType=function(){if(this._x instanceof EvalError)return ub.k;if(this._x instanceof RangeError)return ub.l;if(this._x instanceof ReferenceError)return ub.m;if(this._x instanceof SyntaxError)return ub.n;if(this._x instanceof TypeError)return ub.o;return ub.p;};g.printStackTrace=function(){var
D=(this.getClass()).getName()+ub.q+this+ub.g+mb.formatStack(this.Gl);if(this._x.stack)D=D+(ub.g+this._x.stack);if(this._cause!=null)D=D+(ub.r+this._cause.printStackTrace());return D;};g.toString=function(){var
Wa=this.getLineNumber();var
O=this.getFileName();var
Za=this.getMessage();if(Wa||O){Za=Za+(ub.s+this.getType()+ub.t);if(Wa)Za=Za+(ub.u+Wa);if(O){if(Wa)Za=Za+ub.t;Za=Za+(ub.v+O);}Za=Za+ub.w;}return Za;};});jsx3.lang.Package=jsx3.lang.Vc();jsx3.lang.Class.defineClass("jsx3.lang.Package",null,null,function(s,k){var
ub={a:".",b:"jsx3.util.Logger",c:"jsx3.lang",d:"pkg.redefine",e:"pkg.def_error",f:"jsxpackage",g:"function",h:"object",i:"class.nsm",j:"#",k:"()",l:"class.redef_method"};var
hb=jsx3.lang.Class;var
ea=jsx3.lang.Method;s.R8=[];s.definePackage=function(l,f){var
t=hb.Lj(l.split(ub.a));var
aa=false;var
rb=null;if(t.jsxpackage!=null){if(jsx3.Class.forName(ub.b))(jsx3.util.Logger.getLogger(ub.c)).info(jsx3._msg(ub.d,l));rb=t.jsxpackage;aa=true;rb.TH=[];rb.VN=[];}else{rb=hb.gi(s);rb.bO=l;rb.TH=[];rb.VN=[];t.jsxpackage=rb;}try{f(t);}catch(Kb){var
D=jsx3.NativeError.wrap(Kb);throw new
jsx3.Exception(jsx3._msg(ub.e,l,D),D);}for(var lb in t){if(lb==ub.f)continue;if(typeof t[lb]==ub.g){if(t[lb].jsxclass==null)this.hv(t[lb],rb,lb);}else if(t[lb]==null||typeof t[lb]!=ub.h||t[lb].jsxpackage==null)rb.TH.push(lb);}if(t.__noSuchMethod__==null)t.__noSuchMethod__=function(a,e){throw new
jsx3.Exception(jsx3._msg(ub.i,l+ub.j+a+ub.k));};s.R8.push(rb);jsx3.CLASS_LOADER.Dl(rb);};s.hv=function(d,a,p){if(d.jsxmethod instanceof ea)if((d.jsxmethod.getDeclaringClass()).equals(a)&&d.jsxmethod.getName()!=p){throw new
jsx3.Exception(jsx3._msg(ub.l,d.jsxmethod,a+ub.a+p));}else{if((d.jsxmethod.getDeclaringClass()).equals(a)&&jsx3.util.arrIndexOf(a.VN,d.jsxmethod)<0)a.VN.push(d.jsxmethod);return;}var
t=hb.gi(ea);t.mv=a;t.c7=p;t.mg=true;d.jsxmethod=t;a.VN.push(t);};s.forName=function(l){var
E=jsx3.lang.getVar(l);return E?E.jsxpackage:null;};s.getPackages=function(){return s.R8.concat();};k.bO=null;k.Ev=null;k.VN=null;k.TH=null;k.getName=function(){return this.bO;};k.getNamespace=function(){if(this.Ev!=null)return this.Ev;var
Db=jsx3.lang.getVar(this.bO);return Db||null;};k.getClasses=function(){var
Oa=[];var
z=this.getNamespace();for(var sa in z)if(typeof z[sa]==ub.g&&z[sa].jsxclass instanceof hb)if(z[sa].jsxclass.getPackage()==this&&this.getName()+ub.a+sa==z[sa].jsxclass.getName()){Oa[Oa.length]=z[sa].jsxclass;Oa.push.apply(Oa,z[sa].jsxclass.getClasses());}return Oa;};k.getStaticMethods=function(){return this.VN.concat();};k.getStaticMethod=function(g){for(var
gb=0;gb<this.VN.length;gb++)if(g==this.VN[gb].getName())return this.VN[gb];return null;};k.getStaticFieldNames=function(){return this.TH.concat();};k.toString=function(){return this.bO;};});jsx3.Package.definePackage("jsx3",function(){var
ub={A:"INHR01",B:"Super class '",C:"' of '",D:"' not properly defined",E:"1",F:"jsx3.util.Logger",G:"GP",a:"JSX/addins/",b:"Msxml2.FreeThreadedDOMDocument.3.0",c:"Msxml2.XSLTemplate.3.0",d:"Msxml2.XMLHTTP.3.0",e:"JSX30DESERIALIZE",f:"JSX30INITIALIZE",g:"",h:"var ",i:" = _ec.",j:";",k:"string",l:"object",m:"jsx3.gui.MatrixColumn",n:"jsx3.gui.Matrix.Column",o:"queueDone",p:"jsx3.net.Request.INSYNC",q:"gi",r:"http://www.tibco.com/gi",s:"boot.oah",t:/\s+/,u:"script",v:"function",w:".prototype",x:".",y:")",z:"\n"};jsx3.ADDINSPATH=ub.a;jsx3.XMLREGKEY=ub.b;jsx3.XSLREGKEY=ub.c;jsx3.HTTPREGKEY=ub.d;jsx3.getXmlVersion=function(){return 6;};jsx3.DESERIALIZE=ub.e;jsx3.INITIALIZE=ub.f;jsx3.LOG10E=0.4342944819032518;jsx3.STARTUP_EVENT=null;jsx3.CACHE=null;jsx3.EVENT=null;jsx3.getSharedCache=function(){if(jsx3.CACHE==null)jsx3.CACHE=new
jsx3.app.Cache();return jsx3.CACHE;};jsx3.getSystemCache=function(){if(jsx3.kA==null)jsx3.kA=new
jsx3.app.Cache();return jsx3.kA;};jsx3.eval=function(a,f){if(a!=null&&a!==ub.g){var
ha=ub.g;if(f){var
_ec=f;var
Lb=[];for(var Db in _ec)Lb[Lb.length]=ub.h+Db+ub.i+Db+ub.j;ha=Lb.join(ub.g);}return eval(ha+a);}};jsx3.resolveURI=function(b){return (jsx3.net.URIResolver.DEFAULT.resolveURI(b)).toString();};jsx3.makeCallback=function(j,k,g){var
ib=jsx3.Method.argsAsArray;var
Ba=ib(arguments,2);if(typeof j==ub.k)j=k[j];return function(){var
zb=arguments;var
Qa=zb.length>0?Ba.concat(ib(zb)):Ba;return j.apply(k,Qa);};};jsx3.clone=function(a){if(typeof a!=ub.l)return a;var
Ba={};for(var Aa in a)Ba[Aa]=a[Aa];return Ba;};jsx3.sP={};jsx3.sP[ub.m]=ub.n;jsx3.require=function(j){for(var
Za=0;Za<arguments.length;Za++){var
xa=arguments[Za];xa=jsx3.sP[xa]||xa;if(jsx3.Class.forName(xa)==null)jsx3.CLASS_LOADER.loadClass(xa);}};jsx3.ZN=[];jsx3.I9=[];jsx3.PU=null;jsx3.sleep=function(g,e,l,r){if(e&&jsx3.I9[e])if(r)jsx3.I9[e][0]=null;else return;var
tb=[g,e,l];var
y=jsx3.ZN;y[y.length]=tb;if(e!=null)jsx3.I9[e]=tb;if(!jsx3.PU)jsx3.PU=window.setTimeout(jsx3.jK,0);};jsx3.QUEUE_DONE=ub.o;jsx3.jK=function(){jsx3.util.WeakMap.expire();try{if(jsx3.lang.getVar(ub.p))return;var
F=jsx3.ZN;jsx3.ZN=[];for(var
Mb=0;Mb<F.length;Mb++){var
ua=F[Mb];if(ua&&ua[0])try{if(ua[1]!=null)delete jsx3.I9[ua[1]];ua[0].apply(ua[2]);}catch(Kb){var
nb=jsx3.util.Logger;if(nb){var
G=jsx3.NativeError.wrap(Kb);nb.GLOBAL.error(G,G);}}}}finally{if(jsx3.ZN.length>0)jsx3.PU=window.setTimeout(jsx3.jK,0);else{jsx3.PU=null;jsx3.publish({subject:jsx3.QUEUE_DONE});}}};jsx3.startup=function(){if(window.OpenAjax)try{OpenAjax.hub.registerLibrary(ub.q,ub.r,jsx3.getVersion());}catch(Kb){var
L=jsx3.util.Logger;if(L)L.GLOBAL.error(jsx3._msg(ub.s),jsx3.NativeError.wrap(Kb));}};jsx3.destroy=function(){if(jsx3.app&&jsx3.app.Server){var
T=jsx3.app.Server.allServers();for(var
sb=0;sb<T.length;sb++)try{T[sb].destroy();}catch(Kb){}}if(jsx3.gui&&jsx3.gui.Event){var
ma="BEFOREUNLOAD BLUR CHANGE CLICK DOUBLECLICK ERROR FOCUS KEYDOWN KEYPRESS KEYUP LOAD MOUSEDOWN MOUSEMOVE MOUSEOUT MOUSEOVER MOUSEUP MOUSEWHEEL UNLOAD RESIZE".split(ub.t);for(var
sb=0;sb<ma.length;sb++)jsx3.gui.Event.unsubscribeAll(jsx3.gui.Event[ma[sb]]);}jsx3.NativeError.stopErrorCapture();var
D=document.getElementsByTagName(ub.u);for(var
sb=0;sb<D.length;sb++){var
vb=D.item(sb);vb.parentNode.removeChild(vb);}jsx3.CLASS_LOADER.destroy();window.jsx3=null;};jsx3.getClass=function(r){try{var
T=eval(r);return typeof T==ub.v?T:null;}catch(Kb){return null;}};jsx3.Xe=function(k){try{var
Ta=eval(k+ub.w);return typeof Ta==ub.l&&typeof Ta.constructor==ub.v?Ta:null;}catch(Kb){return null;}};jsx3.getClassConstants=function(a){var
ab=jsx3.getClass(a);if(ab!=null){var
Kb=[];for(var eb in ab)if(eb.toUpperCase()==eb)Kb[Kb.length]=a+ub.x+eb;return Kb;}};jsx3.getInstanceMethods=function(e){var
tb=jsx3.Xe(e);var
nb=[];for(var Kb in tb)if(typeof tb[Kb]==ub.v){var
Hb=tb[Kb].toString();nb[nb.length]=Hb.substring(9,Hb.indexOf(ub.y)+1);}return nb;};jsx3.getClassMethods=function(j){var
Ma=jsx3.getClass(j);var
La=ub.g;for(var Ba in Ma)if(typeof Ma[Ba]==ub.v){var
gb=Ma[Ba].toString();La=La+(Ba+gb.substring(8,gb.indexOf(ub.y)+1)+ub.z);}return La;};jsx3.doInherit=function(n,c,l){var
wb=jsx3.getClass(n);var
ga=jsx3.getClass(c);if(ga==null){jsx3.util.Logger.doLog(ub.A,ub.B+c+ub.C+n+ub.D,1,false);return;}if(wb.isInherited==null||l!=null&&l){if(!l){wb.SUPER=c;wb.SUPERS={};for(var la in ga.SUPERS){wb.SUPERS[la]=ga.SUPERS[la];wb.SUPERS[n]=1;}}wb.className=n;if(wb.INHERITANCE==null)wb.INHERITANCE=[n];if(ga.INHERITANCE)for(var
ta=ga.INHERITANCE.length-1;ta>=0;ta--)wb.INHERITANCE.splice(1,0,ga.INHERITANCE[ta]);else wb.INHERITANCE.splice(1,0,c);if(wb.INTERFACES==null)wb.INTERFACES={};if(ga.INTERFACES){for(var la in ga.INTERFACES)wb.INTERFACES[la]=ga.INTERFACES[la];}else wb.INTERFACES[c]=ub.E;wb.INTERFACES[n]=ub.E;if(!(l!=null&&l))wb.isInherited=true;var
Ab=jsx3.Xe(c);var
pa=jsx3.Xe(n);for(var la in Ab)if(typeof pa[la]!=ub.v)pa[la]=Ab[la];}};jsx3.doImplement=function(j,r){jsx3.doInherit(j,r,true);};jsx3.doMixin=function(l,f){var
aa=jsx3.Xe(f);for(var ua in aa)if(typeof aa[ua]==ub.v)l[ua]=aa[ua];};jsx3.doDefine=function(q,g){var
Mb=jsx3.getClass(q);if(Mb.isDefined==null){Mb.isDefined=true;g();}};jsx3.out=function(e,o,q,r){if(jsx3.Class.forName(ub.F))jsx3.util.Logger.doLog(e,o,q,r);};window.doInherit=jsx3.doInherit;window.doImplement=jsx3.doImplement;window.doMixin=jsx3.doMixin;window.doDefine=jsx3.doDefine;jsx3.log=function(g){if(jsx3.Class.forName(ub.F)&&jsx3.util.Logger.GLOBAL){if(jsx3.GP){for(var
Ab=0;Ab<jsx3.GP.length;Ab++)jsx3.util.Logger.GLOBAL.info(jsx3.GP[Ab]);delete jsx3[ub.G];}jsx3.util.Logger.GLOBAL.info(g);}else{var
Fa=jsx3.GP;if(!Fa)jsx3.GP=Fa=[];Fa[Fa.length]=g;}};});jsx3.Package.definePackage("jsx3.app",function(){});jsx3.Boolean={};jsx3.Boolean.TRUE=1;jsx3.Boolean.FALSE=0;jsx3.Boolean.valueOf=function(d){return d?1:0;};jsx3.Package.definePackage("jsx3.gui",function(o){var
ub={a:"className"};o.Cc=function(n,j){var
ta=[];for(var
mb=0;mb<arguments.length-1;mb=mb+2){n=arguments[mb];if(n._jsxRr)continue;n._jsxRr=true;j=arguments[mb+1];var
u={};for(var ma in j)u[ma]=ma==ub.a?n.className:n.style[ma];ta.push(n,u,j);}o.Wq(ta,0,6);};o.Wq=function(c,m,h){if(m==h){for(var
Ra=0;Ra<c.length-2;Ra=Ra+3){var
O=c[Ra];O._jsxRr=null;}return;}for(var
Ra=0;Ra<c.length-2;Ra=Ra+3){var
O=c[Ra];var
ra=m%2==0?c[Ra+2]:c[Ra+1];for(var Qa in ra)if(Qa==ub.a)O.className=ra[Qa];else O.style[Qa]=ra[Qa];}window.setTimeout(function(){o.Wq(c,m+1,h);},75);};o.isMouseEventModKey=function(k){if(jsx3.app.Browser.macosx)return k.metaKey();else return k.ctrlKey();};});jsx3.Package.definePackage("jsx3.lang",function(g){});jsx3.Package.definePackage("jsx3.net",function(p){});jsx3.Class.defineInterface("jsx3.net.URIResolver",null,function(b,q){var
ub={a:"jsxabspath",b:"jsxhomepath",c:"jsxscriptapppath",d:"JSXAPPS",e:"/",f:"..",g:"jsx",h:"JSX",i:"jsxuser",j:"GI_Builder/",k:"function",l:"jsxurirslv",m:"3.6",n:"strURI",o:"bRel"};b.sN={};b.register=function(l,g){b.sN[l]=g;};b.EI=function(){if(this.V0==null)this.V0=new
jsx3.net.URI(jsx3.getEnv(ub.a));return this.V0;};b.RY=function(){var
xb=jsx3.getEnv(ub.b);if(xb==null)return new
jsx3.net.URI(jsx3.getEnv(ub.c));if(this.Ru==null)this.Ru=new
jsx3.net.URI(xb);return this.Ru;};b.DEFAULT=b.jsxclass.newInnerClass();b.DEFAULT.resolveURI=function(r){var
nb=jsx3.net.URI.valueOf(r);var
Fb=nb.getScheme();var
D=nb.getPath();var
eb=b.getResolver(nb);var
sb=nb;if(eb&&eb!=b.DEFAULT){if(nb.isAbsolute())nb=jsx3.net.URI.fromParts(null,null,null,null,D.substring(1),nb.getQuery(),nb.getFragment());sb=eb.resolveURI(nb);}else if(eb){sb=(b.EI()).resolve(nb);}else if((nb.toString()).indexOf(ub.d+ub.e)==0){sb=b.USER.resolveURI(nb);}else if(!Fb&&D.indexOf(ub.f)>=0){var
Aa=jsx3.app.Browser.getLocation();sb=Aa.relativize(Aa.resolve(nb));}return sb;};b.DEFAULT.getUriPrefix=function(){return (b.EI()).toString();};b.DEFAULT.relativizeURI=function(h,o){return jsx3.net.URI.valueOf(h);};b.JSX=b.jsxclass.newInnerClass();b.register(ub.g,b.JSX);b.JSX.getURI=function(){if(this._uri==null)this._uri=(b.EI()).resolve(ub.h+ub.e);return this._uri;};b.JSX.resolveURI=function(h){var
Ka=jsx3.net.URI.valueOf(h);if(!b.isAbsoluteURI(Ka))Ka=(this.getURI()).resolve(Ka);return b.DEFAULT.resolveURI(Ka);};b.JSX.getUriPrefix=function(){return b.EI()+ub.h+ub.e;};b.JSX.relativizeURI=function(i,p){var
Db=(this.getURI()).relativize(i);if(Db.isAbsolute()||p)return Db;else return jsx3.net.URI.fromParts(ub.g,null,null,null,ub.e+Db.getPath(),Db.getQuery(),Db.getFragment());};b.USER=b.jsxclass.newInnerClass();b.register(ub.i,b.USER);b.USER.resolveURI=function(r){var
v=jsx3.net.URI.valueOf(r);if((v.getPath()).indexOf(ub.d+ub.e)==0||!b.isAbsoluteURI(v))return (b.RY()).resolve(v);return b.DEFAULT.resolveURI(v);};b.USER.getUriPrefix=function(){return (b.RY()).toString();};b.USER.relativizeURI=function(h,o){var
wb=jsx3.app.Browser.getLocation();var
oa=(wb.resolve(jsx3.getEnv(ub.b))).relativize(wb.resolve(h));if(oa.isAbsolute()||o)return oa;else return jsx3.net.URI.fromParts(ub.i,null,null,null,ub.e+oa.getPath(),oa.getQuery(),oa.getFragment());};b.isAbsoluteURI=function(d){var
qa=jsx3.net.URI.valueOf(d);if(qa.getScheme()!=null)return true;var
P=qa.getPath();return P.indexOf(ub.e)==0||P.indexOf(ub.h+ub.e)==0||P.indexOf(ub.d+ub.e)==0||P.indexOf(ub.j)==0;};b.getResolver=function(d){var
ab=jsx3.net.URI.valueOf(d);var
xa=ab.getScheme();var
E=null;if(xa){E=b.sN[xa];if(typeof E==ub.k)E=E(ab);}else{var
fa=ab.getPath();if(fa.indexOf(ub.h+ub.e)==0||fa.indexOf(ub.j)==0)E=b.DEFAULT;else if(jsx3.getEnv(ub.l)==ub.m&&fa.indexOf(ub.d+ub.e)==0)E=b.USER;}return E;};q.resolveURI=jsx3.Method.newAbstract(ub.n);q.getUriPrefix=jsx3.Method.newAbstract();q.relativizeURI=jsx3.Method.newAbstract(ub.n,ub.o);});jsx3.Package.definePackage("jsx3.xml",function(m){});jsx3.Package.definePackage("jsx3.util",function(c){var
ub={A:"&lt;",B:/>/g,C:"&gt;",D:/\"/g,E:"&quot;",F:/[^\x09\x0A\x0D\x20-\x7F]/g,G:"\\u",H:"...",I:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",J:"=",a:",",b:/^[\\$_a-zA-Z][\w\\$]*$/,c:/^(\d+)?([a-zA-Z_]\w*)?$/,d:/[\._]/,e:"",f:"\b",g:"\\b",h:"\t",i:"\\t",j:"\n",k:"\\n",l:"\u000C",m:"\\f",n:"\r",o:"\\r",p:'"',q:'\\"',r:"\\",s:"\\\\",t:/[\"\\\x00-\x1f]/,u:/[\x00-\x1f\\\"]/g,v:"\\u00",w:/(^\s*)|(\s*$)/g,x:/&/g,y:"&amp;",z:/</g};c.RESERVED=jsx3.$H("abstract,boolean,break,byte,case,catch,char,class,const,continue,debugger,default,delete,do,double,else,enum,export,extends,false,final,finally,float,for,function,goto,if,implements,import,in,instanceof,int,interface,long,native,new,null,package,private,protected,public,return,short,static,super,switch,synchronized,this,throw,throws,transient,true,try,typeof,var,void,volatile,while,with".split(ub.a));c.isName=function(h){return Boolean(!c.RESERVED[h]&&h.match(ub.b));};c.compareVersions=function(n,m){var
pb=ub.c;var
x=n.split(ub.d);var
ia=m.split(ub.d);var
G=Math.max(x.length,ia.length);var
sb,ba,ya,ja;for(var
Oa=0;Oa<G;Oa++){if(x.length>Oa&&pb.test(x[Oa])){sb=parseInt(RegExp.$1)||Number(0);ba=RegExp.$2;}else{sb=0;ba=ub.e;}if(ia.length>Oa&&pb.test(ia[Oa])){ya=parseInt(RegExp.$1)||Number(0);ja=RegExp.$2;}else{ya=0;ja=ub.e;}if(sb>ya)return 1;if(sb<ya)return -1;if(ba>ja)return 1;if(ba<ja)return -1;}return 0;};c.numMod=function(h,a){var
mb=h%a;return mb<0?mb+a:mb;};c.numIsNaN=function(k){return k==null||k===ub.e||isNaN(k);};c.numRound=function(d,f){return Math.round(d/f)*f;};c.strEmpty=function(o){return o==null||o===ub.e;};c._jsxz0={};c._jsxz0[ub.f]=ub.g;c._jsxz0[ub.h]=ub.i;c._jsxz0[ub.j]=ub.k;c._jsxz0[ub.l]=ub.m;c._jsxz0[ub.n]=ub.o;c._jsxz0[ub.p]=ub.q;c._jsxz0[ub.r]=ub.s;c.strEscapeJSON=function(m){if(ub.t.test(m))return ub.p+m.replace(ub.u,function(d){var
Y=c._jsxz0[d];if(Y)return Y;Y=d.charCodeAt();return ub.v+(Math.floor(Y/16)).toString(16)+(Y%16).toString(16);})+ub.p;return ub.p+m+ub.p;};c.arrIndexOf=function(a,f){for(var
ma=0;ma<a.length;ma++)if(a[ma]===f)return ma;return -1;};c.SW=ub.w;c.strTrim=function(e){return e.replace(c.SW,ub.e);};c.strEscapeHTML=function(a){return (((((String(a)).replace(ub.x,ub.y)).replace(ub.z,ub.A)).replace(ub.B,ub.C)).replace(ub.D,ub.E)).replace(ub.F,function(m){var
Nb=m.charCodeAt(0);if(Nb<32||Nb>55295&&Nb<57344||Nb>65533&&Nb<65536||Nb>1114111)return ub.G+Nb.toString(16);else return m;});};c.strTruncate=function(g,s,f,b){if(f==null)f=ub.H;if(b==null)b=1;if(g.length>s&&f.length<s){var
L=s-f.length;var
H=Math.round(L*b);var
xb=g.substring(0,H);var
Bb=g.substring(g.length-(L-H));return xb+f+Bb;}else return g;};c.strEndsWith=function(a,n){var
sb=a.lastIndexOf(n);return sb>=0&&sb==a.length-n.length;};c.Mq=ub.I;c.strEncodeBase64=function(o){var
Nb=c.Mq;var
Ca=new
Array(Math.ceil(o.length*4/3));var
La=0,za=0,R=o.length;for(;La<=R-3;La=La+3){var
qb=(o.charCodeAt(La)&255)<<16|(o.charCodeAt(La+1)&255)<<8|o.charCodeAt(La+2)&255;Ca[za++
]=Nb.charAt((qb&16515072)>>18);Ca[za++
]=Nb.charAt((qb&258048)>>12);Ca[za++
]=Nb.charAt((qb&4032)>>6);Ca[za++
]=Nb.charAt(qb&63);}if(La<R){var
aa=La<R-1;var
qb=(o.charCodeAt(La)&255)<<16;if(aa)qb=qb|(o.charCodeAt(La+1)&255)<<8;Ca[za++
]=Nb.charAt((qb&16515072)>>18);Ca[za++
]=Nb.charAt((qb&258048)>>12);if(aa)Ca[za++
]=Nb.charAt((qb&4032)>>6);else Ca[za++
]=ub.J;Ca[za++
]=ub.J;}return Ca.join(ub.e);};c.strDecodeBase64=function(b){var
Qa=c.Mq;var
wa=new
Array(Math.ceil(b.length/4));var
Fa=0,L=0,Wa=b.length;for(;Fa<Wa;Fa=Fa+4){var
y=(Qa.indexOf(b.charAt(Fa))&255)<<18|(Qa.indexOf(b.charAt(Fa+1))&255)<<12|(Qa.indexOf(b.charAt(Fa+2))&255)<<6|Qa.indexOf(b.charAt(Fa+3))&255;wa[L++
]=String.fromCharCode((y&16711680)>>16,(y&65280)>>8,y&255);}if(b.charCodeAt(Fa-2)==61)wa[L-1]=wa[L-1].substring(0,1);else if(b.charCodeAt(Fa-1)==61)wa[L-1]=wa[L-1].substring(0,2);return wa.join(ub.e);};});jsx3.Class.defineClass("jsx3.util.Timer",null,null,function(h,m){var
ub={a:"bench.",b:" : ",c:"",d:"ms"};h.oL=[];h.listen=function(){var
va=[];h.oL.push(va);return va;};h.ignore=function(a){var
wb=jsx3.util.arrIndexOf(h.oL,a);h.oL.splice(wb,1);};h.RS=function(k,l,g){var
ua=h.oL;if(ua.length>0){var
Gb={topic:k.FQ,subtopic:k.Wx,message:l,ms:g};for(var
V=0;V<ua.length;V++)ua[V].push(Gb);}};m.init=function(f,g,q){this.Op=new
Date();this.FQ=String(f);this.Wx=String(g);this.D5=q||4;};m.log=function(a){var
ya=new
Date();if(!this.kV)if(jsx3.util.Logger)this.kV=jsx3.util.Logger.getLogger(ub.a+this.FQ);var
S=ya-this.Op;if(this.kV&&this.kV.isLoggable(this.D5))this.kV.log(this.D5,(this.Wx?this.Wx+ub.b:ub.c)+(a?a+ub.b:ub.c)+S+ub.d);h.RS(this,a,S);this.Op=ya;};});jsx3.Class.defineClass("jsx3.util.WeakMap",null,null,function(a,o){var
ub={a:"lv"};a.uv=0;a.qu={};a.LB=null;a.expire=function(){window.clearTimeout(a.LB);a.LB=null;for(var J in a.qu){var
yb=a.qu[J];if(yb.vJ)yb.lv={};}};o.init=function(){this.jG=a.uv++;this.lv={};this.vJ=false;a.qu[this.jG]=this;};o.get=function(m){return this.lv[m];};o.set=function(r,g){this.lv[r]=g;this.vJ=true;if(!a.LB)a.LB=window.setTimeout(a.expire,0);};o.destroy=function(r,d){delete this[ub.a];delete a.qu[this.jG];};});jsx3.Class.defineClass("jsx3.util.MemStats",null,null,function(b,h){var
ub={a:"namespace",b:"bench.",c:"sys-cache:",d:" shr-cache:",e:" sys-jss:",f:" [@",g:" dom:",h:" html:",i:" cache:",j:" jss:",k:"]",l:" time: ",m:"B",n:"K",o:"M",p:"G",q:"s"};b.INTERVAL=15000;b.sw=12;b.DH=60;b.uv=0;b.eN=function(){var
D=jsx3.util.Logger;if(D){var
nb=b.uv%b.DH==0?4:b.uv%b.sw==0?5:6;b.gU(nb);b.uv++;}};b.log=function(){b.gU(3);};b.getStats=function(){var
C={};var
Ya=new
Date();C.systemcache=b.CU(jsx3.getSystemCache());C.sharedcache=b.CU(jsx3.getSharedCache());C.jss=b.qI(jsx3.System.JSS);C.apps=[];var
K=jsx3.app.Server.allServers();(jsx3.$A(K)).each(function(i){var
y=(i.getRootBlock()).getRendered();C.apps.push({ns:i.getEnv(ub.a),cache:b.CU(i.getCache()),html:y?y.parentNode.innerHTML.length:0,dom:b.r2(i.JSXROOT)+b.r2(i.INVISIBLE),jss:(i.JSS.getKeys()).length+b.qI(i.LJSS)});});C.statstime=(new
Date()).getTime()-Ya.getTime();return C;};b.CU=function(d){var
yb=0;var
Ua=0;var
Za=d.keys();(jsx3.$A(Za)).each(function(k){var
kb=d.getDocument(k);if(kb){Ua++;yb=yb+(kb.toString()).length;}});return [Ua,yb];};b.r2=function(m){if(!m)return 0;var
ka=1;var
I=m.getChildren();for(var
L=0;L<I.length;L++)ka=ka+b.r2(I[L]);return ka;};b.qI=function(e){var
Eb=(e.getKeys()).length;var
zb=e.getParents();for(var
Ab=0;Ab<zb.length;Ab++)Eb=Eb+b.qI(zb[Ab]);return Eb;};b.gU=function(f){var
S=jsx3.util.Logger;if(S){var
Ba=S.getLogger(ub.b+b.jsxclass.getName());if(Ba.isLoggable(f)){var
K=b.getStats();var
da=ub.c+b.pV(K.systemcache[1])+ub.d+b.pV(K.sharedcache[1])+ub.e+K.jss;(jsx3.$A(K.apps)).each(function(i){da=da+(ub.f+i.ns+ub.g+i.dom+ub.h+b.pV(i.html)+ub.i+b.pV(i.cache[1])+ub.j+i.jss+ub.k);});da=da+(ub.l+b.f6(K.statstime));Ba.log(f,da);}}};b.pV=function(n){if(n<1024)return n+ub.m;n=Math.ceil(n/1024);if(n<1024)return n+ub.n;n=n/1024;if(n<1024)return Math.round(n*10)/10+ub.o;n=Math.ceil(n/1024);return Math.round(n*10)/10+ub.p;};b.f6=function(f){return Math.round(f/100)/10+ub.q;};window.setInterval(b.eN,b.INTERVAL);});jsx3.Class.defineClass("jsx3.util.List",null,null,function(m,o){var
ub={a:"a",b:"number",c:"[",d:"]"};m.wrap=function(g){if(g instanceof m){return g;}else if(g instanceof Array){return new
m(g,true);}else throw new
jsx3.IllegalArgumentException(ub.a,g);};o.init=function(l,h){if(typeof l==ub.b){this.UL=new
Array(l);}else if(l instanceof m){this.UL=l.UL.concat();}else{l=m.vM(l);if(l instanceof Array){this.UL=h?l:l.concat();}else this.UL=[];}this.Qq=-1;};o.size=function(){return this.UL.length;};o.get=function(k){return this.UL[k];};o.set=function(i,k){this.UL[i]=k;};o.iterator=function(){return new
m.Iterator(this);};o.clear=function(){this.UL.splice(0,this.UL.length);};o.indexOf=function(p,r){if(r==null)r=0;var
Ta=this.size();for(var
sa=r;sa<Ta;sa++)if(this.get(sa)===p)return sa;return -1;};o.lastIndexOf=function(d,f){if(f==null)f=this.size()-1;for(var
ea=f;ea>=0;ea--)if(this.get(ea)===d)return ea;return -1;};o.contains=function(h){return this.indexOf(h)>=0;};o.remove=function(f){var
va=this.indexOf(f);if(va>=0)return (this.UL.splice(va,1))[0];return null;};o.removeAt=function(n,b){if(arguments.length==2){return m.wrap(this.UL.splice(n,b-n));}else return (this.UL.splice(n,1))[0];};o.clone=function(){return new
m(this);};o.add=function(q,n){var
bb=this.UL;if(n==null)bb[bb.length]=q;else bb.splice(n,0,q);};o.addAll=function(l,q){if(l instanceof m)l=l.toArray(true);else l=m.vM(l);if(jsx3.$A.is(l)){if(q==null)this.UL.push.apply(this.UL,l);else this.UL=(this.UL.slice(0,q)).concat(l,this.UL.slice(q));}else throw new
jsx3.IllegalArgumentException(ub.a,l);};m.vM=function(s){if(s==null||s instanceof Array){return s;}else if(typeof s.length==ub.b){var
H=new
Array(s.length);for(var
Z=0;Z<s.length;Z++)H[Z]=s[Z];return H;}else return s;};o.slice=function(i,a){return m.wrap(arguments.length>1?this.UL.slice(i,a):this.UL.slice(i));};o.sort=function(e){if(e)this.UL.sort(e);else this.UL.sort();};o.toArray=function(q){return q?this.UL:this.UL.concat();};o.equals=function(d){if(this===d)return true;if(!(d instanceof m))return false;var
mb=this.size();if(mb!=d.size())return false;for(var
ob=0;ob<mb;ob++)if(this.get(ob)!==d.get(ob))return false;return true;};o.filter=function(r){var
ua=[];var
wb=this.size();for(var
Fa=0;Fa<wb;Fa++){var
Ra=this.get(Fa);if(r(Ra))ua[ua.length]=Ra;}return m.wrap(ua);};o.map=function(e,j,c){var
xa=this.size();if(j){if(c){var
ca={};for(var
Za=0;Za<xa;Za++){var
Na=e(this.get(Za));for(var
B=0;B<Na.length;B=B+2)ca[Na[B]]=Na[B+1];}return ca;}else{var
ca=[];for(var
Za=0;Za<xa;Za++){var
Ia=e(this.get(Za));if(Ia instanceof Array)ca.push.apply(ca,Ia);else ca[ca.length]=Ia;}return m.wrap(ca);}}else if(c){var
ca={};for(var
Za=0;Za<xa;Za++){var
jb=e(this.get(Za));ca[jb[0]]=jb[1];}return ca;}else{var
ca=new
Array(xa);for(var
Za=0;Za<xa;Za++)ca[Za]=e(this.get(Za));return m.wrap(ca);}};o.toString=function(){return ub.c+this.UL+ub.d;};o.reset=function(){this.Qq=-1;return this;};o.next=function(){return this.get(
++this.Qq);};o.move=function(k){this.Qq=k;return this;};o.hasNext=function(){return this.Qq<this.size()-1;};o.getIndex=function(){return this.Qq;};o.getItem=function(i){return this.get(i);};o.getLength=function(){return this.size();};});jsx3.Class.defineInterface("jsx3.util.Iterator",null,function(n,r){r.next=jsx3.Method.newAbstract();r.hasNext=jsx3.Method.newAbstract();r.remove=jsx3.Method.newAbstract();});jsx3.Class.defineClass("jsx3.util.List.Iterator",null,[jsx3.util.Iterator],function(n,r){r.init=function(b){this.eg=b;this.bk=b?b.size():0;this.de=0;};r.next=function(){return this.eg.get(this.de++);};r.hasNext=function(){return this.de<this.bk;};r.remove=function(){if(this.de>0){this.eg.removeAt(
--this.de);this.bk--;}};});jsx3.Class.defineClass("jsx3.app.AddIn",null,[jsx3.net.URIResolver],function(d,j){var
ub={a:"prototypes/",b:"user:",c:"jsxuser:/addins/",d:"/",e:"id",f:"name",g:"description",h:"version",i:"jsxversion",j:"3.1",k:"config.xml",l:"JSX_SETTINGS::",m:"3.2",n:"jsxaddin",o:/:/,p:"!",q:":"};var
C=jsx3.net.URIResolver;d.PROTOTYPES_DIR=ub.a;j.init=function(p){this.HG=p;this.nM=p.indexOf(ub.b)==0?jsx3.resolveURI(ub.c+p.substring(5)+ub.d):jsx3.resolveURI(jsx3.ADDINSPATH+p+ub.d);this.io=new
jsx3.net.URI(this.nM);this.Ge=(jsx3.app.Browser.getLocation()).resolve(this.io);this.hs=null;};j.getId=function(){return (this.getSettings()).get(ub.e);};j.getName=function(){return (this.getSettings()).get(ub.f);};j.getDescription=function(){return (this.getSettings()).get(ub.g);};j.getVersion=function(){return (this.getSettings()).get(ub.h);};j.getJsxVersion=function(){return (this.getSettings()).get(ub.i)||ub.j;};j.getKey=function(){return this.HG;};j.getPath=function(){return this.nM;};j.getSettings=function(){if(this.hs==null){var
ka=(jsx3.getSystemCache()).getOrOpenDocument(this.io.resolve(ub.k),ub.l+this.getKey());this.hs=new
jsx3.app.Settings(ka);}return this.hs;};j.setSettings=function(l){this.hs=l;};j.resolveURI=function(o){var
N=jsx3.net.URI.valueOf(o);if(jsx3.util.compareVersions(this.getJsxVersion(),ub.m)>=0&&!C.isAbsoluteURI(N))N=this.io.resolve(N);return C.DEFAULT.resolveURI(N);};j.getUriPrefix=function(){return this.io.toString();};j.relativizeURI=function(s,g){var
ob=jsx3.app.Browser.getLocation();var
Ga=this.Ge.relativize(ob.resolve(s));if(Ga.isAbsolute()||g)return Ga;else return jsx3.net.URI.fromParts(ub.n,null,(this.getKey()).replace(ub.o,ub.p),null,ub.d+Ga.getPath(),Ga.getQuery(),Ga.getFragment());};j.toString=function(){return this.HG;};C.register(ub.n,function(h){var
B=((h.getHost()).split(ub.p,2)).join(ub.q);return jsx3.System.getAddin(B);});});jsx3.Class.defineInterface("jsx3.util.EventDispatcher",null,function(c,m){var
ub={a:"*",b:"object",c:"function",d:"string",e:"objHandler, objFunction",f:"{",g:"}, {",h:"}",i:"objEvent"};c.i4=1;c.vR=2;c.Ly=3;c.nW=4;c.dw=5;c.SUBJECT_ALL=ub.a;m.subscribe=function(l,q,d){var
P=typeof q;var
Aa=typeof d;var
La=null;if(P==ub.b||P==ub.c){if(Aa==ub.c){La=[c.i4,q,d];}else if(Aa==ub.d){La=[c.vR,q,d];}else if(P==ub.c)La=[c.dw,q];}else if(P==ub.d)if(Aa==ub.c){La=[c.Ly,q,d];}else if(Aa==ub.d)La=[c.nW,q,d];if(La==null&&P==ub.b&&q.call&&q.apply)La=[c.dw,q];if(La==null)throw new
jsx3.IllegalArgumentException(ub.e,ub.f+typeof q+ub.g+typeof d+ub.h);if(!jsx3.$A.is(l))l=[l];for(var
Fb=0;Fb<l.length;Fb++){var
wa=this.b0();var
da=l[Fb];if(!wa[da])wa[da]=[La];else wa[da].push(La);}};m.unsubscribe=function(q,l){if(!jsx3.$A.is(q))q=[q];for(var
lb=0;lb<q.length;lb++){var
A=(this.b0())[q[lb]];if(A)for(var
Na=0;Na<A.length;Na++)if(A[Na][1]===l)A.splice(Na--
,1);}};m.unsubscribeAll=function(k){if(this._jsxeventreg)delete this._jsxeventreg[k];};m.unsubscribeAllFromAll=function(){this._jsxeventreg={};};m.publish=function(a){if(a.target==null)a.target=this;var
rb=a.subject;if(rb==null)throw new
jsx3.IllegalArgumentException(ub.i,a);var
t=this._jsxeventreg;if(!t)return;var
ya=t[rb];var
ea=t[ub.a];if(!ya&&!ea)return;var
yb=[];if(ya)yb.push.apply(yb,ya);if(ea)yb.push.apply(yb,ea);for(var
db=0;db<yb.length;db++){var
Ua=yb[db];var
H=Ua[0];var
ta=Ua[1];var
sa=Ua[2];if(H==c.i4){sa.call(ta,a);}else if(H==c.vR){ta[sa](a);}else if(H==c.Ly){var
zb=(this.getServer()).getJSX(ta);if(zb)sa.call(zb,a);}else if(H==c.nW){var
zb=(this.getServer()).getJSX(ta);if(zb)zb[sa](a);}else if(H==c.dw){ta.call(null,a);}else{}}return yb.length;};m.getSubscriberCount=function(k){var
db=(this.b0())[k];return db?db.length:0;};m.b0=function(){if(this._jsxeventreg==null)this._jsxeventreg={};return this._jsxeventreg;};});jsx3.util.EventDispatcher.jsxclass.mixin(jsx3);jsx3.EventDispatcher=jsx3.util.EventDispatcher;jsx3.Class.defineClass("jsx3.net.URI",null,null,function(s,f){var
ub={A:"%0",B:/[^a-fA-F0-9]/,a:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",b:"0123456789",c:"_-!.~'()*",d:",;:$&+=",e:"?/[]@",f:"%",g:"^[",h:"][\\-\\.\\+",i:"]*\\:",j:"arguments",k:"@",l:":",m:"",n:"/@",o:"//",p:"?",q:"#",r:"string",s:"/",t:".",u:"..",v:"&",w:"=",x:/(\W)/g,y:"\\$1",z:"]*$"};s.i2=ub.a;s.TZ=ub.b;s.ou=s.i2+s.TZ;s.B4=s.ou+ub.c;s.bP=ub.d;s.nB=s.bP+ub.e;s.FJ=ub.f;s._o=new
RegExp(ub.g+s.i2+ub.h+s.i2+ub.i);f.v3=null;f.kM=null;f.GH=null;f.fs=null;f.t8=null;f.nM=null;f.dp=null;f.Fy=null;f.K4=null;f.mB=null;s.fromParts=function(k,p,e,m,o,r,l){var
sb=s.jsxclass.bless();var
wa=arguments;var
B=null,N=null;if(wa.length==3){sb.kM=wa[0];N=s.encode(wa[1],s.B4+s.nB+s.FJ);sb.GH=s.decode(wa[1]);sb.fs=s.decode(wa[2]);}else if(wa.length==7){sb.kM=wa[0];sb.Fy=s.decode(wa[1]);sb.K4=wa[2];sb.mB=wa[3];sb.nM=s.decode(wa[4]);sb.dp=s.decode(wa[5]);sb.fs=s.decode(wa[6]);}else throw new
jsx3.IllegalArgumentException(ub.j,jsx3.Method.argsAsArray(wa));if(sb.t8==null&&sb.K4!=null){sb.t8=B=sb.K4;if(sb.Fy){sb.t8=sb.Fy+ub.k+sb.t8;B=s.encode(sb.Fy,s.B4+s.bP+s.FJ)+ub.k+B;}if(sb.mB){sb.t8=sb.t8+ub.l+sb.mB;B=B+ub.l+sb.mB;}}if(sb.GH==null){sb.GH=N=ub.m;if(sb.nM){sb.GH=sb.nM;N=s.encode(sb.nM,s.B4+s.bP+s.FJ+ub.n);}if(sb.t8!=null){sb.GH=ub.o+sb.t8+sb.GH;N=ub.o+B+N;}if(sb.dp){sb.GH=sb.GH+ub.p+sb.dp;N=N+ub.p+s.encode(sb.dp,s.B4+s.bP+s.FJ);}}if(sb.v3==null){sb.v3=N;if(sb.kM)sb.v3=sb.kM+ub.l+sb.v3;if(sb.fs!=null)sb.v3=sb.v3+ub.q+s.encode(sb.fs,s.B4+s.nB+s.FJ);}return sb;};f.init=function(j){if(j==null)j=ub.m;if(typeof j!=ub.r)j=j.toString();this.v3=j;var
Ja=j;var
Ua;if(s._o.test(Ja)){var
Bb=RegExp.lastMatch;this.kM=Ja.substring(0,Bb.length-1);Ja=Ja.substring(Bb.length);}if((Ua=Ja.indexOf(ub.q))>=0){this.fs=s.decode(Ja.substring(Ua+1));Ja=Ja.substring(0,Ua);}this.GH=Ja;var
Z=this.kM!=null;var
Ea=Z&&Ja.indexOf(ub.s)!=0;if(!Ea){if(Ja.indexOf(ub.o)==0){Ua=Ja.indexOf(ub.s,2);this.t8=Ja.substring(2,Ua>=0?Ua:Ja.length);Ja=Ua>=0?Ja.substring(Ua):ub.m;}if((Ua=Ja.indexOf(ub.p))>=0){this.dp=s.decode(Ja.substring(Ua+1));Ja=Ja.substring(0,Ua);}this.nM=s.decode(Ja);var
Ma=this.t8;if(Ma){if((Ua=Ma.indexOf(ub.k))>=0){this.Fy=s.decode(Ma.substring(0,Ua));Ma=Ma.substring(Ua+1);}if((Ua=Ma.indexOf(ub.l))>=0){this.mB=parseInt(Ma.substring(Ua+1));Ma=Ma.substring(0,Ua);}}this.K4=Ma;}};f.normalize=function(){if(jsx3.util.strEmpty(this.nM))return this;var
La=this.nM.split(ub.s);s.sE(La);var
u=La.join(ub.s);return u==this.nM?this:s.fromParts(this.kM,this.Fy,this.K4,this.mB,u,this.dp,this.fs);};s.sE=function(g){var
Na=g[0]!==ub.m;for(var
Lb=g.length-1;Lb>=0;Lb--)if(g[Lb]==ub.t)g.splice(Lb,1);for(var
Lb=0;Lb<g.length;Lb++)if(Lb>0&&g[Lb]==ub.u&&g[Lb-1]!=ub.u){g.splice(Lb-1,2);Lb=Lb-2;}if(Na&&g[0]!=null&&g[0].indexOf(ub.l)>=0)g.unshift(ub.t);};f.resolve=function(e){e=s.valueOf(e);if(this.v3==ub.m)return e;if(e.isAbsolute()||this.isOpaque())return e;if(e.fs&&!e.nM&&!e.kM&&!e.t8&&!e.dp)return s.fromParts(this.kM,this.Fy,this.K4,this.mB,this.nM,this.dp,e.fs);var
Va=this.kM;var
wb=e.dp;var
ob=e.fs;var
sa=null,Mb=null,ya=null,gb=null;if(e.t8!=null){sa=e.Fy;Mb=e.K4;ya=e.mB;gb=e.nM;}else{sa=this.Fy;Mb=this.K4;ya=this.mB;if(e.nM.indexOf(ub.s)==0){gb=e.nM;}else{var
U=this.nM.split(ub.s);U.pop();U.push.apply(U,e.nM.split(ub.s));s.sE(U);gb=U.join(ub.s);}}return s.fromParts(Va,sa,Mb,ya,gb,wb,ob);};f.relativize=function(b){b=s.valueOf(b);if(this.v3==ub.m)return b;if(this.isOpaque()||b.isOpaque())return b;if(this.kM!=b.kM)return b;var
Hb=this.t8!=null?this.t8:ub.m;var
Sa=b.t8!=null?b.t8:ub.m;if(Hb!=Sa)return b;var
D=this.nM||ub.m;var
wa=b.nM||ub.m;var
cb=D.split(ub.s);cb.pop();var
C=wa.split(ub.s);var
wb=[];var
X=0;while(X<cb.length&&X<C.length){if(cb[X]!=C[X])break;X++;}var
ea=null;if(X<2&&D.indexOf(ub.s)==0){ea=wa;}else{for(var
Db=X;Db<cb.length;Db++)wb[wb.length]=ub.u;for(var
Db=X;Db<C.length;Db++)wb[wb.length]=C[Db];ea=wb.join(ub.s);}return s.fromParts(null,null,null,null,ea,b.dp,b.fs);};f.getAuthority=function(){return this.t8;};f.getFragment=function(){return this.fs;};f.getHost=function(){return this.K4;};f.getPath=function(){return this.nM;};f.getPort=function(){return this.mB;};f.getQuery=function(){return this.dp;};f.getQueryParam=function(g){var
u=this.dp;if(u){var
T=0;var
ba=g.length;var
mb=null;while((mb=u.indexOf(g,T))>=0){if(mb==0||u.charAt(mb-1)==ub.v){var
fa=u.charAt(mb+ba);if(fa==ub.v||jsx3.util.strEmpty(fa)){return true;}else if(fa==ub.w){var
Fb=u.indexOf(ub.v,mb+ba+1);return Fb>=0?u.substring(mb+ba+1,Fb):u.substring(mb+ba+1);}}T=mb+ba;}}return null;};f.getQueryParams=function(){var
da={};if(this.dp){var
Ma=this.dp.split(ub.v);for(var
K=0;K<Ma.length;K++){var
u=Ma[K];var
La=u.indexOf(ub.w);if(La>=0){da[u.substring(0,La)]=u.substring(La+1);}else da[u]=true;}}return da;};f.getScheme=function(){return this.kM;};f.getSchemeSpecificPart=function(){return this.GH;};f.getUserInfo=function(){return this.Fy;};f.isAbsolute=function(){return this.kM!=null;};f.isOpaque=function(){return this.kM!=null&&this.GH.indexOf(ub.s)!=0;};f.equals=function(p){if(this===p)return true;if(!(p instanceof jsx3.net.URI))return false;var
Wa=this.kM;var
ga=p.kM;if(Wa==null&&ga!=null||Wa!=null&&ga==null)return false;if(Wa!=null&&Wa.toLowerCase()!=ga.toLowerCase())return false;if(this.fs!=p.fs)return false;if(this.isOpaque()){if(!p.isOpaque())return false;return this.GH==p.GH;}else return this.nM==p.nM&&this.dp==p.dp&&this.t8==p.t8;};f.toString=function(){return this.v3;};s.encode=function(q,j){if(q==null)return null;if(j==null)j=s.B4;var
sa=new
RegExp(ub.g+j.replace(ub.x,ub.y)+ub.z);if(q.match(sa))return q;var
z=q.length;var
P=new
Array(z);for(var
C=0;C<z;C++){var
nb=q.charAt(C);if(j.indexOf(nb)<0){var
Ca=nb.charCodeAt(0);if(Ca<16){P[C]=ub.A+(Ca.toString(16)).toUpperCase();}else if(Ca<256){P[C]=ub.f+(Ca.toString(16)).toUpperCase();}else P[C]=nb;}else P[C]=nb;}return P.join(ub.m);};s.decode=function(k){if(k==null)return null;if(k.indexOf(ub.f)<0)return k;var
K=k.length;var
Oa=new
Array(K);var
P=0;for(var
ga=0;ga<k.length;ga++){var
aa=k.charAt(ga);if(aa==ub.f){var
Ua=k.substring(ga+1,ga+3);if(Ua.match(ub.B)){Oa[P++
]=aa;}else{Oa[P++
]=String.fromCharCode(parseInt(Ua,16));ga=ga+2;}}else Oa[P++
]=aa;}return Oa.join(ub.m);};s.valueOf=function(b){if(jsx3.util.strEmpty(b))return s.K8;return b instanceof s?b:new
s(b);};s.K8=new
s();});jsx3.Class.defineClass("jsx3.gui.Event",null,null,function(k,a){var
ub={A:": ",B:/\s+/g,C:" ",D:"attaching event listener ",E:" to ",F:".",G:"adding event listener ",H:"setting event handler ",I:" on ",J:"error subscribing to event ",K:"_focusHandler  lost focus:",L:" (",M:")",N:"function",O:"subscribeLoseFocus ",P:"... adding event listener to ",Q:"unsubscribeLoseFocus ",R:"... removing event listener from ",S:"Unsubscribing from event ",T:"Unsubscribing all from event ",U:"Publishing event: ",V:"Handling event: ",W:"detaching event listener ",X:" from ",Y:"removing event listener ",Z:"unsetting event handler ",_:"",a:"beforeunload",aa:"mouse",b:"blur",ba:"key",c:"change",ca:"KeyEvents",d:"click",da:"MouseEvent",e:"dblclick",ea:"KeyEvent",f:"error",fa:"tabindex",g:"focus",ga:"onclick",h:"keydown",ha:"@jsx3.gui.Event <empty>",i:"keypress",ia:"@jsx3.gui.Event ",j:"keyup",ja:":",k:"load",l:"mousedown",m:"mousemove",n:"mouseout",o:"mouseover",p:"mouseup",q:"mousewheel",r:"unload",s:"resize",t:"jsx3.util.Logger",u:"registering window ",v:"deregistering window ",w:"Window ",x:" not registered.",y:"on",z:"Subscribing to event "};k.BEFOREUNLOAD=ub.a;k.BLUR=ub.b;k.CHANGE=ub.c;k.CLICK=ub.d;k.DOUBLECLICK=ub.e;k.ERROR=ub.f;k.FOCUS=ub.g;k.KEYDOWN=ub.h;k.KEYPRESS=ub.i;k.KEYUP=ub.j;k.LOAD=ub.k;k.MOUSEDOWN=ub.l;k.MOUSEMOVE=ub.m;k.MOUSEOUT=ub.n;k.MOUSEOVER=ub.o;k.MOUSEUP=ub.p;k.MOUSEWHEEL=ub.q;k.UNLOAD=ub.r;k.RESIZE=ub.s;k.KEY_ALT=18;k.KEY_ARROW_DOWN=40;k.KEY_ARROW_LEFT=37;k.KEY_ARROW_RIGHT=39;k.KEY_ARROW_UP=38;k.KEY_BACKSPACE=8;k.KEY_CONTROL=17;k.KEY_DELETE=46;k.KEY_END=35;k.KEY_ENTER=13;k.KEY_ESCAPE=27;k.KEY_HOME=36;k.KEY_INSERT=45;k.KEY_META=224;k.KEY_PAGE_DOWN=34;k.KEY_PAGE_UP=33;k.KEY_SHIFT=16;k.KEY_SPACE=32;k.KEY_TAB=9;k.KEY_0=48;k.KEY_9=57;k.KEY_A=65;k.KEY_Z=90;k.KEY_NP0=96;k.KEY_NP9=105;k.KEY_NPDIV=111;k.KEY_NPMUL=106;k.KEY_NPSUB=109;k.KEY_NPADD=107;k.KEY_NPDEC=110;k.KEY_F1=112;k.KEY_F15=126;k.cx=[];k.NC=[];k.wP=jsx3.util.EventDispatcher.jsxclass.newInnerClass();k.LS=[];var
y=null;k.tZ=function(){if(k._LOG==null)if(jsx3.Class.forName(ub.t)!=null){y=jsx3.util.Logger;k._LOG=y.getLogger(k.jsxclass.getName());}return k._LOG;};k._registerWindow=function(h){var
Eb=k.tZ();if(Eb!=null&&Eb.isLoggable(5))Eb.debug(ub.u+h.name);k.cx.push(h);k.NC.push({});k.LS.push({});};k._isWindowRegistered=function(d){return jsx3.util.arrIndexOf(k.cx,d)>=0;};k._deregisterWindow=function(s){var
Ea=jsx3.util.arrIndexOf(k.cx,s);if(Ea>=0){var
Ba=k.tZ();if(Ba!=null&&Ba.isLoggable(5))Ba.debug(ub.v+s.name);k.cx.splice(Ea,1);k.NC.splice(Ea,1);k.LS.splice(Ea,1);}else throw new
jsx3.Exception(ub.w+s+ub.x);};k._registerWindow(window);k.subscribe=function(f,d,j){k.wP.subscribe(f,d,j);var
C=ub.y+f;var
pb=k.tZ();if(pb!=null&&pb.isLoggable(5))pb.debug(ub.z+f+ub.A+((d.toString()).substring(0,50)).replace(ub.B,ub.C));var
bb=k.cp(f)?[window]:k.cx;for(var
eb=0;eb<bb.length;eb++)try{var
sb=bb[eb];var
v=k.gG(sb,f);if(v.attachEvent&&k.cW(f)){var
_a=k.LS[eb];if(!_a[f]){if(pb!=null&&pb.isLoggable(5))pb.debug(ub.D+f+ub.E+v+ub.F);v.attachEvent(C,k.Ft);_a[f]=true;}}else if(v.addEventListener&&k.l1(f)){var
_a=k.LS[eb];if(!_a[f]){if(pb!=null&&pb.isLoggable(5))pb.debug(ub.G+f+ub.E+v+ub.F);v.addEventListener(f,k.Ft,false);_a[f]=true;}}else{var
u=k.NC[eb];if(v[C]!=k.Ft){if(pb!=null&&pb.isLoggable(5))pb.debug(ub.H+C+ub.I+v+ub.F);if(v[C]!=null)u[C]=v[C];v[C]=k.Ft;}}}catch(Kb){if(pb!=null&&pb.isLoggable(5))pb.debug(ub.J+f,jsx3.NativeError.wrap(Kb));k._deregisterWindow(sb);eb--;}};k.H8=[];k._q=function(g){var
ob=k.wrap(g);var
Q=ob.srcElement();var
x=k.H8.concat();var
Ya=k.tZ();L1:for(var
_a=0;_a<x.length;_a++){var
Z=x[_a];var
Bb=Z[0];var
eb=Z[1];var
z=Z[2];var
nb=Q;if(eb.containsHtmlElement){if(eb.containsHtmlElement(Q))continue;}else while(nb!=null){if(nb==eb)continue L1;nb=nb.parentNode;}if(Ya!=null&&Ya.isLoggable(5))Ya.debug(ub.K+eb+ub.L+Bb+ub.M);var
na={target:k,event:ob};if(typeof z==ub.N)z.call(Bb,na);else Bb[z](na);}};k.subscribeLoseFocus=function(q,e,d){var
Sa=k.tZ();if(Sa!=null&&Sa.isLoggable(5))Sa.debug(ub.O+q+ub.C+e);k.H8.push([q,e,d]);if(k.H8.length==1){var
ma=e.ownerDocument||e.getDocument();if(Sa!=null&&Sa.isLoggable(5))Sa.debug(ub.P+ma);ma.addEventListener(ub.g,k._q,true);}};k.unsubscribeLoseFocus=function(p){var
fb=k.tZ();if(fb!=null&&fb.isLoggable(5))fb.debug(ub.Q+p);var
wa=null;for(var
Xa=0;Xa<k.H8.length;Xa++)if(k.H8[Xa][0]==p){var
Ra=k.H8[Xa][1];wa=Ra.ownerDocument||Ra.getDocument();k.H8.splice(Xa--
,1);}if(k.H8.length==0&&wa!=null){if(fb!=null&&fb.isLoggable(5))fb.debug(ub.R+wa);wa.removeEventListener(ub.g,k._q,true);}};k.preventSelection=function(n){};k.unsubscribe=function(s,j){var
xa=k.tZ();if(xa!=null&&xa.isLoggable(5))xa.debug(ub.S+s+ub.A+((j.toString()).substring(0,50)).replace(ub.B,ub.C));k.wP.unsubscribe(s,j);if(k.wP.getSubscriberCount(s)==0)k.pN(s);};k.unsubscribeAll=function(i){var
Eb=k.tZ();if(Eb!=null&&Eb.isLoggable(5))Eb.debug(ub.T+i+ub.F);k.wP.unsubscribeAll(i);k.pN(i);};k.publish=function(m){var
z={subject:m.getType(),target:k,event:m};k.XW(z);};k.XW=function(c){var
K=ub.y+c.subject.toLowerCase();var
C=k.tZ();if(C!=null&&C.isLoggable(6))C.trace(ub.U+K+ub.F);var
Oa=k.NC[0];if(Oa[K]!=null)Oa[K]();k.wP.publish(c);};k.Ft=function(n){var
Db=new
k(n!=null?n:window.event);var
ja=k.tZ();if(ja!=null&&ja.isLoggable(6))ja.trace(ub.V+Db.getType()+ub.F);var
T={subject:Db.getType(),target:k,event:Db};k.XW(T);if(T.returnValue)return T.returnValue;};k.pN=function(c){var
ua=ub.y+c;var
db=k.tZ();var
z=k.cp(c)?[window]:k.cx;for(var
Bb=0;Bb<z.length;Bb++)try{var
Z=z[Bb];var
Ra=k.gG(Z,c);if(Ra.attachEvent&&k.cW(c)){var
Q=k.LS[Bb];if(Q[c]){if(db!=null&&db.isLoggable(5))db.debug(ub.W+c+ub.X+Ra);Ra.detachEvent(ua,k.Ft);Q[c]=false;}}else if(Ra.removeEventListener&&k.l1(c)){var
Q=k.LS[Bb];if(Q[c]){if(db!=null&&db.isLoggable(5))db.debug(ub.Y+c+ub.X+Ra+ub.F);Ra.removeEventListener(c,k.Ft,false);Q[c]=false;}}else{var
Sa=k.NC[Bb];if(db!=null&&db.isLoggable(5))db.debug(ub.Z+ua+ub.I+Ra+ub.F);if(Sa[ua]!=null){Ra[ua]=Sa[ua];delete Sa[ua];}else Ra[ua]=null;}}catch(Kb){if(db!=null&&db.isLoggable(5))db.debug(ub.J+c,jsx3.NativeError.wrap(Kb));k._deregisterWindow(Z);Bb--;}};k.gG=function(j,i){return i==ub.a||i==ub.r||i==ub.s?j:j.document;};k.cW=function(c){return c!=ub.a;};k.l1=function(c){return c!=ub.a;};k.cp=function(s){return s==ub.a||s==ub.r;};a.init=function(b,r){this.XR=b;if(r)this._clone=jsx3.clone(b);};a.he=function(){if(this._clone==null)this._clone=jsx3.clone(this.XR);this._clone._jsxVY=true;};k.wrap=function(i,h){return i instanceof k?i:new
k(i,h);};k.getCurrent=function(n){return window.event?new
k(window.event,n):null;};a._event=function(){if(this.XR==null)return this._clone;else return this.XR;};a.event=function(){return this._event();};a.getType=function(){return (this._event()).type;};a.srcElement=function(){var
Db=this._event();return Db.target||Db.srcElement;};a.toElement=function(){var
xb=this._event();return xb.type==ub.n?xb.relatedTarget:xb.target;};a.fromElement=function(){var
D=this._event();return D.type==ub.o?D.relatedTarget:D.target;};a.isMouseEvent=function(){var
sa=this.getType()||ub._;return sa.indexOf(ub.aa)==0||sa==ub.d||sa==ub.e;};a.isKeyEvent=function(){return (this.getType()||ub._).indexOf(ub.ba)==0;};a.setCapture=function(b){};a.releaseCapture=function(b){};a.keyCode=function(){var
Z=this._event();return Z.keyCode;};a.clientX=function(){var
Ia=this._event();return Ia?Ia.clientX:Number.NaN;};a.clientY=function(){var
Na=this._event();return Na?Na.clientY:Number.NaN;};a.getOffsetX=function(){var
A=(this._event()).target;var
ya=(this._event()).clientX;return ya-(jsx3.html.getRelativePosition(A.ownerDocument.body,A)).L;};a.getOffsetY=function(){var
ib=(this._event()).target;var
ya=(this._event()).clientY;return ya-(jsx3.html.getRelativePosition(ib.ownerDocument.body,ib)).T;};a.getScreenX=function(){return (this._event()).screenX;};a.getScreenY=function(){return (this._event()).screenY;};a.getTrueX=function(){return (this._event()).clientX;};a.getTrueY=function(){return (this._event()).clientY;};a.getWheelDelta=function(){var
tb=(this._event()).wheelDelta;var
Aa=tb>0?Math.ceil(tb/120):Math.floor(tb/120);return Aa;};a.shiftKey=function(){var
gb=this._event();return gb.shiftKey;};a.ctrlKey=function(){var
pb=this._event();return pb.ctrlKey;};a.altKey=function(){var
Qa=this._event();return Qa.altKey;};a.metaKey=function(){var
lb=this._event();return lb.metaKey;};a.enterKey=function(){return (this._event()).keyCode==13;};a.spaceKey=function(){return (this._event()).keyCode==32;};a.tabKey=function(){return (this._event()).keyCode==9;};a.rightArrow=function(){return (this._event()).keyCode==39;};a.leftArrow=function(){return (this._event()).keyCode==37;};a.upArrow=function(){return (this._event()).keyCode==38;};a.downArrow=function(){return (this._event()).keyCode==40;};a.deleteKey=function(){return (this._event()).keyCode==46;};a.backspaceKey=function(){return (this._event()).keyCode==8;};a.insertKey=function(){return (this._event()).keyCode==45;};a.homeKey=function(){return (this._event()).keyCode==36;};a.endKey=function(){return (this._event()).keyCode==35;};a.pageUpKey=function(){return (this._event()).keyCode==33;};a.pageDownKey=function(){return (this._event()).keyCode==34;};a.escapeKey=function(){return (this._event()).keyCode==27;};a.exists=function(){return this._event()!=null;};a.cancelBubble=function(){var
Gb=this._event();Gb._jsxC5=true;if(!Gb._jsxVY)Gb.stopPropagation();};a.cancelReturn=function(){(this._event()).returnValue=false;};a.cancelKey=function(){var
ab=this._event();if(!ab._jsxVY){ab.stopPropagation();ab.preventDefault();}};a.cancelAll=function(){this.cancelBubble();this.cancelKey();this.cancelReturn();};a.leftButton=function(){var
L=this._event();if(jsx3.app.Browser.macosx&&L.ctrlKey)return false;var
ka=this.getType();if(ka==ub.l||ka==ub.p){return L.button==0;}else if(ka==ub.d||ka==ub.e)return L.button==0;return false;};a.rightButton=function(){var
Da=this._event();var
wb=this.getType();if(wb==ub.l||wb==ub.p)return Da.button==2||jsx3.app.Browser.macosx&&Da.ctrlKey;else return false;};a.button=function(){var
bb=this._event();return bb.button;};a.setReturn=function(b){(this._event()).returnValue=b;};a.setKeyCode=function(i){var
ea=this._event();if(ea.charCode==13){var
La=(this.getDocument()).createEvent(ub.ca);La.initKeyEvent(ub.i,true,true,(this.getDocument()).defaultView,ea.ctrlKey(),ea.altKey(),ea.shiftKey(),false,0,i);ea.preventDefault();ea.target.dispatchEvent(La);}};a.isModifierKey=function(){var
Va=this._event();return Va.keyCode==16||Va.keyCode==17||Va.keyCode==18||Va.keyCode==224;};a.hasModifier=function(j){return !j&&this.shiftKey()||this.ctrlKey()||this.altKey()||this.metaKey();};a.isArrowKey=function(){var
fb=this.keyCode();return fb>=37&&fb<=40;};a.isFunctionKey=function(){var
mb=this.keyCode();return mb>=112&&mb<=126;};a.getAttribute=function(p){return (this._event())[p];};a.setAttribute=function(h,g){(this._event())[h]=g;};a.removeAttribute=function(m){(this._event())[m]=null;};k.dispatchMouseEvent=function(n,j,e){var
Y=document.createEvent(ub.da);Y.initMouseEvent(j,true,true,window,0,0,0,0,0,false,false,false,false,0,n);if(e)for(var t in e)Y[t]=e[t];n.dispatchEvent(Y);};k.dispatchKeyEvent=function(b,q,s,p,c,r,l){var
ya=document.createEvent(ub.ea);ya.initMouseEvent(q,true,true,window,0,0,0,0,0,false,c,r,p,0,b);ya.keyCode=s;if(l)for(var _a in l)ya[_a]=l[_a];b.dispatchEvent(ya);};if(jsx3.CLASS_LOADER.SAF3)k.subscribe(ub.d,function(b){var
x=b.event.srcElement();while(x){if(x.getAttribute){var
nb=x.getAttribute(ub.fa);if(parseInt(nb)>=0){jsx3.html.focus(x);break;}if(x.getAttribute(ub.ga))break;}x=x.parentNode;}});a.isFakeOut=function(h){if(this.getType()==ub.n){var
O=this.toElement();try{while(O!=null){if(O==h)return true;O=O.parentNode;}}catch(Kb){return false;}}return false;};a.isFakeOver=function(h){if(this.getType()==ub.o){var
H=this.fromElement();try{while(H!=null){if(H==h)return true;H=H.parentNode;}}catch(Kb){return false;}}return false;};a.toString=function(){var
da=this._event();if(da==null)return ub.ha;var
qb=[];for(var sa in da)if(typeof da[sa]!=ub.N)qb[qb.length]=sa;qb.sort();var
Ua=[ub.ia];for(var
wa=0;wa<qb.length;wa++)Ua[Ua.length]=qb[wa]+ub.ja+da[qb[wa]]+ub.C;return Ua.join(ub._);};});jsx3.gui.Event.subscribe("unload",jsx3.destroy);jsx3.Class.defineClass("jsx3.app.Browser",null,null,function(a,s){var
ub={a:"win32",b:"linux",c:"macosx",d:"other",e:/[_-]/,f:"_",g:"Win",h:"Linux",i:"Mac OS X"};a.WIN32=ub.a;a.LINUX=ub.b;a.MACOSX=ub.c;a.OTHER=ub.d;a.getLocaleString=function(){var
Eb=window.navigator.language;var
Aa=Eb.split(ub.e);if(Aa.length>0){Aa[0]=Aa[0].toLowerCase();if(Aa.length>1)Aa[1]=Aa[1].toUpperCase();}return Aa.join(ub.f);};a.isTableMoveBroken=function(h){return true;};a.tP=null;a.getStyleClass=function(q){q=q.toLowerCase();if(a.tP==null){var
wb={};for(var
za=0;za<document.styleSheets.length;za++){var
ba=document.styleSheets[za];try{for(var
gb=0;gb<ba.cssRules.length;gb++){var
fb=ba.cssRules[gb];wb[fb.selectorText]=fb.style;}}catch(Kb){}}a.tP=wb;}return a.tP[q];};a.getLocation=function(){if(a.VF==null)a.VF=new
jsx3.net.URI(window.location.href);return a.VF;};a.getSystem=function(){if(a.Rx==null){var
N=navigator.platform;var
Ea=navigator.userAgent;var
fb=ub.d;if(N.indexOf(ub.g)==0)fb=ub.a;else if(N.indexOf(ub.h)==0)fb=ub.b;else if(Ea.indexOf(ub.i)!=-1)fb=ub.c;a.Rx=fb;}return a.Rx;};a[a.getSystem()]=true;});jsx3.Class.defineClass("jsx3.app.Settings",null,null,function(r,i){var
ub={a:"undefined",b:"/data",c:"/record[@jsxid='",d:"']",e:"gq",f:"./record",g:"type",h:"jsxid",i:"true",j:"data",k:"map",l:"./record[@jsxid='",m:"record",n:"null",o:"string",p:"number",q:"boolean",r:"false",s:"object",t:"array",u:"function",v:"idPR02",w:"Cannot persist object of type "};i.init=function(b){this.OM=b||jsx3.xml.CDF.newDocument();this.dc=this.OM.getRootNode();};i.get=function(q){var
Hb=this.yx(arguments);if(typeof Hb==ub.a){var
ka=this.getNode.apply(this,arguments);if(ka==null)return r.UNDEF;Hb=r.K0(ka);this.PR(Hb,arguments);}return Hb;};i.getNode=function(a){var
ab=this.dc;var
Ba=ub.b;for(var
bb=0;ab&&bb<arguments.length;bb++)Ba=Ba+(ub.c+arguments[bb]+ub.d);return ab.selectSingleNode(Ba);};i.PR=function(b,s){if(s.length==0){this.gq=b;}else{if(!this.gq)this.gq={_jsxa8:true};var
ia=this.gq;for(var
za=0;za<s.length-1;za++){var
Xa=s[za];if(ia[Xa]==null)ia[Xa]={_jsxa8:true};ia=ia[Xa];}ia[s[s.length-1]]=b;}};i.yx=function(h){var
Da=this.gq;for(var
Nb=0;Da&&Nb<h.length;Nb++)Da=Da[h[Nb]];return Da&&Da._jsxa8?r.UNDEF:Da;};i.z2=function(){delete this[ub.e];};r.HM={array:function(q){var
xb=q.selectNodeIterator(ub.f);var
T=[];while(xb.hasNext()){var
ea=xb.next();var
qa=r.HM[ea.getAttribute(ub.g)];T[T.length]=qa?qa(ea):ea.getValue();}return T;},map:function(e){var
gb=e.selectNodeIterator(ub.f);var
ha={};while(gb.hasNext()){var
Z=gb.next();var
Ga=r.HM[Z.getAttribute(ub.g)];ha[Z.getAttribute(ub.h)]=Ga?Ga(Z):Z.getValue();}return ha;},number:function(j){return Number(j.getValue());},"boolean":function(p){return p.getValue()===ub.i;},"null":function(s){return null;},string:function(a){return a.getValue();},eval:function(s){try{return jsx3.eval(s.getValue());}catch(Kb){return null;}}};r.K0=function(e){var
cb=e.getNodeName()==ub.j?ub.k:e.getAttribute(ub.g);var
Mb=r.HM[cb];return Mb?Mb(e):e.getValue();};i.set=function(p,o){var
ja=this.dc;for(var
Wa=0;Wa<arguments.length-2;Wa++){var
E=ja.selectSingleNode(ub.l+arguments[Wa]+ub.d);if(E&&E.getAttribute(ub.g)!=ub.k){ja.removeChild(E);E=null;}if(!E){E=ja.createNode(1,ub.m);E.setAttribute(ub.h,arguments[Wa]);E.setAttribute(ub.g,ub.k);ja.appendChild(E);}ja=E;}r.hK(ja,arguments[arguments.length-2],arguments[arguments.length-1]);this.z2();};i.remove=function(m){var
sb=null;var
H=this.dc;for(var
db=0;H&&db<arguments.length;db++){sb=H;H=H.selectSingleNode(ub.l+arguments[db]+ub.d);}if(H&&sb){sb.removeChild(H);this.z2();}};r.hK=function(c,a,k){var
ob=r.S7(a,c);ob.removeChildren();var
Pa=typeof k;if(k==null||Pa==ub.a){ob.setAttribute(ub.g,ub.n);ob.setValue(null);}else if(Pa==ub.o||Pa==ub.p){ob.setAttribute(ub.g,Pa);ob.setValue(k);}else if(Pa==ub.q){ob.setAttribute(ub.g,ub.q);ob.setValue(k?ub.i:ub.r);}else if(Pa==ub.s){if(jsx3.$A.is(k)){ob.setAttribute(ub.g,ub.t);for(var
M=0;M<k.length;M++)r.hK(ob,M.toString(),k[M]);}else{ob.setAttribute(ub.g,ub.k);for(var Db in k)r.hK(ob,Db,k[Db]);}}else if(Pa==ub.u){}else jsx3.ERROR.doLog(ub.v,ub.w+Pa,5);};r.S7=function(k,m){var
ma=m.selectSingleNode(ub.l+k+ub.d);if(!ma){ma=m.createNode(1,ub.m);ma.setAttribute(ub.h,k);m.appendChild(ma);}return ma;};});jsx3.Settings=jsx3.app.Settings;jsx3.Class.defineClass("jsx3.xml.Entity",null,null,function(m,a){var
ub={a:"xml.wrap_type",b:"",c:"xml.clone_tp",d:"xml.err_append",e:"xmlns:",f:":",g:"@",h:'="',i:'"',j:"xml.str_err",k:"xml.str_empty",l:"object",m:"<foo ",n:"/>",o:"text/xml",p:"jsx3.xml.Template",q:"transformToObject",r:"transform",s:"[",t:"]",u:"undefined",v:" ",w:"3.0.0"};m.TYPEELEMENT=1;m.TYPEATTRIBUTE=2;m.TYPETEXT=3;m.TYPECDATA=4;m.TYPECOMMENT=8;m.eD={1:true,2:true,3:true,4:true,7:true,8:true};a.init=function(p){this.bW=p;this.Nt=p.nodeType;if(!m.eD[this.Nt]){this.sh(300,jsx3._msg(ub.a,this.Nt));}else if(this._x)this.sh(0);};a.createNode=function(d,k,n){var
qb=this.Kt();var
C=null;if(n==null||n==ub.b)n=null;if(d==2){C=qb.createAttributeNS(n,k);}else if(d==3){C=qb.createTextNode(k);}else if(d==4){C=qb.createCDATASection(k);}else if(d==8){C=qb.createComment(k);}else C=qb.createElementNS(n,k);return new
m(C);};a.cloneNode=function(p){if(this.Nt==1){var
K=this.bW.cloneNode(p);return new
m(K);}else this.sh(301,jsx3._msg(ub.c,this.Nt));};a.appendChild=function(l){var
Ga=l.bW;var
ra=Ga.ownerDocument!=this.bW.ownerDocument;if(ra)Ga=this.bW.ownerDocument.importNode(Ga,true);if(this.bW!=null&&Ga!=null&&this.Nt==1){this.bW.appendChild(Ga);if(ra&&l.bW.parentNode)l.bW.parentNode.removeChild(l.bW);l.bW=Ga;}else this.sh(302,jsx3._msg(ub.d,l));return this;};a.insertBefore=function(q,f){if(f==null){if(this.Nt==1){this.appendChild(q);return q;}}else{var
Za=q.bW;var
yb=Za.ownerDocument!=this.bW.ownerDocument;if(yb)Za=this.bW.ownerDocument.importNode(Za,true);if(this.Nt==1&&f.Nt!=2&&q.Nt!=2)if(f.getParent()!=null&&(f.getParent()).equals(this)){var
rb=new
m(this.bW.insertBefore(Za,f.bW));if(yb&&q.bW.parentNode)q.bW.parentNode.removeChild(q.bW);q.bW=Za;return rb;}return null;}};a.replaceNode=function(n,g){var
X=n.bW;var
Lb=X.ownerDocument!=this.bW.ownerDocument;if(Lb)X=this.bW.ownerDocument.importNode(X,true);if(this.Nt==1&&g.Nt==1&&n.Nt==1)if(g.getParent()!=null&&(g.getParent()).equals(this)&&g.getParent()!=null&&(g.getParent()).equals(this)){var
wa=new
m(this.bW.replaceChild(X,g.bW));if(Lb&&n.bW.parentNode)n.bW.parentNode.removeChild(n.bW);n.bW=X;return wa;}return null;};a.setAttribute=function(b,d){if(d!=null)this.bW.setAttribute(b,String(d));else this.removeAttribute(b);return this;};a.getAttribute=function(f){return this.bW?this.bW.getAttribute(f):null;};a.getAttributeNode=function(g){if(this.bW!=null&&this.Nt==1){var
I=this.bW.getAttributeNode(g);if(I!=null)return new
m(I);}};a.setAttributeNode=function(o){var
Ua=o.bW;if(!jsx3.util.strEmpty(o.getPrefix()))this.setAttribute(ub.e+o.getPrefix(),o.getNamespaceURI());var
K=Ua.ownerDocument!=this.bW.ownerDocument;if(K){Ua=this.bW.ownerDocument.createAttribute(Ua.nodeName);Ua.nodeValue=o.bW.nodeValue;o.bW=Ua;}this.bW.setAttributeNodeNS(Ua);return this;};a.getAttributes=function(){if(this.bW!=null&&this.Nt==1)return new
m.List(this.bW.attributes);else return null;};a.getAttributeNames=function(){var
Ca=this.bW.attributes;var
O=new
Array(Ca.length);for(var
ga=0;ga<O.length;ga++)O[ga]=Ca[ga].nodeName;return O;};a.getRootNode=function(){return this.bW?new
m(this.Kt(1)):null;};a.getParent=function(){return this.bW!=this.Kt(1)?new
m(this.bW.parentNode):null;};a.getChildIterator=function(i){return new
m.ChildIterator(this.bW?this.bW.childNodes:[],i);};a.getChildNodes=function(l){if(!this.bW)return new
m.List([]);var
J=this.bW.childNodes;var
ga=[];for(var
I=0;I<J.length;I++){var
hb=J[I];if(hb.nodeType==1||l&&(hb.nodeType==3||hb.nodeType==4))ga[ga.length]=hb;}return new
m.List(ga);};a.removeChild=function(q){var
Da=q.getParent();return Da!=null&&Da.equals(this)?new
m(this.bW.removeChild(q.bW)):null;};a.removeChildren=function(){var
zb=this.bW.childNodes;for(var
K=zb.length-1;K>=0;K--)this.bW.removeChild(zb[K]);};a.removeAttribute=function(q){if(this.Nt==1)this.bW.removeAttribute(q);};a.removeAttributeNode=function(g){this.bW.removeAttributeNode(g.bW);return this;};a.equals=function(b){return b.bW==this.bW;};a.getNodeType=function(){return this.Nt;};a.getNodeName=function(){return this.bW.nodeName;};a.getNamespaceURI=function(){var
t=this.bW.namespaceURI;if(t==null)t=ub.b;return t;};a.selectSingleNode=function(l,s){if(!this.bW)return null;return this.jl(l,s,0);};a.selectNodes=function(s,l){if(!this.bW)return new
m.List([]);return this.jl(s,l,1);};a.selectNodeIterator=function(o,p){if(!this.bW)return new
m.SelectIterator();return this.jl(o,p,2);};a.getBaseName=function(){var
ia=this.getNodeName();var
tb=ia.indexOf(ub.f);return tb>=0?ia.substring(tb+1):ia;};a.getPrefix=function(){var
za=this.getNodeName();var
bb=za.indexOf(ub.f);return bb>=0?za.substring(0,bb):ub.b;};a.getXML=function(){return this.toString();};a.toString=function(){var
Ra=ub.g+(this.getClass()).getName();if(this.bW!=null&&!this.hasError()){if(this.getNodeType()==2){return this.getNodeName()+ub.h+this.getValue()+ub.i;}else return (new
XMLSerializer()).serializeToString(this.bW);}else return this.hasError()?jsx3._msg(ub.j,Ra,this.getError()):jsx3._msg(ub.k,Ra);};a.getValue=function(){if(this.Nt==1){var
v=new
Array(this.bW.childNodes.length);for(var
fa=0;fa<this.bW.childNodes.length;fa++){var
pb=this.bW.childNodes[fa];if(pb.nodeType==3||pb.nodeType==4)v[fa]=pb.nodeValue;else v[fa]=pb.textContent;}return v.join(ub.b);}else return this.bW.nodeValue;};a.setValue=function(d){if(d==null)d=ub.b;if(this.Nt==1){this.removeChildren();this.appendChild(this.createNode(3,d));}else this.bW.nodeValue=d;return this;};m.b1=new
XPathEvaluator();m.LH=[XPathResult.FIRST_ORDERED_NODE_TYPE,XPathResult.ORDERED_NODE_ITERATOR_TYPE,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE];a.jl=function(p,o,e){if(typeof o==ub.l)o=jsx3.xml.Document.Bi(o);var
Ca=this.bW.ownerDocument;var
M=Ca.documentElement;var
bb=o?m.gs(o,M):m.C7(Ca)||m.b1.createNSResolver(M);var
sa=null;try{sa=m.b1.evaluate(p,this.bW,bb,m.LH[e],null);}catch(Kb){}if(e==1){var
nb=null;var
gb=[];if(sa)while(nb=sa.iterateNext())gb[gb.length]=nb;return new
m.List(gb);}else if(e==2){return new
m.SelectIterator(sa);}else return sa&&sa.singleNodeValue?new
m(sa.singleNodeValue):null;};m.C7=function(g){if(!g._jsxoi)if(g._jsxdf)g._jsxoi=m.gs(g._jsxdf);return g._jsxoi;};m.z1={};m.gs=function(q){var
wb=m.z1[q];if(!wb){var
Ia=(new
DOMParser()).parseFromString(ub.m+q+ub.n,ub.o);wb=m.z1[q]=m.b1.createNSResolver(Ia.documentElement);}return wb;};a.Kt=function(e){if(e==null){return this.bW.ownerDocument;}else if(e==1){var
C=this.bW.ownerDocument;return C!=null?C.documentElement:null;}else if(e==2)return this.bW.documentElement;};a.getNative=function(){return this.bW;};a.getFirstChild=function(){if(this.Nt==1){var
fa=this.bW.firstChild;while(fa!=null&&fa.nodeType!=1)fa=fa.nextSibling;if(fa!=null)return new
m(fa);}return null;};a.getLastChild=function(){if(this.Nt==1){var
L=this.bW.lastChild;while(L!=null&&L.nodeType!=1)L=L.previousSibling;if(L!=null)return new
m(L);}return null;};a.getPreviousSibling=function(){if(this.Nt==1){var
O=this.bW.previousSibling;while(O!=null&&O.nodeType!=1)O=O.previousSibling;if(O!=null)return new
m(O);}return null;};a.getNextSibling=function(){if(this.Nt==1){var
J=this.bW.nextSibling;while(J!=null&&J.nodeType!=1)J=J.nextSibling;if(J!=null)return new
m(J);}return null;};a.transformNode=function(k,i,g){jsx3.require(ub.p);var
tb=new
jsx3.xml.Template(k);if(i)tb.setParams(i);return tb[g?ub.q:ub.r](this);};m.pF=function(){};m.pF.prototype.toString=function(){return ub.s+this.code+ub.t+(typeof this.description!=ub.u?ub.v+this.description:ub.b);};a.sh=function(i,c){if(this._x==null)this._x=new
m.pF();this._x.code=i;this._x.description=c;};a.getError=function(){if(!this._x)this.sh(0);return this._x;};a.hasError=function(){return this._x!=null&&this._x.code!=0;};a.getOwnerDocument=function(){return this.bW?new
jsx3.xml.Document(this.Kt()):null;};m.getVersion=function(){return ub.w;};});jsx3.Entity=jsx3.xml.Entity;jsx3.Class.defineClass("jsx3.xml.Entity.List",jsx3.util.List,null,function(k,q){var
ub={a:"Not implemented",b:"[",c:"]"};var
nb=jsx3.Exception;q.init=function(r){this.jsxsuper(null,true);this.UL=r;};q.get=function(b){var
_a=this.UL[b];return _a!=null?new
jsx3.xml.Entity(_a):_a;};var
ab=ub.a;q.add=function(){throw new
nb(ab);};q.addAll=function(){throw new
nb(ab);};q.set=function(){throw new
nb(ab);};q.remove=function(){throw new
nb(ab);};q.removeAt=function(){throw new
nb(ab);};q.sort=function(){throw new
nb(ab);};q.slice=function(a,h){return new
k(arguments.length>1?this.UL.slice(a,h):this.UL.slice(a));};q.toString=function(){return ub.b+this.toArray()+ub.c;};q.clone=function(){return new
k(this.UL.concat());};q.toArray=function(){var
ua=this.size();var
W=new
Array(ua);for(var
pa=0;pa<ua;pa++)W[pa]=this.get(pa);return W;};});jsx3.Class.defineClass("jsx3.xml.Entity.ChildIterator",null,[jsx3.util.Iterator],function(e,i){i.init=function(q,k){this.zL=q;this.de=0;this.rt=k;this.vW();this.bW=null;};i.next=function(){if(!this._next)return null;if(this.bW){this.bW.init(this._next);}else this.bW=new
jsx3.xml.Entity(this._next);this.vW();return this.bW;};i.hasNext=function(){return this._next!=null;};i.vW=function(){this._next=null;var
O=this.zL;var
hb=O.length;while(this._next==null&&this.de<hb){var
Cb=O[this.de];if(Cb.nodeType==1||this.rt&&(Cb.nodeType==3||Cb.nodeType==4))this._next=Cb;this.de++;}};});jsx3.Class.defineClass("jsx3.xml.Entity.SelectIterator",null,[jsx3.util.Iterator],function(i,m){m.init=function(g){this.BE=g;this.iQ=0;this.bW=null;};m.next=function(){var
y=this.BE.snapshotItem(this.iQ++);if(!y)return null;if(this.bW){this.bW.init(y);}else this.bW=new
jsx3.xml.Entity(y);return this.bW;};m.hasNext=function(){return this.BE&&this.iQ<this.BE.snapshotLength;};});jsx3.Collection=jsx3.xml.Entity.List;jsx3.util.Collection=jsx3.Collection;jsx3.Class.defineClass("jsx3.net.Request",null,[jsx3.util.EventDispatcher],function(g,f){var
ub={a:"response",b:"timeout",c:"req_inst",d:"_timeoutto",e:"req.bad_xml",f:"UniversalBrowserRead",g:"req.netsc",h:"req.open",i:"req.err_open",j:"req.err_state",k:"hS",l:"req.err_send",m:"load.async",n:"load.sync",o:" ",p:"3.00.00"};g.STATUS_OK=200;g.STATUS_ERROR=400;g.EVENT_ON_RESPONSE=ub.a;g.EVENT_ON_TIMEOUT=ub.b;g.uV={};f.init=function(d){if(d!=null)g.uV[d]=this;try{this._request=new
XMLHttpRequest();}catch(Kb){throw new
jsx3.Exception(jsx3._msg(ub.c),jsx3.NativeError.wrap(Kb));}};f.abort=function(){if(this._timeoutto){window.clearTimeout(this._timeoutto);delete this[ub.d];}this._request.onreadystatechange=new
Function();this._request.onerror=null;this._request.abort();return this;};f.getAllResponseHeaders=function(){return this._request.getAllResponseHeaders();};f.getResponseHeader=function(c){return this._request.getResponseHeader(c);};f.getStatusText=function(){return this._request.statusText;};f.getStatus=function(){var
va=this.hS!=null?this.hS:this._request.status;if(va<0||va==112||va>=600)va=400;return va==0?200:va;};f.getResponseText=function(){return this._request.responseText;};f.getResponseXML=function(){var
Ea=new
jsx3.xml.Document();Ea.Gk(this);if(!Ea.hasError()){return Ea;}else{g.gU(2,jsx3._msg(ub.e,this.q8,Ea.getError()));return null;}};f.getNative=function(){return this._request;};f.setRequestHeader=function(b,m){this._request.setRequestHeader(b,String(m));return this;};f.getReadyState=function(){return this._request.readyState;};g.open=function(s,q,m,n,i){var
ka=jsx3.net.URI.valueOf(q);var
Da=ka.getScheme();var
Ab=g._HANDLERS[Da]||g.jsxclass;return (Ab.newInstance()).open(s,ka,m,n,i);};g._HANDLERS={};g.addSchemeHandler=function(q,p){g._HANDLERS[q]=p;};g.getSchemeHandler=function(k){return g._HANDLERS[k];};f.open=function(l,j,a,b,p){this.hS=0;this.GS=Boolean(a);this.SS=l;this.q8=jsx3.net.URIResolver.DEFAULT.resolveURI(j);try{if(window.netscape&&netscape.security)netscape.security.PrivilegeManager.enablePrivilege(ub.f);}catch(Kb){g.gU(5,jsx3._msg(ub.g,jsx3.NativeError.wrap(Kb)));}try{g.gU(6,jsx3._msg(ub.h,this.q8));this._request.open(l,this.q8.toString(),this.GS,b,p);}catch(Kb){this.hS=400;g.gU(2,jsx3._msg(ub.i,j,jsx3.NativeError.wrap(Kb)));}return this;};g.cancelRequest=function(q){var
I=g.uV[q];if(I)I.abort();};g.getRequest=function(p){return g.uV[p];};f.getURL=function(){return this.q8&&this.q8.toString();};f.setTimeouts=function(o,j,e,m){return this;};f.send=function(a,p){if(this.hS==400)throw new
jsx3.Exception(jsx3._msg(ub.j));var
Za=new
jsx3.util.Timer(g.jsxclass,this.q8);var
qa=false;try{this._request.send(a);if(this.GS)this.hS=0;else delete this[ub.k];}catch(Kb){this.hS=400;g.gU(2,jsx3._msg(ub.l,this.q8,jsx3.NativeError.wrap(Kb)));qa=this;}if(this.GS){if(qa||this._request.readyState==4){jsx3.sleep(function(){Za.log(ub.m);this.publish({subject:ub.a});},null,this);}else{var
sa=this;this._request.onreadystatechange=function(){if(sa._request.readyState==4){Za.log(ub.m);sa.rp();}};this._request.onerror=(jsx3.$F(this.n6)).bind(this);if(!isNaN(p)&&p>0)this._timeoutto=window.setTimeout(function(){Za.log(ub.b);sa.Ar();},p);}}else Za.log(ub.n);return this;};f.Ar=function(){delete this[ub.d];this.abort();this.hS=408;this.publish({subject:ub.b});};f.rp=function(){delete this[ub.k];if(this._timeoutto){window.clearTimeout(this._timeoutto);delete this[ub.d];}this._request.onreadystatechange=new
Function();this._request.onerror=null;this.publish({subject:ub.a});};f.n6=function(){try{this.hS=this._request.status;}catch(Kb){this.hS=400;this._request={};}this.publish({subject:ub.a});};f.toString=function(){return this.jsxsuper()+ub.o+this.SS+ub.o+this.getStatus()+ub.o+this.q8;};g.gU=function(o,a){if(g.aM==null)if(jsx3.util.Logger){g.aM=jsx3.util.Logger.getLogger(g.jsxclass.getName());if(g.aM==null)return;}else return;g.aM.log(o,a);};g.getVersion=function(){return ub.p;};});jsx3.HttpRequest=jsx3.net.Request;jsx3.Class.defineClass("jsx3.xml.Document",jsx3.xml.Entity,[jsx3.util.EventDispatcher],function(e,m){var
ub={A:/[\n\r]/g,B:" ",C:"xml.unknown",D:"1.0",E:"<?xml",F:' version="',G:'"',H:' encoding="',I:' standalone="',J:"yes",K:"no",L:"?>\n",M:"xml",N:"<!-- ",O:" -->",P:"\n",Q:"XPath",R:"xmlns:",S:"='",T:"'",U:"object",V:"([^=]*)=['\"]([^\"^']*)['\"]",W:"g",X:":",Y:"http://www.w3.org/XML/1998/namespace",Z:"undefined",_:"jsx",a:"response",aa:"attribute::* | child::*",b:"error",ba:"3.0.0",c:"timeout",d:"http://xsd.tns.tibco.com/gi/cxf/2006",e:"jsx_xmlns",f:/xmlns:([^=]*)=['\"]([^\"^']*)['\"]/g,g:"",h:"xml.parser",i:"MV",j:"GET",k:"*",l:"Y1",m:"content-type",n:/xml|xsl/i,o:"xml.doc_status",p:"xml.timeout",q:"text/xml",r:"parse",s:"0",t:"xml.err_fmt",u:"xml.doc_bad_ex",v:"xml.doc_bad",w:'<x xmlns:x="http://www.w3.org/1999/xhtml"/>',x:"x",y:"http://www.w3.org/1999/xhtml",z:"//x:parsererror//x:div"};var
Ma=jsx3.xml.Entity;e.ON_RESPONSE=ub.a;e.ON_ERROR=ub.b;e.ON_TIMEOUT=ub.c;e.SEARCHABLE_NAMESPACE=ub.d;e.SEARCHABLE_PREFIX=ub.e;e.DU=ub.f;m.init=function(n){var
C=n instanceof Ma;if(!n||C){try{this.MV=window.document.implementation.createDocument(ub.g,ub.g,null);}catch(Kb){this.sh(101,jsx3._msg(ub.h,jsx3.NativeError.wrap(Kb)));delete this[ub.i];}if(n){this.MV.appendChild((n.getNative()).cloneNode(true));this.jsxsuper(this.MV.documentElement);}}else{this.MV=n;this.jsxsuper(n.documentElement);}};m.load=function(r,f){var
nb=jsx3.net;var
xa=nb.Request;this.q8=r.toString();this.sh(0);var
Mb=Boolean(this.getAsync());var
E=xa.open(ub.j,r,Mb);if(E.getStatus()!=400){if(Mb)E.subscribe(ub.k,this,ub.l);E.send(null,f);}else if(Mb)jsx3.sleep(function(){this.Gk(E);},null,this);if(!Mb)this.Gk(E);return this;};m.Gk=function(h){var
rb=this.q8;this.UQ(h);this.q8=rb;if(this.hasError())this.publish({subject:ub.b});else this.publish({subject:ub.a});};m.UQ=function(h){var
ob=h.getStatus();var
da=ob>=200&&ob<400;var
ja=ub.g;if(!da)try{ja=h.getResponseHeader(ub.m);}catch(Kb){}if(da||jsx3.util.strEmpty(ja)||ub.n.test(ja)){this.loadXML(h.getResponseText());}else this.sh(102,jsx3._msg(ub.o,this.q8,ob));};m.Y1=function(b){var
oa=jsx3.net.Request;var
kb=b.target;var
hb=b.subject;kb.unsubscribe(ub.k,this,ub.l);if(hb==ub.a){this.Gk(kb);}else if(hb==ub.c){this.sh(111,jsx3._msg(ub.p));this.publish({subject:ub.c});}else e.gU();};m.NY=function(d){Ma.prototype.init.call(this,d);};m.loadXML=function(l){this.q8=null;this.sh(0);try{var
ta=new
jsx3.util.Timer(e.jsxclass,l!=null?jsx3.util.strTruncate(l,30):ub.g,5);this.MV=(new
DOMParser()).parseFromString(l,ub.q);if(!this.B5(this.MV))this.NY(this.MV.documentElement);ta.log(ub.r);}catch(Kb){this.B5(this.MV,jsx3.NativeError.wrap(Kb));}return this;};m.getSourceURL=function(){return this.q8;};m.B5=function(h,o){if(h!=null){var
Mb=h.parseError;if(Mb!=null&&Mb.errorCode!=ub.s){var
Gb=jsx3._msg(ub.t,Mb.errorCode,Mb.line,Mb.linepos,jsx3.util.strTrim(String(Mb.reason)),jsx3.util.strTruncate(Mb.srcText),Mb.url);this.sh(Mb.errorCode,Gb);return true;}var
w=h.documentElement;if(w==null){if(o)this.sh(156,jsx3._msg(ub.u,o));else this.sh(106,jsx3._msg(ub.v));return true;}else{var
wb=new
XPathEvaluator();var
pb=jsx3.CLASS_LOADER.GOG?wb.createNSResolver((new
DOMParser()).parseFromString(ub.w,ub.q)):(function(j){if(j==ub.x)return ub.y;return null;});var
Oa=wb.evaluate(ub.z,h,pb);var
A=Oa.iterateNext();if(A){this.sh(107,A.textContent.replace(ub.A,ub.B));return true;}}}if(o!=null){this.sh(110,jsx3._msg(ub.C,jsx3.NativeError.wrap(o)));return true;}return false;};m.getValidateOnParse=function(){return this.MV.validateOnParse;};m.setValidateOnParse=function(f){this.MV.validateOnParse=f;};m.getResolveExternals=function(){return this.MV.resolveExternals;};m.setResolveExternals=function(r){this.MV.resolveExternals=r;};m.cloneDocument=function(){var
v=new
e();v.loadXML(this.getXML());return v;};m.toString=function(){if(this.MV!=null&&!this.hasError()){return (new
XMLSerializer()).serializeToString(this.MV);}else return this.jsxsuper();};m.getXmlVersion=function(){return this.MV.xmlVersion;};m.getXmlEncoding=function(){return this.MV.xmlEncoding;};m.getXmlStandalone=function(){return this.MV.xmlStandalone;};m.serialize=function(r,p,c){if(r===true)r=this.getXmlVersion()||ub.D;if(p===true)p=this.getXmlEncoding();var
va=r||p||c;if(va){var
Da=ub.E;if(r)Da=Da+(ub.F+r+ub.G);if(p)Da=Da+(ub.H+p+ub.G);if(c!=null)Da=Da+(ub.I+(c?ub.J:ub.K)+ub.G);Da=Da+ub.L;var
z=new
Array(this.MV.childNodes.length+1);z[0]=Da;for(var
qb=0;qb<this.MV.childNodes.length;qb++){var
_=this.MV.childNodes[qb];if(_.nodeType!=7||_.nodeName!=ub.M){var
ta=new
Ma(_);z[qb+1]=ta.hasError()?ub.N+ta+ub.O:ta.toString();}}}else{var
z=new
Array(this.MV.childNodes.length);for(var
qb=0;qb<this.MV.childNodes.length;qb++){var
_=this.MV.childNodes[qb];var
ta=new
Ma(_);z[qb]=ta.hasError()?ub.N+ta+ub.O:ta.toString();if(_.nodeType==7||_.nodeName==ub.M)z[qb]+=ub.P;}}return z.join(ub.g);};m.createDocumentElement=function(s,h){if(h==null)h=null;var
Ra=this.MV.createElementNS(h,s);if(this.MV.documentElement!=null)this.MV.replaceChild(Ra,this.MV.documentElement);else this.MV.appendChild(Ra);this.NY(this.MV.documentElement);return new
jsx3.xml.Entity(Ra);};m.createProcessingInstruction=function(n,q){var
kb=this.MV.createProcessingInstruction(n,q);this.MV.appendChild(kb);};m.setAsync=function(h){this._jsxPD=h;return this;};m.getAsync=function(b){return Boolean(this._jsxPD);};m.setSelectionLanguage=function(k){return this;};m.getSelectionLanguage=function(){return ub.Q;};e.Bi=function(n){var
Ca=[];for(var M in n)Ca[Ca.length]=ub.R+n[M]+ub.S+M+ub.T;return Ca.join(ub.B);};m.setSelectionNamespaces=function(b){if(typeof b==ub.U)b=e.Bi(b);this.MV._jsxdf=b;this.MV._jsxoi=null;return this;};m.getSelectionNamespaces=function(b){return this.MV._jsxdf?this.MV._jsxdf:ub.g;};m.createNamespaceAxis=function(){var
mb=this.getRootNode();var
Wa=mb.toString();var
P=ub.g;do{var
ma=new
RegExp(ub.R+ub.e+P+ub.V,ub.W);var
L=Wa.search(ma);if(L>=0)P=P==ub.g?0:P+1;}while(L>=0);this.QL(mb,ub.e+P);this.loadXML(this.getXML());return ub.e+P;};m.QL=function(l,g){var
Wa=(l.cloneNode(false)).getXML();var
X;while(X=e.DU.exec(Wa))if(RegExp.$1!=g&&RegExp.$1!=ub.M){var
xa=l.createNode(2,g+ub.X+RegExp.$1,e.SEARCHABLE_NAMESPACE);xa.setValue(RegExp.$2);l.setAttributeNode(xa);}else if(RegExp.$1==ub.M)jsx3.log(Wa);for(var
Ta=l.getChildIterator();Ta.hasNext();)this.QL(Ta.next(),g);};m.getDeclaredNamespaces=function(a){this._jsxxG={};var
v=this.getRootNode();if(v)this.pI(v,{index:0},a);return this._jsxxG;};m.pI=function(h,d,l){var
Sa=h.getNamespaceURI();if(Sa!=ub.g&&Sa!=ub.Y){var
ra;if(!this._jsxxG[Sa]||l&&(ra=h.getPrefix())!=ub.g&&typeof l[ra]!=ub.Z)if(ra){this._jsxxG[Sa]=ra;}else{d.index+=1;this._jsxxG[Sa]=ub._+d.index;}}if(h.getNodeType()==1)for(var
Bb=h.selectNodeIterator(ub.aa);Bb.hasNext();){var
eb=Bb.next();if(eb.getNodeType()==1||eb.getNodeType()==2)this.pI(eb,d,l);}};m.getNativeDocument=function(){return this.MV;};e.gU=function(f,j){if(e.aM==null)if(jsx3.util.Logger){e.aM=jsx3.util.Logger.getLogger(e.jsxclass.getName());if(e.aM==null)return;}else return;e.aM.log(f,j);};e.getVersion=function(){return ub.ba;};});jsx3.Document=jsx3.xml.Document;jsx3.Class.defineClass("jsx3.xml.Template",null,null,function(p,s){var
ub={a:"temp.init_err",b:"stylesheet",c:"temp.nat_err",d:"temp.root_elm",e:"",f:" => ",g:"temp.empty",h:"transform",i:"temp.temp_err",j:"temp.doc_err",k:"temp.err"};p.DISABLE_OUTPUT_ESCAPING=1;p.s6={};p.supports=function(n){return p.s6[n]||Boolean(0);};s.init=function(e){if(e.hasError())throw new
jsx3.Exception(jsx3._msg(ub.a,e.getError()));if(e.getBaseName()==ub.b){try{this.FY=new
XSLTProcessor();this.FY.importStylesheet(e.getNativeDocument());}catch(Kb){this.sh(202,jsx3._msg(ub.c,jsx3.NativeError.wrap(Kb)));}}else this.sh(201,jsx3._msg(ub.d));this._src=e.getSourceURL();};s.setParam=function(j,n){if(!this.cQ)this.cQ=new
jsx3.util.List();if(this.cQ.indexOf(j)<0)this.cQ.add(j);this.FY.setParameter(ub.e,j,n!=null?n.toString():ub.e);};s.iK=function(h,d){var
lb=new
jsx3.util.Timer(p.jsxclass,(h instanceof jsx3.xml.Document?h.getSourceURL():ub.e)+ub.f+this);var
H=h instanceof jsx3.xml.Document?h.getNativeDocument():h.getNative();var
ia=this.FY.transformToDocument(H);var
zb=null;if(ia&&ia.documentElement){zb=d?new
jsx3.xml.Document(ia):(new
XMLSerializer()).serializeToString(ia);}else this.sh(203,jsx3._msg(ub.g));lb.log(ub.h);return zb;};s.reset=function(){if(this.cQ){for(var
rb=this.cQ.iterator();rb.hasNext();)this.FY.removeParameter(ub.e,rb.next());this.cQ.clear();}};s.setParams=function(e){for(var va in e)this.setParam(va,e[va]);};s.transform=function(c,i){if(this.hasError())throw new
jsx3.Exception(jsx3._msg(ub.i,this.getError()));if(c.hasError())throw new
jsx3.Exception(jsx3._msg(ub.j,c.getError()));try{return this.iK(c,i);}catch(Kb){this.sh(204,jsx3._msg(ub.k,jsx3.NativeError.wrap(Kb)));return null;}};s.transformToObject=function(r){return this.transform(r,true);};s.toString=function(){return this._src;};});jsx3.xml.Entity.jsxclass.mixin(jsx3.xml.Template.prototype,true,["getError","hasError","sh"]);jsx3.Class.defineClass("jsx3.xml.XslDocument",jsx3.xml.Document,null,function(f,s){var
ub={a:"temp.parse",b:"_M"};s.setParam=function(o,q){(this.KO()).setParam(o,q);};s.setParams=function(b){(this.KO()).setParams(b);};s.reset=function(){if(this._M)this._M.reset();};s.transform=function(d){return (this.KO()).transform(d);};s.transformToObject=function(p){return (this.KO()).transformToObject(p);};s.KO=function(){if(this._M==null){this._M=new
jsx3.xml.Template(this);if(this._M.hasError())throw new
jsx3.Exception(jsx3._msg(ub.a,this.getSourceURL(),this._M.getError()));}return this._M;};s.load=function(p){delete this[ub.b];return this.jsxsuper(p);};s.loadXML=function(q){delete this[ub.b];return this.jsxsuper(q);};s.hasError=function(){return this.jsxsuper()||this._M!=null&&this._M.hasError();};s.getError=function(){var
ka=null;if(this._M)ka=this._M.getError();if(!ka)ka=this.jsxsuper();return ka;};f.wrap=function(c){return new
f(c.getNativeDocument());};s.cloneDocument=function(){return f.wrap(this.jsxsuper());};s.isMutable=function(){return true;};});jsx3.Class.defineClass("jsx3.xml.Processor",null,null,function(h,d){var
B=jsx3.xml.Template;h.DISABLE_OUTPUT_ESCAPING=1;h.supports=function(r){return B.supports(r);};d.init=function(s,g,n){this.ur=s;this.n4=g;this.cQ=n;};d.setXML=function(p){this.ur=p;return this;};d.setXSL=function(s){this.n4=s;return this;};d.setParams=function(e){this.cQ=e;return this;};d.transformToObject=function(){return this.transform(true);};d.transform=function(q){var
ca=new
B(this.n4);if(!ca.hasError()){if(this.cQ)ca.setParams(this.cQ);var
L=ca.transform(this.ur,q);if(!ca.hasError())return L;}var
qa=ca.getError();this.sh(qa.code,qa.description);return null;};});jsx3.xml.Entity.jsxclass.mixin(jsx3.xml.Processor.prototype,true,["getError","hasError","sh"]);jsx3.Class.defineClass("jsx3.util.Logger",null,null,function(h,m){var
ub={a:"FATAL",b:"ERROR",c:"WARN",d:"INFO",e:"DEBUG",f:"TRACE",g:"",h:"logr.err_hand",i:" ",j:"(",k:") ",l:":",m:"ERRO01",n:"TIME: ",o:"\n",p:"CODE: ",q:"DESC: "};var
qa=jsx3.Method;var
Ua=jsx3.Exception;h.OFF=0;h.FATAL=1;h.ERROR=2;h.WARN=3;h.INFO=4;h.DEBUG=5;h.TRACE=6;h.qR=1;h.d0=6;h.GLOBAL=null;h.getLogger=function(n){var
Jb=h.Manager.getManager();if(Jb==null)return null;var
fb=Jb.getLogger(n);if(fb==null){fb=new
h(n);Jb.addLogger(fb);}return fb;};h.GZ=[null,ub.a,ub.b,ub.c,ub.d,ub.e,ub.f];h.levelAsString=function(r){return h.GZ[r]||ub.g;};m.c7=null;m.XJ=null;m.y5=null;m.D5=4;m.dC=null;m.fz=true;m._P=null;m.init=function(k){this.c7=k;};m.getName=function(){return this.c7;};m.addHandler=function(n){if(!this.XJ)this.XJ=jsx3.$A();this.XJ.push(n);};m.removeHandler=function(i){if(this.XJ)this.XJ.remove(i);};m.getLevel=function(){return this.y5;};m.getEffectiveLevel=function(){return this.D5;};m.setLevel=function(q){q=Math.max(0,Math.min(h.d0,q));this.y5=q;this.CD();};m.CD=function(){var
pa=null;if(this.y5!=null){pa=this.y5;}else if(this.dC!=null){pa=this.dC.D5;}else pa=m.D5;if(pa!=this.D5){this.D5=pa;if(this._P)for(var
db=0;db<this._P.length;db++)this._P[db].CD();}};m.getParent=function(){return this.dC;};m.setParent=function(j){if(this.dC!=null)this.dC._P.remove(this);this.dC=j;if(this.dC!=null){if(!this.dC._P)this.dC._P=jsx3.$A();this.dC._P.push(this);}this.CD();};m.getUseParentHandlers=function(){return this.fz;};m.setUseParentHandlers=function(j){this.fz=j;};m.yG=function(g){var
hb=this;var
Jb=g.getLevel();while(hb){var
Nb=hb.XJ;if(Nb)for(var
mb=0;mb<Nb.length;mb++){var
K=Nb[mb];if(K.isLoggable(Jb))try{K.handle(g);}catch(Kb){Kb=jsx3.NativeError.wrap(Kb);(h.getLogger(h.jsxclass.getName())).error(jsx3._msg(ub.h,K.getName(),Kb),Kb);}}if(!hb.getUseParentHandlers())break;hb=hb.getParent();}};m.log=function(b,n,j){b=Math.max(b,h.qR);if(this.D5<b)return;var
ia=jsx3.$A.is(j)?j:qa.argsAsArray(arguments,2);var
jb=new
h.Record(n,ia,b,this.getName(),jsx3.lang.getCaller(1),null);this.yG(jb);};m.logError=function(a,o,g){a=Math.max(a,h.qR);if(this.D5<a)return;var
ga=new
h.Record(o,null,a,this.getName(),jsx3.lang.getCaller(1),g);this.yG(ga);};m.logStack=function(s,p,k){s=Math.max(s,h.qR);if(this.D5<s)return;var
T=new
h.Record(p,null,s,this.getName(),jsx3.lang.getStack(k!=null?k:0),null);this.yG(T);};m.isLoggable=function(f){f=Math.max(f,h.qR);return this.D5>=f;};m.fatal=function(j,n){if(n==null||jsx3.$A.is(n))this.log(1,j,n);else if(n instanceof Ua)this.logError(1,j,n);else if(this.D5>=1)this.log(1,j,qa.argsAsArray(arguments,1));};m.error=function(n,j){if(j==null||jsx3.$A.is(j))this.log(2,n,j);else if(j instanceof Ua)this.logError(2,n,j);else if(this.D5>=2)this.log(2,n,qa.argsAsArray(arguments,1));};m.warn=function(p,b){if(b==null||jsx3.$A.is(b))this.log(3,p,b);else if(b instanceof Ua)this.logError(3,p,b);else if(this.D5>=3)this.log(3,p,qa.argsAsArray(arguments,1));};m.info=function(l,g){if(g==null||jsx3.$A.is(g))this.log(4,l,g);else if(g instanceof Ua)this.logError(4,l,g);else if(this.D5>=4)this.log(4,l,qa.argsAsArray(arguments,1));};m.debug=function(d,a){if(a==null||jsx3.$A.is(a))this.log(5,d,a);else if(a instanceof Ua)this.logError(5,d,a);else if(this.D5>=5)this.log(5,d,qa.argsAsArray(arguments,1));};m.trace=function(e,s){if(s==null||jsx3.$A.is(s))this.log(6,e,s);else if(s instanceof Ua)this.logError(6,e,s);else if(this.D5>=6)this.log(6,e,qa.argsAsArray(arguments,1));};m.toString=function(){return this.jsxsuper()+ub.i+this.getName();};h.reset=function(){};h.doLog=function(l,p,e,f){if(e==null)e=4;else if(e<4)e=4;else e=5;if(h.GLOBAL){var
Pa=p!=null?ub.j+l+ub.k+p:l;if(f||f==null)h.GLOBAL.logStack(e,Pa,1);else h.GLOBAL.log(e,Pa);}};h.logError=function(g,i){var
oa=ub.g;for(var fa in g){if(oa)oa=oa+ub.i;oa=oa+(fa+ub.l+g[fa]);}h.doLog(ub.m,oa,i,false);};h.getMinPriority=function(){return 3;};h.getLog=function(){return [];};h.errorToString=function(e){var
nb=ub.g;nb=nb+(ub.n+new
Date(e.timestamp)+ub.o);nb=nb+(ub.p+e.code+ub.o);nb=nb+(ub.q+e.description+ub.o);return nb;};h.toString=function(){return ub.g;};});jsx3.Class.defineClass("jsx3.util.Logger.Manager",null,null,function(o,l){var
ub={A:"logr.bn_setr",B:"/configuration/logger[@name='",C:"useParent",D:"false",E:"./handler-ref",F:"logr.no_hand",G:".",a:"jsx:/../logger.xml",b:"global",c:"jsx_logger_config",d:"logr.err_conf",e:"<configuration/>",f:"[@lazy='true' and @class='",g:"']",h:"/configuration/logger[handler-ref/@name='",i:"name",j:"/configuration/handler",k:"",l:"class",m:"lazy",n:"true",o:"require",p:"level",q:"number",r:"logr.no_class",s:"logger.require",t:"jsx.js",u:"zs",v:"[@require='true']",w:"./property",x:"value",y:"eval",z:"logr.bn_eval"};var
rb=jsx3.Exception;var
Jb=jsx3.util.Logger;o._N=ub.a;o.TX=ub.b;o.P7=null;o.qp=-1;l.initialize=function(j){if(!j){j=new
jsx3.xml.Document();j.load(jsx3.getEnv(ub.c)||o._N);}if(j.hasError()){window.alert(jsx3._msg(ub.d,j.getError(),jsx3.resolveURI(j.getSourceURL())));j.loadXML(ub.e);}this.Rr=j;this.Es();for(var w in this.Nx)this.addLogger(this.Nx[w]);};o.getManager=function(){if(o.P7==null){o.P7=new
o();Jb.GLOBAL=new
Jb(o.TX);o.P7.addLogger(Jb.GLOBAL);}return o.P7;};l.Rr=null;l.Nx=null;l.XJ=null;l.init=function(s){this.Nx={};this.XJ={};};l.FP=function(n){var
R=this.Es(ub.f+n.getName()+ub.g);this.mY(R);};l.mY=function(a){for(var
oa=0;oa<a.length;oa++){var
Eb=a[oa];var
Q=this.getHandler(Eb);var
R=this.Rr.selectNodeIterator(ub.h+Eb+ub.g);while(R.hasNext()){var
Fb=R.next();var
Hb=Fb.getAttribute(ub.i);var
Ha=this.getLogger(Hb);if(Ha!=null)Ha.addHandler(Q);}}};l.Es=function(j){var
fb=[];if(!this.Rr)return fb;var
R=this.Rr.selectNodeIterator(ub.j+(j!=null?j:ub.k));var
Sa=this.zs==null;while(R.hasNext()){var
Ja=R.next();var
Ha=Ja.getAttribute(ub.i);if(this.getHandler(Ha)!=null)continue;var
Mb=Ja.getAttribute(ub.l);var
P=Ja.getAttribute(ub.m)==ub.n;var
D=Ja.getAttribute(ub.o)==ub.n;var
Ia=jsx3.Class.forName(Mb);if(Ia==null&&D){if(this.zs==null)this.zs=[];this.zs.push(Mb);this.XJ[Ha]=o.qp;continue;}if(Ia){var
Fb=Ia.newInstance(Ha);this.tt(Fb,Ja);Fb.onAfterInit();var
gb=Ja.getAttribute(ub.p);if(gb&&typeof Jb[gb]==ub.q)Fb.setLevel(Jb[gb]);this.addHandler(Fb);fb[fb.length]=Ha;}else if(!P&&!D){window.alert(jsx3._msg(ub.r,Mb));}else this.XJ[Ha]=o.qp;}if(Sa&&this.zs!=null){var
Ca=this;var
za=new
jsx3.util.Job(ub.s);za.run=function(){jsx3.sleep(function(){this.o2();},null,Ca);};jsx3.CLASS_LOADER.addJob(za,ub.t);}return fb;};l.o2=function(j){for(var
ja=0;ja<this.zs.length;ja++)jsx3.require(this.zs[ja]);delete this[ub.u];var
w=this.Es(ub.v);this.mY(w);};l.tt=function(p,f){var
Ka=p.getClass();for(var
ab=f.selectNodeIterator(ub.w);ab.hasNext();){var
Za=ab.next();var
ya=Za.getAttribute(ub.i);var
zb=Za.getAttribute(ub.x);var
Hb=Za.getAttribute(ub.y)==ub.n;var
y=Ka.getSetter(ya);if(y!=null){if(Hb)try{zb=isNaN(zb)?p.eval(zb):Number(zb);}catch(Kb){throw new
rb(jsx3._msg(ub.z,ya,zb,p),jsx3.NativeError.wrap(Kb));}y.apply(p,[zb]);}else throw new
rb(jsx3._msg(ub.A,ya,Ka));}};l.addLogger=function(n){var
Ea=n.getName();this.Nx[Ea]=n;if(this.Rr){var
wa=this.Rr.selectSingleNode(ub.B+Ea+ub.g);if(wa!=null){var
db=wa.getAttribute(ub.p);if(db&&typeof Jb[db]==ub.q)n.setLevel(Jb[db]);var
aa=wa.getAttribute(ub.C)!=ub.D;n.setUseParentHandlers(aa);var
N=wa.selectNodeIterator(ub.E);while(N.hasNext()){var
La=N.next();var
Z=La.getAttribute(ub.i);var
ab=this.getHandler(Z);if(ab!=null){n.addHandler(ab);}else if(this.XJ[Z]!=o.qp)throw new
rb(jsx3._msg(ub.F,Ea,Z));}this.tt(n,wa);}}if(Ea!=o.TX){var
qb=Ea.lastIndexOf(ub.G);var
A=qb>=0?Ea.substring(0,qb):o.TX;n.setParent(Jb.getLogger(A));}};l.addHandler=function(n){this.XJ[n.getName()]=n;};l.getLogger=function(m){return this.Nx[m];};l.getHandler=function(a){var
Ca=this.XJ[a];return Ca==o.qp?null:Ca;};l.getHandlerNames=function(){var
Oa=[];for(var v in this.XJ)Oa[Oa.length]=v;return Oa;};});jsx3.Class.defineClass("jsx3.util.Logger.Record",null,null,function(n,k){var
ub={a:"function"};n.lp=1;k.jG=null;k.Hp=null;k.Wx=null;k.cQ=null;k.D5=null;k.kV=null;k.Gl=null;k._x=null;k.init=function(f,m,j,o,q,d){this.jG=n.lp++;this.Hp=new
Date();this.Wx=f;this.cQ=m;this.D5=j;this.kV=o;this.Gl=q;this._x=d;};k.getSerial=function(){return this.jG;};k.getDate=function(){return this.Hp;};k.getMessage=function(){return this.Wx;};k.getParameters=function(){return this.cQ;};k.getLevel=function(){return this.D5;};k.getLoggerName=function(){return this.kV;};k.getFunction=function(){return typeof this.Gl==ub.a?this.Gl:null;};k.getStack=function(){return jsx3.$A.is(this.Gl)?this.Gl:null;};k.getError=function(){return this._x;};});jsx3.Class.defineClass("jsx3.util.Logger.Handler",null,null,function(g,p){var
ub={a:"",b:"objRecord"};var
Ya=jsx3.util.Logger;var
Ib=jsx3.util.Logger.Manager;g.registerHandlerClass=function(c){(Ib.getManager()).FP(c);};p.c7=ub.a;p.D5=null;p.init=function(e){this.c7=e;};p.onAfterInit=function(){};p.getName=function(){return this.c7;};p.getLevel=function(){return this.D5;};p.setLevel=function(q){q=Math.max(0,Math.min(Ya.d0,q));this.D5=q;};p.isLoggable=function(b){return this.D5==null||this.D5>=b;};p.handle=jsx3.Method.newAbstract(ub.b);});jsx3.Class.defineClass("jsx3.util.Logger.MemoryHandler",jsx3.util.Logger.Handler,null,function(c,p){p.uz=null;p.PZ=100;p.init=function(f){this.jsxsuper(f);this.uz=[];};p.handle=function(d){this.uz[this.uz.length]=d;if(this.uz.length>this.PZ)this.uz.shift();};p.clearBuffer=function(){this.uz=[];};p.getBufferSize=function(){return this.PZ;};p.setBufferSize=function(e){this.PZ=Math.max(1,e);if(this.uz.length>this.PZ)this.uz.splice(0,this.uz.length-this.PZ);};p.getRecords=function(h){if(h==null)h=this.uz.length;return this.uz.slice(this.uz.length-h);};});jsx3.Class.defineClass("jsx3.util.Logger.FormatHandler",jsx3.util.Logger.Handler,null,function(m,n){var
ub={a:"%d %t %n (%l) - %M",b:"",c:" ",d:" (",e:") ",f:"\n",g:/\%s/g,h:"{0}",i:/\%n/g,j:"{1}",k:/\%l/g,l:"{2}",m:/\%M/g,n:"{3}",o:/\%f/g,p:"{4}",q:/\%d/g,r:"{5,date,yyyy-MM-dd}",s:/\%t/g,t:"{5,date,HH:mm:ss.SSS}"};n.XY=ub.a;n.mG=ub.b;n.init=function(j){this.jsxsuper(j);};n.format=function(h){var
ib=h.getDate();var
Ea=h.getFunction();var
V=h.getMessage()||ub.b;var
ha=this.os();var
qb=jsx3.util.Logger.levelAsString(h.getLevel());var
T=ha?ha.format(h.getSerial(),h.getLoggerName(),qb,V,Ea!=null?Ea.jsxmethod!=null?Ea.jsxmethod.toString():Ea.toString():ub.b,ib):ib+ub.c+h.getLoggerName()+ub.d+qb+ub.e+V;var
Ua=h.getError();var
lb=h.getStack();if(Ua!=null){T=T+(ub.f+Ua.printStackTrace());}else if(lb!=null)T=T+(ub.f+jsx3.Exception.formatStack(lb));return T;};n.getFormat=function(){return this.XY;};n.setFormat=function(b){this.XY=b;this.e7=null;};n.os=function(){if(this.e7==null&&jsx3.util.MessageFormat){var
ma=this.XY||ub.b;ma=ma.replace(ub.g,ub.h);ma=ma.replace(ub.i,ub.j);ma=ma.replace(ub.k,ub.l);ma=ma.replace(ub.m,ub.n);ma=ma.replace(ub.o,ub.p);ma=ma.replace(ub.q,ub.r);ma=ma.replace(ub.s,ub.t);this.e7=new
jsx3.util.MessageFormat(ma);}return this.e7;};n.getResourceUrls=function(){return this.mG;};n.setResourceUrls=function(g){this.mG=g;};});jsx3.Class.defineClass("jsx3.util.Logger.ConsoleHandler",jsx3.util.Logger.FormatHandler,null,function(a,q){var
ub={a:"error",b:"warn",c:"info",d:"debug"};var
Va=[null,ub.a,ub.a,ub.b,ub.c,ub.d,ub.d];q.handle=function(b){if(window.console){var
kb=Va[b.getLevel()];if(kb)try{console[kb](this.format(b));}catch(Kb){}}};});jsx3.Class.defineClass("jsx3.util.Logger.AlertHandler",jsx3.util.Logger.FormatHandler,null,function(d,i){var
ub={a:"logr.alrt_ctd",b:"logr.alrt_err"};i.eN=5;i.l5=0;i.ZK=false;i.handle=function(f){if(this.ZK)return;this.l5++;try{if(this.eN>0&&this.l5%this.eN==0)if(!window.confirm(jsx3._msg(ub.a,this.getName()))){this.ZK=true;return;}window.alert(this.format(f));}catch(Kb){window.alert(jsx3._msg(ub.b,jsx3.NativeError.wrap(Kb)));}};i.getConfirmInterval=function(){return this.eN;};i.setConfirmInterval=function(k){this.eN=k;};});jsx3.ERROR=jsx3.util.Logger;jsx3.Class.defineClass("jsx3.util.Locale",null,null,function(b,j){var
ub={a:"",b:"en",c:"US",d:"GB",e:"string.lang.",f:"string.terr.",g:"format.locale.displayname",h:"_",i:/[\-_]/};j.init=function(a,d){this.vt=a?a.toLowerCase():ub.a;this.AS=d?d.toUpperCase():ub.a;};b.ROOT=new
b(ub.a);b.ENGLISH=new
b(ub.b);b.US=new
b(ub.b,ub.c);b.UK=new
b(ub.b,ub.d);j.getLanguage=function(){return this.vt;};j.getCountry=function(){return this.AS;};j.getDisplayLanguage=function(d){return (jsx3.System.getLocaleProperties(d)).get(ub.e+this.vt)||ub.a;};j.getDisplayCountry=function(p){return (jsx3.System.getLocaleProperties(p)).get(ub.f+this.AS)||ub.a;};j.getDisplayName=function(n){var
Qa=this.getDisplayLanguage(n);var
Ga=this.getDisplayCountry(n);if(!Qa)return Ga;if(!Ga)return Qa;var
la=(jsx3.System.getLocaleProperties(n)).get(ub.g);return (new
jsx3.util.MessageFormat(la)).format(Qa,Ga);};j.getSearchPath=function(){var
V=[this];if(this.AS!=ub.a||this.vt!=ub.a){if(this.AS!=ub.a&&this.vt!=ub.a)V.push(new
b(this.vt));V.push(new
b(ub.a));}return V;};j.equals=function(o){return this===o||o instanceof b&&o.vt==this.vt&&o.AS==this.AS;};j.toString=function(){if(this.AS)return this.vt+ub.h+this.AS;else return this.vt;};b.valueOf=function(n){var
ta=n.split(ub.i);return new
b(ta[0],ta[1]);};});jsx3.Class.defineClass("jsx3.util.NumberFormat",null,null,function(h,o){var
ub={A:";",B:"nmfmt.numpt",C:",",D:"nmfmt.gpdec",E:"#",F:"\u00A4",G:"%",H:"\u2030",I:"-",a:".integer",b:"",c:".currency",d:".percent",e:"format.number",f:"._instance",g:"number.NaN",h:"number",i:"number.minus",j:"number.infinity",k:"number.zero",l:/\-?(\d+(\.\d*)?|\d*\.\d+)([eE]\-?\d+)?/,m:"number.percent",n:"number.permille",o:"number.currency",p:".",q:"number.currency.grouping",r:"number.grouping",s:"number.currency.decimal",t:"number.decimal",u:"unshift",v:"push",w:"0",x:"0#,.",y:"'",z:"nmfmt.sq"};h.NUMBER=1;h.INTEGER=2;h.CURRENCY=3;h.getInstance=function(e,l){switch(e){case 2:return h.getIntegerInstance(l);case 3:return h.getCurrencyInstance(l);default:return h.getNumberInstance(l);}};h.getIntegerInstance=function(n){return h.DT(n,ub.a);};h.getNumberInstance=function(g){return h.DT(g,ub.b);};h.getCurrencyInstance=function(p){return h.DT(p,ub.c);};h.getPercentInstance=function(s){return h.DT(s,ub.d);};h.DT=function(a,r){var
Hb=h.rD(a);var
_=ub.e+r+ub.f;var
aa=Hb.get(_);if(!Hb.containsKey(_)||aa==null){var
H=Hb.get(ub.e+r);aa=new
h(H,a);Hb.set(_,aa);}return aa;};o.RR=0;o.vH=ub.b;o.yq=ub.b;o.vw=null;o.fB=null;o.ky=false;o.ir=Number.MAX_VALUE;o.U8=0;o.fM=0;o.bz=0;o.pM=1;o.XH=false;o.init=function(d,l){this.XY=d;this.IB=l||jsx3.System.getLocale();this.p9();};o.getLocale=function(){return this.IB;};o.setLocale=function(q){this.IB=q;this.p9();};o.format=function(r){var
v=this.rD();if(isNaN(r)){return v.get(ub.g);}else{if(typeof r!=ub.h)r=Number(r);var
W=r>=0;var
wa=W?this.vH:this.vw!=null?this.vw:v.get(ub.i)+this.vH;var
Db=W?this.yq:this.fB!=null?this.fB:this.yq;var
x=null;if(!isFinite(r)){x=v.get(ub.j);}else{r=this.pM*Math.abs(r);var
Qa=h.cV(r);var
_a=Qa[0];var
Va=Qa[1];if(this.fM<_a.length-Va){var
Fa=_a.splice(Va+this.fM,_a.length-Va-this.fM);if(h.jy(_a,Fa))Va++;}var
E=Va>=0?_a.slice(0,Va):_a;var
La=Va>=0?_a.slice(Va):[];h.y2(E,this.ir,this.U8,true);h.y2(La,this.fM,this.bz,false);var
mb=v.get(ub.k);h.WX(E,mb);h.WX(La,mb);if(this.RR>0){var
Ga=this.LN(this.XH);for(var
gb=E.length-this.RR;gb>=1;gb=gb-this.RR)E.splice(gb,0,Ga);}x=E.join(ub.b);if(this.ky||La.length>0)x=x+(this.At(this.XH)+La.join(ub.b));}return wa+x+Db;}};h.Jt=ub.l;o.parse=function(p){var
Ba=this.rD();if(p==Ba.get(ub.g))return NaN;var
ob=false;var
R=1;var
ta=false;var
tb=Ba.get(ub.i);var
W=this.vw,Ka=this.fB;if(W||Ka){W=this.qL(W,Ba);Ka=this.qL(Ka,Ba);if(p.indexOf(W)==0&&p.lastIndexOf(Ka)==p.length-Ka.length){ob=true;p=W.replace(tb,ub.b)+p.substring(W.length,p.length-Ka.length)+Ka.replace(tb,ub.b);}}var
xb=p.indexOf(tb);if(xb==0){ob=true;p=p.substring(0,xb)+p.substring(xb+tb.length);}var
u=Ba.get(ub.m);var
ua=p.indexOf(u);if(ua>=0){R=100;p=p.substring(0,ua)+p.substring(ua+u.length);}else{var
sb=Ba.get(ub.n);ua=p.indexOf(sb);if(ua>=0){R=1000;p=p.substring(0,ua)+p.substring(ua+sb.length);}}var
v=Ba.get(ub.o);var
F=p.indexOf(v);if(F>=0){ta=true;p=p.substring(0,F)+p.substring(F+v.length);}if(p==Ba.get(ub.j))return ob?Number.NEGATIVE_INFINITY:Number.POSITIVE_INFINITY;var
ab=this.LN(ta);if(ab){var
K=-1;while((K=p.indexOf(ab))>=0)p=p.substring(0,K)+p.substring(K+ab.length);}var
P=this.At(ta);if(P!=ub.p){var
kb=p.indexOf(P);if(kb>=0)p=(p=p.substring(0,kb)+ub.p+p.substring(kb+ab.length));}if(!h.Jt.exec(p))return NaN;return (ob?-1:1)*Number(RegExp.lastMatch)/R;};o.LN=function(m){var
da=this.rD();return m?da.get(ub.q)||da.get(ub.r):da.get(ub.r);};o.At=function(g){var
Jb=this.rD();return g?Jb.get(ub.s)||Jb.get(ub.t):Jb.get(ub.t);};h.MW="0".charCodeAt(0);h.mE=".".charCodeAt(0);h.cV=function(g){if(g<0)throw new
jsx3.Exception();var
Da=Math.log(g)*jsx3.LOG10E;if(!isFinite(Da)){if(g==0)return [[0],0];throw new
jsx3.Exception();}var
Ga=g.toString();var
Na=[];var
V=null;for(var
yb=0;yb<Ga.length;yb++){var
oa=Ga.charCodeAt(yb);var
Hb=oa-h.MW;if(Hb>=0&&Hb<=9){Na[Na.length]=Hb;}else if(oa==h.mE){}else break;}if(Da>=0){var
M=Math.floor(Da+1);if(Na.length>M){V=M;}else{if(Na.length<M)for(var
yb=Na.length;yb<M;yb++)Na[Na.length]=0;V=Na.length;}}else{var
Oa=Math.ceil(-1-Da);var
ab=Na.indexOf(0);Na.splice(0,ab+1);for(var
yb=0;yb<Oa;yb++)if(Na[yb]!=0)Na.splice(yb,0,0);V=0;}return [Na,V];};h.y2=function(s,b,k,a){if(s.length>b){if(a){s.splice(0,s.length-b);}else s.splice(b,s.length-b);}else if(s.length<k){var
Ha=a?ub.u:ub.v;for(var
S=s.length;S<k;S++)s[Ha](ub.w);}};h.jy=function(a,s){if(s[0]>=5)for(var
x=a.length-1;x>=0;x--){var
Lb=a[x]+1;if(Lb>=10){a[x]=0;if(x==0){a.unshift(1);return true;}}else{a[x]=Lb;break;}}return false;};h.WX=function(a,p){var
F=p.charCodeAt(0);for(var
Ha=0;Ha<a.length;Ha++)a[Ha]=String.fromCharCode(a[Ha]+F);};h.TD=ub.x;o.p9=function(){var
zb=ub.y;var
N=this.rD();var
u=this.XY;var
Pa=0;var
ma=u.length;var
Fa=1;var
wb=null,pb=null;while(Pa<ma){var
Ia=u.charAt(Pa);if(Fa==1){if(Ia==zb){var
lb=u.indexOf(zb,Pa+1);if(lb==Pa+1){this.vH+=zb;Pa=Pa+2;}else if(lb>=0){this.vH+=u.substring(Pa+1,lb);Pa=lb+1;}else throw new
jsx3.Exception(jsx3._msg(ub.z,Pa,this));}else if(h.TD.indexOf(Ia)>=0){wb=Pa;Fa++;}else{this.vH+=this.m7(Ia,N);Pa++;}}else if(Fa==2){if(h.TD.indexOf(Ia)>=0){Pa++;}else{pb=Pa;Fa++;}}else if(Fa==3){if(Ia==zb){var
lb=u.indexOf(zb,Pa+1);if(lb==Pa+1){this.yq+=zb;Pa=Pa+2;}else if(lb>=0){this.yq+=u.substring(Pa+1,lb);Pa=lb+1;}else throw new
jsx3.Exception(jsx3._msg(ub.z,Pa,this));}else if(Ia==ub.A){this.vw=ub.b;this.fB=ub.b;Fa++;}else this.yq+=this.m7(Ia,N);Pa++;}else if(Fa==4){if(Ia==zb){var
lb=u.indexOf(zb,Pa+1);if(lb==Pa+1){this.vw+=zb;Pa=Pa+2;}else if(lb>=0){this.vw+=u.substring(Pa+1,lb);Pa=lb+1;}else throw new
jsx3.Exception(jsx3._msg(ub.z,Pa,this));}else if(h.TD.indexOf(Ia)>=0){Fa++;}else{this.vw+=this.m7(Ia,N);Pa++;}}else if(Fa==5){if(h.TD.indexOf(Ia)>=0){Pa++;}else Fa++;}else if(Fa==6){if(Ia==zb){var
lb=u.indexOf(zb,Pa+1);if(lb==Pa+1){this.fB+=zb;Pa=Pa+2;}else if(lb>=0){this.fB+=u.substring(Pa+1,lb);Pa=lb+1;}else throw new
jsx3.Exception(jsx3._msg(ub.z,Pa,this));}else this.fB+=this.m7(Ia,N);Pa++;}}if(pb==null)pb=ma;if(wb==null)throw new
jsx3.Exception(jsx3._msg(ub.B,u));this.Uu(u.substring(wb,pb));};o.Uu=function(j){var
Va=j.indexOf(ub.p);if(Va<0)Va=j.length;else if(Va==j.length-1)this.ky=true;var
H=j.lastIndexOf(ub.C);if(H>=0){var
Pa=Va-H-1;if(Pa<1)throw new
jsx3.Exception(jsx3._msg(ub.D,j));this.RR=Pa;}for(var
C=0;C<Va;C++)if(j.charAt(C)==ub.w)this.U8++;for(var
C=Va+1;C<j.length;C++)if(j.charAt(C)==ub.w){this.bz++;this.fM++;}else if(j.charAt(C)==ub.E)this.fM++;};h.rD=function(l){return jsx3.System.getLocaleProperties(l);};o.rD=function(){return h.rD(this.IB);};o.qL=function(d,i){var
x=d.split(ub.b);for(var
Ta=0;Ta<x.length;Ta++)x[Ta]=this.m7(x[Ta],i);return x.join(ub.b);};o.m7=function(b,l){if(b==ub.F){this.XH=true;return l.get(ub.o);}else if(b==ub.G){this.pM=100;return l.get(ub.m);}else if(b==ub.H){this.pM=1000;return l.get(ub.n);}else if(b==ub.I){return l.get(ub.i);}else return b;};o.toString=function(){return this.XY;};});jsx3.Class.defineClass("jsx3.util.DateFormat",null,null,function(r,e){var
ub={A:"m",B:"s",C:"S",D:"gmt",E:"string",F:"M",G:"E",H:"a",I:"x",J:"'",K:/[a-zA-Z']/g,L:"dtfmt.sq",M:"dtfmt.token",N:"objDate",O:"dtfmt.parse",P:"dtfmt.inv",a:"short",b:"medium",c:"long",d:"full",e:"format.date.",f:"intType",g:"format.time.",h:"intDateType",i:"intTimeType",j:"format.datetime",k:"date.era",l:"date.era.long",m:"date.day.narrow",n:"date.day.abbrev",o:"date.day",p:"time.ampm",q:"GMT",r:":",s:"",t:"date.month.abbrev",u:"date.month",v:"-",w:"+",x:"0",y:"y",z:"d"};r.SHORT=1;r.MEDIUM=2;r.LONG=3;r.FULL=4;r.LX=2;r.r3=[null,ub.a,ub.b,ub.c,ub.d];r.getDateInstance=function(k,f){var
w=(jsx3.System.getLocaleProperties(f)).get(ub.e+r.r3[k||r.LX]);if(w==null)throw new
jsx3.IllegalArgumentException(ub.f,k);return new
r(w,f);};r.getTimeInstance=function(s,q){var
lb=(jsx3.System.getLocaleProperties(q)).get(ub.g+r.r3[s||r.LX]);if(lb==null)throw new
jsx3.IllegalArgumentException(ub.f,s);return new
r(lb,q);};r.getDateTimeInstance=function(o,f,n){var
gb=jsx3.System.getLocaleProperties(n);var
Na=gb.get(ub.e+r.r3[o||r.LX]);var
qb=gb.get(ub.g+r.r3[f||r.LX]);if(Na==null)throw new
jsx3.IllegalArgumentException(ub.h,o);if(qb==null)throw new
jsx3.IllegalArgumentException(ub.i,f);var
cb=new
jsx3.util.MessageFormat(gb.get(ub.j));return new
r(cb.format(qb,Na),n);};r.tN={G:function(b,m,s){var
wa=b.getFullYear()<1;return r.eU((s.pu(m<4?ub.k:ub.l))[wa?0:1]);},y:function(l,d,j){return r.V5(l.getFullYear(),d);},M:function(a,l,k){return r.CS(k,a.getMonth(),l);},d:function(q,i,o){return r.ZC(q.getDate(),i);},E:function(f,q,d){return r.eU((d.pu(q<3?ub.m:q<4?ub.n:ub.o))[f.getDay()]);},H:function(g,p,c){return r.ZC(g.getHours(),p);},h:function(d,o,b){return r.ZC(d.getHours()%12||Number(12),o);},m:function(l,d,j){return r.ZC(l.getMinutes(),d);},s:function(i,a,g){return r.ZC(i.getSeconds(),a);},S:function(h,s,f){return r.ZC(h.getMilliseconds(),s);},a:function(l,p,c){return r.eU((c.pu(ub.p))[Math.floor(l.getHours()/12)]);},z:function(m,n,k){var
Ia=r.m2(m,k);return ub.q+Ia[0]+ub.r+Ia[1];},Z:function(j,b,h){var
_=r.m2(j,h);return _[0]+_[1];}};r.V5=function(q,p){if(p==2){var
Xa=ub.s+q;return Xa.substring(Xa.length-2);}else{if(q<1)q=1-q;return r.ZC(q,p);}};r.ZC=function(a,m){var
H=a.toString();while(H.length<m)H="0000000000".substring(0,m-H.length)+H;return H;};r.eU=function(d,j){if(j==null||j>=4||d.length<=j)return d;else return d.substring(0,j);};r.CS=function(q,d,i){if(i<=2)return r.ZC(d+1,i);else return r.eU((q.pu(i<4?ub.t:ub.u))[d],i);};r.m2=function(b,a){var
V=a.getTimeZoneOffset(b);var
fa=V<0?ub.v:ub.w;V=Math.abs(V);var
L=(Math.floor(V/60)).toString();var
tb=(Math.floor(V%60)).toString();if(L.length<2)L=ub.x+L;if(tb.length<2)tb=ub.x+tb;return [fa+L,tb];};r.No={G:function(o,s,c,g,m,k,n){var
S=r.AZ(s,c,[o.pu(ub.k),o.pu(ub.l)],g,false,k);var
u=S[0],D=S[1];if(u>=0){n.bc=u==0;return D;}else return -1;},y:function(i,f,p,a,g,d,k){if(a<=2){var
Pa=r.Gp(f,p,a,null,d);var
Ra=Number(Pa);if(!isNaN(Ra)){if(Pa.length==2){var
eb=new
Date();var
Ib=eb.getFullYear();var
V=100*Math.floor(Ib/100)+Ra;if(V>=Ib+20){V=V-100;}else if(V<Ib-80)V=V+100;Ra=V;}k.y=Ra;return Pa.length;}else return -1;}else{var
aa=r.Gp(f,p,a,null,d);return r.KN(aa,ub.y,k);}},M:function(q,p,f,i,o,m,c){if(i<=2){var
V=r.Gp(p,f,i,2,m);var
bb=Number(V);if(!isNaN(bb)){c.M=bb-1;return V.length;}else return -1;}else{var
_a=r.AZ(p,f,[q.pu(ub.t),q.pu(ub.u)],i,false,m);var
Ib=_a[0],fa=_a[1];if(Ib>=0){c.M=Ib;return fa;}else return -1;}},d:function(n,a,b,f,l,j,o){var
aa=r.Gp(a,b,f,2,j);return r.KN(aa,ub.z,o);},E:function(q,p,f,i,o,m,c){var
Eb=r.AZ(p,f,[q.pu(ub.m),q.pu(ub.o),q.pu(ub.n)],i,false,m);var
w=Eb[0],ha=Eb[1];if(w>=0){return ha;}else return 0;},H:function(s,o,g,k,q,j,a){var
jb=r.Gp(o,g,k,2,j);var
Mb=Number(jb);if(!isNaN(Mb)){a.hours24=Mb;return jb.length;}else return -1;},h:function(h,g,o,s,f,d,l){var
Ua=r.Gp(g,o,s,2,d);var
ha=Number(Ua);if(!isNaN(ha)){l.hours12=ha;return Ua.length;}else return -1;},m:function(h,g,o,s,f,d,l){var
E=r.Gp(g,o,s,2,d);return r.KN(E,ub.A,l);},s:function(s,o,g,k,q,j,a){var
bb=r.Gp(o,g,k,2,j);return r.KN(bb,ub.B,a);},S:function(a,n,h,l,o,p,s){var
E=r.Gp(n,h,l,3,p);return r.KN(E,ub.C,s);},a:function(j,a,q,b,h,f,m){var
zb=r.OX(a,q,j.pu(ub.p),b,false,f);var
Ta=zb[0],Bb=zb[1];if(Ta>=0){m.pm=Ta==1;return Bb;}else return -1;},z:function(f,i,m,q,d,b,n){var
Ca=i.substring(m,m+3);var
sa=i.charAt(m+3);var
Lb=Number(i.substring(m+4,m+6));var
aa=Number(i.substring(m+7,m+9));if(Ca.toLowerCase()==ub.D&&(sa==ub.w||sa==ub.v)&&!isNaN(Lb)&&!isNaN(aa)){var
V=60*Lb+aa;if(sa==ub.v)V=V*-1;n.timezone=V;return 9;}else return -1;},Z:function(d,k,p,o,b,s,f){var
J=k.charAt(p);var
zb=Number(k.substring(p+1,p+3));var
xa=Number(k.substring(p+3,p+5));if((J==ub.w||J==ub.v)&&!isNaN(zb)&&!isNaN(xa)){var
ia=60*zb+xa;if(J==ub.v)ia=ia*-1;f.timezone=ia;return 5;}else return -1;}};r.PD=function(a,b,j){if(a.indexOf(j,b)==b)return j.length;else return -1;};r.Gp=function(g,o,b,p,m){var
O=m==null||typeof m==ub.E&&!r.EV(m,0);if(jsx3.$A.is(m))O=O||m[0]==ub.F&&m[1]>2||m[0]==ub.G||m[0]==ub.H;if(O){var
Qa=o;while(r.EV(g,Qa))Qa++;return g.substring(o,Qa);}else{for(var
D=0;D<b;D++)if(!r.EV(g,o+D))return ub.I;return g.substring(o,o+b);}};r.AZ=function(g,o,m,s,n,a){var
H=[];for(var
Ab=0;Ab<m.length;Ab++)H.push.apply(H,m[Ab]);var
hb=r.OX(g,o,H,s,n,a);hb[0]=hb[0]%m[0].length;return hb;};r.OX=function(l,j,k,n,s,h){var
ha=-1;var
Jb=0;if(!s)l=l.toLowerCase();for(var
hb=0;hb<k.length;hb++){var
U=0;var
gb=s?k[hb]:k[hb].toLowerCase();while(l.length>U&&gb.length>U&&l.charAt(j+U)==gb.charAt(U))U++;if(U>Jb){Jb=U;ha=hb;}}return [ha,Jb];};r.KN=function(g,p,n){var
rb=Number(g);if(!isNaN(rb)){n[p]=rb;return g.length;}else return -1;};r.EV=function(a,k){var
_a=a.charCodeAt(k);return _a>=48&&_a<=57;};e.init=function(k,o){this.XY=k;this.sC=null;this.IB=o||jsx3.System.getLocale();this.Jy();};e.getLocale=function(){return this.IB;};e.setLocale=function(q){this.IB=q;};e.getTimeZoneOffset=function(b){return this.sC!=null?this.sC:-1*(b||new
Date()).getTimezoneOffset();};e.setTimeZoneOffset=function(n){this.sC=n;};e.pu=function(j){return (jsx3.System.getLocaleProperties(this.IB)).get(j);};e.Jy=function(){var
ja=ub.J;var
Gb=[];this.WZ=Gb;var
E=this.XY;var
ib=E.length;var
aa=0;var
t=[];var
O=ub.K;while(aa<ib){var
L=E.charAt(aa);if(L==ja){var
ea=E.indexOf(ja,aa+1);if(ea==aa+1){t[t.length]=ja;aa=aa+2;}else if(ea>=0){t[t.length]=E.substring(aa+1,ea);aa=ea+1;}else throw new
jsx3.Exception(jsx3._msg(ub.L,aa,this));}else if(r.tN[L]){var
Ib=1;while(E.charAt(aa+Ib)==L)Ib++;var
Bb=t.join(ub.s);if(Bb.length>0){Gb[Gb.length]=Bb;t.splice(0,t.length);}Gb[Gb.length]=[L,Ib];aa=aa+Ib;}else if(L.match(O)){throw new
jsx3.Exception(jsx3._msg(ub.M,aa,E));}else{O.lastIndex=aa+1;if(O.exec(E)){t[t.length]=E.substring(aa,O.lastIndex-1);aa=O.lastIndex-1;}else{t[t.length]=E.substring(aa);break;}}}var
Bb=t.join(ub.s);if(Bb.length>0){Gb[Gb.length]=Bb;t.splice(0,t.length);}};e.format=function(f){if(!(f instanceof Date)){if(!isNaN(f)){f=new
Date(Number(f));}else f=new
Date(f);if(isNaN(f))throw new
jsx3.IllegalArgumentException(ub.N,f);}var
da=new
Array(this.WZ.length);var
pb=new
Date();pb.setTime(f.getTime()+(this.getTimeZoneOffset(f)+f.getTimezoneOffset())*1000*60);for(var
B=0;B<this.WZ.length;B++){var
La=this.WZ[B];if(jsx3.$A.is(La)){var
Ia=La[0];var
jb=La[1];da[B]=r.tN[Ia](pb,jb,this);}else da[B]=La;}return da.join(ub.s);};e.parse=function(q){var
ia=new
Date();ia.setTime(0);var
B=0;var
pa={};for(var
Lb=0;Lb<this.WZ.length;Lb++){var
oa=this.WZ[Lb];var
ab=-1;if(jsx3.$A.is(oa)){ab=r.No[oa[0]](this,q,B,oa[1],ia,this.WZ[Lb+1],pa);}else ab=r.PD(q,B,oa);if(ab<0)throw new
jsx3.Exception(jsx3._msg(ub.O,q,this));B=B+ab;}if(pa.y!=null)ia.setUTCFullYear(pa.y);if(pa.bc)ia.setUTCFullYear(1-ia.getUTCFullYear());if(pa.M!=null)ia.setUTCMonth(pa.M);if(pa.d!=null)ia.setUTCDate(pa.d);if(pa.hours24){ia.setUTCHours(pa.hours24);}else if(pa.hours12){var
E=pa.hours12;if(pa.pm)E=E+12;ia.setUTCHours(E);}if(pa.m!=null)ia.setUTCMinutes(pa.m);if(pa.s!=null)ia.setUTCSeconds(pa.s);if(pa.S!=null)ia.setUTCMilliseconds(pa.S);if(pa.timezone!=null){ia.setTime(ia.getTime()-pa.timezone*1000*60);}else ia.setTime(ia.getTime()-this.getTimeZoneOffset(ia)*1000*60);if(isNaN(ia.getTime()))throw new
jsx3.Exception(jsx3._msg(ub.P,q,this));return ia;};e.getFormat=function(){return this.XY;};e.toString=function(){return this.XY;};});jsx3.Class.defineClass("jsx3.util.MessageFormat",null,null,function(k,j){var
ub={a:"{",b:"}",c:"string",d:"number",e:"null",f:"",g:"'",h:"msfmt.sq",i:"msfmt.bracket",j:"getDateInstance",k:"getTimeInstance",l:"getDateTimeInstance",m:",",n:"msfmt.bad_ind",o:"short",p:"medium",q:"long",r:"full",s:"datetime",t:"integer",u:"percent",v:"currency",w:"msfmt.bad_type"};var
Ea=jsx3.util.NumberFormat;var
L=jsx3.util.DateFormat;j.init=function(d,l){this.XY=d;this.IB=l||jsx3.System.getLocale();this.p9();};j.getLocale=function(){return this.IB;};j.setLocale=function(f){this.IB=f;this.p9();};j.format=function(b){var
t=new
Array(this.WZ.length);var
Da=arguments[0] instanceof Array?arguments[0]:arguments;for(var
w=0;w<t.length;w++){var
Ta=this.WZ[w];if(jsx3.$A.is(Ta)){var
Db=Ta[0];var
Ha=Ta[1];var
ya=Da[Db];if(Db>=Da.length){t[w]=ub.a+Db+ub.b;}else if(Ha!=null){t[w]=Ha.format(ya);}else if(typeof ya==ub.c){t[w]=ya;}else if(typeof ya==ub.d&&Ea){if(!this.qK)this.qK=Ea.getNumberInstance(this.IB);t[w]=this.qK.format(ya);}else if(ya==null){t[w]=ub.e;}else if(ya instanceof Date&&L){t[w]=(L.getDateTimeInstance(1,1,this.IB)).format(ya);}else t[w]=ya.toString();}else t[w]=this.WZ[w];}return t.join(ub.f);};j.p9=function(){var
fb=ub.g;var
va=[];this.WZ=va;var
Bb=this.XY;var
ya=Bb.length;var
sb=0;var
w=false;var
Ya=[];while(sb<ya){var
Ka=Bb.indexOf(fb,sb);var
Lb=Bb.indexOf(ub.a,sb);if(Ka>=0&&(Ka<Lb||Lb<0)){if(Ka>sb)Ya[Ya.length]=Bb.substring(sb,Ka);var
Ga=Bb.indexOf(fb,Ka+1);if(Ga==Ka+1){Ya[Ya.length]=fb;sb=Ga+1;}else if(Ga>=0){Ya[Ya.length]=Bb.substring(Ka+1,Ga);sb=Ga+1;}else throw new
jsx3.Exception(jsx3._msg(ub.h,Ka,this));}else if(Lb>=0){if(Lb>sb)Ya[Ya.length]=Bb.substring(sb,Lb);va[va.length]=Ya.join(ub.f);Ya.splice(0,Ya.length);sb=Lb+1;var
ua=[];while(true){var
Ib=Bb.charAt(sb);if(Ib==ub.f)throw new
jsx3.Exception(jsx3._msg(ub.i,ya-ua.length-1,this));if(Ib==fb){if(Bb.charAt(sb+1)==fb){ua[ua.length]=Ib;sb=sb+2;}else{w=!w;sb=sb+1;}}else if(w){ua[ua.length]=Ib;sb++;}else if(Ib==ub.b){sb++;break;}else{ua[ua.length]=Ib;sb++;}}va[va.length]=this.IS(ua.join(ub.f));}else{Ya[Ya.length]=Bb.substring(sb);break;}}var
la=Ya.join(ub.f);if(la.length>0)va[va.length]=la;};k.hR={date:ub.j,time:ub.k,datetime:ub.l};j.IS=function(s){var
nb=s.split(ub.m);var
xb=Number(nb[0]);if(isNaN(xb))throw new
jsx3.Exception(jsx3._msg(ub.n,s,this));if(nb.length>1){var
mb=nb[1];var
X=(nb.slice(2)).join(ub.m);if(k.hR[mb]){if(!L)return [xb,null];var
yb=k.hR[mb];var
Aa=null;if(X==ub.o)Aa=1;else if(X==ub.p)Aa=2;else if(X==ub.q)Aa=3;else if(X==ub.r)Aa=4;if(Aa!=null||jsx3.util.strEmpty(X))return [xb,mb==ub.s?L[yb](Aa,Aa,this.IB):L[yb](Aa,this.IB)];return [xb,new
L(X,this.IB)];}else if(mb==ub.d){if(!Ea)return [xb,null];if(jsx3.util.strEmpty(X))return [xb,Ea.getNumberInstance(this.IB)];else if(X==ub.t)return [xb,Ea.getIntegerInstance(this.IB)];else if(X==ub.u)return [xb,Ea.getPercentInstance(this.IB)];else if(X==ub.v)return [xb,Ea.getCurrencyInstance(this.IB)];else return [xb,new
Ea(X,this.IB)];}else throw new
jsx3.Exception(jsx3._msg(ub.w,s,this));}else return [xb,null];};j.toString=function(){return this.XY;};});jsx3.Package.definePackage("jsx3.html",function(r){var
ub={A:"<",B:' xmlns="',C:'"',D:" ",E:'="',F:"/>",G:">",H:"</",I:"<![CDATA[",J:"]]>",K:"&",L:";",M:"<!--",N:"-->",O:"html.set_outer",P:"beforeend",Q:"beforebegin",R:"html.adj",S:"opacity:",T:"text",U:"jsx:///images/icons/h.png",V:"jsx:///images/icons/v.png",W:"background-image:url(",X:");",Y:"_jsx_",Z:"disable-output-escp",_:/&lt;/g,a:"",aa:/&gt;/g,b:"overflow:hidden;font-size:0px;",ba:/&quot;/g,c:"body",ca:/&amp;/g,d:'<input type="text" id="_jsx3_html_b1" style="position:absolute;top:0px;left:-120px;width:100px;height:30px;padding:8px;margin:0px;"/>',da:/&([a-zA-Z_]+);/g,e:"beforeEnd",ea:"class",f:"_jsx3_html_b1",fa:/<span class=\"disable-output-escp\">([\s\S]*?)<\/span>/g,g:'<div id="_jsx3_html_b2" style="position:absolute;top:0px;left:-116px;width:100px;height:24px;padding:8px;"></div>',ga:"&#",h:"_jsx3_html_b2",ha:"jsx_image_loader",i:"string",ia:"none",j:/^<([^\s]*)([\s\S]*)\/>$/i,ja:"_",k:"<$1$2></$1>",ka:"img",l:"span",la:"id",m:"div",ma:"src",n:/^on/,na:"unshift",o:"function",oa:"push",p:"event",pa:/\//g,q:"head",qa:" A AREA BUTTON INPUT OBJECT SELECT TEXTAREA ",r:"undefined",ra:"focus",s:"http://www.w3.org/1999/xhtml",sa:/\s+/g,t:"style",u:" {",v:"}",w:"type",x:"text/css",y:"media",z:"screen"};var
kb=jsx3.gui.Event;r.MODE_IE_QUIRKS=0;r.MODE_FF_QUIRKS=1;r.MODE_IE_STRICT=2;r.MODE_FF_STRICT=3;r.pe=ub.a;r.hl=ub.b;r.getMode=function(g){if(r.XE==null){var
P=g!=null?g.ownerDocument:document;var
pa=g||(document.getElementsByTagName(ub.c))[0];r.XE=0;var
ua=ub.d;jsx3.html.insertAdjacentHTML(pa,ub.e,ua);var
wa=P.getElementById(ub.f);if(wa.offsetHeight!=30){r.XE=jsx3.CLASS_LOADER.IE?2:3;}else{var
db=ub.g;jsx3.html.insertAdjacentHTML(pa,ub.e,db);var
W=P.getElementById(ub.h);if(parseInt(W.offsetWidth)>100)r.XE=1;pa.removeChild(W);}pa.removeChild(wa);}return r.XE;};r.emptyToClosed=function(c){return typeof c==ub.i?c.replace(ub.j,ub.k):c;};r.restoreScrollPosition=function(i){};r.persistScrollPosition=function(i){};r._tn=function(h){return (h.nodeName||h.tagName||ub.a).toLowerCase();};r.scrollIntoView=function(m,s,b,a){var
ob=m.parentNode;if(b==null)b=0;if(a==null)a=0;while(ob!=null){var
Za=r._tn(ob);if(Za==ub.l||Za==ub.m){var
Ba=r.getRelativePosition(ob,m);if(ob.clientWidth+ob.scrollLeft<=Ba.L){ob.scrollLeft=Ba.L+m.offsetWidth-ob.clientWidth+b;}else if(b&&ob.clientWidth+ob.scrollLeft<Ba.L+m.offsetWidth)ob.scrollLeft=Ba.L+m.offsetWidth-ob.clientWidth+b;if(ob.scrollLeft>=Ba.L+m.offsetWidth){ob.scrollLeft=Ba.L-b;}else if(b&&ob.scrollLeft>Ba.L)ob.scrollLeft=Ba.L-b;if(ob.clientHeight+ob.scrollTop<=Ba.T){ob.scrollTop=Ba.T+m.offsetHeight-ob.clientHeight+a;}else if(a&&ob.clientHeight+ob.scrollTop<Ba.T+m.offsetHeight)ob.scrollTop=Ba.T+m.offsetHeight-ob.clientHeight+a;if(ob.scrollTop>=Ba.T+m.offsetHeight){ob.scrollTop=Ba.T-a;}else if(a&&ob.scrollTop>Ba.T)ob.scrollTop=Ba.T-a;}if(ob==s)break;ob=ob.parentNode;}};r.getScrollSizeOffset=function(q,b){return 0;};r.addEventListener=function(q,l,d){l=l.replace(ub.n,ub.a);q.addEventListener(l,typeof d==ub.o?d:new
Function(ub.p,d),false);};r.removeEventListener=function(f,j,o){j=j.replace(ub.n,ub.a);f.removeEventListener(j,o,false);};r.removeStyle=function(o,a){o.style.removeProperty(a);};r._FOCUSABLE={input:true,textarea:true,select:true,body:true,a:true,img:true,button:true,frame:true,iframe:true,object:true};r.isFocusable=function(b){return b.focus!=null&&(parseInt(b.tabIndex)>=0||r._FOCUSABLE[r._tn(b)]);};r.createRule=function(o,n,d){if(!d)d=document;var
z=(d.getElementsByTagName(ub.q))[0];var
Za=typeof d.createElementNS!=ub.r?d.createElementNS(ub.s,ub.t):d.createElement(ub.t);var
Ja=d.createTextNode(o+ub.u+n+ub.v);Za.appendChild(Ja);Za.setAttribute(ub.w,ub.x);Za.setAttribute(ub.y,ub.z);z.appendChild(Za);};r.getRuleByName=function(p){var
Q=document.styleSheets;for(var
ha=0;ha<Q.length;ha++){var
I=Q[ha];for(var
nb=0;nb<I.cssRules.length;nb++)if(I.cssRules[nb].selectorText==p)return I.cssRules[nb];}return null;};r.getOuterHTML=function(f){if(window.SVGElement&&f instanceof SVGElement){return (new
XMLSerializer()).serializeToString(f);}else{var
wb=[];switch(f.nodeType){case 1:wb[wb.length]=ub.A+r._tn(f);if(f.namespaceURI)wb[wb.length]=ub.B+f.namespaceURI+ub.C;for(var
db=0;db<f.attributes.length;db++){var
M=f.attributes.item(db);if(M.nodeValue!=null)wb[wb.length]=ub.D+M.nodeName+ub.E+M.nodeValue+ub.C;}if(f.childNodes.length==0)wb[wb.length]=ub.F;else wb[wb.length]=ub.G+f.innerHTML+ub.H+r._tn(f)+ub.G;break;case 3:wb[wb.length]=f.nodeValue;break;case 4:wb[wb.length]=ub.I+f.nodeValue+ub.J;break;case 5:wb[wb.length]=ub.K+f.nodeName+ub.L;break;case 8:wb[wb.length]=ub.M+f.nodeValue+ub.N;break;default:if(f.childNodes)for(var
v=0;v<f.childNodes.length;v++)wb.push(r.getOuterHTML(f.childNodes[v]));break;}return wb.join(ub.a);}};r.setOuterHTML=function(e,p){if(window.SVGElement&&e instanceof SVGElement){if(!p){e.parentNode.removeChild(e);}else{var
T=e.ownerDocument.createRange();T.setStartBefore(e);var
K=T.createContextualFragment(p);e.parentNode.replaceChild(K,e);}}else try{var
T=e.ownerDocument.createRange();T.setStartBefore(e);var
K=T.createContextualFragment(p);e.parentNode.replaceChild(K,e);}catch(Kb){var
P=typeof p==ub.i?p.substring(0,50):p;throw new
jsx3.Exception(jsx3._msg(ub.O,e,P),jsx3.NativeError.wrap(Kb));}};r.removeNode=function(f){f.parentNode.removeChild(f);};r.setInnerText=function(j,k){for(var
nb=j.childNodes.length-1;nb>=0;nb--)j.removeChild(j.childNodes[nb]);j.appendChild(j.ownerDocument.createTextNode(k));};r.insertAdjacentHTML=function(f,b,q){if(b.toLowerCase()==ub.P){var
Db=f.ownerDocument.createRange();Db.setStartAfter(f);var
x=Db.createContextualFragment(q);f.appendChild(x);return q;}else if(b.toLowerCase()==ub.Q){var
Db=f.ownerDocument.createRange();Db.setStartBefore(f);var
x=Db.createContextualFragment(q);f.parentNode.insertBefore(x,f);return q;}else throw new
jsx3.Exception(jsx3._msg(ub.R,b));};r.updateCSSOpacity=function(e,j){e.style.opacity=j.toString();};r.getCSSOpacity=function(e){return ub.S+e+ub.L;};r.getRelativePosition=function(q,o){var
_a={W:o.offsetWidth,H:o.offsetHeight};var
tb=o.scrollLeft;var
mb=o.scrollTop;var
Ta=0;var
lb=0;var
U=o.offsetTop;var
ka=o.offsetLeft;var
pa=o;var
v=0;var
I=0;var
ja;if(o.offsetParent){I=I-o.offsetParent.scrollLeft;v=v-o.offsetParent.scrollTop;ja=o.offsetParent.style.borderLeftWidth?parseInt(o.offsetParent.style.borderLeftWidth):0;if(!isNaN(ja))Ta=Ta+ja;ja=o.offsetParent.style.borderTopWidth?parseInt(o.offsetParent.style.borderTopWidth):0;if(!isNaN(ja))lb=lb+ja;}while((o=o.offsetParent)!=null&&o!=q){U=U+o.offsetTop;ka=ka+o.offsetLeft;if(o.offsetParent){ja=o.offsetParent.style.borderLeftWidth?parseInt(o.offsetParent.style.borderLeftWidth):0;if(!isNaN(ja))Ta=Ta+ja;ja=o.offsetParent.style.borderTopWidth?parseInt(o.offsetParent.style.borderTopWidth):0;if(!isNaN(ja))lb=lb+ja;I=I+o.offsetParent.scrollLeft;v=v+o.offsetParent.scrollTop;}if(o.offsetParent){var
t=o.offsetParent.scrollTop;if(!isNaN(t))v=v-t;var
P=o.offsetParent.scrollLeft;if(!isNaN(P))I=I-P;}}o=pa;while((o=o.parentNode)!=null&&o!=q)if(o.parentNode){var
t=o.parentNode.scrollTop;if(!isNaN(t)&&t>0)v=v-t;var
P=o.parentNode.scrollLeft;if(!isNaN(P)&&P>0)I=I-P;}_a.L=ka+I+2*Ta;_a.T=U+v+2*lb;return _a;};r.copy=function(j){window.clipboardData.setData(ub.T,j);};r.paste=function(){return window.clipboardData.getData(ub.T);};r.mF=jsx3.resolveURI(ub.U);r.wZ=jsx3.resolveURI(ub.V);r.getCSSFade=function(c){return r.getCSSPNG(c?r.mF:r.wZ);};r.getCSSPNG=function(q){return ub.W+q+ub.X;};r.getJSXParent=function(k,d){while(k!=null){if(k.id&&k.id.indexOf(ub.Y)==0){var
u=d?d.getJSXById(k.id):jsx3.GO(k.id);if(u!=null)return u;}if(!k.parentNode){var
gb=k.parentWindow||k.defaultView;k=gb?gb.frameElement:null;}else k=k.parentNode;}return null;};r.removeOutputEscaping=function(o){var
Fa=o?[o]:[];while(Fa.length>0){var
Mb=Fa.shift();if(Mb.nodeName&&r._tn(Mb)==ub.l&&Mb.className==ub.Z){Mb.innerHTML=((((Mb.innerHTML.replace(ub._,ub.A)).replace(ub.aa,ub.G)).replace(ub.ba,ub.C)).replace(ub.ca,ub.K)).replace(ub.da,r.n1);Mb.removeAttribute(ub.ea);}else if(Mb.childNodes)Fa.push.apply(Fa,this.nodesToArray(Mb.childNodes));}};r.removeOutputEscapingSpan=function(m){return m.replace(ub.fa,function(f,e){return ((((e.replace(ub._,ub.A)).replace(ub.aa,ub.G)).replace(ub.ba,ub.C)).replace(ub.ca,ub.K)).replace(ub.da,r.n1);});};r.ju={nbsp:160,copy:169,reg:174,deg:176,middot:183,le:8804,ge:8805,lt:60,gt:62,euro:8364,ndash:8211,mdash:8212,lsquo:8216,rsquo:8217,ldquo:8220,rdquo:8221,permil:8240};r.n1=function(n,l){var
A=r.ju[l];return A?ub.ga+A+ub.L:n;};r.FI=ub.ha;r.loadImages=function(o){var
_a=document.getElementById(r.FI);if(_a==null){var
_=(document.getElementsByTagName(ub.c))[0];if(_){_a=document.createElement(ub.m);_a.id=r.FI;_a.style.display=ub.ia;_.insertBefore(_a,_.firstChild);}else return;}var
Ca=jsx3.$A.is(o)?o:arguments;for(var
pb=0;pb<Ca.length;pb++){if(!Ca[pb])continue;var
Ta=jsx3.resolveURI(Ca[pb]);var
Sa=r.FI+ub.ja+Ta;if(document.getElementById(Sa)==null){var
za=document.createElement(ub.ka);za.setAttribute(ub.la,Sa);za.setAttribute(ub.ma,Ta);_a.appendChild(za);}}};r.updateRule=function(s,l,q){var
pa=jsx3.html.getRuleByName(s);if(pa)pa.style[l]=q;};r.getElementById=function(h,a,o){return this.findElements(h,function(f){return f.id==a;},o,false,false,true);};r.getElementByTagName=function(p,n,d){n=n.toLowerCase();return this.findElements(p,function(c){return r._tn(c)==n;},d,false,false,true);};r.getElementsByTagName=function(h,f,o){f=f.toLowerCase();return this.findElements(h,function(a){return r._tn(a)==f;},o,true,false,true);};r.findElements=function(i,c,p,h,g,k){var
_=p?ub.na:ub.oa;var
O=h?[]:null;var
qa=k?[i]:this.nodesToArray(i.childNodes);while(qa.length>0){var
U=qa.shift();if(c.call(null,U))if(h)O[O.length]=U;else return U;if(!g)qa[_].apply(qa,this.nodesToArray(U.childNodes));}return O;};r.getElmUpByTagName=function(o,d,h){return r.findElementUp(o,function(f){return r._tn(f)==d;},h);};r.findElementUp=function(e,p,q){var
w=e.ownerDocument.documentElement;var
gb=q?e:e.parentNode;while(gb!=null){if(p.call(null,gb))return gb;if(gb==w)break;gb=gb.parentNode;}return null;};r.selectSingleElm=function(s,h){var
L=1,ib=arguments;if(arguments.length==2)if(typeof h==ub.i){L=0;ib=h.split(ub.pa);}else if(jsx3.$A.is(h)){L=0;ib=h;}var
Nb=s;for(var
D=L;Nb!=null&&D<ib.length;D++){var
Pa=ib[D];if(!isNaN(Pa)){var
ga=Number(Pa);var
pa=Nb.childNodes.length;var
nb=0,y=0;for(;nb<pa&&y<ga;nb++)if(Nb.childNodes[nb].nodeType==1)y++;Nb=Nb.childNodes[nb];}else throw new
jsx3.Exception();}return Nb;};r.nodesToArray=function(n){var
z=new
Array(n.length);for(var
aa=0;aa<n.length;aa++)z[aa]=n[aa];return z;};r.getSelection=function(c){return new
r.Selection(c);};r.focusNext=function(c,j){var
vb=c;while(vb.lastChild)vb=vb.lastChild;while(!r.isFocusable(vb)&&vb!=c)vb=vb.previousSibling||vb.parentNode;if(vb!=c||r.isFocusable(vb))if(vb.onfocus!=null){var
A=vb.onfocus;vb.onfocus=null;vb.focus();jsx3.sleep(function(){vb.onfocus=A;});}else vb.focus();};r.focusPrevious=function(b,n){var
A=this.findElements(b,function(o){return r.isFocusable(o);},true,false,false,true);if(A!=null)if(A.onfocus!=null){var
Da=A.onfocus;A.onfocus=null;A.focus();jsx3.sleep(function(){A.onfocus=Da;});}else A.focus();};r._CANTAB=ub.qa;r.focus=function(h){if(h.focus&&r._CANTAB.indexOf((ub.D+h.tagName+ub.D).toUpperCase())>=0){try{h.focus();}catch(Kb){}}else jsx3.gui.Event.dispatchMouseEvent(h,ub.ra,{});};r.addClass=function(g,k){var
nb=g.className;if(nb){if(!(jsx3.$A(nb.split(ub.sa))).contains(k))g.className=nb+ub.D+k;}else g.className=k;};r.removeClass=function(c,g){var
Fb=c.className;if(Fb&&Fb.indexOf(g)>=0){var
Ib=jsx3.$A(Fb.split(ub.sa));if(Ib.remove(g))c.className=Ib.join(ub.D);}};});jsx3.Class.defineClass("jsx3.html.Selection",null,null,function(f,s){var
ub={a:"end"};s.init=function(g){this.M6={elm:g,start:g.selectionStart,end:g.selectionEnd,scrollt:g.scrollTop,scrolll:g.scrollLeft};};s.getStartIndex=function(){return this.M6.start;};s.getEndIndex=function(){return this.M6.end;};s.setRange=function(n,b){this.M6.start=n;this.M6.end=b;this.M6.elm.setSelectionRange(n,b);};s.getOffsetLeft=function(){if(this.M6.pos==null)this.M6.pos=jsx3.html.getRelativePosition(null,this.M6.elm);return this.M6.pos.L;};s.getOffsetTop=function(){if(this.M6.pos==null)this.M6.pos=jsx3.html.getRelativePosition(null,this.M6.elm);return this.M6.pos.T;};s.getText=function(){return this.M6.elm.value.substring(this.M6.start,this.M6.end);};s.setText=function(c){this.M6.elm.value=this.M6.elm.value.substring(0,this.M6.start)+c+this.M6.elm.value.substring(this.M6.end);this.M6.elm.setSelectionRange(this.M6.start,this.M6.start+c.length);this.M6.elm.end=this.M6.elm.selectionEnd;};s.insertCaret=function(h){this.M6.elm.focus();if(h==ub.a){this.M6.elm.setSelectionRange(this.M6.elm.end,this.M6.elm.end);}else throw new
jsx3.Exception();this.M6.elm.scrollTop=this.M6.scrollt;this.M6.elm.scrollLeft=this.M6.scrolll;};});jsx3.Class.defineClass("jsx3.app.Cache",null,[jsx3.util.EventDispatcher],function(c,l){var
ub={a:"remove",b:"add",c:"change",d:"http://xsd.tns.tibco.com/gi/cache",e:'<loading xmlns="',f:'"/>',g:'<timeout xmlns="',h:'<error xmlns="',i:"*",j:"p1",k:"_jsxcacheid",l:"response",m:"timeout",n:"error",o:"load.",p:"load",q:"strId",r:"objDocument",s:"de",t:"PX"};var
yb=jsx3.xml.Document;c.REMOVE=ub.a;c.ADD=ub.b;c.CHANGE=ub.c;c.ASYNC_TIMEOUT=60000;c.XSDNS=ub.d;c.zt=(new
yb()).loadXML(ub.e+c.XSDNS+ub.f);c.Iw=(new
yb()).loadXML(ub.g+c.XSDNS+ub.f);c.X7=(new
yb()).loadXML(ub.h+c.XSDNS+ub.f);l.init=function(){this.de={};this.PX=[];};l.addParent=function(d){this.PX.push(d);};l.clearById=function(j){var
Db=this.de[j];if(Db){delete this.de[j];this.publish({subject:j,action:ub.a});this.publish({subject:ub.c,id:j,action:ub.a});return Db.kD;}};l.isSystem=function(i){return false;};l.clearByTimestamp=function(e){if(e instanceof Date)e=e.getTime();var
Z=false;var
H=[];for(var ab in this.de){var
Ab=this.de[ab];if(Ab.tH<e){delete this.de[ab];this.publish({subject:ab,action:ub.a});H.push(ab);}}if(H.length>0)this.publish({subject:ub.c,ids:H,action:ub.a});return H;};l.getDocument=function(q){if(this.de[q]!=null)return this.de[q].kD;for(var
u=0;u<this.PX.length;u++){var
nb=this.PX[u].getDocument(q);if(nb!=null)return nb;}return null;};l.getOrOpenDocument=function(h,f,e){if(f==null)f=h.toString();return this.getDocument(f)||this.JD(h,f,e,false);};l.openDocument=function(q,p,o){return this.JD(q,p,o,false);};l.getOrOpenAsync=function(b,m,a){if(m==null)m=b.toString();return this.getDocument(m)||this.JD(b,m,a,true);};l.JD=function(e,i,h,f){if(h==null)h=yb.jsxclass;if(i==null)i=e.toString();var
gb=h.newInstance();gb.setAsync(f);if(f){gb.subscribe(ub.i,this,ub.j);gb._jsxcacheid=i;gb.load(e,c.ASYNC_TIMEOUT);gb=c.zt.cloneDocument();}else gb.load(e);this.setDocument(i,gb);return gb;};l.p1=function(o){var
fb=o.target;var
vb=o.subject;var
Mb=fb._jsxcacheid;delete fb[ub.k];fb.unsubscribe(ub.i,this);if(this.de){var
_;if(vb==ub.l){_=fb;}else if(vb==ub.m){_=c.Iw.cloneDocument();}else if(vb==ub.n){_=c.X7.cloneDocument();_.setAttribute(ub.n,(fb.getError()).toString());}else return;this.setDocument(Mb,_);this.publish({subject:ub.o+Mb,action:ub.p,response:vb,id:Mb});}};l.setDocument=function(m,f){if(m==null)throw new
jsx3.IllegalArgumentException(ub.q,m);if(f==null)throw new
jsx3.IllegalArgumentException(ub.r,f);var
vb={};vb.tH=(new
Date()).getTime();vb.kD=f;var
v=this.de[m]?ub.c:ub.b;this.de[m]=vb;this.publish({subject:m,action:v,id:m});this.publish({subject:ub.c,action:v,id:m});};l.getTimestamp=function(h){var
Aa=this.de[h];return Aa!=null?Aa.tH:null;};l.keys=function(){var
oa=[];for(var Mb in this.de)oa[oa.length]=Mb;return oa;};l.destroy=function(){delete this[ub.s];delete this[ub.t];};});jsx3.Cache=jsx3.app.Cache;jsx3.Class.defineClass("jsx3.app.Properties",null,null,function(m,d){var
ub={a:"_global",b:"./record",c:"jsxid",d:"eval",e:"jsxtext",f:"1",g:"true",h:"props.eval",i:"load",j:"undefined",k:"strValue"};var
pb=jsx3.util.Logger.getLogger(m.jsxclass.getName());m.MC=ub.a;d.init=function(){this.PX=[];this._P=[];this.OE=[m.MC];this.nU={};this.nU[m.MC]={};this.AU={};this.kE=false;this.HO={};this.MK=false;};d.loadXML=function(e,b){var
F=new
jsx3.util.Timer(m.jsxclass,b||(e instanceof jsx3.xml.Document?e.getSourceURL():e.getNodeName()));if(b==null){b=m.MC;}else if(jsx3.util.arrIndexOf(this.OE,b)<0)this.OE.splice(1,0,b);var
sb=this.nU[b];if(sb==null)sb=this.nU[b]={};for(var
ea=e.selectNodeIterator(ub.b);ea.hasNext();){var
R=ea.next();var
pa=R.getAttribute(ub.c);var
eval=R.getAttribute(ub.d);var
Da=R.getAttribute(ub.e);if(eval==ub.f||eval==ub.g)try{Da=isNaN(Da)?jsx3.eval(Da):Number(Da);}catch(Kb){pb.warn(jsx3._msg(ub.h,pa,Da),jsx3.NativeError.wrap(Kb));}sb[pa]=Da;}this.kE=true;F.log(ub.i);};d.addParent=function(b){this.PX.splice(0,0,b);b._P.push(this);this.uR(true);};d.removeParent=function(a){var
oa=jsx3.util.arrIndexOf(this.PX,a);if(oa>=0){this.PX.splice(oa,1);a.RT(this);this.uR(true);}};d.RT=function(s){var
Ha=jsx3.util.arrIndexOf(this._P,s);if(Ha>=0)this._P.splice(Ha,1);};d.removeAllParents=function(){if(this.PX.length>0){for(var
sa=0;sa<this.PX.length;sa++)this.PX[sa].RT(this);this.PX=[];this.MK=false;this.HO={};}};d.getParents=function(){return this.PX.concat();};d.containsKey=function(h){if(this.kE)this.mO();return typeof this.AU[h]!=ub.j;};d.getKeys=function(){if(this.kE)this.mO();var
x=[];for(var da in this.AU)x[x.length]=da;return x;};d.get=function(g){if(this.kE)this.mO();if(typeof this.AU[g]!=ub.j)return this.AU[g];if(this.MK)this.rO();return this.HO[g];};d.set=function(s,h){if(typeof h==ub.j)throw new
jsx3.IllegalArgumentException(ub.k,h);this.nU[m.MC][s]=h;this.AU[s]=h;this.uR();};d.remove=function(f){for(var aa in this.nU)delete this.nU[aa][f];delete this.AU[f];this.uR();};d.mO=function(){this.kE=false;var
xa=this.AU={};for(var
ca=this.OE.length-1;ca>=0;ca--){var
fa=this.nU[this.OE[ca]];for(var ab in fa)xa[ab]=fa[ab];}};d.rO=function(){this.MK=false;var
X=this.HO={};for(var
Oa=this.PX.length-1;Oa>=0;Oa--){var
Bb=this.PX[Oa];if(Bb.kE)Bb.mO();if(Bb.MK)Bb.rO();var
Ab=Bb.AU;var
rb=Bb.HO;for(var da in rb)X[da]=rb[da];for(var da in Ab)X[da]=Ab[da];}};d.uR=function(b){var
Ta=b?[this]:this._P.concat();while(Ta.length>0){var
Ba=Ta.shift();if(!Ba.MK){Ba.MK=true;Ta.push.apply(Ta,Ba._P);}}};});jsx3.Class.defineClass("jsx3.app.PropsBundle",jsx3.app.Properties,null,function(e,j){var
ub={a:".",b:"::",c:"propbn.err_key",d:"",e:"*",f:"propbn.err_file",g:"/data/locale",h:"key",i:"Parent of bundle ",j:" (",k:") is null.",l:"locales",m:/\s*,\s*/};var
Na=jsx3.util.Logger.getLogger(e.jsxclass.getName());var
Ja=jsx3.util.Job;e.w6=ub.a;e.hN=-1;e.HB={};e.q9={};e.Ky=new
jsx3.util.JobGraph();e.FZ=new
e();e.getProps=function(g,m,i){if(!m)m=jsx3.System.getLocale();var
G=g+ub.b+m;if(!e.q9[G]){var
La=e.Ky;if(La.node(g))return e.FZ;var
pb=new
Ja(g);e.rD(g,m,i,false,pb);}var
Aa=e.q9[G];if(Aa==e.hN)throw new
jsx3.Exception(jsx3._msg(ub.c,g,m));return Aa;};e.getPropsFT=function(r,p,f){try{return e.getProps(r,p,f);}catch(Kb){}var
C=jsx3.util.Locale.ROOT;if(!p||!p.equals(C))try{return e.getProps(r,C,f);}catch(Kb){}return new
e();};e.getPropsAsync=function(g,k,s,i){if(!k)k=jsx3.System.getLocale();var
H=g+ub.b+k;var
A=new
Ja(null,function(){var
ya=e.q9[H];s(ya!=e.hN?ya:null);});e.rD(g,k,i,true,A);};e.rD=function(b,h,n,k,o){var
La=e.Ky;b=b.toString();La.pause();La.add(o);var
Eb=o;var
L=h.getSearchPath();for(var
Ia=0;Ia<L.length;Ia++){var
la=L[Ia];var
kb=b+ub.b+la;if(e.q9[kb])break;var
_a=La.node(kb);if(!_a){_a=e.OH(kb,b,la,n,k);La.add(_a);_a.add(Eb);}else{_a.add(Eb);break;}Eb=_a;}La.start();};e.OH=function(b,f,r,c,g){return new
Ja(b,function(){var
va=this;e.TU(b,f,r,c,g,function(){va.finish();});return 0;});};e.TU=function(d,q,i,r,o,l){var
mb=e.q9,Qa=e.HB;var
db=false,Oa=false;if(mb[d]){Oa=true;}else if(i.toString()==ub.d){db=true;}else if(!Qa[q][i]){var
wb=i.getSearchPath();for(var
ya=1;!mb[d]&&ya<wb.length;ya++){var
O=wb[ya];var
_=q+ub.b+O;mb[d]=mb[_];}Oa=true;}if(Oa){l();return;}var
wa;if(db){Qa[q]={};wa=q;}else{var
Ua=q.lastIndexOf(ub.a);wa=q.substring(0,Ua)+e.w6+i+q.substring(Ua);}var
x=null,za=false;if(r)x=r.getDocument(wa);if(x){za=true;r=null;}else{x=new
jsx3.xml.Document();if(o){x.setAsync(true);x.subscribe(ub.e,e,function(n){e.IJ(d,q,i,r,n.target,l);});}else za=true;x.load(wa);}if(za)e.IJ(d,q,i,r,x,l);};e.IJ=function(g,d,a,l,i,r){var
V=i.getSourceURL();if(!i.hasError()){if(l&&V)l.setDocument(V,i);e.yB(d,i);e.jB(d,a,i);}else{Na.error(jsx3._msg(ub.f,V,i.getError()));e.q9[g]=e.hN;}r();};e.jB=function(c,i,m){for(var
La=m.selectNodeIterator(ub.g);La.hasNext();){var
la=La.next();var
xb=la.getAttribute(ub.h)||ub.d;e.ap(c,xb,la);e.HB[c][xb]=true;}if(!e.q9[c+ub.b+i])e.ap(c,i.toString(),m);};e.ap=function(h,c,r){var
Pa=e.q9;var
Ga=new
e();Ga.loadXML(r);Ga.nM=h;Ga.IB=jsx3.util.Locale.valueOf(c);Pa[h+ub.b+c]=Ga;if(c){var
Va=Ga.IB.getSearchPath();for(var
ab=1;ab<Va.length;ab++){var
Ca=Pa[h+ub.b+Va[ab]];if(Ca){Ga.addParent(Ca);return;}}Na.error(ub.i+h+ub.j+c+ub.k);}};e.yB=function(g,q){var
la=q.getAttribute(ub.l);if(e.HB[g]==null)e.HB[g]={};if(la!=null){var
Aa=la.split(ub.m);for(var
z=0;z<Aa.length;z++)if(Aa[z])e.HB[g][Aa[z]]=true;}};j.getLocale=function(){return this.IB;};j.getPath=function(){return this.nM;};e.clearCache=function(a,g){if(a){delete e.HB[a];var
Ea=a+ub.b;for(var H in e.q9)if(H.indexOf(Ea)==0)delete e.q9[H];if(g){var
Q=g.keys();for(var
Ra=0;Ra<Q.length;Ra++)if(Q[Ra].indexOf(a)==0)g.clearById(Q[Ra]);}}else{e.HB={};e.q9={};}};});jsx3.Class.defineClass("jsx3.lang.System",null,null,function(g,o){var
ub={a:"_",b:"jsx:///locale/locale.xml",c:"",d:" ",e:"_jsx_",f:"namespace",g:"apppathrel",h:"apppath",i:"3.8.1_517db",j:/\d/,k:"3.8.1"};var
jb=jsx3.app.PropsBundle;g.LJSS=new
jsx3.app.Properties();g.JSS=new
jsx3.app.Properties();g.JSS.addParent(g.LJSS);g.m6={};g.getProperty=function(r){return g.JSS.get(r);};g.getLocale=function(){if(g.IB==null&&jsx3.util.Locale){var
ba=jsx3.app.Browser.getLocaleString();if(ba){var
Eb=ba.split(ub.a);g.IB=new
jsx3.util.Locale(Eb[0],Eb[1]);}else g.IB=jsx3.util.Locale.US;}return g.IB;};g.setLocale=function(l){if(l!=g.IB){g.JSS.removeParent(g.getLocaleProperties());g.IB=l;g.JSS.addParent(g.getLocaleProperties());}};g.reloadLocalizedResources=function(){if(jb){var
Nb=g.LJSS.getParents();g.LJSS.removeAllParents();for(var
Bb=0;Bb<Nb.length;Bb++)g.LJSS.addParent(jb.getPropsFT(Nb[Bb].getPath(),g.getLocale(),jsx3.getSystemCache()));}};g.T0=jsx3.resolveURI(ub.b);g.getLocaleProperties=function(j){return jb.getPropsFT(g.T0,j,jsx3.getSystemCache());};g.getMessage=function(r,i){var
Y=g.LJSS.get(r);var
x=ub.c;if(arguments.length>1){var
z=jsx3.Method.argsAsArray(arguments,1);if(Y!=null&&jsx3.util.MessageFormat){try{var
ka=new
jsx3.util.MessageFormat(Y);return ka.format(z);}catch(Kb){}}else x=ub.d+z.join(ub.d);}if(Y==null)Y=r;return Y+x;};g.GO=function(r,d){var
mb=null;if(r!=null)if(r.indexOf(ub.e)==0){var
eb=jsx3.app.DOM.getNamespaceForId(r);if(d&&d!=eb)return null;if(g.m6[eb])mb=g.m6[eb].getJSXById(r);}else if(d){if(g.m6[d])mb=g.m6[d].getJSXByName(r);}else for(var Ha in g.m6)if((mb=g.m6[Ha].getJSXByName(r))!=null)return mb;return mb;};g.getApp=function(s){return g.m6[s];};g.getAllApps=function(){var
Gb=[];for(var bb in g.m6)Gb.push(g.m6[bb]);return Gb;};g.registerApp=function(p){var
vb=p.getEnv(ub.f);jsx3.lang.setVar(vb,p);g.m6[vb]=p;};g.deregisterApp=function(p){var
ha=p.getEnv(ub.f);var
Lb=jsx3.lang.getVar(ha);if(p==Lb)jsx3.lang.setVar(p.getEnv(ub.f),null);if(g.m6[ha]==p)delete g.m6[ha];};g.activateApp=function(q){jsx3.registerApp(q);};g.getAppByPath=function(f){for(var H in g.m6){var
kb=g.m6[H];if(kb.getEnv(ub.g)==f||kb.getEnv(ub.h)==f)return kb;}return null;};g.bM=[];g.h3={};g.registerAddin=function(b,a){jsx3.lang.setVar(b,a);g.bM.push(a);g.h3[a.getKey()]=a;};g.getAddins=function(){return g.bM.concat();};g.getAddin=function(i){return g.h3[i];};g.getVersion=function(){var
ca=ub.i;return ca.match(ub.j)?ca:ub.k;};});jsx3.GO=jsx3.lang.System.GO;jsx3.getApp=jsx3.lang.System.getApp;jsx3.registerApp=jsx3.lang.System.registerApp;jsx3.activateApp=jsx3.lang.System.activateApp;jsx3.deregisterApp=jsx3.lang.System.deregisterApp;jsx3.getVersion=jsx3.lang.System.getVersion;jsx3.Class.defineInterface("jsx3.xml.CDF",null,function(e,b){var
ub={A:"//record",B:"",C:"'",D:"//*[@jsxid='",E:"']",F:'//*[@jsxid="',G:'"]',H:"//record[not(@jsxid)]",I:/\[(\w+)\]$/,J:"name()='",K:" or ",L:"substring(.,1,1)='{' and substring(.,string-length(.),1)='}'",M:"//@*[(",N:") and (",O:")]",P:"undefined",Q:"//@",R:" | //@",S:"{",T:"}",U:"<",V:' jsxid="jsxroot"/>',W:"jsx_",X:"3.00.00",a:"data",b:"record",c:"jsxid",d:"jsxtext",e:"jsxexecute",f:"jsxdisabled",g:"jsxselected",h:"jsxunselectable",i:"jsximg",j:"jsxtip",k:"jsxkeycode",l:"jsxstyle",m:"jsxclass",n:"objRecord",o:"objRecordNode",p:"cdf.prop_ins",q:"cdf.prop_del",r:"strRecordId",s:"intAction",t:"string",u:"cdf.adopt_col",v:"cdf.adopt_dest",w:"cdf.adopt_src",x:"adoptRecord() no object with id: ",y:"cdf.before_col",z:"cdf.before_rec"};e.aM=jsx3.util.Logger.getLogger(e.jsxclass.getName());e.DELETE=0;e.INSERT=1;e.UPDATE=2;e.INSERTBEFORE=3;e.ELEM_ROOT=ub.a;e.ELEM_RECORD=ub.b;e.ATTR_ID=ub.c;e.ATTR_TEXT=ub.d;e.ATTR_EXECUTE=ub.e;e.ATTR_DISABLED=ub.f;e.ATTR_SELECTED=ub.g;e.ATTR_UNSELECTABLE=ub.h;e.ATTR_IMG=ub.i;e.ATTR_TIP=ub.j;e.ATTR_KEYCODE=ub.k;e.Wo=[ub.d,ub.j,ub.i,ub.k,ub.l,ub.m];e.uv=1;b.insertRecord=function(q,i,c){if(q instanceof Object){var
Y=this.getXML();var
I=1;var
Jb=Y.selectSingleNode(this.Ee(q.jsxid));if(Jb!=null){I=2;}else{Jb=Y.createNode(1,ub.b);var
kb=i!=null?Y.selectSingleNode(this.Ee(i)):null;if(kb==null)kb=Y.getRootNode();kb.appendChild(Jb);}for(var pb in q)if(q[pb]!=null)Jb.setAttribute(pb,q[pb].toString());if(c!==false)this.redrawRecord(q[ub.c],I);return Jb;}else throw new
jsx3.IllegalArgumentException(ub.n,q);};b.insertRecordNode=function(o,g,k){if(o instanceof jsx3.xml.Entity){var
yb=this.getXML();var
Ea=1;var
Oa=yb.selectSingleNode(this.Ee(o.getAttribute(ub.c)));if(Oa!=null){Ea=2;(Oa.getParent()).replaceNode(o,Oa);}else{var
ua=g!=null?yb.selectSingleNode(this.Ee(g)):null;if(ua==null)ua=yb.getRootNode();ua.appendChild(o);}if(k!==false)this.redrawRecord(o.getAttribute(ub.c),Ea);}else throw new
jsx3.IllegalArgumentException(ub.o,o);};b.insertRecordProperty=function(d,q,r,s){var
K=this.getRecordNode(d);if(K!=null){K.setAttribute(q,r);if(s!==false)this.redrawRecord(d,2);}else e.aM.debug(jsx3._msg(ub.p,d));return this;};b.deleteRecordProperty=function(p,j,k){var
ja=this.getXML();var
tb=ja.selectSingleNode(this.Ee(p));if(tb!=null){tb.removeAttribute(j);if(k!==false)this.redrawRecord(p,2);}else e.aM.debug(jsx3._msg(ub.q,p));};b.redrawRecord=jsx3.Method.newAbstract(ub.r,ub.s);b.adoptRecord=function(c,k,l,f){var
Kb=c;if(typeof c==ub.t)Kb=jsx3.GO(c);if(Kb!=null){var
Oa=Kb.getRecordNode(k);if(Oa!=null){var
Ka=l==null?(this.getXML()).getRootNode():this.getRecordNode(l);if(Ka!=null){var
rb=Ka;while(rb!=null&&!rb.equals(Oa))rb=rb.getParent();if(rb==null){if(Kb!=this){var
Lb=this.getRecordNode(k);if(Lb!=null){e.aM.debug(jsx3._msg(ub.u,this,k));return;}}var
Va=Kb.deleteRecord(k);this.insertRecordNode(Va,l,f);return this.getRecordNode(k);}else{}}else e.aM.debug(jsx3._msg(ub.v,this,k,l));}else e.aM.debug(jsx3._msg(ub.w,this,k,Kb));}else e.aM.debug(ub.x+c);};b.insertRecordBefore=function(p,r,m){var
S=this.getXML();var
Cb=S.selectSingleNode(this.Ee(p.jsxid));if(Cb){e.aM.debug(jsx3._msg(ub.y,p.jsxid,this));}else{var
Mb=S.selectSingleNode(this.Ee(r));if(Mb!=null&&Mb.getParent()!=null){var
oa=this.insertRecord(p,(Mb.getParent()).getAttribute(ub.c),false);if(oa){this.adoptRecordBefore(this,p.jsxid,r,m);return oa;}}else e.aM.debug(jsx3._msg(ub.z,r,this));}};b.adoptRecordBefore=function(k,c,r,q){var
u=k;if(typeof k==ub.t)u=jsx3.GO(k);if(u==this&&c==r){}else{var
na=(this.getRecordNode(r)).getParent();var
Ua=na.getAttribute(ub.c);var
ib=this.adoptRecord(k,c,Ua,false);if(ib){var
R=this.getRecordNode(r);na.insertBefore(ib,R);if(q!==false)this.redrawRecord(ib.getAttribute(ub.c),3);return ib;}}};b.deleteRecord=function(h,c){var
v=this.getXML();var
Ma=v.selectSingleNode(this.Ee(h));if(Ma!=null){Ma=(Ma.getParent()).removeChild(Ma);if(c!==false)this.redrawRecord(h,0);return Ma;}return null;};b.getRecord=function(a){var
ha=this.getRecordNode(a);if(ha!=null){var
fb={};var
tb=ha.getAttributeNames();for(var
Z=0;Z<tb.length;Z++)fb[tb[Z]]=ha.getAttribute(tb[Z]);return fb;}return null;};b.getRecordIds=function(){var
T=[];var
B=this.getXML();var
Ga=B.selectNodeIterator(ub.A);while(Ga.hasNext()){var
F=Ga.next();T.push(F.getAttribute(ub.c));}return T;};b.getRecordNode=function(j){var
rb=this.getXML();return rb.selectSingleNode(this.Ee(j));};b.Ee=function(l){return (l+ub.B).indexOf(ub.C)==-1?ub.D+l+ub.E:ub.F+l+ub.G;};b.resetData=function(d){if(jsx3.xml.Cacheable&&this.instanceOf(jsx3.xml.Cacheable)){this.clearXmlData();if(d)this.repaint();}};b.reloadFromSource=function(o){if(jsx3.xml.Cacheable&&this.instanceOf(jsx3.xml.Cacheable))this.resetXmlCacheData();};b.assignIds=function(){var
_a=this.getXML();for(var
ma=_a.selectNodeIterator(ub.H);ma.hasNext();){var
va=ma.next();va.setAttribute(ub.c,e.getKey());}};e.zp=ub.I;b.convertProperties=function(h,s,a){if(s==null)s=e.Wo;else if(a)s.push.apply(s,e.Wo);if(jsx3.getXmlVersion()>3&&!jsx3.CLASS_LOADER.SAF){var
rb=new
Array(s.length);for(var
Sa=0;Sa<s.length;Sa++)rb[Sa]=ub.J+s[Sa]+ub.C;var
S=rb.join(ub.K);var
zb=ub.L;var
M=ub.M+S+ub.N+zb+ub.O;for(var
Sa=(this.getXML()).selectNodeIterator(M);Sa.hasNext();){var
I=Sa.next();var
Ja=I.getValue();var
sa=Ja.substring(1,Ja.length-1);var
A=null;if(sa.match(e.zp)){sa=RegExp.leftContext;A=RegExp.$1;}var
Xa=h.get(sa);if(typeof Xa!=ub.P)if(A!=null&&Xa instanceof Object)I.setValue(Xa[A]);else I.setValue(Xa);}}else{var
M=ub.Q+s.join(ub.R);for(var
ba=(this.getXML()).selectNodeIterator(M);ba.hasNext();){var
I=ba.next();var
Ja=I.getValue();if(Ja.indexOf(ub.S)==0&&jsx3.util.strEndsWith(Ja,ub.T)){var
sa=Ja.substring(1,Ja.length-1);var
A=null;if(sa.match(e.zp)){sa=RegExp.leftContext;A=RegExp.$1;}var
Xa=h.get(sa);if(typeof Xa!=ub.P)if(A!=null&&Xa instanceof Object)I.setValue(Xa[A]);else I.setValue(Xa);}}}};e.newDocument=function(){var
xb=new
jsx3.xml.Document();xb.loadXML(ub.U+ub.a+ub.V);return xb;};e.getKey=function(){return ub.W+(e.uv++
).toString(36);};e.getVersion=function(){return ub.X;};});jsx3.Class.defineClass("jsx3.xml.CDF.Document",jsx3.xml.Document,[jsx3.xml.CDF],function(f,n){var
ub={a:"<",b:"data",c:' jsxid="jsxroot"/>'};n.getXML=function(){return this;};n.redrawRecord=function(a,l){};n.cloneDocument=function(){return f.wrap(this.jsxsuper());};f.newDocument=function(){var
Q=new
f();Q.loadXML(ub.a+ub.b+ub.c);return Q;};f.wrap=function(k){return new
f(k.getNativeDocument());};});jsx3.CDF=jsx3.xml.CDF;jsx3.Class.defineClass("jsx3.app.DOM",null,[jsx3.util.EventDispatcher],function(e,q){var
ub={a:"change",b:"_jsx_",c:"_",d:"mH",e:"QH",f:""};e.Xz={};e.U4={};e.j6={};e.Z8=0;e.TYPEADD=0;e.TYPEREMOVE=1;e.TYPEREARRANGE=2;e.EVENT_CHANGE=ub.a;e.newId=function(d){var
la=e.D9(d);return ub.b+la+ub.c+(e.NU(la)).toString(36);};e.D9=function(m){if(e.U4[m]==null){var
Eb=(e.Z8++
).toString(36);e.U4[m]=Eb;e.j6[Eb]=m;}return e.U4[m];};e.NU=function(m){if(e.Xz[m]==null)e.Xz[m]=0;return ++e.Xz[m];};e.getNamespaceForId=function(i){var
G=i.substring(5,i.indexOf(ub.c,5));return e.j6[G];};q.init=function(){this.mH={};this.QH={};};q.destroy=function(){delete this[ub.d];delete this[ub.e];};q.get=function(d){return this.mH[d]||this.getByName(d);};q.getByName=function(i){var
Jb=this.QH[i];return Jb!=null?Jb.get(0):null;};e.l9=[];q.getAllByName=function(j){var
W=this.QH[j];return W!=null?W.toArray():e.l9;};q.getById=function(f){return this.mH[f];};q.add=function(b){this.mH[b.getId()]=b;var
gb=b.getName();if(gb!=null&&gb!==ub.f)if(this.QH[gb]==null)this.QH[gb]=jsx3.util.List.wrap([b]);else this.QH[gb].add(b,0);};q.remove=function(i){delete this.mH[i.getId()];var
ka=this.QH[i.getName()];if(ka!=null)ka.remove(i);};q.onNameChange=function(d,s){var
O=this.QH[s];if(O!=null)O.remove(d);var
ta=d.getName();if(ta!=null&&ta!==ub.f)if(this.QH[ta]==null)this.QH[ta]=jsx3.util.List.wrap([d]);else this.QH[ta].add(d,0);};q.onChange=function(f,l,g){this.publish({subject:ub.a,type:f,parentId:l,jsxId:g});};});jsx3.DOM=jsx3.app.DOM;jsx3.Class.defineClass("jsx3.app.Server",null,[jsx3.util.EventDispatcher,jsx3.net.URIResolver],function(o,a){var
ub={A:"@Solid Light",Aa:"height:",B:"GUIREF",Ba:"HEIGHT",C:"NAMESPACE",Ca:'<div id="',D:"JSXINVISIBLE",Da:'" style="position:',E:'<div class="jsx30block jsx30env">',Ea:'"></div>',F:"<b>Version:</b> ",Fa:"serv.err_paint",G:"3.8.1; build 517db",Ga:"onload",H:"<br/>",Ha:"serv.err_onload",I:"<b>XML Version:</b> ",Ia:"jsx3.app.Server.help.",J:"<b>System Locale:</b> ",Ja:"jsx3.app.Server.help",K:"<b>Browser:</b> ",Ka:"R9",L:"<b>Operating System:</b> ",La:"objectseturl",M:" (",Ma:"px",N:")",Na:"?",O:"<hr/>",Oa:"&",P:"<b>",Pa:"css",Q:"namespace",Qa:"jss",R:"</b>",Ra:"ljss",S:"<div>",Sa:"serv.err_jss",T:"<b>Path:</b> ",Ta:"xml",U:"version",Ua:"xsl",V:"</div>",Va:"script",W:"config.xml",Wa:"services",X:"JSX_SETTINGS",Xa:"jsx3.net.Service",Y:"serv.err_set",Ya:"strType",Z:"apppath",Za:"serv.err_unload",_:"onunload",_a:"includes",a:"inited",aa:"serv.err_onun",ab:"serv.err_badid",b:"help",ba:"jsx3.gui.Painted",bb:"=",c:"JSX",ca:"LIQUID",cb:"; expires=",d:"jsxsettings",da:"_jsxje",db:"; path=",e:/\/*$/,ea:"change",eb:"; domain=",f:"",fa:"keydown",fb:"; secure",g:"undefined",ga:"checkHotKeys",gb:"; ",h:"object",ha:"jsx3.gui.Alerts",hb:"jsx3.gui.Window",i:"/",ia:"BODYHOTKEYS",ib:"JSXWINDOWS",j:"JSXAPPS",ja:"Y5",jb:"strName",k:"liquid",ka:"jsx3.app.Server.",kb:"serv.win_err",l:"eventsvers",la:"();",lb:"serv.win_notwin",m:"jsxversion",ma:"if (jsx3.EventHelp.isDragging()) jsx3.EventHelp.reset();",mb:"serv.win_name",n:"3.1",na:"OVERFLOW",nb:"3.2",o:"jsxabspath",oa:"overflow:auto;",ob:"apppathuri",p:"serv.no_ns",pa:"overflow:hidden;",pb:"apppathabs",q:"caption",qa:"POSITION",qb:"apppathrel",r:"cancelrightclick",ra:"relative",rb:"jsxapp",s:"return false;",sa:"absolute",sb:/\//g,t:"cancelerror",ta:"left:",tb:"!",u:"jsx3.gui.Block",ua:"LEFT",ub:/!/g,v:"JSXROOT",va:";",vb:"default_locale",w:"jsxbgcolor",wa:"top:",wb:"addins",x:"@Solid DarkShadow",xa:"TOP",xb:" ",y:"JSXBODY",ya:"width:",yb:":",z:"100%",za:"WIDTH",zb:"3.00.00"};jsx3.util.EventDispatcher.jsxclass.mixin(o);var
Pa=jsx3.gui.Event;var
Qa=jsx3.net.URIResolver;var
Sa=jsx3.app.Browser;var
ea=null;var
na=jsx3.util.Logger.getLogger(o.jsxclass.getName());o.Z_DIALOG=2;o.Z_DRAG=3;o.Z_MENU=4;o.INITED=ub.a;o.HELP=ub.b;o.sR=ub.c;o.Q4=new
jsx3.util.List();a.JSXROOT=null;a.JSXBODY=null;a.Cache=null;a.ENVIRONMENT=null;a.DOM=null;a.JSS=null;a.init=function(m,h,p,r){this.DOM=new
jsx3.app.DOM();this.Cache=new
jsx3.app.Cache();this.Cache.addParent(jsx3.getSharedCache());if(r!=null&&r.jsxsettings!=null){this._jsxQZ=r.jsxsettings;delete r[ub.d];}this.ENVIRONMENT=r=r!=null?jsx3.clone(r):{};r.apppath=m.replace(ub.e,ub.f);var
Na=this.getSettings();var
cb=Na.get();for(var _ in cb){var
Ia=_.toLowerCase();if(typeof r[Ia]==ub.g&&typeof cb[_]!=ub.h)r[Ia]=cb[_];}r.apppathuri=new
jsx3.net.URI(r.apppath+ub.i);if(r.jsxappbase)r.apppathuri=r.apppathuri.resolve(r.jsxappbase);var
Nb=r.apppath.indexOf(ub.j);if(Nb>=0)r.apppathrel=r.apppath.substring(Nb+"JSXAPPS".length+1);r.apppathabs=(Sa.getLocation()).resolve(r.apppathuri);if(r[ub.k]==null)r[ub.k]=true;if(r[ub.l]==null)r[ub.l]=3;if(r[ub.m]==null)r[ub.m]=ub.n;r.abspath=jsx3.getEnv(ub.o);r.guiref=h;r.namespace=r.jsxappns||r.namespace;if(r.namespace==null)throw new
jsx3.Exception(jsx3._msg(ub.p,m));if(h&&this.getEnv(ub.q))h.ownerDocument.title=this.getEnv(ub.q);if(h&&this.getEnv(ub.r))h.ownerDocument.oncontextmenu=new
Function(ub.s);if(this.getEnv(ub.t))jsx3.NativeError.initErrorCapture();o.Q4.add(this);jsx3.registerApp(this);this.JSS=new
jsx3.app.Properties();this.LJSS=new
jsx3.app.Properties();this.JSS.addParent(this.LJSS);this.JSS.addParent(jsx3.System.JSS);o.publish({subject:o.INITED,target:this});if(p)this.paint();};a.RZ=function(){jsx3.require(ub.u);ea=jsx3.gui.Block;if(this.JSXROOT)return;var
Xa=this.JSXROOT=this._r(ub.v);Xa.setDynamicProperty(ub.w,ub.x);Xa.setRelativePosition(0);Xa.setOverflow(3);Xa.setAlwaysCheckHotKeys(true);Xa.setIndex(1);var
Za=this.JSXBODY=new
ea(ub.y,0,0,ub.z,ub.z,ub.f);Za.setDynamicProperty(ub.w,ub.A);Za.setRelativePosition(0);Za.setZIndex(1);(Za.setOverflow(3)).setIndex(0);Xa.setChild(Za);};a.onResize=function(){if(jsx3.CLASS_LOADER.IE){window.clearTimeout(this.resize_timeout_id);var
Eb=this;this.resize_timeout_id=window.setTimeout(function(){Eb.Dv();},250);}else this.Dv();};a.Dv=function(){var
_=this.getEnv(ub.B);if(_)(this.getRootBlock()).ge({left:0,top:0,parentwidth:_.clientWidth,parentheight:_.clientHeight},true);};a.getNextZIndex=function(f){if(this.sY==null){this.sY=[];this.sY[0]=0;this.sY[1]=1000;this.sY[o.Z_DIALOG]=5000;this.sY[o.Z_DRAG]=7500;this.sY[o.Z_MENU]=10000;this.sY[5]=25000;}return this.sY[f]++;};o.allServers=function(){return o.Q4.toArray();};a._r=function(q){if(this._jsxje==null)this._jsxje=[];var
ib=new
ea(q,0,0,ub.z,ub.z,ub.f);ib._jsxoo=this.getEnv(ub.C);ib._jsxid=jsx3.app.DOM.newId(this.getEnv(ub.C));ib._jsxgl=this;this.DOM.add(ib);this._jsxje.push(ib);return ib;};a.getInvisibleRoot=function(){if(this.INVISIBLE==null)this.INVISIBLE=this._r(ub.D);return this.INVISIBLE;};a.getEnv=function(g){return this.ENVIRONMENT[g.toLowerCase()];};o.Y5=function(h){var
Ua=[ub.E];Ua.push(ub.F,ub.G,ub.H);Ua.push(ub.I,jsx3.getXmlVersion(),ub.H);Ua.push(ub.J,(jsx3.System.getLocale()).getDisplayName(),ub.H);Ua.push(ub.K,jsx3.CLASS_LOADER+ub.H);Ua.push(ub.L,jsx3.app.Browser.getSystem()+ub.M+navigator.userAgent+ub.N);Ua.push(ub.O);var
ka=null;var
Ib=o.allServers();for(var
pa=0;pa<Ib.length;pa++){var
eb=Ib[pa];Ua.push(ub.P,eb.getEnv(ub.Q),ub.R,ub.S);Ua.push(ub.T,eb.getAppPath(),ub.H);Ua.push(ub.F,eb.getEnv(ub.U),ub.H);Ua.push(ub.V);if(ka==null){ka=eb.getRootBlock();if(ka.getRendered()==null)ka=null;}}Ua.push(ub.V);Ua=Ua.join(ub.f);if(ka)ka.showSpy(Ua,Math.round((ka.getRendered()).clientWidth/2),Math.round((ka.getRendered()).clientHeight/2-100));else window.alert(Ua);};a.getSettings=function(){if(this._jsxQZ==null){var
Ta=(this.getCache()).getOrOpenDocument(jsx3.resolveURI(this.getAppPath()+ub.i+ub.W),ub.X);if(Ta.hasError()){na.error(jsx3._msg(ub.Y,this,Ta.getError()));Ta=null;}this._jsxQZ=new
jsx3.app.Settings(Ta);}return this._jsxQZ;};a.getAppPath=function(){return this.getEnv(ub.Z);};o.Gr=function(q){return q instanceof jsx3.gui.WindowBar&&q.getType()==3;};a.getTaskBar=function(k){if(!jsx3.gui.WindowBar)return null;if(k==null)k=this.JSXROOT;return k.findDescendants(o.Gr,false,false,false,true);};a.destroy=function(){var
ab=this.getEnv(ub._);if(ab)try{this.eval(ab);}catch(Kb){na.error(jsx3._msg(ub.aa,this),jsx3.NativeError.wrap(Kb));}if(jsx3.Class.forName(ub.ba))jsx3.gui.Painted.Box.unregisterServer(this,this.getEnv(ub.ca));if(this.JSXROOT){var
pa=this.JSXROOT.getRendered();if(pa){if(pa.parentNode.id==o.sR)pa=pa.parentNode;jsx3.html.removeNode(pa);}}if(this._jsxje)for(var
Ba=0;Ba<this._jsxje.length;Ba++){var
Cb=this._jsxje[Ba];Cb.removeChildren();}delete this[ub.da];this.DOM.unsubscribeAllFromAll();this.DOM.destroy();this.Cache.unsubscribeAll(ub.ea);this.Cache.destroy();jsx3.deregisterApp(this);o.Q4.remove(this);Pa.unsubscribe(ub.fa,this,ub.ga);this.ENVIRONMENT={};};a.paint=function(j){jsx3.require(ub.ha,ub.u);ea=jsx3.gui.Block;if(!jsx3.gui.Alerts.jsxclass.isAssignableFrom(o.jsxclass))o.jsxclass.addInterface(jsx3.gui.Alerts.jsxclass);jsx3.html.getMode(this.getEnv(ub.B));this.RZ();jsx3.gui.Painted.Box.registerServer(this,this.getEnv(ub.ca));if(this.getEnv(ub.ia))Pa.subscribe(ub.fa,this,ub.ga);var
qa=ub.ja;this.registerHotKey(new
Function(ub.ka+qa+ub.la),74,true,true,true);this.registerHotKey(new
Function(ub.ma),27,false,false,false);this._regHelpKey();var
aa=this.getEnv(ub.B);if(aa){var
tb=ub.f;var
fb=this.getEnv(ub.na);if(fb==1){tb=ub.oa;}else if(fb==2)tb=ub.pa;var
vb,z=ub.f,nb=ub.f;if(this.getEnv(ub.qa)==0){vb=ub.ra;}else{vb=ub.sa;z=ub.ta+this.getEnv(ub.ua)+ub.va;nb=ub.wa+this.getEnv(ub.xa)+ub.va;}var
bb=ub.ya+this.getEnv(ub.za)+ub.va;var
ua=ub.Aa+this.getEnv(ub.Ba)+ub.va;aa.innerHTML=ub.Ca+o.sR+ub.Da+vb+ub.va+tb+z+nb+bb+ua+ub.Ea;aa=aa.lastChild;this.JSXROOT.Wc({left:0,top:0,parentwidth:aa.clientWidth,parentheight:aa.clientHeight});if(aa)aa.innerHTML=this.JSXROOT.paint();}try{this.Ji(j);}catch(Kb){na.fatal(jsx3._msg(ub.Fa,this),jsx3.NativeError.wrap(Kb));}try{this.eval(this.getEnv(ub.Ga));}catch(Kb){na.fatal(jsx3._msg(ub.Ha,this),jsx3.NativeError.wrap(Kb));}};a._regHelpKey=function(){var
lb=this.getDynamicProperty(ub.Ia+jsx3.app.Browser.getSystem())||this.getDynamicProperty(ub.Ja);if(lb)this.registerHotKey(jsx3.gui.HotKey.valueOf(lb,jsx3.makeCallback(ub.Ka,this)));};a.Ji=function(l){var
tb=null;if(l){tb=this.JSXBODY.loadXML(l,true);}else{var
Ab=this.getEnv(ub.La);if(Ab)tb=this.JSXBODY.load(Ab,true);}if(tb)tb.setPersistence(1);};a.setDimensions=function(m,p,g,q){if(jsx3.$A.is(m)){p=m[1];g=m[2];q=m[3];m=m[0];}var
Ya=this.JSXROOT.getRendered();if(Ya){if(m)Ya.parentNode.style.left=m+ub.Ma;if(p)Ya.parentNode.style.top=p+ub.Ma;if(g)Ya.parentNode.style.width=g+ub.Ma;if(q)Ya.parentNode.style.height=q+ub.Ma;}};a.loadInclude=function(g,m,d,r){if(m==null)m=ub.f;var
Ca=r?((g+ub.f).indexOf(ub.Na)==-1?ub.Na:ub.Oa)+(new
Date()).valueOf():ub.f;if(d==ub.Pa){jsx3.CLASS_LOADER.loadResource(g+Ca,m,d);}else if(d==ub.Qa||d==ub.Ra&&!jsx3.app.PropsBundle){var
Mb=this.Cache.openDocument(g,m);if(Mb.hasError()){jsx3.util.Logger.GLOBAL.error(jsx3._msg(ub.Sa,+g,Mb.getError()));}else (this.getProperties()).loadXML(Mb,m);}else if(d==ub.Ra){var
R=this.getCache();if(r){var
Ga=this.LJSS.getParents();for(var
O=0;O<Ga.length;O++)if(Ga[O].getPath()==g)this.LJSS.removeParent(Ga[O]);jsx3.app.PropsBundle.clearCache(g,R);}this.LJSS.addParent(jsx3.app.PropsBundle.getPropsFT(g,this.getLocale(),R));}else if(d==ub.Ta||d==ub.Ua){return this.Cache.openDocument(g,m);}else if(d==ub.Va){this.unloadInclude(m);jsx3.CLASS_LOADER.loadResource(g+Ca,m,d);}else if(d==ub.Wa){jsx3.require(ub.Xa);return (new
jsx3.net.Service(g)).setNamespace(this);}else throw new
jsx3.IllegalArgumentException(ub.Ya,d);};a.unloadInclude=function(k){var
qb=(this.getRootDocument()).getElementById(k);try{if(qb)qb.parentNode.removeChild(qb);}catch(Kb){na.warn(jsx3._msg(ub.Za,k,this),jsx3.NativeError.wrap(Kb));}};a.loadResource=function(l){var
D=this.getSettings();var
F=((jsx3.util.List.wrap(D.get(ub._a))).filter(function(f){return f.id==l;})).toArray(true);var
la;for(var
pb=0;pb<F.length;pb++){var
da=F[pb];la=this.loadInclude(this.resolveURI(da.src),da.id,da.type);}if(F.length==0)na.warn(jsx3._msg(ub.ab,l));return la;};a.setDynamicProperty=function(q,d){var
Z=this.getProperties();Z.set(q,d);};a.getDynamicProperty=function(g,r){var
ka=(this.getProperties()).get(g);if(arguments.length>1&&jsx3.util.MessageFormat)try{var
S=new
jsx3.util.MessageFormat(ka);var
ab=new
Array(arguments.length-1);for(var
u=1;u<arguments.length;u++)ab[u-1]=arguments[u];return S.format(ab);}catch(Kb){}return ka;};a.setCookie=function(m,r,j,k,e,d,n){(this.getRootDocument()).cookie=m+ub.bb+(n?r:escape(r))+(j?ub.cb+j.toGMTString():ub.f)+(k?ub.db+k:ub.f)+(e?ub.eb+e:ub.f)+(d?ub.fb:ub.f);};a.getCookie=function(s,m){var
Aa=this.getRootDocument();var
Mb=Aa.cookie;var
V=s+ub.bb;var
wa=Mb.indexOf(ub.gb+V);if(wa==-1){wa=Mb.indexOf(V);if(wa!=0)return null;}else wa=wa+2;var
Nb=Aa.cookie.indexOf(ub.va,wa);if(Nb==-1)Nb=Mb.length;var
T=Mb.substring(wa+V.length,Nb);return m?T:unescape(T);};a.deleteCookie=function(q,h,k){this.setCookie(q,ub.f,new
Date(1970,0,1),h,k);};a.getRootBlock=function(){if(this.JSXROOT==null)this.RZ();return this.JSXROOT;};a.getAlertsParent=function(){return this.getRootBlock();};a.getBodyBlock=function(){if(this.JSXROOT==null)this.RZ();return this.JSXBODY;};a.getRootObjects=function(){return (this.JSXBODY.getChildren()).concat();};a.getCache=function(){return this.Cache;};a.getProperties=function(){return this.JSS;};a.getDOM=function(){return this.DOM;};a.getJSX=function(c){return this.DOM.get(c);};a.getJSXByName=function(q){return this.DOM.getByName(q);};a.getJSXById=function(c){return this.DOM.getById(c);};a.beep=function(){if(!jsx3.gui.WindowBar)return;var
la=this.JSXROOT.findDescendants(function(j){return j instanceof jsx3.gui.WindowBar&&j.getType()==2;},false,false);if(la!=null)la.beep();};a.createAppWindow=function(i){jsx3.require(ub.hb);if(this.WINDOWS==null)this.WINDOWS=this._r(ub.ib);if(this.WINDOWS.getChild(i)!=null)throw new
jsx3.IllegalArgumentException(ub.jb,i);var
Q=new
jsx3.gui.Window(i);this.WINDOWS.setChild(Q);return Q;};a.loadAppWindow=function(e,j){jsx3.require(ub.hb);if(this.WINDOWS==null)this.WINDOWS=this._r(ub.ib);var
J=null;if(e instanceof jsx3.xml.Entity)J=this.WINDOWS.loadXML(e,false,j);else J=this.WINDOWS.load(e,false,j);if(J==null)throw new
jsx3.Exception(jsx3._msg(ub.kb,e));if(!(J instanceof jsx3.gui.Window)){(J.getParent()).removeChild(J);throw new
jsx3.Exception(jsx3._msg(ub.lb,e,J.getClass()));}if(this.WINDOWS.getChild(J.getName())!=J){(J.getParent()).removeChild(J);throw new
jsx3.Exception(jsx3._msg(ub.mb,e,J.getName()));}return J;};a.getAppWindow=function(k){if(this.WINDOWS!=null)return this.WINDOWS.getChild(k);return null;};a.getDocumentOf=function(i){var
B=i;while(B!=null){if(jsx3.gui.Window&&B instanceof jsx3.gui.Window)return B.getDocument();if(B._jsxgl!=null)return this.getRootDocument();B=B.getParent();}return this.getRootDocument();};a.getRootDocument=function(){var
F=this.getEnv(ub.B);return F!=null?F.ownerDocument:null;};a.getRenderedOf=function(l){var
va=l.getId();var
W=this.getRootDocument();if(W==null)return null;var
Ib=W.getElementById(va);if(Ib==null&&this.WINDOWS!=null){var
K=this.WINDOWS.getChildren();for(var
Oa=0;Ib==null&&Oa<K.length;Oa++){var
ka=K[Oa].getDocument();if(ka)Ib=ka.getElementById(va);}}return Ib;};a.registerHotKey=function(j,e,h,n,l){return (this.getRootBlock()).registerHotKey(j,e,h,n,l);};a.checkHotKeys=function(n){return (this.getRootBlock()).checkHotKeys(n.event);};a.getServer=function(){return this;};a.isAtLeastVersion=function(e){return jsx3.util.compareVersions(this.getEnv(ub.m),e)>=0;};a.resolveURI=function(f){var
Ba=jsx3.net.URI.valueOf(f);if(this.isAtLeastVersion(ub.nb)&&!Qa.isAbsoluteURI(Ba)){var
M=this.getEnv(ub.ob);Ba=M.resolve(Ba);}return Qa.DEFAULT.resolveURI(Ba);};a.getUriPrefix=function(){return (this.getEnv(ub.ob)).toString();};a.relativizeURI=function(e,l){var
ob=Sa.getLocation();var
Oa=this.getEnv(ub.pb);var
y=Oa.relativize(ob.resolve(e));if(y.isAbsolute()||l){return y;}else{var
pb=this.getEnv(ub.qb);if(pb){return jsx3.net.URI.fromParts(ub.rb,null,pb.replace(ub.sb,ub.tb),null,ub.i+y.getPath(),y.getQuery(),y.getFragment());}else return jsx3.net.URI.fromParts(null,null,null,null,this.getEnv(ub.Z)+ub.i+y.getPath(),y.getQuery(),y.getFragment());}};Qa.register(ub.rb,function(g){var
Y=g.getHost();if(Y){var
x=Y.replace(ub.ub,ub.i);var
Mb=jsx3.System.getAppByPath(x);return Mb||new
o.Resolver(x);}return Qa.DEFAULT;});a.getLocale=function(){if(this.IB==null)this.IB=this.getDefaultLocale();return this.IB!=null?this.IB:jsx3.System.getLocale();};a.setLocale=function(d){this.IB=d;};a.getDefaultLocale=function(){var
V=(this.getSettings()).get(ub.vb);if(V==null)return null;V=jsx3.util.strTrim(V.toString());return V.length>0&&jsx3.util.Locale?jsx3.util.Locale.valueOf(V):null;};a.reloadLocalizedResources=function(){var
pa=this.LJSS.getParents();this.LJSS.removeAllParents();for(var
zb=0;zb<pa.length;zb++){var
H=jsx3.app.PropsBundle.getPropsFT(pa[zb].getPath(),this.getLocale(),this.getCache());this.LJSS.addParent(H);}};a.R9=function(i){var
ha=jsx3.html.getJSXParent(i.srcElement(),this);if(!ha)ha=this.JSXROOT;return ha?this.invokeHelp(ha):false;};a.invokeHelp=function(i){var
Da=null;while(i&&!Da){Da=i.getHelpId();i=i.getParent();}if(Da)this.publish({subject:o.HELP,helpid:Da,model:i});return Boolean(Da);};a.getAddins=function(){var
vb=[];var
eb=(this.getSettings()).get(ub.wb);if(eb)for(var
Ua=0;Ua<eb.length;Ua++){var
y=jsx3.System.getAddin(eb[Ua]);if(y)vb.push(y);}return vb;};a.toString=function(){return this.jsxsuper()+ub.xb+this.getAppPath()+ub.yb+this.getEnv(ub.Q);};o.getVersion=function(){return ub.zb;};});if(jsx3.gui.Alerts)jsx3.app.Server.jsxclass.addInterface(jsx3.gui.Alerts.jsxclass);jsx3.Server=jsx3.app.Server;jsx3.Class.defineClass("jsx3.app.Server.Resolver",null,[jsx3.net.URIResolver],function(c,a){var
ub={a:"jsxhomepath",b:"JSXAPPS",c:"/",d:/!/g,e:"jsxapp"};var
ea=jsx3.net.URIResolver;a.init=function(q){this._host=q;this._uri=new
jsx3.net.URI(jsx3.getEnv(ub.a)+ub.b+ub.c+q.replace(ub.d,ub.c)+ub.c);};a.resolveURI=function(o){var
H=jsx3.net.URI.valueOf(o);if(!ea.isAbsoluteURI(H))H=ea.DEFAULT.resolveURI(this._uri.resolve(H));return ea.DEFAULT.resolveURI(H);};a.getUriPrefix=function(){return this._uri.toString();};a.relativizeURI=function(r,f){var
ca=this._uri.relativize(r);if(ca.isAbsolute()||f)return ca;else return jsx3.net.URI.fromParts(ub.e,null,this._host,null,ub.c+ca.getPath(),ca.getQuery(),ca.getFragment());};a.toString=function(){return this._uri.toString();};});jsx3.Class.defineClass("jsx3.app.Model",null,[jsx3.util.EventDispatcher],function(g,j){var
ub={A:/^\[(\w+)(\(\))?(\*)?=\"?(.*?)\"?\]$/,Aa:"model.bad_type",B:"jsxdomholder",Ba:"jsx1:strings | jsx1:variants | jsx1:dynamics | jsx1:properties | jsx1:events | jsx1:xslparameters",C:"1",Ca:"_jsxSi",D:"undefined",Da:"jsxcustom",E:"serialization",Ea:"_jsxHj",F:"jsxversion",Fa:"jsxxslparams",G:"dynamics",Ga:"jsx1:object | jsx1:include | jsx1:children/jsx1:object | jsx1:children/jsx1:include",H:"properties",Ha:"onafter",I:"events",Ia:"model.onafter",J:"xslparameters",Ja:"response",K:"object",Ka:"error",L:"type",La:"timeout",M:"variants",Ma:"@",N:"strings",Na:" ",O:"model.async_convt",Oa:"/",P:"include",Pa:"3.00.00",Q:"src",R:"async",S:"true",T:"false",U:"model.child_notarr",V:"_jsx",W:"'",X:"[",Y:",",Z:"]",_:"new Date(",a:"urn:tibco.com/v3.0",aa:")",b:"http://xsd.tns.tibco.com/gi/cif/2006",ba:"model.bad_comp",c:"JSXFRAG",ca:"model.bad_compobj",d:"jsx:///xsl/cif_resolver.xsl",da:"jsx3.xml.Template",e:"jsx3.app.Model",ea:"name",f:"string",fa:"icon",g:"url",ga:"description",h:"_jsxDW",ha:"onBeforeDeserialize",i:"vntItem",ia:"onAfterDeserialize",j:"_jsxxK",ja:"objXML",k:"intIndex",ka:"model.bad_vers",l:"number",la:"xmlns",m:"model.clone_frag",ma:"model.future_vers",n:"function",na:"/jsx1:serialization/",o:"unshift",oa:"xmlns:jsx1='",p:"push",pa:"jsx1:onBeforeDeserialize",q:/(\b\w+\b)|(\#[a-zA-Z_]\w*)|(\.[\w\-]+)|(\:[\w\-]+(?:\([^\)]*\))?)|(\[\w+(?:\(\))?\*?=[^\]]*\])|(\*)|( *> *)|( +)/g,qa:"model.onbefore",r:"strExpr",ra:"jsx1:object | ",s:/_/g,sa:"jsx1:objects/jsx1:object | /jsx1:object",t:".",ta:"jsx1:",u:"",ua:"load",v:/\s+/,va:"paint",w:":first",wa:"strKey",x:":last",xa:"jsx1:variants/@jsxloadtype",y:/:nth(?:\-child)?\( *(\d+) *\)/,ya:"jsx3.gui.Painted",z:/:instanceof\( *(\S+?) *\)/,za:"model.load_cls"};var
ka=jsx3.xml.Entity;var
Sa=jsx3.xml.Document;var
G=jsx3.IllegalArgumentException;g.PERSISTNONE=0;g.PERSISTEMBED=1;g.PERSISTREF=2;g.PERSISTREFASYNC=3;g.LT_NORMAL=0;g.LT_SLEEP_PAINT=1;g.LT_SLEEP_DESER=2;g.LT_SLEEP_PD=3;g.LT_SHOW_PAINT=4;g.LT_SHOW_DESER=5;g.CURRENT_VERSION=ub.a;g.CIF_VERSION=ub.b;g.FRAGMENTNS=ub.c;g.ASYNC_LOAD_TIMEOUT=60000;g.XT=jsx3.resolveURI(ub.d);j._jsxid=null;j._jsxxK=null;j._jsxSZ=null;j._jsxoo=null;j._jsxgl=null;j._jsxDW=null;j._jsxX2=null;j._jsxFY=null;j._jsxhq=true;j.init=function(c,f){this.jsxsuper();this.jsxinstanceof=f==null?ub.e:f;this.jsxname=c;};j.getChild=function(f){var
da=null;if(this._jsxSZ!=null){if(typeof f==ub.f||isNaN(f)){var
Za=-1;var
Na=this.getChildren();var
yb=Na.length;for(var
Ta=0;Ta<yb;Ta++)if(f==Na[Ta].getName()){da=Ta;break;}}else da=f;if(da>=0&&da<this._jsxSZ.length)return this._jsxSZ[da];}return null;};j.getFirstChild=function(){return this.getChild(0);};j.getLastChild=function(){return this.getChild((this.getChildren()).length-1);};j.getNextSibling=function(){if(!this._jsxxK)return null;return this._jsxxK.getChild(this.getChildIndex()+1);};j.getPreviousSibling=function(){if(!this._jsxxK)return null;return this._jsxxK.getChild(this.getChildIndex()-1);};j.getChildren=function(){if(this._jsxSZ==null)this._jsxSZ=[];return this._jsxSZ;};j.getPersistence=function(){return this._jsxX2;};j.getPersistenceUrl=function(){return this.getMetaValue(ub.g);};j.setPersistence=function(c){this._jsxX2=c;return this;};j.setChild=function(o,q,h,i){if(!this.onSetChild(o)||!o.onSetParent(this))return false;var
ia=false;if(i==null&&this._jsxoo==null){i=ub.c;}else if(i!=null){ia=true;}else i=this._jsxoo;var
Ib=this.getServer();if(i!=ub.c&&Ib&&this._jsxoo==i){this.Yp(o,i,o._jsxDW!=null,Ib);}else this._jsxDW=1;var
ta=this._jsxSZ;if(!ta)ta=this._jsxSZ=[];ta[ta.length]=o;o._jsxxK=this;if(q==null)q=0;o._jsxX2=q;if(h&&(q==2||q==3))o.setMetaValue(ub.g,h.toString());this.onChildAdded(o);if(!ia&&i!=ub.c)(Ib.getDOM()).onChange(0,this.getId(),o.getId());return this;};j.onSetChild=function(f){return true;};j.onSetParent=function(r){return true;};j.onRemoveChild=function(p,c){};j.onChildAdded=function(b){};j.hasPaintProfile=function(){return false;};j.Yp=function(p,c,f,n){p._jsxoo=c;p.Bh(c);(n.getDOM()).add(p);if(f){delete p[ub.h];var
wb=p.getChildren();var
pa=wb.length;for(var
na=0;na<pa;na++)p.Yp(wb[na],c,true,n);}};j.Bh=function(r){this._jsxid=jsx3.app.DOM.newId(r);};j.removeChild=function(a){var
V=-1;if(!isNaN(a)){V=Number(a);}else if(a instanceof jsx3.app.Model){V=a._jsxxK==this?a.getChildIndex():-1;}else throw new
G(ub.i,a);var
Lb=this.getChild(V);if(Lb!=null){var
pb=this.getServer();this.f7(V,pb);this.onRemoveChild(Lb,V);if(pb)(pb.getDOM()).onChange(1,this.getId(),Lb.getId());}};j.f7=function(b,m,i){if(b>=0&&b<(this.getChildren()).length){var
Oa=this.getChild(b);if(!i)Oa.Zg(this);var
_a=(Oa.getChildren()).length;for(var
H=_a-1;H>=0;H--)Oa.f7(H,m,true);if(m)(m.getDOM()).remove(Oa);delete Oa[ub.j];if(!i)this._jsxSZ.splice(b,1);else if(b==0)this._jsxSZ.splice(0,this._jsxSZ.length);Oa.onDestroy(this);}else throw new
G(ub.k,b);};j.removeChildren=function(p){var
S=this.getServer();if(p==null){p=(this.getChildren()).concat();for(var
Hb=p.length-1;Hb>=0;Hb--){p[Hb].Zg(this);this.f7(Hb,S,true);}}else{var
kb=null;p=p.concat();for(var
Hb=p.length-1;Hb>=0;Hb--){var
Wa=p[Hb];if(typeof Wa==ub.l){kb=Wa;p[Hb]=this.getChild(kb);}else kb=Wa.getChildIndex();this.f7(kb,S,false);}}if(p.length>0)this.onRemoveChild(p,null);return this;};j.getServer=function(){var
_=this;while(_){if(_._jsxgl)return _._jsxgl;_=_._jsxxK;}return null;};j._getLocale=function(){var
w=this.getServer();return w!=null?w.getLocale():jsx3.System.getLocale();};j._getLocaleProp=function(r){return (jsx3.System.getLocaleProperties(this._getLocale())).get(r);};j.adoptChild=function(h,q,p){this.O7(h.getChildIndex(),h,q,p,false);};j.adoptChildrenFrom=function(a,r,l,m){if(!r)r=(a.getChildren()).concat();if(r.length>0){for(var
Aa=0;Aa<r.length;Aa++)this.O7(r[Aa].getChildIndex(),r[Aa],l,m,true);a.onRemoveChild(r,null);for(var
Aa=0;Aa<r.length;Aa++)this.onChildAdded(r[Aa]);}};j.EA=function(e,i){if(e==i||e==i-1)return false;var
L=this.getChildren();var
vb=e<i?i-1:i;var
na=L.splice(e,1);var
ba=L.splice(0,vb);this._jsxSZ=ba.concat(na,L);this.onChildAdded(na[0]);var
ra=this.getServer();if(ra)(ra.getDOM()).onChange(2,this.getId(),i);return true;};j.insertBefore=function(a,o,f){var
Ua=true;if(!a._jsxxK||!o){Ua=this.setChild(a);}else if(a._jsxxK!=this)Ua=this.O7(a.getChildIndex(),a,false,true,true);if(Ua){if(o)Ua=this.EA(a.getChildIndex(),o.getChildIndex());if(f!==false)this.repaint();}return Ua;};j.O7=function(l,f,s,n,i){if(n){this.onSetChild(f);f.onSetParent(this);}else if(!this.onSetChild(f)||!f.onSetParent(this))return false;var
Bb=f._jsxxK;delete f[ub.j];if(f.clearBoxProfile)f.clearBoxProfile(true);if(Bb._jsxSZ!=null)Bb._jsxSZ.splice(l,1);f.Zg(Bb);if(!i)Bb.onRemoveChild(f,l);var
ca=Bb.getServer();var
Ka=this.getServer();var
aa=ca!=Ka;if(aa)this.EO(f,Bb,ca,Ka);if(ca)(ca.getDOM()).onChange(1,Bb.getId(),f.getId());var
bb=this._jsxSZ;if(!bb)bb=this._jsxSZ=[];bb[bb.length]=f;f._jsxxK=this;if(!i)this.onChildAdded(f);if(s!==false)this.cl(f,i&&Bb._jsxSZ.length>0);if(Ka)(Ka.getDOM()).onChange(0,this.getId(),f.getId());return this;};j.cl=function(l,i){};j.Zg=function(e){var
z=e.getServer();if(z){var
_=(e.getServer()).getRenderedOf(this);if(_)jsx3.html.removeNode(_);}};j.EO=function(b,h,d,m){(d.getDOM()).remove(b);b._jsxoo=this._jsxoo;(m.getDOM()).add(b);b.onChangeServer(m,d);var
w=b.getChildren();for(var
Xa=0;Xa<w.length;Xa++)b.EO(w[Xa],null,d,m);};j.onChangeServer=function(o,b){};j.doClone=function(i,h){var
na=h==2?(this.getServer()).getRootBlock():this._jsxxK;if(na){var
Ia=na.rx(this.toXMLDoc(),h<1,i,null,null,h==2?ub.c:null);return Ia?Ia[0]:null;}else throw new
jsx3.Exception(jsx3._msg(ub.m,this));};j.getDescendantOfName=function(n,e,r){return this.findDescendants(function(f){return f.getName()==n;},e,false,r,false);};j.getFirstChildOfType=function(s,h){if(h){var
Mb=null;if(typeof s==ub.f)Mb=jsx3.Class.forName(s);else if(typeof s==ub.n&&s.jsxclass instanceof jsx3.Class)Mb=s.jsxclass;else if(s instanceof jsx3.Class)Mb=s;return this.findDescendants(function(e){return (e.getClass()).equals(Mb);},false,false,true,false);}else return this.findDescendants(function(c){return c.instanceOf(s);},false,false,true,false);};j.getDescendantsOfType=function(k,b){return this.findDescendants(function(r){return r.instanceOf(k);},false,true,b,false);};j.findDescendants=function(p,i,c,n,d){var
Cb=i?ub.o:ub.p;var
Xa=c?[]:null;var
ha=d?[this]:(this.getChildren()).concat();while(ha.length>0){var
Z=ha.shift();if(p.call(null,Z))if(c)Xa[Xa.length]=Z;else return Z;if(!n)ha[Cb].apply(ha,Z.getChildren());}return Xa;};j.selectDescendants=function(n,p){var
Qa=ub.q;var
xb=jsx3.$A([this]);var
_a=null;var
Ea=true;var
la=true;var
kb=(this.getServer()).getRootBlock()==this;var
Nb=false;Qa.lastIndex=0;var
Za=0,Hb=null;while((Hb=Qa.exec(n))&&!Nb){if(Za!=Hb.index)throw new
G(ub.r,n);var
sb=null;if(Hb[1]){if(_a)throw new
G(ub.r,n);var
wb=Hb[1].replace(ub.s,ub.t);sb=(function(k){return (k.getClass()).getName()==wb;});}else if(Hb[2]){var
vb=Hb[2].substring(1);if(kb){_a=jsx3.$A(((this.getServer()).getDOM()).getAllByName(vb));}else sb=(function(b){return b.getName()==vb;});}else if(Hb[3]){var
wb=Hb[3].substring(1);sb=(function(i){return typeof i.getClassName==ub.n&&(jsx3.$A((i.getClassName()||ub.u).split(ub.v))).contains(wb);});}else if(Hb[4]){if(Hb[4]==ub.w){sb=(function(e){return e.getChildIndex()==0;});}else if(Hb[4]==ub.x){sb=(function(o){var
M=(o.getParent()).getChildren();return o===M[M.length-1];});}else if(ub.y.test(Hb[4])){var
_=parseInt(RegExp.$1);sb=(function(b){return b.getChildIndex()==_;});}else if(ub.z.test(Hb[4])){var
M=jsx3.Class.forName(RegExp.$1);sb=(function(q){return M&&q.instanceOf(M);});}else throw new
G(ub.r,n);}else if(Hb[5]){ub.A.test(Hb[5]);var
Ga=RegExp.$1,Oa=RegExp.$2,La=RegExp.$3,X=RegExp.$4;sb=(function(a){var
db=Oa?a[Ga]():a[Ga];db=db==null?ub.u:String(db);return La?X.length>0&&db.indexOf(X)>=0:db===X;});}else if(Hb[6]){sb=(function(i){return true;});}else if(!_a)throw new
G(ub.r,n);else if(_a.length==0)Nb=true;else{xb=_a;_a=null;Ea=Boolean(Hb[8]);la=(kb=false);}if(sb)if(_a)_a=_a.filter(sb);else{_a=jsx3.$A();xb.each(function(l){_a.addAll(l.findDescendants(sb,false,true,!Ea,la));});_a=_a.unique();}Za=Qa.lastIndex;}if(!Nb&&Za!=n.length)throw new
G(ub.r,n);return p?_a[0]:_a;};j.onDestroy=function(l){};j.getId=function(){return this._jsxid;};j.getChildIndex=function(){var
Cb=this._jsxxK;if(Cb!=null)return jsx3.util.arrIndexOf(Cb.getChildren(),this);return -1;};j.getName=function(){return this.jsxname;};j.setName=function(n){if(n!=null){var
ga=this.jsxname;this.jsxname=n;var
Wa=this.getServer();if(Wa)(Wa.getDOM()).onNameChange(this,ga);}return this;};j.getHelpId=function(){return this.jsxhelpid;};j.setHelpId=function(p){this.jsxhelpid=p;};j.getLoadType=function(){return this.jsxloadtype||0;};j.setLoadType=function(d){this.jsxloadtype=d;};j.Tm=function(){return this._jsxhq;};j.Dk=function(l){if(this._jsxhq!=l){this._jsxhq=l;if(l){var
Z=this.getRendered();if(Z&&(!Z.firstChild||Z.getAttribute(ub.B)==ub.C))this.repaint();}}};j.getParent=function(){return this._jsxxK;};j.getAncestorOfType=function(a){return this.findAncestor(function(q){return q.instanceOf(a);},false);};j.getAncestorOfName=function(i){return this.findAncestor(function(p){return p.getName()==i;},false);};j.findAncestor=function(o,r){var
Ea=r?this:this._jsxxK;while(Ea!=null){if(o.call(null,Ea))return Ea;Ea=Ea._jsxxK;}return null;};j.toXML=function(r){return (this.toXMLDoc(r)).serialize(true,r!=null?r.charset:null);};j.toXMLDoc=function(c){if(c==null){c=this._jsxFY;if(c==null)c={};}else if(this._jsxFY!=null){c=jsx3.clone(c);for(var L in this._jsxFY)if(typeof c[L]==ub.D)c[L]=this._jsxFY[L];}var
fa=g.CURRENT_VERSION;var
ra=new
jsx3.xml.Document();var
Qa=ra.createDocumentElement(ub.E,fa);Qa.setAttribute(ub.F,g.gJ());for(var L in g.M3)if(typeof c[L]!=ub.D){var
Ja=g.M3[L];var
La=ra.createNode(1,Ja,fa);La.appendChild(ra.createNode(4,c[L],fa));Qa.appendChild(La);}if(c.children){var
va=(this.getChildren()).length;for(var
Aa=0;Aa<va;Aa++)Qa.appendChild((this.getChild(Aa)).Mi(ra,c));}else Qa.appendChild(this.Mi(ra,c));return ra;};g.gJ=function(){var
La=(jsx3.System.getVersion()).split(ub.t);return La[0]+ub.t+La[1];};g.dP={_jsxSi:ub.G,jsxcustom:ub.H,_jsxHj:ub.I,jsxxslparams:ub.J};g.kP={"boolean":1,number:1};j.Mi=function(r,f){var
rb=g.CURRENT_VERSION;var
X=r.createNode(1,ub.K,rb);var
L=this.getClass();var
J=L!=null?L.getName():null;if(J==null)J=this.jsxinstanceof;X.setAttribute(ub.L,J);var
tb=r.createNode(1,ub.M,rb);var
S=r.createNode(1,ub.N,rb);X.appendChild(tb);X.appendChild(S);for(var _a in g.dP){var
la=this[_a];if(la!=null&&typeof la==ub.K){var
bb=g.H0(r,g.dP[_a],la);if(bb!=null){X.appendChild(bb);if(g.dP[_a]==ub.G&&this._jsxAo)for(var ab in this._jsxAo)bb.removeAttribute(ab);}}}var
ja=this._jsxSZ;if(ja)if(jsx3.$A.is(ja)){var
V=ja.length;if(V>0)for(var
zb=0;zb<V;zb++){var
y=ja[zb];var
Ra=y._jsxX2;if(Ra==2||Ra==3){if(Ra==3&&zb!=V-1){jsx3.util.Logger.GLOBAL.warn(jsx3._msg(ub.O,this));Ra=y._jsxX2=2;}var
Xa=r.createNode(1,ub.P,rb);Xa.setAttribute(ub.Q,y.getPersistenceUrl());Xa.setAttribute(ub.R,Ra==3?ub.S:ub.T);X.appendChild(Xa);}else if(Ra==1||f.persistall)X.appendChild(y.Mi(r,f));}}else jsx3.util.Logger.GLOBAL.error(jsx3._msg(ub.U,this,this[ab]));for(var ab in this){var
Nb=this[ab];var
u=typeof Nb;if(u==ub.n||ab.indexOf(ub.V)==0||Nb==null){}else if(jsx3.$A.is(Nb)){var
Cb=new
Array(Nb.length);for(var
zb=0;zb<Nb.length;zb++){var
ib=Nb[zb];Cb[zb]=g.kP[typeof ib]?ib:ub.W+ib+ub.W;}tb.setAttribute(ab,ub.X+Cb.join(ub.Y)+ub.Z);}else if(u==ub.K){if(Nb instanceof Date)tb.setAttribute(ab,ub._+Nb.getTime()+ub.aa);}else if(this._jsxSi==null||this._jsxSi[ab]==null)if(g.kP[u]){tb.setAttribute(ab,String(Nb));}else S.setAttribute(ab,Nb);}return X;};g.H0=function(d,h,k){var
S=null;for(var sb in k){if(S==null)S=d.createNode(1,h,g.CURRENT_VERSION);S.setAttribute(sb,String(k[sb]));}return S;};j.getNS=function(){return this._jsxoo;};j.getUriResolver=function(){var
Nb=this;while(Nb!=null){if(Nb._jsxgd&&Nb._jsxgd.resolver)return Nb._jsxgd.resolver;if(Nb._jsxgl!=null)return Nb._jsxgl;Nb=Nb._jsxxK;}return null;};j.load=function(i,c,m){var
Ra=(m||this.getUriResolver()).resolveURI(i);var
va=(new
Sa()).load(Ra);if(va.hasError())throw new
jsx3.Exception(jsx3._msg(ub.ba,Ra,va.getError()));return (this.rx(va,c,null,Ra,i,null,null,m,null))[0];};j.loadXML=function(m,e,k){var
Ma=m instanceof Sa?m:(new
Sa()).loadXML(m);if(Ma.hasError()){var
D=Ma.getSourceURL();var
N=D?ub.ba:ub.ca;throw new
jsx3.Exception(jsx3._msg(N,D,Ma.getError()));}return (this.rx(Ma,e,null,Ma.getSourceURL(),Ma.getSourceURL(),null,null,k,null))[0];};j.loadAndCache=function(i,c,e,m){if(e==null)e=(this.getServer()).getCache();var
O=(m||this.getUriResolver()).resolveURI(i);var
D=e.getOrOpenDocument(O);if(D.hasError())throw new
jsx3.Exception(jsx3._msg(ub.ba,O,D.getError()));return (this.rx(D,c,null,O,i,null,e,m,null))[0];};g.AK=function(a){jsx3.require(ub.da);var
Ea=(jsx3.getSystemCache()).getOrOpenDocument(g.XT,null,jsx3.xml.XslDocument.jsxclass);return Ea.transformToObject(a);};g.M3={name:ub.ea,icon:ub.fa,description:ub.ga,onbefore:ub.ha,onafter:ub.ia};j.rx=function(s,m,a,k,c,l,d,i,p){if(!p||a==3)var
Ga=new
jsx3.util.Timer(g.jsxclass,k);if(s==null)throw new
G(ub.ja,s);if(((s.getRootNode()).getNamespaceURI()).indexOf(g.CIF_VERSION)==0){s=g.AK(s);if(s==null)throw new
G(ub.ja,s);}if(((s.getRootNode()).getNamespaceURI()).indexOf(g.CURRENT_VERSION)!=0){throw new
jsx3.Exception(jsx3._msg(ub.ka,k,(s.getRootNode()).getAttribute(ub.la)));}else{var
xa=(s.getRootNode()).getAttribute(ub.F);if(xa&&jsx3.util.compareVersions(xa,jsx3.System.getVersion())>0)throw new
jsx3.Exception(jsx3._msg(ub.ma,k,xa));}var
u=l==ub.c;var
Ra=ub.na;s.setSelectionNamespaces(ub.oa+g.CURRENT_VERSION+ub.W);var
Fb=s.selectSingleNode(Ra+ub.pa);if(Fb!=null){var
xb=Fb.getValue();if(xb&&!s._jsxQm)try{jsx3.eval(xb,{objPARENT:this,objXML:s});s._jsxQm=true;}catch(Kb){jsx3.util.Logger.GLOBAL.error(jsx3._msg(ub.qa,k),jsx3.NativeError.wrap(Kb));}}if(l==null)l=this._jsxoo;var
nb=this.getUriResolver()||p;if(i==null){i=jsx3.net.URIResolver.getResolver(c);}else if(c)if(i.getUriPrefix()!=nb.getUriPrefix()){c=jsx3.net.URI.valueOf(c);if(!jsx3.net.URIResolver.isAbsoluteURI(c))c=i.relativizeURI(c);}var
sb=this.getServer();if(p==null)p=sb;var
Ia=i||nb;var
T=s.selectNodeIterator(Ra+ub.ra+Ra+ub.sa);var
W=[];var
Qa={uri:k,resolver:i,nameIndex:{},varNameIndex:{}};while(T.hasNext()){var
rb=T.next();var
zb=this.Ji(rb,k,l,p,d,Ia,Qa);if(zb!=null){W[W.length]=zb;if(!u)var
mb=this.setChild(zb,a,k,l);if(mb===false)return false;if(W.length==1){if(c)zb.setMetaValue(ub.g,c.toString());for(var Na in g.M3){var
ta=s.selectSingleNode(Ra+ub.ta+g.M3[Na]);if(ta!=null)zb.setMetaValue(Na,ta.getValue());}}if(sb!=null)zb.onAfterAttach();}}if(!u&&W.length>0&&sb)(sb.getDOM()).onChange(0,this.getId(),W[0].getId());if(Ga)Ga.log(ub.ua,true);if(m!==false){for(var
v=0;v<W.length;v++)this.cl(W[v],v<W.length-1);if(Ga)Ga.log(ub.va);}return W;};g.META_FIELDS={url:1,name:1,icon:1,description:1,onafter:1,onattach:1,onbefore:1,unicode:1};j.getMetaValue=function(o){if(g.META_FIELDS[o])return this._jsxFY?this._jsxFY[o]:ub.u;else throw new
G(ub.wa,o);};j.setMetaValue=function(n,c){if(g.META_FIELDS[n]){if(this._jsxFY==null)this._jsxFY={};this._jsxFY[n]=c;}else throw new
G(ub.wa,n);};j.Ji=function(f,e,k,o,a,c,s){if(f==null)return null;if(!f._jsxbm){var
aa=f.selectSingleNode(ub.xa);aa=aa?parseInt(aa.getValue()):0;if(aa==2||aa==3||aa==5){jsx3.require(ub.ya);var
v=new
g.Loading(f,aa,[e,k,o,a,c,s]);v._jsxoo=k;return v;}}var
K=f.getAttribute(ub.L);var
eb=jsx3.Class.forName(K);if(eb==null)eb=jsx3.getClass(K);if(eb==null)try{eb=jsx3.CLASS_LOADER.loadClass(K);}catch(Kb){jsx3.util.Logger.GLOBAL.error(jsx3._msg(ub.za,K),jsx3.NativeError.wrap(Kb));}if(eb==null){jsx3.util.Logger.GLOBAL.error(jsx3._msg(ub.Aa,e,K));return null;}var
v=null;if(eb instanceof jsx3.Class){v=eb.bless();}else{v=new
eb(jsx3.DESERIALIZE);v.jsxinstanceof=K;}v._jsxgd=s;v._jsxoo=k;v.onBeforeAssemble(this,o);for(var
Eb=f.selectNodeIterator(ub.Ba);Eb.hasNext();){var
da=Eb.next();var
fb=da.getBaseName();if(fb==ub.N)g.sG(v,da);else if(fb==ub.M)g.st(v,da);else if(fb==ub.G)g.UY(v,da,ub.Ca);else if(fb==ub.H)g.UY(v,da,ub.Da);else if(fb==ub.I)g.UY(v,da,ub.Ea);else if(fb==ub.J)g.UY(v,da,ub.Fa);}var
D=v.getName();if(D){s.nameIndex[D]=v;if(jsx3.util.isName(D))s.varNameIndex[D]=v;}var
Eb=f.selectNodeIterator(ub.Ga);while(Eb.hasNext()){var
F=Eb.next();if(F.getBaseName()==ub.K){var
T=v.Ji(F,e,k,o,a,c,s);if(T)v.setChild(T,1,null,k);}else if(F.getBaseName()==ub.P){var
ua=F.getAttribute(ub.Q);var
N=c.resolveURI(ua);var
J=true;if(F.getAttribute(ub.R)==ub.S){J=false;if(Eb.hasNext()){jsx3.util.Logger.GLOBAL.warn(jsx3._msg(ub.O,v));J=true;}}if(J){var
jb=a!=null?a.getOrOpenDocument(N):(new
Sa()).load(N);if(jb.hasError())throw new
jsx3.Exception(jsx3._msg(ub.ba,N,f.getError()));v.rx(jb,false,2,N,ua,k,a,null,o);}else v.uY(N,ua,k,a,o);}else throw new
jsx3.Exception();}v.onAfterAssemble(this,o);return v;};j.onBeforeAssemble=function(o,q){};j.onAfterAssemble=function(p,r){};j.onAfterAttach=function(){var
Mb=(this.getChildren()).concat();for(var
Fa=Mb.length-1;Fa>=0;Fa--)if(Mb[Fa]._jsxxK==this)Mb[Fa].onAfterAttach();if(this.hasPaintProfile())this.applyDynamicProperties();var
Ib=this.getMetaValue(ub.Ha);if(Ib)try{var
Ka=this._jsxgd;var
I=Ka?(jsx3.$O(Ka.varNameIndex)).clone():{};I.objJSX=this;this.eval(Ib,I);}catch(Kb){var
Oa=this.getMetaValue(ub.g);jsx3.util.Logger.GLOBAL.error(jsx3._msg(ub.Ia,Oa),jsx3.NativeError.wrap(Kb));}};j.uY=function(d,p,o,c,s){var
va=this;if(c!=null&&c.getDocument(d.toString())!=null){var
za=c.getDocument(d.toString());jsx3.sleep(function(){this.rx(za,true,3,d,p,o,c,null,s);},null,this);}else{var
za=new
Sa();za.setAsync(true);za.subscribe(ub.Ja,function(b){if(c!=null)c.setDocument(d,b.target);va.rx(b.target,true,3,d,p,o,c,null,s);});za.subscribe([ub.Ka,ub.La],function(f){throw new
jsx3.Exception(jsx3._msg(ub.ba,d,f.target.getError()));});za.load(d,g.ASYNC_LOAD_TIMEOUT);}};g.sG=function(d,b){var
Q=b.getAttributeNames();for(var
rb=0;rb<Q.length;rb++){var
ta=Q[rb];d[ta]=b.getAttribute(ta);}};g.st=function(i,p){var
Ea=p.getAttributeNames();for(var
x=0;x<Ea.length;x++){var
Ua=Ea[x];var
lb=p.getAttribute(Ua);i[Ua]=isNaN(lb)?i.eval(lb):Number(lb);}};g.UY=function(o,f,k){var
C=o[k]={};var
wb=f.getAttributeNames();for(var
L=0;L<wb.length;L++){var
Db=wb[L];C[Db]=f.getAttribute(Db);}};j.toString=function(){return ub.Ma+(this.getClass()).getName()+ub.Na+this.getId()+ub.Oa+this.getName();};g.getVersion=function(){return ub.Pa;};});jsx3.Model=jsx3.app.Model;jsx3.Class.defineClass("jsx3.gui.HotKey",null,[jsx3.util.EventDispatcher],function(p,o){var
ub={A:"\u21A9",B:"\u238B",C:"\u21E5",D:"\u2326",E:"\u2423",F:"\u232B",G:"\u2191",H:"\u2193",I:"\u2190",J:"\u2192",K:"Insert",L:"\u2196",M:"\u2198",N:"\u21DE",O:"\u21DF",P:"Meta",Q:"Alt",R:"Ctrl",S:"Shift",T:"Enter",U:"Esc",V:"Tab",W:"Del",X:"Space",Y:"Backspace",Z:"Up",_:"Down",a:"invoked",aa:"Left",b:"+",ba:"Right",c:"ctrl",ca:"Home",d:"shift",da:"End",e:"alt",ea:"PgUp",f:"meta",fa:"PgDn",g:"string",ga:"@HotKey key:",h:/^\[(\d+)\]$/,ha:" shift:",i:"",ia:" ctrl:",j:"function",ja:" alt:",k:"callback",ka:" meta:",l:"number",la:/^[fF](\d\d?)$/,m:"key",ma:"F",n:"meta+",o:"alt+",p:"ctrl+",q:"shift+",r:"[",s:"]",t:"gui.hk.dest",u:"u4",v:"\u2318",w:"\u2325",x:"\u2303",y:"\u21EA",z:"\u21E7"};var
Ea=jsx3.gui.Event;p.WAS_INVOKED=ub.a;o.u4=null;o.hH=null;o.Up=false;o.Iy=false;o.fV=false;o._L=false;o.ZY=true;o.JQ=false;p.valueOf=function(k,s){var
wb=(k.toLowerCase()).split(ub.b);var
Aa=wb.pop();var
C=wb.indexOf(ub.c)>=0;var
ua=wb.indexOf(ub.d)>=0;var
wa=wb.indexOf(ub.e)>=0;var
fb=wb.indexOf(ub.f)>=0;if(typeof Aa==ub.g&&Aa.match(ub.h))Aa=parseInt(RegExp.$1);return new
p(s||new
Function(ub.i),Aa,ua,C,wa,fb);};o.init=function(h,i,a,j,b,n){if(!(typeof h==ub.j))throw new
jsx3.IllegalArgumentException(ub.k,h);this.u4=h;this.Up=a==null?null:Boolean(a);this.Iy=j==null?null:Boolean(j);this._L=b==null?null:Boolean(b);this.fV=n==null?null:Boolean(n);this.hH=typeof i==ub.l?i:p.keyDownCharToCode(i);if(this.hH==null)throw new
jsx3.IllegalArgumentException(ub.m,i);};o.getKey=function(){var
Z=ub.i;if(this.fV)Z=Z+ub.n;if(this._L)Z=Z+ub.o;if(this.Iy)Z=Z+ub.p;if(this.Up)Z=Z+ub.q;var
xa=p.keyDownCodeToChar(this.hH);Z=Z+(xa!=null?xa:ub.r+this.hH+ub.s);return Z;};o.getKeyCode=function(){return this.hH;};o.isMatch=function(h){var
mb=h.keyCode()==this.hH&&(this.Up==null||h.shiftKey()==this.Up)&&(this.Iy==null||h.ctrlKey()==this.Iy)&&(this.fV==null||h.metaKey()==this.fV)&&(this._L==null||h.altKey()==this._L);return mb;};o.invoke=function(e,d){if(this.JQ||!this.ZY)throw new
jsx3.Exception(jsx3._msg(ub.t,this));var
za=this.u4.apply(e,d);this.publish({subject:ub.a});return za;};o.isEnabled=function(){return this.ZY;};o.setEnabled=function(n){this.ZY=n;};o.isDestroyed=function(){return this.JQ;};o.destroy=function(){this.JQ=true;delete this[ub.u];};o.getFormatted=function(){var
Aa=null,Fb=null;if(jsx3.app.Browser.macosx){Aa=ub.i;Fb=p.eV;}else{Aa=ub.b;Fb=p.sF;}var
Lb=ub.i;if(this.Iy)Lb=Lb+(Fb.ctrl[0]+Aa);if(this._L)Lb=Lb+(Fb.alt[0]+Aa);if(this.Up)Lb=Lb+(Fb.shift[0]+Aa);if(this.fV)Lb=Lb+(Fb.meta[0]+Aa);var
bb=p.keyDownCodeToChar(this.hH,true);Lb=Lb+(bb!=null?bb.length==1?bb.toUpperCase():bb:ub.r+this.hH+ub.s);return Lb;};p.eV={meta:[ub.v,224],alt:[ub.w,18],ctrl:[ub.x,17],shift:[jsx3.CLASS_LOADER.FX&&jsx3.CLASS_LOADER.getVersion()<3?ub.y:ub.z,16],enter:[ub.A,13],esc:[ub.B,27],tab:[ub.C,9],del:[ub.D,46],space:[ub.E,32],backspace:[ub.F,8],up:[ub.G,38],down:[ub.H,40],left:[ub.I,37],right:[ub.J,39],insert:[ub.K,45],home:[ub.L,36],end:[ub.M,35],pgup:[ub.N,33],pgdn:[ub.O,34]};p.sF={meta:[ub.P,224],alt:[ub.Q,18],ctrl:[ub.R,17],shift:[ub.S,16],enter:[ub.T,13],esc:[ub.U,27],tab:[ub.V,9],del:[ub.W,46],space:[ub.X,32],backspace:[ub.Y,8],up:[ub.Z,38],down:[ub._,40],left:[ub.aa,37],right:[ub.ba,39],insert:[ub.K,45],home:[ub.ca,36],end:[ub.da,35],pgup:[ub.ea,33],pgdn:[ub.fa,34]};o.toString=function(){return ub.ga+this.hH+ub.ha+this.Up+ub.ia+this.Iy+ub.ja+this._L+ub.ka+this.fV;};p.rR={39:222,44:188,45:189,46:190,47:191,59:186,61:187,91:219,92:220,93:221,96:192};p.keyDownCharToCode=function(d){var
nb=null;if(d.length==1){var
La=d.charCodeAt(0);if(La>=65&&La<=90)nb=La;else if(La>=97&&La<=122)nb=La-32;else if(La>=48&&La<=57)nb=La;else nb=p.rR[La];}else if(p.sF[d.toLowerCase()]){nb=p.sF[d.toLowerCase()][1];}else if(d.match(ub.la))nb=parseInt(RegExp.$1)+112-1;return nb;};p.keyDownCodeToChar=function(a,l){var
t=null;if(a>=65&&a<=90)t=String.fromCharCode(a+97-65);else if(a>=48&&a<=57)t=String.fromCharCode(a);else if(a>=112&&a<=126)t=ub.ma+(a-112+1);else{for(var Da in p.rR)if(p.rR[Da]==a){t=String.fromCharCode(Da);break;}if(t==null){var
Cb=l&&jsx3.app.Browser.macosx?p.eV:p.sF;for(var Da in Cb)if(Cb[Da][1]==a){t=Cb[Da][0];break;}}}return t;};});jsx3.Class.defineClass("jsx3.gui.Painted",jsx3.app.Model,null,function(r,f){var
ub={A:"Left",B:"padding",C:"margin",D:"border",E:"jsxafterresizeview",F:"done",G:"box.async",H:"box.sync",I:" box updates of ",a:" ",b:'="',c:/\"/g,d:"&quot;",e:'"',f:"",g:"jsxcustom",h:"object",i:"bench.",j:" repaints of ",k:"repaint",l:'<span id="',m:'" style="display:none;" jsxdomholder="1"></span>',n:"jsx3.gui.Painted.domPaint",o:"beforeEnd",p:"paint.insert",q:"jsx3.gui.Painted.repaint",r:"_jsxHK",s:"_jsxFD",t:"_jsxxw",u:/\s*;\s*/g,v:/\s*:\s*/,w:/(-\S)/gi,x:"Top",y:"Right",z:"Bottom"};var
Fa=jsx3.html;r.MASK_NO_EDIT={NN:false,EE:false,SS:false,WW:false,MM:false};r.MASK_ALL_EDIT={NN:true,EE:true,SS:true,WW:true,MM:true};f.init=function(p){this.jsxsuper(p);};f.getAbsolutePosition=function(h,e){if(e==null)e=this.getRendered(h);if(e==null)return {L:0,T:0,W:0,H:0};if(h==null)h=(this.Jw()).getRendered(e);return Fa.getRelativePosition(h,e);};f.applyDynamicProperties=function(){if(this._jsxSi!=null){var
_a=this.getServer();if(_a==null)return;var
na=_a.getProperties();for(var X in this._jsxSi)this[X]=na.get(this._jsxSi[X]);}};f.setDynamicProperty=function(k,d,i){if(this._jsxSi==null)this._jsxSi={};if(this._jsxAo==null)this._jsxAo={};if(d==null){delete this._jsxSi[k];delete this._jsxAo[k];}else{this._jsxSi[k]=d;if(i)this._jsxAo[k]=d;else delete this._jsxAo[k];}return this;};f.getDynamicProperty=function(l){if(this._jsxSi)return this._jsxSi[l];};f.setAttribute=function(p,o){(this.getAttributes())[p]=o;return this;};f.getAttribute=function(q){return (this.getAttributes())[q];};f.getAttributes=function(){if(this.jsxcustom==null)this.jsxcustom={};return this.jsxcustom;};f.renderAttributes=function(k,j){var
K=[];if(this.jsxcustom!=null){var
ob=jsx3.gui.Interactive;var
eb=ob&&this.instanceOf(ob);for(var Pa in this.jsxcustom){var
S=k!=null&&(jsx3.$A.is(k)&&jsx3.util.arrIndexOf(k,Pa)>=0||k[Pa])||j&&eb&&ob.isBridgeEventHandler(Pa);var
ab=this.jsxcustom[Pa];if(!S&&ab!=null)K[K.length]=ub.a+Pa+ub.b+ab.replace(ub.c,ub.d)+ub.e;}}return K.join(ub.f);};f.removeAttribute=function(j){delete this.getAttributes()[j];return this;};f.removeAttributes=function(){delete this[ub.g];return this;};f.focus=function(){var
A=this.getRendered();if(A)Fa.focus(A);return A;};f.getMaskProperties=function(){return r.MASK_NO_EDIT;};f.getRendered=function(s){var
Da=null;if(s&&s instanceof jsx3.gui.Event){if(s.srcElement())Da=(s.srcElement()).ownerDocument;}else if(s&&typeof s==ub.h)Da=s.ownerDocument||(s.getElementById?s:null);if(Da==null)Da=this.getDocument();return Da!=null?Da.getElementById(this.getId()):null;};f.containsHtmlElement=function(a){var
Xa=this.getRendered(a);if(Xa)while(a!=null){if(Xa==a)return true;a=a.parentNode;}return false;};f.getDocument=function(){var
sa=this;while(sa!=null){if(jsx3.gui.Window&&sa instanceof jsx3.gui.Window)return sa.getDocument();else if(sa._jsxgl!=null)return sa._jsxgl.getRootDocument();sa=sa.getParent();}return null;};f.Jw=function(){var
W=this;while(W!=null){if(jsx3.gui.Window&&W instanceof jsx3.gui.Window)return W.getRootBlock();else if(W._jsxgl!=null)return W._jsxgl.getRootBlock();W=W.getParent();}return null;};r.BX=null;r.REPAINT_MAP=new
jsx3.util.WeakMap();f.repaint=function(){var
Gb=[this];while(Gb.length>0){var
na=Gb.shift();var
Ba=na.getId();if(Ba==null)continue;var
Xa=1+(r.REPAINT_MAP.get(Ba)||Number(0));if(Xa>1){(jsx3.util.Logger.getLogger(ub.i+r.jsxclass)).warn(Xa+ub.j+na);}else{var
Za=na.getChildren();if(Za.length>0)Gb.push.apply(Gb,Za);}r.REPAINT_MAP.set(Ba,Xa);}var
Fb=this.getRendered();if(this.isDomPaint()){if(Fb!=null){var
Ka=Fb.previousSibling;var
Ib=this.paintDom();if(Ib!=Fb)Fb.parentNode.replaceChild(Ib,Fb);else if(Ib.parentNode==null)Ka.parentNode.insertBefore(Ib,Ka);}return null;}else{var
Sa=null;if(Fb!=null){var
db=new
jsx3.util.Timer(r.jsxclass,this);Sa=this.paint();Fa.setOuterHTML(Fb,Sa);r.vm(this,Fb);db.log(ub.k);}return Sa;}};f.paint=jsx3.Method.newAbstract();f.onAfterPaint=function(c){};r.vm=function(a,g){var
ba=[a];while(ba.length>0){var
Da=ba.shift();if(Da.onAfterPaint!=f.onAfterPaint){var
w=Da.getRendered(g);if(w)Da.onAfterPaint(w);}var
Ka=Da.getChildren();if(Ka.length>0)ba.unshift.apply(ba,Ka);}};f.onAfterRestoreView=function(n){};r._onAfterRestoreViewCascade=function(l,a){var
ta=[l];while(ta.length>0){var
cb=ta.shift();if(cb.onAfterRestoreView!=f.onAfterRestoreView){var
ib=cb.getRendered(a);if(ib)cb.onAfterRestoreView(ib);}var
fa=cb.getChildren();if(fa.length>0)ta.unshift.apply(ta,fa);}};f.isDomPaint=function(){return false;};f.paintDom=function(){throw new
jsx3.Exception();};f.H5=function(){return ub.l+this.getId()+ub.m;};r.hp=[];r.Yq=function(p){r.hp.push(p);jsx3.sleep(r.YB,ub.n);};r.YB=function(){for(var
z=0;z<r.hp.length;z++){var
G=r.hp[z];var
u=G.getRendered();if(u!=null){var
kb=G.paintDom();u.parentNode.replaceChild(kb,u);}}r.hp.splice(0,r.hp.length);};f.paintChild=function(m,j,d,s){if(d==null)d=this.getRendered();if(d!=null){if(!s)if(m.isDomPaint()){d.appendChild(m.paintDom());}else{var
qb=new
jsx3.util.Timer(r.jsxclass,this);Fa.insertAdjacentHTML(d,ub.o,m.paint());qb.log(ub.p);}r.vm(m,d);}};f.cl=function(p,m){this.paintChild(p,m);};f.insertHTML=function(h){this.paintChild(h);return this;};f.paintChildren=function(s){if(s==null)s=this.getChildren();var
z=new
Array(s.length);for(var
G=0;G<s.length;G++){var
Wa=s[G];if(Wa.isDomPaint()){z[G]=Wa.H5();r.Yq(Wa);}else{var
Ua=Wa.getLoadType();if(Ua==1||Ua==2||Ua==3){z[G]=Wa.H5();jsx3.sleep(jsx3.makeCallback(ub.k,Wa),ub.q+Wa.getId());}else if((Ua==5||Ua==4)&&!Wa.Tm()){z[G]=Wa.H5();}else z[G]=Wa.paint();}}return z.join(ub.f);};f._conditionalPaint=function(){var
lb;if(this.isDomPaint()){lb=this.H5();r.Yq(this);}else{var
Sa=this.getLoadType();if(Sa==1||Sa==2||Sa==3){lb=this.H5();jsx3.sleep(jsx3.makeCallback(ub.k,this),ub.q+this.getId());}else if((Sa==5||Sa==4)&&!this.Tm()){lb=this.H5();}else lb=this.paint();}return lb;};f.Wl=function(i,s){if(this._jsxHK)this.clearBoxProfile();if(this._jsxxw==null&&i)this._jsxxw=this.Vm(s);return this._jsxxw;};f.Gh=function(e){this._jsxxw=e;};f.ce=function(){this._jsxHK=true;};f.clearBoxProfile=function(d){var
bb=[this];while(bb.length>0){var
D=bb.shift();delete D[ub.r];delete D[ub.s];if(D._jsxxw){delete D[ub.t];if(d){var
Ha=D.getChildren();if(Ha.length>0)bb.push.apply(bb,Ha);}}}};r.ao=function(m,l,q){if(l){var
I=(jsx3.util.strTrim(l)).split(ub.u);for(var
T=0;T<I.length;T++){var
Aa=I[T];if(Aa==ub.f)continue;var
Mb=Aa.split(ub.v);if(Mb&&Mb.length==2){var
J=Mb[0].replace(ub.w,function(k,e){return (e.substring(1)).toUpperCase();});m.style[J]=Mb[1];}}}else if(q){var
D=[ub.x,ub.y,ub.z,ub.A];for(var
T=0;T<4;T++){var
J=q+D[T];m.style[J]=ub.f;}}};f.recalcBox=function(g){this.findDescendants(function(q){q.clearBoxProfile(false);},true,true,false,true);this.Wc(this.getParent()?(this.getParent()).ng(this):null,this.getRendered());if(g){var
H=this.getRendered();if(H!=null){var
Ma=this.Wl(true);for(var
va=0;va<g.length;va++)if(g[va]==ub.B){r.ao(H,Ma.Vg(),ub.B);}else if(g[va]==ub.C){r.ao(H,Ma.Nf(),ub.C);}else if(g[va]==ub.D)r.ao(H,Ma.tg(),ub.D);}}};f.ng=function(){var
L=this._jsxxw;return L!=null?{parentwidth:L.Nd(),parentheight:L.Qi()}:{};};f.Gi=function(i){var
wa=this._jsxFD?this._jsxFD[i]:null;return wa;};f.Ck=function(a,g){if(!this._jsxFD)this._jsxFD=[];this._jsxFD[a]=g;return g;};f.flushCachedClientDimensions=function(g){};f.Vm=function(s){return new
r.Box({});};f.Rc=function(d,a,n){this.ag(d,a,n,1);};f.ag=function(m,o,s,e){if(e==1){this.ce();if(o!=null)s.addRepaint(this);}else if(e==2||e==4){var
U=this.Wl(true,m);var
za=U.recalculate(m,o,s);if(za.w||za.h){if(!r._RESIZE_EVENT&&jsx3.gui.Interactive)r._RESIZE_EVENT={subject:ub.E};if(r._RESIZE_EVENT)this.publish(r._RESIZE_EVENT);var
qa=this.getChildren();var
ob=e==4&&o?Math.max(0,o.childNodes.length-qa.length):0;for(var
da=qa.length-1;da>=0;da--){var
la=qa[da];var
z=la.Wl(false);if(z&&z.qT())continue;var
pa=da+ob;var
Ca=o?o.childNodes[pa]?o.childNodes[pa]:true:null;s.add(la,{parentwidth:U.Nd(),parentheight:U.Qi()},Ca,true);}}else{}}else if(e==3){var
U=this.Wl(true,m);if(o)U.recalculate(m,o,s);}};f.ge=function(o,l){var
_a=new
jsx3.util.Timer(r.jsxclass,this);var
kb=new
r.Queue();kb.add(this,o,l);kb.subscribe(ub.F,function(){_a.log(ub.G);});kb.start();};r.nY={};r.nY.add=function(d,c,b){var
Lb=new
jsx3.util.Timer(r.jsxclass,d);d.J7(this,c,b);Lb.log(ub.H);};r.nY.addRepaint=function(l){l.repaint();};f.Wc=function(m,o){r.nY.add(this,m,o);};r.UPDATE_MAP=new
jsx3.util.WeakMap();f.J7=function(a,q,n){var
zb=1+(r.UPDATE_MAP.get(this.getId())||Number(0));if(zb>1)(jsx3.util.Logger.getLogger(ub.i+r.jsxclass)).warn(zb+ub.I+this);r.UPDATE_MAP.set(this.getId(),zb);this.applyDynamicProperties();delete this[ub.s];this.Rc(q,n,a);};});jsx3.Class.defineClass("jsx3.gui.Painted.Queue",jsx3.lang.Object,[jsx3.util.EventDispatcher],function(m,l){var
ub={a:"jsx3.gui.Painted.queue",b:"unshift",c:"push",d:"done",e:"Ks",f:"{Painted.Queue ",g:" ",h:"-",i:"}"};m.Z7=250;m.uv=0;m.J0=new
jsx3.util.List();m.RD=true;m.Wr=false;m.enableChunking=function(o){m.RD=o;};m.E2=function(){m.doChunk();};m.doChunk=function(){if(m.RD){if(m.Wr)return;m.Wr=true;var
H=(new
Date()).getTime()+m.Z7;var
zb=(new
Date()).getTime();var
Qa=m.J0.removeAt(0);while(Qa!=null&&zb<H)if(Qa.Ks.length>0){var
Ib=Qa.Ks.shift();if(jsx3.$A.is(Ib))Ib[0].J7(Qa,Ib[1],Ib[2]);else Ib.repaint();zb=(new
Date()).getTime();}else{Qa.destroy();Qa=m.J0.removeAt(0);}if(Qa!=null){m.J0.add(Qa,0);jsx3.sleep(m.doChunk,ub.a);}m.Wr=false;}else while(m.J0.size()>0){var
Qa=m.J0.removeAt(0);while(Qa.Ks.length>0){var
Ib=Qa.Ks.shift();if(jsx3.$A.is(Ib))Ib[0].J7(Qa,Ib[1],Ib[2]);else Ib.repaint();}}};l.init=function(){this.jG=
++m.uv;this.Ks=[];m.J0.add(this);};l.add=function(q,f,c,r){if(c===true)c=q.getRendered();this.Ks[r?ub.b:ub.c]([q,f,c]);};l.addRepaint=function(n,f){this.Ks[f?ub.b:ub.c](n);};l.start=function(){m.E2();};l.destroy=function(){this.publish({subject:ub.d});delete this[ub.e];m.J0.remove(this);};l.toString=function(){return ub.f+this.jG+ub.g+(this.Ks!=null?this.Ks.length:ub.h)+ub.i;};});jsx3.Class.defineClass("jsx3.gui.Painted.Box",jsx3.lang.Object,null,function(q,b){var
xb={A:"display:-moz-inline-box;",Aa:/-top/,B:"box",Ba:/-right/,C:"0px",Ca:/-bottom/,D:"string",Da:/-left/,E:"number",Ea:/border(?:(?:-top(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi,F:"object",Fa:/border(?:(?:-top(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi,G:"%",Ga:/border(?:(?:-top(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi,H:";",Ha:/border(?:(?:-right(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi,I:"px",Ia:/border(?:(?:-right(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi,J:"px;",Ja:/border(?:(?:-right(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi,K:"px ",Ka:/border(?:(?:-bottom(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi,L:":",La:/border(?:(?:-bottom(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi,M:"relativebox",Ma:/border(?:(?:-bottom(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi,N:"<",Na:/border(?:(?:-left(?:-width)?)|(?:-width))?:[^0-9]*([0-9]*)px/gi,O:" ",Oa:/border(?:(?:-left(?:-color)?)|(?:-color))?:[^;]*((?:#[a-zA-Z0-9]{6})|(?:rgb\s*\(\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*,\s*\d{1,3}%?\s*\))|(?:AliceBlue|AntiqueWhite|Aqua|Aquamarine|Azure|Beige|Bisque|Black|BlanchedAlmond|Blue|BlueViolet|Brown|BurlyWood|CadetBlue|Chartreuse|Chocolate|Coral|CornflowerBlue|Cornsilk|Crimson|Cyan|DarkBlue|DarkCyan|DarkGoldenrod|DarkGray|DarkGreen|DarkKhaki|DarkMagenta|DarkOliveGreen|DarkOrange|DarkOrchid|DarkRed|DarkSalmon|DarkSeaGreen|DarkSlateBlue|DarkSlateGray|DarkTurquoise|DarkViolet|DeepPink|DeepSkyBlue|DimGray|DodgerBlue|FireBrick|FloralWhite|ForestGreen|Fuchsia|Gainsboro|GhostWhite|Gold|Goldenrod|Gray|Green|GreenYellow|Honeydew|HotPink|IndianRed|Indigo|Ivory|Khaki|Lavender|LavenderBlush|LawnGreen|LemonChiffon|LightBlue|LightCora|LightCyan|LightGoldenrodYellow|LightGreen|LightGrey|LightPink|LightSalmon|LightSeaGreen|LightSkyBlue|LightSlateGray|LightSteelBlu|LightYellow|Lime|LimeGreen|Linen|Magenta|Maroon|MediumAquamarine|MediumBlue|MediumOrchid|MediumPurple|MediumSeaGreen|MediumSlateBlue|MediumSpringGreen|MediumTurquoise|MediumVioletRed|MidnightBlue|MintCream|MistyRose|Moccasin|NavajoWhite|Navy|OldLace|Olive|OliveDrab|Orange|OrangeRed|Orchid|PaleGoldenrod|PaleGreen|PaleTurquoise|PaleVioletRed|PapayaWhip|PeachPuff|Peru|Pink|Plum|PowderBlue|Purple|Red|RosyBrown|RoyalBlue|SaddleBrown|Salmon|SandyBrown|SeaGreen|Seashell|Sienna|Silver|SkyBlue|SlateBlue|SlateGray|Snow|SpringGreen|SteelBlue|Tan|Teal|Thistle|Tomato|Turquoise|Violet|Wheat|White|WhiteSmoke|Yellow|YellowGreen))/gi,P:"width:",Pa:/border(?:(?:-left(?:-style)?)|(?:-style))?:[^;]*(dashed|dotted|double|groove|hidden|inset|none|outset|ridge|solid)/gi,Q:"height:",Qa:"IMPLICIT:\n",R:'"/>',Ra:": ",S:'">',Sa:"\n",T:"left:0px",Ta:"\nEXPLICIT:\n",U:"left:",V:"top:0px",W:"top:",X:"position:absolute;",Y:' style="',Z:"position:relative;",_:"</",a:/[^\d-]*([-]*[\d]*)[^\d-]*([-]*[\d]*)[^\d-]*([-]*[\d]*)[^\d-]*([-]*[\d]*)/,aa:">",b:/\b(\d*)px/g,ba:"resize",c:"boxtype",ca:"onResize",d:"tagname",da:/input\[(\S*)\]/i,e:"margin",ea:"input",f:"padding",fa:/(^[;\s]*)|([;\s]*$)/g,g:"border",ga:"pseudo",h:"left",ha:"border-top:",i:"top",ia:"border-right:",j:"width",ja:"border-bottom:",k:"height",ka:"border-left:",l:"empty",la:"text",m:"container",ma:"password",n:"XZ",na:"textarea",o:"m3",oa:"td",p:"lT",pa:"body",q:"U0",qa:'<div id="_jsx3_html_scr" class="jsx30block" style="padding:0px;margin:0px;border-width:0px;position:absolute;width:100px;height:100px;left:-100px;top:-100px;overflow:scroll;">&#160;</div>',r:"h8",ra:"beforeEnd",s:"yy",sa:"_jsx3_html_scr",t:"E3",ta:"not matched",u:"Q6",ua:"0",v:"right",va:/(\s*(padding|padding-top|padding-right|padding-bottom|padding-left)\s*:\s*(\d+)(px)?\s*((\d+)(px)?)?\s*((\d+)(px)?)?\s*((\d+)(px)?)?\s*;)+/ig,w:"bottom",wa:/(\s*(margin|margin-top|margin-right|margin-bottom|margin-left)\s*:\s*(-*\d+)(px)?\s*((-*\d+)(px)?)?\s*((-*\d+)(px)?)?\s*((-*\d+)(px)?)?\s*;)+/ig,x:"",xa:"Missing Semicolon",y:"display:inline-table;",ya:/[^\s*]/i,z:"display:inline-block;",za:"Mismatch Rule"};var
ma=jsx3.html;q.HA=xb.a;q.sp=xb.b;q.vB=[xb.c,xb.d,xb.e,xb.f,xb.g,xb.h,xb.i,xb.j,xb.k,xb.l,xb.m];q.Ot=[xb.c,xb.h,xb.i,xb.j,xb.k];q.cH={width:xb.n,height:xb.o,top:xb.p,left:xb.q,padding:xb.r,border:xb.s,margin:xb.t,tagname:xb.u};q.s3=[xb.i,xb.v,xb.w,xb.h];q.dN=null;if(jsx3.CLASS_LOADER.SAF){q.v1=[xb.x,xb.y,xb.x,xb.y];}else if(jsx3.CLASS_LOADER.IE){q.v1=[xb.x,xb.x,xb.z,xb.x];}else if(jsx3.CLASS_LOADER.FX&&jsx3.CLASS_LOADER.getVersion()>=3)q.v1=[xb.x,xb.z,xb.x,xb.z];else q.v1=[xb.x,xb.A,xb.x,xb.A];q.vC={pad:xb.f,mar:xb.e,e:xb.x,box:xb.B,zpx:xb.C,str:xb.D,num:xb.E,obj:xb.F,pct:xb.G,semi:xb.H,px:xb.I,pxs:xb.J,pxc:xb.K,c:xb.L,rbox:xb.M,bor:xb.g};q.gE={hph:{height:1,parentheight:1},wpw:{width:1,parentwidth:1}};q.AD=[xb.N,xb.O,xb.P,xb.Q,xb.R,xb.S,xb.T,xb.U,xb.V,xb.W,xb.X,xb.Y,xb.Z,xb._,xb.aa,xb.x];q.getCssFix=function(){return q.v1[ma.getMode()];};b.nu=xb.x;b.CJ=xb.x;b.DI=xb.x;b.S5=true;b.styles=xb.x;b.attributes=xb.x;b.init=function(h){this.implicit=h||{};this.calculate();};b.reset=function(){this.S5=true;};b.paint=function(){this.S5=false;var
Kb=new
Array(2);var
Ea=q.AD[0]+this.Ts.tagname+q.AD[1]+this.attributes;var
qa=this.getPaintedWidth();qa=qa!=null?q.AD[2]+Math.max(0,qa)+q.vC.pxs:q.vC.e;var
Gb=this.getPaintedHeight();Gb=Gb!=null?q.AD[3]+Math.max(0,Gb)+q.vC.pxs:q.vC.e;var
L=this.Ts.empty?q.AD[4]:q.AD[5];if(this.Ts.boxtype==q.vC.box){var
W=this.Ts.left;W=W==null?q.AD[6]:q.AD[7]+W+q.vC.pxs;var
Cb=this.Ts.top;Cb=Cb==null?q.AD[8]:q.AD[9]+Cb+q.vC.pxs;var
Db=this.implicit.omitpos?q.vC.e:q.AD[10];Kb[0]=Ea+q.AD[11]+Db+qa+Gb+W+Cb+this.Vg()+this.Nf()+this.tg()+this.styles+L;}else if(this.Ts.boxtype==q.vC.rbox){var
Db=this.implicit.omitpos?q.vC.e:q.AD[12];Kb[0]=Ea+q.AD[11]+Db+this.eM()+qa+Gb+this.Vg()+this.Nf()+this.tg()+this.styles+L;}else{var
W=this.Ts.left;W=W==null?q.vC.e:q.AD[7]+W+q.vC.pxs;var
Cb=this.Ts.top;Cb=Cb==null?q.vC.e:q.AD[9]+Cb+q.vC.pxs;var
Db=this.implicit.omitpos?q.vC.e:q.AD[12];Kb[0]=Ea+q.AD[11]+Db+qa+Gb+W+Cb+this.Vg()+this.Nf()+this.tg()+this.styles+L;}Kb[1]=this.Ts.empty?q.AD[15]:q.AD[13]+this.Ts.tagname+q.AD[14];return Kb;};b.setStyles=function(a){this.styles=a;return this;};b.setAttributes=function(i){this.attributes=i;return this;};b.eM=function(){return this.Ts.container&&(ma.getMode()==3||ma.getMode()==1)?q.vC.e:q.getCssFix();};b.qT=function(){var
v=this.implicit;return (typeof v.width!=q.vC.str||v.width.indexOf(q.vC.pct)<0)&&(typeof v.height!=q.vC.str||v.height.indexOf(q.vC.pct)<0)&&(typeof v.left!=q.vC.str||v.left.indexOf(q.vC.pct)<0)&&(typeof v.top!=q.vC.str||v.top.indexOf(q.vC.pct)<0);};q._RECALC_VALS=[[[[{n:1},{h:1}],[{w:1},{w:1,h:1}]],[[{t:1},{t:1,h:1}],[{t:1,w:1},{t:1,w:1,h:1}]]],[[[{l:1},{l:1,h:1}],[{l:1,w:1},{l:1,w:1,h:1}]],[[{l:1,t:1},{l:1,t:1,h:1}],[{l:1,t:1,w:1},{l:1,t:1,w:1,h:1,a:1}]]]];b.recalculate=function(d,m){var
Y=this.S5;var
Z=0,fa=0,Ua=0,vb=0;for(var u in d)if(this.implicit[u]!=d[u]){this.implicit[u]=d[u];Y=true;if(!Ua&&q.gE.wpw[u])Ua=1;if(!vb&&q.gE.hph[u])vb=1;}if(Y){this.calculate(q.Ot);if(m){var
Pa=m.style;if(this.Ts.boxtype==q.vC.box&&this.Ts.left!=null&&this.Ts.top!=null){if(parseInt(Pa.left)!=this.Ts.left){Pa.left=this.Ts.left+q.vC.px;Z=1;}if(parseInt(Pa.top)!=this.Ts.top){Pa.top=this.Ts.top+q.vC.px;fa=1;}}if(d.parentheight!=null||d.parentwidth!=null||d.width!=null||d.height!=null){var
la=this.getPaintedWidth();var
w=this.getPaintedHeight();if(la!=null&&parseInt(Pa.width)!=la){Pa.width=Math.max(0,la)+q.vC.px;Ua=1;}else Ua=0;if(w!=null&&parseInt(Pa.height)!=w){Pa.height=Math.max(0,w)+q.vC.px;vb=1;}else vb=0;}}}this.S5=false;return q._RECALC_VALS[Z][fa][Ua][vb];};q.eL={left:1,top:1};q.bt=function(){};q.bt.prototype={padding:xb.x,margin:xb.x,border:xb.x,bwidth:0,bheight:0,btop:0,bleft:0,pwidth:0,pheight:0,ptop:0,pleft:0};b.calculate=function(d){if(!d)d=q.vB;if(!this.Ts)this.Ts=new
q.bt();var
Nb=this.Ts;for(var
fa=0;fa<d.length;fa++){var
pa=d[fa];var
z=this.implicit[pa];if(q.eL[pa]&&(z==null||z==q.vC.e)&&this.implicit.boxtype==q.vC.box){Nb[pa]=0;}else{var
L=q.cH[pa];if(L){if(z===q.vC.e)z=null;this[L](z);}else this.Ts[pa]=z;}}};q.registerServer=function(e,s){if(s)jsx3.gui.Event.subscribe(xb.ba,e,xb.ca);};q.unregisterServer=function(d,a){if(a)jsx3.gui.Event.unsubscribe(xb.ba,d,xb.ca);};b.XZ=function(f){if(f==null){this.Ts.width=this.Ts.clientwidth=null;}else{if(typeof f==q.vC.str&&f.indexOf(q.vC.pct)>=0)f=Math.round(this.implicit.parentwidth*parseInt(f)/100);else f=Number(f);this.Ts.width=f;this.Ts.clientwidth=Math.max(0,f-this.Ts.pwidth-this.Ts.bwidth);}};b.m3=function(m){if(m==null){this.Ts.height=this.Ts.clientheight=null;}else{if(typeof m==q.vC.str&&m.indexOf(q.vC.pct)>=0)m=Math.round(this.implicit.parentheight*parseInt(m)/100);else m=Number(m);this.Ts.height=m;this.Ts.clientheight=Math.max(0,m-this.Ts.pheight-this.Ts.bheight);}};b.U0=function(s){this.Ts.left=typeof s==q.vC.str&&s.indexOf(q.vC.pct)>=0?Math.round(this.implicit.parentwidth*parseInt(s)/100):s==null?s:Number(s);};b.lT=function(s){this.Ts.top=typeof s==q.vC.str&&s.indexOf(q.vC.pct)>=0?Math.round(this.implicit.parentheight*parseInt(s)/100):s==null?s:Number(s);};b.Q6=function(a){if(a==null){this.Ts.tagname=a;this.Ts.type=a;}else if(a.search(xb.da)>-1){this.Ts.tagname=xb.ea;this.Ts.type=RegExp.$1.toLowerCase();}else this.Ts.tagname=a;};b.yy=function(p){if(p==null)p=q.vC.e;if(this.nu===p)return;this.nu=p;var
ib=null,J=null;if(typeof p==q.vC.str&&p.indexOf(xb.L)>=0){var
Oa=q.y4(p);if(typeof Oa!=q.vC.obj)ib=Oa.split(q.vC.semi);}else{p=p.replace(xb.fa,q.vC.e);if(p!==q.vC.e)ib=p.split(q.vC.semi);}if(ib&&ib.length>1){var
Ga=true;for(var
Za=0;Ga&&Za<ib.length-1&&Za<3;Za++)if(ib[Za]!=ib[Za+1])Ga=false;if(Ga)ib.splice(1,ib.length);}if(!ib){J=[0,0,0,0];}else if(ib.length==1){var
fa=ib[0].match(q.sp);var
ta=fa?parseInt(fa[0]):0;if(isNaN(ta))ta=0;J=[ta,ta,ta,ta];}else{J=[];for(var
Za=0;Za<4;Za++){var
fa=ib[Za].match(q.sp);var
ta=fa?parseInt(fa[0]):0;if(isNaN(ta))ta=0;J[Za]=ta;}}this.Ts.bwidth=J[1]+J[3];this.Ts.bheight=J[0]+J[2];this.Ts.bleft=J[3];this.Ts.btop=J[0];if(ib)for(var
Za=0;Za<ib.length;Za++)if(ib[Za].indexOf(xb.ga)>=0)ib[Za]=q.vC.e;if(ib==null){this.Ts.border=q.vC.e;}else if(ib.length==1){this.Ts.border=ib[0]?q.vC.bor+q.vC.c+(J[0]>0?ib[0]:q.vC.zpx)+q.vC.semi:q.vC.e;}else if(ib.length==4)this.Ts.border=(ib[0]?xb.ha+(J[0]>0?ib[0]:q.vC.zpx)+q.vC.semi:q.vC.e)+(ib[1]?xb.ia+(J[1]>0?ib[1]:q.vC.zpx)+q.vC.semi:q.vC.e)+(ib[2]?xb.ja+(J[2]>0?ib[2]:q.vC.zpx)+q.vC.semi:q.vC.e)+(ib[3]?xb.ka+(J[3]>0?ib[3]:q.vC.zpx)+q.vC.semi:q.vC.e);};b.E3=function(r){if(r==null)r=q.vC.e;if(this.CJ===r)return;this.CJ=r;var
kb=null;if(typeof r==q.vC.str&&r.indexOf(xb.L)>-1){var
I=q.gY(r,q.vC.mar);if(typeof I!=q.vC.obj)kb=I.match(q.HA);}else if(typeof r==q.vC.num){kb=[r];}else{r=jsx3.util.strTrim(String(r));if(r!==q.vC.e)if(isNaN(r))kb=r.match(q.HA);else kb=[Number(r)];}if(kb==null)this.Ts.margin=q.vC.e;else if(kb.length==1)this.Ts.margin=q.vC.mar+q.vC.c+kb[0]+q.vC.pxs;else this.Ts.margin=q.vC.mar+q.vC.c+kb[1]+q.vC.pxc+kb[2]+q.vC.pxc+kb[3]+q.vC.pxc+kb[4]+q.vC.pxs;};b.h8=function(c){if(c==null)c=q.vC.e;if(this.DI===c)return;this.DI=c;var
ia=null;if(typeof c==q.vC.str&&c.indexOf(xb.L)>-1){var
xa=q.gY(c,q.vC.pad);if(typeof xa!=q.vC.obj)ia=xa.match(q.HA);}else if(typeof c==q.vC.num){ia=[c];}else{c=jsx3.util.strTrim(String(c));if(c!==q.vC.e)if(isNaN(c))ia=c.match(q.HA);else ia=[Number(c)];}var
Ua=null;if(ia==null){Ua=[0,0,0,0];this.Ts.padding=q.vC.e;}else if(ia.length==1){var
Gb=ia[0];Ua=[Gb,Gb,Gb,Gb];this.Ts.padding=q.vC.pad+q.vC.c+Gb+q.vC.pxs;}else{Ua=[];for(var
Mb=1;Mb<5;Mb++){var
Gb=parseInt(ia[Mb]);if(isNaN(Gb))Gb=0;Ua[Mb-1]=Gb;}this.Ts.padding=q.vC.pad+q.vC.c+Ua[0]+q.vC.pxc+Ua[1]+q.vC.pxc+Ua[2]+q.vC.pxc+Ua[3]+q.vC.pxs;}this.Ts.pwidth=Ua[1]+Ua[3];this.Ts.pheight=Ua[0]+Ua[2];this.Ts.ptop=Ua[0];this.Ts.pleft=Ua[3];};b.bl=function(o){var
Ta=this._P;if(!Ta)Ta=this._P=[];Ta[Ta.length]=o;};b.lg=function(i){return this._P?this._P[i]:null;};b.Jg=function(){return this.Ts.bleft+this.Ts.pleft;};b.ll=function(){return this.Ts.btop+this.Ts.ptop;};b.Nd=function(){return this.Ts.clientwidth;};b.Qi=function(){return this.Ts.clientheight;};b.getOffsetWidth=function(){return this.Ts.width;};b.getOffsetHeight=function(){return this.Ts.height;};b.getBorderWidth=function(){return this.Ts.bwidth;};b.getBorderHeight=function(){return this.Ts.bheight;};b.getPaintedWidth=function(){var
t=this.Ts.type;var
C=ma.getMode();if(jsx3.CLASS_LOADER.SAF){var
wb=(t==xb.la||t==xb.ma||this.Ts.tagname==xb.na||this.Ts.tagname==xb.oa)&&C==1?this.Ts.width:this.Ts.clientwidth;}else var
wb=C==0||(t==xb.la||t==xb.ma||this.Ts.tagname==xb.na)&&C==1?this.Ts.width:this.Ts.clientwidth;return wb===q.vC.e||isNaN(wb)?null:wb;};b.getPaintedHeight=function(){var
wa=this.Ts.type;var
cb=ma.getMode();var
J=cb==0||(wa==xb.la||wa==xb.ma||this.Ts.tagname==xb.na)&&cb==1?this.Ts.height:this.Ts.clientheight;return J===q.vC.e||isNaN(J)?null:J;};b.getPaintedLeft=function(){return this.Ts.left;};b.getPaintedTop=function(){return this.Ts.top;};b.getBoxType=function(){return this.Ts.boxtype;};b.Nf=function(){return this.Ts.margin||q.vC.e;};b.Vg=function(){return this.Ts.padding||q.vC.e;};b.tg=function(){return this.Ts.border||q.vC.e;};q.getBody=function(){return (document.getElementsByTagName(xb.pa))[0];};q.getScrollSize=function(a){if(q.dN==null){var
y=a||q.getBody();var
W=xb.qa;ma.insertAdjacentHTML(y,xb.ra,W);var
va=document.getElementById(xb.sa);q.dN=100-parseInt(va.clientWidth);y.removeChild(va);}return q.dN;};q.getScrollSizeOffset=function(n){var
pb=q.getScrollSize();return ma.getScrollSizeOffset(pb,n);};q.gY=function(m,d){var
Fb=xb.ta;var
Cb=xb.ua;var
Ca=xb.ua;var
la=xb.ua;var
A=xb.ua;var
E=xb.va;var
U=xb.wa;var
ia=d==q.vC.pad?E:U;var
H=m.split(q.vC.semi);if(H)for(var
wb=0;wb<H.length;wb++){var
Ma=H[wb]+q.vC.semi;var
Mb=Ma.search(ia);if(Mb>0){return {desc:xb.xa,cause:H[wb]};}else if(Mb==-1){if(H[wb].search(xb.ya)>=0)return {desc:xb.za,cause:H[wb]};}else{Fb=Ma.replace(ia,function(c,f,a,s,r,h,p,o,n,e,j,g,l){if(a.match(xb.Aa)){Cb=s==null?xb.ua:s;}else if(a.match(xb.Ba)){Ca=s==null?xb.ua:s;}else if(a.match(xb.Ca)){la=s==null?xb.ua:s;}else if(a.match(xb.Da)){A=s==null?xb.ua:s;}else{Cb=jsx3.util.strEmpty(s)?xb.ua:s;Ca=jsx3.util.strEmpty(p)?Cb:p;la=jsx3.util.strEmpty(e)?Cb:e;A=jsx3.util.strEmpty(l)?Ca:l;}return Cb+xb.O+Ca+xb.O+la+xb.O+A;});Fb=Cb+xb.O+Ca+xb.O+la+xb.O+A;}}return Fb;};var
ub=xb.Ea;var
D=xb.Fa;var
S=xb.Ga;var
Fa=xb.Ha;var
Wa=xb.Ia;var
bb=xb.Ja;var
Ba=xb.Ka;var
sa=xb.La;var
Da=xb.Ma;var
rb=xb.Na;var
ca=xb.Oa;var
za=xb.Pa;q.y4=function(o){var
wb={top:{width:0,color:xb.x,style:xb.x},right:{width:0,color:xb.x,style:xb.x},bottom:{width:0,color:xb.x,style:xb.x},left:{width:0,color:xb.x,style:xb.x}};while(ub.exec(o))wb.top.width=RegExp.$1;while(D.exec(o))wb.top.color=RegExp.$1;while(S.exec(o))wb.top.style=RegExp.$1;while(Fa.exec(o))wb.right.width=RegExp.$1;while(Wa.exec(o))wb.right.color=RegExp.$1;while(bb.exec(o))wb.right.style=RegExp.$1;while(Ba.exec(o))wb.bottom.width=RegExp.$1;while(sa.exec(o))wb.bottom.color=RegExp.$1;while(Da.exec(o))wb.bottom.style=RegExp.$1;while(rb.exec(o))wb.left.width=RegExp.$1;while(ca.exec(o))wb.left.color=RegExp.$1;while(za.exec(o))wb.left.style=RegExp.$1;return wb.top.width+q.vC.pxc+wb.top.style+xb.O+wb.top.color+q.vC.semi+wb.right.width+q.vC.pxc+wb.right.style+xb.O+wb.right.color+q.vC.semi+wb.bottom.width+q.vC.pxc+wb.bottom.style+xb.O+wb.bottom.color+q.vC.semi+wb.left.width+q.vC.pxc+wb.left.style+xb.O+wb.left.color;};b.toString=function(){var
N=xb.Qa;for(var u in this.implicit)N=N+(u+xb.Ra+this.implicit[u]+xb.Sa);N=N+xb.Ta;for(var u in this.Ts)N=N+(u+xb.Ra+this.Ts[u]+xb.Sa);return N;};});jsx3.Class.defineClass("jsx3.app.Model.Loading",jsx3.gui.Painted,null,function(q,r){var
ub={a:"undefined",b:"jsx1:strings/@jsxname"};r.init=function(p,s,j){this._jsxhX=p;p._jsxbm=true;this._jsxtw=s;this._jsxH4=j;if(s==2||s==3)jsx3.sleep(function(){var
Ba=this.A9();if(s==2)this.dZ();else jsx3.sleep(function(){this.dZ();},null,this);},null,this);};r.A9=function(){var
gb=this.getParent();var
M=gb.Ji.apply(this,[this._jsxhX].concat(this._jsxH4));gb.setChild(M,1,null,this._jsxH4[1]);gb.insertBefore(M,this,false);var
R=gb.getDocument();if(R){var
Va=R.getElementById(this._jsxid);if(Va)Va.id=M._jsxid;}gb.removeChild(this);this._jsxT1=M;if(this._jsxtw==5)this.dZ();return M;};r.getName=function(){if(typeof this._jsxE6==ub.a){var
Ra=this._jsxhX.selectSingleNode(ub.b);this._jsxE6=Ra?Ra.getValue():null;}return this._jsxE6;};r.getType=function(){return this._jsxtw;};r.Mi=function(p,f){return this._jsxhX.cloneNode(true);};r.dZ=function(){this._jsxT1.repaint();};r.paint=function(){return this.H5();};r.getRendered=function(){return null;};r.Dk=function(i){if(i&&this._jsxtw==5)this.A9();this.jsxsuper(i);return this._jsxT1;};});jsx3.require("jsx3.gui.HotKey");jsx3.Class.defineInterface("jsx3.gui.Interactive",null,function(f,e){var
ub={A:"jsxbeforeedit",Aa:"dl",B:"jsxbeforemove",Ba:/\"/g,C:"jsxbeforeresize",Ca:"&quot;",D:"jsxbeforeselect",Da:";",E:"jsxbeforesort",Ea:"string",F:"jsxcanceldrop",Fa:"jsx3.",G:"jsxctrldrop",Ga:"(event,this,'",H:"jsxdestroy",Ha:"',",I:"jsxdata",Ia:");",J:"jsxdrag",Ja:"jsx3.GO('",K:"jsxdrop",Ka:"').",L:"jsxexecute",La:"');",M:"jsxhide",Ma:" ",N:"jsxincchange",Na:'="',O:"jsxinput",Oa:"",P:"jsxmenu",Pa:'"',Q:"jsxscroll",Qa:/;\s*$/,R:"jsxselect",Ra:"gui.int.br",S:"jsxshow",Sa:"id",T:"jsxspy",Ta:"body",U:"jsxtoggle",Ua:"gui.int.eb",V:/\S/,Va:"absolute",W:"function",Wa:"JSXDragId",X:"blur",Xa:"JSXDragType",Y:"change",Ya:"_jsxspy",Z:"click",Za:"jsx3.gui.Heavyweight",_:"dblclick",_a:'<span class="jsx30spyglassbuffer"><div class="jsx30spyglass">',a:"jsxblur",aa:"focus",ab:"</div></span>",b:"jsxchange",ba:"keydown",bb:"W",c:"jsxclick",ca:"keypress",cb:"E",d:"jsxdblclick",da:"keyup",db:"S",e:"jsxfocus",ea:"mousedown",eb:"N",f:"jsxkeydown",fa:"mousemove",fb:"X",g:"jsxkeypress",ga:"mouseout",gb:"Y",h:"jsxkeyup",ha:"mouseover",hb:"_jsxIu",i:"jsxload",ia:"mouseup",ib:"_jsxsP",j:"jsxmousedown",ja:"mousewheel",jb:"jsxspystylekeys",k:"jsxmouseout",ka:"ah",kb:"jsxspystylevalues",l:"jsxmouseover",la:"ld",lb:/ *; */,m:"jsxmouseup",ma:"qh",mb:/(-\S)/gi,n:"jsxmousewheel",na:"Bg",nb:":",o:"text-decoration:underline",oa:"Ik",ob:"jsxmodal",p:"jsxadopt",pa:"_ebKeyDown",pb:"vntCallback",q:"jsxafterappend",qa:"Lh",qb:"3.00.00",r:"jsxaftercommit",ra:"mc",rb:"EVENTSVERS",s:"jsxafteredit",sa:"Xg",sb:"onDestroy",t:"jsxaftermove",ta:"_ebMouseMove",tb:"rB",u:"jsxafterreorder",ua:"nk",v:"jsxafterresize",va:"Pe",w:"jsxafterresizeview",wa:"eo",x:"jsxaftersort",xa:"lk",y:"jsxbeforeappend",ya:"on",z:"jsxbeforedrop",za:"yp"};var
N=jsx3.gui.Event;f.JSXBLUR=ub.a;f.JSXCHANGE=ub.b;f.JSXCLICK=ub.c;f.JSXDOUBLECLICK=ub.d;f.JSXFOCUS=ub.e;f.JSXKEYDOWN=ub.f;f.JSXKEYPRESS=ub.g;f.JSXKEYUP=ub.h;f.JSXLOAD=ub.i;f.JSXMOUSEDOWN=ub.j;f.JSXMOUSEOUT=ub.k;f.JSXMOUSEOVER=ub.l;f.JSXMOUSEUP=ub.m;f.JSXMOUSEWHEEL=ub.n;f.FOCUS_STYLE=ub.o;f.ADOPT=ub.p;f.AFTER_APPEND=ub.q;f.AFTER_COMMIT=ub.r;f.AFTER_EDIT=ub.s;f.AFTER_MOVE=ub.t;f.AFTER_REORDER=ub.u;f.AFTER_RESIZE=ub.v;f.AFTER_RESIZE_VIEW=ub.w;f.AFTER_SORT=ub.x;f.BEFORE_APPEND=ub.y;f.BEFORE_DROP=ub.z;f.BEFORE_EDIT=ub.A;f.BEFORE_MOVE=ub.B;f.BEFORE_RESIZE=ub.C;f.BEFORE_SELECT=ub.D;f.BEFORE_SORT=ub.E;f.CANCEL_DROP=ub.F;f.CHANGE=ub.b;f.CTRL_DROP=ub.G;f.DESTROY=ub.H;f.DATA=ub.I;f.DRAG=ub.J;f.DROP=ub.K;f.EXECUTE=ub.L;f.HIDE=ub.M;f.INCR_CHANGE=ub.N;f.INPUT=ub.O;f.MENU=ub.P;f.SCROLL=ub.Q;f.SELECT=ub.R;f.SHOW=ub.S;f.SPYGLASS=ub.T;f.TOGGLE=ub.U;e.ah=function(q,o){this.doEvent(ub.a,{objEVENT:q});};e.ld=function(a,l){this.doEvent(ub.b,{objEVENT:a});};e.qh=function(n,r){this.doEvent(ub.c,{objEVENT:n});};e.Bg=function(s,m){this.doEvent(ub.d,{objEVENT:s});};e.Ik=function(d,i){this.doEvent(ub.e,{objEVENT:d});};e._ebKeyDown=function(k,b){var
Eb=false;if(this.hasHotKey())Eb=this.checkHotKeys(k);if(!Eb)this.doEvent(ub.f,{objEVENT:k});return Eb;};e.Lh=function(l,a){this.doEvent(ub.g,{objEVENT:l});};e.mc=function(r,n){this.doEvent(ub.h,{objEVENT:r});};e.Xg=function(n,r){this.doEvent(ub.j,{objEVENT:n});};e.nk=function(m,s){this.doEvent(ub.k,{objEVENT:m});};e.Pe=function(q,o){this.doEvent(ub.l,{objEVENT:q});};e.eo=function(n,r){var
ma=null;this.doEvent(ub.m,{objEVENT:n});if(n.rightButton()&&(ma=this.getMenu())!=null){var
Db=(this.getServer()).getJSX(ma);if(Db!=null){var
pb=this.doEvent(ub.P,{objEVENT:n,objMENU:Db,_gipp:1});if(pb!==false){if(pb instanceof Object&&pb.objMENU instanceof jsx3.gui.Menu)Db=pb.objMENU;Db.showContextMenu(n,this);}}}};e.lk=function(p,i){this.doEvent(ub.n,{objEVENT:p});};e.setEvent=function(g,d){(this.getEvents())[d]=g;return this;};e.getEvents=function(){if(this._jsxHj==null)this._jsxHj={};return this._jsxHj;};e.getEvent=function(r){if(this._jsxHj)return this._jsxHj[r];};e.hasEvent=function(q){return this._jsxHj!=null&&this._jsxHj[q]!=null&&this._jsxHj[q].match(ub.V);};e.doEvent=function(b,s){var
Z=this.getEvent(b);if(typeof this.publish==ub.W)this.publish({subject:b,context:s});return this.eval(Z,this._getEvtContext(s));};e._getEvtContext=function(s){var
I=this._jsxgd;if(I)s=((jsx3.$O(I.varNameIndex)).clone()).extend(s);return s;};e.removeEvent=function(c){if(this._jsxHj!=null)delete this._jsxHj[c];return this;};e.removeEvents=function(){this._jsxHj={};return this;};e.setCanMove=function(m){this.jsxmove=m;return this;};e.getCanMove=function(){return this.jsxmove||0;};e.setCanDrag=function(l){this.jsxdrag=l;return this;};e.getCanDrag=function(){return this.jsxdrag||0;};e.setCanDrop=function(l){this.jsxdrop=l;return this;};e.getCanDrop=function(){return this.jsxdrop||0;};e.setCanSpy=function(p){this.jsxspy=p;return this;};e.getCanSpy=function(){return this.jsxspy||0;};e.getMenu=function(){return this.jsxmenu;};e.setMenu=function(d){this.jsxmenu=d;return this;};f.Tj=[ub.X,ub.Y,ub.Z,ub._,ub.aa,ub.ba,ub.ca,ub.da,ub.ea,ub.fa,ub.ga,ub.ha,ub.ia,ub.ja];f.mn={};f.mn[ub.X]=ub.ka;f.mn[ub.Y]=ub.la;f.mn[ub.Z]=ub.ma;f.mn[ub._]=ub.na;f.mn[ub.aa]=ub.oa;f.mn[ub.ba]=ub.pa;f.mn[ub.ca]=ub.qa;f.mn[ub.da]=ub.ra;f.mn[ub.ea]=ub.sa;f.mn[ub.fa]=ub.ta;f.mn[ub.ga]=ub.ua;f.mn[ub.ha]=ub.va;f.mn[ub.ia]=ub.wa;f.mn[ub.ja]=ub.xa;f.isBridgeEventHandler=function(i){if(f.wC==null){f.wC={};for(var
ja=0;ja<f.Tj.length;ja++)f.wC[ub.ya+f.Tj[ja]]=true;}return f.wC[i];};f._BRIDGE=ub.za;f._EB=ub.Aa;e.Pj=function(i,s){var
na={};if((i==null||!i[ub.ba])&&(this.hasHotKey()||this.getAlwaysCheckHotKeys()))na[ub.ba]=true;if((i==null||!i[ub.ia])&&this.getMenu())na[ub.ia]=true;var
S=[];var
Va=this.instanceOf(jsx3.gui.Painted);var
ib=this.getId();for(var
Gb=0;Gb<f.Tj.length;Gb++){var
G=f.Tj[Gb];var
gb=ub.ya+G;var
ga=[];var
yb=Va?this.getAttribute(gb):null;if(yb)ga[ga.length]=yb.replace(ub.Ba,ub.Ca)+ub.Da;var
Sa=i&&i[G]||na[G];if(Sa){if(typeof Sa!=ub.Ea)Sa=f.mn[G];if(s!=null)ga[ga.length]=ub.Fa+f._EB+ub.Ga+Sa+ub.Ha+s+ub.Ia;else ga[ga.length]=ub.Ja+ib+ub.Ka+f._BRIDGE+ub.Ga+Sa+ub.La;}if(ga.length>0)S[S.length]=ub.Ma+gb+ub.Na+ga.join(ub.Oa)+ub.Pa;}return S.join(ub.Oa);};e.pi=function(o,r,c){var
Ta=ub.ya+o;var
cb=ub.Oa;var
S=false;if(S){var
pb=this.getAttribute(Ta);if(pb){cb=cb+pb;if(!pb.match(ub.Qa))cb=cb+ub.Da;}}var
qb=c!=null?ub.Fa+f._EB+ub.Ga+r+ub.Ha+c+ub.Ia:ub.Ja+this.getId()+ub.Ka+f._BRIDGE+ub.Ga+r+ub.La;return ub.Ma+Ta+ub.Na+cb+qb+ub.Pa;};e.yp=function(l,c,k){var
ob=this[k];var
Xa=jsx3.gui.Event.wrap(l);if(ob){ob.call(this,Xa,c);}else throw new
jsx3.Exception(jsx3._msg(ub.Ra,k,Xa.getType(),this));};jsx3.dl=function(h,s,o,a){var
Y=s;a=a||Number(0);for(var
I=0;I<a;I++)Y=Y.parentNode;var
ab=Y.getAttribute(ub.Sa);var
A=jsx3.GO(ab);if(A!=null)A.yp(h,s,o);else if(jsx3.html.getElmUpByTagName(s,ub.Ta)!=null)throw new
jsx3.Exception(jsx3._msg(ub.Ua,ab,a,s));};f._beginMove=function(i,d,n,m){var
Za=d.ownerDocument;jsx3.gui.Event.preventSelection(Za);var
mb=i.getTrueX();var
Eb=d.offsetLeft;jsx3.EventHelp.constrainY=m;jsx3.EventHelp.xOff=Eb-mb;var
v=i.getTrueY();var
Nb=d.offsetTop;jsx3.EventHelp.constrainX=n;jsx3.EventHelp.yOff=Nb-v;jsx3.EventHelp.PM=d;jsx3.EventHelp.FLAG=1;jsx3.EventHelp.beginTrackMouse(i);i.setCapture(d);i.cancelReturn();i.cancelBubble();};f._beginMoveConstrained=function(n,h,c){var
cb=h.ownerDocument;jsx3.gui.Event.preventSelection(cb);jsx3.EventHelp.startX=n.getTrueX();jsx3.EventHelp.startY=n.getTrueY();jsx3.EventHelp.xOff=h.offsetLeft;jsx3.EventHelp.yOff=h.offsetTop;jsx3.EventHelp.dragRounder=c;jsx3.EventHelp.PM=h;jsx3.EventHelp.FLAG=3;jsx3.EventHelp.FF=false;jsx3.EventHelp.beginTrackMouse(n);n.setCapture(h);n.cancelReturn();n.cancelBubble();};e.doBeginMove=function(q,o){if(!q.leftButton())return;if(o==null)o=this.getRendered();var
u=o.ownerDocument;var
Aa=this.doEvent(ub.B,{objEVENT:q});var
jb=Aa===false;if(o!=null&&!jb){o.style.zIndex=(this.getServer()).getNextZIndex(jsx3.app.Server.Z_DRAG);jsx3.gui.Event.preventSelection(u);var
Ia=q.getTrueX();var
V=o.style.position==ub.Va?parseInt(o.style.left)||0:o.scrollLeft;if(Aa&&Aa.bCONSTRAINY)jsx3.EventHelp.constrainY=true;jsx3.EventHelp.xOff=V-Ia;var
D=q.getTrueY();var
Na=o.style.position==ub.Va?parseInt(o.style.top)||0:o.scrollTop;if(Aa&&Aa.bCONSTRAINX)jsx3.EventHelp.constrainX=true;jsx3.EventHelp.yOff=Na-D;jsx3.EventHelp.PM=o;jsx3.EventHelp.FLAG=1;jsx3.EventHelp.FF=false;jsx3.EventHelp.beginTrackMouse(q);q.setCapture(o);}};e.doEndMove=function(j,c){if(c==null)c=this.getRendered();if(c!=null){c.style.zIndex=this.getZIndex();j.releaseCapture(c);var
Y=parseInt(c.style.left);var
Za=parseInt(c.style.top);this.setLeft(Y);this.setTop(Za);this.doEvent(ub.t,{objEVENT:j,intL:Y,intT:Za,_gipp:1});}};e.doDrag=function(n,h,a,l){n.cancelAll();if(h==null){h=n.srcElement();while(h!=null&&h.getAttribute(ub.Wa)==null){h=h.parentNode;if(h=(h.ownerDocument.getElementsByTagName(ub.Ta))[0])h=null;}if(h==null)return;}var
S=h.getAttribute(ub.Wa);var
x=h.getAttribute(ub.Xa);if(l==null)l={};l.strDRAGID=h.getAttribute(ub.Wa);l.strDRAGTYPE=h.getAttribute(ub.Xa);l.objGUI=h;l.objEVENT=n;if(this.doEvent(ub.J,l)===false)return;jsx3.EventHelp.DRAGTYPE=l.strDRAGTYPE;jsx3.EventHelp.DRAGID=l.strDRAGID;if(jsx3.$A.is(l.strDRAGIDS))jsx3.EventHelp.DRAGIDS=l.strDRAGIDS;jsx3.EventHelp.JSXID=this;if(a==null)a=jsx3.EventHelp.drag;var
kb=a(h,this,jsx3.EventHelp.DRAGTYPE,jsx3.EventHelp.DRAGID);if(kb==null){return false;}else{jsx3.EventHelp.dragItemHTML=kb;jsx3.EventHelp.FLAG=2;jsx3.EventHelp.FF=true;jsx3.EventHelp.beginTrackMouse(n);}jsx3.EventHelp.constrainX=false;jsx3.EventHelp.constrainY=false;};e.doDrop=function(l,a,s){if(jsx3.EventHelp.DRAGID!=null){var
Y=jsx3.EventHelp.JSXID;var
Ba=jsx3.EventHelp.DRAGID;var
_a=jsx3.EventHelp.DRAGTYPE;var
Sa={objEVENT:l,objSOURCE:Y,strDRAGID:Ba,strDRAGTYPE:_a};if(s==jsx3.EventHelp.ONDROP&&jsx3.gui.isMouseEventModKey(l)){Sa.objGUI=l.srcElement();this.doEvent(ub.G,Sa);jsx3.EventHelp.reset();}else if(s==jsx3.EventHelp.ONDROP){Sa.objGUI=l.srcElement();this.doEvent(ub.K,Sa);jsx3.EventHelp.reset();}else if(s==jsx3.EventHelp.ONBEFOREDROP){Sa.objGUI=l.toElement();this.doEvent(ub.z,Sa);}else if(s==jsx3.EventHelp.ONCANCELDROP){Sa.objGUI=l.fromElement();this.doEvent(ub.F,Sa);}}};e.doSpyOver=function(n,r,c){var
Ua=n.getTrueX();var
_a=n.getTrueY();if(this._jsxspytimeout)return;if(c==null)c={};n.he();c.objEVENT=n;var
tb=this;this._jsxspytimeout=window.setTimeout(function(){if(tb.getParent()==null)return;tb._jsxspytimeout=null;var
Ab=tb.doEvent(ub.T,c);if(Ab)tb.showSpy(Ab,n);},jsx3.EventHelp.SPYDELAY);};e.doSpyOut=function(q,o){if(q.isFakeOut(o))return;if(!jsx3.gui.Heavyweight)return;var
w=jsx3.gui.Heavyweight.GO(ub.Ya);if(w){var
yb=w.getRendered();if(yb&&q.isFakeOut(yb))return;}window.clearTimeout(this._jsxspytimeout);this._jsxspytimeout=null;f.hideSpy();};e.showSpy=function(a,l,h){if(a!=null){jsx3.require(ub.Za);f.hideSpy();a=ub._a+a+ub.ab;var
Ja=new
jsx3.gui.Heavyweight(ub.Ya,this);Ja.setHTML(a);Ja.setRatio(1.4);if(l instanceof N){Ja.addXRule(l,ub.bb,ub.bb,12);Ja.addXRule(l,ub.cb,ub.cb,-12);Ja.addYRule(l,ub.db,ub.eb,6);Ja.addYRule(l,ub.eb,ub.db,-6);}else{Ja.addRule(l,ub.bb,-2,ub.fb);Ja.addRule(l,ub.cb,12,ub.fb);Ja.addRule(null,ub.bb,-24,ub.fb);Ja.addRule(h,ub.eb,-2,ub.gb);Ja.addRule(h,ub.db,-6,ub.gb);Ja.setOverflow(3);}Ja.show();var
Y=Ja.getRendered();if(Y){var
ka=(Y.ownerDocument.getElementsByTagName(ub.Ta))[0];if(parseInt(Y.style.width)+parseInt(Y.style.left)>ka.offsetWidth)Ja.applyRules(ub.fb);}N.subscribe(ub.ea,jsx3.gui.Interactive.hideSpy);}};f.hideSpy=function(){if(jsx3.gui.Heavyweight){var
eb=jsx3.gui.Heavyweight.GO(ub.Ya);if(eb){eb.destroy();N.unsubscribe(ub.ea,jsx3.gui.Interactive.hideSpy);}}};e.getSpyStyles=function(p){return this.jsxspystyle?this.jsxspystyle:p?p:null;};e.setSpyStyles=function(o){delete this[ub.hb];delete this[ub.ib];delete this[ub.jb];delete this[ub.kb];this.jsxspystyle=o;};e.eZ=function(){var
U={};if(jsx3.util.strEmpty(this.getSpyStyles())&&this.jsxspystylekeys!=null){var
Ea=(this.jsxspystylekeys||ub.Oa).split(ub.lb);var
Eb=(this.jsxspystylevalues||ub.Oa).split(ub.lb);for(var
Kb=0;Kb<Ea.length;Kb++)U[Ea[Kb]]=Eb[Kb];}else{var
Ha=this.getSpyStyles(ub.o);var
X=ub.mb;var
U={};var
O=Ha.split(ub.Da);for(var
Kb=0;Kb<O.length;Kb++){var
I=O[Kb]+ub.Oa;var
Pa=I.split(ub.nb);if(Pa&&Pa.length==2){var
_a=Pa[0].replace(X,function(r,q){return (q.substring(1)).toUpperCase();});U[_a]=Pa[1];}}}return U;};e.applySpyStyle=function(a){if(this._jsxIu==null)this._jsxIu=this.eZ();if(this._jsxsP==null){this._jsxsP={};for(var ya in this._jsxIu)this._jsxsP[ya]=a.style[ya];}try{for(var ya in this._jsxIu)a.style[ya]=this._jsxIu[ya];}catch(Kb){}};e.removeSpyStyle=function(n){try{for(var ga in this._jsxsP)n.style[ga]=this._jsxsP[ga];}catch(Kb){}};e.checkHotKeys=function(n){if(this._jsxq2==null)return false;if(n.isModifierKey())return false;var
ua=false;var
va=n.getAttribute(ub.ob);for(var Nb in this._jsxq2){var
Da=this._jsxq2[Nb];if(Da instanceof jsx3.gui.HotKey){if(Da.isDestroyed()){delete this._jsxq2[Nb];continue;}else if(!Da.isEnabled())continue;if(Da.isMatch(n)){var
pa=true;if(!va)pa=Da.invoke(this,[n]);if(pa!==false)ua=true;}}}if(ua)n.cancelAll();return ua;};e.registerHotKey=function(n,a,i,r,h){var
O;if(n instanceof jsx3.gui.HotKey){O=n;}else{var
aa=typeof n==ub.W?n:this[n];if(!(typeof aa==ub.W))throw new
jsx3.IllegalArgumentException(ub.pb,n);O=new
jsx3.gui.HotKey(aa,a,i,r,h);}if(this._jsxq2==null)this._jsxq2={length:0};var
Mb=O.getKey();this._jsxq2.length+=(this._jsxq2[Mb]?0:1);this._jsxq2[Mb]=O;return O;};e.hasHotKey=function(){return this._jsxq2!=null&&this._jsxq2.length>0;};e.setAlwaysCheckHotKeys=function(g){this.jsxalwayscheckhk=g;return this;};e.getAlwaysCheckHotKeys=function(){return this.jsxalwayscheckhk;};e.clearHotKeys=function(){this._jsxq2=null;};f.getVersion=function(){return ub.qb;};e.isOldEventProtocol=function(){var
Da=this.getServer();return Da&&Da.getEnv(ub.rb)<3.1;};e.rB=function(b){this.doEvent(ub.H,{objPARENT:b});};jsx3.app.Model.jsxclass.addMethodMixin(ub.sb,f.jsxclass,ub.tb);});jsx3.Event=jsx3.gui.Interactive;jsx3.Class.defineClass("jsx3.EventHelp",null,null,function(b,f){var
ub={a:"mousemove",b:"mouseup",c:"",d:/<[^>]*>/gi,e:" ",f:"...",g:"... ... ...",h:"<span class='jsx30block_drag'>",i:"</span>",j:"px",k:"dragRounder",l:"_jsxdrag",m:"body",n:'<div id="_jsxdrag"',o:' style="position:absolute;left:',p:"px;top:",q:"px;min-width:10px;z-index:",r:';">',s:"</div>",t:"beforeEnd"};b.ONBEFOREDROP=0;b.ONDROP=1;b.ONCANCELDROP=2;b.DRAGICONINDEX=32000;b.DEFAULTSPYLEFTOFFSET=5;b.DEFAULTSPYTOPOFFSET=5;b.SPYDELAY=300;b.FLAG=0;b.FF=false;b.yOff=0;b.xOff=0;b.PM=null;b.beginTrackMouse=function(l){jsx3.gui.Event.subscribe(ub.a,b.mouseTracker);jsx3.gui.Event.subscribe(ub.b,b.mouseUpTracker);};b.endTrackMouse=function(){jsx3.gui.Event.unsubscribe(ub.a,b.mouseTracker);jsx3.gui.Event.unsubscribe(ub.b,b.mouseUpTracker);};b.mouseTracker=function(a){b.doMouseMove(a.event);};b.mouseUpTracker=function(e){b.reset();};b.drag=function(c,j,d,k){var
yb=c&&c.innerHTML?jsx3.util.strTruncate((c.innerHTML+ub.c).replace(ub.d,ub.e),25,ub.f,0.5):ub.g;return ub.h+yb+ub.i;};b.doMouseMove=function(k){if(b.FLAG==1||b.FLAG==3){var
ab=b.PM.ownerDocument;if(b.FLAG==1){if(!b.constrainX)b.PM.style.left=k.getTrueX()+b.xOff+ub.j;if(!b.constrainY)b.PM.style.top=k.getTrueY()+b.yOff+ub.j;}else{var
fa=k.getTrueX()-b.startX;var
X=k.getTrueY()-b.startY;var
C=b[ub.k](b.xOff+fa,b.yOff+X,k);if(C[0]!=b.offsetLeft||C[1]!=b.offsetTop){if(!isNaN(C[0]))b.PM.style.left=C[0]+ub.j;if(!isNaN(C[1]))b.PM.style.top=C[1]+ub.j;}}}else if(b.FLAG==2){var
ab=b.JSXID.getDocument();var
ha=ab.getElementById(ub.l);if(ha)jsx3.html.removeNode(ha);var
Ma=(ab.getElementsByTagName(ub.m))[0];b.xOff=10;b.yOff=10;jsx3.gui.Event.preventSelection(ab);var
Cb=ub.n+jsx3.html.pe+ub.o+(b.constrainX?parseInt(b.PM.style.left):k.getTrueX()+b.xOff)+ub.p+(b.constrainY?parseInt(b.PM.style.top):k.getTrueY()+b.yOff)+ub.q+b.DRAGICONINDEX+ub.r+b.dragItemHTML+ub.s;jsx3.html.insertAdjacentHTML(Ma,ub.t,Cb);b.PM=ab.getElementById(ub.l);b.FLAG=1;}else b.endTrackMouse();};b.reset=function(){b.DRAGTYPE=null;b.DRAGID=null;b.DRAGIDS=null;b.FLAG=0;b.endTrackMouse();if(b.PM){if(b.PM.id==ub.l)jsx3.html.removeNode(b.PM);if(jsx3.CLASS_LOADER.IE)b.PM.releaseCapture();b.PM=null;b.constrainX=false;b.constrainY=false;}};b.isDragging=function(){return b.PM!=null&&b.FF;};b.getDragIcon=function(){return b.PM;};b.getDragSource=function(){return b.JSXID;};b.getDragType=function(){return b.DRAGTYPE;};b.getDragId=function(){return b.DRAGID;};b.getDragIds=function(){return jsx3.$A.is(b.DRAGIDS)?b.DRAGIDS:[b.DRAGID];};});jsx3.Class.defineInterface("jsx3.gui.Alerts",null,function(j,g){var
ub={a:"jsxexecute",b:"xml/components/dialog_alert.xml",c:"ok",d:"title",e:"message",f:"y0",g:"this.",h:"(this.getAncestorOfType(jsx3.gui.Dialog));",i:"xml/components/dialog_prompt.xml",j:"cancel",k:"var d = this.getAncestorOfType(jsx3.gui.Dialog); this.",l:"(d, d.getDescendantOfName('value').getValue());",m:"value",n:"xml/components/dialog_confirm.xml",o:"no",p:"",q:"bold"};var
wa=ub.a;g.getAlertsParent=jsx3.Method.newAbstract();g.alert=function(c,r,d,o,s){var
ha=jsx3.net.URIResolver.JSX;var
Kb=(this.getAlertsParent()).loadAndCache(ub.b,false,jsx3.getSharedCache(),ha);var
vb=Kb.getDescendantOfName(ub.c);if(c!=null)(Kb.getDescendantOfName(ub.d)).setText(c);if(r!=null)(Kb.getDescendantOfName(ub.e)).setText(r);if(o===false)Kb.hideButton();else if(o!=null)vb.setText(o);if(d!=null){var
ta=ub.f;vb.y0=d;vb.setEvent(ub.g+ta+ub.h,wa);}this.configureAlert(Kb,s);(this.getAlertsParent()).paintChild(Kb);Kb.focus();return Kb;};g.prompt=function(f,b,c,m,l,r,p){var
Ab=jsx3.net.URIResolver.JSX;var
Kb=(this.getAlertsParent()).loadAndCache(ub.i,false,jsx3.getSharedCache(),Ab);var
Gb=Kb.getDescendantOfName(ub.c);var
pa=Kb.getDescendantOfName(ub.j);if(f!=null)(Kb.getDescendantOfName(ub.d)).setText(f);if(b!=null)(Kb.getDescendantOfName(ub.e)).setText(b);if(l!=null)Gb.setText(l);if(r!=null)pa.setText(r);if(c!=null){var
zb=ub.f;Gb.y0=c;Gb.setEvent(ub.k+zb+ub.l,wa);}if(m!=null){var
zb=ub.f;pa.y0=m;pa.setEvent(ub.g+zb+ub.h,wa);}this.configureAlert(Kb,p);(this.getAlertsParent()).paintChild(Kb);jsx3.sleep(function(){(Kb.getDescendantOfName(ub.m)).focus();});return Kb;};g.confirm=function(d,f,n,b,h,a,i,c,s,l){var
ab=jsx3.net.URIResolver.JSX;var
Ka=(this.getAlertsParent()).loadAndCache(ub.n,false,jsx3.getSharedCache(),ab);var
Z=Ka.getDescendantOfName(ub.c);var
Ab=Ka.getDescendantOfName(ub.j);var
ia=Ka.getDescendantOfName(ub.o);var
ba=[Z,Ab,ia];i=i!=null?i-1:0;if(d!=null)(Ka.getDescendantOfName(ub.d)).setText(d);if(f!=null)(Ka.getDescendantOfName(ub.e)).setText(f);if(h!=null)Z.setText(h);if(a!=null)Ab.setText(a);if(b!=null){var
Ca=ub.f;Ab.y0=b;Ab.setEvent(ub.g+Ca+ub.h,wa);}if(n!=null){var
Ca=ub.f;Z.y0=n;Z.setEvent(ub.g+Ca+ub.h,wa);}if(c!=null||s!=null||i==3){if(s)ia.setText(s);if(c){var
Ca=ub.f;ia.y0=c;ia.setEvent(ub.g+Ca+ub.h,wa);}ia.setDisplay(ub.p);}var
sa=ba[i];if(sa){sa.setFontWeight(ub.q);Ka.registerHotKey(function(o){if(o.enterKey()){(this.getDescendantOfName(sa.getName())).doExecute(o);o.cancelBubble();}},13,false,false,false);}this.configureAlert(Ka,l);(this.getAlertsParent()).paintChild(Ka);Ka.focus();return Ka;};g.configureAlert=function(p,h){if(h==null)return;if(h.width)p.setWidth(h.width,false);if(h.height)p.setHeight(h.height,false);if(h.noTitle)p.removeChild(p.getChild(ub.d));if(h.nonModal)p.setModal(0);};});jsx3.Alerts=jsx3.gui.Alerts;jsx3.require("jsx3.gui.Painted","jsx3.gui.Interactive");jsx3.Class.defineClass("jsx3.gui.Block",jsx3.gui.Painted,[jsx3.gui.Interactive],function(l,k){var
ub={A:" ",Aa:' title="',B:"...",Ba:"visibility:hidden;",C:"... ... ...",Ca:"z-index:",D:"<span class='jsx30block_drag'>",Da:"onfocus",E:"</span>",Ea:"_mask",F:"padding",Fa:"jsxbgcolor",G:"0px",Ga:"@Solid Shadow",H:"top",Ha:"jsxbg",I:"position",Ia:"@Mask 70%",J:"relative",Ja:"jsxcursor",K:"absolute",Ka:"@Wait",L:"visibility",La:"if (objEVENT.tabKey() && objEVENT.shiftKey()) { this.getParent().focus(); }",M:"zIndex",Ma:"var objEVENT = jsx3.gui.Event.wrap(event); if (objEVENT.shiftKey()) { jsx3.GO(this.id).getParent().focus(); }",N:"box",Na:"_jsxcQ",O:"100%",Oa:"tabIndex",P:"div",Pa:"_jsxZs",Q:"jsx3.gui.CDF",Qa:"3.00.00",R:"jsxdblclick",S:"dblclick",T:"jsxclick",U:"click",V:"jsxkeydown",W:"keydown",X:"mouseover",Y:"mouseout",Z:"mousedown",_:"doBeginMove",a:"Verdana",aa:"doBeginDrag",b:"#000000",ba:' JSXDragId="',c:"&#160;",ca:'" JSXDragType="JSX_GENERIC"',d:"jsx30block",da:' id="',e:"span",ea:'"',f:"bold",fa:' class="',g:"normal",ga:'" ',h:"",ha:' label="',i:"none",ia:"background-color:",j:"hidden",ja:";",k:"left",ka:"color:",l:"center",la:"cursor:",m:"right",ma:"block",n:"jsx:///images/spc.gif",na:"display:block;",o:"backgroundColor",oa:"display:none;",p:"border",pa:"font-family:",q:"color",qa:"font-size:",r:"cursor",ra:"px;",s:"relativebox",sa:"font-weight:",t:/display:([^;]*);?/i,ta:' tabindex="',u:"$1",ua:'" jsxtabindex="',v:"display",va:"overflow:auto;",w:"margin",wa:"overflow:hidden;",x:"mouseup",xa:"text-align:",y:"doEndMove",ya:/\"/g,z:/<[^>]*>/gi,za:"&quot;"};var
ga=jsx3.gui.Event;var
F=jsx3.gui.Interactive;l.SCROLLSIZE=16;l.OVERFLOWSCROLL=1;l.OVERFLOWHIDDEN=2;l.OVERFLOWEXPAND=3;l.DEFAULTFONTNAME=ub.a;l.DEFAULTFONTSIZE=10;l.DEFAULTCOLOR=ub.b;l.DEFAULTTEXT=ub.c;l.DEFAULTCLASSNAME=ub.d;l.DEFAULTTAGNAME=ub.e;l.FONTBOLD=ub.f;l.FONTNORMAL=ub.g;l.DISPLAYBLOCK=ub.h;l.DISPLAYNONE=ub.i;l.VISIBILITYVISIBLE=ub.h;l.VISIBILITYHIDDEN=ub.j;l.NULLSTYLE=-1;l.ALIGNLEFT=ub.k;l.ALIGNCENTER=ub.l;l.ALIGNRIGHT=ub.m;l.ABSOLUTE=0;l.RELATIVE=1;l.MASK_NO_EDIT=jsx3.gui.Painted.MASK_NO_EDIT;l.MASK_ALL_EDIT=jsx3.gui.Painted.MASK_ALL_EDIT;l.MASK_MOVE_ONLY={MM:true};l.MASK_EAST_ONLY={NN:false,EE:true,SS:false,WW:false,MM:false};l.SPACE=jsx3.resolveURI(ub.n);jsx3.html.loadImages(l.SPACE);k.init=function(s,f,a,q,n,e){this.jsxsuper(s);if(f!=null)this.setLeft(f);if(a!=null)this.setTop(a);if(q!=null)this.setWidth(q);if(n!=null)this.setHeight(n);if(e!=null)this.setText(e);};k.getBackgroundColor=function(){return this.jsxbgcolor;};k.setBackgroundColor=function(f,r){this.jsxbgcolor=f;if(r)this.updateGUI(ub.o,f==l.NULLSTYLE?ub.h:f);return this;};k.getBackground=function(){return this.jsxbg;};k.setBackground=function(e){this.jsxbg=e;return this;};k.getBorder=function(){return this.jsxborder;};k.setBorder=function(q,b){this.jsxborder=q;if(b)this.recalcBox([ub.p]);else this.ce();return this;};k.getColor=function(){return this.jsxcolor;};k.setColor=function(g,m){this.jsxcolor=g;if(m)this.updateGUI(ub.q,g==l.NULLSTYLE?ub.h:g);return this;};k.getCursor=function(){return this.jsxcursor;};k.setCursor=function(q,j){this.jsxcursor=q;if(j)this.updateGUI(ub.r,q);return this;};k.getCSSOverride=function(){return this.jsxstyleoverride;};k.setCSSOverride=function(f){this.jsxstyleoverride=f;return this;};k.getClassName=function(){return this.jsxclassname;};k.setClassName=function(c){this.jsxclassname=c;return this;};k.getDisplay=function(){return this.jsxdisplay;};k.setDisplay=function(f,i){if(this.jsxdisplay!=f){this.jsxdisplay=f;if(i){if(f!=ub.i){var
L=this.Wl();if(!(this.getRelativePosition()==0||L&&L.getBoxType()!=ub.s)){var
za=(jsx3.gui.Painted.Box.getCssFix()).replace(ub.t,ub.u);if(!jsx3.util.strEmpty(za))f=za;}}if(f==ub.i)jsx3.html.persistScrollPosition(this.getRendered());this.updateGUI(ub.v,f);if(f!=ub.i){jsx3.gui.Painted._onAfterRestoreViewCascade(this,this.getRendered());jsx3.html.restoreScrollPosition(this.getRendered());}}}return this;};k.getFontName=function(){return this.jsxfontname;};k.setFontName=function(e){this.jsxfontname=e;return this;};k.getFontSize=function(){return this.jsxfontsize;};k.setFontSize=function(d){this.jsxfontsize=d;return this;};k.getFontWeight=function(){return this.jsxfontweight;};k.setFontWeight=function(n){this.jsxfontweight=n;return this;};k.getHeight=function(){return this.jsxheight;};k.setHeight=function(d,b){this.jsxheight=d;if(b){this.ge({height:d},true);}else this.ce();return this;};k.getIndex=function(){return this.jsxindex;};k.setIndex=function(h,g){this.jsxindex=h;if(g){var
S=this.getRendered();if(S!=null)S.tabIndex=h;}return this;};l.getJSXParent=function(c){return jsx3.html.getJSXParent(c);};k.getLeft=function(){return this.jsxleft;};k.setLeft=function(a,q){this.jsxleft=a;if(q){if(isNaN(a))a=0;this.ge({left:a},true);}else this.clearBoxProfile(false);return this;};k.setDimensions=function(j,m,n,i,a){if(jsx3.$A.is(j)){a=m;i=j[3];n=j[2];m=j[1];j=j[0];}if(j!=null)this.jsxleft=j;if(m!=null)this.jsxtop=m;if(n!=null)this.jsxwidth=n;if(i!=null)this.jsxheight=i;if(a){this.ge({left:this.jsxleft,top:this.jsxtop,width:this.jsxwidth,height:this.jsxheight},true);}else this.ce();};k.getDimensions=function(){return [this.getLeft(),this.getTop(),this.getWidth(),this.getHeight()];};k.getMargin=function(){return this.jsxmargin;};k.setMargin=function(b,q){this.jsxmargin=b;if(q)this.recalcBox([ub.w]);else this.ce();return this;};k.getMaskProperties=function(){var
ka={};ka.NN=true;ka.SS=true;ka.EE=true;ka.WW=true;ka.MM=this.getRelativePosition()==0;return ka;};k.doBeginMove=function(d,i){if(d.leftButton()){this.jsxsupermix(d,i);ga.subscribe(ub.x,this,ub.y);d.cancelAll();}};k.doEndMove=function(a){a=a.event;var
oa=this.getRendered(a);if(a.leftButton()){ga.unsubscribe(ub.x,this,ub.y);this.jsxsupermix(a,oa);}else this.eo(a,oa);};k.getDragIcon=function(h,b,r,p){var
aa=h&&h.innerHTML?jsx3.util.strTruncate((h.innerHTML+ub.h).replace(ub.z,ub.A),25,ub.B,0.5):ub.C;return ub.D+aa+ub.E;};k.doBeginDrag=function(o,q){if(o.leftButton())this.doDrag(o,q,this.getDragIcon);};k.getOverflow=function(){return this.jsxoverflow;};k.setOverflow=function(d){this.jsxoverflow=d;return this;};k.getPadding=function(){return this.jsxpadding;};k.setPadding=function(j,i){this.jsxpadding=j;if(i)this.recalcBox([ub.F]);else this.ce();return this;};k.getPropertiesPath=function(){return null;};k.getModelEventsPath=function(){return null;};k.getRelativePosition=function(){return this.jsxrelativeposition;};k.setRelativePosition=function(e,d){if(this.jsxrelativeposition!=e){this.ce();this.jsxrelativeposition=e;if(d){if(e==0){this.setDimensions(this.getLeft()||Number(0),this.getTop()||Number(0),null,null,true);this.updateGUI(ub.w,ub.G);}else{this.updateGUI(ub.k,ub.G);this.updateGUI(ub.H,ub.G);if(this.getMargin())this.setMargin(this.getMargin(),true);}this.updateGUI(ub.I,e==1?ub.J:ub.K);if(this.getDisplay()!=ub.i)this.setDisplay(ub.h,true);}}return this;};k.getTagName=function(){return this.jsxtagname;};k.setTagName=function(i){this.jsxtagname=i;this.ce();return this;};k.getText=function(){return this.jsxtext;};k.setText=function(j,c){this.jsxtext=j;if(c)if(this.getChild(0)!=null||(this.Wl(true)).lg(0)!=null){this.repaint();}else{var
X=this.getRendered();if(X!=null)X.innerHTML=j;}return this;};k.getTextAlign=function(){return this.jsxtextalign;};k.setTextAlign=function(o){this.jsxtextalign=o;return this;};k.getTip=function(){return this.jsxtip;};k.setTip=function(e){this.jsxtip=e;var
db;if(db=this.getRendered())db.title=e;return this;};k.getTop=function(){return this.jsxtop;};k.setTop=function(q,o){this.jsxtop=q;if(o){if(isNaN(q))q=0;this.ge({top:q},true);}else this.clearBoxProfile(false);return this;};k._findGUI=function(h){return this.getRendered();};k.updateGUI=function(q,n){var
eb=this._findGUI(q);if(eb!=null)try{eb.style[q]=n;}catch(Kb){}};k.getVisibility=function(){return this.jsxvisibility;};k.setVisibility=function(h,a){this.jsxvisibility=h;if(a)this.updateGUI(ub.L,h);return this;};k.getWidth=function(){return this.jsxwidth;};k.setWidth=function(c,q){this.jsxwidth=c;if(q){this.ge({width:c},true);}else this.ce();return this;};k.getZIndex=function(){return this.jsxzindex;};k.setZIndex=function(s,r){this.jsxzindex=s;if(r)this.updateGUI(ub.M,s);return this;};k.Rc=function(c,s,o){this.ag(c,s,o,4);};k.Vm=function(b){this.applyDynamicProperties();if(this.getParent()&&(b==null||isNaN(b.parentwidth)||isNaN(b.parentheight))){b=(this.getParent()).ng(this);}else if(b==null)b={};var
Db=b.boxtype&&b.boxtype!=ub.N||this.getRelativePosition()!=0;var
rb=Db?null:b.left?b.left:this.getLeft();var
xa=Db?null:b.top?b.top:this.getTop();if(!Db&&!rb)rb=0;if(!Db&&!xa)xa=0;var
Ya,bb,qa,L;if(!b.boxtype)b.boxtype=Db?ub.s:ub.N;if(b.tagname==null)b.tagname=(Ya=this.getTagName())?Ya.toLowerCase():jsx3.gui.Block.DEFAULTTAGNAME;if(b.left==null&&b.boxtype==ub.N)b.left=rb;if(b.top==null&&b.boxtype==ub.N)b.top=xa;if(b.width==null)b.width=b.width?b.width:this.getWidth();if(b.height==null)b.height=b.height?b.height:this.getHeight();if(b.width==ub.O||b.tagName==ub.P&&this.ii()==ub.h){b.tagname=ub.P;b.container=true;}if((bb=this.getPadding())!=null&&bb!=ub.h)b.padding=bb;if(Db&&(qa=this.getMargin())!=null&&qa!=ub.h)b.margin=qa;if((L=this.getBorder())!=null&&L!=ub.h)b.border=L;return new
jsx3.gui.Painted.Box(b);};k.setCDFId=function(f){this.jsxcdfid=f;var
ab=this.getAncestorOfType(ub.Q);if(ab)ab.read();};k.getCDFId=function(){return this.jsxcdfid;};k.setCDFAttribute=function(q){this.jsxcdfattribute=q;var
vb=this.getAncestorOfType(ub.Q);if(vb)vb.read();};k.getCDFAttribute=function(){return this.jsxcdfattribute;};k.paint=function(j){this.applyDynamicProperties();j=j==null?this.ii():j;var
Ma=this.getId();var
y={};if(this.hasEvent(ub.R))y[ub.S]=true;if(this.hasEvent(ub.T))y[ub.U]=true;if(this.hasEvent(ub.V))y[ub.W]=true;var
ha=ub.h;if(this.getCanSpy()==1){y[ub.X]=true;y[ub.Y]=true;}if(this.getCanMove()==1){if(this.getCanMove()==1)y[ub.Z]=ub._;}else if(this.getMenu()!=null){y[ub.x]=true;}else if(this.getCanDrop()==1)y[ub.x]=true;if(y[ub.Z]==null&&this.getCanDrag()==1){y[ub.Z]=ub.aa;ha=ha+(ub.ba+Ma+ub.ca);}var
fa=this.Pj(y,0)+ha;var
R=this.renderAttributes(null,true);var
O=this.Wl(true);O.setAttributes(this.uj()+this.Rh()+fa+ub.da+Ma+ub.ea+this.di()+ub.fa+this.kf()+ub.ga+R);O.setStyles(this.ze()+this.Uc()+this.ti()+this.Gd()+this.dg()+this.wm()+this.en()+this._i()+this.Ak()+this.yg()+this.qg()+this.paintBlockDisplay()+this.Ae());return (O.paint()).join(j+this.paintChildren());};k.Pe=function(h,e){if(this.getCanSpy()==1)this.doSpyOver(h,e);if(this.getCanDrop()==1)this.doDrop(h,e,jsx3.EventHelp.ONBEFOREDROP);};k.nk=function(m,b){if(this.getCanSpy()==1)this.doSpyOut(m,b);if(this.getCanDrop()==1)this.doDrop(m,b,jsx3.EventHelp.ONCANCELDROP);};k.eo=function(r,a){if(this.getCanDrop()==1)this.doDrop(r,a,jsx3.EventHelp.ONDROP);else this.jsxsupermix(r,a);};k.di=function(){var
Fb=this.getName();return Fb!=null?ub.ha+Fb+ub.ea:ub.h;};k.Uc=function(){var
Mb=this.getBackgroundColor();return Mb?ub.ia+Mb+ub.ja:ub.h;};k.ti=function(){return this.getBackground()?this.getBackground()+ub.ja:ub.h;};k.Gd=function(){var
Oa=this.getColor();return Oa?ub.ka+Oa+ub.ja:ub.h;};k.yg=function(){var
Ra=this.getCursor();return Ra?ub.la+Ra+ub.ja:ub.h;};k.Ae=function(){return this.getCSSOverride()?this.getCSSOverride():ub.h;};k.kf=function(){var
na=this.getClassName();return l.DEFAULTCLASSNAME+(na?ub.A+na:ub.h);};k.paintBlockDisplay=function(){if(jsx3.util.strEmpty(this.getDisplay())||this.getDisplay()==ub.ma){var
Pa=this.Wl();if(this.getWidth()==ub.O){return ub.na;}else return ub.h;}else if(this.getDisplay()==ub.i)return ub.oa;return ub.h;};k.Ne=function(){var
sa=this.getDisplay();return jsx3.util.strEmpty(sa)||sa==ub.h?ub.h:ub.oa;};k.wm=function(){var
Ya=this.getFontName();return Ya?ub.pa+Ya+ub.ja:ub.h;};k.ze=function(){var
ia=parseInt(this.getFontSize());return isNaN(ia)?ub.h:ub.qa+ia+ub.ra;};k._i=function(){var
_=this.getFontWeight();return _?ub.sa+_+ub.ja:ub.h;};k.uj=function(b){if(b==null)b=this.getIndex();return b!=null&&this.jsxenabled!=0?ub.ta+b+ub.ua+b+ub.ea:ub.h;};k.dg=function(){if(this.getOverflow()==1){return ub.va;}else if(this.getOverflow()==2){return ub.wa;}else return ub.h;};k.ii=function(){return this.getText()?this.getText():ub.h;};k.Ak=function(){var
la=this.getTextAlign();return la?ub.xa+la+ub.ja:ub.h;};k.Rh=function(){var
I=this.getTip();if(I!=null){I=I.replace(ub.ya,ub.za);return I?ub.Aa+I+ub.ga:ub.h;}else if(jsx3.gui.Form&&this.instanceOf(jsx3.gui.Form)){var
Ra=this.getKeyBinding();return Ra?ub.Aa+Ra.replace(ub.ya,ub.za)+ub.ga:ub.h;}else return ub.h;};k.qg=function(){return jsx3.util.strEmpty(this.getVisibility())||this.getVisibility()==ub.h?ub.h:ub.Ba;};k.en=function(){var
Oa=this.getZIndex();return isNaN(Oa)?ub.h:ub.Ca+Oa+ub.ja;};k.showMask=function(r){if(this._jsxcQ)this.hideMask();var
Ya;if(Ya=this.getRendered()){var
V=(this.getAbsolutePosition()).H;if(Ya.onfocus)Ya._jsxZs=Ya.onfocus;jsx3.html.addEventListener(Ya,ub.Da,l.y9);if(Ya.tabIndex)Ya._jsxtabindex=Ya.tabIndex;Ya.tabIndex=0;this._jsxcQ=this.getId()+ub.Ea;var
nb=(((((((((new
l(this._jsxcQ,0,0,ub.O,ub.O,r)).setOverflow(2)).setFontWeight(ub.f)).setTextAlign(ub.l)).setIndex(0)).setRelativePosition(0)).setZIndex(32000)).setDynamicProperty(ub.Fa,ub.Ga)).setDynamicProperty(ub.Ha,ub.Ia)).setDynamicProperty(ub.Ja,ub.Ka);nb.setWidth(ub.O);nb.setHeight(ub.O);nb.setPadding(parseInt(V/2));nb.setEvent(ub.La,ub.V);nb.setAttribute(ub.Da,ub.Ma);this.setChild(nb);this.paintChild(nb);nb.focus();}};l.y9=function(b){var
y=jsx3.GO(this.id);if(y){var
Mb=ga.wrap(b||window.event);if(!Mb.shiftKey())if((y.getChildren()).length)(y.getLastChild()).focus();}};k.hideMask=function(){var
x;if(x=this.getChild(this._jsxcQ)){this.removeChild(x);delete this[ub.Na];var
eb;if(eb=this.getRendered()){if(eb._jsxtabindex){eb.tabIndex=eb._jsxtabindex;}else eb.removeAttribute(ub.Oa);jsx3.html.removeEventListener(eb,ub.Da,l.y9);if(eb._jsxZs){eb.onfocus=eb._jsxZs;delete eb[ub.Pa];}else{}}}};l.getVersion=function(){return ub.Qa;};});jsx3.Block=jsx3.gui.Block;