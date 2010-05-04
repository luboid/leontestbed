/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.chart.Series","jsx3.chart.PointRenderer");jsx3.Class.defineClass("jsx3.chart.LineSeries",jsx3.chart.Series,null,function(c,h){var
ub={a:"segment",b:"step",c:"reverseStep",d:"horizontal",e:"vertical",f:"jsx3.chart.LineSeries.tooltip",g:"form",h:"pointRenderer",i:"Mm",j:"Dn",k:"_line",l:"_p",m:"jsxid",n:"bad LineSeries form: ",o:"sj",p:"{",q:",",r:"}"};var
Db=jsx3.vector;c.FORM_SEGMENT=ub.a;c.FORM_STEP=ub.b;c.FORM_REVSTEP=ub.c;c.FORM_HORIZONTAL=ub.d;c.FORM_VERTICAL=ub.e;c.oR={segment:1,step:1,reverseStep:1,horizontal:1,vertical:1};c.cD=4;c.NW=function(n){this.series=n;};c.NW.prototype.render=function(p,d,o,r,q,n){var
E=o-p;var
Na=r-d;var
aa=new
Db.Group(p,d,E,Na);var
P=this.series.ql();var
_a=new
Db.Line(0,0,0,Math.round(Na/2),E,Math.round(Na/2));_a.setStroke(P);aa.appendChild(_a);var
Fa=this.series.getPointRenderer();if(Fa!=null){var
J=Math.round(E/4);var
Ia=this.series.Mz();var
cb=this.series.tq();var
Jb=Fa.render(J,J,E-J,Na-J,Ia,cb);aa.appendChild(Jb);}return aa;};h.init=function(a,l){this.jsxsuper(a,l);this.xField=null;this.yField=null;this.form=ub.a;this.interpolateValues=jsx3.Boolean.FALSE;this.pointRadius=null;this.pointRenderer=null;this.pointFill=null;this.pointStroke=null;this.pointGradient=null;this.setTooltipFunction(ub.f);};h.getXField=function(){return this.xField;};h.setXField=function(l){this.xField=l;};h.getYField=function(){return this.yField;};h.setYField=function(g){this.yField=g;};h.getForm=function(){return this.form;};h.setForm=function(r){if(c.oR[r]){this.form=r;}else throw new
jsx3.IllegalArgumentException(ub.g,r);};h.getInterpolateValues=function(){return this.interpolateValues;};h.setInterpolateValues=function(j){this.interpolateValues=j;};h.getPointRadius=function(){return this.pointRadius!=null?this.pointRadius:c.cD;};h.setPointRadius=function(s){this.pointRadius=s;};h.getPointRenderer=function(){return jsx3.chart.Sl(this,ub.h);};h.setPointRenderer=function(a){jsx3.chart.Wk(this,ub.h,a);};h.getPointFill=function(){return this.pointFill;};h.setPointFill=function(r){this.pointFill=r;};h.getPointStroke=function(){return this.pointStroke;};h.setPointStroke=function(f){this.pointStroke=f;};h.getPointGradient=function(){return this.pointGradient;};h.setPointGradient=function(j){this.pointGradient=j;};h.Mz=function(){var
S=this.nj(ub.i);if(S==null)this.zS();return this.nj(ub.i);};h.tq=function(){var
ra=this.nj(ub.j);if(ra==null)this.zS();return this.nj(ub.j);};h.zS=function(){var
Cb=this.ql();var
Sa=Db.Fill.valueOf(this.getPointFill());if(Sa==null&&Cb!=null)Sa=new
Db.Fill(Cb.getColor());if(Sa!=null)Sa=jsx3.chart.addGradient(Sa,this.pointGradient);var
hb=Db.Stroke.valueOf(this.getPointStroke());this.qf(ub.i,Sa);this.qf(ub.j,hb);};h.updateView=function(){this.jsxsuper();var
T=this.getCanvas();this.shape=new
Db.Shape(null,0,0,T.getWidth(),T.getHeight());this.shape.setId(this.getId()+ub.k);T.appendChild(this.shape);var
sb=this.ql();this.shape.setStroke(sb);this.th(this.shape);this.zS();var
oa=null,X=null;var
nb=this.lP();for(var
ka=0;ka<nb.length;ka++){var
Ia=nb[ka];if(Ia==null)continue;var
Za=null,ta=null,t=false;if(oa!=null){Za=oa[1];ta=oa[2];t=X==ka-1;}this.at(ka,t,Ia[0],Ia[1],Ia[2],Ia[3],Za,ta,X==null);oa=Ia;X=ka;}};h.at=function(g,b,q,k,j,d,o,f,r){var
La=this.getCanvas();var
ma=this.shape;var
ab=this.getPointRenderer();if(ab!=null){var
ba=this.getPointRadius();var
db=this.getColorFunction();var
E=db!=null?db.apply(this,[q,d]):this.Mz();var
Cb=ab.render(k-ba,j-ba,k+ba,j+ba,E,this.tq());Cb.setId(this.getId()+ub.l+g);this.th(Cb,g,q.getAttribute(ub.m));La.appendChild(Cb);var
I=this.getTooltipFunction();if(I!=null)Cb.setToolTip(I.apply(this,[this,q]));}var
lb=r||!b&&!this.interpolateValues;if(lb){ma.pathMoveTo(k,j);}else if(this.form==ub.a){ma.pathLineTo(k,j);}else if(this.form==ub.d){(ma.pathMoveTo(o,j)).pathLineTo(k,j);}else if(this.form==ub.e){(ma.pathMoveTo(k,f)).pathLineTo(k,j);}else if(this.form==ub.b){(ma.pathLineTo(k,f)).pathLineTo(k,j);}else if(this.form==ub.c){(ma.pathLineTo(o,j)).pathLineTo(k,j);}else jsx3.chart.LOG.error(ub.n+this.form);};h.lP=function(){var
vb=this.nj(ub.o);if(vb==null){vb=[];this.qf(ub.o,vb);}return vb;};h.nd=function(m,o,n,d){(this.lP()).push([m,o,n,d]);};h.Ac=function(l,p,o,b){(this.lP()).push(null);};h.clear=function(){var
E=this.lP();E.splice(0,E.length);};h.getXValue=function(a){if(this.xField)return jsx3.chart.asNumber(a.getAttribute(this.xField));return null;};h.getYValue=function(p){if(this.yField)return jsx3.chart.asNumber(p.getAttribute(this.yField));return null;};h.getLegendRenderer=function(){return new
c.NW(this);};c.tooltip=function(a,f){var
Ja=a.getXValue(f);var
La=a.getYValue(f);return Ja!=null?ub.p+Ja+ub.q+La+ub.r:La;};c.getVersion=function(){return jsx3.chart.si;};});
