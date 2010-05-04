/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Block","jsx3.gui.Form");jsx3.Class.defineClass("jsx3.gui.ColorPicker",jsx3.gui.Block,[jsx3.gui.Form],function(j,q){var
ub={A:"_2_h",B:"px;background-color:#000000;",C:"_3_v",D:'px;">&#160;</span>',E:"_eb1DMouseDownPt",F:'<img src="',G:"_drag",H:'" width="6" height="9"/>',I:'6px;height:9px;">&#160;</span>',J:"&#160;",K:"relativebox",L:"box",M:"span",N:"div",O:"inline",P:"100%",Q:"cursor:pointer;overflow:hidden;",R:"cursor:pointer;",S:"1px solid #CCCCCC;",T:"overflow:hidden;",U:"1px solid #333333;",V:"px;",W:'"',X:'px;"/>',Y:"mousemove",Z:"RM",_:"mouseup",a:"jsx:///images/colorpicker/",aa:"eo",b:"d1arrow.gif",ba:"q3",c:"hue-v.png",ca:"_jsxoffsetx",d:"hue-h.png",da:"_jsxoffsety",e:"saturation-v.png",ea:"jsxchange",f:"saturation-h.png",fa:"px",g:"brightness-v.png",h:"string",i:"#",j:"0x",k:'id="',l:'" class="jsx30colorpicker" ',m:"mousedown",n:"Uq",o:"_eb1DMouseDown",p:"",q:"<span",r:' class="gradient" style="width:',s:"px;height:",t:"px;background-color:",u:';"></span>',v:"_1_v",w:"_1_h",x:"px;background-color:#FFFFFF;",y:'"></span>',z:"_2_v"};var
v=jsx3.gui.Interactive;var
jb=jsx3.gui.Block;var
Ma=jsx3.gui.Event;var
qa=jsx3.html;var
ba=qa.selectSingleElm;j.DEFAULT_WIDTH=324;j.DEFAULT_HEIGHT=300;j.HUE=1;j.SATURATION=2;j.BRIGHTNESS=3;j.ZO=16;j.Pu=8;j.hD=9;j.R5=9;var
Bb=ub.a;j.E5={_drag:jsx3.resolveURI(Bb+ub.b),_1_v:jsx3.resolveURI(Bb+ub.c),_1_h:jsx3.resolveURI(Bb+ub.d),_2_v:jsx3.resolveURI(Bb+ub.e),_2_h:jsx3.resolveURI(Bb+ub.f),_3_v:jsx3.resolveURI(Bb+ub.g)};for(var da in j.E5)qa.loadImages(j.E5[da]);q.init=function(f,s,n,d,a){this.jsxsuper(f,s,n,d,a);this.jsxrgb=16711680;this.jsxaxis=1;};q.getValue=function(){return this.jsxrgb;};q.setValue=function(n){var
ja=parseInt(n);if(!isNaN(ja)){this.setRGB(ja);}else if(typeof n==ub.h){if(n.indexOf(ub.i)==0)n=n.substring(1);ja=parseInt(ub.j+n);if(!isNaN(ja))this.setRGB(ja);else this.setRGB(0);}else this.setRGB(0);};q.doValidate=function(){var
ua=1;this.setValidationState(ua);return ua;};q.getRGB=function(){return this.jsxrgb;};q.getRgbAsHex=function(){return ub.j+(((16777216+(this.jsxrgb||Number(0))).toString(16)).substring(1)).toUpperCase();};q.setRGB=function(k){this.jsxrgb=Math.max(0,Math.min(k,16777215));this.XM(true,true);};q.getAxis=function(){return this.jsxaxis||1;};q.setAxis=function(p){this.jsxaxis=p;this.ce();return this;};q.setHSB=function(a,i,g){var
Q=j.HSBtoRGB(a,i,g);this.jsxrgb=(Q[0]<<16)+(Q[1]<<8)+Q[2];this.XM(true,true,[a,i,g]);};q.paint=function(){this.applyDynamicProperties();var
pa=j.RGBtoHSB(this.jsxrgb);var
Cb=j.HSBtoRGB(pa[0],1,1);var
oa=ub.i+j.T7(Cb[0],Cb[1],Cb[2]);var
G=this.renderAttributes(null,false);var
ra=this.getAxis();var
ya=this.Wl(true);ya.setAttributes(ub.k+this.getId()+ub.l+this.uj()+this.Rh()+this.di()+G+qa.pe);ya.setStyles(this.en()+this.qg()+this.Ne());var
R=ya.lg(0);var
ja=R.lg(0);ja.setAttributes(this.pi(ub.m,ub.n,2)+qa.pe);var
D=R.lg(1);D.setAttributes(this.pi(ub.m,ub.o,2)+qa.pe);var
sb=ub.p,fb=ub.p;var
ua=D.Nd(),bb=D.Qi();var
gb=ja.Nd(),Ga=ja.Qi();var
N=ub.q+qa.pe+ub.r;if(ra==1){sb=sb+(N+gb+ub.s+Ga+ub.t+oa+ub.u);fb=fb+this.d7(j.E5[ub.v],ua,bb);}else{sb=sb+this.d7(j.E5[ub.w],gb,Ga);fb=fb+(N+ua+ub.s+bb+ub.t+oa+ub.u);}if(ra==2){sb=sb+(N+gb+ub.s+Ga+ub.x+qa.getCSSOpacity(1-pa[1])+ub.y);fb=fb+this.d7(j.E5[ub.z],ua,bb);}else{sb=sb+this.d7(j.E5[ra==1?ub.A:ub.z],gb,Ga);fb=fb+(N+ua+ub.s+bb+ub.x+qa.getCSSOpacity(1-pa[1])+ub.y);}if(ra==3){sb=sb+(N+gb+ub.s+Ga+ub.B+qa.getCSSOpacity(1-pa[2])+ub.y);fb=fb+this.d7(j.E5[ub.C],ua,bb);}else{sb=sb+this.d7(j.E5[ub.C],gb,Ga);fb=fb+(N+ua+ub.s+bb+ub.B+qa.getCSSOpacity(1-pa[2])+ub.y);}sb=sb+(N+gb+ub.s+Ga+ub.D);fb=fb+(N+ua+ub.s+bb+ub.D);var
Ya=ja.lg(0);sb=sb+(Ya.paint()).join(((Ya.lg(0)).paint()).join(ub.p));var
Ca=R.lg(2);Ca.setAttributes(this.pi(ub.m,ub.E,2)+qa.pe);return (ya.paint()).join((R.paint()).join((ja.paint()).join(sb)+(D.paint()).join(fb)+(Ca.paint()).join(ub.F+j.E5[ub.G]+ub.H+N+ub.I)+ub.J));};q.Vm=function(s){var
Ka=jsx3.gui.Painted.Box;if(this.getParent()&&(s==null||isNaN(s.parentwidth)||isNaN(s.parentheight))){s=(this.getParent()).ng(this);}else if(s==null)s={};var
Za=this.getRelativePosition()!=0;var
ib=Za?null:this.getLeft();var
Oa=Za?null:this.getTop();var
La=j.RGBtoHSB(this.jsxrgb);var
wb=this.Kr(La);if(!s.boxtype)s.boxtype=Za?ub.K:ub.L;s.tagname=ub.M;if(s.left==null&&ib!=null)s.left=ib;if(s.top==null&&Oa!=null)s.top=Oa;s.width=this.getWidth()||j.DEFAULT_WIDTH;s.height=this.getHeight()||j.DEFAULT_HEIGHT;var
V=new
Ka(s);var
O=V.Nd();var
ka=V.Qi();var
Ib=new
Ka({tagname:ub.N,boxtype:ub.O,height:ka,width:O});V.bl(Ib);var
H={tagname:ub.M,boxtype:ub.L,left:0,top:0,width:O-j.ZO-j.Pu,height:ub.P,border:this.getBorder(),parentwidth:O,parentheight:ka};var
ob=new
Ka(H);ob.setStyles(ub.Q);Ib.bl(ob);H={tagname:ub.M,boxtype:ub.L,left:O-j.ZO,top:0,width:j.ZO,height:ub.P,border:this.getBorder(),parentwidth:O,parentheight:ka};var
P=new
Ka(H);P.setStyles(ub.R);Ib.bl(P);var
fb=Math.round(wb[1]*(ob.Nd()-1))-Math.floor(j.R5/2);var
bb=Math.round(wb[2]*(ob.Qi()-1))-Math.floor(j.R5/2);H={tagname:ub.M,boxtype:ub.L,left:fb,top:bb,width:j.R5,height:j.R5,border:ub.S};var
A=new
Ka(H);A.setStyles(ub.T);var
Gb=new
Ka({tagname:ub.M,boxtype:ub.L,left:0,top:0,width:j.R5-2,height:j.R5-2,border:ub.U});Gb.setStyles(ub.T);A.bl(Gb);ob.bl(A);bb=Math.round(wb[0]*(P.Qi()-1))-Math.floor(j.hD/2)+P.ll();H={tagname:ub.M,boxtype:ub.L,left:O-j.ZO-5,top:bb,width:6,height:j.hD};var
ga=new
Ka(H);ga.setStyles(ub.R);Ib.bl(ga);return V;};q.Rc=function(d,a,n){this.ag(d,a,n,1);};q.Zo=function(s){switch(this.getAxis()){case 1:return [1-s[0],s[1],1-s[2]];case 2:return [1-s[1],1-s[0],1-s[2]];case 3:return [1-s[1],1-s[2],1-s[0]];default:throw new
jsx3.Exception();}};q.Kr=function(i){switch(this.getAxis()){case 1:return [1-i[0],i[1],1-i[2]];case 2:return [1-i[1],1-i[0],1-i[2]];case 3:return [1-i[2],1-i[0],1-i[1]];default:throw new
jsx3.Exception();}};q.d7=function(p,c,r){if(jsx3.CLASS_LOADER.IE6){return ub.q+qa.pe+ub.r+c+ub.s+r+ub.V+qa.getCSSPNG(p)+ub.y;}else return ub.F+p+ub.W+qa.pe+ub.r+c+ub.s+r+ub.X;};q.nL=function(f,g){Ma.unsubscribe(ub.Y,this);Ma.subscribe(ub.Y,this,ub.Z);Ma.subscribe(ub._,this,ub.aa);};q._eb1DMouseDownPt=function(h,e){var
Wa=qa.getRelativePosition(e.parentNode,e);this._jsxoffsety=h.getTrueY()-h.getOffsetY()-Math.max(-3,Wa.T);this.nL(h,e);};q._eb1DMouseDown=function(n,r){var
Lb=qa.getRelativePosition(r,n.srcElement());this._jsxoffsety=n.getTrueY()-n.getOffsetY()-Math.max(0,Lb.T);this.nL(n,r);this.T3(n,(n.getOffsetY()+Lb.T)/(r.offsetHeight-1),null,null);};q.Uq=function(p,i){Ma.unsubscribe(ub.Y,this);Ma.subscribe(ub.Y,this,ub.ba);Ma.subscribe(ub._,this,ub.aa);var
Fb=qa.getRelativePosition(i,p.srcElement());this._jsxoffsetx=p.getTrueX()-p.getOffsetX()-Math.max(0,Fb.L);this._jsxoffsety=p.getTrueY()-p.getOffsetY()-Math.max(0,Fb.T);this.T3(p,null,(p.getOffsetX()+Fb.L)/(i.offsetWidth-1),(p.getOffsetY()+Fb.T)/(i.offsetHeight-1));};q.RM=function(c){c=c.event;var
mb=c.getTrueY()-this._jsxoffsety;var
na=ba(this.getRendered(c),0,1);mb=Math.max(0,Math.min(na.offsetHeight-1,mb));this.T3(c,mb/(na.offsetHeight-1),null,null);};q.q3=function(i){i=i.event;var
Sa=i.getTrueX()-this._jsxoffsetx;var
ja=i.getTrueY()-this._jsxoffsety;var
nb=ba(this.getRendered(i),0,0);Sa=Math.max(0,Math.min(nb.offsetWidth-1,Sa));ja=Math.max(0,Math.min(nb.offsetHeight-1,ja));this.T3(i,null,Sa/(nb.offsetWidth-1),ja/(nb.offsetHeight-1));};q.eo=function(s){Ma.unsubscribe(ub.Y,this);Ma.unsubscribe(ub._,this);delete this[ub.ca];delete this[ub.da];};q.T3=function(r,m,l,k){var
ja=this.Kr(j.RGBtoHSB(this.jsxrgb));if(m!=null)ja[0]=m;if(l!=null)ja[1]=l;if(k!=null)ja[2]=k;var
Ra=this.Zo(ja);var
rb=j.HSBtoRGB(Ra[0],Ra[1],Ra[2]);this.jsxrgb=(rb[0]<<16)+(rb[1]<<8)+rb[2];this.XM(m!=null,l!=null||k!=null,Ra);this.doEvent(ub.ea,{objEVENT:r,intRGB:this.jsxrgb,_gipp:1});};q.XM=function(d,k,o){var
H=this.getRendered();if(H!=null){if(o==null)o=j.RGBtoHSB(this.jsxrgb);var
Mb=j.HSBtoRGB(o[0],1,1);var
_a=this.getAxis();var
eb=this.Kr(o);if(d){switch(_a){case 1:(ba(H,0,0,0)).style.backgroundColor=ub.i+j.T7(Mb[0],Mb[1],Mb[2]);break;case 2:qa.updateCSSOpacity(ba(H,0,0,1),1-o[1]);break;case 3:qa.updateCSSOpacity(ba(H,0,0,2),1-o[2]);break;default:throw new
jsx3.Exception();}var
Za=ba(H,0,2);var
xb=((this.Wl(true)).lg(0)).lg(1);Za.style.top=Math.round(eb[0]*(xb.Qi()-1))-Math.floor(j.hD/2)+xb.ll()+ub.fa;}if(k){switch(_a){case 1:qa.updateCSSOpacity(ba(H,0,1,1),1-o[1]);qa.updateCSSOpacity(ba(H,0,1,2),1-o[2]);break;case 2:(ba(H,0,1,0)).style.backgroundColor=ub.i+j.T7(Mb[0],Mb[1],Mb[2]);qa.updateCSSOpacity(ba(H,0,1,2),1-o[2]);break;case 3:(ba(H,0,1,0)).style.backgroundColor=ub.i+j.T7(Mb[0],Mb[1],Mb[2]);qa.updateCSSOpacity(ba(H,0,1,1),1-o[1]);break;default:throw new
jsx3.Exception();}var
Ca=ba(H,0,0,4);var
xb=((this.Wl(true)).lg(0)).lg(0);Ca.style.left=Math.round(eb[1]*(xb.Nd()-1))-Math.floor(j.R5/2)+ub.fa;Ca.style.top=Math.round(eb[2]*(xb.Qi()-1))-Math.floor(j.R5/2)+ub.fa;}}};j.HSBtoRGB=function(f,n,b){var
Va=0,ka=0,cb=0,Pa;f=360*(f-Math.floor(f));var
ya=255*b;var
Za=ya*n;var
Z=ya-Za;if(f>=300||f<60){if(f>=300)f=f-360;Va=ya;Pa=f*Za/60;if(Pa<0){ka=Z;cb=ka-Pa;}else{cb=Z;ka=cb+Pa;}}else if(f>=60&&f<180){ka=ya;Pa=(f-120)*Za/60;if(Pa<0){cb=Z;Va=cb-Pa;}else{Va=Z;cb=Va+Pa;}}else if(f>=180&&f<300){cb=ya;Pa=(f-240)*Za/60;if(Pa<0){Va=Z;ka=Va-Pa;}else{ka=Z;Va=ka+Pa;}}return [Math.round(Va),Math.round(ka),Math.round(cb)];};j.RGBtoHSB=function(l,d,i){if(arguments.length==1){i=l&255;d=(l&65280)>>8;l=(l&16711680)>>16;}var
M=0,Fa=1,tb=1;var
S=l>d?l:d;if(i>S)S=i;var
cb=l<d?l:d;if(i<cb)cb=i;tb=S/255;if(S!=0)Fa=(S-cb)/S;else Fa=0;if(Fa==0){M=0;}else{var
L=(S-l)/(S-cb);var
Na=(S-d)/(S-cb);var
Ia=(S-i)/(S-cb);if(l==S)M=Ia-Na;else if(d==S)M=2+L-Ia;else M=4+Na-L;M=M/6;if(M<0)M=M+1;}return [M,Fa,tb];};j.T7=function(l,d,i){return ((16777216+(l<<16)+(d<<8)+i).toString(16)).substring(1);};});
