/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.ImageButton",jsx3.gui.Block,[jsx3.gui.Form],function(p,n){var
ub={a:"click",b:"mouseover",c:"mouseout",d:"mousedown",e:"mouseup",f:"keydown",g:'id="',h:'"',i:' class="',j:"jsx30imagebutton",k:"jsx30imagebutton_disabled",l:' width="',m:"",n:' height="',o:'<img src="',p:"/>",q:"span",r:"relativebox",s:"box",t:"div",u:"inline",v:"jsxtoggle",w:"jsxexecute"};var
Va=jsx3.gui.Event;var
Za=jsx3.gui.Interactive;var
ga=jsx3.gui.Form;p.TYPE_NORMAL=0;p.TYPE_TOGGLE=1;p.STATE_OFF=0;p.STATE_ON=1;n.jsximage=null;n.jsxoverimage=null;n.jsxdownimage=null;n.jsxonimage=null;n.jsxdisabledimage=null;n.jsxprefetch=1;n.jsxtype=0;n.jsxstate=0;n._jsxTZ=null;n.init=function(s,i,d,q,k){this.jsxsuper(s,i,d,q,k);};n.getImage=function(){return this.jsximage;};n.setImage=function(g){this.jsximage=g;return this;};n.getOverImage=function(){return this.jsxoverimage;};n.setOverImage=function(s){this.jsxoverimage=s;return this;};n.getDownImage=function(){return this.jsxdownimage;};n.setDownImage=function(q){this.jsxdownimage=q;return this;};n.getOnImage=function(){return this.jsxonimage;};n.setOnImage=function(m){this.jsxonimage=m;return this;};n.getDisabledImage=function(){return this.jsxdisabledimage;};n.setDisabledImage=function(c){this.jsxdisabledimage=c;return this;};n.getState=function(){return this.jsxstate;};n.setState=function(c){this.jsxstate=c;var
rb=this.getRendered();if(rb)rb.childNodes[0].childNodes[0].src=this.WI(false,false);return this;};n.getType=function(){return this.jsxtype;};n.setType=function(k){this.jsxtype=k;return this;};n.isPreFetch=function(){return this.jsxprefetch;};n.setPreFetch=function(d){this.jsxprefetch=jsx3.Boolean.valueOf(d);return this;};n.setEnabled=function(c,e){if(this._jsxTZ!=null)this._jsxTZ.setEnabled(c==1);return this.jsxsupermix(c,e);};p.Tj={};p.Tj[ub.a]=true;p.Tj[ub.b]=true;p.Tj[ub.c]=true;p.Tj[ub.d]=true;p.Tj[ub.e]=true;p.Tj[ub.f]=true;n.paint=function(){this.applyDynamicProperties();var
Pa=this.getEnabled()==1;var
mb=this.getKeyBinding();if(mb){var
P=this;if(this._jsxTZ!=null)this._jsxTZ.destroy();this._jsxTZ=this.doKeyBinding(function(i){P.qh(i,P.getRendered());},mb);if(this._jsxTZ)this._jsxTZ.setEnabled(Pa);}var
Kb=this.Pj(Pa?p.Tj:null,0);var
ca=this.renderAttributes(null,true);var
ka=this.Wl(true);ka.setAttributes(ub.g+this.getId()+ub.h+this.di()+this.uj()+this.Rh()+ub.i+(Pa?ub.j:ub.k)+ub.h+Kb+ca);ka.setStyles(this.yg(true)+this.qg()+this.Ne()+this.en()+this.Uc()+this.Ae());var
Hb=ka.Nd();Hb=Hb!=null?ub.l+Hb+ub.h:ub.m;var
na=ka.Qi();na=na!=null?ub.n+na+ub.h:ub.m;var
jb=ub.o+this.WI(false,false)+ub.h+Hb+na+ub.p;if(!this._jsxDB&&this.isPreFetch()){var
nb=this.getUriResolver();var
eb=[this.getImage(),this.getOverImage(),this.getDownImage(),this.getOnImage(),this.getDisabledImage()].map(function(a){return a?nb.resolveURI(a):null;});jsx3.html.loadImages(eb);this._jsxDB=true;}var
S=ka.lg(0);return (ka.paint()).join((S.paint()).join(jb));};n.Vm=function(){this.applyDynamicProperties();var
Qa=this.getRelativePosition()!=0;var
D=this.getParent()?(this.getParent()).ng(this)||{}:{};if(!Qa&&D.left==null&&!jsx3.util.strEmpty(this.getLeft()))D.left=this.getLeft();if(!Qa&&D.top==null&&!jsx3.util.strEmpty(this.getTop()))D.top=this.getTop();if(D.width==null&&!(this.getWidth()==null||isNaN(this.getWidth())))D.width=this.getWidth();if(D.height==null&&!(this.getHeight()==null||isNaN(this.getHeight())))D.height=this.getHeight();D.tagname=ub.q;if(D.boxtype==null)D.boxtype=Qa||D.left==null||D.top==null?ub.r:ub.s;if(D.padding=null)D.padding=this.getPadding();if(D.margin==null&&Qa&&this.getMargin()!=null)D.margin=this.getMargin();if(D.border==null&&this.getBorder()!=null)D.border=this.getBorder();var
Fb=new
jsx3.gui.Painted.Box(D);D={tagname:ub.t,boxtype:ub.u,height:Fb.Qi()};Fb.bl(new
jsx3.gui.Painted.Box(D));return Fb;};n.Rc=function(b,r,m){this.ag(b,r,m,1);};n.WI=function(i,c){var
Ga=null;if(this.getEnabled()==1){if(i)Ga=this.getOverImage();else if(c)Ga=this.getDownImage();if(this.getType()==1&&this.getState()==1)Ga=Ga||this.getOnImage();}else Ga=this.getDisabledImage();Ga=Ga||this.getImage();return Ga?(this.getUriResolver()).resolveURI(Ga):ub.m;};n.qh=function(e,h){if(!e.leftButton()&&e.isMouseEvent())return;if(this.getType()==1){var
Ua=this.getState()==0?1:0;var
Wa=this.doEvent(ub.v,{objEVENT:e,intSTATE:Ua,_gipp:1});if(Wa!==false){this.setState(Ua);h.childNodes[0].childNodes[0].src=this.WI(false,false);}}this.doEvent(ub.w,{objEVENT:e});};n.Pe=function(d,i){i.childNodes[0].childNodes[0].src=this.WI(true,false);};n.nk=function(h,e){e.childNodes[0].childNodes[0].src=this.WI(false,false);};n.Xg=function(k,r){if(k.leftButton())r.childNodes[0].childNodes[0].src=this.WI(false,true);};n.eo=function(b,k){if(b.rightButton())this.jsxsupermix(b,k);else if(b.leftButton())k.childNodes[0].childNodes[0].src=this.WI(false,false);};n._ebKeyDown=function(a,l){if(a.enterKey()||a.spaceKey()){this.qh(a,l);a.cancelAll();}};n.doValidate=function(){var
ca=null;if(this.getType()==p.NORMAL)ca=1;else ca=this.getState()==1||this.getRequired()==0?1:0;this.setValidationState(ca);return ca;};n.emGetType=function(){return jsx3.gui.Matrix.EditMask.FORMAT;};n.emInit=function(h){this.jsxsupermix(h);};n.emSetValue=function(j){};n.emGetValue=function(){return null;};n.emBeginEdit=function(g,h,f,l,r,o,i){var
Ja=i.childNodes[0].childNodes[0];if(Ja){this.jsxsupermix(g,h,f,l,r,o,i);jsx3.html.focus(Ja);}else return false;};n.emPaintTemplate=function(){this.setEnabled(0);var
ua=this.paint();this.setEnabled(1);var
W=this.paint();return this.emGetTemplate(W,ua);};});
