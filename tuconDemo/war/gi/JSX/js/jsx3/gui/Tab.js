/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Tab",jsx3.gui.Block,null,function(p,d){var
ub={A:"The jsx3.gui.Tab instance with the id, '",B:"', could not be painted on-screen, because it does not belong to a jsx3.gui.TabbedPane parent.",C:'id="',D:'"',E:' class="jsx30tab" ',F:' class="jsx30tab_text"',G:"background-image:url(",H:");background-repeat:repeat-x;background-position:top left;",I:"cursor:pointer;",J:"background-color:",K:";",L:"3.0.00",a:"jsx:///images/tab/bevel.gif",b:"#e8e8f5",c:"#d8d8e5",d:"#f6f6ff",e:"#a6a6af",f:"jsx:///images/tab/on.gif",g:"jsx:///images/tab/off.gif",h:"_content",i:"100%",j:"JSXFRAG",k:"url(",l:")",m:"px",n:"none",o:"click",p:"keydown",q:"mouseover",r:"mouseout",s:"span",t:"relativebox",u:"",v:"3 4 1 4",w:"0px pseudo;2px pseudo;0px pseudo;1px pseudo",x:"div",y:"inline",z:"t21"};var
Kb=jsx3.gui.Event;var
Sa=jsx3.gui.Interactive;p.DEFAULTBEVELIMAGE=jsx3.resolveURI(ub.a);p.DEFAULTACTIVECOLOR=ub.b;p.DEFAULTINACTIVECOLOR=ub.c;p.DEFAULTHIGHLIGHT=ub.d;p.DEFAULTSHADOW=ub.e;p.ACTIVEBEVEL=jsx3.resolveURI(ub.f);p.INACTIVEBEVEL=jsx3.resolveURI(ub.g);jsx3.html.loadImages(p.DEFAULTBEVELIMAGE,p.ACTIVEBEVEL,p.INACTIVEBEVEL);p.CHILDBGCOLOR=ub.b;p.STATEDISABLED=0;p.STATEENABLED=1;d.init=function(c,q,a,g,f){this.jsxsuper(c,null,null,a,null,q);if(g!=null)this.setActiveColor(g);if(f!=null)this.setInactiveColor(f);var
yb=new
jsx3.gui.Block(c+ub.h,null,null,ub.i,ub.i);yb.setOverflow(1);yb.setRelativePosition(0);yb.setBackgroundColor(g==null?p.CHILDBGCOLOR:g);this.setChild(yb,1,null,ub.j);};d.onSetParent=function(k){return jsx3.gui.TabbedPane&&k instanceof jsx3.gui.TabbedPane;};d.getBevel=function(){return this.jsxbevel;};d.setBevel=function(b){this.jsxbevel=b;return this;};d.getMaskProperties=function(){return jsx3.gui.Block.MASK_EAST_ONLY;};d.Pe=function(n,r){r.style.backgroundImage=ub.k+p.ACTIVEBEVEL+ub.l;if(jsx3.EventHelp.isDragging())this.Pv(n,false);};d.nk=function(h,e){e.style.backgroundImage=ub.k+p.INACTIVEBEVEL+ub.l;};d.qh=function(e,h){jsx3.html.focus(h);if(e.leftButton())this.Pv(e);};d.doClickTab=function(k,c){this.Pv(this.isOldEventProtocol(),c);};d.doShow=function(){this.Pv(false);var
Na=this.getParent();var
qa=Na.al();var
Ca=(Na.ng()).parentwidth;if(qa>Ca){var
u=Na.vn();var
Eb=this.getAbsolutePosition(Na.getRendered());if(Eb.L+Eb.W>Ca&&this.getChildIndex()>0){u.style.left=parseInt(u.style.left)-(Eb.L+Eb.W-Ca)+ub.m;}else if(Eb.L<0)u.style.left=parseInt(u.style.left)-Eb.L+ub.m;Na.Zf();}};d.Pv=function(b,n){(this.getParent()).wk(b,this);};d.getActiveColor=function(){return this.jsxactivecolor;};d.setActiveColor=function(l){this.jsxactivecolor=l;return this;};d.getInactiveColor=function(){return this.jsxinactivecolor;};d.setInactiveColor=function(k){this.jsxinactivecolor=k;return this;};d.getEnabled=function(){return this.jsxenabled==null?1:this.jsxenabled;};d.setEnabled=function(h){this.jsxenabled=h;return this;};d.isFront=function(){var
hb=this.getChildIndex();return hb>=0&&(this.getParent()).getSelectedIndex()==hb;};d._ebKeyDown=function(q,o){if(this.jsxsupermix(q,o))return;var
S=this.getChildIndex();var
Za=this.getParent();if(q.leftArrow()||q.rightArrow()){var
Ya=(Za.getChildren()).length;var
Cb=q.leftArrow()?-1:1;var
Z=jsx3.util.numMod(S+Cb,Ya);var
ua=Za.getChild(Z);while(ua!=this&&(!ua.getEnabled()||ua.getDisplay()==ub.n)){Z=jsx3.util.numMod(Z+Cb,Ya);ua=Za.getChild(Z);}if(ua!=this)Za.wk(q,Z,null,true);q.cancelAll();}else if(q.downArrow()){Za.wk(q,S,null,true);(this.getContentChild()).focus();q.cancelAll();}};p.Tj={};p.Tj[ub.o]=true;p.Tj[ub.p]=true;p.Tj[ub.q]=true;p.Tj[ub.r]=true;d.ng=function(l){return this.Gi(0)||this.Ck(0,this.getParent()?(this.getParent()).ve(this):{});};d.Rc=function(c,s,o){this.ag(c,s,o,3);};d.Vm=function(f){if(f==null||isNaN(f.parentwidth)||isNaN(f.parentheight)){f=(this.getParent()).ng(this);}else if(f==null)f={};var
Ea=this.getPadding();if(this.getWidth()!=null&&!isNaN(parseInt(this.getWidth())))f.width=this.getWidth();f.height=ub.i;f.tagname=ub.s;f.boxtype=ub.t;f.padding=Ea!=null&&Ea!=ub.u?Ea:ub.v;f.border=ub.w;var
Jb=new
jsx3.gui.Painted.Box(f);var
y={};y.parentwidth=Jb.Nd();y.parentheight=Jb.Qi();y.height=ub.i;if(!(this.getWidth()==null||isNaN(this.getWidth()))){y.width=ub.i;y.tagname=ub.x;y.boxtype=ub.y;}else{y.tagname=ub.s;y.boxtype=ub.t;}var
G=new
jsx3.gui.Painted.Box(y);Jb.bl(G);return Jb;};d.paint=function(){if(!(this.getParent() instanceof jsx3.gui.TabbedPane)){jsx3.util.Logger.doLog(ub.z,ub.A+this.getId()+ub.B);return ub.u;}this.applyDynamicProperties();var
y=this.getEnabled()==1?this.Pj(p.Tj,0):ub.u;var
ea=this.renderAttributes(null,true);var
_=this.Wl(true);_.setAttributes(ub.C+this.getId()+ub.D+this.di()+this.uj()+this.Rh()+y+ub.E+ea);_.setStyles(this.ji()+this.yg()+this.Uc()+this.Gd()+this.wm()+this.ze()+this._i()+this.Ak()+this.Ne()+this.Ae());var
La=_.lg(0);La.setAttributes(ub.F+jsx3.html.pe);La.setStyles(this.Ak());return (_.paint()).join((La.paint()).join(this.ii()));};d.setWidth=function(f,j){this.jsxsuper(f);if(j)this.repaint();};d.setText=function(k,b){this.jsxsuper(k,b);if(b&&this.getParent())(this.getParent()).Zf();};d.ji=function(){return ub.G+p.INACTIVEBEVEL+ub.H;};d.yg=function(){return this.getEnabled()==1?ub.I:ub.u;};d.uj=function(){return this.jsxsuper(this.getIndex()||Number(0));};d.yf=function(){return this.getActiveColor()?this.getActiveColor():p.DEFAULTACTIVECOLOR;};d.Al=function(){return this.getInactiveColor()?this.getInactiveColor():p.DEFAULTINACTIVECOLOR;};d.Uc=function(){var
Xa=this.getChildIndex()!=(this.getParent()).getSelectedIndex()?this.Al():this.yf();return Xa?ub.J+Xa+ub.K:ub.u;};p.getVersion=function(){return ub.L;};d.getContentChild=function(){return this.getChild(0);};d.Zg=function(b){var
ia=this.getContentChild();if(ia)ia.Zg(b);this.jsxsuper(b);};});jsx3.Tab=jsx3.gui.Tab;
