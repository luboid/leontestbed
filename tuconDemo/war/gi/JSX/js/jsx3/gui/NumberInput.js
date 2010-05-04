/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.TextBox","jsx3.util.NumberFormat");jsx3.Class.defineClass("jsx3.gui.NumberInput",jsx3.gui.TextBox,null,function(j,p){var
ub={a:"_jsxi7",b:"number",c:"jsx3.gui",d:"gui.ni.fmt",e:"",f:"jsxchange",g:"jsxmousewheel"};var
Cb=jsx3.util.NumberFormat;var
Ab=jsx3.gui.Interactive;p.getFormat=function(){return this.jsxformat!=null?this.jsxformat:1;};p.setFormat=function(n){this.jsxformat=n;delete this[ub.a];};p.Aq=function(){if(this._jsxi7==null||!(this._jsxi7.getLocale()).equals(this._getLocale()))try{var
Ib=this.getFormat();if(typeof Ib==ub.b)this._jsxi7=Cb.getInstance(Ib,this._getLocale());else this._jsxi7=new
Cb(Ib,this._getLocale());}catch(Kb){(jsx3.util.Logger.getLogger(ub.c)).warn(jsx3._msg(ub.d,this.getFormat(),this),jsx3.NativeError.wrap(Kb));this._jsxdateformat=Cb.getInstance(null,this._getLocale());}return this._jsxi7;};p.formatValue=function(o){if(o==null)return ub.e;return (this.Aq()).format(o);};p.parseValue=function(d){if(d==ub.e)return null;return (this.Aq()).parse(d);};p.lk=function(o,q){var
mb=o.getWheelDelta();if(mb!=0){var
wb=Number(this.getValue());var
Bb=wb;if(isNaN(wb))wb=0;wb=Math.round(wb+mb);var
hb=this.doEvent(ub.f,{objEVENT:o,strPREVIOUS:Bb,strVALUE:wb,_gipp:1});if(hb!==false)this.setValue(wb);}o.cancelAll();};p.hasEvent=function(g){if(g==ub.g)return true;return this.jsxsupermix(g);};});
