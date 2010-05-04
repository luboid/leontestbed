/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Splitter",jsx3.gui.Block,null,function(m,f){var
ub={A:"_doResizeEnd",B:"z-index",C:"jsxsubcontainer1pct",D:",",E:/\s*,\s*/g,F:"*",G:"*,",H:",*",I:"Error setting container 1 as an integer: Name contains an errant comma: ",J:"jsxafterresize",K:"Error: Name contains an errant comma: ",L:"50%",M:"number",N:"%",O:"49.999%",P:/background-image\s*:\s*url\(/,Q:"background-image:url(",R:");",S:"3.0.00",a:"jsx:///images/splitter/v.gif",b:"jsx:///images/splitter/h.gif",c:"#2050df",d:"#c8c8d5",e:"#ffffff",f:"_",g:"100%",h:"",i:"JSXFRAG",j:"default",k:"box",l:"div",m:"mousedown",n:"doBeginMove",o:' id="',p:'" class="jsx30splitter"',q:' class="jsx30splitter_',r:"h",s:"v",t:'bar"',u:"cursor:default;",v:"&#160;",w:"background-color:",x:";",y:"jsxbeforeresize",z:"mouseup"};var
W=jsx3.gui.Event;var
Q=jsx3.gui.Interactive;m.ORIENTATIONH=0;m.ORIENTATIONV=1;m.w7=ub.a;m.SK=ub.b;jsx3.html.loadImages(m.w7,m.SK);m._5=ub.c;m.rv=ub.d;m.t3=ub.e;f.init=function(i,s){this.jsxsuper(i);if(s!=null)this.setOrientation(s);for(var
X=1;X<=2;X++){var
wa=new
jsx3.gui.Block(i+ub.f+X,null,null,ub.g,ub.g,ub.h);wa.setRelativePosition(1);wa.setBackgroundColor(m.t3);this.setChild(wa,1,null,ub.i);}};f.paintChild=function(e,q){if(!q)this.repaint();};f.setEnabled=function(j){if(this.jsxenabled!=j){this.jsxenabled=j;var
xa=this.getRendered();if(xa)xa.firstChild.style.cursor=this._isEnabled()?ub.h:ub.j;}};f.getEnabled=function(){return this.jsxenabled;};f._isEnabled=function(){return this.jsxenabled!==0&&this.jsxenabled!==false;};f.ng=function(j){var
bb=j.getChildIndex();var
x=this.Gi(bb);if(x)return x;var
Pa=(this.getParent()).ng(this);var
Ja=Pa.parentwidth;var
D=Pa.parentheight;var
ma=this.ep();var
La=this.getOrientation()==0;var
Gb=La?Ja:D;var
Z=this.getSubcontainer1Min();var
eb=this.getSubcontainer2Min();var
Ya=Math.round(Gb*ma);if(Ya<Z||Z+eb>Gb)Ya=Z;else if(Gb-Ya<eb)Ya=Gb-eb;var
y,Ra=0;if(bb==0){y=Ya;}else{Ra=Ya+8;y=Gb-Ra;}var
Db,db,oa,rb;if(La){Db=Ra;db=0;oa=y;rb=D;}else{Db=0;db=Ra;oa=Ja;rb=y;}return this.Ck(bb,{boxtype:ub.k,tagname:ub.l,left:Db,top:db,width:oa,height:rb,parentwidth:oa,parentheight:rb});};f.Rc=function(c,s,o){var
ea=this.Wl(true,c);if(s){ea.recalculate(c,s,o);var
bb=this.getOrientation()==0;var
L=this.getChildren();var
Z=Math.min(2,L.length);var
Pa=0;var
Mb,P;for(var
va=0;va<Z;va++){var
la=this.ng(L[va]);if(va==1){var
ka=ea.lg(0);if(bb){ka.recalculate({left:Pa,parentheight:P},s?s.childNodes[0]:null,o);}else ka.recalculate({top:Pa,parentwidth:Mb},s?s.childNodes[0]:null,o);}o.add(L[va],la,s?s.childNodes[va+1]:null,true);Mb=la.width;P=la.height;Pa=bb?Mb:P;}}};f.Vm=function(c){this.applyDynamicProperties();if(this.getParent()&&(c==null||!isNaN(c.parentwidth)&&!isNaN(c.parentheight)||!isNaN(c.width)&&!isNaN(c.height))){c=(this.getParent()).ng(this);}else if(c==null)c={};var
E=this.getRelativePosition()!=0;if(c.left==null||!E&&!jsx3.util.strEmpty(this.getLeft()))c.left=this.getLeft();if(c.top==null||!E&&!jsx3.util.strEmpty(this.getTop()))c.top=this.getTop();if(c.width==null)c.width=ub.g;if(c.height==null)c.height=ub.g;c.tagname=ub.l;if(!c.boxtype)c.boxtype=ub.k;var
cb=new
jsx3.gui.Painted.Box(c);var
Kb={};Kb.tagname=ub.l;Kb.boxtype=ub.k;var
sa=this.ep();Kb.parentwidth=cb.Nd();Kb.parentheight=cb.Qi();var
Na=this.ng(this.getChild(0));var
Za=this.getOrientation()==0?Na.width:Na.height;if(this.getOrientation()==0){Kb.left=Za;Kb.top=0;Kb.width=8;Kb.height=ub.g;}else{Kb.left=0;Kb.top=Za;Kb.width=ub.g;Kb.height=8;}var
ja=new
jsx3.gui.Painted.Box(Kb);cb.bl(ja);return cb;};f.paint=function(){this.applyDynamicProperties();var
ma=this.pi(ub.m,ub.n,1);var
K=this.renderAttributes(null,true);var
vb=this.Wl(true);vb.setAttributes(this.uj()+this.Rh()+ub.o+this.getId()+ub.p+this.di()+K);vb.setStyles(this.Uc()+this.qg()+this.Ne()+this.Ae());var
rb=vb.lg(0);rb.setAttributes(ma+ub.q+(this.getOrientation()==0?ub.r:ub.s)+ub.t);var
Da=this._isEnabled()?ub.h:ub.u;rb.setStyles(Da+this.Uc()+(this.getOrientation()==0?this.ez():this.Ko()));var
jb,fa;if((jb=this.getChild(0))!=null)jb.Wc(this.ng(jb));if((fa=this.getChild(1))!=null)fa.Wc(this.ng(fa));return (vb.paint()).join((rb.paint()).join(ub.v)+this.paintChildren());};f.Uc=function(){return ub.w+(this.getBackgroundColor()?this.getBackgroundColor():m.rv)+ub.x;};f.doBeginMove=function(e,h){if(!e.leftButton()||!this._isEnabled())return;if(this.doEvent(ub.y,{objEVENT:e,objGUI:h})===false)return;h.style.backgroundColor=m._5;this.focus();this._jsxmoving=true;if(this.getOrientation()==0){jsx3.EventHelp.constrainY=true;}else jsx3.EventHelp.constrainX=true;this.jsxsupermix(e,h);W.subscribe(ub.z,this,ub.A);};f._doResizeEnd=function(p){p=p.event;var
_a=(this.getRendered(p)).childNodes[0];W.unsubscribe(ub.z,this,ub.A);if(!this._jsxmoving)return;this._jsxmoving=false;p.releaseCapture(_a);var
Xa=this.getBackgroundColor();_a.style.backgroundColor=Xa==-1?ub.h:Xa||m.rv;var
Ka,Nb;if(this.getOrientation()==0){Ka=parseInt(_a.style.left);Nb=_a.parentNode.offsetWidth;}else{Ka=parseInt(_a.style.top);Nb=_a.parentNode.offsetHeight;}jsx3.html.removeStyle(_a,ub.B);var
sb=this.getSubcontainer1Min();var
Ua=this.getSubcontainer2Min();if(Ka<sb)Ka=sb;else if(Nb-Ka<Ua)Ka=Nb-Ua;var
Na=this.Wl();if(Na)(Na.lg(0)).reset();this.setDynamicProperty(ub.C,null);var
L=this.getSubcontainer1Pct();var
nb=Ka/Nb*100;if(L.indexOf(ub.D)>-1){var
Ta=L.split(ub.E);if(Ta.length==2){nb=Ta[0]==ub.F?ub.G+(Nb-Ka):Ka+ub.H;}else jsx3.log(ub.I+L);}this.setSubcontainer1Pct(nb,true);this.doEvent(ub.J,{objEVENT:p,objGUI:_a,fpPCT1:nb,_gipp:1});};f.ep=function(){var
_=this.getSubcontainer1Pct();var
ka;if(_.indexOf(ub.D)>-1){var
Ma=_.split(ub.E);if(Ma.length==2){var
db=(this.getParent()).ng(this);var
rb=this.getOrientation()==0?db.parentwidth:db.parentheight;ka=Ma[0]==ub.F?(rb-Ma[1])/rb:Ma[0]/rb;}else{jsx3.log(ub.K+_);ka=0.5;}}else ka=parseFloat(_)/100;return ka;};f.getSubcontainer1Pct=function(){return this.jsxsubcontainer1pct==null?ub.L:this.jsxsubcontainer1pct;};f.setSubcontainer1Pct=function(b,h){if(typeof b==ub.M)b=b+ub.N;this.jsxsubcontainer1pct=b;if(h){var
N=this.getRendered();if(N!=null)this.ge({parentwidth:N.offsetWidth,parentheight:N.offsetHeight},N);}return this;};f.getSubcontainer2Pct=function(){return this.jsxsubcontainer2pct==null?ub.O:this.jsxsubcontainer2pct;};f.setSubcontainer2Pct=function(d){this.jsxsubcontainer2pct=d;return this;};f.getSubcontainer1Min=function(){return this.jsxsubcontainer1min==null?1:this.jsxsubcontainer1min;};f.setSubcontainer1Min=function(s){this.jsxsubcontainer1min=s;return this;};f.getSubcontainer2Min=function(){return this.jsxsubcontainer2min==null?8:this.jsxsubcontainer2min;};f.setSubcontainer2Min=function(e){this.jsxsubcontainer2min=e;return this;};f.getOrientation=function(){return this.jsxorientation==null?0:this.jsxorientation;};f.setOrientation=function(k){this.jsxorientation=k;this.ce();return this;};f.getVSplitImage=function(){return this.jsxvsplitimage==null?m.w7:this.jsxvsplitimage;};f.setVSplitImage=function(q){this.jsxvsplitimage=q;return this;};f.getHSplitImage=function(){return this.jsxhsplitimage==null?m.SK:this.jsxhsplitimage;};f.setHSplitImage=function(h){this.jsxhsplitimage=h;return this;};f.Ko=function(){var
G=this.getVSplitImage();return G.search(ub.P)!=-1?G:ub.Q+jsx3.resolveURI(G)+ub.R;};f.ez=function(){var
Ja=this.getHSplitImage();return Ja.search(ub.P)!=-1?Ja:ub.Q+jsx3.resolveURI(Ja)+ub.R;};f.onSetChild=function(c){return (this.getChildren()).length<2;};m.getVersion=function(){return ub.S;};});jsx3.Splitter=jsx3.gui.Splitter;
