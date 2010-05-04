/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineInterface("jsx3.gui.Form",null,function(p,c){var
ub={a:"#a8a8b5",b:"#d8d8e5",c:"Error binding key '",d:"' to ",e:": ",f:"background-color:",g:";",h:"",i:"color:",j:' disabled="disabled" ',k:"pointer",l:"default",m:"cursor:",n:"3.00.00",o:"none",p:"Not implemented.",q:"<xsl:choose xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\"><xsl:when test=\"@jsxnomask='1'\"></xsl:when><xsl:when test=\"@jsxdisabled='1'\">",r:"</xsl:when>",s:"<xsl:otherwise>",t:"</xsl:otherwise>",u:"</xsl:choose>"};var
kb=jsx3.gui.Event;p.DEFAULTDISABLEDCOLOR=ub.a;p.DEFAULTDISABLEDBACKGROUNDCOLOR=ub.b;p.STATEINVALID=0;p.STATEVALID=1;p.STATEDISABLED=0;p.STATEENABLED=1;p.OPTIONAL=0;p.REQUIRED=1;c.doKeyBinding=function(s,k){try{var
z=jsx3.gui.HotKey.valueOf(k,s);return (this.k8()).registerHotKey(z);}catch(Kb){(jsx3.util.Logger.getLogger(p.jsxclass.getName())).error(ub.c+k+ub.d+this+ub.e+jsx3.NativeError.wrap(Kb));return null;}};c.k8=function(){var
ba=jsx3.gui.Window!=null;var
Cb=jsx3.gui.Dialog!=null;var
Wa=this;while(Wa!=null){if(ba&&Wa instanceof jsx3.gui.Window)return Wa.getRootBlock();if(Cb&&Wa instanceof jsx3.gui.Dialog)return Wa;var
V=Wa.getParent();if(V==null)return Wa.getServer();Wa=V;}return null;};c.getKeyBinding=function(){return this.jsxkeycode==null?null:this.jsxkeycode;};c.setKeyBinding=function(i){this.jsxkeycode=i;return this;};c.getDisabledBackgroundColor=function(){return this.jsxdisabledbgcolor;};c.setDisabledBackgroundColor=function(g){this.jsxdisabledbgcolor=g;return this;};c.Uc=function(){var
db=this.getEnabled()!=0?this.getBackgroundColor():this.getDisabledBackgroundColor();return db?ub.f+db+ub.g:ub.h;};c.getDisabledColor=function(){return this.jsxdisabledcolor;};c.setDisabledColor=function(j){this.jsxdisabledcolor=j;return this;};c.getEnabled=function(){return this.jsxenabled==null?1:this.jsxenabled;};c.getValue=function(){return this.jsxvalue;};c.setValue=function(g){this.jsxvalue=g;return this;};c.setEnabled=function(a,g){if(this.jsxenabled!=a){this.jsxenabled=a;if(g)this.repaint();}return this;};c.Gd=function(){if(this.getEnabled()!=0){var
Ea=this.getColor();return Ea?ub.i+Ea+ub.g:ub.h;}else return ub.i+(this.getDisabledColor()?this.getDisabledColor():p.DEFAULTDISABLEDCOLOR)+ub.g;};c.fe=function(){return this.getEnabled()==1?ub.h:ub.j;};c.uj=function(){return jsx3.gui.Block.prototype.uj.call(this,this.getIndex()||Number(0));};c.yg=function(j){var
P=this.getCursor();if(!P&&j)P=this.getEnabled()==1?ub.k:ub.l;return P?ub.m+P+ub.g:ub.h;};c.getRequired=function(){return this.jsxrequired==null?0:this.jsxrequired;};c.setRequired=function(i){this.jsxrequired=i;return this;};c.getValidationState=function(){return this._jsxuV==null?1:this._jsxuV;};c.setValidationState=function(m){this._jsxuV=m;return this;};c.doValidate=jsx3.Method.newAbstract();c.doReset=function(){this.setValidationState(1);return this;};p.validate=function(o,f){var
Na=o.getDescendantsOfType(jsx3.gui.Form);if(o.instanceOf(jsx3.gui.Form))Na.unshift(o);var
A=1;for(var
O=0;O<Na.length;O++){var
Nb=Na[O].doValidate();if(f)f(Na[O],Nb);if(Nb!=1)A=Nb;}return A;};p.reset=function(i){var
Ka=i.getDescendantsOfType(jsx3.gui.Form);if(i.instanceOf(jsx3.gui.Form))Ka.unshift(i);for(var
tb=0;tb<Ka.length;tb++)Ka[tb].doReset();};p.getVersion=function(){return ub.n;};c.emInit=function(i){if(this.emGetType()==jsx3.gui.Matrix.EditMask.NORMAL){this.setRelativePosition(0,true);this.setDisplay(ub.o,true);}this._jsxhm=this.getWidth();this._jsxhf=this.getHeight();};c.emGetType=function(){return jsx3.gui.Matrix.EditMask.NORMAL;};c.emPaintTemplate=function(){throw new
jsx3.Exception(ub.p);};c.emGetTemplate=function(f,k){return ub.q+k+ub.r+ub.s+f+ub.t+ub.u;};c.emBeginEdit=function(i,r,o,b,j,e,d){if(this.emGetType()==jsx3.gui.Matrix.EditMask.NORMAL){this.setRelativePosition(0,true);this.emUpdateDisplay(r,o);this.setDisplay(ub.h,true);this.setZIndex(10,true);this.focus();this.emFocus();}this.emSetValue(i);};c.emEndEdit=function(){if(this.emGetType()==jsx3.gui.Matrix.EditMask.NORMAL)this.emRestoreDisplay();return this.emGetValue();};c.emSetValue=function(a){this.setValue(a);};c.emGetValue=function(){var
La=this.getValue();return La!=null?La.toString():null;};c.emUpdateDisplay=function(q,i){var
qa=isNaN(this._jsxhm)?q.W:Math.min(parseInt(this._jsxhm),q.W);var
_a=isNaN(this._jsxhf)?q.H:Math.min(parseInt(this._jsxhf),q.H);this.setDimensions(q.L,q.T,qa,_a,true);};c.emRestoreDisplay=function(){this.setDisplay(ub.o,true);};c.emFocus=function(){};});jsx3.Form=jsx3.gui.Form;
