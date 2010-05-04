/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.chart.RadialChart","jsx3.chart.PieSeries");jsx3.Class.defineClass("jsx3.chart.PieChart",jsx3.chart.RadialChart,null,function(n,g){var
ub={a:"jsx3.chart.PieChart.defaultColoring",b:"colorFunction",c:"getValue",d:"jsx3.chart.Legend"};g.init=function(r,c,f,q,i){this.jsxsuper(r,c,f,q,i);this.innerRadius=0;this.seriesPadding=0.1;this.totalAngle=360;this.startAngle=0;this.categoryField=null;this.colors=null;this.colorFunction=ub.a;this.seriesStroke=null;};g.getInnerRadius=function(){return this.innerRadius!=null?this.innerRadius:0;};g.setInnerRadius=function(c){this.innerRadius=c==null?null:Math.max(0,Math.min(1,c));};g.getSeriesPadding=function(){return this.seriesPadding!=null?this.seriesPadding:0.1;};g.setSeriesPadding=function(c){this.seriesPadding=c;};g.getTotalAngle=function(){return this.totalAngle!=null?this.totalAngle:360;};g.setTotalAngle=function(h){this.totalAngle=h==null?null:Math.max(0,Math.min(360,h));};g.getStartAngle=function(){return this.startAngle!=null?this.startAngle:0;};g.setStartAngle=function(m){this.startAngle=m;};g.getCategoryField=function(){return this.categoryField;};g.setCategoryField=function(c){this.categoryField=c;};g.getColors=function(){return this.colors;};g.setColors=function(j){this.colors=j;};g.getColorFunction=function(){return jsx3.chart.vc(this,ub.b);};g.setColorFunction=function(m){jsx3.chart.Wk(this,ub.b,m);};g.getSeriesStroke=function(){return this.seriesStroke;};g.setSeriesStroke=function(f){this.seriesStroke=f;};g.hd=function(q,h){var
db=this.getColors();if(db!=null&&db.length>0)return jsx3.vector.Fill.valueOf(db[h%db.length]);var
ja=this.getColorFunction();if(ja!=null)return ja.apply(this,[q,h]);return new
jsx3.vector.Fill();};g.createVector=function(){this.jsxsuper();var
N=this.Si();var
mb=this.Cl();var
ka=this.bh();if(mb.length<1)return;if(ka==null||ka.length<1)return;var
Qa=mb[0].getWidth();var
Kb=mb[0].getHeight();var
Gb=Math.round(Qa/2);var
y=Math.round(Kb/2);var
Hb=Math.floor(Math.min(Qa,Kb)/2);var
zb=this.ak(mb,ub.c,true);var
Za=Hb*(1-this.getInnerRadius())/(mb.length+(mb.length-1)*this.getSeriesPadding());var
ma=Hb*this.getInnerRadius();for(var
R=0;R<mb.length;R++){var
E=mb[R];E.jj();var
P=E.getStartAngle();if(P==null)P=this.getStartAngle();var
A=E.getTotalAngle();if(A==null)A=this.getTotalAngle();var
yb=ma+Za;for(var
G=0;G<ka.length;G++){var
J=ka[G];var
X=E.getValue(J);if(X==null||X<=0){E.xm();continue;}var
ca=A*X/zb[R];E.xk(J,Gb,y,P,P+ca,Math.round(ma),Math.round(yb),100*X/zb[R]);P=P+ca;}E.updateView();N.appendChild(E.getCanvas());ma=ma+Za*(1+this.getSeriesPadding());}};g.pd=function(){return true;};g.tc=function(c){return c instanceof jsx3.chart.PieSeries;};g.getLegendEntryType=function(){jsx3.require(ub.d);return 2;};n.defaultColoring=function(j,a){return jsx3.chart.Chart.DEFAULT_FILLS[a%jsx3.chart.Chart.DEFAULT_FILLS.length];};n.getVersion=function(){return jsx3.chart.si;};});
