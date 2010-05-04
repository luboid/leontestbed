/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.WindowBar",jsx3.gui.Block,null,function(a,f){var
ub={A:"text-align:",B:"right",C:"left",D:"none",E:"#FFFFFF",F:"2.4.00",a:"#c8c8d5",b:"#aaaacb",c:"solid 1px #e8e8f5;solid 0px;solid 1px #a8a8b5;solid 0px;",d:"solid 1px #9898a5",e:"bold",f:"jsx3.gui.Form",g:"mousedown",h:"doBeginMove",i:"100%",j:"inline",k:"box",l:"div",m:"0 0 0 4",n:"span",o:'class="jsx30windowbar_lbl"',p:"cursor:move;",q:"cursor:default;",r:"",s:'id="',t:'"',u:' class="jsx30windowbar"',v:"background-color:",w:";",x:"font-weight:",y:"font-size:",z:"px;"};var
u=jsx3.gui.Block;a.DEFAULTHEIGHT=26;a.DEFAULTBACKGROUND=jsx3.html.getCSSFade(false);a.DEFAULTBG=ub.a;a.DEFAULTBGCAPTION=ub.b;a.DEFAULTBORDER=ub.c;a.DEFAULTBORDERCAPTION=ub.d;a.DEFAULTFONTWEIGHT=ub.e;a.DEFAULTFONTSIZE=11;a.TYPECAPTION=0;a.TYPETOOL=1;a.TYPEMENU=2;a.TYPETASK=3;f.init=function(m,r){this.jsxsuper(m);this.setRelativePosition(1);if(r!=null)this.setType(r);};f.getMaskProperties=function(){return this.getRelativePosition()==0?u.MASK_MOVE_ONLY:u.MASK_NO_EDIT;};f.getType=function(){return this.jsxbartype==null?0:this.jsxbartype;};f.setType=function(j){this.jsxbartype=j;this.ce();return this;};f.setText=function(j,c){this.jsxsuper(j,c);if(c)if(this.getType()==0){var
ga=this.getParent();if(ga instanceof jsx3.gui.Dialog&&ga.getRendered()!=null)ga.Mj();}return this;};f.doBeginMove=function(p,i){if(!(jsx3.html.getJSXParent(p.srcElement())).instanceOf(ub.f))(this.getParent()).doBeginMove(p,i);};a.Tj={};a.Tj[ub.g]=ub.h;f.Rc=function(k,h,g){this.ag(k,h,g,this.getType()==0?4:2);};f.Vm=function(s){this.applyDynamicProperties();if(this.getParent()&&(s==null||!isNaN(s.parentwidth)&&!isNaN(s.parentheight))){s=(this.getParent()).ng(this);}else if(s==null)s={};var
Gb=this.getBorder();var
w=this.getRelativePosition()!==0;if(s.left==null&&!w&&!jsx3.util.strEmpty(this.getLeft()))s.left=this.getLeft();if(s.top==null&&!w&&!jsx3.util.strEmpty(this.getTop()))s.top=this.getTop();if(s.width==null)s.width=ub.i;if(s.height==null)s.height=this.getHeight()||a.DEFAULTHEIGHT;if(!s.boxtype)s.boxtype=w?ub.j:ub.k;s.tagname=ub.l;s.padding=this.getPadding()||ub.m;s.border=Gb!=null?Gb:this.getType()==0?a.DEFAULTBORDERCAPTION:a.DEFAULTBORDER;var
kb=new
jsx3.gui.Painted.Box(s);if(this.getType()==0){var
Hb={};Hb.left=6;Hb.top=6;Hb.tagname=ub.n;Hb.boxtype=ub.k;var
La=new
jsx3.gui.Painted.Box(Hb);kb.bl(La);}return kb;};f.paint=function(){this.applyDynamicProperties();var
Qa=this.Wl(true);var
ga=null,Za=null,v=null;if(this.getType()==0){var
_a=Qa.lg(0);_a.setAttributes(ub.o);_a.setStyles(this.Gd()+this._i()+this.wm()+this.ze());v=(_a.paint()).join(this.ii());ga=ub.p;Za=this.Pj(a.Tj,0);}else{ga=ub.q;Za=ub.r;v=ub.r;}var
da=this.renderAttributes(null,true);Qa.setAttributes(ub.s+this.getId()+ub.t+this.di()+this.Rh()+this.uj()+Za+ub.u+da);Qa.setStyles(ga+this.Ak()+this.Uc()+this.en()+this.ti()+this.Ae());return (Qa.paint()).join(v+this.paintChildren());};f.uj=function(){return this.jsxsuper(this.getIndex()||Number(0));};f.Uc=function(){var
cb=this.getBackgroundColor();return cb==null||cb!=ub.r?ub.v+(cb?cb:this.getType()==0?a.DEFAULTBGCAPTION:a.DEFAULTBG)+ub.w:ub.r;};f.ti=function(){if(this.getType()==2)return ub.r;var
t=this.getBackground();return t==null?a.DEFAULTBACKGROUND:t;};f.getHeight=function(){var
ca=this.jsxsuper();if(ca==null||isNaN(ca))ca=a.DEFAULTHEIGHT;return ca;};f._i=function(){return this.getFontWeight()?ub.x+this.getFontWeight()+ub.w:ub.x+ub.e+ub.w;};f.ze=function(){return ub.y+(this.getFontSize()?this.getFontSize():a.DEFAULTFONTSIZE)+ub.z;};f.Ak=function(){return ub.A+(this.getTextAlign()?this.getTextAlign():this.getType()==0?ub.B:ub.C)+ub.w;};f.ii=function(){return this.getText()?this.getText():ub.r;};f.beep=function(){jsx3.gui.Cc(this.getRendered(),{filter:ub.D,backgroundColor:ub.E,backgroundImage:ub.r});};a.getVersion=function(){return ub.F;};});jsx3.WindowBar=jsx3.gui.WindowBar;
