/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.chart.Axis");jsx3.Class.defineClass("jsx3.chart.LinearAxis",jsx3.chart.Axis,null,function(n,d){var
ub={a:"wc",b:"Xn",c:"yc",d:"no range for axis ",e:" in chart "};n.MIN_INTERVALS=5;n.MAX_INTERVALS=11;n.MAX_TICKS=200;n.WM=1.1;n.OG=0;n.fr=100;n.X2=20;d.init=function(e,c,r){this.jsxsuper(e,c,r);this.autoAdjust=jsx3.Boolean.TRUE;this.baseAtZero=jsx3.Boolean.TRUE;this.min=null;this.max=null;this.interval=null;this.qf(ub.a,n.OG);this.qf(ub.b,n.fr);this.qf(ub.c,n.X2);};d.getAutoAdjust=function(){return this.autoAdjust;};d.setAutoAdjust=function(j){this.autoAdjust=j;};d.getBaseAtZero=function(){return this.baseAtZero;};d.setBaseAtZero=function(i){this.baseAtZero=i;};d.getMin=function(){return this.min;};d.setMin=function(q){this.min=q;};d.getMax=function(){return this.max;};d.setMax=function(k){this.max=k;};d.getInterval=function(){return this.interval;};d.setInterval=function(c){this.interval=c;};d.fl=function(){var
oa=false;if(this.autoAdjust)oa=this.Zp();if(!oa){this.qf(ub.a,this.min!=null?this.min:n.OG);this.qf(ub.b,this.max!=null?this.max:n.fr);this.qf(ub.c,this.interval!=null?this.interval:n.X2);}};d.Zp=function(){var
qa=this.getChart();if(qa==null)return false;var
Ib=qa.getRangeForAxis(this);var
bb,Aa;if(Ib==null){jsx3.chart.LOG.debug(ub.d+this+ub.e+qa);if(this.min!=null||this.max!=null){bb=this.min||n.OG;Aa=this.max||bb+n.fr;}else return false;}else{bb=Ib[0];Aa=Ib[1];}var
ib=null,B=null,R=null;if(this.min!=null)ib=this.min;else if(bb>=0&&this.baseAtZero)ib=0;if(this.max!=null)B=this.max;else if(Aa<=0&&this.baseAtZero)B=0;R=this.interval;if(R==null){var
Ua=1;var
y=null,K=null;if(ib!=null){y=ib;}else{y=bb;Ua=Ua*n.WM;}if(B!=null){K=B;}else{K=Aa;Ua=Ua*n.WM;}var
xb=K-y;var
pa=xb*Ua;R=1;if(pa>0){pa=pa/n.MIN_INTERVALS;while(pa<1){R=R/10;pa=pa*10;}while(pa>10){R=R*10;pa=pa/10;}if(pa>5){R=R*5;}else if(pa>2)R=R*2;}}if(ib==null){var
Ca=bb-(n.WM-1)*(Aa-bb)/2;ib=R*Math.floor(Ca/R);if(B!=null)ib=ib-B%R;}if(B==null){var
Eb=Aa+(n.WM-1)*(Aa-bb)/2;B=R*Math.ceil(Eb/R);if(ib!=null)B=B+ib%R;}this.qf(ub.a,ib);this.qf(ub.b,B);this.qf(ub.c,R);return true;};d.Xj=function(h){return this.nj(ub.a)+h*this.nj(ub.c);};d.Hf=function(){var
Ma=this.nj(ub.b);var
Ya=this.nj(ub.a);var
W=this.nj(ub.c);var
Hb=[];var
Ca=Ya;while(Ca<=Ma&&Hb.length<n.MAX_TICKS){Hb.push(this.getCoordinateFor(Ca));Ca=Ca+W;}return Hb;};d.mo=function(){return this.nj(ub.a)<0&&this.nj(ub.b)>0;};d.getCoordinateFor=function(m){var
Lb=this.nj(ub.b);var
Ya=this.nj(ub.a);if(m<Ya)return this.horizontal?0:this.length;if(m>Lb)return this.horizontal?this.length:0;var
ab=Math.round(this.length*(m-Ya)/(Lb-Ya));return this.horizontal?ab:this.length-ab;};d.getCoordinateForNoClip=function(a){var
N=this.nj(ub.b);var
ja=this.nj(ub.a);var
Jb=Math.round(a*1000)/1000;var
W=this.length*((Jb-ja)/(N-ja));return Math.round(this.horizontal?W:this.length-W);};n.getVersion=function(){return jsx3.chart.si;};});
