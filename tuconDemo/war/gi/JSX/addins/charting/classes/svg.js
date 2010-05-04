/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Package.definePackage("jsx3.chart",function(n){var
ub={a:".benchmark",b:"top",c:"right",d:"bottom",e:"left",f:/\s*[,;]\s*/,g:"",h:"number",i:/\s+/,j:" ",k:"gradient",l:"_",m:"_eval",n:"object",o:"var f = ",p:"; f;",q:"error evaluating '",r:"', ",s:" is not of type ",t:"error evaluating ",u:" field '",v:"function",w:/\S/,x:"doSpyOver",y:"doSpyOut",z:"string"};n.si=n.ADDIN.getVersion();n.LOG=jsx3.util.Logger.getLogger(n.jsxpackage.getName());n.LOG_BENCH=jsx3.util.Logger.getLogger(n.jsxpackage.getName()+ub.a);n.t7={};n.QTOP=ub.b;n.QRIGHT=ub.c;n.QBOTTOM=ub.d;n.QLEFT=ub.e;n.splitBox=function(f,i,p,j,l,g,c){var
Eb=null,db=null;if(l==ub.b){Eb=[f,i,p,Math.min(c,j-1)];db=[f,i+Eb[3],p,j-Eb[3]];}else if(l==ub.c){var
Ua=Math.min(g,p-1);Eb=[f+p-Ua,i,Ua,j];db=[f,i,p-Ua,j];}else if(l==ub.d){var
R=Math.min(c,j-1);Eb=[f,i+j-R,p,R];db=[f,i,p,j-R];}else if(l==ub.e){Eb=[f,i,Math.min(g,p-1),j];db=[f+Eb[2],i,p-Eb[2],j];}return [Eb,db];};n.isValueAxis=function(k){return n.LinearAxis&&k instanceof n.LinearAxis||n.LogarithmicAxis&&k instanceof n.LogarithmicAxis;};n.isCategoryAxis=function(d){return n.CategoryAxis&&d instanceof n.CategoryAxis;};n.dm=function(d){if(d==null)return null;var
Jb=d.split(ub.f);if(Jb[0]===ub.g)Jb.shift();if(Jb.length>0&&Jb[Jb.length-1]===ub.g)Jb.pop();return Jb;};n.asNumber=function(a){if(a==null)return null;if(typeof a==ub.h)return a;return new
Number(a);};n.parseGradient=function(h){if(!h)return null;var
db=h.split(ub.i);if(db[0]===ub.g)db.shift();if(db.length>0&&db[db.length-1]===ub.g)db.pop();if(db.length==0)return null;if(db.length>4)return [db[0],db[1],db[2],(db.slice(3)).join(ub.j)];return db;};n.addGradient=function(f,q){var
cb=n.parseGradient(q);if(f!=null&&cb!=null){var
P=new
jsx3.vector.Fill(f.getColor(),f.getAlpha());P.setType(ub.k);P.setColor2(cb[0]);P.setAngle(cb[1]);P.setAlpha2(cb[2]);P.setColors(cb[3]);return P;}else return f;};n.Wk=function(d,g,m){d[g]=m;d[ub.l+g+ub.m]=null;};n.Sl=function(g,d,b){if(b==null)b=ub.n;var
db=ub.l+d+ub.m;if(!g[db]&&g[d])try{var
Va=g.eval(ub.o+g[d]+ub.p);g[db]=Va;if(typeof g[db]!=b){n.LOG.error(ub.q+d+ub.r+g[db]+ub.s+b);g[db]=n.t7;}}catch(Kb){Kb=jsx3.NativeError.wrap(Kb);g[db]=n.t7;n.LOG.error(ub.t+b+ub.u+d,Kb);}return g[db]!=n.t7?g[db]:null;};n.vc=function(l,r){if(typeof l[r]==ub.v)return l[r];return n.Sl(l,r,ub.v);};n.Yh=function(q,p){var
Eb=q.getBackgroundColor();if(Eb!=null&&Eb.match(ub.w)){var
qb=p.getFirstChildOfType(jsx3.vector.Fill);if(qb==null){qb=new
jsx3.vector.Fill();p.setFill(qb);}qb.setColor(Eb);if(typeof q.getAlpha==ub.v)qb.setAlpha(q.getAlpha());}else p.setFill(null);};n._h=function(a,m){var
I=a.getBorderColor();if(I!=null&&I.match(ub.w)){var
Ra=m.getFirstChildOfType(jsx3.vector.Stroke);if(Ra==null){Ra=new
jsx3.vector.Stroke();m.setStroke(Ra);}Ra.setColor(I);if(typeof a.getBorderAlpha==ub.v)Ra.setAlpha(a.getBorderAlpha());if(typeof a.getBorderWidth==ub.v)Ra.setWidth(a.getBorderWidth());}else m.setStroke(null);};n.th=function(b,h){var
Ab=jsx3.gui.Interactive;var
Nb=jsx3.gui.Event;if(h==null)h=b.getCanvas();var
ha={};if(b.getMenu()!=null)ha[Nb.MOUSEUP]=true;if(b.hasEvent(Ab.SELECT))ha[Nb.CLICK]=true;if(b.hasEvent(Ab.EXECUTE))ha[Nb.DOUBLECLICK]=true;if(b.hasEvent(Ab.SPYGLASS)){ha[Nb.MOUSEOVER]=ub.x;ha[Nb.MOUSEOUT]=ub.y;}for(var Va in ha){var
da=ha[Va];if(typeof da!=ub.z)da=Ab.mn[Va];jsx3.vector.paintEventHandler(b,Va,da,h);}};});jsx3.Package.definePackage("jsx3.vector",function(m){var
ub={A:"');",a:"px",b:"yp",c:"http://www.w3.org/2000/svg",d:"evt",e:"number",f:"#",g:"",h:/^\s*(.*?)\s*$/,i:"$1",j:/[^\d\.]/g,k:/[^\d\.]/,l:"on",m:"_",n:"onclick",o:"if(evt.detail%2==0){if(this.getAttribute('_dblclick'))jsx3.GO('",p:"').",q:"(evt,this,this.getAttribute('_dblclick'));}",r:"else{if(this.getAttribute('_click'))",s:"jsx3.GO('",t:"(evt,this,this.getAttribute('_click'));}",u:/\"/g,v:"&quot;",w:/;\s*$/,x:";",y:"(",z:",this,'"};m.Uf=ub.a;m.RG=ub.b;m.Fi=ub.c;m.QO=ub.d;m.colorAsHtml=function(a){return typeof a==ub.e?ub.f+((a+16777216).toString(16)).substring(1):ub.g+a;};m.Li=function(a,j,i){if(a==null)a=0;if(j==null)j=ub.a;if(typeof a==ub.e){return a+ub.g+j;}else{a=a.toString();a=a.replace(ub.h,ub.i);if(i)a=a.replace(ub.j,ub.g);return a.match(ub.k)?a:a+ub.g+j;}};m.ed=function(s){return Math.max(0,Math.min(1,s));};m.degreesToRadians=function(b){return jsx3.util.numMod(2*Math.PI/360*(-1*b+90),2*Math.PI);};m.paintEventHandler=function(o,n,f,j){var
Ta=ub.l+n;var
Eb=ub.g;if(n==jsx3.gui.Event.DOUBLECLICK||n==jsx3.gui.Event.CLICK){j.setProperty(ub.m+n,f);var
Kb=j.getProperty(ub.n);if(Kb){}j.setProperty(ub.n,ub.o+o.getId()+ub.p+m.RG+ub.q+ub.r+ub.s+o.getId()+ub.p+m.RG+ub.t);return;}var
Ea=j.getProperty(Ta);if(Ea){Eb=Ea.replace(ub.u,ub.v);if(!Ea.match(ub.w))Eb=Eb+ub.x;}Eb=Eb+(ub.s+o.getId()+ub.p+m.RG+ub.y+m.QO+ub.z+f+ub.A);if(Eb.length>0)j.setProperty(Ta,Eb);};m.updateVector=function(a,d){var
pb=a.paintDom();if(pb!=d&&d.parentNode)d.parentNode.replaceChild(pb,d);};});jsx3.Class.defineClass("jsx3.html.Tag",null,null,function(g,q){var
ub={A:"#",a:":",b:"can't append ",c:" to ",d:", already has parent ",e:"Illegal to append child ",f:" to parent ",g:".",h:"class",i:"id",j:";",k:"Error appending '",l:"' to 'cssText': ",m:"dC",n:"_P",o:"",p:"Error setting style '",q:"' to '",r:"': ",s:/^<(\w+(\:\w+)?)\b/,t:"<",u:/\b([_a-zA-Z]\w*)=([^\s\"]+) /g,v:'$1="$2" ',w:"</",x:">",y:"string",z:"/>"};var
Ka=jsx3.Exception;g.s9=[];q.u9=null;q.Zr=null;if(jsx3.CLASS_LOADER.VML){q.init=function(e,m){this.u9=m;this.Zr=e;this.Ni=document.createElement(e?e+ub.a+m:m);this.dC=null;this._P=null;};q.appendChild=function(c){if(this.onAppendChild(c)){if(c instanceof g&&c.getParent()!=null)throw new
Ka(ub.b+c+ub.c+this+ub.d+c.dC);if(this._P==null)this._P=[];this._P.push(c);c.dC=this;}else throw new
Ka(ub.e+c+ub.f+this+ub.g);};q.removeChild=function(d){if(this._P){var
Pa=jsx3.util.arrIndexOf(this._P,d);if(Pa>=0){this._P[Pa].dC=null;this._P.splice(Pa,1);}}};q.replaceChild=function(h,i){if(this._P){var
I=jsx3.util.arrIndexOf(this._P,i);if(I>=0){this._P[I].dC=null;this._P[I]=h;h.dC=this;}}};q.removeChildren=function(){if(this._P)this._P.splice(0,this._P.length);};q.getClassName=function(){return this.Ni.className;};q.setClassName=function(n){this.Ni.className=n;};}else if(jsx3.CLASS_LOADER.SVG){q.init=function(e,o){this.u9=o;this.Zr=e;if(o)this.Ni=e?document.createElementNS(e,o):document.createElement(o);this.dC=null;this._P=null;};q.appendChild=function(k){if(this.onAppendChild(k)){if(k instanceof g&&k.getParent()!=null)throw new
Ka(ub.b+k+ub.c+this+ub.d+k.dC);if(this._P==null)this._P=[];this._P.push(k);k.dC=this;this.Ni.appendChild(k.Ni);}else throw new
Ka(ub.e+k+ub.f+this+ub.g);};q.removeChild=function(d){if(this._P){var
ob=jsx3.util.arrIndexOf(this._P,d);if(ob>=0){this._P[ob].dC=null;this._P.splice(ob,1);}}this.Ni.removeChild(d.Ni);};q.replaceChild=function(j,e){if(this._P){var
Oa=jsx3.util.arrIndexOf(this._P,e);if(Oa>=0){this._P[Oa].dC=null;this._P[Oa]=j;j.dC=this;}}this.Ni.replaceChild(j.Ni,e.Ni);};q.removeChildren=function(){if(this._P)this._P.splice(0,this._P.length);var
ya=this.Ni.childNodes;for(var
nb=ya.length-1;nb>=0;nb--)this.Ni.removeChild(ya[nb]);};q.getClassName=function(){return this.getProperty(ub.h);};q.setClassName=function(s){this.setProperty(ub.h,s);};}q.getParent=function(){return this.dC;};q.getChildren=function(){return this._P==null?g.s9:this._P;};q.getId=function(){return this.Ni.id;};q.setId=function(h){this.setProperty(ub.i,h);};q.setExtraStyles=function(f){try{this.Ni.style.cssText+=(ub.j+f);}catch(Kb){throw new
Ka(ub.k+f+ub.l+jsx3.NativeError.wrap(Kb));}};q.release=function(){delete this[ub.m];if(this._P){for(var
oa=this._P.length-1;oa>=0;oa--)if(this._P[oa].release)this._P[oa].release();delete this[ub.n];}};q.onAppendChild=function(d){return true;};q.onRemoveChild=function(f){return true;};q.setProperty=function(h,f){var
da=arguments;for(var
Mb=0;Mb<da.length;Mb=Mb+2){h=da[Mb];f=da[Mb+1];if(f!=null)this.Ni.setAttribute(h,f);else this.Ni.removeAttribute(h);}};if(jsx3.CLASS_LOADER.SVG)q.setPropertyNS=function(j,i,f){if(f!=null)this.Ni.setAttributeNS(j,i,f);else this.Ni.removeAttributeNS(j,i);};q.getProperty=function(f){return this.Ni.getAttribute(f);};q.removeProperty=function(c){var
Fb=arguments;for(var
xa=0;xa<Fb.length;xa++)this.Ni.removeAttribute(Fb[xa]);};q.setStyle=function(e,j){var
pa=arguments;for(var
ib=0;ib<pa.length;ib=ib+2){e=pa[ib];j=pa[ib+1];try{this.Ni.style[e]=j==null?ub.o:j;}catch(Kb){throw new
Ka(ub.p+e+ub.q+j+ub.r+jsx3.NativeError.wrap(Kb));}}};q.getStyle=function(e){return this.Ni.style[e];};q.removeStyle=function(c){var
fb=arguments;for(var
ra=0;ra<fb.length;ra++)this.Ni.style[fb[ra]]=ub.o;};q.getTagName=function(){return this.u9;};q.getTagNS=function(){return this.Zr;};if(jsx3.CLASS_LOADER.VML){q.paint=function(){this.paintUpdate();var
zb=[];var
Va=this.hn(zb,0);return (zb.slice(0,Va)).join(ub.o);};q.hn=function(n,p){var
X=this._P;var
Y=jsx3.html.getOuterHTML(this.Ni);Y=Y.replace(ub.s,function(a,i){return ub.t+i.toLowerCase();});Y=Y.replace(ub.u,ub.v);var
pb=Y.lastIndexOf(ub.w);if(pb>=0&&(Y.substring(pb)).indexOf(this.Ni.nodeName)!=2)pb=-1;if(X!=null&&X.length>0){var
M=null,H=null;if(pb>=0){M=Y.substring(0,pb);H=Y.substring(pb);}else{M=Y;H=ub.w+this.Ni.nodeName.toLowerCase()+ub.x;}n[p++
]=M;for(var
Ja=0;Ja<X.length;Ja++){var
oa=X[Ja];if(typeof oa==ub.y)n[p++
]=oa;else p=oa.hn(n,p);}n[p++
]=H;}else{if(pb>=0)n[p++
]=Y.substring(0,pb-1);else n[p++
]=Y.substring(0,Y.length-1);n[p++
]=ub.z;}return p;};}else if(jsx3.CLASS_LOADER.SVG)q.paintDom=function(){this.paintUpdate();return this.Ni;};q.paintUpdate=function(){var
x=this._P;if(x)for(var
ja=0;ja<x.length;ja++)x[ja].paintUpdate();};q.toString=function(){return ub.t+this.getTagName()+ub.A+this.getId()+ub.z;};q.getFirstChildOfType=function(o){if(typeof o==ub.y)o=(jsx3.Class.forName(o)).getConstructor();if(this._P){var
Ja=this._P;for(var
ta=0;ta<Ja.length;ta++)if(Ja[ta] instanceof o)return Ja[ta];}return null;};});jsx3.Class.defineClass("jsx3.html.Text",jsx3.html.Tag,null,function(q,g){var
ub={a:"",b:'[jsx3.html.Text "',c:'"]'};if(jsx3.CLASS_LOADER.VML){g.init=function(s){this.rt=s;};g.hn=function(n,p){n[p]=this.rt;return p+1;};g.getText=function(){return this.rt;};g.setText=function(m){this.rt=m;};g.paint=function(){return this.rt;};}else if(jsx3.CLASS_LOADER.SVG){g.init=function(f){this.Ni=document.createTextNode(f!=null?f:ub.a);};g.getText=function(){return this.Ni.nodeValue;};g.setText=function(d){this.Ni.nodeValue=d;};}g.onAppendChild=function(f){return false;};g.toString=function(){return ub.b+this.getText()+ub.c;};});jsx3.Class.defineClass("jsx3.html.BlockTag",jsx3.html.Tag,null,function(b,l){var
ub={a:"left",b:"trying to set ",c:" of ",d:" to ",e:"px",f:"top",g:"width",h:"height",i:"margin",j:"padding",k:"position",l:"zIndex",m:"backgroundColor",n:"number",o:"",p:/[^\d\-]+/};l.init=function(e,o,d,g,p,h){this.jsxsuper(e,o);this.setDimensions(d,g,p,h);};l.getLeft=function(){var
W=this.getStyle(ub.a);return W!=null?parseInt(W):null;};l.ZW=function(h,c){if(c==null){this.setStyle(h,null);}else{var
t=parseInt(c);if(isNaN(t))jsx3.chart.LOG.debug(ub.b+h+ub.c+this+ub.d+c);else this.setStyle(h,t+ub.e);}};l.setLeft=function(k){this.ZW(ub.a,k);};l.getTop=function(){var
Ma=this.getStyle(ub.f);return Ma!=null?parseInt(Ma):null;};l.setTop=function(d){this.ZW(ub.f,d);};l.getWidth=function(){var
J=this.getStyle(ub.g);return J!=null?parseInt(J):null;};l.setWidth=function(a){this.ZW(ub.g,a);};l.getHeight=function(){var
Qa=this.getStyle(ub.h);return Qa!=null?parseInt(Qa):null;};l.setHeight=function(c){this.ZW(ub.h,c);};l.getMargin=function(){return this.getStyle(ub.i);};l.setMargin=function(f){this.setStyle(ub.i,f);};l.getPadding=function(){return this.getStyle(ub.j);};l.setPadding=function(k){this.setStyle(ub.j,k);};l.getPosition=function(){return this.getStyle(ub.k);};l.setPosition=function(o){this.setStyle(ub.k,o);};l.getZIndex=function(){return this.getStyle(ub.l);};l.setZIndex=function(q){this.setStyle(ub.l,q);};l.getBackgroundColor=function(){return this.getStyle(ub.m);};l.setBackgroundColor=function(n){this.setStyle(ub.m,n);};l.getMarginDimensions=function(){return b.po(this.getMargin());};l.getPaddingDimensions=function(){return b.po(this.getPadding());};b.po=function(p){if(p)if(typeof p==ub.n){return [p,p,p,p];}else{var
Ma=(ub.o+p).split(ub.p);if(Ma[0]===ub.o)Ma.shift();if(Ma.length>0&&Ma[Ma.length]===ub.o)Ma.pop();if(Ma.length>=4){return [parseInt(Ma[0]),parseInt(Ma[1]),parseInt(Ma[2]),parseInt(Ma[3])];}else if(Ma.length>=1){var
xa=parseInt(Ma[0]);return [xa,xa,xa,xa];}}return [0,0,0,0];};l.getDimensions=function(){return [this.getLeft(),this.getTop(),this.getWidth(),this.getHeight()];};l.setDimensions=function(m,p,g,q){if(jsx3.$A.is(m)){this.setLeft(m[0]);this.setTop(m[1]);this.setWidth(m[2]);this.setHeight(m[3]);}else{this.setLeft(m);this.setTop(p);this.setWidth(g);this.setHeight(q);}};});jsx3.Class.defineInterface("jsx3.html.FontTag",null,function(q,s){var
ub={a:"fontFamily",b:"fontSize",c:"px",d:"fontStyle",e:"fontWeight",f:"textAlign",g:"textDecoration",h:"color"};s.getFontFamily=function(){return this.getStyle(ub.a);};s.setFontFamily=function(a){this.setStyle(ub.a,a);};s.getFontSize=function(){return this.getStyle(ub.b);};s.setFontSize=function(h){this.setStyle(ub.b,isNaN(h)?h:h+ub.c);};s.getFontStyle=function(){return this.getStyle(ub.d);};s.setFontStyle=function(f){this.setStyle(ub.d,f);};s.getFontWeight=function(){return this.getStyle(ub.e);};s.setFontWeight=function(e){this.setStyle(ub.e,e);};s.getTextAlign=function(){return this.getStyle(ub.f);};s.setTextAlign=function(l){this.setStyle(ub.f,l);};s.getTextDecoration=function(){return this.getStyle(ub.g);};s.setTextDecoration=function(j){this.setStyle(ub.g,j);};s.getColor=function(){return this.getStyle(ub.h);};s.setColor=function(r){this.setStyle(ub.h,r);};});jsx3.Class.defineClass("jsx3.vector.Canvas",jsx3.html.BlockTag,null,function(s,a){var
ub={a:"svg",b:"version",c:"1.1",d:"baseProfile",e:"full",f:"xmlns:xlink",g:"http://www.w3.org/1999/xlink",h:"absolute",i:"defs",j:"width",k:"number",l:"px",m:"height"};a.init=function(g,j,m,k){this.jsxsuper(jsx3.vector.Fi,ub.a,g,j,m,k);this.setProperty(ub.b,ub.c,ub.d,ub.e,ub.f,ub.g);};a.paintUpdate=function(){this.jsxsuper();if(this.d3!=null&&this.d3.getParent()==null)this.appendChild(this.d3);if(this.getPosition()!=ub.h){this.setLeft(null);this.setTop(null);}};a.getDefs=function(){if(this.d3==null){this.d3=new
jsx3.html.Tag(jsx3.vector.Fi,ub.i);this.appendChild(this.d3);}return this.d3;};a.setWidth=function(d){this.jsxsuper(d);this.setProperty(ub.j,typeof d==ub.k?d+ub.l:d);};a.setHeight=function(g){this.jsxsuper(g);this.setProperty(ub.m,typeof g==ub.k?g+ub.l:g);};});jsx3.Class.defineClass("jsx3.vector.Tag",jsx3.html.BlockTag,null,function(j,a){var
ub={a:"title",b:"can't append ",c:" to ",d:", already has parent ",e:"Illegal to append child ",f:" to parent ",g:"."};a.init=function(l,g,m,d,k){this.jsxsuper(jsx3.vector.Fi,l,g,m,d,k);};a.getToolTip=function(){return this.getProperty(ub.a);};a.setToolTip=function(d){this.setProperty(ub.a,d);};a.setRotation=function(p){this.cM=p;};a.setLeft=function(c){this.Y6=c;};a.setTop=function(d){this.PS=d;};a.setWidth=function(m){this.Vv=m;};a.setHeight=function(l){this.rz=l;};a.setPosition=function(k){this.FW=k;};a.getRotation=function(){return this.cM;};a.getLeft=function(){return this.Y6;};a.getTop=function(){return this.PS;};a.getWidth=function(){return this.Vv;};a.getHeight=function(){return this.rz;};a.getPosition=function(){return this.FW;};a.setZIndex=function(q){this.jsxsuper(q);var
oa=this.getParent();if(oa){var
Ya=oa.getChildren();for(var
za=0;za<Ya.length;za++){var
Pa=Ya[za];if(Pa instanceof j){var
ja=parseInt(Pa.getZIndex());if(q<ja){if(Pa!=this){oa.Ni.removeChild(this.Ni);oa.Ni.insertBefore(this.Ni,Pa.Ni);}break;}}}}};a.appendChild=function(g){if(this.onAppendChild(g)){if(g instanceof j&&g.getParent()!=null)throw new
jsx3.Exception(ub.b+g+ub.c+this+ub.d+g.dC);if(this._P==null)this._P=[];if(g instanceof j){var
ja=parseInt(g.getZIndex());if(!isNaN(ja))for(var
Qa=0;Qa<this._P.length;Qa++){var
Wa=this._P[Qa];var
qa=parseInt(Wa.getZIndex());if(ja<qa)this.Ni.insertBefore(g.Ni,Wa.Ni);}}if(g.Ni.parentNode==null)this.Ni.appendChild(g.Ni);this._P.push(g);g.dC=this;}else throw new
jsx3.Exception(ub.e+g+ub.f+this+ub.g);};a.getDefs=function(){var
w=this.getParent();return w!=null?w.getDefs():null;};});jsx3.Class.defineClass("jsx3.vector.Stroke",jsx3.html.Tag,null,function(m,s){var
ub={a:"<stroke ",b:" ",c:"/>",d:"<",e:":",f:" id='",g:"'",h:" on='",i:" color='",j:" opacity='",k:" weight='",l:/\s+/};var
ga=jsx3.vector;m.Ui=null;s.init=function(p,j,h){this.jsxsuper(ga.Fi,m.Ui);this.vu=null;this.tU=p!=null?p:0;this.Vv=j!=null?j:1;this.jM=h!=null?ga.ed(h):1;};s.getColor=function(){return this.tU;};s.getColorHtml=function(){return ga.colorAsHtml(this.tU);};s.setColor=function(e){this.tU=e;};s.getWidth=function(){return this.Vv;};s.setWidth=function(n){this.Vv=n;};s.getAlpha=function(){return this.jM;};s.setAlpha=function(p){this.jM=p!=null?ga.ed(p):null;};s.onAppendChild=function(n){return false;};s.toString=function(){return ub.a+this.getColorHtml()+ub.b+this.Vv+ub.b+this.jM+ub.c;};s.paint=function(){var
qa=ub.d+ga.Fi+ub.e+this.getTagName();if(this.getId()!=null)qa=qa+(ub.f+this.getId()+ub.g);var
da=this.getColorHtml();if(this.vu!=null)qa=qa+(ub.h+this.vu+ub.g);if(da!=null)qa=qa+(ub.i+da+ub.g);if(this.jM!=null&&this.jM<1)qa=qa+(ub.j+this.jM+ub.g);if(this.Vv!=null)qa=qa+(ub.k+ga.Li(this.Vv)+ub.g);qa=qa+ub.c;return qa;};s.Kk=function(){return this.jM==1||this.jM==null;};m.valueOf=function(a){if(jsx3.util.strEmpty(a))return null;if(a instanceof m)return a;var
Ka=(a.toString()).split(ub.l);return new
m(Ka[0],Ka[1],Ka[2]);};});jsx3.Class.defineClass("jsx3.vector.Fill",jsx3.html.Tag,null,function(c,b){var
ub={a:"<fill ",b:" ",c:"/>",d:"solid",e:/\s+/};var
ga=jsx3.vector;c.Ui=null;b.init=function(e,m){this.jsxsuper(ga.Fi,c.Ui);this.vu=null;this.tU=e!=null?e:0;this.jM=m!=null?ga.ed(m):1;this.Dt=null;this.B9=null;this.B0=null;this.j3=null;this.ZU=null;};b.getColor=function(){return this.tU;};b.getColorHtml=function(){return ga.colorAsHtml(this.tU);};b.setColor=function(s){this.tU=s;};b.getAlpha=function(){return this.jM;};b.setAlpha=function(l){this.jM=l!=null?ga.ed(l):null;};b.getType=function(){return this.Dt;};b.setType=function(g){this.Dt=g;};b.getColor2=function(){return this.B9;};b.getColor2Html=function(){return ga.colorAsHtml(this.B9);};b.setColor2=function(n){this.B9=n;};b.getAlpha2=function(){return this.B0;};b.setAlpha2=function(m){this.B0=m;};b.getAngle=function(){return this.j3;};b.setAngle=function(l){this.j3=l;};b.getColors=function(){return this.ZU;};b.setColors=function(l){this.ZU=l;};b.toString=function(){return ub.a+this.getColorHtml()+ub.b+this.getAlpha()+ub.c;};b.hasGradient=function(){return this.Dt&&this.Dt!=ub.d;};b.Kk=function(){return (this.jM==1||this.jM==null)&&!this.hasGradient();};c.valueOf=function(n){if(jsx3.util.strEmpty(n))return null;if(n instanceof c)return n;var
Eb=(n.toString()).split(ub.e);return new
c(Eb[0],Eb[1]);};b.onAppendChild=function(q){return false;};});jsx3.Class.defineClass("jsx3.vector.Group",jsx3.vector.Tag,null,function(i,k){var
ub={a:"g",b:"transform",c:"translate(",d:",",e:")"};k.init=function(p,s,d,a){this.jsxsuper(i.Ui,p,s,d,a);};i.Ui=ub.a;k.paintUpdate=function(){this.jsxsuper();var
I=this.getLeft()||Number(0);var
yb=this.getTop()||Number(0);if(I||yb)this.setProperty(ub.b,ub.c+I+ub.d+yb+ub.e);};k.onAppendChild=function(r){return r instanceof i||r instanceof jsx3.vector.BaseShape;};});jsx3.Class.defineClass("jsx3.vector.BaseShape",jsx3.vector.Tag,null,function(a,q){var
ub={A:"translate(",B:",",C:"transform",D:" ",E:"string",a:"path",b:"grad_",c:"fill",d:"url(#",e:")",f:"fill-opacity",g:"linearGradient",h:"x1",i:"y1",j:"x2",k:"y2",l:"gradientTransform",m:"rotate(",n:"stop",o:"offset",p:"0%",q:"stop-color",r:"stop-opacity",s:/\s*,\s*/,t:/\s+/,u:"%",v:"100%",w:"none",x:"stroke",y:"stroke-width",z:"stroke-opacity"};var
Ea=jsx3.html.Tag;var
Sa=jsx3.vector;q.init=function(s,f,c,n,d){this.jsxsuper(s!=null?s:a.Ui,f,c,n,d);this.be=null;this.ie=null;};a.Ui=ub.a;q.paintUpdate=function(){this.jsxsuper();if(this.be!=null){if(this.be.hasGradient()){var
rb=this;var
ya;while(!(ya=rb.getId()))rb=rb.getParent();var
Hb=ub.b+ya;if(this.o5!=null&&this.o5.getParent()!=null)(this.o5.getParent()).removeChild(this.o5);this.setProperty(ub.c,ub.d+Hb+ub.e);this.removeProperty(ub.f);this.o5=new
Ea(Sa.Fi,ub.g);this.o5.setId(Hb);var
na=this.be.getAngle()||Number(0);var
va=jsx3.util.numMod(2*Math.PI/360*(-1*na-90),2*Math.PI);var
eb=Math.cos(va);var
N=Math.sin(va);var
F=Math.max(Math.abs(eb),Math.abs(N));N=N/F;eb=eb/F;this.o5.setProperty(ub.h,jsx3.util.numRound(0.5-eb/2,1.0E-4),ub.i,jsx3.util.numRound(0.5-N/2,1.0E-4),ub.j,jsx3.util.numRound(0.5+eb/2,1.0E-4),ub.k,jsx3.util.numRound(0.5+N/2,1.0E-4));var
Ib=this.getRotation();if(Ib)this.o5.setProperty(ub.l,ub.m+-Ib+ub.e);var
Jb=new
Ea(Sa.Fi,ub.n);Jb.setProperty(ub.o,ub.p,ub.q,this.be.getColorHtml(),ub.r,this.be.getAlpha());this.o5.appendChild(Jb);var
J=this.be.getColors();if(J){var
sa=J.split(ub.s);for(var
za=0;za<sa.length;za++){var
Fa=(jsx3.util.strTrim(sa[za])).split(ub.t,2);if(Fa.length==2){var
Ka=parseInt(Fa[0]);if(!isNaN(Ka)){var
U=new
Ea(Sa.Fi,ub.n);U.setProperty(ub.o,Ka+ub.u,ub.q,Fa[1]);this.o5.appendChild(U);}}}}var
hb=new
Ea(Sa.Fi,ub.n);hb.setProperty(ub.o,ub.v,ub.q,this.be.getColor2Html(),ub.r,this.be.getAlpha2()!=null?this.be.getAlpha2():1);this.o5.appendChild(hb);(this.getDefs()).appendChild(this.o5);}else this.setProperty(ub.c,this.be.getColorHtml(),ub.f,this.be.getAlpha());}else{this.setProperty(ub.c,ub.w);this.removeProperty(ub.f);if(this.o5!=null&&this.o5.getParent()!=null)(this.o5.getParent()).removeChild(this.o5);}if(this.ie!=null){var
z=this.ie.getWidth();this.setProperty(ub.x,this.ie.getColorHtml(),ub.y,z||Number(1),ub.z,this.ie.getAlpha());}else{this.setProperty(ub.x,ub.w);this.removeProperty(ub.y,ub.z);}var
Cb=[];var
wb=this.getLeft()||Number(0);var
Mb=this.getTop()||Number(0);if(wb||Mb)Cb.push(ub.A+wb+ub.B+Mb+ub.e);var
Ib=this.getRotation();if(Ib)Cb.push(ub.m+Ib+ub.B+Math.round(this.getWidth()/2)+ub.B+Math.round(this.getHeight()/2)+ub.e);this.setProperty(ub.C,Cb.length>0?Cb.join(ub.D):null);};q.onAppendChild=function(j){return j instanceof Sa.TextLine||j instanceof Sa.Fill||j instanceof Sa.Stroke||typeof j==ub.E;};q.setFill=function(i){this.be=i;};q.setStroke=function(d){this.ie=d;};q.getFill=function(){return this.be;};q.getStroke=function(){return this.ie;};});jsx3.Class.defineClass("jsx3.vector.Shape",jsx3.vector.BaseShape,null,function(k,a){var
ub={a:"d",b:"m",c:"M",d:" ",e:"l",f:"L",g:"A ",h:" 0 ",i:"1",j:"0",k:"z"};var
ga=jsx3.vector;a.getPath=function(){this.ZA();return this.getProperty(ub.a);};a.setPath=function(s){this._p=[s];this.setProperty(ub.a,s);};a.pathMoveTo=function(c,b,m){this.Zu((m?ub.b:ub.c)+ub.d+c+ub.d+b);return this;};a.pathLineTo=function(j,i,s){this.Zu((s?ub.e:ub.f)+ub.d+j+ub.d+i);return this;};a.pathArcTo=function(h,j,b,q,n,e,s,g,o){var
Ia=Math.sqrt(Math.pow(n-h,2)+Math.pow(e-j,2));var
Z=Math.sqrt(Math.pow(s-h,2)+Math.pow(g-j,2));var
Nb=Math.asin((j-e)/Ia);if(n-h<0)Nb=(Nb>0?Math.PI:-Math.PI)-Nb;var
Lb=Math.asin((j-g)/Z);if(s-h<0)Lb=(Lb>0?Math.PI:-Math.PI)-Lb;var
G=o?Nb-Lb:Lb-Nb;var
U=G>-1*Math.PI&&G<0||G>Math.PI;(this.pathLineTo(n,e)).Zu(ub.g+b+ub.d+q+ub.h+(U?ub.i:ub.j)+ub.d+(o?ub.i:ub.j)+ub.d+s+ub.d+g);return this;};a.pathClose=function(){this.Zu(ub.k);return this;};a.Zu=function(r){if(!this._p)this._p=[];this._p.push(r);};a.ZA=function(){if(this._p&&this._p.length>1){var
u=this._p.join(ub.d);this.setPath(u);}};a.paintUpdate=function(){this.ZA();this.jsxsuper();};});jsx3.Class.defineClass("jsx3.vector.Line",jsx3.vector.BaseShape,null,function(k,n){var
ub={a:"line",b:"x1",c:"y1",d:"x2",e:"y2",f:"<line ",g:" {",h:",",i:"} {",j:"}/>"};n.init=function(g,j,f,m,e,l){this.jsxsuper(ub.a,g,j);this.setPoints(f,m,e,l);};n.setPoints=function(j,q,i,p){this.setX1(j);this.setY1(q);this.setX2(i);this.setY2(p);};n.getX1=function(){return this.getProperty(ub.b);};n.setX1=function(r){this.setProperty(ub.b,r);};n.getY1=function(){return this.getProperty(ub.c);};n.setY1=function(d){this.setProperty(ub.c,d);};n.getX2=function(){return this.getProperty(ub.d);};n.setX2=function(h){this.setProperty(ub.d,h);};n.getY2=function(){return this.getProperty(ub.e);};n.setY2=function(i){this.setProperty(ub.e,i);};n.toString=function(){return ub.f+this.getId()+ub.g+this.getX1()+ub.h+this.getY1()+ub.i+this.getX2()+ub.h+this.getY2()+ub.j;};});jsx3.Class.defineClass("jsx3.vector.Rectangle",jsx3.vector.BaseShape,null,function(r,i){var
ub={a:"rect",b:"width",c:"number",d:"px",e:"height"};i.init=function(p,s,d,a){this.jsxsuper(ub.a,p,s,d,a);};i.clipToBox=function(p){this.clipTo(p.getLeft(),p.getTop(),p.getWidth(),p.getHeight());};i.clipTo=function(h,g,e,n){var
db=Math.max(this.getLeft(),h);var
t=Math.max(this.getTop(),g);var
gb=Math.min(this.getWidth()-(db-this.getLeft()),h+e-db);var
wb=Math.min(this.getHeight()-(t-this.getTop()),g+n-t);this.setDimensions(db,t,gb,wb);};i.getWidth=function(){var
Lb=this.getProperty(ub.b);return Lb!=null?parseInt(Lb):null;};i.setWidth=function(d){this.setProperty(ub.b,typeof d==ub.c?d+ub.d:d);};i.getHeight=function(){var
Za=this.getProperty(ub.e);return Za!=null?parseInt(Za):null;};i.setHeight=function(h){this.setProperty(ub.e,typeof h==ub.c?h+ub.d:h);};});jsx3.Class.defineClass("jsx3.vector.Oval",jsx3.vector.BaseShape,null,function(a,b){var
ub={a:"ellipse",b:"cx",c:"number",d:"px",e:"cy",f:"rx",g:"ry",h:"transform",i:"translate(",j:",",k:")"};b.init=function(p,s,d,k){this.jsxsuper(a.Ui,p,s,d,k);};a.Ui=ub.a;b.getLeft=function(){var
N=this.getProperty(ub.b);return N!=null?parseInt(N):null;};b.setLeft=function(f){this.setProperty(ub.b,typeof f==ub.c?f+ub.d:f);};b.getTop=function(){var
vb=this.getProperty(ub.e);return vb!=null?parseInt(vb):null;};b.setTop=function(k){this.setProperty(ub.e,typeof k==ub.c?k+ub.d:k);};b.getWidth=function(){var
Q=this.getProperty(ub.f);return Q!=null?2*parseInt(Q):null;};b.setWidth=function(s){this.setProperty(ub.f,s!=null?parseFloat(s)/2+ub.d:null);};b.getHeight=function(){var
Jb=this.getProperty(ub.g);return Jb!=null?2*parseInt(Jb):null;};b.setHeight=function(e){this.setProperty(ub.g,e!=null?parseFloat(e)/2+ub.d:null);};b.paintUpdate=function(){this.jsxsuper();this.setProperty(ub.h,ub.i+this.getWidth()/2+ub.j+this.getHeight()/2+ub.k);};});jsx3.Class.defineClass("jsx3.vector.Polygon",jsx3.vector.BaseShape,null,function(r,o){var
ub={a:"polyline",b:"points",c:" "};o.init=function(k,n,q){this.jsxsuper(ub.a,k,n);this.setPoints(q);};o.setPoints=function(d){this.setProperty(ub.b,d?d.join(ub.c):null);};o.setPointsAsNumberArray=function(s){this.setProperty(ub.b,s?s.join(ub.c):null);};o.setPointsAsString=function(b){this.setProperty(ub.b,b);};});jsx3.Class.defineClass("jsx3.vector.TextLine",jsx3.vector.BaseShape,[jsx3.html.FontTag],function(g,b){var
ub={a:"text",b:"fill",c:"fill-opacity",d:".",e:"stroke",f:"stroke-width",g:"dy",h:"left",i:"start",j:"right",k:"end",l:"middle",m:"text-anchor",n:"x",o:"y",p:"transform",q:"rotate(",r:",",s:")",t:"font-family",u:"font-style",v:"font-weight",w:"text-decoration"};var
bb=jsx3.html.Tag;var
Aa=jsx3.app.Browser;var
G=jsx3.vector;b.init=function(j,q,i,p,l){this.ND=j;this._1=q;this.yE=i;this.ex=p;var
eb=Math.max(1,Math.max(j,i)-Math.min(j,i));var
sa=Math.max(1,Math.max(q,p)-Math.min(q,p));this.jsxsuper(ub.a,null,null,eb,sa);var
R=0;var
mb=Math.sqrt(Math.pow(i-j,2)+Math.pow(p-q,2));if(q>=p){R=360-Math.round(Math.acos((i-j)/mb)*180/Math.PI);}else R=Math.round(Math.acos((i-j)/mb)*180/Math.PI);this.j3=R%360;this.rt=new
jsx3.html.Text(l);};b.getText=function(){return this.rt.getText();};b.setText=function(p){this.rt.setText(p);};b.paintUpdate=function(){if(!this.getProperty(ub.b))if(this.be){this.setProperty(ub.b,this.be.getColorHtml(),ub.c,this.be.getAlpha());}else{var
M=Aa.getStyleClass(ub.d+this.getClassName())||Number(0);if(M&&M.color!=null){this.setProperty(ub.b,M.color);}else this.removeProperty(ub.b,ub.c);}if(this.ie!=null){var
Pa=this.ie.getWidth();this.setProperty(ub.e,this.ie.getColorHtml(),ub.f,Pa||Number(1));}else this.removeProperty(ub.e,ub.f);var
Ma=this.getFontSize();if(Ma==null){var
M=Aa.getStyleClass(ub.d+this.getClassName());if(M!=null)Ma=M.fontSize;}this.setProperty(ub.g,Ma?Math.floor(parseInt(Ma)/2.5):0);var
sa=this.getTextAlign();if(!sa){var
M=Aa.getStyleClass(ub.d+this.getClassName());if(M!=null)sa=M.textAlign;}var
U=null,A=null,Fb=null;if(sa==ub.h){Fb=ub.i;U=this.ND;A=this._1;}else if(sa==ub.j){Fb=ub.k;U=this.yE;A=this.ex;}else{Fb=ub.l;U=Math.round((this.yE+this.ND)/2);A=Math.round((this.ex+this._1)/2);}this.setProperty(ub.m,Fb,ub.n,U,ub.o,A);if(this.j3>0)this.setProperty(ub.p,ub.q+this.j3+ub.r+U+ub.r+A+ub.s);else this.removeProperty(ub.p);if(this.rt.getParent()==null)this.appendChild(this.rt);};b.getFontFamily=function(){return this.getProperty(ub.t);};b.setFontFamily=function(f){this.setProperty(ub.t,f);};b.getFontStyle=function(){return this.getProperty(ub.u);};b.setFontStyle=function(q){this.setProperty(ub.u,q);};b.getFontWeight=function(){return this.getProperty(ub.v);};b.setFontWeight=function(j){this.setProperty(ub.v,j);};b.getTextDecoration=function(){return this.getProperty(ub.w);};b.setTextDecoration=function(l){this.setProperty(ub.w,l);};b.getColor=function(){return this.getProperty(ub.b);};b.setColor=function(a){this.setProperty(ub.b,a);};b.onAppendChild=function(j){return j instanceof jsx3.html.Text;};});jsx3.Class.defineClass("jsx3.vector.LineGroup",jsx3.vector.Shape,null,function(n,m){var
ub={a:""};m.init=function(p,s,d,a){this.jsxsuper(null,p,s,d,a);};m.addLine=function(h,o,g,b){(this.pathMoveTo(h,o)).pathLineTo(g,b);};m.addRelativeLine=function(o,c,d,l){(this.pathMoveTo(o,c)).pathLineTo(d,l,true);};m.clearLines=function(){this.setPath(ub.a);};});jsx3.Class.defineClass("jsx3.vector.RectangleGroup",jsx3.vector.Shape,null,function(h,r){var
ub={a:""};r.init=function(p,s,d,a){this.jsxsuper(null,p,s,d,a);};r.addRectangle=function(b,o,g,n){((((this.pathMoveTo(b,o)).pathLineTo(g,o)).pathLineTo(g,n)).pathLineTo(b,n)).pathClose();};r.addRelativeRectangle=function(o,c,q,m){((((this.pathMoveTo(o,c)).pathLineTo(q,0,true)).pathLineTo(0,m,true)).pathLineTo(-1*q,0,true)).pathClose();};r.clearRectangles=function(){this.setPath(ub.a);};});jsx3.require("jsx3.gui.Block");jsx3.Class.defineClass("jsx3.vector.Block",jsx3.gui.Block,null,function(s,r){var
ub={a:"relative",b:"absolute",c:"relativebox",d:"box",e:"span"};r.getCanvas=function(){if(this.RN==null)this.createVector();return this.RN;};r.createVector=function(){this.applyDynamicProperties();var
T=this.RN;var
zb=this.createCanvas();zb.setId(this.getId());zb.setZIndex(this.getZIndex());zb.setPosition(this.getRelativePosition()?ub.a:ub.b);this.zE(zb);var
Gb=this.getAttributes();for(var Pa in Gb)zb.setProperty(Pa,Gb[Pa]);if(T!=null)T.release();this.RN=zb;return zb;};r.updateVector=function(o){this.applyDynamicProperties();this.zE(o);return true;};r.zE=function(k){var
T=this.Wl(true);k.setLeft(T.getPaintedLeft());k.setTop(T.getPaintedTop());k.setWidth(T.getPaintedWidth());k.setHeight(T.getPaintedHeight());};r.createCanvas=function(){return new
jsx3.vector.Canvas();};r.isDomPaint=function(){return true;};r.paint=function(){throw new
jsx3.Exception();};r.paintDom=function(){if(this.RN==null)this.createVector();return this.RN.paintDom();};r.repaint=function(){if(!this.RN||!this.updateVector(this.RN))this.createVector();return this.jsxsuper();};r.paintEventHandler=function(n,f,j){if(j==null)j=this.getCanvas();jsx3.vector.paintEventHandler(this,n,f,j);};r.Vm=function(a){if(this.getParent()&&(a==null||isNaN(a.parentwidth)||isNaN(a.parentheight))){a=(this.getParent()).ng(this);}else if(a==null)a={};var
tb=this.getRelativePosition()!=jsx3.gui.Block.ABSOLUTE;var
va=tb?null:this.getLeft();var
Ja=tb?null:this.getTop();if(!a.boxtype)a.boxtype=tb?ub.c:ub.d;a.tagname=ub.e;if(a.left==null&&va!=null)a.left=va;if(a.top==null&&Ja!=null)a.top=Ja;a.width=this.getWidth();a.height=this.getHeight();return new
jsx3.gui.Painted.Box(a);};r.Rc=function(f,o,l){if(o){var
T=this.Wl(true,f);var
A=T.recalculate(f,o,l);if(A.w||A.h)this.repaint();}};r.doClone=function(c){this.RN=null;return this.jsxsuper(c);};r.getCanSpy=function(){return true;};});jsx3.Class.defineInterface("jsx3.chart.PointRenderer",null,function(i,b){var
ub={a:"x1",b:"y1",c:"x2",d:"y2",e:"fill",f:"stroke",g:"area"};var
L=jsx3.vector;b.render=jsx3.Method.newAbstract(ub.a,ub.b,ub.c,ub.d,ub.e,ub.f);b.areaToRadius=jsx3.Method.newAbstract(ub.g);i.CIRCLE=i.jsxclass.newInnerClass();i.CIRCLE.areaToRadius=function(g){return Math.sqrt(g/Math.PI);};i.CIRCLE.render=function(k,r,j,q,l,h){var
P=new
L.Oval(k,r,j-k,q-r);P.setFill(l);P.setStroke(h);return P;};i.CROSS=i.jsxclass.newInnerClass();i.CROSS.SI=0.6;i.CROSS.areaToRadius=function(p){return Math.sqrt(p/(1-this.SI/Math.SQRT2))/2;};i.CROSS.render=function(k,r,j,q,l,h){var
rb=j-k;var
mb=this.SI;var
T=Math.round(rb*(1-mb)/2);var
ja=Math.round(rb*mb/2);var
vb=Math.round(rb-rb*(1-mb)/2);var
ia=Math.round(rb/2);var
Nb=new
L.Polygon(0,0,[k,r,k+T,r,k+ia,r+ja,k+vb,r,j,r,j,r+T,j-ja,r+ia,j,r+vb,j,q,j-T,q,j-ia,q-ja,j-vb,q,k,q,k,q-T,k+ja,q-ia,k,q-vb,k,r]);Nb.setFill(l);Nb.setStroke(h);return Nb;};i.DIAMOND=i.jsxclass.newInnerClass();i.DIAMOND.qO=1.2;i.DIAMOND.areaToRadius=function(n){return Math.sqrt(n)/2;};i.DIAMOND.render=function(a,h,s,g,r,o){var
t=(a+s)/2;var
Fa=(h+g)/2;var
Xa=(s-a)/this.qO;var
Pa=(g-h)/this.qO;var
gb=new
L.Rectangle(Math.round(t-Xa/2),Math.round(Fa-Pa/2),Math.round(Xa),Math.round(Pa));gb.setRotation(45);gb.setFill(r);gb.setStroke(o);return gb;};i.BOX=i.jsxclass.newInnerClass();i.BOX.areaToRadius=function(f){return Math.sqrt(i.DIAMOND.qO*i.DIAMOND.qO*f)/2;};i.BOX.render=function(l,s,k,r,m,j){var
J=new
L.Rectangle(l,s,k-l,r-s);J.setFill(m);J.setStroke(j);return J;};i.TRIANGLE=i.jsxclass.newInnerClass();i.TRIANGLE.areaToRadius=function(l){return Math.sqrt(2*l)/2;};i.TRIANGLE.render=function(d,k,a,h,c,s){var
Ka=Math.round((d+a)/2);var
E=new
L.Polygon(0,0,[Ka,k,a,h,d,h,Ka,k]);E.setFill(c);E.setStroke(s);return E;};});jsx3.chart.Renderers=jsx3.chart.PointRenderer;jsx3.chart.Renderers.Circle=jsx3.chart.PointRenderer.CIRCLE;jsx3.chart.Renderers.Cross=jsx3.chart.PointRenderer.CROSS;jsx3.chart.Renderers.Diamond=jsx3.chart.PointRenderer.DIAMOND;jsx3.chart.Renderers.Box=jsx3.chart.PointRenderer.BOX;jsx3.chart.Renderers.Triangle=jsx3.chart.PointRenderer.TRIANGLE;jsx3.require("jsx3.gui.Block");jsx3.Class.defineClass("jsx3.chart.ChartComponent",jsx3.gui.Block,null,function(s,i){var
ub={a:"relative",b:"absolute"};var
Pa=jsx3.gui.Event;var
ya=jsx3.gui.Interactive;var
Fb=jsx3.vector;var
C=jsx3.chart;s.MASK_PROPS_NOEDIT={NN:false,SS:false,EE:false,WW:false,MM:false};i.init=function(o){this.jsxsuper(o);this.P0=null;};i.getChart=function(){return this.findAncestor(function(q){return C.Chart&&q instanceof C.Chart;},true);};i.doClone=function(c){this.P0=null;return this.jsxsuper(c);};i.updateView=function(){this.applyDynamicProperties();var
u=null,Ma=this._canvas;if(Ma!=null)u=Ma.getParent();var
Mb=new
Fb.Group();Mb.setId(this.getId());Mb.setDimensions(this.getDimensions());Mb.setZIndex(this.getZIndex());Mb.setPosition(this.getRelativePosition()?ub.a:ub.b);var
gb=this.getAttributes();for(var Aa in gb)Mb.setProperty(Aa,gb[Aa]);if(Ma!=null)Ma.release();if(u!=null)u.replaceChild(Mb,Ma);this._canvas=Mb;};i.getCanvas=function(){if(this._canvas==null)this.updateView();return this._canvas;};i.th=function(n){jsx3.chart.th(this,n);};if(jsx3.CLASS_LOADER.VML){i.paint=function(){if(this._canvas==null)this.updateView();return this._canvas.paint();};}else if(jsx3.CLASS_LOADER.SVG){i.isDomPaint=function(){return true;};i.paint=function(){throw new
jsx3.Exception();};i.paintDom=function(){if(this._canvas==null)this.updateView();return this._canvas.paintDom();};}i.repaint=function(){this.updateView();return this.jsxsuper();};i.qf=function(d,o){if(this.P0==null)this.P0={};this.P0[d]=o;};i.nj=function(c){return this.P0!=null?this.P0[c]:null;};i.Ll=function(a){if(this.P0!=null)delete this.P0[a];};i.getMaskProperties=function(){return s.MASK_PROPS_NOEDIT;};i.getPaddingDimensions=function(){return jsx3.html.BlockTag.po(this.getPadding());};i.getCanSpy=function(){return true;};s.getVersion=function(){return C.si;};});jsx3.require("jsx3.chart.ChartComponent");jsx3.Class.defineClass("jsx3.chart.ChartLabel",jsx3.chart.ChartComponent,null,function(j,p){var
mb=jsx3.vector;j.DEFAULT_WIDTH=100;j.ROTATION_NORMAL=0;j.ROTATION_CW=90;j.ROTATION_CCW=270;p.init=function(h,m){this.jsxsuper(h);this.jsxtext=m;this.alpha=null;this.borderStroke=null;this.preferredWidth=null;this.preferredHeight=null;this.labelRotation=0;};p.getText=function(){return this.jsxtext;};p.setText=function(e){this.jsxtext=e;};p.getPreferredWidth=function(){if(this.preferredWidth!=null){return this.preferredWidth;}else if(this.isRotated()){return this.CQ();}else{var
P=this.getPaddingDimensions();return j.DEFAULT_WIDTH+P[0]+P[2];}};p.setPreferredWidth=function(l){this.preferredWidth=l;};p.getPreferredHeight=function(){if(this.preferredHeight!=null){return this.preferredHeight;}else if(this.isRotated()){var
ja=this.getPaddingDimensions();return j.DEFAULT_WIDTH+ja[1]+ja[3];}else return this.CQ();};p.setPreferredHeight=function(d){this.preferredHeight=d;};p.CQ=function(){var
ta=this.getPaddingDimensions();var
Za=this.getFontSize()!=null?this.getFontSize():10;return Math.round(Za*1.5)+(this.isRotated()?ta[1]+ta[3]:ta[0]+ta[2]);};p.getAlpha=function(){return this.alpha;};p.setAlpha=function(r){this.alpha=r!=null?mb.ed(r):null;};p.getBorderStroke=function(){return this.borderStroke;};p.setBorderStroke=function(f){this.borderStroke=f;};p.getLabelRotation=function(){return this.labelRotation;};p.setLabelRotation=function(m){this.labelRotation=m;};p.isRotated=function(){return this.labelRotation==90||this.labelRotation==270;};p.updateView=function(){this.jsxsuper();var
_=this.getCanvas();var
oa=this.getWidth();var
ta=this.getHeight();var
I=this.getPaddingDimensions();this.th();var
W=new
mb.Rectangle(0,0,oa,ta);_.appendChild(W);jsx3.chart.Yh(this,W);var
hb=W.getFill();var
Gb=mb.Stroke.valueOf(this.borderStroke);if(Gb!=null){W.setStroke(Gb);}else if(hb!=null&&(this.alpha==null||this.alpha==1))W.setStroke(new
mb.Stroke(hb.getColor()));var
Sa=0,eb=0,T=0,z=0;if(this.isRotated()){T=(z=Math.round(I[3]+(oa-I[1]-I[3])/2));if(this.labelRotation==90){eb=ta;}else Sa=ta;}else{Sa=(eb=Math.round(ta/2));T=0;z=oa;}var
M=new
mb.TextLine(T,Sa,z,eb,this.jsxtext);M.setColor(this.getColor());M.setClassName(this.getClassName());M.setFontFamily(this.jsxfontname);M.setFontWeight(this.jsxfontweight);M.setFontSize(this.jsxfontsize);M.setTextAlign(this.jsxtextalign);_.appendChild(M);};p.onSetChild=function(){return false;};p.onSetParent=function(a){return a instanceof jsx3.chart.ChartComponent||a instanceof jsx3.chart.Chart;};j.getVersion=function(){return jsx3.chart.si;};});jsx3.require("jsx3.chart.ChartComponent");jsx3.Class.defineClass("jsx3.chart.Axis",jsx3.chart.ChartComponent,null,function(k,q){var
ub={a:"inside",b:"outside",c:"cross",d:"none",e:"high",f:"low",g:"axis",h:"%",i:"0",j:".",k:"-",l:"",m:"e",n:"#000000",o:"index",p:"labelFunction",q:"labelPlacement",r:"tickPlacement",s:"minorTickPlacement",t:/\S/,u:"bad placement value: "};var
db=jsx3.vector;var
sb=db.Stroke;var
ha=jsx3.chart;k.TICK_INSIDE=ub.a;k.TICK_OUTSIDE=ub.b;k.TICK_CROSS=ub.c;k.TICK_NONE=ub.d;k.LABEL_HIGH=ub.e;k.LABEL_LOW=ub.f;k.LABEL_AXIS=ub.g;k.oQ={inside:1,outside:1,cross:1};k.LP={axis:1,high:1,low:1};k.mP=1;k.Ou=2;k.I8=4;k.PJ=3;k.Wp=7;k.hA=8;k.XI=6;k.MY=5;k.Ap=[k.PJ,k.I8,k.Ou,k.mP,k.Ou,k.mP,k.PJ,k.I8,k.hA,k.XI,k.Wp,k.MY];k.o4=10;k.w2=50;k.N0=12;k.percent=function(s){return s+ub.h;};k.scientific=function(h,f){if(h==0)return ub.i;if(f==null)f=2;var
ua=h<0;h=Math.abs(h);var
Ja=Math.floor(Math.log(h)/Math.LN10);var
Db=Ja!=0?h/Math.pow(10,Ja):h;Db=Db.toString();var
sa=Db.indexOf(ub.j);if(sa>=0)if(Db.length-sa-1>f)Db=Db.substring(0,sa+1+f);return (ua?ub.k:ub.l)+Db+ub.m+Ja;};q.init=function(c,e,p){this.jsxsuper(c);this.horizontal=e!=null?jsx3.Boolean.valueOf(e):null;this.primary=p!=null?jsx3.Boolean.valueOf(p):null;this.length=100;this.showAxis=jsx3.Boolean.TRUE;this.axisStroke=ub.n;this.showLabels=jsx3.Boolean.TRUE;this.labelGap=3;this.labelRotation=0;this.labelPlacement=ub.g;this.tickLength=3;this.tickPlacement=ub.b;this.tickStroke=ub.n;this.minorTickDivisions=4;this.minorTickLength=3;this.minorTickPlacement=ub.d;this.minorTickStroke=null;this.labelFunction=null;this.labelClass=null;this.labelStyle=null;this.labelColor=null;this.displayWidth=null;};q.Xj=jsx3.Method.newAbstract(ub.o);q.Hf=jsx3.Method.newAbstract();q.mo=jsx3.Method.newAbstract();q.fl=jsx3.Method.newAbstract();q.getHorizontal=function(){return this.horizontal;};q.setHorizontal=function(c){this.horizontal=c;};q.ui=function(){return this.primary;};q.kh=function(o){this.primary=o;};q.getLength=function(){return this.length;};q.setLength=function(j){this.length=j;};q.getShowAxis=function(){return this.showAxis;};q.setShowAxis=function(l){this.showAxis=l;};q.getLabelFunction=function(){return ha.vc(this,ub.p);};q.setLabelFunction=function(d){ha.Wk(this,ub.p,d);};q.getAxisStroke=function(){return this.axisStroke;};q.setAxisStroke=function(j){this.axisStroke=j;};q.getShowLabels=function(){return this.showLabels;};q.setShowLabels=function(m){this.showLabels=m;};q.getLabelGap=function(){return this.labelGap;};q.setLabelGap=function(r){this.labelGap=r;};q.getLabelRotation=function(){return this.labelRotation;};q.setLabelRotation=function(m){this.labelRotation=m;};q.getLabelPlacement=function(){return this.labelPlacement;};q.setLabelPlacement=function(e){if(k.LP[e]){this.labelPlacement=e;}else throw new
jsx3.IllegalArgumentException(ub.q,e);};q.getTickLength=function(){return this.tickLength;};q.setTickLength=function(d){this.tickLength=d;};q.getTickPlacement=function(){return this.tickPlacement;};q.setTickPlacement=function(r){if(k.oQ[r]||r==ub.d){this.tickPlacement=r;}else throw new
jsx3.IllegalArgumentException(ub.r,r);};q.getTickStroke=function(){return this.tickStroke;};q.setTickStroke=function(c){this.tickStroke=c;};q.getMinorTickDivisions=function(){return this.minorTickDivisions;};q.setMinorTickDivisions=function(d){this.minorTickDivisions=d;};q.getMinorTickLength=function(){return this.minorTickLength;};q.setMinorTickLength=function(n){this.minorTickLength=n;};q.getMinorTickPlacement=function(){return this.minorTickPlacement;};q.setMinorTickPlacement=function(n){if(k.oQ[n]||n==ub.d){this.minorTickPlacement=n;}else throw new
jsx3.IllegalArgumentException(ub.s,n);};q.getMinorTickStroke=function(){return this.minorTickStroke;};q.setMinorTickStroke=function(l){this.minorTickStroke=l;};q.getLabelClass=function(){return this.labelClass;};q.setLabelClass=function(f){this.labelClass=f;};q.getLabelStyle=function(){return this.labelStyle;};q.setLabelStyle=function(i){this.labelStyle=i;};q.getLabelColor=function(){return this.labelColor;};q.setLabelColor=function(c){this.labelColor=c;};q.getDisplayWidth=function(){if(this.displayWidth!=null){return this.displayWidth;}else return this.horizontal?k.N0:k.w2;};q.setDisplayWidth=function(a){this.displayWidth=a;};q.updateView=function(){this.jsxsuper();var
qb=this.getCanvas();var
Fb=this.getWidth();var
gb=this.getHeight();var
T=this.getOpposingAxis();if(T==null)return;var
Eb=this.b7(T);this.th();if(this.showAxis){var
ma=new
db.Line(0,0,0,0,0,0);qb.appendChild(ma);var
R=sb.valueOf(this.axisStroke);if(R==null)R=new
sb();ma.setStroke(R);if(this.horizontal)ma.setPoints(0,Eb,this.length,Eb);else ma.setPoints(Eb,0,Eb,this.length);}var
O=this.Hf();if(k.oQ[this.tickPlacement]&&this.tickLength>0){var
ua=new
db.LineGroup(0,0,Fb,gb);qb.appendChild(ua);var
R=sb.valueOf(this.tickStroke);ua.setStroke(R);var
Jb=this.hq(this.tickPlacement,this.tickLength);var
nb=Jb[0];var
mb=Eb+Jb[1];this.gM(ua,O,mb,nb);}if(k.oQ[this.minorTickPlacement]&&this.minorTickLength>0){var
ja=new
db.LineGroup(0,0,Fb,gb);qb.appendChild(ja);var
R=sb.valueOf(this.minorTickStroke);ja.setStroke(R);var
Jb=this.hq(this.minorTickPlacement,this.minorTickLength);var
nb=Jb[0];var
mb=Eb+Jb[1];var
fa=0;for(var
lb=0;lb<O.length;lb++){var
Aa=this.hc(O,lb);this.gM(ja,Aa,mb,nb);fa=O[lb];}if(fa<this.length){var
Aa=this.hc(O,O.length);this.gM(ja,Aa,mb,nb);}}var
Ya=this.NM(Eb);var
cb=this.getAxisTitle();if(cb!=null&&cb.getDisplay()!=jsx3.gui.Block.DISPLAYNONE){var
oa=Ya[5];var
Ga=this.horizontal&&this.primary||!this.horizontal&&!this.primary?0:-1;if(this.horizontal){var
Q=oa+Ga*cb.getPreferredHeight();cb.setDimensions(0,Q,this.length,cb.getPreferredHeight());}else{var
kb=oa+Ga*cb.getPreferredWidth();cb.setDimensions(kb,0,cb.getPreferredWidth(),this.length);}cb.updateView();qb.appendChild(cb.getCanvas());}if(this.showLabels){var
ob=this.bi();var
B=new
db.Group(0,0,Fb,gb);qb.appendChild(B);var
Mb=Ya[0];var
xa=Ya[1];var
Ga=Ya[2];this._jsxI6=null;for(var
lb=0;lb<ob.length;lb++){var
Ab=ob[lb];var
la=null;if(this.horizontal){var
aa=lb>0?(ob[lb-1]+ob[lb])/2:null;var
_=lb<ob.length-1?(ob[lb+1]+ob[lb])/2:null;if(_==null&&aa!=null)_=2*ob[lb]-aa;else if(aa==null&&_!=null)aa=2*ob[lb]-_;if(_==null){aa=ob[lb]-50;_=ob[lb]+50;}la=Math.round(_-aa);}else la=this.getDisplayWidth()-this.oT()-this.labelGap;if(this.horizontal){var
D=Math.round(Ab-la/2);var
jb=xa+Ga*Math.round(k.o4/2);this.Y3(B,D,jb,D+la,jb,this.pO(lb));}else{var
D=Ga==1?xa:xa-la;this.Y3(B,D,Ab,D+la,Ab,this.pO(lb));}}}};q.Y3=function(d,p,s,o,c,b){if(!(b&&(b.toString()).match(ub.t)))return;var
K=new
db.TextLine(p,s,o,c,b);K.setClassName(this.labelClass);K.setExtraStyles(this.labelStyle);K.setColor(this.labelColor);d.appendChild(K);};q.pO=function(j){var
X=this.Xj(j);var
xb=this.getLabelFunction();return xb!=null?xb.apply(this,[X]):X!=null?X.toString():ub.l;};q.oT=function(){var
Kb=this.tickPlacement==ub.b||this.tickPlacement==ub.c?this.tickLength:0;var
ja=this.minorTickPlacement==ub.b||this.minorTickPlacement==ub.c?this.minorTickLength:0;return Math.max(Kb,ja);};q.b7=function(c){if(c==null){c=this.getOpposingAxis();if(c==null)return 0;}if(c.mo())return c.getCoordinateFor(0);else if(this.primary)return this.horizontal?c.getLength():0;else return this.horizontal?0:c.getLength();};q.hq=function(m,o){var
La=0;if(m==ub.c){La=-1*o;o=o*2;}else{var
xa=0;if(this.horizontal)xa++;if(this.primary)xa++;if(m==ub.a)xa++;if(xa%2==1)La=-1*o;}return [o,La];};q.NM=function(o){var
ab=this.getOpposingAxis();if(o==null)o=this.b7(ab);var
_=0;if(this.horizontal)_=_|1;if(this.primary)_=_|2;if(this.labelPlacement==ub.f)_=_|4;else if(this.labelPlacement==ub.g)_=_|8;var
yb=k.Ap[_];var
K=0;var
u=0;if(this.tickPlacement==ub.b||this.tickPlacement==ub.c)K=this.tickLength;if(this.tickPlacement==ub.a||this.tickPlacement==ub.c)u=this.tickLength;if(this.minorTickPlacement==ub.b||this.minorTickPlacement==ub.c)K=Math.max(K,this.minorTickLength);if(this.minorTickPlacement==ub.a||this.minorTickPlacement==ub.c)u=Math.max(u,this.minorTickLength);var
v=null,ya=null,Ha=null;switch(yb){case k.mP:case k.PJ:ya=-1;v=-this.labelGap;v=v-Math.max(0,K-o);break;case k.Ou:case k.I8:ya=1;v=ab.getLength()+this.labelGap;v=v+Math.max(0,K+o-ab.getLength());break;case k.Wp:case k.XI:ya=-1;v=o-this.labelGap-K;break;case k.hA:case k.MY:ya=1;v=o+this.labelGap+K;break;default:ha.LOG.error(ub.u+yb);}if(this.showLabels){if(this.horizontal)Ha=v+ya*k.o4;else Ha=v+ya*this.getDisplayWidth();}else Ha=v;if(this.horizontal&&this.primary||!this.horizontal&&!this.primary){Ha=Math.max(Ha,ab.getLength());}else Ha=Math.min(Ha,0);return [yb,v,ya,K,u,Ha];};q.Ol=function(){var
ra=0,Bb=0;var
aa=this.getOpposingAxis();if(aa==null)return [0,0];var
F=this.b7(aa);var
w=this.NM(F);var
Wa=this.getAxisTitle();var
xb=w[1];var
ta=w[2];var
mb=w[3];var
za=w[4];if(this.showLabels)if(this.horizontal)xb=xb+ta*k.o4;else xb=xb+ta*this.getDisplayWidth();if(xb<0){ra=-xb;}else if(xb>aa.getLength())Bb=xb-aa.getLength();if(za>this.length-F)Bb=Math.max(Bb,za+this.length-F);if(mb>-F)ra=Math.max(ra,mb-F);if(Wa!=null&&Wa.getDisplay()!=jsx3.gui.Block.DISPLAYNONE)if(this.horizontal)Bb=Bb+Wa.getPreferredHeight();else ra=ra+Wa.getPreferredWidth();return [ra,Bb];};q.gM=function(o,r,f,p){if(this.horizontal){for(var
Ha=0;Ha<r.length;Ha++)o.addRelativeLine(r[Ha],f,0,p);}else for(var
Ha=0;Ha<r.length;Ha++)o.addRelativeLine(f,r[Ha],p,0);};q.bi=function(){return this.Hf();};q.hc=function(f,j){var
M=[];if(j==0){return [];}else if(j==f.length){return [];}else{var
Fb=f[j-1];var
H=f[j];for(var
ia=1;ia<this.minorTickDivisions;ia++)M.push(Math.round(Fb+ia/this.minorTickDivisions*(H-Fb)));}return M;};q.getAxisTitle=function(){return ha.ChartLabel?this.getFirstChildOfType(ha.ChartLabel):null;};q.getOpposingAxis=function(){var
tb=this.getChart();if(tb==null)return null;if(this.horizontal){if(this.primary){return tb.getPrimaryYAxis();}else return tb.getSecondaryYAxis();}else if(this.primary){return tb.getPrimaryXAxis();}else return tb.getSecondaryXAxis();};q.onSetChild=function(g){if((ha.ChartLabel&&g instanceof ha.ChartLabel)&&this.getAxisTitle()==null){g.setLabelRotation(this.horizontal?0:270);return true;}return false;};q.onSetParent=function(a){return ha.Chart&&a instanceof ha.Chart;};k.getVersion=function(){return ha.si;};});jsx3.require("jsx3.chart.ChartComponent","jsx3.chart.PointRenderer");jsx3.Class.defineClass("jsx3.chart.Legend",jsx3.chart.ChartComponent,null,function(n,q){var
ub={a:"10 10 10 4",b:"4 4 0 4",c:"_b",d:"",e:"left",f:"seriesId",g:"recordIndex",h:"jsxid"};var
L=jsx3.vector;var
Sa=jsx3.chart;n.DEFAULT_WIDTH=100;n.DEFAULT_HEIGHT=100;n.LE=1;n.nH=3;n.qx=2;n.SHOW_SERIES=1;n.SHOW_CATEGORIES=2;n.F1=8;n.wA=6;q.init=function(k){this.jsxsuper(k);this.boxHeight=10;this.lineHeight=22;this.labelClass=null;this.labelStyle=null;this.backgroundFill=null;this.backgroundStroke=null;this.preferredWidth=null;this.preferredHeight=null;this.setMargin(ub.a);this.setPadding(ub.b);};q.getBoxHeight=function(){return this.boxHeight;};q.setBoxHeight=function(h){this.boxHeight=h;};q.getLineHeight=function(){return this.lineHeight;};q.setLineHeight=function(h){this.lineHeight=h;};q.getLabelClass=function(){return this.labelClass;};q.setLabelClass=function(j){this.labelClass=j;};q.getLabelStyle=function(){return this.labelStyle;};q.setLabelStyle=function(f){this.labelStyle=f;};q.getBackgroundFill=function(){return this.backgroundFill;};q.setBackgroundFill=function(g){this.backgroundFill=g;};q.getBackgroundStroke=function(){return this.backgroundStroke;};q.setBackgroundStroke=function(k){this.backgroundStroke=k;};q.getPreferredWidth=function(){return this.preferredWidth!=null?this.preferredWidth:n.DEFAULT_WIDTH;};q.setPreferredWidth=function(m){this.preferredWidth=m;};q.getPreferredHeight=function(){return this.preferredHeight!=null?this.preferredHeight:n.DEFAULT_HEIGHT;};q.setPreferredHeight=function(h){this.preferredHeight=h;};q.updateView=function(){this.jsxsuper();var
Nb=this.getCanvas();this.th();var
Ba=this.getChart();var
Da=Ba.getLegendEntryType();var
nb=0;if(Da==1){nb=(Ba.Cl()).length;}else if(Da==2){var
Xa=Ba.bh();if(Xa!=null)nb=Xa.length;}var
wa=this.getLegendTitle();var
Ha=wa!=null&&wa.getDisplay()!=jsx3.gui.Block.DISPLAYNONE?wa.getPreferredHeight()+n.F1:0;var
Va=jsx3.html.BlockTag.po(this.getMargin());var
y=jsx3.html.BlockTag.po(this.getPadding());var
ka=this.getWidth()-Va[1]-Va[3];var
aa=Math.min(this.getHeight()-Va[0]-Va[2],Ha+this.lineHeight*nb+y[0]+y[2]);var
A=Va[3];var
U=Math.max(Va[0],Math.round((this.getHeight()-aa)/2));var
Ua=new
L.Group(A,U,ka,aa);Nb.appendChild(Ua);Ua.setZIndex(n.qx);if(this.backgroundFill||this.backgroundStroke)if(nb>0||wa!=null&&wa.getDisplay()!=jsx3.gui.Block.DISPLAYNONE){var
ya=new
L.Rectangle(A,U,ka,aa);ya.setZIndex(n.LE);Nb.appendChild(ya);var
ab=L.Fill.valueOf(this.backgroundFill);var
Lb=L.Stroke.valueOf(this.backgroundStroke);ya.setFill(ab);ya.setStroke(Lb);}var
ia=U+y[0];var
da=ka-y[1]-y[3];if(wa!=null&&wa.getDisplay()!=jsx3.gui.Block.DISPLAYNONE){wa.setDimensions(A+y[3],ia,da,wa.getPreferredHeight());wa.setZIndex(n.nH);wa.updateView();Nb.appendChild(wa.getCanvas());ia=ia+Ha;}ia=ia-U;var
O=A+y[3]+this.boxHeight+n.wA;var
ra=da-this.boxHeight-n.wA;if(Da==1&&nb>0){var
ob=Ba.Cl();for(var
Ib=0;Ib<ob.length;Ib++){ob[Ib].applyDynamicProperties();var
ea=ob[Ib].getLegendRenderer();var
E=A+y[3];var
ab=ob[Ib].bo();var
Lb=ob[Ib].ql(ab);var
Z=ea.render(E,ia,E+this.boxHeight,ia+this.boxHeight,ab,Lb);Z.setId(this.getId()+ub.c+Ib);Ua.appendChild(Z);var
hb=this.ZM(Ua,ob[Ib].getSeriesName(),this.labelClass,this.labelStyle,O,Math.round(ia+this.boxHeight/2),ra);ia=ia+this.lineHeight;this.th(Z,ob[Ib],null);this.th(hb,ob[Ib],null);}}else if(Da==2&&nb>0){var
Xa=Ba.bh();var
ea=Sa.PointRenderer.BOX;var
Lb=L.Stroke.valueOf(Ba.getSeriesStroke());for(var
Ib=0;Ib<Xa.length;Ib++){var
E=A+y[3];var
ab=Ba.hd(Xa[Ib],Ib);var
ja=Lb==null&&ab.Kk()?new
L.Stroke(ab.getColor()):Lb;var
Z=ea.render(E,ia,E+this.boxHeight,ia+this.boxHeight,ab,ja);Z.setId(this.getId()+ub.c+Ib);Ua.appendChild(Z);var
x=Ba.getCategoryField();var
Ra=x?Xa[Ib].getAttribute(x):ub.d;var
hb=this.ZM(Ua,Ra,this.labelClass,this.labelStyle,O,Math.round(ia+this.boxHeight/2),ra);ia=ia+this.lineHeight;this.th(Z,null,Ib);this.th(hb,null,Ib);}}};q.ZM=function(r,d,b,h,c,f,o){var
db=new
L.TextLine(c,f,o,f,d);db.setClassName(b);db.setExtraStyles(h);if(!db.getTextAlign())db.setTextAlign(ub.e);r.appendChild(db);return db;};q.getLegendTitle=function(){return Sa.ChartLabel?this.getFirstChildOfType(Sa.ChartLabel):null;};q.onSetChild=function(o){return (Sa.ChartLabel&&o instanceof Sa.ChartLabel)&&this.getLegendTitle()==null;};q.onSetParent=function(f){return Sa.Chart&&f instanceof Sa.Chart;};n.getVersion=function(){return Sa.si;};q.th=function(i,c,a){if(i==null)i=this.getCanvas();if(c!=null)i.setProperty(ub.f,c.getId());if(a!=null)i.setProperty(ub.g,a);this.jsxsuper(i);};q.qh=function(l,a){var
pb=a.getAttribute(ub.f);var
v=a.getAttribute(ub.g);this.doEvent(jsx3.gui.Interactive.SELECT,this.N8(l,pb,v));};q.Bg=function(j,c){var
H=c.getAttribute(ub.f);var
C=c.getAttribute(ub.g);this.doEvent(jsx3.gui.Interactive.EXECUTE,this.N8(j,H,C));};q.doSpyOver=function(p,i){var
mb=i.getAttribute(ub.f);var
Na=i.getAttribute(ub.g);this.jsxsupermix(p,i,this.N8(p,mb,Na));};q.eo=function(d,i){var
Db=i.getAttribute(ub.f);var
Ab=i.getAttribute(ub.g);var
La;if(d.rightButton()&&(La=this.getMenu())!=null){var
H=(this.getServer()).getJSXByName(La);if(H!=null){var
Pa=this.N8(d,Db,Ab);Pa.objMENU=H;var
Za=this.doEvent(jsx3.gui.Interactive.MENU,Pa);if(Za!==false){if(Za instanceof Object&&Za.objMENU instanceof jsx3.gui.Menu)H=Za.objMENU;H.showContextMenu(d,this);}}}};q.N8=function(c,b,f){var
Z={objEVENT:c};Z.objSERIES=b!=null?(this.getServer()).getJSXById(b):null;if(f!=null){Z.intINDEX=f;var
sb=((this.getChart()).bh())[f];Z.strRECORDID=sb?sb.getAttribute(ub.h):null;}else Z.intINDEX=Z.strRECORDID=null;return Z;};});jsx3.require("jsx3.chart.ChartComponent");jsx3.Class.defineClass("jsx3.chart.Series",jsx3.chart.ChartComponent,null,function(m,p){var
ub={a:"tooltipFunction",b:"colorFunction",c:"strRecordId",d:"recordIndex"};var
da=jsx3.gui.Interactive;var
Ab=jsx3.vector;var
T=jsx3.chart;p.init=function(r,n){this.jsxsuper(r);this.seriesName=n;this.usePrimaryX=jsx3.Boolean.TRUE;this.usePrimaryY=jsx3.Boolean.TRUE;this.stroke=null;this.fill=null;this.fillGradient=null;this.tooltipFunction=null;};p.getSeriesName=function(){return this.seriesName;};p.setSeriesName=function(b){this.seriesName=b;};p.getUsePrimaryX=function(){return this.usePrimaryX;};p.setUsePrimaryX=function(l){this.usePrimaryX=l;};p.getUsePrimaryY=function(){return this.usePrimaryY;};p.setUsePrimaryY=function(d){this.usePrimaryY=d;};p.setTooltipFunction=function(a){T.Wk(this,ub.a,a);};p.getTooltipFunction=function(){return T.vc(this,ub.a);};p.getIndex=function(){var
w=this.getChart();return w!=null?w.getSeriesIndex(this):-1;};p.getStroke=function(){return this.stroke;};p.setStroke=function(s){this.stroke=s;};p.getFill=function(){return this.fill;};p.setFill=function(c){this.fill=c;};p.getFillGradient=function(){return this.fillGradient;};p.setFillGradient=function(k){this.fillGradient=k;};p.getXAxis=function(){var
qa=this.getChart();if(qa!=null)return this.usePrimaryX?qa.getPrimaryXAxis():qa.getSecondaryXAxis();return null;};p.getYAxis=function(){var
Ua=this.getChart();if(Ua!=null)return this.usePrimaryY?Ua.getPrimaryYAxis():Ua.getSecondaryYAxis();return null;};p.ic=function(){var
Lb=Math.max(this.getIndex(),0)%T.Chart.DEFAULT_FILLS.length;return T.Chart.DEFAULT_FILLS[Lb];};p.gd=function(){var
vb=Math.max(this.getIndex(),0)%T.Chart.DEFAULT_FILLS.length;if(T.Chart.DEFAULT_STROKES[vb]==null){var
D=this.ic();T.Chart.DEFAULT_STROKES[vb]=new
Ab.Stroke(D.getColor(),1,D.getAlpha());}return T.Chart.DEFAULT_STROKES[vb];};p.bo=function(){var
xb=this.fill?Ab.Fill.valueOf(this.fill):this.ic();if(xb!=null)xb=T.addGradient(xb,this.fillGradient);return xb;};p.ql=function(d){if(this.stroke){return Ab.Stroke.valueOf(this.stroke);}else if(this.getColorFunction()!=null){return null;}else if(d!=null&&d.Kk()){return new
Ab.Stroke(d.getColor());}else if(!this.fill)return this.gd(d);else return null;};p.getColorFunction=function(){return T.vc(this,ub.b);};p.setColorFunction=function(o){T.Wk(this,ub.b,o);};p.getLegendRenderer=function(){return T.PointRenderer.BOX;};p.getLabel=function(){return T.ChartLabel?this.getFirstChildOfType(T.ChartLabel):null;};p.onSetChild=function(b){return (T.ChartLabel&&b instanceof T.ChartLabel)&&this.getLabel()==null;};p.onSetParent=function(s){return T.Chart&&s instanceof T.Chart;};p.th=function(a,i,h){if(a==null)a=this.getCanvas();if(h!=null)a.setProperty(ub.c,h);if(i!=null)a.setProperty(ub.d,i);this.jsxsuper(a);};p.qh=function(d,i){var
Aa=i.getAttribute(ub.d);var
yb=i.getAttribute(ub.c);this.doEvent(jsx3.gui.Interactive.SELECT,{objEVENT:d,intINDEX:Aa,strRECORDID:yb});};p.Bg=function(c,j){var
L=j.getAttribute(ub.d);var
jb=j.getAttribute(ub.c);this.doEvent(jsx3.gui.Interactive.EXECUTE,{objEVENT:c,intINDEX:L,strRECORDID:jb});};p.doSpyOver=function(h,e){var
ka=e.getAttribute(ub.d);var
sb=e.getAttribute(ub.c);this.jsxsupermix(h,e,{objEVENT:h,intINDEX:ka,strRECORDID:sb});};p.eo=function(s,j){var
V=j.getAttribute(ub.d);var
bb=j.getAttribute(ub.c);var
U;if(s.rightButton()&&(U=this.getMenu())!=null){var
mb=(this.getServer()).getJSXByName(U);if(mb!=null){var
Cb={objEVENT:s,objMENU:mb,intINDEX:V,strRECORDID:bb};var
u=this.doEvent(da.MENU,Cb);if(u!==false){if(u instanceof Object&&u.objMENU instanceof jsx3.gui.Menu)mb=u.objMENU;mb.showContextMenu(s,this,V);}}}};m.getVersion=function(){return T.si;};});jsx3.require("jsx3.vector.Block","jsx3.xml.Cacheable","jsx3.chart.Series");jsx3.Class.defineClass("jsx3.chart.Chart",jsx3.vector.Block,[jsx3.xml.Cacheable,jsx3.xml.CDF],function(d,f){var
ub={a:"top",b:"right",c:"#999999",d:"titlePlacement",e:"legendPlacement",f:"/data/record",g:"_jsxdp",h:"series",i:"jsx3.chart.Legend",j:"can't add legend ",k:" because chart already has a legend",l:"can't add title ",m:" because chart already has a title",n:"can't add series ",o:" because it isn't of valid type for "};var
_=jsx3.vector;var
lb=_.Fill;var
M=jsx3.chart;d.g9=1;d.N3=2;d.ZINDEX_DATA=10;d.YF=990;d.hC=1000;d.Dy=20;d.DEFAULT_FILLS=[new
lb(3381708,1),new
lb(16763904,1),new
lb(10079334,1),new
lb(13408563,1),new
lb(13421772,1),new
lb(13382502,1),new
lb(16751103,1),new
lb(6710886,1)];d.DEFAULT_STROKES=[];d.PART_LEGEND=1<<0;d.eF={top:1,right:1,bottom:1,left:1};f.init=function(a,e,h,o,i){this.jsxsuper(a);this.setDimensions(e,h,o,i);this.titlePlacement=ub.a;this.legendPlacement=ub.b;this.dataPadding=10;this.borderColor=ub.c;this.borderWidth=1;this.borderAlpha=1;this.alpha=1;this.setRelativePosition(jsx3.gui.Block.RELATIVE);};f.getTitlePlacement=function(){return this.titlePlacement;};f.setTitlePlacement=function(r){if(d.eF[r]){this.titlePlacement=r;}else throw new
jsx3.IllegalArgumentException(ub.d,r);};f.getLegendPlacement=function(){return this.legendPlacement;};f.setLegendPlacement=function(l){if(d.eF[l]){this.legendPlacement=l;}else throw new
jsx3.IllegalArgumentException(ub.e,l);};f.getDataPadding=function(){return this.dataPadding;};f.setDataPadding=function(a){this.dataPadding=a;};f.getBorderColor=function(){return this.borderColor;};f.setBorderColor=function(l){this.borderColor=l;};f.getBorderWidth=function(){return this.borderWidth;};f.setBorderWidth=function(h){this.borderWidth=h;};f.getBorderAlpha=function(){return this.borderAlpha;};f.setBorderAlpha=function(m){this.borderAlpha=m;};f.getAlpha=function(){return this.alpha;};f.setAlpha=function(o){this.alpha=o!=null?_.ed(o):null;};f.Si=function(){return this._jsxdc;};f.bh=function(){return this._jsxdp;};f.Pw=function(e){if(e!=null){this._jsxdp=(e.selectNodes(ub.f)).toArray();}else delete this[ub.g];};f.getSeries=function(){return this.getDescendantsOfType(M.Series);};f.Cl=function(){return this.findDescendants(function(s){return s instanceof M.Series&&s.getDisplay()!=jsx3.gui.Block.DISPLAYNONE;},false,true,false,false);};f.getSeriesIndex=function(o){var
Ca=this.getSeries();for(var
Cb=0;Cb<Ca.length;Cb++)if(o==Ca[Cb])return Cb;return -1;};f.getChartTitle=function(){return M.ChartLabel?this.getFirstChildOfType(M.ChartLabel):null;};f.getLegend=function(){return M.Legend?this.getFirstChildOfType(M.Legend):null;};f.pd=function(){return false;};f.tc=jsx3.Method.newAbstract(ub.h);f.getLegendEntryType=function(){jsx3.require(ub.i);return 1;};f.Oi=function(q,h){var
bb=this.bh();if(bb==null)return null;var
Ka=new
Array(bb.length);for(var
ga=0;ga<bb.length;ga++){Ka[ga]=0;for(var
fb=0;fb<q.length;fb++){var
oa=q[fb][h](bb[ga]);if(oa!=null)Ka[ga]+=Math.abs(oa);}}return Ka;};f.ak=function(o,j,h){var
P=this.bh();if(P==null)return null;var
E=new
Array(o.length);for(var
za=0;za<o.length;za++){E[za]=0;for(var
hb=0;hb<P.length;hb++){var
ob=o[za][j](P[hb]);if(ob!=null&&(ob>=0||!h))E[za]+=Math.abs(ob);}}return E;};f.createCanvas=function(){return new
jsx3.vector.Canvas();};f.createVector=function(){var
ua=this.jsxsuper();var
pb=ua.getLeft();var
sb=ua.getTop();var
Ma=ua.getWidth();var
zb=ua.getHeight();var
W=this.getXML();this.Pw(W);var
Mb=new
_.Rectangle(0,0,Ma,zb);ua.appendChild(Mb);Mb.setZIndex(d.g9);M.Yh(this,Mb);M._h(this,Mb);var
Ab=jsx3.html.BlockTag.po(this.getPadding());var
Pa=this.borderWidth!=null?this.borderWidth:1;Ma=Ma-Ab[1]-Ab[3]-2*Pa;zb=zb-Ab[0]-Ab[2]-2*Pa;var
ra=new
_.Group(Ab[3]+Pa,Ab[0]+Pa,Ma,zb);ua.appendChild(ra);ra.setZIndex(d.N3);var
L=this.getChartTitle();if(L!=null&&L.getDisplay()!=jsx3.gui.Block.DISPLAYNONE){var
vb=M.splitBox(0,0,Ma,zb,this.titlePlacement,L.getPreferredWidth(),L.getPreferredHeight());L.setDimensions(vb[0][0],vb[0][1],vb[0][2],vb[0][3]);L.setZIndex(d.hC);L.updateView();ra.appendChild(L.getCanvas());sb=vb[1][0];pb=vb[1][1];Ma=vb[1][2];zb=vb[1][3];}else{sb=0;pb=0;}var
G=new
_.Group();this._jsxdc=G;ra.appendChild(G);var
U=this.getLegend();if(U!=null&&U.getDisplay()!=jsx3.gui.Block.DISPLAYNONE){var
vb=M.splitBox(sb,pb,Ma,zb,this.legendPlacement,U.getPreferredWidth(),U.getPreferredHeight());U.setDimensions(vb[0][0],vb[0][1],vb[0][2],vb[0][3]);U.setZIndex(d.YF);U.updateView();ra.appendChild(U.getCanvas());G.setDimensions(vb[1][0],vb[1][1],vb[1][2],vb[1][3]);}else G.setDimensions(sb,pb,Ma,zb);var
mb=jsx3.html.BlockTag.po(this.dataPadding);var
Ra=G.getDimensions();G.setDimensions(Ra[0]+mb[3],Ra[1]+mb[0],Ra[2]-mb[1]-mb[3],Ra[3]-mb[0]-mb[2]);M.th(this);var
u=this.Cl();for(var
za=0;za<u.length;za++){var
Ba=this.pd()?u.length-za:za;u[za].setZIndex(d.Dy+Ba);}return ua;};f.updateVector=function(q){return false;};f.repaintParts=function(a){if(a&d.PART_LEGEND){var
xb=this.getLegend();if(xb!=null)xb.repaint();}};f.onSetChild=function(n){if(M.Legend&&n instanceof M.Legend){if(this.getLegend()!=null){M.LOG.info(ub.j+n+ub.k);return false;}}else if(M.ChartLabel&&n instanceof M.ChartLabel){if(this.getChartTitle()!=null){M.LOG.info(ub.l+n+ub.m);return false;}}else if(M.Series&&n instanceof M.Series){if(!this.tc(n)){M.LOG.info(ub.n+n+ub.o+this);return false;}}else return false;return true;};f.redrawRecord=function(){this.repaint();};f.onXmlBinding=function(j){this.jsxsupermix(j);this.repaint();};d.getVersion=function(){return M.si;};});jsx3.require("jsx3.chart.Chart","jsx3.chart.Axis","jsx3.chart.GridLines");jsx3.Class.defineClass("jsx3.chart.CartesianChart",jsx3.chart.Chart,null,function(g,b){var
ub={a:"series",b:"no data provider for chart: "};var
va=jsx3.chart;var
Za=va.Chart;var
Ta=va.GridLines;var
qa=va.Axis;g.oz=function(k){return k instanceof qa&&k.ui()&&k.getHorizontal();};g.Sv=function(e){return e instanceof qa&&!e.ui()&&e.getHorizontal();};g.TM=function(l){return l instanceof qa&&l.ui()&&!l.getHorizontal();};g.PE=function(q){return q instanceof qa&&!q.ui()&&!q.getHorizontal();};g.Yt=Za.ZINDEX_DATA+1;g.pU=Za.ZINDEX_DATA+90;g.PT=Za.ZINDEX_DATA+100;g.PART_GRIDLINES=1<<8;b.init=function(l,p,s,d,a){this.jsxsuper(l,p,s,d,a);};b.getGridLines=function(){return Ta?this.getDescendantsOfType(Ta):[];};b.Xh=function(h,q){var
v=[];var
gb=q?this.Cl():this.getSeries();for(var
F=0;F<gb.length;F++)if(h.getHorizontal()&&h.ui()==gb[F].getUsePrimaryX()||!h.getHorizontal()&&h.ui()==gb[F].getUsePrimaryY())v.push(gb[F]);return v;};b.getPrimaryXAxis=function(){return this.findDescendants(g.oz,false,false,true);};b.getSecondaryXAxis=function(){return this.findDescendants(g.Sv,false,false,true);};b.getPrimaryYAxis=function(){return this.findDescendants(g.TM,false,false,true);};b.getSecondaryYAxis=function(){return this.findDescendants(g.PE,false,false,true);};b.getRangeForAxis=function(c){var
Ka=this.Xh(c,true);return c.getHorizontal()?this.getXRange(Ka):this.getYRange(Ka);};b.getXRange=jsx3.Method.newAbstract(ub.a);b.getYRange=jsx3.Method.newAbstract(ub.a);b.getRangeForField=function(a,r){var
Hb=this.bh();if(Hb==null){va.LOG.debug(ub.b+this);return null;}var
db=Number.NEGATIVE_INFINITY;var
wa=Number.POSITIVE_INFINITY;for(var
aa=0;aa<Hb.length;aa++){var
u=Hb[aa];for(var
Ya=0;Ya<a.length;Ya++){var
w=a[Ya];var
Oa=w[r](u);if(Oa!=null){wa=Math.min(wa,Oa);db=Math.max(db,Oa);}}}if(db==Number.NEGATIVE_INFINITY||wa==Number.POSITIVE_INFINITY)return null;return [wa,db];};b.getStackedRangeForField=function(s,f){var
V=this.bh();if(V==null){va.LOG.debug(ub.b+this);return null;}var
E=Number.NEGATIVE_INFINITY;var
D=Number.POSITIVE_INFINITY;for(var
Z=0;Z<V.length;Z++){var
Eb=V[Z];var
ab=0,La=0;for(var
ra=0;ra<s.length;ra++){var
ya=s[ra];var
B=ya[f](Eb);if(B==null)continue;if(B>=0)ab=ab+B;else La=La+B;}D=Math.min(D,La);E=Math.max(E,ab);}if(E==Number.NEGATIVE_INFINITY||D==Number.POSITIVE_INFINITY)return null;return [D,E];};b.getStacked100RangeForField=function(q,h){var
za=this.bh();if(za==null){va.LOG.debug(ub.b+this);return null;}var
Pa=Number.NEGATIVE_INFINITY;var
Ba=Number.POSITIVE_INFINITY;for(var
jb=0;jb<za.length;jb++){var
ta=za[jb];var
xa=0,ha=0,Ua=0;for(var
B=0;B<q.length;B++){var
sa=q[B];var
La=sa[h](ta);if(La==null)continue;Ua=Ua+Math.abs(La);if(La>=0)xa=xa+La;else ha=ha+La;}var
ab=Ua==0?0:100*ha/Ua;var
yb=Ua==0?0:100*xa/Ua;Ba=Math.min(Ba,ab);Pa=Math.max(Pa,yb);}if(Pa==Number.NEGATIVE_INFINITY||Ba==Number.POSITIVE_INFINITY)return null;return [Ba,Pa];};b.getCombinedRange=function(h){var
eb=Number.NEGATIVE_INFINITY;var
ob=Number.POSITIVE_INFINITY;for(var
Ja=0;Ja<h.length;Ja++)if(h[Ja]!=null){ob=Math.min(ob,h[Ja][0]);eb=Math.max(eb,h[Ja][1]);}if(eb==Number.NEGATIVE_INFINITY||ob==Number.POSITIVE_INFINITY)return null;return [ob,eb];};b.createVector=function(){this.jsxsuper();var
Nb=this.Si();var
X=this.getPrimaryXAxis();var
Ya=this.getPrimaryYAxis();var
V=this.getSecondaryXAxis();var
F=this.getSecondaryYAxis();var
Na=Nb.getWidth();var
Oa=Nb.getHeight();var
S=Nb.getPaddingDimensions();var
D=null;for(var
ja=1;ja<=2;ja++){var
Mb=null;if(ja==1){Mb=[V!=null?V.getDisplayWidth():0,F!=null?F.getDisplayWidth():0,X!=null?X.getDisplayWidth():0,Ya!=null?Ya.getDisplayWidth():0];}else Mb=this.ZS(V,F,X,Ya);D=[S[3]+Mb[3],S[0]+Mb[0],Na-(S[3]+Mb[3]+S[1]+Mb[1]),Oa-(S[0]+Mb[0]+S[2]+Mb[2])];this.bR(X,D[2]);this.bR(Ya,D[3]);this.bR(V,D[2]);this.bR(F,D[3]);}var
ba=this.getGridLines();for(var
ja=0;ja<ba.length;ja++){var
Hb=ba[ja];if(Hb.getDisplay()==jsx3.gui.Block.DISPLAYNONE)continue;Hb.setDimensions(D);Hb.setZIndex(Hb.getInForeground()?g.pU:g.Yt);Hb.updateView();Nb.appendChild(Hb.getCanvas());}this.z3(X,D[0],D[1]);this.z3(Ya,D[0],D[1]);this.z3(V,D[0],D[1]);this.z3(F,D[0],D[1]);var
E=this.Cl();for(var
ja=0;ja<E.length;ja++)E[ja].setDimensions(D);};b.bR=function(l,k){if(l!=null){l.setLength(k);l.fl();}};b.z3=function(q,i,j){var
kb=this.Si();if(q!=null){q.setDimensions(i,j,kb.getWidth(),kb.getHeight());q.setZIndex(g.PT);q.updateView();kb.appendChild(q.getCanvas());}};b.ZS=function(e,q,k,r){var
da=0,bb=0,ca=0,za=0;if(e!=null){var
oa=e.Ol();bb=oa[1];za=oa[0];}if(q!=null){var
oa=q.Ol();ca=ca+oa[0];da=da+oa[1];}if(k!=null){var
oa=k.Ol();za=Math.max(za,oa[1]);bb=Math.max(bb,oa[0]);}if(r!=null){var
oa=r.Ol();da=Math.max(da,oa[0]);ca=Math.max(ca,oa[1]);}return [bb,ca,za,da];};b.repaintParts=function(m){if(m&g.PART_GRIDLINES){var
Ja=this.getGridLines();for(var
pa=0;pa<Ja.length;pa++){var
S=Ja[pa];if(S.getDisplay()==jsx3.gui.Block.DISPLAYNONE)continue;S.setZIndex(S.getInForeground()?g.pU:g.Yt);S.repaint();}}this.jsxsuper(m);};b.onSetChild=function(a){if(Ta&&a instanceof Ta){return true;}else if(qa&&a instanceof qa){return true;}else return this.jsxsuper(a);};g.getVersion=function(){return va.si;};});