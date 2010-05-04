/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.gui.Heavyweight",null,null,function(a,s){var
ub={A:"px",Aa:" inverse:",B:"hidden",Ba:" content-size:",C:"1px",Ca:" origin:",D:'<span class="jsx30scroller" style="position:absolute;top:0px;left:0px;width:',Da:" max-size:",E:"px;height:",Ea:"Found perfect ",F:"px;background-image:url(",Fa:" rule -- anchor-pos:",G:');"',Ga:"Applying best ",H:"mouseover",Ha:" rule -- perfect:",I:"wp",Ia:" anchor-pos:",J:"mouseout",Ja:" available-size:",K:"QW",Ka:" point:",L:">&#160;</span>",La:" left-top:",M:'<span class="jsx30scroller" style="position:absolute;top:',Ma:" width-height:",N:"px;left:0px;width:",Na:"100px",O:"SC",Oa:"object",P:"visible",Pa:"number",Q:"_jsxXY",Qa:"N",R:"yp",Ra:"W",S:" on",Sa:"NE",T:'="',Ta:"SE",U:"jsx3.gui.Heavyweight.GO('",Ua:"SW",V:"').",Va:"NW",W:"(event,this,'",Wa:"O",X:"');",Xa:" ",Y:'"',Ya:"/",Z:"Applying ratio of ",Za:"3.00.00",_:". Width changed from ",a:"jsx:///images/menu/scroll_up.gif",aa:" to ",b:"jsx:///images/menu/scroll_down.gif",ba:" with height ",c:"jsx_heavyweight_",ca:".",d:"resize",da:"0/0",e:"body",ea:"clientWidth",f:"gui.hw.doc",fa:"offsetWidth",g:"gui.hw.own",ga:"left",h:"",ha:"width",i:"width:",ia:"scrollLeft",j:"px;",ja:"borderTopWidth",k:"height:",ka:"borderBottomWidth",l:'<div class="jsx30scrollpane" style="top:0px;">',la:"clientHeight",m:"</div>",ma:"offsetHeight",n:"mousewheel",na:"top",o:"lk",oa:"height",p:'<span id="',pa:"scrollTop",q:'" class="jsx30block" style="position:absolute;overflow:;',qa:"borderLeftWidth",r:"left:0px;top:0px;z-index:",ra:"borderRightWidth",s:';visibility:hidden;"',sa:"Apply ",t:">",ta:" Rules -- content-size:",u:"</span>",ua:" explicit-size:",v:"beforeEnd",va:" total-space:",w:"Y",wa:"E",x:"X",xa:"S",y:"jsxdestroy",ya:" rule is not perfect -- anchor-pos:",z:"yr",za:" anchor-dir:"};var
Lb=jsx3.util.Logger.getLogger(a.jsxclass.getName());var
pb=jsx3.gui.Event;a.Q4={};a.uv=1;a.u3=jsx3.resolveURI(ub.a);a.DL=jsx3.resolveURI(ub.b);a.N6=75;a.V6=12;a.AW=18;a.DEFAULTZINDEX=32000;a.ML=10;s.init=function(p,e){this.a2=p!=null?p:a.gV();this.Ev=e;if(a.Q4[this.a2]!=null)a.Q4[this.a2].destroy();a.Q4[this.a2]=this;};a.gV=function(){return ub.c+a.uv++;};a.UJ=function(){var
N=a.Q4;var
ya=false;for(var ca in N){N[ca].hide();if(!ya&&N[ca].Ev){N[ca].Ev.focus();ya=true;}}};pb.subscribe(ub.d,a.UJ);s.wt=function(){if(this.Ev){var
ca=this.Ev.getDocument();if(ca)return (ca.getElementsByTagName(ub.e))[0];else Lb.warn(jsx3._msg(ub.f,this));}else Lb.warn(jsx3._msg(ub.g,this));return null;};a.GO=function(j){return a.Q4[j];};s.show=function(e){var
Db=this.getId();var
va=this.getHTML();if(jsx3.util.strEmpty(va))return;var
D=this.getWidth();var
Ua=D==null?ub.h:ub.i+D+ub.j;var
Aa=this.getHeight();var
N=Aa==null?ub.h:ub.k+Aa+ub.j;var
L=ub.h;if(this.jZ){va=ub.l+va+ub.m;L=this.FN(ub.n,ub.o);}var
Y=ub.p+Db+ub.q+Ua+N+ub.r+this.getZIndex()+ub.s+L+ub.t+va+ub.u;var
Jb=this.getDomParent();jsx3.html.insertAdjacentHTML(Jb,ub.v,Y);var
rb=this.getRendered();var
wb=this.c9(rb);this.applyRatio(wb);var
la=wb.offsetWidth,Ta=wb.offsetHeight;this.applyRules(ub.w,Ta);this.applyRules(ub.x,la);if(e!=false)this.setVisibility(ub.h);if(this.Ev)this.Ev.subscribe(ub.y,this,ub.z);if(this.jZ){var
ea=rb.childNodes[0];ea.style.width=rb.offsetWidth+ub.A;ea.style.height=rb.offsetHeight+ub.A;rb.style.overflow=ub.B;this.rC(rb);}};s.lk=function(i,d){this.dO(i.getWheelDelta()*2);};s.rC=function(l){var
D=l.childNodes[0];var
ha=this.c9(l);var
db=l.childNodes[1];var
Bb=l.childNodes[2];var
mb=D.clientWidth,ab=D.clientHeight;var
Ma=new
jsx3.gui.Painted.Box({width:mb,height:a.AW,border:ub.C});Ma.calculate();var
eb=Ma.getPaintedWidth();var
ia=Ma.getPaintedHeight();if(ha.offsetHeight>ab){if(!db)jsx3.html.insertAdjacentHTML(l,ub.v,ub.D+eb+ub.E+ia+ub.F+a.u3+ub.G+this.FN(ub.H,ub.I)+this.FN(ub.J,ub.K)+ub.L);if(!Bb)jsx3.html.insertAdjacentHTML(l,ub.v,ub.M+(ab-a.AW)+ub.N+eb+ub.E+ia+ub.F+a.DL+ub.G+this.FN(ub.H,ub.O)+this.FN(ub.J,ub.K)+ub.L);this.Wu(l);}else{if(db)jsx3.html.removeNode(db);if(Bb)jsx3.html.removeNode(Bb);}};s.Wu=function(h){var
jb=h.childNodes[1];var
wb=h.childNodes[2];var
ba=h.offsetHeight,Cb=h.childNodes[0].childNodes[0].offsetHeight,ga=parseInt(h.childNodes[0].style.top);if(jb)jb.style.visibility=ga>=0?ub.B:ub.P;if(wb)wb.style.visibility=ba>=Cb+ga?ub.B:ub.P;};s.wp=function(p,i){this.xB(p,i,1);};s.SC=function(c,m){this.xB(c,m,-1);};s.QW=function(k,b){window.clearInterval(this._jsxXY);delete this[ub.Q];};s.xB=function(i,l,h){if(this._jsxXY==null){var
B=this;this._jsxXY=window.setInterval(function(){B.dO(h);},a.N6);B.dO(h);}};s.dO=function(h){var
nb=this.getRendered();if(nb){var
Fb=nb.childNodes[0];var
U=nb.offsetHeight,N=Fb.childNodes[0].offsetHeight,F=parseInt(Fb.style.top);var
pa=Math.min(0,Math.max(F+h*a.V6,U-N));Fb.style.top=pa+ub.A;this.Wu(nb);}else this.QW();};s.scrollTo=function(d){var
Ea=this.getRendered();if(!Ea||!Ea.childNodes[1])return;Ea.scrollTop=0;var
ib=Ea.childNodes[0];var
Va=Ea.offsetHeight,ua=ib.childNodes[0].offsetHeight,v=-1*parseInt(ib.style.top),M=d.offsetTop,Ma=d.offsetHeight;var
Y=null;if(M<v+a.AW){Y=M-a.AW;}else if(M>Va+v-a.AW-Ma)Y=M-Va+a.AW+Ma;if(Y!=null){ib.style.top=Math.min(0,Math.max(-1*Y,Va-ua))+ub.A;this.Wu(Ea);}};s.FN=function(e,r){var
Oa=ub.R;return ub.S+e+ub.T+ub.U+this.getId()+ub.V+Oa+ub.W+r+ub.X+ub.Y;};s.yp=function(h,r,o){this[o].call(this,pb.wrap(h),r);};s.applyRatio=function(d){var
Ea=this.getRatio();if(Ea&&d&&d.style){var
cb=null,nb=null;cb=d.offsetHeight;nb=d.offsetWidth;var
v=Math.max(Math.round(Math.sqrt(nb*cb*Ea)),nb);Lb.trace(ub.Z+Ea+ub._+nb+ub.aa+v+ub.ba+cb+ub.ca);d.style.width=v+ub.A;}};s.c9=function(m){return jsx3.html.selectSingleElm(m,this.jZ?ub.da:0);};s.applyRules=function(i,q){var
hb=this.getRendered();var
Ja=this.getDomParent();if(hb==null||Ja==null)return;var
La,Cb,yb,eb,Ua,qb,Ib,cb;if(i==ub.x){La=ub.ea;yb=ub.fa;Cb=ub.ga;eb=ub.ha;Ua=ub.ia;qb=this.getWidth();Ib=ub.ja;cb=ub.ka;}else{La=ub.la;yb=ub.ma;Cb=ub.na;eb=ub.oa;Ua=ub.pa;qb=this.getHeight();Ib=ub.qa;cb=ub.ra;}var
I=(this.getPositionRules())[i].length;var
x=Ja[La];var
ha=0;var
ba=null;Lb.trace(ub.sa+i+ub.ta+q+ub.ua+qb+ub.va+x);for(var
Na=0;Na<I&&!ba;Na++){var
lb=this.getPositionRule(Na,i);var
za=lb.xZ==ub.wa||lb.xZ==ub.xa;if(lb.qF==null){ha=x-q;}else{var
C=this.getPoint(hb,lb.xZ);ha=za?lb.qF-C[i]-q:lb.qF-C[i];}if(za){lb.Px=Math.max(a.ML+Ja[Ua],ha);lb.wQ=lb.qF-a.ML;}else{lb.Px=Math.max(0,ha);lb.wQ=Math.min(x-a.ML-lb.qF,x-2*a.ML);}if(q>lb.wQ){Lb.trace(i+ub.ya+lb.qF+ub.za+lb.xZ+ub.Aa+za+ub.Ba+q+ub.Ca+lb.Px+ub.va+x+ub.Da+lb.wQ);}else{ba=lb;Lb.trace(ub.Ea+i+ub.Fa+lb.qF+ub.za+lb.xZ);}}var
sb=ba!=null;if(!ba)for(var
Na=0;Na<I;Na++){var
lb=this.getPositionRule(Na,i);if(!ba||ba.wQ<lb.wQ)ba=lb;}if(ba){var
ma=ba.Px;var
L=Math.min(q,ba.wQ);Lb.trace(ub.Ga+i+ub.Ha+sb+ub.Ia+ba.qF+ub.Ja+ba.wQ+ub.Ka+ba.xZ+ub.ua+qb+ub.La+ma+ub.Ma+L);hb.style[Cb]=ma+ub.A;if(qb==null){hb.style[eb]=L+ub.A;if(!sb){var
y=hb.childNodes[0];y.style[eb]=ub.Na;var
u=y[yb]-100;y.style[eb]=Math.max(0,L-u)+ub.A;}}}};s.hide=function(){var
O=this.getRendered();if(O)jsx3.html.removeNode(O);if(this.Ev)this.Ev.unsubscribe(ub.y,this);};s.yr=function(j){var
za=j.context.objPARENT;var
cb=(za.getDocument()).getElementById(this.getId());if(cb)jsx3.html.removeNode(cb);this.Ev.unsubscribe(ub.y,this);this.Ev=null;delete a.Q4[this.getId()];this.a2=null;};s.destroy=function(){if(!a.Q4[this.a2])return;this.hide();this.Ev=null;delete a.Q4[this.a2];this.a2=null;};s.getRendered=function(l){var
ia=this.getId();if(ia==null)return null;var
qa=null;if(l instanceof pb){if(l.srcElement())qa=(l.srcElement()).ownerDocument;}else if(l!=null)qa=l.getElementById?l:l.ownerDocument;if(!qa&&this.Ev)qa=this.Ev.getDocument();if(qa)return qa.getElementById(ia);else if(this.Ev!=null&&this.Ev.getServer()!=null)Lb.warn(jsx3._msg(ub.f,this));return null;};s.containsHtmlElement=function(n){var
A=this.getRendered(n);if(A)while(n!=null){if(A==n)return true;n=n.parentNode;}return false;};s.getId=function(){return this.a2;};s._setId=function(g){this.a2=g;};s.getHTML=function(){return this.html;};s.setHTML=function(e,r){this.html=e;if(r){var
Mb=this.getRendered();if(Mb!=null)Mb.innerHTML=e;}return this;};s.getDomParent=function(){return this.dC==null?this.wt():this.dC;};s.setDomParent=function(q){this.dC=q;return this;};s.getRatio=function(){return this.l2;};s.setRatio=function(o){this.l2=o;return this;};s.getOverflow=function(){return this.up==null?2:this.up;};s.setOverflow=function(p){this.up=p;return this;};s.setScrolling=function(j){this.jZ=j;};s.setVisibility=function(m){var
Qa=this.getRendered();if(Qa)Qa.style.visibility=m;return this;};s.getZIndex=function(){return this.qr!=null?this.qr:a.DEFAULTZINDEX;};s.setZIndex=function(n){this.qr=n;return this;};s.getWidth=function(){return this.Vv==null?null:this.Vv;};s.setWidth=function(e){this.Vv=e;return this;};s.getHeight=function(){return this.rz==null?null:this.rz;};s.setHeight=function(k){this.rz=k;return this;};s.addXRule=function(c,r,k,l){var
N=c instanceof jsx3.gui.Event?c.clientX():(this.getPoint(c,r)).X;this.addRule(N,k,l,ub.x);return this;};s.addYRule=function(f,o,n,q){var
na=f instanceof jsx3.gui.Event?f.clientY():(this.getPoint(f,o)).Y;this.addRule(na,n,q,ub.w);return this;};s.addRule=function(b,i,c,p){var
Ba=this.getPositionRules();var
aa=Ba[p];aa[aa.length]={qF:b==null?a.ML:b+c,xZ:i};return this;};s.getPositionRule=function(f,p){return (this.getPositionRules())[p][f];};s.getPositionRules=function(){if(typeof this.zz!=ub.Oa){this.zz={};this.zz.X=[];this.zz.Y=[];}return this.zz;};s.getPoint=function(e,p){if(typeof e==ub.Pa)return {X:e,Y:e};var
fb=null;if(e instanceof jsx3.gui.Block)fb=e.getAbsolutePosition(this.getDomParent());else fb=jsx3.html.getRelativePosition(this.getDomParent(),e);switch(p){case ub.Qa:return {X:fb.L+Math.floor(fb.W/2),Y:fb.T};case ub.xa:return {X:fb.L+Math.floor(fb.W/2),Y:fb.T+fb.H};case ub.wa:return {X:fb.L+fb.W,Y:fb.T+Math.floor(fb.H/2)};case ub.Ra:return {X:fb.L,Y:fb.T+Math.floor(fb.H/2)};case ub.Sa:return {X:fb.L+fb.W,Y:fb.T};case ub.Ta:return {X:fb.L+fb.W,Y:fb.T+fb.H};case ub.Ua:return {X:fb.L,Y:fb.T+fb.H};case ub.Va:return {X:fb.L,Y:fb.T};case ub.Wa:return {X:fb.L+Math.floor(fb.W/2),Y:fb.T+Math.floor(fb.H/2)};}};s.toString=function(){return this.jsxsuper()+ub.Xa+this.getId()+ub.Ya+this.Ev;};a.getVersion=function(){return ub.Za;};});jsx3.Heavyweight=jsx3.gui.Heavyweight;
