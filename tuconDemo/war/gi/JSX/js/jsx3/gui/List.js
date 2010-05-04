/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.xml.Cacheable","jsx3.gui.Form","jsx3.gui.Block","jsx3.gui.Column");jsx3.Class.defineClass("jsx3.gui.List",jsx3.gui.Block,[jsx3.gui.Form,jsx3.xml.Cacheable,jsx3.xml.CDF],function(m,o){var
ub={A:"Nk",Aa:"jsxid",Ab:"TD",B:"-10px",Ba:"strRecordId",Bb:"jsxafterappend",C:"_jsxhead",Ca:"jsxspy",Cb:"A new row could not be appended to ",D:"",Da:"_curSpyRow",Db:" because of an XML error: ",E:"%",Ea:"mouseover",Eb:/&lt;/g,F:"jsxafterresize",Fa:"mouseout",Fb:"<",G:"_jsxghost",Ga:"dblclick",Gb:/&gt;/g,H:"box",Ha:"keydown",Hb:/&amp;/g,I:"div",Ia:"mousedown",Ib:"&",J:"100%",Ja:"<span",Jb:"list.update.1",K:"solid 1px #ffffff;solid 1px #9898a5;solid 1px #9898a5;solid 1px #ffffff",Ka:"Ag",Kb:"A row could not be updated, due to the following reasons(s): ",L:" ",La:' id="',Lb:/(on(?:mousedown|click|focus|blur|mouseup|scroll|keydown|keypress))/gi,M:"padding",Ma:'_jsxcolresize" style="background-color:',Mb:"class",N:"Yk",Na:';" class="jsx30list_colresize"></span>',Nb:"style",O:"click",Oa:'<div id="',Ob:/(on(?:mousedown|click|focus|blur|mouseup|scroll|mouseup|keydown|keypress))/gi,P:"jsxbeforesort",Pa:'" class="jsx30list" ',Pb:"relative",Q:"hidden",Qa:'style="',Qb:/(<(?:img|input)[^>]*)(>)/gi,R:"jsxaftersort",Ra:'"',Rb:"/>",S:"<span id='JSX' style='font-family:Verdana;font-size:10px;padding:0px;height:22px;width:200px;overflow:hidden;text-overflow:ellipsis;filter:progid:DXImageTransform.Microsoft.Gradient(GradientType=1, StartColorStr=#eedfdfe8, EndColorStr=#00ffffff);'><table style='font-family:verdana;font-size:10px;color:#a8a8a8;' cellpadding='3' cellspacing='0'>",Sa:">",Sb:/&nbsp;/g,T:/id=/g,Ta:'<table class="jsx30list_table" border="0" cellpadding="0" cellspacing="0" style="">',Tb:"&#160;",U:"tempid=",Ua:'<tr><td height="',Ub:/&/g,V:/BACKGROUND/g,Va:'" style="position:relative;overflow:hidden;">',Vb:"&amp;",W:"bg",Wa:'_jsxhead" class="jsx30list_headspan" style="',Wb:"text",X:/class=/g,Xa:'">',Xb:"3.0.00",Y:"jsxc=",Ya:"</div>",Z:"</table></span>",Za:'_jsxghost"',_:"JSXDragId",_a:' class="jsx30list_ghost">&#160;</div>',a:"jsx:///xsl/",aa:"normal",ab:"</td></tr>",b:"ie",ba:"No list with id ",bb:" onscroll=\"this.parentNode.parentNode.parentNode.childNodes[0].childNodes[0].childNodes[0].childNodes[0].style.left = -this.scrollLeft + 'px';\" ",c:"fx",ca:".",cb:'" valign="top" style="position:relative;height:',d:"/jsx30list.xsl",da:"bold",db:'_jsxbody"',e:"url(",ea:"JSX_GENERIC",eb:' style="',f:"jsx:///images/list/select.gif",fa:"jsxadopt",fb:";height:",g:")",ga:"jsxctrldrop",gb:'" class="jsx30list_bodyspan">',h:"background-image:url(",ha:"jsxdrop",hb:"</table>",i:"jsx:///images/list/header.gif",ia:"jsxmenu",ib:"background-color:",j:");",ja:"td",jb:";",k:"#F3F2F4",ka:"cellIndex",kb:"height:",l:"#c8cfd8",la:"tr",lb:"px;",m:"ascending",ma:"_jsxbody",mb:'<table cellspacing="0" cellpadding="3" border="0" style="position:absolute;left:0px;top:0px;table-layout:fixed;',n:"descending",na:"tbody",nb:'<tr style="',o:"#2050df",oa:"jsxexecute",ob:'" ',p:"jsx30list_r1",pa:"jsxunselectable",pb:"</tr></table>",q:"//xsl:comment[.='JSXUNCONFIGURED']",qa:"1",qb:'<table jsxid="',r:"JSXCONFIGURED",ra:"//record[@jsxid='",rb:'" cellspacing="0" cellpadding="3" border="0" style="table-layout:fixed;',s:"Error loading XSL for column #",sa:"' and @",sb:';">',t:" of ",ta:"jsxselected",tb:"@",u:": ",ua:"='1']",ub:"jsxafteredit",v:"none",va:"jsxselect",vb:"jsxgroupname",w:"px",wa:"jsxchange",wb:"//record[@jsxgroupname='",x:"jsxbeforeresize",xa:"_jsxV6",xb:"']",y:"visible",ya:"_",yb:"jsxbeforeappend",z:"mouseup",za:"//record[@",zb:"TR"};var
ta=jsx3.gui.Event;var
eb=jsx3.gui.Interactive;var
vb=jsx3.xml.CDF;var
Ba=jsx3.html;var
Ab=jsx3.util.Logger.getLogger(m.jsxclass.getName());m.DEFAULTXSLURL=jsx3.resolveURI(ub.a+(jsx3.CLASS_LOADER.IE?ub.b:ub.c)+ub.d);m.SELECTBGIMAGE=ub.e+jsx3.resolveURI(ub.f)+ub.g;m.DEFAULTBACKGROUNDHEAD=ub.h+jsx3.resolveURI(ub.i)+ub.j;Ba.loadImages(ub.f,ub.i);m.DEFAULTBACKGROUNDCOLOR=ub.k;m.DEFAULTBACKGROUNDCOLORHEAD=ub.l;m.SORTASCENDING=ub.m;m.SORTDESCENDING=ub.n;m.DEFAULTHEADERHEIGHT=20;m.MULTI=1;m.SINGLE=0;m.NOTSELECTABLE=2;m.RESIZEBARBGCOLOR=ub.o;m.DEFAULTROWCLASS=ub.p;o.init=function(r){this.jsxsuper(r);this._jsxFh=null;this._jsxV6=null;this._jsxZ8=null;this._jsxJW=null;};o.onRemoveChild=function(p,b){this.jsxsuper(p,b);this.resetXslCacheData();this.repaint();};o.paintChild=function(c,f){if(!f){this.resetXslCacheData();this.repaint();}};o.qj=function(p){var
Ca=this.jsxsupermix(p);if(Ca.getSourceURL()==p)Ca=Ca.cloneDocument();this._configXSL(Ca);return Ca;};o.getXSL=function(){return this.qj(m.DEFAULTXSLURL);};o._configXSL=function(p){var
Ka=p.selectSingleNode(ub.q);if(Ka!=null){Ka.setValue(ub.r);var
aa=this.Ld();var
pb=aa.length;if(pb>0)for(var
Ia=0;Ia<=pb;Ia++){var
ib=new
jsx3.xml.Document();var
Q=Ia==pb?aa[pb-1].paintXSLString(true):aa[Ia].paintXSLString();ib.loadXML(Q);if(ib.hasError()){Ab.error(ub.s+Ia+ub.t+this+ub.u+ib.getError());}else (Ka.getParent()).insertBefore(ib.getRootNode(),Ka);}}};o.clearXSL=function(){this.resetXslCacheData();return this;};m.MH=function(j){return j&&j.getDisplay()!=ub.v;};o.Ld=function(){return (this.getChildren()).filter(m.MH);};o.doValidate=function(){var
ka=(this.getSelectedNodes()).size()>0||this.getRequired()==0;this.setValidationState(ka?1:0);return this.getValidationState();};o.getResizable=function(){return this.jsxresize==null?1:this.jsxresize;};o.setResizable=function(q){this.jsxresize=q;return this;};o.Ag=function(a,l){if(!a.leftButton())return;ta.publish(a);if(this.getCanResize()!=0){var
ka=l;var
Hb=(this.getRendered()).childNodes[1];var
ya=parseInt(ka.parentNode.parentNode.parentNode.parentNode.parentNode.style.left);var
Nb=ka.parentNode.parentNode.offsetLeft+ya;Hb.style.left=Nb+ub.w;this._jsxZ8=Nb;this._jsxJW=ka.parentNode.parentNode.cellIndex;var
Mb=this._jsxJW-1;var
fb=this.doEvent(ub.x,{objEVENT:a,intINDEX:Mb,intCOLUMNINDEX:Mb})===false;if(!fb){Hb.style.visibility=ub.y;jsx3.gui.Event.subscribe(ub.z,this,ub.A);jsx3.gui.Interactive._beginMove(a,Hb,false,true);}else Hb.style.left=ub.B;}a.cancelReturn();a.cancelBubble();};o.Nk=function(c,q){var
c=c.event;jsx3.gui.Event.unsubscribe(ub.z,this,ub.A);if(q==null)q=(this.getRendered()).childNodes[1];c.releaseCapture(q);var
oa=parseInt(q.style.left);var
Ha=oa-this._jsxZ8;var
Wa=this._jsxJW-1;var
u=this.Ld();var
pa=this.getDocument();var
Db=pa.getElementById(this.getId()+ub.C);var
A=Db.childNodes[0].childNodes[0].childNodes[0].childNodes[Wa];var
ga=A.offsetWidth;var
Hb=u[Wa].getWidth()+ub.D;var
va;if(va=Hb.indexOf(ub.E)>-1){var
Qa=(this.getAbsolutePosition()).W;var
G=ga+Ha;G=parseInt(G/Qa*1000)/10;if(G<2)G=2;G=G+ub.E;}else{var
G=ga+Ha;if(G<4)G=4;}q.style.left=ub.B;var
zb={objEVENT:c,intDIFF:Ha,intINDEX:Wa,intOLDWIDTH:ga,vntWIDTH:G,intCOLUMNINDEX:Wa};var
w=this.doEvent(ub.F,zb);if(!(w===false)){var
X=w instanceof Object&&w.vntWIDTH?w.vntWIDTH:G;u[Wa].setWidth(X);this.resetXslCacheData();this.repaintBody();this.repaintHead();}};o.wf=function(e,s){if(!e.leftButton())return;ta.publish(e);var
wb=(this.getDocument()).getElementById(this.getId()+ub.G);wb.innerHTML=ub.D;var
Xa=parseInt(s.parentNode.parentNode.parentNode.style.left);var
Bb={};Bb.boxtype=ub.H;Bb.tagname=ub.I;Bb.left=s.offsetLeft+Xa;Bb.top=0;Bb.parentheight=s.offsetHeight;Bb.parentwidth=parseInt(s.offsetWidth);Bb.width=ub.J;Bb.height=ub.J;Bb.border=ub.K;Bb.padding=parseInt(s.childNodes[0].offsetTop)+ub.L+(s.style.paddingRight?parseInt(s.style.paddingRight):0)+ub.L+(s.style.paddingBottom?parseInt(s.style.paddingBottom):0)+ub.L+(s.style.paddingLeft?parseInt(s.style.paddingLeft):0);var
ua=new
jsx3.gui.Painted.Box(Bb);wb.style.left=ua.getPaintedLeft()+ub.w;wb.style.top=ua.getPaintedTop()+ub.w;wb.style.width=ua.getPaintedWidth()+ub.w;wb.style.height=ua.getPaintedHeight()+ub.w;wb.style.fontName=s.style.fontName;wb.style.fontSize=s.style.fontSize;wb.style.textAlign=s.style.textAlign;wb.style.fontWeight=s.style.fontWeight;wb.style.visibility=ub.y;jsx3.gui.Painted.ao(wb,ua.Vg(),ub.M);wb.innerHTML=Ba.getOuterHTML(s.childNodes[0]);this._jsxZ8=s.offsetLeft+Xa;this._jsxJW=s.cellIndex;jsx3.gui.Event.subscribe(ub.z,this,ub.N);jsx3.gui.Interactive._beginMove(e,wb,false,true);};o.fj=function(r,n){var
N=r.getType()==ub.O?n.cellIndex:this._jsxJW;var
Bb=(this.Ld())[N];var
va=(this.getChildren()).indexOf(Bb);if(this.getCanSort()!=0&&Bb!=null&&Bb.getCanSort()!=0){var
ma={objEVENT:r,intCOLUMNINDEX:va};var
ba=this.doEvent(ub.P,ma);if(ba!==false){var
pa=ba instanceof Object&&ba.intCOLUMNINDEX!=null?ba.intCOLUMNINDEX:va;this.sy(r,pa);}}};o.Yk=function(q,k){var
q=q.event;jsx3.gui.Event.unsubscribe(ub.z,this,ub.N);var
_a=(this.getDocument()).getElementById(this.getId()+ub.G);if(k==null)var
k=_a;q.releaseCapture(_a);_a.style.visibility=ub.Q;if(this._jsxZ8==parseInt(_a.style.left)){this.fj(q,k);}else if(this.getCanReorder()!=0){var
wa=parseInt(_a.style.left);var
nb=this.Ld();var
Ga=(this.getChildren()).length;var
ka=(nb[0].getRendered()).parentNode;var
oa=(this.getChildren()).indexOf(nb[this._jsxJW]);var
L=0;for(var
Da=0;Da<Ga;Da++)if(m.MH(this.getChild(Da))){var
y=ka.childNodes[L].offsetLeft;if(wa<y){if(oa!=Da)this.xg(oa,Da-1);jsx3.EventHelp.reset();return;}L++;}if(oa!=Ga-1)this.xg(oa,Ga-1);}};o.setSortColumn=function(j){this.sy(this.isOldEventProtocol(),j);};o.sy=function(a,r){this.jsxsortcolumn=r;this.doSort();if(a)this.doEvent(ub.R,{objEVENT:a instanceof jsx3.gui.Event?a:null,intCOLUMNINDEX:r});return this;};o.getSortColumn=function(){return this.jsxsortcolumn;};o.Wd=function(){var
tb=this.jsxsortcolumn!=null?this.getChild(this.jsxsortcolumn)==null?null:(this.getChild(this.jsxsortcolumn)).getSortPath():this.getSortPath();return tb?tb.substring(1):ub.D;};o.xg=function(a,e){var
Xa=this.getChildren();var
bb=Xa.length;var
F=this.getChild(a);if(e<a){for(var
Qa=a;Qa>e;Qa--)if(Qa>0)Xa[Qa]=Xa[Qa-1];Xa[e+1]=F;}else{for(var
Qa=a;Qa<=e;Qa++)if(Qa<=bb-2)Xa[Qa]=Xa[Qa+1];Xa[e]=F;}this.resetXslCacheData();this.repaint();((this.getServer()).getDOM()).onChange(0,this.getId(),(this.getChild(0)).getId());};o.doSort=function(f){if(f!=null){this.setSortDirection(f);}else this.setSortDirection(this.getSortDirection()==ub.m?ub.n:ub.m);this.repaintBody();this.repaintHead();};o.getSortPath=function(){return this.jsxsortpath==null?ub.D:this.jsxsortpath;};o.setSortPath=function(a){this.jsxsortpath=a;return this;};o.getSortDirection=function(){return this.jsxsortdirection==null?ub.m:this.jsxsortdirection;};o.setSortDirection=function(p){this.jsxsortdirection=p;return this;};o.getMultiSelect=function(){return this.jsxmultiselect==null?1:this.jsxmultiselect;};o.setMultiSelect=function(j){this.jsxmultiselect=j;if(j==2)this.deselectAllRecords();return this;};o.getCanReorder=function(){return this.jsxreorder==null?1:this.jsxreorder;};o.setCanReorder=function(j){this.jsxreorder=j;return this;};o.getCanSort=function(){return this.jsxsort==null?1:this.jsxsort;};o.setCanSort=function(g){this.jsxsort=g;return this;};o.getBackgroundColorHead=function(){return this.jsxbgcolorhead;};o.setBackgroundColorHead=function(g){this.jsxbgcolorhead=g;return this;};o.getBackgroundHead=function(){return this.jsxbghead;};o.setBackgroundHead=function(e){this.jsxbghead=e;return this;};o.getHeaderHeight=function(){return this.jsxheaderheight;};o.setHeaderHeight=function(f){this.jsxheaderheight=f;return this;};m.PC=function(b,e,f,j){return ub.S+(((Ba.getOuterHTML(b)).replace(ub.T,ub.U)).replace(ub.V,ub.W)).replace(ub.X,ub.Y)+ub.Z;};m.doBlurItem=function(k){var
nb=k.getAttribute(ub._);var
Ib=k.id.substring(0,k.id.length-(nb.length+1));var
Pa=jsx3.GO(Ib);k.style.fontWeight=ub.aa;if(Pa!=null)Pa._jsxFh=null;};m.doFocusItem=function(k){var
L=k.getAttribute(ub._);var
xa=k.id.substring(0,k.id.length-(L.length+1));var
Hb=jsx3.GO(xa);if(Hb==null){Ab.warn(ub.ba+xa+ub.ca);return;}if(!Hb.Ig(L))return;Ba.focus(k);k.style.fontWeight=ub.da;Hb._jsxFh=k;};o.Xg=function(q,c){if(this.getCanDrag()==1&&q.leftButton()){var
Ea=q.srcElement();var
S=this.OI(Ea);if(S[0]!=null){if(!this.Ig(S[0]))return;ta.publish(q);this.doDrag(q,S[2],m.PC,{strRECORDID:S[0],intCOLUMNINDEX:S[1]});}}};o.eo=function(r,n){var
O=this.OI(r.srcElement());if(this.getCanDrop()==1&&jsx3.EventHelp.isDragging()&&jsx3.EventHelp.JSXID!=this){if(jsx3.EventHelp.DRAGTYPE==ub.ea){var
u=jsx3.EventHelp.JSXID.getId();var
ya=jsx3.EventHelp.DRAGID;var
A=jsx3.GO(u);if(A==null)return;var
sa=jsx3.gui.isMouseEventModKey(r);var
S=A.doEvent(ub.fa,{objEVENT:r,strRECORDID:ya,strRECORDIDS:[ya],objTARGET:this,bCONTROL:sa});var
Fa={objEVENT:r,objSOURCE:A,strDRAGID:ya,strDRAGTYPE:jsx3.EventHelp.DRAGTYPE,strRECORDID:O[0],intCOLUMNINDEX:O[1],bALLOWADOPT:S!==false};var
C=this.doEvent(sa?ub.ga:ub.ha,Fa);if(S!==false&&C!==false&&A.instanceOf(jsx3.xml.CDF))this.adoptRecord(A,ya);}}else if(r.rightButton()){var
Ca;if((Ca=this.getMenu())!=null){var
aa=(this.getServer()).getJSX(Ca);if(aa!=null){var
E={objEVENT:r,objMENU:aa,strRECORDID:O[0],intCOLUMNINDEX:O[1]};var
La=this.doEvent(ub.ia,E);if(La!==false){if(La instanceof Object&&La.objMENU instanceof jsx3.gui.Menu)aa=La.objMENU;aa.showContextMenu(r,this,O[0]);}}}}};o.OI=function(a){var
ca=null;var
Mb=null;var
Bb=null;while(a!=null&&ca==null){if(a.tagName&&a.tagName.toLowerCase()==ub.ja)Mb=a.getAttribute(ub.ka);else if(a.tagName&&a.tagName.toLowerCase()==ub.la){ca=a.getAttribute(ub._);Bb=a;}a=a.parentNode;}return [ca,ca?Mb:null,Bb];};o.K7=function(e,n,p){if(!this.Ig(n.getAttribute(ub._)))return;if(!this.Ig(p.getAttribute(ub._)))return;if(this.getMultiSelect()==2)return;var
Fa=0;var
jb=((this.getDocument()).getElementById(this.getId()+ub.ma)).childNodes[0].childNodes[0];var
O=[],Q=[];for(var
lb=jb.childNodes.length-1;lb>=0;lb--){if(jb.childNodes[lb]==p)Fa++;if(jb.childNodes[lb]==n)Fa++;if(Fa>=1&&Fa<=2){var
sb=jb.childNodes[lb];O.push(sb.getAttribute(ub._),sb);}if(Fa==2)break;}this.gy(e,O,Q,false);m.doFocusItem(n);};o._ebKeyDown=function(c,j){if(this.jsxsupermix(c,j))return;if(this._jsxFh==null)return;var
Ib=(this.getId()).length;var
A=c.keyCode();var
U=this.getMultiSelect()==1;var
ua=false;var
Aa=jsx3.gui.isMouseEventModKey(c);if(A==38){if(this._jsxFh==this._jsxFh.parentNode.firstChild)return;if(U&&Aa){m.doFocusItem(this._jsxFh.previousSibling);}else if(U&&c.shiftKey()){this.K7(c,this._jsxFh.previousSibling,this._jsxV6);}else{var
R=this._jsxFh.previousSibling;this.VO(c,R.getAttribute(ub._),R,false);}ua=true;}else if(A==40){if(this._jsxFh==this._jsxFh.parentNode.lastChild)return;if(U&&Aa){m.doFocusItem(this._jsxFh.nextSibling);}else if(U&&c.shiftKey()){this.K7(c,this._jsxFh.nextSibling,this._jsxV6);}else{var
R=this._jsxFh.nextSibling;this.VO(c,R.getAttribute(ub._),R,false);}ua=true;}else if(A==13){this.Cn(c);ua=true;}else if(A==32){if(U&&Aa){var
B=this._jsxFh.getAttribute(ub._);if(this.isSelected(B)){this.Du(c,B,this._jsxFh);}else this.VO(c,B,this._jsxFh,true);}else if(U&&c.shiftKey()){this.K7(c,c.srcElement(),this._jsxV6);}else{var
R=this._jsxFh;this.VO(c,R.getAttribute(ub._),R,false);}ua=true;}else if(A==9&&c.shiftKey()){this.focus();ua=true;}else if(A==9){Ba.focus((this.getRendered()).lastChild);ua=true;}if(ua)c.cancelAll();};o.qh=function(d,i){var
sa=false;var
Oa=d.srcElement();if(Oa.tagName&&Oa.tagName.toLowerCase()==ub.na||Oa==i){this.a1(d,this.getSelectedIds(),[]);return;}var
mb=this.getRendered();while(jsx3.util.strEmpty(Oa.getAttribute(ub._))&&Oa!=mb)Oa=Oa.parentNode;if(!Oa||!Oa.getAttribute(ub._)){this.a1(d,this.getSelectedIds(),[]);return;}var
gb=this.getMultiSelect()==1;var
Ya=jsx3.gui.isMouseEventModKey(d);if(gb&&d.shiftKey()&&this._jsxV6!=null){this.K7(d,Oa,this._jsxV6);sa=true;}else if(gb&&Ya){var
Ha=Oa.getAttribute(ub._);if(this.isSelected(Ha)){this.Du(d,Ha,Oa);}else{this.VO(d,Ha,Oa,true);m.doFocusItem(Oa);}sa=true;}else{if(this.isSelected(Oa.getAttribute(ub._))){if(Ya||d.shiftKey())this.Du(d,Oa.getAttribute(ub._),Oa);}else this.VO(d,Oa.getAttribute(ub._),Oa,false);sa=true;}if(sa){d.cancelBubble();d.cancelReturn();}};o.Bg=function(n,r){this.Cn(n);};o.executeRecord=function(e){var
ya=this.getRecordNode(e);if(ya!=null)this.eval(ya.getAttribute(ub.oa),{strRECORDID:e});};o.doExecute=function(n){this.Cn(this.isOldEventProtocol(),n!=null?[n]:null);};o.Cn=function(i,e){if(e==null)e=this.getSelectedIds();for(var
Qa=0;Qa<e.length;Qa++){var
Bb=e[Qa];var
sa=this.getRecordNode(Bb);if(sa.getAttribute(ub.pa)==ub.qa)continue;this.eval(sa.getAttribute(ub.oa),{strRECORDID:Bb});}if(e.length>0&&i)this.doEvent(ub.oa,{objEVENT:i instanceof ta?i:null,strRECORDID:e[0],strRECORDIDS:e});};o.isSelected=function(n){return (this.getXML()).selectSingleNode(ub.ra+n+ub.sa+ub.ta+ub.ua)!=null;};o.doSelect=function(c,d,b,r){this.VO(!b&&this.isOldEventProtocol(),c,null,true);if(c&&r)this.revealRecord(c);return this;};o.selectRecord=function(r){if(!this.Ig(r))return;if(this.getMultiSelect()==2)return;this.VO(false,r,null,true);return this;};o.deselectRecord=function(l){this.Du(false,l,null);return this;};o.deselectAllRecords=function(){this.a1(false,this.getSelectedIds(),[]);return this;};o.VO=function(n,l,d,i){var
z=this.getRecordNode(l);if(!z||z.getAttribute(ub.ta)==ub.qa||z.getAttribute(ub.pa)==ub.qa||this.getMultiSelect()==2)return false;var
Da=i&&this.getMultiSelect()==1;if(!Da)this.deselectAllRecords();z.setAttribute(ub.ta,ub.qa);d=d||this.D8(l);if(d!=null){if(!Da){this._jsxV6=d;m.doFocusItem(d);}d.style.backgroundImage=m.SELECTBGIMAGE;}if(n){this.doEvent(ub.va,{objEVENT:n instanceof ta?n:null,strRECORDID:l,strRECORDIDS:[l]});this.doEvent(ub.wa,{objEVENT:n instanceof ta?n:null});}return true;};o.gy=function(e,i,k,f){if(!f)this.deselectAllRecords();for(var
wa=0;wa<i.length;wa++){var
qb=this.VO(false,i[wa],k[wa],true);if(!qb){i.splice(wa,1);k.splice(wa,1);wa--;}}if(e&&i.length>0){this.doEvent(ub.va,{objEVENT:e,strRECORDID:i[0],strRECORDIDS:i});this.doEvent(ub.wa,{objEVENT:e});}};o.Du=function(r,h,f){var
Kb=this.getRecordNode(h);if(!Kb||Kb.getAttribute(ub.ta)!=ub.qa)return false;Kb.removeAttribute(ub.ta);f=f||this.D8(h);if(f!=null){if(this._jsxV6==f){delete this[ub.xa];m.doBlurItem(f);}f.style.backgroundImage=ub.D;}if(r){this.doEvent(ub.va,{objEVENT:r instanceof ta?r:null,strRECORDID:null,strRECORDIDS:[]});this.doEvent(ub.wa,{objEVENT:r instanceof ta?r:null});}return true;};o.a1=function(f,h,j){for(var
_a=0;_a<h.length;_a++){var
Hb=this.Du(false,h[_a],j[_a]);if(!Hb){h.splice(_a,1);j.splice(_a,1);_a--;}}if(f&&h.length>0){this.doEvent(ub.va,{objEVENT:f,strRECORDID:h[0],strRECORDIDS:h});this.doEvent(ub.wa,{objEVENT:f});}};o.focusRecord=function(l){var
Fa=this.D8(l);if(Fa!=null)Ba.focus(Fa);return this;};o.doDeselect=function(n,k){this.Du(this.isOldEventProtocol(),n,null);return this;};o.getActiveRow=function(){return this._jsxV6;};o.revealRecord=function(l,p){var
A=this.D8(l);if(A){var
Ca=p?p.getRendered():this.getRendered();if(Ca)Ba.scrollIntoView(A,Ca,0,10);}};o.D8=function(h){var
ja=this.getDocument();return ja!=null?ja.getElementById(this.getId()+ub.ya+h):null;};o.redrawRecord=function(n,g){if(g==1){this.appendRow(this.getRecord(n),n);}else if(n!=null&&g==0){var
gb;if((gb=this.D8(n))!=null)Ba.removeNode(gb);}else if(n!=null&&g==2)this.updateRow(n);};o.getSelectedNodes=function(){return (this.getXML()).selectNodes(ub.za+ub.ta+ub.ua);};o.getSelectedIds=function(){return ((this.getSelectedNodes()).map(function(q){return q.getAttribute(ub.Aa);})).toArray(true);};o.getValue=function(){var
pa=this.getSelectedIds();return this.getMultiSelect()==1?pa:pa[0];};o.setValue=function(f){if(jsx3.$A.is(f)){if(this.getMultiSelect()!=1)throw new
jsx3.IllegalArgumentException(ub.Ba,f);}else f=f!=null?[f]:[];this.gy(false,f,[],false);return this;};o.Pe=function(k,b){if(this.getCanSpy()==1&&this.getEvent(ub.Ca)){var
tb=this.OI(k.srcElement());if(tb[0]){m._curSpyRow=tb[2];this.applySpyStyle(tb[2]);var
N=k.clientX()+jsx3.EventHelp.DEFAULTSPYLEFTOFFSET;var
ma=k.clientY()+jsx3.EventHelp.DEFAULTSPYTOPOFFSET;var
aa=this;k.he();m.BF=window.setTimeout(function(){if(!this.getParent())return;var
U={objEVENT:k,strRECORDID:tb[0],intCOLUMNINDEX:tb[1]};var
K=aa.doEvent(ub.Ca,U);if(K){jsx3.gui.Interactive.hideSpy();aa.showSpy(K,k);}},jsx3.EventHelp.SPYDELAY);}}};o.nk=function(){if(m._curSpyRow){this.removeSpyStyle(m._curSpyRow);delete m[ub.Da];}window.clearTimeout(m.BF);jsx3.gui.Interactive.hideSpy();};m.Tj={};m.Tj[ub.Ea]=true;m.Tj[ub.Fa]=true;m.Tj[ub.O]=true;m.Tj[ub.Ga]=true;m.Tj[ub.Ha]=true;m.Tj[ub.Ia]=true;m.Tj[ub.z]=true;o.Rc=function(e,b,n){var
ga=this.getDocument();if(ga!=null){var
P=ga.getElementById(this.getId()+ub.ma);if(P!=null){var
v=this.getHeaderHeight()!=null?this.getHeaderHeight():m.DEFAULTHEADERHEIGHT;P.style.height=Math.max(0,e.parentheight-v)+ub.w;}}};o.paint=function(){this.applyDynamicProperties();this._jsxV6=null;var
N=(this.getParent()).ng(this);var
Ua=this.getId();var
V=ub.D;var
C=ub.Ja+this.pi(ub.Ia,ub.Ka,1)+ub.La+Ua+ub.Ma+m.RESIZEBARBGCOLOR+ub.Na;var
_a=this.getHeaderHeight()!=null?this.getHeaderHeight():m.DEFAULTHEADERHEIGHT;var
Ca=ub.Oa+Ua+ub.Pa+ub.Qa+ub.D+this.Ne()+this.qg()+this.dg()+this.Uc()+this.ti()+ub.Ra+this.di()+this.renderAttributes()+ub.Sa;Ca=Ca+ub.Ta;if(_a>0){Ca=Ca+(ub.Ua+_a+ub.Va);Ca=Ca+(ub.Oa+Ua+ub.Wa+this.wg()+this.dk()+ub.Xa);Ca=Ca+this.Ti();Ca=Ca+ub.Ya;Ca=Ca+(ub.Oa+Ua+ub.Za+ub._a);Ca=Ca+ub.ab;V=ub.bb;}var
Za=this.Pj(m.Tj,5);var
Q=N.parentheight-_a;Ca=Ca+(ub.Ua+(_a==0?ub.J:Q)+ub.cb+Q+ub.w+ub.Xa);Ca=Ca+(ub.Oa+Ua+ub.db+Za+V+ub.eb+this.Uc()+this.getBorder()+ub.fb+Q+ub.w+ub.gb);Ca=Ca+this.mf();Ca=Ca+this.Co();Ca=Ca+ub.Ya;Ca=Ca+ub.ab;Ca=Ca+ub.hb;Ca=Ca+C;Ca=Ca+ub.Ya;return Ca;};o.Uc=function(){return ub.ib+(this.getBackgroundColor()?this.getBackgroundColor():m.DEFAULTBACKGROUNDCOLOR)+ub.jb;};o.ti=function(){return this.getBackground()?this.getBackground()+ub.jb:ub.D;};o.wg=function(){return ub.ib+(this.getBackgroundColorHead()?this.getBackgroundColorHead():m.DEFAULTBACKGROUNDCOLORHEAD)+ub.jb;};o.dk=function(){return this.getBackgroundHead()?this.getBackgroundHead()+ub.jb:m.DEFAULTBACKGROUNDHEAD;};o.kf=function(){return this.getClassName()?this.getClassName():m.DEFAULTROWCLASS;};o.Jj=function(){return ub.kb+(this.getHeaderHeight()?this.getHeaderHeight():m.DEFAULTHEADERHEIGHT)+ub.lb;};o.Co=function(){return ub.D;};o.Ti=function(){var
Bb=ub.mb+this.Jj()+ub.Xa;Bb=Bb+(ub.nb+this.Jj()+ub.ob+this.Rh()+ub.Sa);var
ra=this.Ld();var
Pa=this.getChildren();var
Jb=Pa.length;var
Hb=0;for(var
v=0;Hb<=ra.length;v++)if(Pa[v]==null||m.MH(Pa[v])){if(Hb==ra.length){if(ra.length>0)Bb=Bb+ra[ra.length-1].paint(true);}else if(v<Pa.length){var
sa=v==this.getSortColumn()?this.getSortDirection():null;Bb=Bb+Pa[v].paint(false,sa);}Hb++;}Bb=Bb+ub.pb;return Bb;};o.mf=function(){var
Ia=ub.qb+this.getId()+ub.rb+this.ti()+this.ze()+this.wm()+this._i()+ub.sb;Ia=Ia+this.doTransform();Ia=Ia+ub.hb;return Ia;};o.repaintBody=function(){var
T=this.getDocument();if(T!=null){var
G=T.getElementById(this.getId()+ub.ma);if(G!=null)Ba.setOuterHTML(G.childNodes[0],this.mf());}};o.repaintHead=function(){var
Na=this.getDocument();if(Na!=null){var
aa=Na.getElementById(this.getId()+ub.C);if(aa!=null){Ba.setOuterHTML(aa.childNodes[0],this.Ti());this.scrollHead();}}};o.scrollHead=function(){var
ha=this.getDocument();var
ob=ha.getElementById(this.getId()+ub.ma);if(ob&&ob.scrollLeft!=0){var
I=ha.getElementById(this.getId()+ub.C);if(I!=null)I.childNodes[0].style.left=-ob.scrollLeft+ub.w;}};o.doTransform=function(e){var
Ja={};if(e)Ja.jsxrowid=e;Ja.jsxtabindex=isNaN(this.getIndex())?0:this.getIndex();Ja.jsxselectionbg=m.SELECTBGIMAGE;Ja.jsxtransparentimage=jsx3.gui.Block.SPACE;Ja.jsxid=this.getId();Ja.jsxsortpath=this.Wd();Ja.jsxsortdirection=this.getSortDirection();Ja.jsxrowclass=this.kf();Ja.jsxsorttype=this.getSortType();var
Y=this.getXSLParams();for(var Kb in Y)Ja[Kb]=Y[Kb];var
sb=this.jsxsupermix(Ja);sb=this.Xl(sb);return sb;};m.onDelete=function(f,s){var
Ia=Ba.getJSXParent(s);if(Ia instanceof m)Ia.deleteRecord(f);};m.onCheck=function(e,h,a,r,i){var
Gb=jsx3.gui.Event.getCurrent();if(h.substring(0,1)==ub.tb)h=h.substring(1);var
yb=Ba.getJSXParent(a);if(r)a.checked=!a.checked;var
Oa=a.checked;var
ca=Oa?i[0]:i[1];yb.insertRecordProperty(e,h,ca,false);yb.doEvent(ub.ub,{objEVENT:Gb,strATTRIBUTENAME:h,strATTRIBUTEVALUE:ca,strRECORDID:e,objGUI:a,objMASK:null});if(Gb)Gb.cancelReturn();};m.onRadio=function(c,j,g,h,k){if(j.substring(0,1)==ub.tb)j=j.substring(1);if(h)g.checked=true;m.onCheck(c,j,g,false,k);if(h){var
qa=Ba.getJSXParent(g);var
ib=qa.getRecordNode(c);var
Y;if(ib!=null&&(Y=ib.getAttribute(ub.vb))!=null){var
Lb=(qa.getXML()).selectNodes(ub.wb+Y+ub.xb);for(var
rb=0;rb<Lb.getLength();rb++){var
pb=Lb.getItem(rb);if(pb.getAttribute(ub.Aa)!=c)(Lb.getItem(rb)).setAttribute(j,k[1]);}}}};o.appendRow=function(h,c){var
fb=this.getDocument();if(fb!=null){var
_=this.getId();var
Jb=(fb.getElementById(_+ub.ma)).childNodes[0].childNodes[0];var
S=true;if(c==null){c=jsx3.xml.CDF.getKey();S=false;}if(h==null)h={jsxid:c};this.doEvent(ub.yb,{objMASTERRECORD:h});if(S==false)this.insertRecord(h,null,false);var
kb=m.yJ(this.doTransform(c));if(kb!=ub.D){var
Kb=new
jsx3.xml.Document();Kb.loadXML(kb);if(!Kb.hasError()){var
T=fb.createElement(ub.zb);var
w=Kb.getRootNode();m.ID(w,T);var
Na=w.selectNodes(ub.ja);for(var
X=0;X<Na.getLength();X++){w=Na.getItem(X);var
O=fb.createElement(ub.Ab);m.ID(w,O);T.appendChild(O);var
Gb=w.getChildNodes(true);var
La=ub.D;for(var
ga=0;ga<Gb.getLength();ga++)La=La+(Gb.getItem(ga)).toString();O.innerHTML=La;}Jb.appendChild(T);this.doEvent(ub.Bb,{objMASTERRECORD:h,objTR:T});}else Ab.warn(ub.Cb+this+ub.Db+Kb.getError());}}};o.updateRow=function(n){var
ka;if(this.getRecordNode(n)!=null&&(ka=this.D8(n))!=null){var
Ib=m.yJ(this.doTransform(n));if(Ib!=ub.D){var
Pa=new
jsx3.xml.Document();Pa.loadXML(Ib);if(!Pa.hasError()){var
ab=Pa.getRootNode();m.ID(ab,ka);var
O=ab.selectNodes(ub.ja);for(var
na=0;na<O.getLength();na++){ab=O.getItem(na);var
_=ka.childNodes.item(na);m.ID(ab,_);var
wb=ab.getChildNodes(true);var
Da=ub.D;for(var
Cb=0;Cb<wb.getLength();Cb++)Da=Da+((((wb.getItem(Cb)).toString()).replace(ub.Eb,ub.Fb)).replace(ub.Gb,ub.Sa)).replace(ub.Hb,ub.Ib);_.innerHTML=Da;}}else jsx3.util.Logger.doLog(ub.Jb,ub.Kb+Pa.getError(),3,false);}}};m.ID=function(r,f){var
Ib=r.getAttributes();for(var
Mb=0;Mb<Ib.getLength();Mb++){var
xb=Ib.getItem(Mb);var
T=xb.getNodeName();var
Ya=ub.Lb;var
mb=xb.getValue();if(T.match(Ya)){f[T.toLowerCase()]=new
Function(mb);}else if(T==ub.Mb){f.className=mb;}else if(T==ub.Nb){jsx3.gui.Painted.ao(f,mb);}else f.setAttribute(T,mb);}};m.Ws=function(b,q){var
ra=b.getAttributes();for(var
Ra=0;Ra<ra.getLength();Ra++){var
qb=ra.getItem(Ra);var
y=qb.getNodeName();var
Bb=ub.Ob;var
oa=qb.getValue();if(y.match(Bb)){q[y]=new
Function(oa);}else if(y!=ub.Mb){q.setAttribute(y,oa);}else q.className=oa;}if(!q.tagName||q.tagName.toLowerCase()!=ub.la)q.style.position=ub.Pb;};m.yJ=function(n){var
Z=ub.Qb;n=n.replace(Z,function(s,r,q){return r+ub.Rb;});n=(n.replace(ub.Sb,ub.Tb)).replace(ub.Ub,ub.Vb);return n;};o.getGrowBy=function(){return this.jsxgrowby;};o.setGrowBy=function(l){this.jsxgrowby=l;return this;};o.getAutoExpand=function(){return jsx3.Boolean.valueOf(this.getGrowBy());};o.setAutoExpand=function(a){return this.setGrowBy(a?1:0);};o.getSortType=function(){if(this.jsxsorttype==null){if(this.jsxsortcolumn!=null)return this.getChild(this.jsxsortcolumn)==null?ub.Wb:(this.getChild(this.jsxsortcolumn)).getDataType();var
cb=this.getSortPath();for(var
Xa=(this.getChildren()).length-1;Xa>=0;Xa--){var
sa=this.getChild(Xa);if(sa instanceof jsx3.gui.Column&&sa.getSortPath()==cb)return (this.getChild(Xa)).getDataType();}return ub.Wb;}else return this.jsxsorttype;};o.setSortType=function(f){this.jsxsorttype=f;return this;};o.getMaskProperties=function(){return jsx3.gui.Block.MASK_NO_EDIT;};o.getWrap=function(){return this.jsxwrap==null?1:this.jsxwrap;};o.setWrap=function(f){this.resetXslCacheData();this.jsxwrap=f;return this;};o.onSetChild=function(i){return i instanceof jsx3.gui.Column;};o.Ig=function(i){var
Db=this.getRecord(i);return Db!=null&&(Db[ub.pa]==null||Db[ub.pa]!=ub.qa);};m.getVersion=function(){return ub.Xb;};});jsx3.gui.List.prototype.getResizeable=jsx3.gui.List.prototype.getResizable;jsx3.gui.List.prototype.setResizeable=jsx3.gui.List.prototype.setResizable;jsx3.gui.List.prototype.getCanResize=jsx3.gui.List.prototype.getResizable;jsx3.gui.List.prototype.setCanResize=jsx3.gui.List.prototype.setResizable;jsx3.gui.List.prototype.doClearSelections=jsx3.gui.List.prototype.deselectAllRecords;jsx3.gui.List.prototype.deselectRecords=jsx3.gui.List.prototype.deselectAllRecords;jsx3.List=jsx3.gui.List;
