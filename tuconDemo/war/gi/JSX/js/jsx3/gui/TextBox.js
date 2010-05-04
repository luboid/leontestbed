/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.TextBox",jsx3.gui.Block,[jsx3.gui.Form],function(d,m){var
ub={A:"textarea",B:"inline",C:"box",D:"2 0 0 2",E:"solid 1px #a6a6af;solid 1px #e6e6e6;solid 1px #e6e6e6;solid 1px #a6a6af",F:"keypress",G:"jsxkeydown",H:"keydown",I:"keyup",J:"blur",K:"jsxfocus",L:"focus",M:"jsxdblclick",N:"dblclick",O:"jsxclick",P:"click",Q:"jsxmousedown",R:"mousedown",S:"jsxmousewheel",T:"mousewheel",U:' id="',V:'"',W:' value="',X:'" class="',Y:'" ',Z:' class="',_:"overflow:",a:"",aa:";",b:"auto",ba:' wrap="',c:"scroll",ca:"virtual",d:"#ffffff",da:"off",e:"none",ea:"background-color:",f:"ssn",fa:' type="',g:"phone",ga:"text",h:"email",ha:"password",i:"number",ia:' maxlength="',j:"letter",ja:" ",k:"uszip",ka:' readonly="readonly" ',l:"jsx30textbox",la:"string",m:/[\s\S]*/,ma:"#FFFF66",n:/^\d{3}-\d{2}-\d{4}$/,na:"3.0.00",o:/^[0-9\-\(\) ]+$/,oa:"1;",p:/([a-zA-Z0-9_~\-\.]+)@([a-zA-Z0-9]+)\.[a-zA-Z0-9]{2,}/,pa:"jS",q:/^\d+$/,r:/^[a-zA-Z ,-\.]+$/,s:/^\d{5}(-\d{4})?$/,t:"jsxexecute",u:"jsxkeypress",v:"jsxchange",w:"jsxkeyup",x:"jsxincchange",y:"input[text]",z:"input[password]"};var
ga=jsx3.gui.Event;var
F=jsx3.gui.Interactive;d.TYPETEXT=0;d.TYPETEXTAREA=1;d.TYPEPASSWORD=2;d.WRAPYES=1;d.WRAPNO=0;d.OVERFLOWNORMAL=ub.a;d.OVERFLOWAUTO=ub.b;d.OVERFLOWSCROLL=ub.c;jsx3.gui.TextBox.DEFAULTBACKGROUNDCOLOR=ub.d;d.VALIDATIONNONE=ub.e;d.VALIDATIONSSN=ub.f;d.VALIDATIONPHONE=ub.g;d.VALIDATIONEMAIL=ub.h;d.VALIDATIONNUMBER=ub.i;d.VALIDATIONLETTER=ub.j;d.VALIDATIONUSZIP=ub.k;d.DEFAULTCLASSNAME=ub.l;d.zM={};d.zM[ub.e]=ub.m;d.zM[ub.f]=ub.n;d.zM[ub.g]=ub.o;d.zM[ub.h]=ub.p;d.zM[ub.i]=ub.q;d.zM[ub.j]=ub.r;d.zM[ub.k]=ub.s;m.init=function(p,i,a,n,k,r,c){this.jsxsuper(p,i,a,n,k);if(r!=null){this.setDefaultValue(r);this.setValue(r);}if(c!=null)this.setType(c);};m.Lh=function(q,o){if(q.enterKey()&&this.getEvent(ub.t)){this.doEvent(ub.t,{objEVENT:q});}else this.doEvent(ub.u,{objEVENT:q});};m.ah=function(o,q){this.jsxsupermix(o,q);var
Ea=this.parseValue(q.value);if(this.jsxvalue!==Ea){var
D=this.doEvent(ub.v,{objEVENT:o,strPREVIOUS:this.jsxvalue,strVALUE:Ea,_gipp:1});if(D===false){q.value=this.formatValue(this.jsxvalue);return;}else this.jsxvalue=Ea;}var
Z=this.formatValue(Ea);if(Z!=q.value)q.value=Z;};m.formatValue=function(c){if(c==null)return ub.a;return ub.a+c;};m.parseValue=function(k){return k;};m.mc=function(e,h){this.doEvent(ub.w,{objEVENT:e});if(this.getType()==1){var
vb=this.getMaxLength();if(vb>0){var
rb=h.value;if(rb&&rb.length>vb)h.value=rb.substring(0,vb);}}if(this.hasEvent(ub.x)){var
Y=this.parseValue(h.value);if(this._jsxYp!=Y){var
K=this.doEvent(ub.x,{objEVENT:e,strPREVIOUS:this._jsxYp,strVALUE:Y});if(K===false){h.value=this._jsxYp!=null?this._jsxYp:ub.a;}else this._jsxYp=h.value;}}};m.getMaxLength=function(){return this.jsxmaxlength!=null?this.jsxmaxlength:null;};m.setMaxLength=function(f){this.jsxmaxlength=f;return this;};m.getType=function(){return this.jsxtype==null?0:this.jsxtype;};m.setType=function(k){this.jsxtype=k;this.ce();return this;};m.getValue=function(){var
hb=this.getRendered();if(hb!=null){return this.parseValue(hb.value);}else return this.jsxvalue!=null?this.jsxvalue:this.getDefaultValue();};m.QQ=function(){var
Ca=this.getRendered();if(Ca)this.jsxvalue=this.parseValue(Ca.value);};m.kB=function(){return jsx3.util.strEscapeHTML(this.formatValue(this.jsxvalue));};m.ii=function(){return this.getText()?this.getText():ub.a;};m.getDefaultValue=function(){return this.ii();};m.setValue=function(s){this.jsxvalue=s;this._jsxYp=s;var
Ua=this.getRendered();if(Ua!=null)Ua.value=this.formatValue(s);return this;};m.setDefaultValue=function(i){this.setText(i);return this;};m.getWrap=function(){return this.jsxwrap==null?1:this.jsxwrap;};m.setWrap=function(e){this.jsxwrap=e;return this;};m.Rc=function(h,e,j){this.ag(h,e,j,3);};m.Vm=function(a){if(this.getParent()&&(a==null||isNaN(a.parentwidth)||isNaN(a.parentheight))){a=(this.getParent()).ng(this);}else if(a==null)a={};this.applyDynamicProperties();var
pa=this.getRelativePosition()!=0;var
da,Fa,Q,L,qb;var
bb=!pa&&!jsx3.util.strEmpty(this.getTop())?this.getTop():0;var
La=!pa&&!jsx3.util.strEmpty(this.getLeft())?this.getLeft():0;if(a.left==null)a.left=La;if(a.top==null)a.top=bb;if(a.width==null)a.width=this.getWidth();if(a.height==null)a.height=this.getHeight();var
Aa=this.getType();if(Aa==0){a.tagname=ub.y;a.empty=true;}else if(Aa==2){a.tagname=ub.z;a.empty=true;}else a.tagname=ub.A;if(!a.boxtype)a.boxtype=pa?ub.B:ub.C;a.padding=(da=this.getPadding())!=null&&da!=ub.a?da:ub.D;if(a.tagname!=ub.A)a.margin=pa&&(Fa=this.getMargin())!=null&&Fa!=ub.a?Fa:null;a.border=(Q=this.getBorder())!=null&&Q!=ub.a?Q:ub.E;var
Lb=new
jsx3.gui.Painted.Box(a);return Lb;};m.paint=function(){this.applyDynamicProperties();this.QQ();var
tb=this.getId();var
Xa=this.getType();var
Lb={};if(this.hasEvent(ub.t)||this.hasEvent(ub.u))Lb[ub.F]=true;if(this.hasEvent(ub.G))Lb[ub.H]=true;if(this.hasEvent(ub.w)||this.hasEvent(ub.x)||this.getType()==1&&this.getMaxLength()>0){Lb[ub.I]=true;this._jsxYp=this.getValue();}Lb[ub.J]=true;if(this.hasEvent(ub.K))Lb[ub.L]=true;if(this.hasEvent(ub.M))Lb[ub.N]=true;if(this.hasEvent(ub.O))Lb[ub.P]=true;if(this.hasEvent(ub.Q))Lb[ub.R]=true;if(this.hasEvent(ub.S))Lb[ub.T]=true;var
W=this.Pj(Lb,0);var
va=this.renderAttributes(null,true);var
ma=this.wm()+this.ze()+this._i()+this.qg()+this.Ne()+this.en()+this.Uc()+this.ti()+this.Gd()+this.Ak()+this.Ae()+this.yg();var
ka=this.Wl(true);if(Xa==0||Xa==2){ka.setAttributes(this.pG()+ub.U+tb+ub.V+this.di()+this.fe()+this.b3()+this.hV()+this.uj()+this.Rh()+W+ub.W+this.kB()+ub.X+this.kf()+ub.Y+va);ka.setStyles(ma);var
G=ub.a;}else{ka.setAttributes(ub.U+tb+ub.V+this.di()+this.fe()+this.b3()+this.uj()+this.Rh()+W+ub.Z+this.kf()+ub.Y+this.renderAttributes()+this.kr());ka.setStyles(ma+this.dg());var
G=this.kB();}return (ka.paint()).join(G);};m.dg=function(){return ub._+(this.getOverflow()?this.getOverflow():ub.a)+ub.aa;};m.kr=function(){return ub.ba+(this.getWrap()==1?ub.ca:ub.da)+ub.V;};m.Uc=function(){var
Gb=this.getEnabled()!=0?this.getBackgroundColor()||d.DEFAULTBACKGROUNDCOLOR:this.getDisabledBackgroundColor()||jsx3.gui.Form.DEFAULTDISABLEDBACKGROUNDCOLOR;return ub.ea+Gb+ub.aa;};m.pG=function(){return ub.fa+(this.getType()==0?ub.ga:ub.ha)+ub.V;};m.hV=function(l){return this.getMaxLength()!=null?ub.ia+parseInt(this.getMaxLength())+ub.Y:ub.a;};m.kf=function(){var
Ea=this.getClassName();return d.DEFAULTCLASSNAME+(Ea?ub.ja+Ea:ub.a);};m.getReadonly=function(){return this.jsxreadonly;};m.setReadonly=function(a){this.jsxreadonly=a?1:0;};m.b3=function(){return this.getReadonly()?ub.ka:ub.a;};m.getValidationType=function(){return jsx3.util.strEmpty(this.jsxvalidationtype)?ub.e:this.jsxvalidationtype;};m.setValidationType=function(p){this.jsxvalidationtype=p;return this;};m.getValidationExpression=function(){return jsx3.util.strEmpty(this.jsxvalidationexpression)?null:this.jsxvalidationexpression;};m.setValidationExpression=function(s){this.jsxvalidationexpression=s;return this;};m.doValidate=function(){this.setValidationState(1);var
Fa=this.getValue();var
Eb=null;if(Fa==null||jsx3.util.strTrim(Fa)==ub.a){if(this.getRequired()==1)this.setValidationState(0);}else if(typeof Fa==ub.la){var
Aa=this.getValidationExpression();if(Aa==null){Eb=d.zM[this.getValidationType()];}else Eb=new
RegExp(Aa);this.setValidationState(Fa.search(Eb)==0?1:0);}return this.getValidationState();};m.beep=function(){jsx3.gui.Cc(this.getRendered(),{backgroundColor:ub.ma});};d.getVersion=function(){return ub.na;};m.emInit=function(b){this.jsxsupermix(b);var
v=ub.G;if(!this.hasEvent(v))this.setEvent(ub.oa,v);this.subscribe(v,this,ub.pa);};m.emUpdateDisplay=function(g,h){if(this.getType()==1){var
u=isNaN(this._jsxhm)?g.W:Math.min(parseInt(this._jsxhm),g.W);var
_a=isNaN(this._jsxhf)?g.H:Math.min(parseInt(this._jsxhf),h.H-g.T);this.setDimensions(g.L,g.T,u,_a,true);}else this.jsxsupermix(g,h);};m.emGetValue=function(){var
Oa=(this.emGetSession()).value;var
tb=this.getValue();return Oa===null&&tb===ub.a?Oa:tb;};m.jS=function(a){var
db=a.context.objEVENT;var
E=false;if(!db.hasModifier(true)){var
R=db.keyCode();var
Ma=false;if(this.getType()==1){E=!db.shiftKey()&&R==13;Ma=db.isArrowKey();}else Ma=R==37||R==39;if(!E&&Ma){var
xa=this.getRendered(db);var
La=jsx3.html.getSelection(xa);var
Cb=xa.value;var
ra=R==37||R==38;E=ra&&(La.getStartIndex()>0||La.getEndIndex()>0)||!ra&&(La.getStartIndex()<Cb.length||La.getEndIndex()<Cb.length);}}if(E)db.cancelBubble();};});jsx3.TextBox=jsx3.gui.TextBox;
