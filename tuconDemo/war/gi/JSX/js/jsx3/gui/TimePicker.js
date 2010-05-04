/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Form","jsx3.gui.Block","jsx3.util.NumberFormat");jsx3.Class.defineClass("jsx3.gui.TimePicker",jsx3.gui.Block,[jsx3.gui.Form],function(f,m){var
ub={A:"inline",Aa:"MS",B:"input[text]",Ba:"jsxchange",C:"1 1 0 0",Ca:"jsxblur",D:"solid 0px;solid 0px;solid 0px;solid 0px",Da:"_jsxj2",E:"0",Ea:"_jsxhI",F:"solid 0px;solid 0px;solid 0px;solid 1px #d8d8e5",Fa:"jsxfocus",G:"keydown",Ga:/^(?:display|margin|left|top|position|backgroundColor|visibility|zIndex)$/,H:"zy",Ha:"int",I:"blur",Ia:"native",J:"c0",K:"focus",L:"P3",M:"mousewheel",N:"wy",O:'id="',P:'" class="jsx30timepicker" ',Q:"background-color:",R:";",S:"text-align:right;width:",T:"px;top:0px;height:",U:"px;position:absolute;",V:"hour",W:"minute",X:' class="fields"',Y:' jsxfield="hour" size="2" maxlength="2" value="',Z:'"',_:' jsxfield="minute" size="2" maxlength="2" value="',a:"jsx:///images/jsxtimepicker/spin_up.gif",aa:'<div style="',b:"jsx:///images/jsxtimepicker/spin_down.gif",ba:"left:",c:"00",ca:'px;">',d:"000",da:"</div>",e:"time.24hour",ea:"second",f:"HH",fa:' jsxfield="second" size="2" maxlength="2" value="',g:"h",ga:"milli",h:"time.sep.hour-min",ha:' jsxfield="milli" size="3" maxlength="3" value="',i:"mm",ia:"time.ampm",j:"time.sep.min-sec",ja:' jsxfield="ampm" size="2" maxlength="2" value="',k:"ss",ka:"position:absolute;left:",l:"time.sep.sec-milli",la:"cursor:pointer;",m:"SSS",ma:' class="spinner"',n:"time.sep.ampm",na:"<img",o:"a",oa:' style="top:0px;left:0px;position:absolute;',p:"number",pa:'" width="11" height="8" src="',q:"1/1/1970 ",qa:"click",r:"input",ra:"V3",s:"jsxfield",sa:"mousedown",t:"",ta:"YO",u:"width",ua:"/>",v:"relativebox",va:' style="top:8px;left:0px;position:absolute;',w:"box",wa:"c2",x:"span",xa:"&#160;",y:"solid 1px #9898a5;solid 1px #d8d8e5;solid 1px #d8d8e5;solid 1px #9898a5",ya:"ampm",z:"div",za:"U7"};var
db=jsx3.gui.Event;var
M=jsx3.gui.Interactive;f.SPINNER_UP=jsx3.resolveURI(ub.a);f.SPINNER_DOWN=jsx3.resolveURI(ub.b);jsx3.html.loadImages(f.SPINNER_UP,f.SPINNER_DOWN);f.dU=new
jsx3.util.NumberFormat(ub.c);f.VP=new
jsx3.util.NumberFormat(ub.d);m.jsxshowsecs=0;m.jsxshowmillis=0;m.jsx24hour=null;m.init=function(s,p,l,c){this.jsxsuper(s,p,l,0,c);this.jsxhours=0;this.jsxminutes=0;this.jsxseconds=0;this.jsxmillis=0;};m.getShowSeconds=function(){return this.jsxshowsecs!=null?this.jsxshowsecs:m.jsxshowsecs;};m.getShowMillis=function(){return this.jsxshowmillis!=null?this.jsxshowmillis:m.jsxshowmillis;};m.is24Hour=function(){return this.jsx24hour!=null?this.jsx24hour:this._getLocaleProp(ub.e);};m.setFontSize=function(p){this.jsxsuper(p);this.ce();return this;};m.setShowSeconds=function(c){this.jsxshowsecs=jsx3.Boolean.valueOf(c);this.ce();return this;};m.setShowMillis=function(g){this.jsxshowmillis=jsx3.Boolean.valueOf(g);this.ce();return this;};m.set24Hour=function(c){this.jsx24hour=c!=null?jsx3.Boolean.valueOf(c):null;this.ce();return this;};m.getHours=function(){return this.jsxhours||Number(0);};m.setHours=function(s){this.jsxhours=Math.max(0,Math.min(23,s));this.jU();};m.getMinutes=function(){return this.jsxminutes||Number(0);};m.setMinutes=function(a){this.jsxminutes=Math.max(0,Math.min(59,a));this.jU();};m.getSeconds=function(){return this.jsxseconds||Number(0);};m.setSeconds=function(j){this.jsxseconds=Math.max(0,Math.min(59,j));this.jU();};m.getMilliseconds=function(){return this.jsxmillis||Number(0);};m.setMilliseconds=function(g){this.jsxmillis=Math.max(0,Math.min(999,g));this.jU();};m.getDate=function(b){if(this.jsxhours==null&&this.jsxminutes==null)return null;if(b==null)b=new
Date();b.setHours(this.jsxhours);b.setMinutes(this.jsxminutes);b.setSeconds(this.jsxseconds||Number(0));b.setMilliseconds(this.jsxmillis||Number(0));return b;};m.Dr=function(g,b,o,c){if(g==null)g=this.jsxhours;if(b==null)b=this.jsxminutes;if(o==null)o=this.jsxseconds;if(c==null)c=this.jsxmillis;return [g,b,o,c];};m.tF=function(q){this.jsxhours=q[0];this.jsxminutes=q[1];this.jsxseconds=q[2];this.jsxmillis=q[3];};f._dateArrToDate=function(c){if(c[0]==null||c[1]==null)return null;var
Fa=new
Date();Fa.setHours(c[0]);Fa.setMinutes(c[1]);Fa.setSeconds(c[2]||Number(0));Fa.setMilliseconds(c[3]||Number(0));return Fa;};m.getValue=function(){var
_a=(this.is24Hour()?ub.f:ub.g)+this._getLocaleProp(ub.h)+ub.i;if(this.getShowSeconds()){_a=_a+(this._getLocaleProp(ub.j)+ub.k);if(this.getShowMillis())_a=_a+(this._getLocaleProp(ub.l)+ub.m);}if(!this.is24Hour())_a=_a+(this._getLocaleProp(ub.n)+ub.o);return (new
jsx3.util.DateFormat(_a)).format(this.getDate());};m.setValue=function(n){if(n instanceof Date){this.setDate(n);}else if(typeof n==ub.p){var
va=new
Date();va.setTime(n);this.setDate(va);}else if(n&&!jsx3.util.strEmpty(n)){this.setDate(new
Date(ub.q+n));}else this.setDate(null);return this;};m.setDate=function(c){if(c==null){this.jsxhours=this.jsxminutes=this.jsxseconds=this.jsxmillis=null;}else{this.jsxhours=c.getHours();this.jsxminutes=c.getMinutes();this.jsxseconds=c.getSeconds();this.jsxmillis=c.getMilliseconds();}this.jU();};m.jU=function(){var
mb=this.getRendered();if(mb!=null){var
Fa=mb.childNodes[0].childNodes;for(var
ya=0;ya<Fa.length;ya++){var
u=Fa[ya];if(u.tagName&&u.tagName.toLowerCase()==ub.r&&u.getAttribute(ub.s)){var
Xa=f.xw[u.getAttribute(ub.s)];var
O=Xa.o0(this);u.value=O!=null?Xa.XY(this,O):ub.t;}}}};m.Rc=function(n,k,d){if(k){delete n[ub.u];var
ba=this.Wl(true,n);var
K=ba.recalculate(n,k,d);if(!K.w&&!K.h)return;var
U=ba.lg(0);var
ab=k.childNodes[0];U.recalculate({height:ba.Qi()},ab,d);var
ja=U.lg(0);ja.recalculate({height:U.Qi()},ab.childNodes[0],d);var
yb=U.lg(1);yb.recalculate({height:U.Qi()},ab.childNodes[2],d);var
Y=2;if(this.jsxshowsecs){Y=Y+2;var
_a=U.lg(2);_a.recalculate({height:U.Qi()},ab.childNodes[Y],d);if(this.jsxshowsecs&&this.jsxshowmillis){Y=Y+2;var
ka=U.lg(3);ka.recalculate({height:U.Qi()},ab.childNodes[Y],d);}}if(!this.is24Hour()){Y=Y+2;var
ha=U.lg(4);ha.recalculate({height:U.Qi()},ab.childNodes[Y],d);}var
I=U.lg(5);Y++;I.recalculate({height:U.Qi()},ab.childNodes[Y],d);}};m.Vm=function(a){if(this.getParent()&&(a==null||isNaN(a.parentwidth)||isNaN(a.parentheight))){a=(this.getParent()).ng(this);}else if(a==null)a={};var
Ya=Math.round((this.getFontSize()||jsx3.gui.Block.DEFAULTFONTSIZE)*3/4);var
ya=Ya;var
gb=Ya*2;var
qb=Math.round(Ya*2.2);var
cb=Ya*3;var
V=this.getRelativePosition()!=0&&(!this.getRelativePosition()||this.getRelativePosition()==1);var
vb=V?null:this.getLeft();var
Ab=V?null:this.getTop();if(!a.boxtype)a.boxtype=V?ub.v:ub.w;a.tagname=ub.x;if(V&&this.getMargin())a.margin=this.getMargin();if(a.left==null&&vb!=null)a.left=vb;if(a.top==null&&Ab!=null)a.top=Ab;if(a.height==null&&this.getHeight())a.height=this.getHeight();var
oa;if((oa=this.getBorder())!=null&&oa!=ub.t){a.border=oa;}else a.border=ub.y;var
Kb;if((Kb=this.getPadding())!=null&&Kb!=ub.t)a.padding=Kb;var
hb=new
jsx3.gui.Painted.Box(a);var
Ea={};Ea.tagname=ub.z;Ea.boxtype=ub.A;Ea.height=hb.Qi();var
ja=new
jsx3.gui.Painted.Box(Ea);hb.bl(ja);var
vb=0;Ea={tagname:ub.B,empty:true,boxtype:ub.w,left:vb,top:0,padding:ub.C,width:gb,height:ja.Qi(),border:ub.D};ja.bl(new
jsx3.gui.Painted.Box(Ea));vb=vb+(gb+ya);Ea={tagname:ub.B,empty:true,boxtype:ub.w,left:vb,top:0,padding:ub.C,width:gb,height:ja.Qi(),border:ub.D};ja.bl(new
jsx3.gui.Painted.Box(Ea));vb=vb+(gb+ya);Ea={tagname:ub.B,empty:true,boxtype:ub.w,left:vb,top:0,padding:ub.C,width:gb,height:ja.Qi(),border:ub.D};ja.bl(new
jsx3.gui.Painted.Box(Ea));if(this.jsxshowsecs)vb=vb+(gb+ya);Ea={tagname:ub.B,empty:true,boxtype:ub.w,left:vb,top:0,padding:ub.C,width:cb,height:ja.Qi(),border:ub.D};ja.bl(new
jsx3.gui.Painted.Box(Ea));if(this.jsxshowsecs&&this.jsxshowmillis)vb=vb+(cb+ya);Ea={tagname:ub.B,empty:true,boxtype:ub.w,left:vb,top:0,padding:ub.C,width:qb,height:ja.Qi(),border:ub.D};ja.bl(new
jsx3.gui.Painted.Box(Ea));if(!this.is24Hour())vb=vb+qb;Ea={tagname:ub.x,boxtype:ub.w,left:vb,top:0,padding:ub.E,width:12,height:ja.Qi(),border:ub.F};ja.bl(new
jsx3.gui.Painted.Box(Ea));vb=vb+12;ja.recalculate({width:vb});hb.recalculate({width:vb+hb.getBorderWidth()});return hb;};m.paint=function(){this.applyDynamicProperties();var
ga=this.getEnabled()==1?this.getBackgroundColor():this.getDisabledBackgroundColor();var
Na=this.getEnabled()==1?this.pi(ub.G,ub.H,2)+this.pi(ub.I,ub.J,2)+this.pi(ub.K,ub.L,2)+this.pi(ub.M,ub.N,2):ub.t;Na=Na+(this.uj()+this.fe());var
V=this.Wl(true);V.setAttributes(ub.O+this.getId()+ub.P+this.Rh()+this.di()+this.Pj(null,0)+this.renderAttributes(null,true));V.setStyles(this.en()+this.qg()+this.Ne()+this.Ae()+(ga!=null?ub.Q+ga+ub.R:ub.t));var
Sa=Math.round((this.getFontSize()||jsx3.gui.Block.DEFAULTFONTSIZE)*3/4);var
Wa=this.Gd()+this._i()+this.wm()+this.ze();var
W=this.Gd()+this._i()+this.wm()+this.ze()+ub.S+Sa+ub.T+((V.lg(0)).lg(0)).Qi()+ub.U;var
lb=this.jsxhours!=null?f.xw[ub.V].XY(this,this.jsxhours):ub.t;var
fb=this.jsxminutes!=null?f.xw[ub.W].XY(this,this.jsxminutes):ub.t;var
Hb=V.lg(0);Hb.setAttributes(ub.X);var
sa=ub.t;var
Q=0;var
A=Hb.lg(0);A.setAttributes(Na+ub.Y+lb+ub.Z);A.setStyles(Wa);sa=sa+(A.paint()).join(ub.t);Q=Q+A.getPaintedWidth();var
Db=Hb.lg(1);Db.setAttributes(Na+ub._+fb+ub.Z);Db.setStyles(Wa);sa=sa+(ub.aa+W+ub.ba+Q+ub.ca+this._getLocaleProp(ub.h)+ub.da);sa=sa+(Db.paint()).join(ub.t);Q=Q+(Db.getPaintedWidth()+Sa);if(this.jsxshowsecs){var
ob=this.jsxseconds!=null?f.xw[ub.ea].XY(this,this.jsxseconds):ub.t;var
cb=Hb.lg(2);cb.setAttributes(Na+ub.fa+ob+ub.Z);cb.setStyles(Wa);sa=sa+(ub.aa+W+ub.ba+Q+ub.ca+this._getLocaleProp(ub.j)+ub.da);sa=sa+(cb.paint()).join(ub.t);Q=Q+(cb.getPaintedWidth()+Sa);if(this.jsxshowmillis){var
Nb=this.jsxmillis!=null?f.xw[ub.ga].XY(this,this.jsxmillis):ub.t;var
tb=Hb.lg(3);tb.setAttributes(Na+ub.ha+Nb+ub.Z);tb.setStyles(Wa);sa=sa+(ub.aa+W+ub.ba+Q+ub.ca+this._getLocaleProp(ub.l)+ub.da);sa=sa+(tb.paint()).join(ub.t);Q=Q+(tb.getPaintedWidth()+Sa);}}if(!this.is24Hour()){var
wa=this.jsxhours!=null?(this._getLocaleProp(ub.ia))[this.jsxhours<12?0:1]:ub.t;var
ha=Hb.lg(4);ha.setAttributes(Na+ub.ja+wa+ub.Z);ha.setStyles(Wa);sa=sa+(ub.aa+W+ub.ka+Q+ub.ca+this._getLocaleProp(ub.n)+ub.da);sa=sa+(ha.paint()).join(ub.t);}var
Cb=Hb.lg(5);var
_=this.getEnabled()==1?ub.la:ub.t;Cb.setAttributes(jsx3.html.pe+ub.ma);var
ta=ub.na+jsx3.html.pe+ub.oa+_+ub.pa+f.SPINNER_UP+ub.Z+this.pi(ub.qa,ub.ra,3)+this.pi(ub.sa,ub.ta,3)+ub.ua+ub.na+jsx3.html.pe+ub.va+_+ub.pa+f.SPINNER_DOWN+ub.Z+this.pi(ub.qa,ub.wa,3)+this.pi(ub.sa,ub.ta,3)+ub.ua;return (V.paint()).join((Hb.paint()).join(sa+(Cb.paint()).join(ta)+ub.xa));};f.xw={hour:{U7:function(e,a){if(isNaN(a))a=e.is24Hour()?-1:0;else a=Number(a);return e.is24Hour()?(a+1)%24:a%12+1;},MS:function(k,n){if(isNaN(n))n=k.is24Hour()?23:12;else n=Number(n);return k.is24Hour()?jsx3.util.numMod(n-1,24):jsx3.util.numMod(n-2,12)+1;},XY:function(q,h){if(h==null)return ub.t;return q.is24Hour()?f.dU.format(h):(jsx3.util.numMod(h-1,12)+1).toString();},s1:function(o,j){var
z=null;if(j==null||j===ub.t){}else if(isNaN(j)){z=0;}else if(o.is24Hour()||j==null){z=Number(j);}else{j=Number(j);var
Za=o._getLocaleProp(ub.ia);var
ua=o.vY(ub.ya);if(ua!=null&&ua.value!=null&&ua.value.toLowerCase()==Za[1].toLowerCase())z=j==12?j:j+12;else z=j==12?0:j;}return o.Dr(z);},o0:function(h){if(h.is24Hour()||h.jsxhours==null){return h.jsxhours;}else return jsx3.util.numMod(h.jsxhours-1,12)+1;},LA:function(d){return d.vY(ub.W);},bL:function(j){return null;},AM:function(q,e,s,n){if(!(s>=48&&s<=57)||n)return true;var
Kb=e.value;jsx3.sleep(function(){if(q.getParent()==null)return;var
zb=e.value;if(Kb==zb)e.value=zb=String.fromCharCode(s);var
oa=Number(e.value);if(!isNaN(oa)){if(oa>(q.is24Hour()?23:12)){e.value=String.fromCharCode(s);oa=Number(e.value);}if(oa>(q.is24Hour()?2:1))jsx3.html.focus(this.LA(q));}},null,this);}},minute:{U7:function(l,n){return ((Number(n)||0)+1)%60;},MS:function(c,k){return jsx3.util.numMod((isNaN(k)?60:Number(k))-1,60);},XY:function(r,g){return g==null?ub.t:f.dU.format(g);},s1:function(a,s){return a.Dr(null,Number(s)||0);},o0:function(a){return a.jsxminutes;},LA:function(r){return r.vY(r.jsxshowsecs?ub.ea:ub.ya);},bL:function(i){return i.vY(ub.V);},AM:function(j,h,c,q){if(!(c>=48&&c<=57)||q)return true;var
Fa=h.value;jsx3.sleep(function(){if(j.getParent()==null)return;var
ua=h.value;if(Fa==ua)h.value=ua=String.fromCharCode(c);var
sa=Number(h.value);if(!isNaN(sa)){if(sa>=60){h.value=String.fromCharCode(c);sa=Number(h.value);}if(sa>=6){var
pb=this.LA(j);if(pb)jsx3.html.focus(pb);}}},null,this);}},second:{U7:function(r,g){return ((Number(g)||0)+1)%60;},MS:function(i,p){return jsx3.util.numMod((isNaN(p)?60:Number(p))-1,60);},XY:function(e,a){return a==null?ub.t:f.dU.format(a);},s1:function(g,r){return g.Dr(null,null,Number(r)||0);},o0:function(k){return k.jsxseconds;},LA:function(b){return b.vY(b.jsxshowmillis?ub.ga:ub.ya);},bL:function(q){return q.vY(ub.W);},AM:function(e,k,h,c){return f.xw[ub.W].AM.call(this,e,k,h,c);}},milli:{U7:function(a,s){return ((Number(s)||0)+1)%1000;},MS:function(o,j){return jsx3.util.numMod((isNaN(j)?1000:Number(j))-1,1000);},XY:function(q,h){return h==null?ub.t:f.VP.format(h);},s1:function(q,l){return q.Dr(null,null,null,Number(l)||0);},o0:function(i){return i.jsxmillis;},LA:function(s){return s.vY(ub.ya);},bL:function(i){return i.vY(ub.ea);},AM:function(k,g,b,p){if(!(b>=48&&b<=57)||p)return true;var
pa=g.value;jsx3.sleep(function(){if(k.getParent()==null)return;var
H=g.value;if(pa==H)g.value=H=String.fromCharCode(b);var
qb=Number(g.value);if(!isNaN(qb))if(H.length==3){var
Aa=this.LA(k);if(Aa)jsx3.html.focus(Aa);}},null,this);}},ampm:{U7:function(b,d){var
Cb=b._getLocaleProp(ub.ia);return d!=null&&d.toLowerCase()==Cb[0].toLowerCase()?Cb[1]:Cb[0];},MS:function(a,s){var
Ha=a._getLocaleProp(ub.ia);return s!=null&&s.toLowerCase()==Ha[1].toLowerCase()?Ha[0]:Ha[1];},XY:function(d,b){return b;},s1:function(s,j){var
wb=s._getLocaleProp(ub.ia);var
aa=Number((s.vY(ub.V)).value);var
Nb=null;if(!isNaN(aa))if(j!=null&&j.toLowerCase()==wb[1].toLowerCase())Nb=aa==12?aa:aa+12;else Nb=aa==12?0:aa;return s.Dr(Nb);},o0:function(r){return (r._getLocaleProp(ub.ia))[r.jsxhours<12?0:1];},LA:function(q){return null;},bL:function(q){return q.vY(q.jsxshowsecs?q.jsxshowmillis?ub.ga:ub.ea:ub.W);},AM:function(a,q,l,g){var
za=String.fromCharCode(l);var
Y=a._getLocaleProp(ub.ia);for(var
R=0;R<Y.length;R++)if(za==(Y[R].charAt(0)).toUpperCase()){q.value=Y[R];break;}return true;}}};m.zy=function(e,h){if(e.hasModifier(true)||e.isModifierKey())return;var
Ab=h.getAttribute(ub.s);var
Da=f.xw[Ab];var
ea=e.keyCode();if(ea>=96&&ea<=105)ea=ea+(48-96);if(ea==38||ea==40){var
Ta=ea==38?ub.za:ub.Aa;var
Ha=Da[Ta](this,h.value);var
Ra=Da.s1(this,Ha);if(this.doEvent(ub.Ba,{objEVENT:e,strFIELD:Ab,newDATE:f._dateArrToDate(Ra),_gipp:1})!==false){h.value=Da.XY(this,Ha);this.tF(Ra);}}else if(ea==9||ea==13){var
qa=e.shiftKey()?Da.bL(this):Da.LA(this);if(qa==null)return;jsx3.html.focus(qa);}else if(ea>=48&&ea<=57||ea>=65&&ea<=90){var
lb=Da.AM(this,h,ea,e.shiftKey());if(!lb)return;}else if(e.isArrowKey()||e.isFunctionKey()||e.escapeKey()||ea==8||ea==46){return;}else{}e.cancelAll();};m.c0=function(p,i){this.doEvent(ub.Ca,{objEVENT:p});var
la=i.getAttribute(ub.s);var
sa=f.xw[la];var
ga=sa.o0(this);var
Ca=jsx3.util.numIsNaN(i.value)?jsx3.util.strEmpty(i.value)?null:i.value:Number(i.value);if(ga!==Ca){var
ib=sa.s1(this,Ca);if(this.doEvent(ub.Ba,{objEVENT:p,strFIELD:la,newDATE:f._dateArrToDate(ib),_gipp:1})!==false){this.tF(ib);if(Ca!=null)i.value=sa.XY(this,sa.o0(this));}else i.value=sa.XY(this,ga);}else i.value=sa.XY(this,ga);var
V=this;this._jsxj2=window.setTimeout(function(){delete V[ub.Da];delete V[ub.Ea];},0);};m.P3=function(l,a){this.doEvent(ub.Fa,{objEVENT:l});if(this._jsxj2){window.clearTimeout(this._jsxj2);delete this[ub.Da];}this._jsxhI=a.getAttribute(ub.s);};m.wy=function(i,d){var
Da=i.getWheelDelta();if(Da!=0){var
ya=d.getAttribute(ub.s);var
nb=f.xw[ya];var
w=Da>0?ub.za:ub.Aa;var
Ia=nb[w](this,d.value);var
aa=nb.s1(this,Ia);if(this.doEvent(ub.Ba,{objEVENT:i,strFIELD:ya,newDATE:f._dateArrToDate(aa),_gipp:1})!==false){d.value=nb.XY(this,Ia);this.tF(aa);}}i.cancelAll();};m.YO=function(i,d){db.publish(i);i.cancelAll();};m.V3=function(a,l){this.cq(a,l,ub.za);};m.c2=function(j,c){this.cq(j,c,ub.Aa);};m.cq=function(l,a,j){if(this.getEnabled()!=1)return;var
pa=this._jsxhI||ub.V;var
_=this.vY(pa);var
Ja=f.xw[pa];var
sb=Ja[j](this,_.value);var
V=Ja.s1(this,sb);if(this.doEvent(ub.Ba,{objEVENT:l,strFIELD:pa,newDATE:f._dateArrToDate(V),_gipp:1})!==false){_.value=Ja.XY(this,sb);this.tF(V);if(this._jsxhI==null)jsx3.html.focus(_);}};m.vY=function(r){var
C=this.getRendered();if(C!=null){var
ha=C.childNodes[0].childNodes;for(var
rb=0;rb<ha.length;rb++){var
la=ha[rb];if(la.getAttribute&&la.getAttribute(ub.s)==r)return la;}}return null;};m.updateGUI=function(o,r){if(o.search(ub.Ga)==0){this.jsxsuper(o,r);}else this.repaint();};m.emSetValue=function(e){var
nb=this.emGetSession();var
Ca=null;if(jsx3.util.strEmpty(e)){nb.datetype=ub.Ha;}else if(!isNaN(e)&&!isNaN(parseInt(e))){Ca=new
Date();Ca.setTime(parseInt(e));nb.datetype=ub.Ha;}else{Ca=new
Date(e);if(isNaN(Ca)){Ca=null;}else nb.datetype=ub.Ia;}nb.olddate=Ca;this.setDate(Ca);};m.emGetValue=function(){var
La=this.emGetSession();var
E=this.getDate();var
Lb=(this.emGetSession()).datetype||ub.t;if(E==null)return null;switch(Lb){case ub.Ia:return E.toString();default:return (E.getTime()).toString();}};m.emFocus=function(){var
fb=this.getRendered();if(fb)fb.childNodes[0].childNodes[0].focus();};m.doValidate=function(){var
ka=this.getDate()!=null||this.getRequired()==0?1:0;this.setValidationState(ka);return ka;};});
