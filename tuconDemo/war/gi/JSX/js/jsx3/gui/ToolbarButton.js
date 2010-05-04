/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.ToolbarButton",jsx3.gui.Block,[jsx3.gui.Form],function(r,d){var
ub={A:"span",B:"relativebox",C:"div",D:"box",E:"0 0 0 4",F:"0px;0px;0px;solid 1px ",G:"5 4 5 0",H:"background-image:url(",I:");",J:"id='",K:"' ",L:" class='jsx30toolbarbutton'",M:"class='jsx30toolbarbutton_img'",N:"class='jsx30toolbarbutton_lbl'",O:"&#160;",P:"class='jsx30toolbarbutton_cap'",Q:"overflow:hidden;",R:"background-color:",S:";",T:"3.0.00",U:"pt",a:"jsx:///images/tbb/down.gif",b:"jsx:///images/tbb/on.gif",c:"jsx:///images/tbb/over.gif",d:"jsx:///images/tbb/default.gif",e:"#9B9BB7",f:"",g:"url(",h:")",i:"jsxmenu",j:"#808080",k:"jsxexecute",l:"border",m:"padding",n:"jsxchange",o:"click",p:"BT",q:"keydown",r:"mousedown",s:"mouseup",t:"mouseout",u:"mouseover",v:"blur",w:"nk",x:"focus",y:"Pe",z:"1 4 1 0"};var
Oa=jsx3.gui.Form;var
z=jsx3.gui.Interactive;var
nb=jsx3.gui.Event;r.TYPENORMAL=0;r.TYPECHECK=1;r.TYPERADIO=2;r.STATEOFF=0;r.STATEON=1;r.IMAGEDOWN=jsx3.resolveURI(ub.a);r.IMAGEON=jsx3.resolveURI(ub.b);r.IMAGEOVER=jsx3.resolveURI(ub.c);r.DEFAULTIMAGE=jsx3.resolveURI(ub.d);r.BORDERCOLOR=ub.e;jsx3.html.loadImages(r.IMAGEDOWN,r.IMAGEON,r.IMAGEOVER,r.DEFAULTIMAGE);d.init=function(i,s,l){this.jsxsuper(i,null,null,null,null);if(s!=null)this.setType(s);if(l!=null)this.setTip(l);};d.getDisabledImage=function(){return this.jsxdisabledimage!=null&&jsx3.util.strTrim(this.jsxdisabledimage)!=ub.f?this.jsxdisabledimage:this.getImage();};d.setDisabledImage=function(f){this.jsxdisabledimage=f;return this;};d.doValidate=function(){var
T=this.getType==0||this.getRequired()==0||this.getState()==1;return (this.setValidationState(T?1:0)).getValidationState();};d.getImage=function(){return this.jsximage!=null&&jsx3.util.strTrim(this.jsximage)!=ub.f?this.jsximage:null;};d.setImage=function(i){this.jsximage=i;return this;};d.getType=function(){return this.jsxtype==null?0:this.jsxtype;};d.setType=function(h){this.jsxtype=h;return this;};d._ebKeyDown=function(i,m){if(i.spaceKey()||i.enterKey()){this.BT(i,m);i.cancelAll();}};d.getMaskProperties=function(){return jsx3.gui.Block.MASK_NO_EDIT;};d.Xg=function(e,h){if(!e.leftButton())return;h.style.backgroundImage=ub.g+r.IMAGEDOWN+ub.h;h.childNodes[3].style.backgroundColor=r.BORDERCOLOR;if(this.getEvent(ub.i)!=null)h.childNodes[2].style.backgroundImage=ub.g+r.IMAGEDOWNMENU+ub.h;};d.eo=function(p,i){if(p.leftButton()){var
da=this.jsxstate==1;i.style.backgroundImage=da?ub.g+r.IMAGEON+ub.h:ub.f;i.childNodes[3].style.backgroundColor=da?r.BORDERCOLOR:ub.f;}else if(p.rightButton())this.jsxsupermix(p,i);};d.Pe=function(h,e){if(this.getState()==0){e.style.backgroundImage=ub.g+r.IMAGEOVER+ub.h;e.childNodes[3].style.backgroundColor=ub.j;}};d.nk=function(i,m){if(this.getState()==0){m.style.backgroundImage=ub.f;m.childNodes[3].style.backgroundColor=ub.f;}};d.doExecute=function(q){if(q==null)q=true;this.BT(q,this.getRendered(q instanceof nb?q:null));};d.doClick=function(){this.BT(true,this.getRendered());};d.BT=function(c,j){var
sa=this.doEvent(ub.k,{objEVENT:c instanceof nb?c:null});if(sa!==false)if(this.getType()==2){this.CF(1,c,j);}else if(this.getType()==1)this.CF(this.getState()==1?0:1,c,j);};d.getGroupName=function(){return this.jsxgroupname!=null&&this.getType()==2?this.jsxgroupname:null;};d.setGroupName=function(b){if(this.getType()==2)this.jsxgroupname=b;return this;};d.getDivider=function(){return this.jsxdivider!=null?this.jsxdivider:0;};d.setDivider=function(i,f){this.jsxdivider=i;if(f)this.recalcBox([ub.l,ub.m]);else this.ce();return this;};d.getState=function(){return this.getType()==0?0:this.jsxstate==null?0:this.jsxstate;};d.setState=function(b){var
Ia=null;Ia=this.isOldEventProtocol();this.CF(b,Ia,this.getRendered());return this;};d.CF=function(m,h,i){var
X=false;if(this.getType()==2&&m==1){var
x=this.getGroupName();var
Fa=(this.getParent()).findDescendants(function(k){return k instanceof r&&k.getGroupName()==x;},false,true,true);for(var
xa=Fa.length-1;xa>=0;xa--)if(Fa[xa]!=this&&Fa[xa].getType()==2){Fa[xa].jsxstate=0;var
ya=Fa[xa].getRendered(i);if(ya!=null){ya.style.backgroundImage=ub.f;ya.childNodes[3].style.backgroundColor=ub.f;if(Fa[xa].getEvent(ub.i)!=null)ya.childNodes[2].style.backgroundImage=ub.g+r.IMAGEOFFMENU+ub.h;}}else if(Fa[xa]==this)if(i!=null){i.style.backgroundImage=ub.g+r.IMAGEON+ub.h;i.childNodes[3].style.backgroundColor=r.BORDERCOLOR;if(this.getEvent(ub.i)!=null)i.childNodes[2].style.backgroundImage=ub.g+r.IMAGEONMENU+ub.h;}X=true;}else if(this.getType()==2){if(i!=null){i.style.backgroundImage=ub.f;i.childNodes[3].style.backgroundColor=ub.f;if(this.getEvent(ub.i)!=null)i.childNodes[2].style.backgroundImage=ub.g+r.IMAGEOFFMENU+ub.h;}X=true;}else if(this.getType()==1){if(i!=null)if(m==1){i.style.backgroundImage=ub.g+r.IMAGEON+ub.h;i.childNodes[3].style.backgroundColor=r.BORDERCOLOR;if(this.getEvent(ub.i)!=null)i.childNodes[2].style.backgroundImage=ub.g+r.IMAGEONMENU+ub.h;}else{i.style.backgroundImage=ub.f;i.childNodes[3].style.backgroundColor=ub.f;if(this.getEvent(ub.i)!=null)i.childNodes[2].style.backgroundImage=ub.g+r.IMAGEOFFMENU+ub.h;}X=true;}this.jsxstate=m;if(X&&h){var
ab=null;if(h instanceof nb)ab={objEVENT:h,_gipp:1};this.doEvent(ub.n,ab);}return this;};d.setEnabled=function(h,s){if(this._jsxhotkey!=null)this._jsxhotkey.setEnabled(h==1);return this.jsxsupermix(h,s);};r.Tj={};r.Tj[ub.o]=ub.p;r.Tj[ub.q]=true;r.Tj[ub.r]=true;r.Tj[ub.s]=true;r.Tj[ub.t]=true;r.Tj[ub.u]=true;r.Tj[ub.v]=ub.w;r.Tj[ub.x]=ub.y;d.Rc=function(j,g,h){this.ag(j,g,h,3);};d.Vm=function(){var
la=this.getRelativePosition()!=0;var
Na,A,O;var
V={};V.height=22;if(la){V.margin=(Na=this.getMargin())!=null&&Na!=ub.f?Na:ub.z;V.tagname=ub.A;V.boxtype=ub.B;}else{V.left=(A=this.getLeft())!=null&&A!=ub.f?A:0;V.top=(O=this.getTop())!=null&&O!=ub.f?O:0;V.tagname=ub.C;V.boxtype=ub.D;}if(this.getDivider()==1){V.padding=ub.E;V.border=ub.F+r.BORDERCOLOR;}var
va=new
jsx3.gui.Painted.Box(V);V={};V.width=this.getImage()!=null&&this.getImage()!=ub.f?22:3;V.height=22;V.tagname=ub.A;V.boxtype=ub.B;var
sb=new
jsx3.gui.Painted.Box(V);va.bl(sb);V={};if(jsx3.util.strEmpty(this.getText())){V.width=1;}else V.padding=ub.G;V.height=22;V.tagname=ub.A;V.boxtype=ub.B;var
ha=new
jsx3.gui.Painted.Box(V);va.bl(ha);V={};V.width=1;V.height=22;V.tagname=ub.A;V.boxtype=ub.B;var
zb=new
jsx3.gui.Painted.Box(V);va.bl(zb);V={};V.width=1;V.height=22;V.tagname=ub.A;V.boxtype=ub.B;var
ab=new
jsx3.gui.Painted.Box(V);va.bl(ab);return va;};d.paint=function(){this.applyDynamicProperties();var
da;if((da=this.getKeyBinding())!=null){var
Ca=this;if(this._jsxhotkey!=null)this._jsxhotkey.destroy();this._jsxhotkey=this.doKeyBinding(function(e){Ca.BT(e,Ca.getRendered());},da);if(this._jsxhotkey)this._jsxhotkey.setEnabled(this.getEnabled()!=0);}var
oa=this.getState()==1?ub.H+r.IMAGEON+ub.I:ub.f;var
fa=this.qg();var
Ha=this.Ne();var
M=null,Ja=null,wb=null;if(this.getEnabled()==1){M=this.Pj(r.Tj,0);Ja=(this.getUriResolver()).resolveURI(this.getImage());wb=ub.f;}else{M=ub.f;Ja=(this.getUriResolver()).resolveURI(this.getDisabledImage());wb=jsx3.html.getCSSOpacity(0.4);}var
xb=this.renderAttributes(null,true);var
cb=this.Wl(true);cb.setAttributes(ub.J+this.getId()+ub.K+this.uj()+this.Rh()+this.di()+M+ub.L+xb);cb.setStyles(this.yg(true)+oa+fa+Ha+wb+this.en()+this.Ae());var
Hb=cb.lg(0);Hb.setStyles(Ja!=null?ub.H+Ja+ub.I:ub.f);Hb.setAttributes(ub.M+jsx3.html.pe);var
la=cb.lg(1);la.setAttributes(ub.N+jsx3.html.pe);var
v;if((v=this.getText())!=null&&v!=ub.f){la.setStyles(this.Gd()+this.wm()+this.ze()+this._i());}else{v=ub.O;la.setStyles(jsx3.html.hl);}var
ia=cb.lg(2);ia.setAttributes(ub.P);var
C=cb.lg(3);C.setAttributes(ub.P);C.setStyles(ub.Q+(this.getState()==1?ub.R+r.BORDERCOLOR+ub.S:ub.f));return (cb.paint()).join((Hb.paint()).join(ub.O)+(la.paint()).join(v)+(ia.paint()).join(ub.O)+(C.paint()).join(ub.O));};r.getVersion=function(){return ub.T;};d.emGetType=function(){return jsx3.gui.Matrix.EditMask.FORMAT;};d.emInit=function(g){this.jsxsupermix(g);if(this.getType()==2)this.setType(0);this.subscribe(ub.k,this,ub.U);};d.emSetValue=function(g){};d.emGetValue=function(){return null;};d.emBeginEdit=function(n,a,j,s,k,c,g){var
V=g.childNodes[0].childNodes[0];if(V){this.jsxsupermix(n,a,j,s,k,c,g);jsx3.html.focus(V);}else return false;};d.emPaintTemplate=function(){this.setEnabled(0);var
ra=this.paint();this.setEnabled(1);var
Ba=this.paint();return this.emGetTemplate(Ba,ra);};d.pt=function(b){var
ia=this.emGetSession();if(ia){}};});jsx3.ToolbarButton=jsx3.gui.ToolbarButton;
