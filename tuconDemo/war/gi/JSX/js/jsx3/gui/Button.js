/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Button",jsx3.gui.Block,[jsx3.gui.Form],function(r,b){var
ub={A:" ",B:"",C:"3.0.00",D:"pt",a:"#e8e8f5",b:"#f6f6ff",c:"#a6a6af",d:"jsx30button",e:"jsxexecute",f:"solid 1px ",g:"click",h:"BT",i:"keydown",j:"mousedown",k:"mouseup",l:"mouseout",m:"relativebox",n:"box",o:"span",p:"2",q:";solid 1px ",r:"100%",s:"div",t:"inline",u:'id="',v:'"',w:' class="',x:' class="jsx30button_text"',y:"background-color:",z:";"};var
zb=jsx3.gui.Event;var
Gb=jsx3.gui.Form;r.DEFAULTBACKGROUNDCOLOR=ub.a;r.DEFAULTHIGHLIGHT=ub.b;r.DEFAULTSHADOW=ub.c;r.DEFAULTHEIGHT=17;b._jsxTZ=null;r.DEFAULTCLASSNAME=ub.d;b.init=function(k,h,d,f,c){this.jsxsuper(k,h,d,f);this.setText(c);};b.doValidate=function(){return (this.setValidationState(1)).getValidationState();};b._ebKeyDown=function(i,d){if(i.spaceKey()||i.enterKey()){this.BT(i,d);i.cancelAll();}};b.doClick=function(){var
ka=zb.getCurrent();this.BT(ka);};b.focus=function(){var
J=this.getRendered();if(J){J=J.childNodes[0];jsx3.html.focus(J);return J;}};b.doExecute=function(a){this.BT(a);};b.BT=function(q,o){if(q==null||q.leftButton()||!q.isMouseEvent())this.doEvent(ub.e,{objEVENT:q});};b.Xg=function(s,m){if(!s.leftButton())return;if(!this.getBorder()){m.style.border=ub.f+r.DEFAULTSHADOW;m.style.borderRightColor=r.DEFAULTHIGHLIGHT;m.style.borderBottomColor=r.DEFAULTHIGHLIGHT;}jsx3.html.focus(m.childNodes[0]);};b.eo=function(e,h){if(e.leftButton())if(!this.getBorder()){h.style.border=ub.f+r.DEFAULTHIGHLIGHT;h.style.borderRightColor=r.DEFAULTSHADOW;h.style.borderBottomColor=r.DEFAULTSHADOW;}this.jsxsupermix(e,h);};b.nk=function(q,o){if(!this.getBorder()){o.style.border=ub.f+r.DEFAULTHIGHLIGHT;o.style.borderRightColor=r.DEFAULTSHADOW;o.style.borderBottomColor=r.DEFAULTSHADOW;}};b.getValue=function(){return this.getText();};b.setEnabled=function(l,o){if(this._jsxTZ!=null)this._jsxTZ.setEnabled(l==1);return this.jsxsupermix(l,o);};r.Tj={};r.Tj[ub.g]=ub.h;r.Tj[ub.i]=true;r.Tj[ub.j]=true;r.Tj[ub.k]=true;r.Tj[ub.l]=true;b.Rc=function(f,c,l){var
Mb=this.Wl(true,f);if(c){var
Fb=Mb.recalculate(f,c,l);if(Fb.w||Fb.h){var
Ka=Mb.lg(0);Ka.recalculate({parentwidth:Mb.Nd(),parentheight:Mb.Qi()},c.childNodes[0],l);}}};b.Vm=function(g){this.applyDynamicProperties();if(this.getParent()&&(g==null||isNaN(g.parentwidth)||isNaN(g.parentheight))){g=(this.getParent()).ng(this);}else if(g==null)g={};var
ka=this.getRelativePosition()!=0;if(!g.boxtype)g.boxtype=ka?ub.m:ub.n;g.tagname=ub.o;if(g.width==null&&!jsx3.util.strEmpty(this.getWidth()))g.width=this.getWidth();g.height=this.getHeight()==null?r.DEFAULTHEIGHT:this.getHeight();if(ka){if(!jsx3.util.strEmpty(this.getMargin()))g.margin=this.getMargin();}else{g.left=!jsx3.util.strEmpty(this.getLeft())?this.getLeft():0;g.top=!jsx3.util.strEmpty(this.getTop())?this.getTop():0;}g.padding=!jsx3.util.strEmpty(this.getPadding())?this.getPadding():ub.p;g.border=this.getBorder()||ub.f+r.DEFAULTHIGHLIGHT+ub.q+r.DEFAULTSHADOW+ub.q+r.DEFAULTSHADOW+ub.q+r.DEFAULTHIGHLIGHT;var
pb=new
jsx3.gui.Painted.Box(g);var
Bb={};Bb.parentwidth=pb.Nd();Bb.parentheight=pb.Qi();Bb.height=ub.r;if(g.width){Bb.width=ub.r;Bb.tagname=ub.s;Bb.boxtype=ub.t;}else{Bb.tagname=ub.o;Bb.boxtype=ub.m;}var
Lb=new
jsx3.gui.Painted.Box(Bb);pb.bl(Lb);return pb;};b.paint=function(){this.applyDynamicProperties();var
va;if((va=this.getKeyBinding())!=null){var
ob=this;if(this._jsxTZ!=null)this._jsxTZ.destroy();this._jsxTZ=this.doKeyBinding(function(q){ob.BT(q);},va);if(this._jsxTZ)this._jsxTZ.setEnabled(this.getEnabled()!=0);}var
Ia=this.Pj(this.getEnabled()==1?r.Tj:null,0);var
Ua=this.renderAttributes(null,true);var
Ra=this.Wl(true);Ra.setAttributes(ub.u+this.getId()+ub.v+this.di()+this.Rh()+Ia+ub.w+this.kf()+ub.v+Ua);Ra.setStyles(this.qg()+this.Ne()+this.yg(true)+this.ze()+this.wm()+this._i()+this.Gd()+this.Uc()+this.en()+this.Ak()+this.Ae());var
ca=Ra.lg(0);ca.setAttributes(this.uj()+ub.x);ca.setStyles(this.Ak()+this.dg());return (Ra.paint()).join((ca.paint()).join(this.ii())+this.paintChildren());};b.setRelativePosition=function(f,e){if(this.jsxrelativeposition!=f){this.jsxrelativeposition=f;this.ce();if(e)this.repaint();}return this;};b.setWidth=function(o,j){this.jsxwidth=o;this.ce();if(j)this.repaint();return this;};b.Uc=function(){var
hb=this.getEnabled()!=0?this.getBackgroundColor()||r.DEFAULTBACKGROUNDCOLOR:this.getDisabledBackgroundColor()||Gb.DEFAULTDISABLEDBACKGROUNDCOLOR;return ub.y+hb+ub.z;};b.kf=function(){var
ka=this.getClassName();return r.DEFAULTCLASSNAME+(ka?ub.A+ka:ub.B);};r.getVersion=function(){return ub.C;};b.emGetType=function(){return jsx3.gui.Matrix.EditMask.FORMAT;};b.emInit=function(l){this.jsxsupermix(l);this.subscribe(ub.e,this,ub.D);};b.emSetValue=function(o){};b.emGetValue=function(){return null;};b.emBeginEdit=function(o,p,l,d,g,a,n){var
Ra=jsx3.html.selectSingleElm(n,0,0,0);if(Ra){this.jsxsupermix(o,p,l,d,g,a,n);jsx3.html.focus(Ra);}else return false;};b.emPaintTemplate=function(){this.setEnabled(0);var
E=this.paint();this.setEnabled(1);var
ea=this.paint();return this.emGetTemplate(ea,E);};b.pt=function(e){var
Za=this.emGetSession();if(Za){}};});jsx3.Button=jsx3.gui.Button;
