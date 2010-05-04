/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Alerts","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Dialog",jsx3.gui.Block,[jsx3.gui.Alerts],function(b,r){var
ub={A:"mouseup",Aa:";",B:"doEndMove",Ba:"<span style='display:none;'>&#160;</span>",C:"BeforeMove model event error for the control, ",Ca:'class="jsx30dialog_content"',D:".\nDescription:\n",Da:'class="jsx30dialog_mask"',E:"hidden",Ea:"overflow:hidden;visibility:hidden;",F:"-1px",Fa:"overflow:hidden;cursor:se-resize;z-index:12;background-image:url(",G:"px",Ga:");",H:"body",Ha:"yF",I:"AfterMove model event error for the control, ",Ia:"overflow:hidden;z-index:1;background-image:url(",J:"jsxaftermove",Ja:"&#160;",K:"doEndMove: ",Ka:"jsxmodal",L:"_jsxAW",La:"var d = jsx3.GO('",M:"jsx3.gui.Dialog.restore",Ma:"'); d.doToggleState(d.isFront() ? jsx3.gui.Dialog.MINIMIZED : jsx3.gui.Dialog.MAXIMIZED); false;",N:"@Restore Icon",Na:"@Task Icon",O:"number",Oa:"repaint",P:"jsxbeforeresize",Pa:"overflow:hidden;",Q:"tG",Qa:"overflow:auto;",R:"_jsxEz",Ra:"jsx30dialog",S:"jsxafterresize",Sa:" ",T:"jsxleft",Ta:"#FFFFFF",U:"jsxtop",Ua:"3.0.00",V:"jsxwidth",W:"jsxheight",X:"1px pseudo",Y:"div",Z:"box",_:"100%",a:"#e8e8f5",aa:"0",b:"jsx:///images/dialog/resize.gif",ba:"display:none;",c:"JSXTBB_",ca:"jsxkeypress",d:"jsx3.gui.WindowBar",da:"keypress",e:"jsx3.gui.ToolbarButton",ea:"mousedown",f:"_cbar",fa:"wV",g:"JSXFRAG",ga:"height:",h:"_btn_min",ha:"px;",i:"this.getParent().getParent().doToggleState();",ia:'<div id="',j:"jsxexecute",ja:'" ',k:"jsximage",ka:"keydown",l:"@Min Icon",la:"jX",m:"jsxtip",ma:' style="width:100%;height:100%;position:absolute;left:0px;top:0px;z-index:',n:"jsx3.gui.Dialog.min",na:';"',o:"_btn_max",oa:">",p:"this.getParent().getParent().doMaximize(this);",pa:'<div class="jsx30dialog_modal"',q:"@Max Icon",qa:"xY",r:"jsx3.gui.Dialog.max",ra:"lu",s:"_btn_close",sa:">&#160;</div>",t:"this.getParent().getParent().doClose();",ta:"<span ",u:"@Close Icon",ua:' style="position:absolute;left:-1px;top:0px;width:1px;height:1px;overflow:hidden;"></span></div>',v:"jsx3.gui.Dialog.close",va:' class="',w:"",wa:"z-index:1;",x:"none",xa:'id="',y:"display",ya:'"',z:"focus",za:"z-index:"};var
Ea=jsx3.gui.Event;var
Ja=jsx3.gui.Interactive;var
sb=jsx3.util.Logger.getLogger(b.jsxclass.getName());b.MINIMIZED=0;b.MAXIMIZED=1;b.DEFAULTBACKGROUNDCOLOR=ub.a;b.FIXED=0;b.RESIZEABLE=1;b.RESIZABLE=1;b.RW=jsx3.resolveURI(ub.b);b.MODAL=1;b.NONMODAL=0;b.XS=[null,32,32,32];b.OP=[10,10,10,10];b.uJ=10;b.kN=ub.c;r.init=function(h,f,c,k){this.jsxsuper(h,null,null,f,c);jsx3.require(ub.d,ub.e);var
Lb=new
jsx3.gui.WindowBar(h+ub.f);if(k!=null)Lb.setText(k);this.setChild(Lb,1,null,ub.g);var
vb=new
jsx3.gui.ToolbarButton(this.getName()+ub.h,null);vb.setEvent(ub.i,ub.j);vb.setDynamicProperty(ub.k,ub.l);vb.setDynamicProperty(ub.m,ub.n);Lb.setChild(vb,1,null,ub.g);vb=new
jsx3.gui.ToolbarButton(this.getName()+ub.o,null);vb.setEvent(ub.p,ub.j);vb.setDynamicProperty(ub.k,ub.q);vb.setDynamicProperty(ub.m,ub.r);Lb.setChild(vb,1,null,ub.g);vb=new
jsx3.gui.ToolbarButton(this.getName()+ub.s,null);vb.setEvent(ub.t,ub.j);vb.setDynamicProperty(ub.k,ub.u);vb.setDynamicProperty(ub.m,ub.v);Lb.setChild(vb,1,null,ub.g);};r.onAfterAssemble=function(i,k){if(this.getWindowState()==1)this.setZIndex(k.getNextZIndex(jsx3.app.Server.Z_DIALOG));};r.getMaskProperties=function(){return this.getModal()==0?jsx3.gui.Block.MASK_ALL_EDIT:jsx3.gui.Block.MASK_NO_EDIT;};r.doToggleState=function(h){var
X=h!=null?h:this.getWindowState()==1?0:1;var
F;if((F=this.getTaskButton())!=null){this.setWindowState(X);var
ua=null;if(X==1){this.setDisplay(ub.w,true);this.setZIndex((this.getServer()).getNextZIndex(jsx3.app.Server.Z_DIALOG)*this.getZMultiplier(),true);ua=this;}else{this.setDisplay(ub.x,true);ua=F;}F.setState(X==1?1:0);ua.focus();}else{var
rb=this.NK();if(X==1){rb.childNodes[1].style.display=ub.w;var
la=this.Wl(true);la.recalculate({height:this.getHeight()},rb);var
ja=la.lg(1);ja.recalculate({height:this.getHeight()},rb.childNodes[2]);if(this.getResize()){rb.childNodes[3].style.display=ub.w;rb.childNodes[4].style.display=ub.w;}this.setZIndex((this.getServer()).getNextZIndex(jsx3.app.Server.Z_DIALOG)*this.getZMultiplier(),true);this.setWindowState(1);}else{jsx3.html.persistScrollPosition(rb.childNodes[1]);rb.childNodes[1].style.display=ub.x;var
la=this.Wl(true);myCaptionBar=this.getCaptionBar();var
Jb=la.getBorderHeight()+(myCaptionBar!=null?myCaptionBar.getHeight():0)+2*this.getBuffer(2);la.recalculate({height:Jb},rb);var
ja=la.lg(1);ja.recalculate({height:Jb},rb.childNodes[2]);if(this.getResize()){rb.childNodes[3].style.display=ub.x;rb.childNodes[4].style.display=ub.x;}this.setWindowState(0);}}if(this.getWindowState()==1){jsx3.gui.Painted._onAfterRestoreViewCascade(this,this.NK());jsx3.html.restoreScrollPosition(this.NK());}};r.setDisplay=function(i,s){this.jsxdisplay=i;if(s){if(i==ub.x)jsx3.html.persistScrollPosition(this.NK());this.updateGUI(ub.y,i);}return this;};r._findGUI=function(e){return this.NK();};r.focus=function(l){if(!l){jsx3.sleep(function(){this.focus(true);},ub.z+this.getId(),this);return;}var
B=this.NK();if(!B)return;if(this.getWindowState()==0){if(this.getTaskButton())this.doToggleState(1);else jsx3.html.focus(this.NK());}else{var
Kb=jsx3.app.Browser.isTableMoveBroken();if(Kb)B.childNodes[1].style.display=ub.x;this.setZIndex((this.getServer()).getNextZIndex(jsx3.app.Server.Z_DIALOG),true);var
Db=this.getCaptionBar();if(Db!=null)Db.focus();else jsx3.html.focus(this.NK());if(Kb)B.childNodes[1].style.display=ub.w;}};r.isFront=function(){if(this.getWindowState()==0)return false;var
z=this.getParent();var
Lb=z.getDescendantsOfType(b,true);for(var
A=0;A<Lb.length;A++)if(Lb[A]!=this&&Lb[A].getWindowState()==1&&Lb[A].getZIndex()>this.getZIndex())return false;return true;};r.wV=function(p,i){if(!this.isFront()){var
z=this.fC();var
Ua=z.style.display;var
t=jsx3.app.Browser.isTableMoveBroken();if(Ua!=ub.x&&t)z.style.display=ub.x;this.setZIndex((this.getServer()).getNextZIndex(jsx3.app.Server.Z_DIALOG),true);if(Ua!=ub.x&&t)z.style.display=Ua;}};r.fC=function(){var
_=this.NK();return _!=null?_.childNodes[1]:null;};r.getTaskButton=function(g){if(g==null){var
Xa=this.getServer();if(Xa!=null)g=Xa.getTaskBar();}if(g!=null)return g.getChild(b.kN+this.getId());return null;};r.paintChild=function(q,k){var
jb=this.NK();if(jb!=null)if(this.getCaptionBar()==q){this.repaint();}else this.jsxsuper(q,k,jb.childNodes[1]);};r.doClose=function(){(this.getParent()).removeChild(this);};r.onSetParent=function(a){var
Ta=this.getServer();if(Ta!=null&&Ta!=a.getServer())this.Uw(Ta);return true;};r.onSetChild=function(n){this.jsxsuper(n);if(!this.getCaptionBar()&&b.iF(n))this.clearBoxProfile(true);return true;};r.Uw=function(a){if(a==null)a=this.getServer();var
va=this.getTaskButton(a.getTaskBar());if(va!=null)(va.getParent()).removeChild(va);};r.onDestroy=function(q){this.Uw(q.getServer());this.jsxsuper(q);};r.getWindowState=function(){return this.jsxwindowstate!=null?this.jsxwindowstate:1;};r.setWindowState=function(i){this.jsxwindowstate=i;return this;};r.getZMultiplier=function(){return this.jsxzmultiplier!=null?this.jsxzmultiplier:1;};r.setZMultiplier=function(s){this.jsxzmultiplier=s;return this;};r.getModal=function(){return this.jsxmodal!=null?this.jsxmodal:0;};r.setModal=function(g){this.jsxmodal=g;return this;};r.doBeginMove=function(p,i){if(p.leftButton()){this._jsxO6=true;var
Za=this.NK();var
oa=Za.childNodes[2];oa.style.visibility=ub.w;jsx3.html.focus(Za.childNodes[0]);try{this.jsxsupermix(p,oa);Ea.subscribe(ub.A,this,ub.B);this.setZIndex((this.getServer()).getNextZIndex(jsx3.app.Server.Z_DIALOG),true);}catch(Kb){var
ib=jsx3.lang.NativeError.wrap(Kb);sb.error(ub.C+this.getName()+ub.D+ib);this.Dp(oa);}}};r.Dp=function(p){p.style.visibility=ub.E;p.style.left=ub.F;p.style.top=ub.F;this._jsxO6=false;Ea.unsubscribe(ub.A,this,ub.B);};r.doEndMove=function(h){if(this._jsxO6){var
E=this.NK();var
L=E.childNodes[2];E.style.left=parseInt(parseInt(E.style.left)+parseInt(L.style.left)+1)+ub.G;E.style.top=parseInt(parseInt(E.style.top)+parseInt(L.style.top)+1)+ub.G;this.Dp(L);h=h.event;if((E.ownerDocument.getElementsByTagName(ub.H))[0]){try{this.jsxsupermix(h,E);}catch(Kb){var
C=jsx3.lang.NativeError.wrap(Kb);sb.error(ub.I+this.getName()+ub.D+C);}if(!this.getEvent(ub.J))this.constrainPosition();}else sb.error(ub.K+jsx3.html.getOuterHTML(h.srcElement()));}this.focus(true);};r.NK=function(){var
Ta=this.getRendered();if(Ta!=null&&this.jsxmodal){return Ta.childNodes[1];}else return Ta;};r.getAbsolutePosition=function(j){return this.jsxsuper(j,this.NK());};r.setLeft=function(p,s){this.jsxleft=p;if(s){this.mD({left:p});}else this.ce();return this;};r.setTop=function(c,h){this.jsxtop=c;if(h){this.mD({top:c});}else this.ce();return this;};r.setWidth=function(i,d){this.jsxwidth=i;if(d){this.mD({width:this.jsxwidth});}else this.ce();return this;};r.setHeight=function(j,f){this.jsxheight=j;if(f){this.mD({height:this.jsxheight});}else this.ce();return this;};r.doMaximize=function(q){if(this.getWindowState()==0)this.doToggleState(1);if(this._jsxAW!=null){var
ca=this.XN(this._jsxAW.jsxwidth,this._jsxAW.jsxheight);this.U2(this._jsxAW.jsxleft,this._jsxAW.jsxtop,ca[0],ca[1]);delete this[ub.L];var
Hb={left:this.getLeft(),top:this.getTop(),width:this.getWidth(),height:this.getHeight()};this.mD(Hb,true);if(q)((q.setDynamicProperty(ub.m,ub.r)).setDynamicProperty(ub.k,ub.q)).repaint();}else{this._jsxAW={};this._jsxAW.jsxwidth=this.getWidth();this._jsxAW.jsxheight=this.getHeight();this._jsxAW.jsxtop=this.getTop();this._jsxAW.jsxleft=this.getLeft();var
fb=(this.getParent()).getAbsolutePosition();var
qa=this.NK();var
ca=this.XN(fb.W-b.OP[1]-b.OP[3],fb.H-b.OP[0]-b.OP[2]);this.U2(Math.min(parseInt(qa.style.left),fb.W-ca[0]-b.OP[1]),Math.min(parseInt(qa.style.top),fb.H-ca[1]-b.OP[2]),ca[0],ca[1]);var
Hb={left:this.getLeft(),top:this.getTop(),width:this.getWidth(),height:this.getHeight()};this.mD(Hb,true);if(q)((q.setDynamicProperty(ub.m,ub.M)).setDynamicProperty(ub.k,ub.N)).repaint();}};r.getResize=function(){return this.jsxresize==null?1:this.jsxresize;};r.setResize=function(f){this.jsxresize=f;this.ce();return this;};r.setResizeParameters=function(l,j,k,d,e,g){this.jsxresize=l;this.jsxminx=j;this.jsxminy=k;this.jsxmaxx=d;this.jsxmaxy=e;};r.XN=function(a,p){a=Math.max(a,this.U1());p=Math.max(p,this.LG());if(typeof this.jsxmaxx==ub.O)a=Math.min(a,this.jsxmaxx);if(typeof this.jsxmaxy==ub.O)p=Math.min(p,this.jsxmaxy);return [a,p];};r.getCaptionBar=function(){return this.findDescendants(b.iF,false,false,true);};b.iF=function(g){return jsx3.gui.WindowBar&&g instanceof jsx3.gui.WindowBar&&g.getType()==0;};r.yF=function(p,i){if(!p.leftButton())return;var
Hb=this.doEvent(ub.P,{objEVENT:p});if(Hb!==false){b._jsxEz=i.parentNode.childNodes[2];b._jsxEz.style.visibility=ub.w;b._jsxEz.style.zIndex=11;i.style.zIndex=12;var
wb=(this.Wl(true)).lg(1);b._jsxoffx=b.uJ+2;b._jsxoffy=b.uJ+2;var
I=this;jsx3.gui.Interactive._beginMoveConstrained(p,i,function(m,l){return I.UH(m,l);});Ea.subscribe(ub.A,this,ub.Q);}};r.UH=function(f,e){if(b._jsxEz){this._jsxEM=f+b._jsxoffx;this._jsx_W=e+b._jsxoffy;this._jsxEM=Math.max(this._jsxEM,this.U1());this._jsx_W=Math.max(this._jsx_W,this.LG());if(typeof this.jsxmaxx==ub.O)this._jsxEM=Math.min(this._jsxEM,this.jsxmaxx);if(typeof this.jsxmaxy==ub.O)this._jsx_W=Math.min(this._jsx_W,this.jsxmaxy);var
w=(this.Wl()).lg(1);w.recalculate({width:this._jsxEM,height:this._jsx_W},b._jsxEz);return [this._jsxEM-b._jsxoffx,this._jsx_W-b._jsxoffy];}return [f,e];};r.U1=function(){var
Hb=Number(this.jsxminx)||-1;return Math.max(25,Hb);};r.LG=function(){var
Va=Number(this.jsxminy)||-1;var
Ta=15;if(this.getCaptionBar()!=null)Ta=Ta+30;return Math.max(Ta,Va);};r.tG=function(i){i=i.event;Ea.unsubscribe(ub.A,this,ub.Q);Ea.publish(i);if(!b._jsxEz)return;var
Ua=(this.Wl()).lg(1);var
Wa=Ua.getOffsetWidth();var
ab=Ua.getOffsetHeight();b._jsxEz.style.visibility=ub.E;b._jsxEz.style.zIndex=0;delete b[ub.R];this.U2(Wa,ab);this.mD({width:Wa,height:ab});this.doEvent(ub.S,{objEVENT:i,intW:this.getWidth(),intH:this.getHeight(),_gipp:1});};r.U2=function(p,h,e,a){if(arguments.length==4){this.setDynamicProperty(ub.T,null);this.jsxleft=p;this.setDynamicProperty(ub.U,null);this.jsxtop=h;}else{e=p;a=h;}this.setDynamicProperty(ub.V,null);this.jsxwidth=e;this.setDynamicProperty(ub.W,null);this.jsxheight=a;};r.recalcBox=function(){this.jsxsuper();this.mD();};r.ng=function(o){var
H=o==this.getCaptionBar()?this.Wl(true):(this.Wl(true)).lg(0);return {parentwidth:H.Nd(),parentheight:H.Qi()};};r.mD=function(h,o){if(o&&(h.left==null||h.top==null)){var
ea=(this.getParent()).getAbsolutePosition();if(h.left==null)h.left=Math.max(0,parseInt((ea.W-h.width)/2));if(h.top==null)h.top=Math.max(0,parseInt((ea.H-h.height)/2));}this.ge(h,true);};r.Vm=function(h){var
Aa=this.getWindowState()==0&&(this.getServer()).getTaskBar()==null;var
Da=this.getParent();if(Da==null){Da={H:this.getHeight(),W:this.getWidth()};}else{Da=Da.getAbsolutePosition();if(Da==null||Da.W==0)Da={H:this.getHeight(),W:this.getWidth()};}var
Z=jsx3.util.strEmpty(this.getTop())?Math.max(0,parseInt((Da.H-this.getHeight())/2)):this.getTop();var
t=jsx3.util.strEmpty(this.getLeft())?Math.max(0,parseInt((Da.W-this.getWidth())/2)):this.getLeft();var
Ia=this.getCaptionBar();if(h==null)h={};if(h.left==null)h.left=t;if(h.top==null)h.top=Z;if(h.width==null)h.width=this.getWidth();var
H=this.getBorder(ub.X);if(h.height==null)if(Aa){h.height=(new
jsx3.gui.Painted.Box({border:H})).getBorderHeight()+(Ia!=null?Ia.getHeight():0)+2*this.getBuffer(2);}else h.height=this.getHeight();h.tagname=ub.Y;h.boxtype=ub.Z;h.padding=this.getBuffer(2);h.border=H;var
Db=new
jsx3.gui.Painted.Box(h);var
la={};la.parentwidth=Db.Nd();la.parentheight=Db.Qi();la.width=ub._;la.height=Db.Qi()-(Ia!=null?Ia.getHeight()+this.getBuffer(2):0);la.top=Ia!=null?Ia.getHeight()+this.getBuffer(2)*2:this.getBuffer(2);la.left=this.getBuffer(2);la.tagname=ub.Y;la.boxtype=ub.Z;la.border=this.getContentBorder(ub.X);var
V=new
jsx3.gui.Painted.Box(la);Db.bl(V);la={};la.left=-1;la.top=-1;la.width=this.getWidth();la.height=h.height;la.tagname=ub.Y;la.boxtype=ub.Z;la.padding=ub.aa;la.border=ub.X;var
ma=new
jsx3.gui.Painted.Box(la);Db.bl(ma);la={};la.left=this.getWidth()-(b.uJ+2);la.top=this.getHeight()-(b.uJ+2);la.width=b.uJ+1;la.height=b.uJ+1;la.tagname=ub.Y;la.boxtype=ub.Z;var
T=new
jsx3.gui.Painted.Box(la);Db.bl(T);la={};la.left=this.getWidth()-(b.uJ+2);la.top=this.getHeight()-(b.uJ+2);la.width=b.uJ;la.height=b.uJ;la.tagname=ub.Y;la.boxtype=ub.Z;var
Fb=new
jsx3.gui.Painted.Box(la);Db.bl(Fb);return Db;};r.Rc=function(a,q,s){var
t=this.Wl(true,a);if(q!=null)q=this.NK();if(q!=null){var
zb=this.getCaptionBar();var
Da=t.recalculate(a,q,s);if(!Da.w&&!Da.h)return;var
Ib=t.lg(0);var
ra=t.Qi()-(zb!=null?zb.getHeight()+this.getBuffer(2):0);Ib.recalculate({parentwidth:t.Nd(),parentheight:t.Qi(),width:ub._,height:ra},q.childNodes[1],s);var
_=t.lg(1);_.recalculate({width:this.getWidth(),height:this.getHeight()},q.childNodes[2],s);if(this.getResize()==1){var
eb=t.lg(2);eb.recalculate({top:this.getHeight()-(b.uJ+2),left:this.getWidth()-(b.uJ+2)},q.childNodes[3],s);var
za=t.lg(3);za.recalculate({top:this.getHeight()-(b.uJ+2),left:this.getWidth()-(b.uJ+2)},q.childNodes[4],s);}if(zb)s.add(zb,{width:ub._,parentwidth:t.Nd(),height:zb.getHeight()},q.childNodes[0],true);var
Z=this.getChildren();var
u=0;var
Ta=q.childNodes[zb?1:0];if(Ta){var
U=Ta.childNodes;for(var
Ba=0;Ba<Z.length;Ba++)if(Z[Ba]!=zb){s.add(Z[Ba],{parentwidth:Ib.Nd(),parentheight:Ib.Qi()},true,true);}else u=1;}}};r.paint=function(){this.applyDynamicProperties();var
Qa=this.getId();var
ob=this.getWindowState()==0&&(this.getServer()).getTaskBar()==null;var
xb=ob?ub.ba:ub.w;var
G=this.getServer()!=null?(this.getServer()).getNextZIndex(jsx3.app.Server.Z_DIALOG)*this.getZMultiplier():5000;var
u={};if(this.getEvent(ub.ca)!=null)u[ub.da]=true;if(this.getModal()!=1)u[ub.ea]=ub.fa;var
gb=this.getModal()==1;var
Ca=this.Pj(u,gb?1:0);var
xa=this.renderAttributes(null,true);this.Mj();var
t=this.Wl(true);if(ob){var
ia=t.getOffsetHeight()-t.getPaintedHeight();var
ab=ub.ga+(32-ia)+ub.ha;}else var
ab=ub.w;ab=ub.w;if(gb){var
nb=[ub.ia+Qa+ub.ja+this.di()+this.uj()+this.pi(ub.ka,ub.la,0)+ub.ma+G+this.qg()+ub.na+ub.oa+ub.pa+this.pi(ub.ea,ub.qa,1)+this.pi(ub.A,ub.ra,1)+ub.sa,ub.ta+this.uj()+this.pi(ub.ka,ub.la,1)+ub.ua];t.setAttributes(Ca+this.uj()+ub.va+this.kf()+ub.ja+xa);t.setStyles(ub.wa+this.Uc()+this.ti()+this.Ne()+this.Ae()+ab);}else{var
nb=[ub.w,ub.w];t.setAttributes(ub.xa+Qa+ub.ya+this.di()+Ca+this.uj()+ub.va+this.kf()+ub.ja+xa);t.setStyles(ub.za+G+ub.Aa+this.Uc()+this.ti()+this.qg()+this.Ne()+this.Ae()+ab);}var
bb=this.getCaptionBar();var
Va=bb!=null?bb.paint():ub.Ba;var
Fb=t.lg(0);Fb.setAttributes(ub.Ca);Fb.setStyles(this.Ak()+this.dg()+xb);var
_=(this.getChildren()).filter(function(s){return s!=bb;});var
tb=this.paintChildren(_);var
na=t.lg(1);na.setAttributes(ub.Da);na.setStyles(ub.Ea+ab);if(this.getResize()==1){var
w=t.lg(2);w.setStyles(ub.Fa+jsx3.gui.Block.SPACE+ub.Ga+xb);w.setAttributes(this.pi(ub.ea,ub.Ha,gb?2:1));var
L=t.lg(3);L.setStyles(ub.Ia+b.RW+ub.Ga+xb);var
ma=(w.paint()).join(ub.w)+(L.paint()).join(ub.w);}else var
ma=ub.w;return nb[0]+(t.paint()).join(Va+(Fb.paint()).join(tb)+(na.paint()).join(ub.Ja)+ma)+nb[1];};r.jX=function(p,n){if(p.srcElement()==n&&p.tabKey()){p.cancelReturn();(this.getCaptionBar()||this).focus();}else p.setAttribute(ub.Ka,1);};r.xY=function(o,k){(this.beep()).focus();o.cancelBubble();};r.lu=function(h,e){this.focus();h.cancelBubble();};r.Mj=function(){var
ba=this.getId();var
Wa;if(this.getServer()!=null&&(Wa=(this.getServer()).getTaskBar())!=null&&this.getModal()!=1){var
Oa=this.getCaptionBar();var
_a=this.getTaskButton();if(Oa!=null){Oa.applyDynamicProperties();if(_a==null){jsx3.require(ub.e);var
U=new
jsx3.gui.ToolbarButton(b.kN+ba,1,Oa.getText());Wa.setChild(U);U.setEvent(ub.La+ba+ub.Ma,ub.j);U.setState(this.getWindowState()==1?1:0);U.setText(jsx3.util.strTruncate(Oa.getText()||ub.w,20));U.setDynamicProperty(ub.k,ub.Na);if(Wa.getRendered()==null){jsx3.sleep(Wa.repaint,ub.Oa+Wa.getId(),Wa);}else Wa.paintChild(U);}else{var
Hb=Oa.getText();if(Hb)((_a.setText(jsx3.util.strTruncate(Hb,20))).setTip(Hb)).repaint();}}else if(_a!=null)(_a.getParent()).removeChild(_a);}};r.uj=function(){return this.jsxsuper(this.getIndex()||Number(0));};r.dg=function(){if(this.getOverflow()==2){return ub.Pa;}else return ub.Qa;};r.kf=function(){var
ob=this.getClassName();return ub.Ra+(ob?ub.Sa+ob:ub.w);};r.getAlertsParent=function(){return this;};r.constrainPosition=function(f){var
fb=this.getRendered();var
Ab=fb!=null;var
Qa=null;if(fb){Qa=fb.parentNode;}else if(this.getParent())Qa=(this.getParent()).getRendered();if(Qa==null)return;var
vb=parseInt(Qa.style.width);var
H=parseInt(Qa.style.height);if(f===true){var
xa=vb-b.OP[1]-b.OP[3];var
I=H-b.OP[0]-b.OP[2];if(this.getWidth()>xa)this.setWidth(xa,Ab);if(this.getHeight()>I)this.setHeight(I,Ab);var
jb=vb-this.getWidth()-b.OP[1];var
bb=H-this.getHeight()-b.OP[2];if(this.getLeft()<b.OP[3])this.setLeft(b.OP[3],Ab);else if(this.getLeft()>jb)this.setLeft(jb,Ab);if(this.getTop()<b.OP[0])this.setTop(b.OP[0],Ab);else if(this.getTop()>bb)this.setTop(bb,Ab);}else{var
fa=this.getDimensions();if(!f)f=b.XS;f=f.concat();if(f[0]==null)f[0]=fa[3];else if(f[0]<0)f[0]=fa[3]+f[0];if(f[1]==null)f[1]=fa[2];else if(f[1]<0)f[1]=fa[2]+f[1];if(f[2]==null)f[2]=fa[3];else if(f[2]<0)f[2]=fa[3]+f[2];if(f[3]==null)f[3]=fa[2];else if(f[3]<0)f[3]=fa[2]+f[3];if(fa[0]<f[3]-fa[2])this.setLeft(f[3]-fa[2],Ab);else if(fa[0]>vb-f[1])this.setLeft(vb-f[1],Ab);if(fa[1]<f[0]-fa[3])this.setTop(f[0]-fa[3],Ab);else if(fa[1]>H-f[2])this.setTop(H-f[2],Ab);}};r.onRemoveChild=function(p,c){this.jsxsuper(p,c);if(jsx3.$A.is(p)){this.ce();this.repaint();}else if(b.iF(p)){this.ce();this.repaint();}};r.beep=function(){var
ma=this.getCaptionBar();if(ma!=null){ma.beep();}else{var
z=this.NK();jsx3.gui.Cc(z,{backgroundColor:ub.Ta});}return this;};r.getAlwaysCheckHotKeys=function(){return true;};r.getContentBorder=function(p){return jsx3.util.strEmpty(this.jsxcontentborder)&&p?p:this.jsxcontentborder;};r.setContentBorder=function(a){this.jsxcontentborder=a;this.clearBoxProfile(true);return this;};r.getBorder=function(i){return jsx3.util.strEmpty(this.jsxborder)&&i?i:this.jsxborder;};r.setBorder=function(f){this.jsxborder=f;this.clearBoxProfile(true);return this;};r.getBuffer=function(a){return jsx3.util.strEmpty(this.jsxbuffer)&&a!=null?a:+this.jsxbuffer;};r.setBuffer=function(e){this.jsxbuffer=!isNaN(e)?parseInt(e):e;this.clearBoxProfile(true);return this;};b.getVersion=function(){return ub.Ua;};});jsx3.Dialog=jsx3.gui.Dialog;
