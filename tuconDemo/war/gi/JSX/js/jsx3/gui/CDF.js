/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.gui.Block","jsx3.xml.Cacheable");jsx3.Class.defineClass("jsx3.gui.CDF",jsx3.gui.Block,[jsx3.xml.CDF,jsx3.xml.Cacheable],function(e,b){var
ub={a:"Component: ",b:"; XPath: //record[@jsxid='",c:"']/@",d:"; value to be shown (read): ",e:"",f:"jsx3.gui.Form",g:"jsx3.gui.RadioButton"};var
pb=jsx3.util.Logger.getLogger(e.jsxclass.getName());b.init=function(n){this.jsxsuper(n);};b.redrawRecord=function(p,h){this.read(null,p);};b.mu=function(f){var
A=this.jsxcdfid;if(jsx3.util.strEmpty(A))this.findAncestor(function(c){if(!jsx3.util.strEmpty(c.jsxcdfid)){A=c.jsxcdfid;return true;}},false);var
va=[];e.Wv(this,A,va,f);return va;};e.Wv=function(g,l,d,h){var
za=g.getChildren();var
sa=l;for(var
ia=0;ia<za.length;ia++){var
x=za[ia];if(x instanceof e&&!(jsx3.util.strEmpty(x.jsxxmlid)&&jsx3.util.strEmpty(x.jsxxmlurl)&&jsx3.util.strEmpty(x.jsxxml)))continue;if(!jsx3.util.strEmpty(x.jsxcdfid))l=x.jsxcdfid;if(!jsx3.util.strEmpty(x.jsxcdfattribute)&&(jsx3.util.strEmpty(l)||!jsx3.util.strEmpty(l)&&(!h||h==l))){pb.trace(ub.a+x+ub.b+l+ub.c+x.jsxcdfattribute);d.push({target:x,jsxcdfid:l,jsxcdfattribute:x.jsxcdfattribute});}e.Wv(x,l,d,h);l=sa;}};b.paint=function(){this.getXML();return this.jsxsuper();};b.repaint=function(){this.read(false);return this.jsxsuper();};b.onXmlBinding=function(a){this.jsxsupermix(a);this.read();};b.onAfterPaint=function(d){this.read(false);};b.read=function(d,i){if(d!==false)d=true;var
zb=this.mu(i);var
wb=this;if(jsx3.util.strEmpty(this.jsxxmlid)&&jsx3.util.strEmpty(this.jsxxmlurl)&&jsx3.util.strEmpty(this.jsxxml))wb=this.findAncestor(function(p){return !(jsx3.util.strEmpty(p.jsxxmlid)&&jsx3.util.strEmpty(p.jsxxmlurl)&&jsx3.util.strEmpty(p.jsxxml));},false);for(var
M=0;M<zb.length;M++){var
Z=wb.getRecordNode(zb[M].jsxcdfid);var
z=zb[M].target;var
vb;vb=Z instanceof jsx3.xml.Entity?Z.getAttribute(zb[M].jsxcdfattribute):null;pb.trace(ub.a+z+ub.d+vb+ub.e);this.setFieldValue(z,vb,d);}};b.write=function(){var
eb=this.mu();for(var
u=0;u<eb.length;u++){var
Ya=this.getRecordNode(eb[u].jsxcdfid);if(Ya){var
Ua=eb[u].target;var
qa=this.getFieldValue(Ua);if(qa==null)Ya.removeAttribute(eb[u].jsxcdfattribute);else if(Ya.getAttribute(eb[u].jsxcdfattribute)!=qa)Ya.setAttribute(eb[u].jsxcdfattribute,qa);}}};b.getFieldValue=function(k){if(!k.instanceOf(ub.f)){return k.getText();}else if(jsx3.gui.RadioButton&&k.instanceOf(ub.g)){return k.getGroupValue();}else return k.getValue();};b.setFieldValue=function(p,i,j){if(!p.instanceOf(ub.f)){p.setText(i||ub.e,j);}else if(jsx3.gui.RadioButton&&p.instanceOf(ub.g)){p.setGroupValue(i);}else p.setValue(i);};b.setCDFId=function(h){this.jsxcdfid=h;this.read();};b.getCDFId=function(){return this.jsxcdfid;};});
