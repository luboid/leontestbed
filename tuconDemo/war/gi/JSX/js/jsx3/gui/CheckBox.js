/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.CheckBox",jsx3.gui.Block,[jsx3.gui.Form],function(n,f){var
ub={A:";",B:"&#160;",C:' checked="checked" ',D:" ",E:"3.0.00",F:"tM",G:"disabled",H:/<(input .*?)\/>/g,I:"<$1><xsl:if test=\"{0}='1'\"><xsl:attribute name=\"checked\">checked</xsl:attribute></xsl:if></input>",a:"jsx30checkbox",b:/^false|0|null$/i,c:"jsxtoggle",d:"",e:"visible",f:"hidden",g:"click",h:"keydown",i:"span",j:"relativebox",k:"box",l:"div",m:"inline",n:"input[checkbox]",o:"0 0 0 18",p:"0/0/0",q:"background-color:#999999;",r:' id="',s:'"',t:' class="',u:"overflow-x:hidden;",v:' class="jsx30checkbox_tristate" ',w:' type="checkbox" name="',x:'" ',y:' class="jsx30checkbox_partial" ',z:"visibility:"};n.UNCHECKED=0;n.CHECKED=1;n.PARTIAL=2;n.DEFAULTCLASSNAME=ub.a;f.jsxdefaultchecked=0;var
mb=ub.b;f.init=function(c,h,q,a,l,g,s){this.jsxsuper(c,h,q,a,l,g);this.setDefaultChecked(s==null?1:s);this.jsxchecked=s;};f.getDefaultChecked=function(){return this.jsxdefaultchecked;};f.setDefaultChecked=function(p){this.jsxdefaultchecked=p;return this;};f.getChecked=function(){return this.jsxchecked!=null?this.jsxchecked:this.getDefaultChecked();};f.setChecked=function(o){if(this.jsxchecked!=o){this.jsxchecked=o;this.Y7();if(this.isOldEventProtocol())this.doEvent(ub.c,{intCHECKED:o});}return this;};f.getValue=function(){return this.getChecked();};f.setValue=function(r){this.setChecked(!jsx3.util.strEmpty(r)&&(r+ub.d).search(mb)!=0?1:0);return this;};f.qh=function(k,b){this.focus(b);if(!k.leftButton()&&k.isMouseEvent())return;if(this.getEnabled()==1){var
ib=this.getChecked()==1?0:1;this.jsxchecked=ib;this.Y7(b);this.doEvent(ub.c,{objEVENT:k,intCHECKED:ib,_gipp:1});}};f.Y7=function(o){if(o==null)o=this.getRendered();if(o!=null){(jsx3.html.selectSingleElm(o,0,0,0)).checked=this.jsxchecked==1;(jsx3.html.selectSingleElm(o,0,0,1)).style.visibility=this.jsxchecked==2?ub.e:ub.f;}};f._ebKeyDown=function(r,p){if(r.enterKey()){this.qh(r,p);r.cancelAll();}};n.Tj={};n.Tj[ub.g]=true;n.Tj[ub.h]=true;f.Rc=function(h,e,j){this.ag(h,e,j,3);};f.Vm=function(b){if(this.getParent()&&(b==null||isNaN(b.parentwidth)||isNaN(b.parentheight))){b=(this.getParent()).ng(this);}else if(b==null)b={};var
D=this.getRelativePosition()!=0&&(!this.getRelativePosition()||this.getRelativePosition()==1);var
sb,Bb,Cb,V;if(b.tagname==null)b.tagname=ub.i;if((sb=this.getBorder())!=null&&sb!=ub.d)b.border=sb;if(D&&(Bb=this.getMargin())!=null&&Bb!=ub.d)b.margin=Bb;if(!b.boxtype)b.boxtype=D?ub.j:ub.k;if(b.left==null)b.left=!D&&!jsx3.util.strEmpty(this.getLeft())?this.getLeft():0;if(b.top==null)b.top=!D&&!jsx3.util.strEmpty(this.getTop())?this.getTop():0;if(b.height==null)b.height=(Cb=this.getHeight())!=null?Cb:18;if(b.width==null)if((V=this.getWidth())!=null)b.width=V;var
K=new
jsx3.gui.Painted.Box(b);var
ca={};ca.tagname=ub.l;ca.boxtype=ub.m;var
Ja=new
jsx3.gui.Painted.Box(ca);K.bl(Ja);var
ca={};ca.tagname=ub.i;ca.boxtype=ub.k;ca.width=16;ca.parentheight=K.Qi();ca.height=18;ca.left=0;ca.top=0;var
Sa=new
jsx3.gui.Painted.Box(ca);Ja.bl(Sa);var
ca={};ca.tagname=ub.n;ca.empty=true;ca.omitpos=true;var
qb=new
jsx3.gui.Painted.Box(ca);Sa.bl(qb);var
ca={};ca.tagname=ub.i;ca.boxtype=ub.k;ca.left=3;ca.top=7;ca.width=7;ca.height=2;var
v=new
jsx3.gui.Painted.Box(ca);Sa.bl(v);var
ca={};ca.tagname=ub.i;ca.boxtype=ub.m;ca.top=2;ca.parentheight=K.Qi();ca.height=18;ca.padding=ub.o;var
wb=new
jsx3.gui.Painted.Box(ca);K.bl(wb);return K;};f.focus=function(b){if(!b)b=this.getRendered();if(b)jsx3.html.focus(jsx3.html.selectSingleElm(b,ub.p));};f.paint=function(){this.applyDynamicProperties();var
da=this.getEnabled()==1;var
nb=da?this.Pj(n.Tj,0):ub.d;var
Da=this.renderAttributes(null,true);var
kb=this.getChecked()==2?ub.e:ub.f;var
Hb=da?ub.d:ub.q;var
Ja=this.Wl(true);Ja.setAttributes(ub.r+this.getId()+ub.s+this.di()+ub.t+this.kf()+ub.s+this.Rh()+nb+Da);Ja.setStyles((Ja.getPaintedWidth()?ub.u:ub.d)+this.yg(true)+this.wm()+this.ze()+this._i()+this.Gd()+this.Uc()+this.qg()+this.Ne()+this.en()+this.Ae());var
pb=Ja.lg(0);var
gb=pb.lg(0);gb.setAttributes(ub.v);var
Ba=gb.lg(0);Ba.setAttributes(ub.w+this.getName()+ub.x+this.fe()+this._W()+this.uj());var
sa=gb.lg(1);sa.setAttributes(ub.y);sa.setStyles(ub.z+kb+ub.A+Hb);var
Fa=Ja.lg(1);Fa.setAttributes(jsx3.html.pe);return (Ja.paint()).join((pb.paint()).join((gb.paint()).join((Ba.paint()).join(ub.d)+(sa.paint()).join(ub.B))+(Fa.paint()).join(this.ii())));};f._W=function(){return this.getChecked()==1?ub.C:ub.d;};f.kf=function(){var
E=this.getClassName();return n.DEFAULTCLASSNAME+(E?ub.D+E:ub.d);};f.doValidate=function(){this.setValidationState(this.getRequired()==0||this.getChecked()==1?1:0);return this.getValidationState();};n.getVersion=function(){return ub.E;};f.emGetType=function(){return jsx3.gui.Matrix.EditMask.FORMAT;};f.emInit=function(e){this.jsxsupermix(e);this.subscribe(ub.c,this,ub.F);};f.emSetValue=function(r){this.jsxchecked=Number(r)==1?1:0;};f.emGetValue=function(){var
ib=this.emGetSession();if(ib)return ib.column.getValueForRecord(ib.recordId);return null;};f.emBeginEdit=function(p,r,c,b,i,e,j){var
z=jsx3.html.selectSingleElm(j,0,0,0,0,0);if(z&&!z.getAttribute(ub.G)){this.jsxsupermix(p,r,c,b,i,e,j);jsx3.html.focus(z);}else return false;};f.emPaintTemplate=function(){this.jsxchecked=0;this.setText(ub.d);this.setEnabled(0);var
y=this.paint();this.setEnabled(1);var
ab=this.paint();var
Da=this.emGetTemplate(ab,y);Da=Da.replace(ub.H,ub.I);return Da;};f.tM=function(q){var
U=this.emGetSession();if(U){var
ib=q.context.intCHECKED;this.jsxchecked=ib;U.column.setValueForRecord(U.recordId,ib.toString());}};});jsx3.CheckBox=jsx3.gui.CheckBox;
