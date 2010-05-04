/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Block","jsx3.gui.Tab");jsx3.Class.defineClass("jsx3.gui.TabbedPane",jsx3.gui.Block,null,function(s,k){var
ub={A:'class="jsx30tabbedpane_autoscroller_r" jsxscrolltype="right" ',B:"0px",C:"jsxscrolltype",D:"left",E:"px",F:"-",G:"_jsxxJ",H:"jsxexecute",I:"jsxshow",J:"3.0.00",a:"jsx:///images/tab/l.png",b:"jsx:///images/tab/r.png",c:"beforeEnd",d:"",e:"none",f:"jsxhide",g:"jsxchange",h:"box",i:"div",j:"solid 1px #f6f6ff;solid 1px #a6a6af;solid 1px #a6a6af;solid 1px #f6f6ff",k:"100%",l:"white-space:nowrap;",m:"jsxdrop",n:"jsxctrldrop",o:"mouseup",p:'id="',q:'" class="jsx30tabbedpane"',r:"&#160;",s:"visibility:hidden;",t:'class="jsx30tabbedpane_controlbox"',u:"display:none;",v:'class="jsx30tabbedpane_autoscroller_l" jsxscrolltype="left" ',w:"mouseover",x:"aq",y:"mouseout",z:"hZ"};var
V=jsx3.gui.Tab;var
pb=jsx3.gui.Event;var
Bb=jsx3.gui.Block;var
Mb=jsx3.gui.Interactive;s.AUTO_SCROLL_INTERVAL=50;s.LSCROLLER=jsx3.html.getCSSPNG(jsx3.resolveURI(ub.a));s.RSCROLLER=jsx3.html.getCSSPNG(jsx3.resolveURI(ub.b));s.DEFAULTTABHEIGHT=20;k.init=function(o){this.jsxsuper(o);};k.paintChild=function(c,l){var
Na=this.getRendered();if(Na!=null){if(this.getShowTabs())jsx3.html.insertAdjacentHTML(Na.childNodes[0].childNodes[0],ub.c,c.paint());var
da=c.getContentChild();var
Db=(this.getChildren()).length==1;da=this.yI(da,Db);jsx3.html.insertAdjacentHTML(Na,ub.c,c.paintChildren([da]));this.jsxsuper(da,l,Na,true);if(Db)this.wk(null,c);}this.Zf();};k.onSetChild=function(g){if(!(g instanceof V))return false;var
Va=g.getContentChild();if(Va&&Va instanceof Bb)Va.setVisibility(ub.d);if((this.getChildren()).length==0)this.jsxselectedindex=-1;return true;};k.yI=function(q,m){q=q.Dk(m)||q;if(q instanceof Bb)q.setDisplay(m?ub.d:ub.e,true);return q;};k.onRemoveChild=function(g,m){this.jsxsuper(g,m);if(jsx3.$A.is(g)){var
z=g[this.getSelectedIndex()];if(z)z.doEvent(ub.f);this.doEvent(ub.g);this.setSelectedIndex(-1);this.ce();this.repaint();}else{var
Va=this.getSelectedIndex();var
qb=Math.min((this.getChildren()).length-1,Va);if(Va==m)g.doEvent(ub.f);if(qb>=0)this.wk(false,qb,true);else this.doEvent(ub.g);this.Zf();}};k.getSelectedIndex=function(){return this.jsxselectedindex==null?(this.getChildren()).length>0?0:-1:this.jsxselectedindex;};k.setSelectedIndex=function(a,o){if(o){this.wk(false,a);}else this.jsxselectedindex=a instanceof V?a.getChildIndex():a;return this;};k.eo=function(o,q){this.doDrop(o,q,jsx3.EventHelp.ONDROP);};k.ng=function(r){if(this.getParent()){var
la=(this.getParent()).ng(this);var
yb=la.width?la.width:la.parentwidth;var
Kb=this.getShowTabs()?this.paintTabSize()+1:0;return {parentwidth:yb,parentheight:Kb};}else return {};};k.ve=function(){if(this.getParent()){var
N=(this.getParent()).ng(this);var
_a=N.width!=null&&!isNaN(N.width)?N.width:N.parentwidth;var
Z=this.getShowTabs()?this.paintTabSize():0;var
sa=(N.height!=null&&!isNaN(N.height)?N.height:N.parentheight)-Z;var
ob={left:0,top:Z,width:_a,height:sa,parentwidth:_a,parentheight:sa,boxtype:ub.h,tagname:ub.i};if(this.getShowTabs())ob.border=ub.j;return ob;}return {};};k.Rc=function(q,n,a){var
pa=this.Wl(true,q);if(n){pa.recalculate(q,n,a);var
cb=pa.lg(0);cb.recalculate({parentwidth:pa.Nd(),height:this.paintTabSize()+1},n!=null?n.childNodes[0]:null,a);var
H=cb.lg(0);H.recalculate({parentwidth:pa.Nd(),height:this.paintTabSize()+1},n!=null?n.childNodes[0].childNodes[0]:null,a);var
ia=cb.lg(2);ia.recalculate({left:cb.Nd()-22},n!=null?n.childNodes[0].childNodes[2]:null,a);var
y=this.getChildren();var
kb=this.ng();for(var
Ca=0;Ca<y.length;Ca++){var
J=y[Ca];a.add(J,this.ng(),n!=null,true);var
z=J.getContentChild();if(z!=null){var
Sa=this.getSelectedIndex()==Ca;z=this.yI(z,Sa);if(Sa)a.add(z,this.ve(),z.getRendered(n),true);}}this.Zf();}};k.Vm=function(m){if(this.getParent()&&(m==null||!isNaN(m.parentwidth)&&!isNaN(m.parentheight)||!isNaN(m.width)&&!isNaN(m.height))){m=(this.getParent()).ng(this);}else if(m==null)m={};if(m.left==null)m.left=0;if(m.top==null)m.top=0;if(m.width==null)m.width=ub.k;if(m.height==null)m.height=ub.k;if(m.tagname==null)m.tagname=ub.i;if(!m.boxtype)m.boxtype=ub.h;var
Sa=this.getBorder();if(Sa!=null&&Sa!=ub.d)m.border=Sa;var
Jb=new
jsx3.gui.Painted.Box(m);var
U={};U.parentwidth=m.parentwidth;U.width=ub.k;U.height=this.paintTabSize()+1;U.left=0;U.top=0;U.tagname=ub.i;U.boxtype=ub.h;var
v=new
jsx3.gui.Painted.Box(U);Jb.bl(v);U={};U.parentwidth=m.parentwidth;U.width=ub.k;U.height=this.paintTabSize()+1;U.left=0;U.top=0;U.tagname=ub.i;U.boxtype=ub.h;var
wb=new
jsx3.gui.Painted.Box(U);wb.setStyles(ub.l);v.bl(wb);U={};U.width=14;U.height=14;U.left=2;U.top=2;U.tagname=ub.i;U.boxtype=ub.h;var
Ha=new
jsx3.gui.Painted.Box(U);v.bl(Ha);U={};U.width=14;U.height=14;U.left=v.Nd()-16;U.top=2;U.tagname=ub.i;U.boxtype=ub.h;var
Ja=new
jsx3.gui.Painted.Box(U);v.bl(Ja);return Jb;};k.paint=function(){this.applyDynamicProperties();var
u=this.getId();var
Fa=this.getShowTabs();var
Kb=this.getSelectedIndex();if(Kb<0||Kb>=(this.getChildren()).length){Kb=0;this.setSelectedIndex(Kb);}var
Nb={};if(this.hasEvent(ub.m)||this.hasEvent(ub.n))Nb[ub.o]=true;var
A=this.Pj(Nb,0);var
Na=this.renderAttributes(null,true);var
v=this.Wl(true);v.setAttributes(ub.p+u+ub.q+this.di()+this.uj()+this.Rh()+A+Na);v.setStyles(this.en()+this.Uc()+this.ti()+this.qg()+this.Ne()+this.Ae());var
xb=v.lg(0);if(Fa){var
Ya=this.getChild(Kb);Ya=Ya==null?this.getChild(0):Ya;if(Ya!=null)if(!Ya.getEnabled()){var
Ja=(this.getChildren()).length-1;for(var
ga=0;ga<=Ja;ga++)if((this.getChild(ga)).getEnabled()){this.setSelectedIndex(ga);break;}}var
Ib=this.paintChildren();xb.setStyles(this.Ak());}else{var
Ib=ub.r;xb.setStyles(ub.s);}xb.setAttributes(ub.t);var
Aa=this.getChildren();var
fb=[];for(var
ga=0;ga<Aa.length;ga++){var
Ba=this.getSelectedIndex()==ga;var
mb=Aa[ga].getContentChild();if(mb!=null){mb=this.yI(mb,Ba);mb.Wc(this.ve());fb.push(mb);}}jsx3.sleep(function(){this.Zf();},null,this);var
Ra=xb.lg(0);var
Xa=xb.lg(1);Xa.setStyles(ub.u+s.LSCROLLER);Xa.setAttributes(ub.v+this.pi(ub.w,ub.x)+this.pi(ub.y,ub.z));var
ja=xb.lg(2);ja.setStyles(ub.u+s.RSCROLLER);ja.setAttributes(ub.A+this.pi(ub.w,ub.x)+this.pi(ub.y,ub.z));return (v.paint()).join((xb.paint()).join((Ra.paint()).join(Ib)+(Xa.paint()).join(ub.r)+(ja.paint()).join(ub.r))+this.paintChildren(fb));};k.Zf=function(){var
qb=this.al();var
Ib=(this.ng()).parentwidth;var
la=this.vn();if(la)if(Ib<qb){la.nextSibling.style.display=parseInt(la.style.left)<0?ub.d:ub.e;la.nextSibling.nextSibling.style.display=ub.d;}else{la.nextSibling.style.display=ub.e;la.nextSibling.nextSibling.style.display=ub.e;la.style.left=ub.B;}};k.al=function(){var
fb=this.vn();if(fb){var
cb=fb.childNodes;var
ea=0;for(var
Wa=0;Wa<cb.length;Wa++)ea=ea+parseInt(cb[Wa].offsetWidth);return ea;}};k.aq=function(c,j){var
ea=this;this._jsxxJ={direction:j.getAttribute(ub.C),totalwidth:this.al()-(this.ng()).parentwidth};this._jsxxJ.interval=window.setInterval(function(){ea.bX();},s.AUTO_SCROLL_INTERVAL);};k.vn=function(){var
Hb=this.getRendered();return Hb?Hb.childNodes[0].childNodes[0]:null;};k.bX=function(){var
La=this.vn();var
lb=parseInt(La.style.left);if(this._jsxxJ.direction==ub.D){if(lb-5<0){La.style.left=lb+5+ub.E;La.nextSibling.nextSibling.style.display=ub.d;}else{La.style.left=ub.B;La.nextSibling.style.display=ub.e;this.hZ();}}else if(Math.abs(lb)+5<=this._jsxxJ.totalwidth){La.style.left=lb-5+ub.E;La.nextSibling.style.display=ub.d;}else{La.style.left=ub.F+this._jsxxJ.totalwidth+ub.E;La.nextSibling.nextSibling.style.display=ub.e;this.hZ();}};k.hZ=function(e,h){if(this._jsxxJ){window.clearInterval(this._jsxxJ.interval);delete this[ub.G];}};k.uj=function(){return this.jsxsuper(this.getIndex()||Number(0));};k.paintTabSize=function(){return this.getTabHeight()!=null&&!isNaN(this.getTabHeight())?this.getTabHeight():s.DEFAULTTABHEIGHT;};k.getTabHeight=function(){return this.jsxtabheight;};k.setTabHeight=function(r){this.jsxtabheight=r;this.clearBoxProfile(true);return this;};k.getShowTabs=function(){return this.jsxshowtabs==null||this.jsxshowtabs===ub.d?1:this.jsxshowtabs;};k.setShowTabs=function(h){this.jsxshowtabs=h;this.clearBoxProfile(true);return this;};k.wk=function(l,m,n,o){if(!(m instanceof V))m=this.getChild(m);if(m){var
Aa=this.getShowTabs();var
Xa=m.getChildIndex();var
fb=this.getSelectedIndex();if(n||fb!=Xa){this.setSelectedIndex(Xa);var
Kb=(this.getChildren()).length;for(var
wb=0;wb<Kb;wb++){var
Ta=this.getChild(wb);var
H=Ta.getContentChild();var
P=wb==Xa;if(H)H=this.yI(H,P);if(Aa)Ta.setBackgroundColor(P?Ta.yf():Ta.Al(),true);if(P)H.ge(this.ve(),true);}}if(l)m.doEvent(ub.H,{objEVENT:l instanceof pb?l:null});if(!n){var
Ea=this.getChild(fb);if(Ea)Ea.doEvent(ub.f);}if(o)m.focus();m.doEvent(ub.I,{_gipp:1});this.doEvent(ub.g);}};s.getVersion=function(){return ub.J;};});jsx3.TabbedPane=jsx3.gui.TabbedPane;
