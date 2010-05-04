/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.xml.Cacheable","jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Table",jsx3.gui.Block,[jsx3.gui.Form,jsx3.xml.Cacheable,jsx3.xml.CDF],function(h,a){var
ub={A:"",Aa:"jsxhomepath",B:"jsxposition",Ba:"white-space:nowrap;",C:"jsxchange",Ca:"jsx3.gui.Table.noData",D:"//record",Da:"//xsl:template/tr",E:"jsxindex",Ea:"match",F:"jsxpath",Fa:"record",G:"jsxpathtype",Ga:"The column profile document has errors. A new, empty CDF Document will be used instead. (Description: ",H:"jsxbeforesort",Ha:"jsxwidth",I:"object",Ia:"id",J:"jsxaftersort",Ja:"{$jsxid}_{@jsxid}jsx",K:/^td/i,Ka:"style",L:"jsxmenu",La:"width:",M:"jsxspy",Ma:";{$myselectionbg}{$jsxcellstyle}",N:"_jsxspy",Na:"//xsl:with-param",O:"jsxexecute",Oa:'xmlns:xsl="http://www.w3.org/1999/XSL/Transform"',P:"click",Pa:"select",Q:"dblclick",Qa:"'",R:"mouseover",Ra:"xsl",S:"mouseout",Sa:"<xsl:template",T:"mouseup",Ta:"_jsxZM",U:"mousedown",V:"_syncheadtobody",W:"box",X:"div",Y:"100%",Z:' id="',_:'"',a:"jsx:///xsl/jsxtable.xsl",aa:' class="jsx30table" ',b:"<?xml version=\"1.0\" encoding=\"UTF-8\"?><xsl:stylesheet xmlns:msxsl=\"urn:schemas-microsoft-com:xslt\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\"><xsl:output method=\"xml\" omit-xml-declaration=\"yes\"/><xsl:param name=\"jsxtabindex\">0</xsl:param><xsl:param name=\"jsxselectionbgurl\">JSX/images/matrix/select.gif</xsl:param><xsl:param name=\"jsxid\"/><xsl:param name=\"jsxpath\"/><xsl:param name=\"jsxpathapps\"/><xsl:param name=\"jsxpathprefix\"/><xsl:param name=\"jsxappprefix\"/><xsl:param name=\"jsxsortpath\"/><xsl:param name=\"jsxsortdirection\">ascending</xsl:param><xsl:param name=\"jsxsorttype\">text</xsl:param><xsl:param name=\"jsxshallowfrom\">jsxroot</xsl:param><xsl:param name=\"jsxasyncmessage\"/><xsl:param name=\"jsxheaderheight\"/><xsl:param name=\"jsxrowstyle1\"/><xsl:param name=\"jsxrowclass1\"/><xsl:param name=\"jsxrowstyle2\"/><xsl:param name=\"jsxrowclass2\"/><xsl:param name=\"jsxcellstyle\"/><xsl:param name=\"jsxcellclass\"/><xsl:param name=\"jsxcellwrap\"/><xsl:param name=\"jsxtablestyles\"/><xsl:param name=\"jsx_img_resolve\">1</xsl:param><xsl:param name=\"jsx_1\"/><xsl:param name=\"jsx_2\"/><xsl:param name=\"jsx_3\"/><xsl:param name=\"jsx_4\"/><xsl:param name=\"jsx_5\"/><xsl:param name=\"jsx_6\"/><xsl:param name=\"jsx_7\"/><xsl:param name=\"jsx_8\"/><xsl:param name=\"jsx_9\"/><xsl:param name=\"jsx_10\"/><xsl:param name=\"jsxmininclusive\">0</xsl:param><xsl:param name=\"jsxmaxinclusive\"/><xsl:template match=\"/\"><JSX_FF_WELLFORMED_WRAPPER><xsl:choose><xsl:when test=\"$jsxasyncmessage and $jsxasyncmessage!=''\"><xsl:value-of select=\"$jsxasyncmessage\"/></xsl:when><xsl:when test=\"$jsxmaxinclusive\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30table\" style=\"top:{$jsxheaderheight}px;{$jsxtablestyles}\"><xsl:for-each select=\"//record\"><xsl:sort data-type=\"{$jsxsorttype}\" order=\"{$jsxsortdirection}\" select=\"@*[name()=$jsxsortpath]\"/><xsl:choose><xsl:when test=\"position() &gt;= $jsxmininclusive and position() &lt;= $jsxmaxinclusive\"><xsl:apply-templates mode=\"record\" select=\".\"><xsl:with-param name=\"position\" select=\"position()-1\"/></xsl:apply-templates></xsl:when></xsl:choose></xsl:for-each></table></xsl:when><xsl:otherwise><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30table\" style=\"top:{$jsxheaderheight}px;{$jsxtablestyles}\"><xsl:for-each select=\"//*[@jsxid=$jsxshallowfrom]/record\"><xsl:sort data-type=\"{$jsxsorttype}\" order=\"{$jsxsortdirection}\" select=\"@*[name()=$jsxsortpath]\"/><xsl:apply-templates mode=\"record\" select=\".\"><xsl:with-param name=\"position\" select=\"position()-1\"/></xsl:apply-templates></xsl:for-each></table></xsl:otherwise></xsl:choose></JSX_FF_WELLFORMED_WRAPPER></xsl:template><xsl:template match=\"record\" mode=\"record\"><xsl:param name=\"position\"/><xsl:param name=\"myselectionbg\"><xsl:if test=\"@jsxselected='1'\">background-image:url(<xsl:value-of select=\"$jsxselectionbgurl\"/>);</xsl:if></xsl:param><xsl:param name=\"jsxrowclass\"><xsl:choose><xsl:when test=\"$position mod 2 = 0\"><xsl:value-of select=\"$jsxrowclass2\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"$jsxrowclass1\"/></xsl:otherwise></xsl:choose></xsl:param><xsl:param name=\"jsxrowstyle\"><xsl:choose><xsl:when test=\"$position mod 2 = 0\"><xsl:value-of select=\"$jsxrowstyle2\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"$jsxrowstyle1\"/></xsl:otherwise></xsl:choose><xsl:text>;</xsl:text></xsl:param><tr class=\"jsx30table {$jsxrowclass}\" id=\"{$jsxid}_{@jsxid}\" jsxid=\"{@jsxid}\" jsxposition=\"{$position}\" style=\"{$jsxrowstyle}\" tabindex=\"{$jsxtabindex}\"><xsl:if test=\"@jsxtip\"><xsl:attribute name=\"title\"><xsl:value-of select=\"@jsxtip\"/></xsl:attribute></xsl:if></tr></xsl:template><xsl:template match=\"* | @*\" mode=\"uri-resolver\"><xsl:param name=\"uri\" select=\".\"/><xsl:choose><xsl:when test=\"starts-with($uri,'JSX/')\"><xsl:value-of select=\"concat($jsxpath, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'JSXAPPS/')\"><xsl:value-of select=\"concat($jsxpathapps, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'GI_Builder/')\"><xsl:value-of select=\"concat($jsxpath, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsx:///')\"><xsl:value-of select=\"concat($jsxpath, 'JSX/', substring($uri,8))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsx:/')\"><xsl:value-of select=\"concat($jsxpath, 'JSX/', substring($uri,6))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp:///')\"><xsl:value-of select=\"concat($jsxappprefix, substring($uri,11))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp://')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,10))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp:/')\"><xsl:value-of select=\"concat($jsxappprefix, substring($uri,9))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxuser:///')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,11))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxuser:/')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,9))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxaddin://')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"starts-with($uri,'/')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"contains($uri,'://')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"not($jsxpathprefix='') and not(starts-with($uri, $jsxpathprefix))\"><xsl:apply-templates mode=\"uri-resolver\" select=\".\"><xsl:with-param name=\"uri\" select=\"concat($jsxpathprefix, $uri)\"/></xsl:apply-templates></xsl:when><xsl:otherwise><xsl:value-of select=\"$uri\"/></xsl:otherwise></xsl:choose></xsl:template><xsl:template match=\"* | @*\" mode=\"disable-output-escp\"><xsl:call-template name=\"disable-output-escp\"><xsl:with-param name=\"value\" select=\".\"/></xsl:call-template></xsl:template><xsl:template name=\"disable-output-escp\"><xsl:param name=\"value\" select=\".\"/><xsl:choose><xsl:when test=\"function-available('msxsl:node-set')\"><xsl:value-of disable-output-escaping=\"yes\" select=\"$value\"/></xsl:when><xsl:otherwise><span class=\"disable-output-escp\"><xsl:value-of select=\"$value\"/></span></xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>",ba:'<div class="jsx30table_body" ',c:"text",ca:"scroll",d:"number",da:"nE",e:"jsx:///images/table/select.gif",ea:">",f:"ascending",fa:"</div>",g:"descending",ga:'<div class="jsx30table_head_port" style="height:',h:"jsx:///images/table/sort_desc.gif",ha:"px;width:",i:"jsx:///images/table/sort_asc.gif",ia:'px;">',j:"<td id=\"{$jsxid}_{@jsxid}jsx#ATTNAME#\" class=\"jsx30table {$jsxcellclass}\" unselectable=\"on\" \n  style=\"width:#WIDTH#;{$myselectionbg} {$jsxcellstyle} \">\n  <xsl:apply-templates select=\".\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">\n    <xsl:with-param name=\"attname\" select=\"'#ATTNAME#'\"/>\n  </xsl:apply-templates>\n</td>",ja:'<div class="jsx30table_head_pane ',k:"<xsl:template match=\"record\" xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\">\n <xsl:param name=\"attname\"/>\n <div unselectable=\"on\" class=\"{@jsxclass}\" style=\"{@jsxstyle};{$jsxcellwrap}\">\n   <xsl:choose>\n     <xsl:when test=\"$attname = 'jsximg' and @jsximg\">\n       <xsl:variable name=\"jsximg_resolved\">\n         <xsl:apply-templates select=\"attribute::*[name()=$attname]\" mode=\"uri-resolver\"/>\n       </xsl:variable>\n       <img unselectable=\"on\" src=\"{$jsximg_resolved}\"/>\n     </xsl:when>\n     <xsl:otherwise>\n       <xsl:value-of select=\"attribute::*[name()=$attname]\"/>\n       <xsl:if test=\"not(attribute::*[name()=$attname])\">&#160;</xsl:if>\n     </xsl:otherwise>\n   </xsl:choose>\n </div>\n</xsl:template>",ka:' style="',l:"strId",la:";",m:"_",ma:'">',n:"jsx",na:"background-image:url(",o:"-",oa:");",p:"px",pa:"jsxtext",q:/^tr/i,qa:'<div jsxindex="',r:"jsxid",ra:'" ',s:"_jsxUY",sa:"DQ",t:"//record[@",ta:' class="jsx30table_header_cell" style="width:100px;height:',u:"jsxselected",ua:"px;",v:"='1']",va:"</div></div>",w:"jsxunselectable",wa:"beforeEnd",x:"1",xa:"repaint.data",y:"url(",ya:"jsxroot",z:")",za:"jsxabspath"};var
qb=jsx3.util.Logger.getLogger(h.jsxclass.getName());var
Mb=jsx3.gui.Event;var
V=jsx3.gui.Interactive;var
cb=jsx3.xml.CDF;h.DEFAULTXSLURL=jsx3.resolveURI(ub.a);h.Hs=(new
jsx3.xml.XslDocument()).loadXML(ub.b);h.TYPE_TEXT=ub.c;h.TYPE_NUMBER=ub.d;h.Us=null;h.SELECTION_BG=ub.e;h.SELECTION_UNSELECTABLE=0;h.SELECTION_ROW=1;h.SELECTION_MULTI_ROW=2;h.SORT_ASCENDING=ub.f;h.SORT_DESCENDING=ub.g;h.SORT_DESCENDING_IMG=jsx3.resolveURI(ub.h);h.SORT_ASCENDING_IMG=jsx3.resolveURI(ub.i);h.DEFAULT_HEADER_HEIGHT=20;h.pA=(new
jsx3.xml.Document()).loadXML(ub.j);h.DEFAULT_CELL_VALUE_TEMPLATE=ub.k;a.init=function(k){this.jsxsuper(k);};a.doValidate=function(){var
eb=this.getSelectedIds();var
w=eb.length>0||this.getRequired()==0;this.setValidationState(w?1:0);return this.getValidationState();};a.getValue=function(){var
R=this.getSelectionModel();if(R==2){return this.getSelectedIds();}else return (this.getSelectedIds())[0];};a.setValue=function(l){this.deselectAllRecords();if(l){if(jsx3.$A.is(l)){if(this.getSelectionModel()!=2&&l.length>1)throw new
jsx3.IllegalArgumentException(ub.l,l);}else l=[l];for(var
aa=0;aa<l.length;aa++)this.selectRecord(l[aa]);}return this;};a.wN=function(o){var
Qa=this.getDocument();return Qa.getElementById(this.getId()+ub.m+o);};a.WA=function(n,e){var
Bb=this.getDocument();return Bb.getElementById(this.getId()+ub.m+n+ub.n+e);};a.getContentElement=function(s,j){var
ca=this.WA(s,j);if(ca)return ca;};a.focusRowById=function(l){var
M=this.wN(l);if(M)jsx3.html.focus(M);};a.nE=function(i,l){if(l.parentNode.childNodes[1]){var
Lb=l.scrollLeft;l.parentNode.childNodes[1].childNodes[0].style.left=ub.o+Lb+ub.p;}};a.getSelectionModel=function(p){return this.jsxselectionmodel!=null?this.jsxselectionmodel>2?0:this.jsxselectionmodel:p!=null?p:null;};a.setSelectionModel=function(g){this.jsxselectionmodel=g;};a.qh=function(l,n){var
Ab=l.srcElement();if(Ab==null)return;var
Pa=this.getRendered(n);while(Ab&&Ab!=Pa&&Ab.tagName.search(ub.q)==-1)Ab=Ab.parentNode;if(Ab==Pa)return;var
ma=Ab.getAttribute(ub.r);if(jsx3.gui.isMouseEventModKey(l)){this.LK(ma);if(this.isRecordSelected(ma)){this.Du(l,ma,null);}else this.VO(l,ma,null,true);}else if(l.shiftKey()){var
t=this.uD();if(t){var
bb=this.wN(t);if(bb)this.DD(l,bb,Ab);}else{this.LK(ma);this.VO(l,ma,null,false);}}else{this.LK(ma);if(!this.isRecordSelected(ma))this.VO(l,ma,null,false);}this.focus();};a.dX=function(){if(!this._jsxUY)this._jsxUY={bg:(this.getServer()).resolveURI(this.getSelectionBG(h.SELECTION_BG))};return this._jsxUY.bg;};a.getSelectionBG=function(q){return this.jsxselectionbg?this.jsxselectionbg:q?q:null;};a.setSelectionBG=function(d){delete this[ub.s];this.jsxselectionbg=d;};a.LK=function(j){this._jsxkT=j;};a.uD=function(){return this._jsxkT;};a.gD=function(){return (this.getDocument()).getElementById(this.uD());};a.getSelectedNodes=function(){return (this.getXML()).selectNodes(ub.t+ub.u+ub.v);};a.getSelectedIds=function(){var
bb=[];var
na=(this.getXML()).selectNodeIterator(ub.t+ub.u+ub.v);while(na.hasNext()){var
Q=na.next();bb[bb.length]=Q.getAttribute(ub.r);}return bb;};a.Ig=function(f){var
C=this.getRecord(f);return C&&(C[ub.w]==null||C[ub.w]!=ub.x);};a.isRecordSelected=function(r){var
X=this.getRecord(r);return X!=null&&X[ub.u]==ub.x;};a.selectRecord=function(b){if(this.getSelectionModel()==0)return;if(!this.Ig(b))return;this.VO(false,b,null,this.getSelectionModel()==2);};a.deselectRecord=function(q){this.Du(false,q,null);};a.deselectAllRecords=function(){var
Ab=this.getSelectedIds();var
Ha=Ab.length;for(var
_a=0;_a<Ha;_a++)this.Du(false,Ab[_a]);};a.VO=function(m,r,q,i){var
I=this.getSelectionModel(1);var
da=this.getRecordNode(r);var
P=i||m&&this.getCanDrag()==1;if(I==0||!da||da.getAttribute(ub.u)==ub.x&&P||da.getAttribute(ub.w)==ub.x)return false;var
Qa=i&&I==2;if(!Qa)this.deselectAllRecords();da.setAttribute(ub.u,ub.x);q=q||this.wN(r);if(q!=null){var
lb=ub.y+this.dX()+ub.z;for(var
X=0;X<q.childNodes.length;X++)q.childNodes[X].style.backgroundImage=lb;}this.Wz(m,r);return true;};a.Du=function(r,j,f){var
C=this.getRecordNode(j);if(!C||C.getAttribute(ub.u)!=ub.x)return false;C.removeAttribute(ub.u);f=f||this.wN(j);if(f!=null&&f.childNodes){f.style.backgroundImage=ub.A;for(var
da=0;da<f.childNodes.length;da++)f.childNodes[da].style.backgroundImage=ub.A;}this.Wz(r);return true;};a.DD=function(q,m,n){if(!m||!n)return;var
lb=m.getAttribute(ub.r);var
zb=n.getAttribute(ub.r);if(!this.Ig(lb)||!this.Ig(zb))return;var
R=m.getAttribute(ub.B);var
Ia=n.getAttribute(ub.B);var
ba=Math.min(R,Ia);var
W=Math.max(R,Ia);var
Wa=this.getSelectedIds();var
ja=Wa.length;var
I={};for(var
z=0;z<ja;z++){var
C=this.wN(Wa[z]);if(C.getAttribute(ub.B)<ba||C.getAttribute(ub.B)>W){this.Du(false,Wa[z],C);}else I[Wa[z]]=1;}var
J=n.parentNode;for(var
z=ba;z<=W;z++){var
T=J.childNodes[z].getAttribute(ub.r);if(!I[T])this.VO(false,T,J.childNodes[z],true);}this.Wz(q,zb);};a.Wz=function(f,j){if(!this._jsxJX)this._jsxJX=[];if(f&&f instanceof Mb){var
Ba=this.getValue();this.doEvent(ub.C,{objEVENT:f,strRECORDID:j,strRECORDIDS:Ba,preVALUE:this._jsxJX,_gipp:1});this._jsxJX=Ba;}};a.t9=function(m){var
S=(this.getColumnProfileDocument()).selectNodeIterator(ub.D);var
Eb=0;while(S.hasNext()){var
mb=S.next();if(Eb==m)return mb;Eb++;}};a.DQ=function(o,q){if(this.getCanSort()!=0){var
Aa=Number(q.getAttribute(ub.E));var
za=this.t9(Aa);var
Fb=za.getAttribute(ub.F);var
qa=za.getAttribute(ub.G)||ub.c;this.setSortPath(Fb);this.setSortType(qa);var
ta=this.doEvent(ub.H,{objEVENT:o,intCOLUMNINDEX:Aa,strSORTPATH:Fb,strSORTTYPE:qa});if(ta!==false){if(ta!=null&&typeof ta==ub.I){if(ta.strSORTPATH)this.setSortPath(ta.strSORTPATH);if(ta.strSORTTYPE)this.setSortType(ta.strSORTTYPE);}this.doSort();this.doEvent(ub.J,{objEVENT:o,intCOLUMNINDEX:Aa,strSORTPATH:this.getSortPath(),strSORTTYPE:this.getSortType(),_gipp:1});}}};a.doSort=function(g){if(g){this.setSortDirection(g);}else this.setSortDirection(this.getSortDirection()==ub.f?ub.g:ub.f);if(this.getHeaderHeight()>0){var
Pa=this.getSortPath();var
D=(this.getColumnProfileDocument()).selectNodeIterator(ub.D);var
db=0;var
Xa=(this.getRendered()).childNodes[1].childNodes[0];while(D.hasNext())this.vG(Xa,db++
,(D.next()).getAttribute(ub.F)==Pa);}this.repaintData();};a.vG=function(o,g,l){o.childNodes[g].style.backgroundImage=l?ub.y+(this.getSortDirection()==ub.f?h.SORT_ASCENDING_IMG:h.SORT_DESCENDING_IMG)+ub.z:ub.A;};a.getSortPath=function(){return this.jsxsortpath==null?ub.A:this.jsxsortpath;};a.setSortPath=function(j){this.jsxsortpath=j;};a.getSortType=function(){return this.jsxsorttype==null?ub.c:this.jsxsorttype;};a.setSortType=function(f){this.jsxsorttype=f;};a.getSortDirection=function(){return this.jsxsortdirection==null?ub.f:this.jsxsortdirection;};a.setSortDirection=function(j){this.jsxsortdirection=j;};a.getCanSort=function(){return this.jsxsort;};a.setCanSort=function(r){this.jsxsort=r;};a.redrawRecord=function(g,r){this.repaint();return this;};a.eo=function(i,d){if(i.rightButton()&&this.getMenu()){var
Jb=i.srcElement();if(Jb==null)return;var
Ma=this.getRendered(d);while(Jb&&Jb!=Ma&&Jb.tagName.search(ub.K)==-1)Jb=Jb.parentNode;if(Jb==Ma)return;var
X=Jb.parentNode.getAttribute(ub.r);var
ab=(this.getServer()).getJSX(this.getMenu());if(ab!=null&&this.Ig(X)){var
sa=this.doEvent(ub.L,{objEVENT:i,objMENU:ab,strRECORDID:X,intCOLUMNINDEX:Jb.cellIndex});if(sa!==false){if(sa instanceof Object&&sa.objMENU instanceof jsx3.gui.Menu)ab=sa.objMENU;ab.showContextMenu(i,this,X);}}}};a.Pe=function(m,l){var
T=m.srcElement();if(T==null)return;var
ma=this.getRendered(l);while(T&&T!=ma&&T.tagName.search(ub.K)==-1)T=T.parentNode;if(T==ma)return;if(this.hasEvent(ub.M)){var
na=T.parentNode;var
Nb=na.getAttribute(ub.r);var
S=m.clientX()+jsx3.EventHelp.DEFAULTSPYLEFTOFFSET;var
_=m.clientY()+jsx3.EventHelp.DEFAULTSPYTOPOFFSET;m.he();var
W=this;if(h.Us)window.clearTimeout(h.Us);h.Us=window.setTimeout(function(){h.Us=null;if(W.getParent()!=null)W.Yu(m,Nb,na,T.cellIndex);},jsx3.EventHelp.SPYDELAY);}};a.Yu=function(m,i,l,k){this.removeSpyStyle(l);var
la=this.doEvent(ub.M,{objEVENT:m,strRECORDID:i,intCOLUMNINDEX:k});if(la)this.showSpy(la,m);};a.nk=function(e,o){var
Db=e.isFakeOut(o);var
Na=e.fromElement();if(Na==null)return;if(this.hasEvent(ub.M)){var
Ka=e.toElement();if(!Ka||Ka.id!=ub.N){jsx3.sleep(jsx3.gui.Interactive.hideSpy);if(h.Us)window.clearTimeout(h.Us);}}};a._ebKeyDown=function(f,n){if(this.jsxsupermix(f,n))return;};a.n2=function(b,e){var
db=null;if(e==null)db=this.getSelectedIds();else if(!jsx3.$A.is(e))db=[e];else db=e;for(var
T=0;T<db.length;T++){var
va=db[T];if(va==null||!this.Ig(va))continue;var
z=this.getRecordNode(va);var
Q=z.getAttribute(ub.O);if(Q){var
Wa={strRECORDID:va};if(b instanceof Mb)Wa.objEVENT=b;this.eval(Q,this._getEvtContext(Wa));}}if(b)this.doEvent(ub.O,{objEVENT:b,strRECORDIDS:this.getSelectedIds(),strRECORDID:db[0]});};a.Bg=function(o,q){var
P=o.srcElement();if(P==null)return;var
C=this.getRendered(q);while(P&&P!=C&&P.tagName.search(ub.q)==-1)P=P.parentNode;if(P==C)return;var
la=P.getAttribute(ub.r);if(la)this.n2(o,la);};h.Tj={};h.Tj[ub.P]=true;h.Tj[ub.Q]=true;h.Tj[ub.R]=true;h.Tj[ub.S]=true;h.Tj[ub.T]=true;h.Tj[ub.U]=true;a.Rc=function(m,j,e){this.ag(m,j,e,3);if(j)jsx3.sleep(function(){this.es(this.getRendered());},this.getId()+ub.V,this);};a.Vm=function(m){this.applyDynamicProperties();if(this.getParent()&&(m==null||isNaN(m.parentwidth)||isNaN(m.parentheight))){m=(this.getParent()).ng(this);}else if(m==null)m={};m.boxtype=ub.W;m.tagname=ub.X;if(m.left==null)m.left=0;if(m.top==null)m.top=0;if(m.width==null)m.width=ub.Y;if(m.height==null)m.height=ub.Y;var
Z;if((Z=this.getBorder())!=null&&Z!=ub.A)m.border=Z;return new
jsx3.gui.Painted.Box(m);};a.paint=function(){this.applyDynamicProperties();var
Z=this.getId();var
za=this.doTransform();if(!za)za=this.getNoDataMessage();var
Sa=ub.A;if(this.getEnabled()==1)Sa=this.Pj(h.Tj,0);var
Xa=this.renderAttributes(null,true);var
ab=this.Wl(true);ab.setAttributes(this.Rh()+Sa+ub.Z+Z+ub._+this.di()+ub.aa+Xa);ab.setStyles(this.ze()+this.Uc()+this.Gd()+this.wm()+this._i()+this.yg()+this.qg()+this.Ne()+this.Ae());return (ab.paint()).join(ub.ba+this.pi(ub.ca,ub.da)+ub.ea+za+ub.fa);};a.onAfterPaint=function(n){this.eB(n);};a.onAfterRestoreView=function(l){this.es(l);};a.eB=function(b){var
ha=this.getId();var
T=this.getHeaderHeight();if(T){var
lb=b.childNodes[0];if(lb!=null){do
lb=lb.childNodes[0];while(lb&&lb.tagName&&lb.tagName.search(ub.q)==-1);var
D=[];D.push(ub.ga+T+ub.ha+b.childNodes[0].offsetWidth+ub.ia+ub.ja+this.getHeaderClass(ub.A)+ub._+ub.ka+this.ti()+ub.la+this.getHeaderStyle(ub.A)+ub.ma);var
Ha=this.getSortPath();var
w=ub.na+(this.getSortDirection()==ub.f?h.SORT_ASCENDING_IMG:h.SORT_DESCENDING_IMG)+ub.oa;var
Ua=(this.getColumnProfileDocument()).selectNodeIterator(ub.D);var
J=0;while(Ua.hasNext()){var
ia=Ua.next();var
tb=Ha&&ia.getAttribute(ub.F)==Ha?w:ub.A;var
ja=ia.getAttribute(ub.pa)||ub.A;D.push(ub.qa+J+++ub.ra+this.pi(ub.P,ub.sa)+ub.ta+T+ub.ua+tb+ub.ma+ja+ub.fa);}D.push(ub.va);if(b.childNodes.length==2){jsx3.html.setOuterHTML(b.childNodes[1],D.join(ub.A));}else jsx3.html.insertAdjacentHTML(b,ub.wa,D.join(ub.A));this.es(b);}}};a.es=function(c){if(!this.getParent())return;if(this.getHeaderHeight()>0){var
H=c.childNodes[0];if(c.childNodes.length==2){this.nE(false,c.childNodes[0]);do
H=H.childNodes[0];while(H&&H.tagName&&H.tagName.search(ub.q)==-1);var
Xa=c.childNodes[1].childNodes[0];if(!Xa)return;var
ob=0;if(H){c.childNodes[1].style.width=c.childNodes[0].clientWidth+ub.p;for(var
fa=0;fa<H.childNodes.length;fa++){var
zb=H.childNodes[fa].offsetWidth;var
B=Xa.childNodes[fa].offsetWidth;var
wb=zb-B+window.parseInt(Xa.childNodes[fa].style.width);ob=ob+wb;Xa.childNodes[fa].style.width=wb+ub.p;}}else{var
ca=c.clientWidth;c.childNodes[1].style.width=ca+ub.p;var
ja=parseInt(ca/Xa.childNodes.length);var
Z=ca-ja*(Xa.childNodes.length-1);for(var
fa=0;fa<Xa.childNodes.length;fa++){var
zb=fa==Xa.childNodes.length-1?Z:ja;var
B=Xa.childNodes[fa].offsetWidth;var
wb=zb-B+window.parseInt(Xa.childNodes[fa].style.width);ob=ob+wb;Xa.childNodes[fa].style.width=wb+ub.p;}}Xa.style.width=ob+ub.p;}}};a.repaintHead=function(){this.eB(this.getRendered());};a.repaintData=function(){var
Na=new
jsx3.util.Timer(h.jsxclass,this);var
_a=this.getRendered();if(_a)_a.childNodes[0].innerHTML=this.doTransform();Na.log(ub.xa);};a.doTransform=function(){var
ua={};ua.jsxshallowfrom=this.getRenderingContext(ub.ya);ua.jsxtabindex=this.getIndex()==null?0:this.getIndex();ua.jsxid=this.getId();ua.jsxsortpath=this.getSortPath();ua.jsxsortdirection=this.getSortDirection();ua.jsxsorttype=this.getSortType();ua.jsxpath=jsx3.getEnv(ub.za);ua.jsxpathapps=jsx3.getEnv(ub.Aa);ua.jsxpathprefix=(this.getUriResolver()).getUriPrefix();ua.jsxappprefix=(this.getServer()).getUriPrefix();ua.jsxselectionbgurl=this.dX();ua.jsxheaderheight=this.getHeaderHeight(h.DEFAULT_HEADER_HEIGHT);ua.jsxcellstyle=this.getCellStyle();ua.jsxcellclass=this.getCellClass();ua.jsxrowstyle1=this.getRowStyle();ua.jsxrowclass1=this.getRowClass();ua.jsxrowstyle2=this.getAlternateRowStyle(ua.jsx_rowstyle1);ua.jsxrowclass2=this.getAlternateRowClass(ua.jsx_rowclass1);ua.jsxtablestyles=this.ze()+this.Gd()+this.wm()+this._i();ua.jsxcellwrap=this.getWrap(0)?ub.A:ub.Ba;var
Ma=this.getXSLParams();for(var Nb in Ma)ua[Nb]=Ma[Nb];return jsx3.html.emptyToClosed(this.Xl(this.jsxsupermix(ua)));};a.getHeaderStyle=function(i){return this.jsxheaderstyle?this.jsxheaderstyle:i?i:null;};a.setHeaderStyle=function(o){this.jsxheaderstyle=o;};a.getHeaderClass=function(p){return this.jsxheaderclass?this.jsxheaderclass:p?p:ub.A;};a.setHeaderClass=function(p){this.jsxheaderclass=p;};a.getRowStyle=function(){return this.jsxrowstyle;};a.setRowStyle=function(k){this.jsxrowstyle=k;};a.getAlternateRowStyle=function(k){return this.jsxaltrowstyle?this.jsxaltrowstyle:k?k:null;};a.setAlternateRowStyle=function(n){this.jsxaltrowstyle=n;};a.getCellStyle=function(){return this.jsxcellstyle;};a.setCellStyle=function(e){this.jsxcellstyle=e;};a.getRowClass=function(){return this.jsxrowclass;};a.setRowClass=function(p){this.jsxrowclass=p;};a.getAlternateRowClass=function(q){return this.jsxaltrowclass?this.jsxaltrowclass:q?q:null;};a.setAlternateRowClass=function(o){this.jsxaltrowclass=o;};a.getCellClass=function(){return this.jsxcellclass;};a.setCellClass=function(c){this.jsxcellclass=c;};a.getWrap=function(n){return this.jsxwrap!=null?this.jsxwrap:n!=null?n:null;};a.setWrap=function(r){this.jsxwrap=r;};a.onXmlBinding=function(b){this.jsxsupermix(b);this.repaint();};a.getNoDataMessage=function(){return this.jsxnodata==null?this._getLocaleProp(ub.Ca):this.jsxnodata;};a.onSetChild=function(f){return false;};a.getXSL=function(){return this.t4();};a.t4=function(){var
ba=new
jsx3.util.Timer(h.jsxclass,this);var
Aa=h.Hs||(jsx3.getSharedCache()).getOrOpenDocument(h.DEFAULTXSLURL,null,jsx3.xml.XslDocument.jsxclass);var
Pa=(this.getServer()).getCache();var
ta=Pa.getDocument(this.getXSLId());if(ta==null){ta=Aa.cloneDocument();Pa.setDocument(this.getXSLId(),ta);var
I=ta.selectSingleNode(ub.Da);var
N=this.getValueTemplate(h.DEFAULT_CELL_VALUE_TEMPLATE);var
K=new
jsx3.xml.Document();K.loadXML(N);if(!K.hasError()){K.setAttribute(ub.Ea,ub.Fa);ta.appendChild(K);}else{qb.error(ub.Ga+(K.getError()).description+ub.z);return;}var
Fa=(this.getColumnProfileDocument()).selectNodeIterator(ub.D);while(Fa.hasNext()){var
w=Fa.next();var
ja={jsxpath:w.getAttribute(ub.F),jsxwidth:w.getAttribute(ub.Ha)};if(jsx3.util.strEmpty(ja.jsxwidth)){ja.jsxwidth=ub.A;}else if(!isNaN(ja.jsxwidth))ja.jsxwidth+=ub.p;K=h.pA.cloneDocument();K.setAttribute(ub.Ia,ub.Ja+ja.jsxpath);K.setAttribute(ub.Ka,ub.La+ja.jsxwidth+ub.Ma);(K.selectSingleNode(ub.Na,ub.Oa)).setAttribute(ub.Pa,ub.Qa+ja.jsxpath+ub.Qa);I.appendChild(K);}}ba.log(ub.Ra);return ta;};a.getValueTemplate=function(j){if(this.jsxvaluetemplate!=null&&(jsx3.util.strTrim(this.jsxvaluetemplate)).indexOf(ub.Sa)==0)return this.jsxvaluetemplate;if(j!=null)return j;};a.setValueTemplate=function(m){this.jsxvaluetemplate=m;this.aI();};a.aI=function(i){this.resetXslCacheData();};a.getColumnProfileDocument=function(){if(!this._jsxZM){this._jsxZM=cb.Document.newDocument();if(!jsx3.util.strEmpty(this.jsxcolumnprofile)){this._jsxZM.loadXML(this.jsxcolumnprofile);if(this._jsxZM.hasError()){qb.error(ub.Ga+(this._jsxZM.getError()).description+ub.z);this._jsxZM=cb.Document.newDocument();}else this._jsxZM.convertProperties((this.getServer()).getProperties());}}return this._jsxZM.cloneDocument();};a.getColumnProfile=function(){return this.jsxcolumnprofile;};a.setColumnProfile=function(m){this.jsxcolumnprofile=m+ub.A;delete this[ub.Ta];this.aI();};a.getRenderingContext=function(m){return this.jsxrenderingcontext!=null&&this.jsxrenderingcontext!=ub.A?this.jsxrenderingcontext:m!=null?m:null;};a.setRenderingContext=function(b,j){this.jsxrenderingcontext=b;this.aI(true);if(!j)this.repaint();};a.getHeaderHeight=function(l){return this.jsxheaderheight!=null?Number(this.jsxheaderheight):l?l:null;};a.setHeaderHeight=function(l,b){this.jsxheaderheight=l;if(!b)this.repaint();};});
