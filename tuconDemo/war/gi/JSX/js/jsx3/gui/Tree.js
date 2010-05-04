/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.xml.Cacheable","jsx3.gui.Form","jsx3.gui.Block");jsx3.Class.defineClass("jsx3.gui.Tree",jsx3.gui.Block,[jsx3.gui.Form,jsx3.xml.Cacheable,jsx3.xml.CDF],function(j,b){var
ub={A:"nX",Aa:'"',B:"jsx30tree_texton",Ba:"Ik",C:"//record[@jsxselected='1']",Ca:' style="position:absolute;left:0px;top:0px;width:1px;height:1px;" ',D:"jsxtext",Da:"/>",E:"relative",Ea:' id="',F:"_",Fa:' class="jsx30tree" ',G:"jsxtype",Ga:'<div class="jsx30tree_drop_icon">&#160;</div>',H:"plusminus",Ha:"JSX_GENERIC",I:"text",Ia:"jsxabspath",J:"icon",Ja:"jsxhomepath",K:"<div id='JSX' class='jsx30tree_dragicon' style='",Ka:"3.0.00",L:"'>",M:"</div>",N:"jsxlazy",O:"jsxopen",P:"jsxdata",Q:"object",R:"jsxtoggle",S:"block",T:"none",U:"record",V:"JSXDragId",W:"mouseup",X:"ux",Y:"dropverb",Z:"insertbefore",_:"rowcontext",a:"JSX_TREE_XSL",aa:"jsxadopt",b:"jsx:///xsl/jsxtree.xsl",ba:"jsxctrldrop",c:"<?xml version=\"1.0\" encoding=\"UTF-8\"?><xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\"><xsl:output method=\"xml\" omit-xml-declaration=\"yes\"/><xsl:param name=\"jsxtabindex\">0</xsl:param><xsl:param name=\"jsxicon\"/><xsl:param name=\"jsxiconminus\"/><xsl:param name=\"jsxiconplus\"/><xsl:param name=\"jsxtransparentimage\"/><xsl:param name=\"jsxdragtype\">JSX_GENERIC</xsl:param><xsl:param name=\"jsxrootid\">jsxnull</xsl:param><xsl:param name=\"jsxselectedimage\"/><xsl:param name=\"jsxid\">_jsx_JSX1_12</xsl:param><xsl:param name=\"jsxuseroot\">1</xsl:param><xsl:param name=\"jsxpath\"/><xsl:param name=\"jsxpathapps\"/><xsl:param name=\"jsxpathprefix\"/><xsl:param name=\"jsxappprefix\"/><xsl:param name=\"jsxsortpath\"/><xsl:param name=\"jsxsortdirection\">ascending</xsl:param><xsl:param name=\"jsxsorttype\">text</xsl:param><xsl:param name=\"jsxdeepfrom\">jsxnull</xsl:param><xsl:param name=\"jsxfragment\">0</xsl:param><xsl:param name=\"jsxindent\">20</xsl:param><xsl:param name=\"jsx_no_empty_indent\">0</xsl:param><xsl:param name=\"jsx_img_resolve\">1</xsl:param><xsl:param name=\"jsxtitle\"/><xsl:param name=\"jsxasyncmessage\"/><xsl:template match=\"/\"><JSX_FF_WELLFORMED_WRAPPER><xsl:choose><xsl:when test=\"$jsxasyncmessage and $jsxasyncmessage!=''\"><xsl:value-of select=\"$jsxasyncmessage\"/></xsl:when><xsl:when test=\"$jsxdeepfrom != 'jsxnull' and $jsxfragment != '1'\"><xsl:apply-templates select=\"//*[@jsxid=$jsxdeepfrom]\"/></xsl:when><xsl:when test=\"$jsxuseroot=1\"><xsl:apply-templates select=\"//*[@jsxid=$jsxrootid]\"/></xsl:when><xsl:otherwise><xsl:for-each select=\"//*[@jsxid=$jsxrootid]/record\"><xsl:sort data-type=\"{$jsxsorttype}\" order=\"{$jsxsortdirection}\" select=\"@*[name()=$jsxsortpath]\"/><xsl:apply-templates select=\".\"/></xsl:for-each></xsl:otherwise></xsl:choose></JSX_FF_WELLFORMED_WRAPPER></xsl:template><xsl:template match=\"*\"><xsl:param name=\"myjsxid\" select=\"@jsxid\"/><xsl:param name=\"mystyle\" select=\"@jsxstyle\"/><xsl:param name=\"myclass\" select=\"@jsxclass\"/><xsl:variable name=\"_jsxstyle\"><xsl:if test=\"$jsxselectedimage\">background-image:url(<xsl:value-of select=\"$jsxselectedimage\"/>);</xsl:if></xsl:variable><div class=\"jsx30tree_item\" id=\"{$jsxid}_{$myjsxid}\" jsxid=\"{@jsxid}\" jsxtype=\"item\" unselectable=\"on\"><div class=\"jsx30tree_caption\" jsxtype=\"caption\" unselectable=\"on\"><xsl:if test=\"@jsxtip\"><xsl:attribute name=\"title\"><xsl:value-of select=\"@jsxtip\"/></xsl:attribute></xsl:if><xsl:choose><xsl:when test=\"(record or (@jsxlazy &gt; 0)) and @jsxopen=1\"><img class=\"jsx30tree_pm\" jsxtype=\"plusminus\" src=\"{$jsxiconminus}\"/></xsl:when><xsl:when test=\"(record or (@jsxlazy &gt; 0))\"><img class=\"jsx30tree_pm\" jsxtype=\"plusminus\" src=\"{$jsxiconplus}\"/></xsl:when><xsl:when test=\"$jsx_no_empty_indent='1' and not(../record/record)\"><span class=\"jsx30tree_empty\"><xsl:text>&#160;</xsl:text></span></xsl:when><xsl:otherwise><img class=\"jsx30tree_pm\" jsxtype=\"space\" src=\"{$jsxtransparentimage}\"/></xsl:otherwise></xsl:choose><xsl:choose><xsl:when test=\"@jsximg='' or (not(@jsximg) and $jsxicon='')\"><span class=\"jsx30tree_empty\"><xsl:text>&#160;</xsl:text></span></xsl:when><xsl:when test=\"@jsximg\"><xsl:variable name=\"jsximg_resolved\"><xsl:choose><xsl:when test=\"$jsx_img_resolve='1'\"><xsl:apply-templates mode=\"uri-resolver\" select=\"@jsximg\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"@jsximg\"/></xsl:otherwise></xsl:choose></xsl:variable><img class=\"jsx30tree_icon\" jsxtype=\"icon\" src=\"{$jsximg_resolved}\" unselectable=\"on\"/></xsl:when><xsl:otherwise><img class=\"jsx30tree_icon\" jsxtype=\"icon\" src=\"{$jsxicon}\" unselectable=\"on\"/></xsl:otherwise></xsl:choose><span JSXDragType=\"{$jsxdragtype}\" jsxtype=\"text\" tabindex=\"{$jsxtabindex}\" unselectable=\"on\"><xsl:attribute name=\"class\"><xsl:text>jsx30tree_text </xsl:text><xsl:if test=\"@jsxselected='1'\"><xsl:text>jsx30tree_texton </xsl:text></xsl:if><xsl:value-of select=\"$myclass\"/></xsl:attribute><xsl:attribute name=\"style\"><xsl:if test=\"@jsxselected='1'\"><xsl:value-of select=\"$_jsxstyle\"/></xsl:if><xsl:value-of select=\"@jsxstyle\"/><xsl:value-of select=\"$mystyle\"/></xsl:attribute><xsl:attribute name=\"JSXSpyglass\"><xsl:value-of select=\"@jsxid\"/></xsl:attribute><xsl:attribute name=\"JSXDragId\"><xsl:value-of select=\"@jsxid\"/></xsl:attribute><xsl:value-of select=\"@jsxtext\"/></span></div><div class=\"jsx30tree_content\" jsxtype=\"content\" unselectable=\"on\"><xsl:choose><xsl:when test=\"record\"><xsl:attribute name=\"style\"><xsl:if test=\"@jsxopen='1'\">display:block;</xsl:if><xsl:text>padding-left:</xsl:text><xsl:value-of select=\"$jsxindent\"/><xsl:text>px;</xsl:text></xsl:attribute><xsl:for-each select=\"record\"><xsl:sort data-type=\"{$jsxsorttype}\" order=\"{$jsxsortdirection}\" select=\"@*[name()=$jsxsortpath]\"/><xsl:apply-templates select=\".\"/></xsl:for-each></xsl:when><xsl:otherwise><xsl:text>&#160;</xsl:text></xsl:otherwise></xsl:choose></div></div></xsl:template><xsl:template match=\"* | @*\" mode=\"uri-resolver\"><xsl:param name=\"uri\" select=\".\"/><xsl:choose><xsl:when test=\"starts-with($uri,'JSX/')\"><xsl:value-of select=\"concat($jsxpath, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'JSXAPPS/')\"><xsl:value-of select=\"concat($jsxpathapps, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'GI_Builder/')\"><xsl:value-of select=\"concat($jsxpath, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsx:///')\"><xsl:value-of select=\"concat($jsxpath, 'JSX/', substring($uri,8))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsx:/')\"><xsl:value-of select=\"concat($jsxpath, 'JSX/', substring($uri,6))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp:///')\"><xsl:value-of select=\"concat($jsxappprefix, substring($uri,11))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp://')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,10))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp:/')\"><xsl:value-of select=\"concat($jsxappprefix, substring($uri,9))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxuser:///')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,11))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxuser:/')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,9))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxaddin://')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"starts-with($uri,'/')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"contains($uri,'://')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"not($jsxpathprefix='') and not(starts-with($uri, $jsxpathprefix))\"><xsl:apply-templates mode=\"uri-resolver\" select=\".\"><xsl:with-param name=\"uri\" select=\"concat($jsxpathprefix, $uri)\"/></xsl:apply-templates></xsl:when><xsl:otherwise><xsl:value-of select=\"$uri\"/></xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>",ca:"jsxdrop",d:"jsx:///images/tree/minus.gif",da:"jsxmenu",e:"jsx:///images/tree/plus.gif",ea:"jsxspy",f:"jsx:///images/tree/file.gif",fa:"aZ",g:"jsx:///images/tree/select.gif",ga:"jsxbeforedrop",h:"jsx:///images/matrix/insert_before.gif",ha:"px",i:"jsx:///images/matrix/append.gif",ia:"7px",j:"url(",ja:"12px",k:"jsx:///images/tree/over.gif",ka:"append",l:")",la:"jsxcanceldrop",m:"#8CAEDF",ma:"_jsxspy",n:"#ffffff",na:"jsxexecute",o:"&#160;",oa:"click",p:"jsxselected",pa:"dblclick",q:"1",qa:"mouseover",r:"",ra:"mouseout",s:"null",sa:"mousedown",t:"background-color:",ta:"mousemove",u:";",ua:"keydown",v:"strRecordId",va:"focus",w:"jsxselect",wa:"box",x:"jsxchange",xa:"div",y:"string",ya:"100%",z:"jsxid",za:'<img src="'};var
lb=jsx3.gui.Event;var
db=jsx3.gui.Interactive;var
B=jsx3.html;j.DEFAULTXSLID=ub.a;j.DEFAULTXSLURL=jsx3.resolveURI(ub.b);j.Hs=(new
jsx3.xml.XslDocument()).loadXML(ub.c);j.ICONMINUS=ub.d;j.ICONPLUS=ub.e;j.ICON=ub.f;j.SELECTEDIMAGE=jsx3.resolveURI(ub.g);j.INSERT_BEFORE_IMG=jsx3.resolveURI(ub.h);j.APPEND_IMG=jsx3.resolveURI(ub.i);j.ONDROPBGIMAGE=ub.j+jsx3.resolveURI(ub.k)+ub.l;B.loadImages(j.ICONMINUS,j.ICONPLUS,j.ICON,j.SELECTEDIMAGE,ub.k,j.INSERT_BEFORE_IMG,j.APPEND_IMG);j.BORDERCOLOR=ub.m;j.DEFAULTBACKGROUNDCOLOR=ub.n;j.DEFAULTNODATAMSG=ub.o;j.aZ=null;j.L3=500;j.Us=null;j.Yw=250;j.B2=null;j.MULTI=1;j.SINGLE=0;b.init=function(n,c){this.jsxsuper(n);if(c!=null)this.insertRecordProperty(c,ub.p,ub.q,false);};b.onAfterAttach=function(){this.jsxsuper();if(this.jsxvalue!=null&&this.jsxvalue!=ub.r&&this.jsxvalue!=ub.s)this.setValue(this.jsxvalue);};b.getXSL=function(){return this.qj(j.DEFAULTXSLURL,j.Hs);};b.doValidate=function(){var
Fb=this.c8();var
fb=Fb.length>0||this.getRequired()==0;this.setValidationState(fb?1:0);return this.getValidationState();};b.Uc=function(){return ub.t+(this.getBackgroundColor()?this.getBackgroundColor():j.DEFAULTBACKGROUNDCOLOR)+ub.u;};b.setValue=function(e,a){var
ba=this.getValue();var
cb=this.getMultiSelect()==1;var
Nb=false;Nb=this.isOldEventProtocol();if(jsx3.$A.is(e)){if(!cb)throw new
jsx3.IllegalArgumentException(ub.v,e);}else if(cb)e=[e];if(cb){this.gw();for(var
wa=0;wa<e.length;wa++){var
Za=e[wa];if(Za!=null&&!this.Ig(Za))continue;this.AX(Za);}if(a&&e.length>0)this.revealRecord(e[0]);if(Nb)this.doEvent(ub.w,{strRECORDID:e[0],strRECORDIDS:e});}else{if(e!=null&&!this.Ig(e))return this;this.gw();if(e!=null){this.AX(e);if(a)this.revealRecord(e);}if(Nb)this.doEvent(ub.w,{strRECORDID:e,strRECORDIDS:[e]});}if(Nb)this.doEvent(ub.x,{objEVENT:null,preVALUE:ba,newVALUE:this.getValue(),_gipp:1});return this;};b.A4=function(h,r,i,p,f){var
u=this.getValue();var
Va=this.getMultiSelect()==1;if(Va&&i){if(r!=null&&!this.Ig(r))return;var
Z=false;if(this.Zs(r)){if(p)this.aQ(r);}else{this.AX(r);Z=true;}if(Z&&!f)this.doEvent(ub.w,{objEVENT:h,strRECORDID:r,strRECORDIDS:[r]});}else{var
xa=this.getValue()==r;if(!p&&xa&&!i)return;this.gw();if(r!=null&&!this.Ig(r))r=null;if(r!=null)if(xa)this.aQ(r);else this.AX(r);if(!f){var
eb=xa?null:r;var
Ma=xa?[]:[eb];this.doEvent(ub.w,{objEVENT:h,strRECORDID:eb,strRECORDIDS:Ma});}}if(!f)this.doEvent(ub.x,{objEVENT:h,preVALUE:u,newVALUE:this.getValue(),_gipp:1});};b.zQ=function(d){var
tb=typeof d==ub.y?this.BB(d):d;if(tb!=null&&tb.getAttribute){d=tb.getAttribute(ub.z);if(d)try{B.focus(tb.childNodes[0].childNodes[2]);this.jp(tb.getAttribute(ub.z));}catch(Kb){}}else this.jp(null);};b.jp=function(r){if(r!=null){if(this._jsxf2==null)if(this.getMultiSelect()==1)lb.subscribeLoseFocus(this,this.getRendered(),ub.A);this._jsxf2=r;}else{if(this._jsxf2!=null)lb.unsubscribeLoseFocus(this);this._jsxf2=null;}};b.nX=function(l){lb.unsubscribeLoseFocus(this);this._jsxf2=null;};b.UA=function(p){var
Nb=this.BB(p);if(Nb!=null){var
na=B.selectSingleElm(Nb,0,2);jsx3.html.addClass(na,ub.B);na.style.backgroundImage=ub.j+j.SELECTEDIMAGE+ub.l;}};b.WQ=function(a){var
Da=this.BB(a);if(Da!=null){var
Oa=B.selectSingleElm(Da,0,2);jsx3.html.removeClass(Oa,ub.B);Oa.style.backgroundImage=ub.r;}};b.gw=function(){for(var
Q=this.Ww();Q.hasNext();){var
Ua=Q.next();Ua.removeAttribute(ub.p);this.WQ(Ua.getAttribute(ub.z));}};b.aQ=function(r){this.deleteRecordProperty(r,ub.p,false);this.WQ(r);};b.AX=function(o){this.insertRecordProperty(o,ub.p,ub.q,false);this.UA(o);};b.Ww=function(){return (this.getXML()).selectNodeIterator(ub.C);};b.c8=function(){var
Nb=this.Ww();var
Ya=[];while(Nb.hasNext()){var
nb=Nb.next();Ya[Ya.length]=nb.getAttribute(ub.z);}return Ya;};b.revealRecord=function(f,g){var
U=this.getRecordNode(f);var
Ta=U?U.getParent():null;while(Ta!=null){this.toggleItem(Ta.getAttribute(ub.z),true);Ta=Ta.getParent();}var
Mb=this.BB(f);if(Mb){var
vb=g?g.getRendered(Mb):this.getRendered(Mb);if(vb)B.scrollIntoView(Mb,vb,0,10);}};b.getValue=function(){return this.getMultiSelect()==0?(this.c8())[0]:this.c8();};b.getKeyListener=function(){return this.jsxkeylistener==null?1:this.jsxkeylistener;};b.setKeyListener=function(p){this.jsxkeylistener=p;return this;};b.getText=function(){var
na=(this.Ww()).next();return na!=null?na.getAttribute(ub.D):null;};b.getMultiSelect=function(){return this.jsxmultiselect==null?0:this.jsxmultiselect;};b.setMultiSelect=function(o){this.jsxmultiselect=o;return this;};b.redrawRecord=function(g,r){var
aa=this.BB(g);if(r==0){if(aa)if(aa.parentNode.childNodes.length>1){var
eb=aa.parentNode.parentNode;eb.style.position=ub.r;B.removeNode(aa);eb.style.position=ub.E;}else{var
eb=aa.parentNode.parentNode;var
sb=eb.getAttribute(ub.z);B.setOuterHTML(eb,this.doTransform(sb));}return this;}if(aa==null){var
ca=this.getRecordNode(g);if(ca!=null)if(this.getParent()!=null){ca=ca.getParent();var
sb=ca.getAttribute(ub.z);var
eb=this.BB(sb);if(eb!=null)B.setOuterHTML(eb,this.doTransform(sb));}}else B.setOuterHTML(aa,this.doTransform(g));return this;};b.getRoot=function(){return this.jsxuseroot!=null?this.jsxuseroot:1;};b.setRoot=function(c){this.jsxuseroot=c;return this;};b.getIcon=function(){return this.jsxicon!=null?this.jsxicon:j.ICON;};b.setIcon=function(r){this.jsxicon=r;return this;};b.getIconMinus=function(){return this.jsxiconminus!=null?this.jsxiconminus:j.ICONMINUS;};b.setIconMinus=function(e){this.jsxiconminus=e;return this;};b.getIconPlus=function(){return this.jsxiconplus!=null?this.jsxiconplus:j.ICONPLUS;};b.setIconPlus=function(r){this.jsxiconplus=r;return this;};b.BB=function(g){var
H=this.getDocument();return H!=null?H.getElementById(this.getId()+ub.F+g):null;};b.Ik=function(e,h){if(h!=e.srcElement())return;var
Ma=(this.c8())[0];if(Ma){this.zQ(Ma);}else{var
sa=(this.getRendered(h)).childNodes[0];if(sa!=null)this.zQ(sa);}};b.qh=function(o,k){if(!o.leftButton())return;k=o.srcElement();var
Db=this.getRendered(k);while(jsx3.util.strEmpty(k.getAttribute(ub.G))&&k!=Db)k=k.parentNode;if(k.getAttribute(ub.G)!=null){if(k.getAttribute(ub.G)==ub.H){this.lG(o,k.parentNode.parentNode.getAttribute(ub.z));}else if(k.getAttribute(ub.G)==ub.I||k.getAttribute(ub.G)==ub.J){var
Ib=k.parentNode.parentNode.getAttribute(ub.z);var
Na=this.yH();this.zQ(k.parentNode.parentNode);if(!k.parentNode)k=(this.BB(Ib)).childNodes[0].childNodes[2];if(this.Ig(Ib))if(o.shiftKey()&&this.getMultiSelect()==1){if(Na){this.revealRecord(Na);this.Vp(o,Na,Ib);}else this.A4(o,Ib,false,true);}else{var
G=jsx3.gui.isMouseEventModKey(o);if(G||!this.Zs(Ib))this.A4(o,Ib,G,G);}}else this.zQ((this.c8())[0]);}else this.zQ((this.c8())[0]);};b.yH=function(){if(this._jsxf2!=null)return this._jsxf2;var
Ga=this.c8();if(Ga.length==1)return Ga[0];return null;};b.Vp=function(k,c,h){var
ob=this.getValue();var
Na=false;var
ua=!jsx3.gui.isMouseEventModKey(k)||!this.Zs(h);var
N=[c];var
E=c;while((E=this.cA(E))!=null){N.push(E);if(E==h){Na=true;break;}}if(!Na){N=[c];E=c;while((E=this.Yz(E))!=null){N.push(E);if(E==h){Na=true;break;}}if(!Na)return;}var
Fa=[];for(var
O=0;O<N.length;O++){var
fb=this.Zs(N[O]);if(!fb)Fa.push(N[O]);}if(!jsx3.gui.isMouseEventModKey(k))this.gw();for(var
O=0;O<N.length;O++){var
K=N[O];var
fb=this.Zs(K);if(ua||fb)this.A4(null,K,true,!ua&&fb,true);}if(ua)this.doEvent(ub.w,{objEVENT:k,strRECORDID:Fa[0],strRECORDIDS:Fa});this.doEvent(ub.x,{objEVENT:k,preVALUE:ob,newVALUE:this.getValue(),_gipp:1});};b.Ig=function(q){var
Za=q instanceof jsx3.xml.Entity?q:this.getRecord(q);return Za!=null&&Za.jsxunselectable!=ub.q;};b.Zs=function(i){return (this.getRecordNode(i)).getAttribute(ub.p)==ub.q;};j.getDragIcon=function(s,g,r,h){return ub.K+B.getCSSOpacity(0.75)+ub.L+B.getOuterHTML(s.parentNode.childNodes[1])+B.getOuterHTML(s)+ub.M;};b.toggleItem=function(i,e){var
vb=this.getRecordNode(i);var
sa=this.BB(i);if(sa!=null)this.X6(vb,sa,e);return this;};b.lG=function(n,l,r,s){var
Ab=this.getRecordNode(l);var
_=this.BB(l);if(_!=null){var
Ta=null;if(Ab.getAttribute(ub.N)==ub.q&&Ab.getAttribute(ub.O)!=ub.q&&(r==null||r===true)){B.updateCSSOpacity(_.childNodes[0].childNodes[0],0.5);jsx3.sleep(function(){if(this.getParent()==null)return;var
Ia=this.doEvent(ub.P,{objXML:this.getXML(),objNODE:Ab});if(Ia&&typeof Ia==ub.Q){if(Ia.bCLEAR)Ab.removeAttribute(ub.N);if(Ia.arrNODES!=null){Ab.removeChildren();for(var
x=0;x<Ia.arrNODES.length;x++)Ab.appendChild(Ia.arrNODES[x]);}}else Ab.removeAttribute(ub.N);this.redrawRecord(l,2);if(s!=null)s();},null,this);Ab.setAttribute(ub.O,ub.q);Ta=true;}else{var
C=jsx3.gui.isMouseEventModKey(n);Ta=this.X6(Ab,_,r,C);}this.doEvent(ub.R,{objEVENT:n,strRECORDID:l,objRECORD:Ab,bOPEN:Ta,_gipp:1});}};b.X6=function(p,s,a,e){var
kb=p.getAttribute(ub.O)==ub.q;if(a==null)a=!kb;if(kb==a)return a;if(a){s.childNodes[0].childNodes[0].src=(this.getUriResolver()).resolveURI(this.getIconMinus());s.childNodes[1].style.display=ub.S;p.setAttribute(ub.O,ub.q);}else{s.childNodes[0].childNodes[0].src=(this.getUriResolver()).resolveURI(this.getIconPlus());s.childNodes[1].style.display=ub.T;p.removeAttribute(ub.O);}if(e)for(var
Fb=p.getChildIterator();Fb.hasNext();){var
_a=Fb.next();if(_a.getBaseName()==ub.U&&(_a.getChildIterator()).hasNext()){var
za=this.BB(_a.getAttribute(ub.z));if(za)this.X6(_a,za,a,true);}}return a;};b.Xg=function(r,n){if(this.getCanDrag()==1&&!r.rightButton()){var
Db=r.srcElement();if(Db==null)return;var
Kb=false;if(jsx3.util.strEmpty(Db.getAttribute(ub.G)))Db=Db.parentNode;if(Db.getAttribute(ub.G)==ub.J){Kb=true;Db=Db.parentNode.childNodes[2];}if(Db.getAttribute(ub.G)==ub.I){if(!this.Ig(Db.getAttribute(ub.V)))return;var
Aa=this;r.he();j.B2=window.setTimeout(function(){j.B2=null;lb.unsubscribe(ub.W,Aa,ub.X);if(Aa.getParent()!=null){Aa.qh(r,n);Aa.doDrag(r,Db,j.getDragIcon,{strDRAGIDS:Aa.c8()});}},j.Yw);lb.subscribe(ub.W,this,ub.X);if(Kb){lb.publish(r);r.cancelAll();}}}};b.ux=function(m){lb.unsubscribe(ub.W,this,ub.X);if(j.B2)window.clearTimeout(j.B2);};b.eo=function(n,r){var
Aa=n.srcElement();if(Aa==null)return;var
Qa=Aa.getAttribute(ub.G);if(jsx3.util.strEmpty(Qa))Aa=Aa.parentNode;Qa=Aa.getAttribute(ub.G);if(this.getCanDrop()==1&&jsx3.EventHelp.isDragging()){var
Ra=this.yR(n);var
rb=Ra.getAttribute(ub.Y)==ub.Z;var
xa=Ra.getAttribute(ub._);if(xa!=null){var
Sa=jsx3.EventHelp.JSXID;var
Ga=jsx3.EventHelp.getDragId();var
xb=jsx3.EventHelp.getDragIds();var
P=jsx3.EventHelp.DRAGTYPE;var
Ba=jsx3.gui.isMouseEventModKey(n);if(Sa==null)return;var
ga=Sa.doEvent(ub.aa,{objEVENT:n,strRECORDID:Ga,strRECORDIDS:xb,objTARGET:this,bCONTROL:Ba});var
A={objEVENT:n,strRECORDID:xa,objSOURCE:Sa,strDRAGID:Ga,strDRAGIDS:xb,strDRAGTYPE:P,bINSERTBEFORE:rb,bALLOWADOPT:ga!==false};var
Ca=this.doEvent(Ba?ub.ba:ub.ca,A);if(ga!=false&&Ca!==false&&Sa.instanceOf(jsx3.xml.CDF)){for(var
ka=0;ka<xb.length;ka++)if(rb)this.adoptRecordBefore(Sa,xb[ka],xa);else this.adoptRecord(Sa,xb[ka],xa);this.revealRecord(xb[0]);}}}else if((Qa==ub.I||Qa==ub.J)&&n.rightButton()&&this.getMenu()){var
xa=Aa.parentNode.parentNode.getAttribute(ub.z);var
cb=(this.getServer()).getJSX(this.getMenu());if(cb!=null&&this.Ig(xa)){var
Ma=this.doEvent(ub.da,{objEVENT:n,objMENU:cb,strRECORDID:xa});if(Ma!==false){if(Ma instanceof Object&&Ma.objMENU instanceof jsx3.gui.Menu)cb=Ma.objMENU;var
gb=n.shiftKey()||jsx3.gui.isMouseEventModKey(n);if(this.Zs(xa))this.zQ(xa);else this.A4(n,xa,gb,gb);cb.showContextMenu(n,this,xa);}}}this.BJ(n);};b.Pe=function(i,r){var
ba=i.toElement();if(ba==null)return;var
ib=ba.getAttribute(ub.G);if(ib==ub.I&&this.hasEvent(ub.ea)){var
Wa=ba;while(Wa.getAttribute(ub.z)==null&&Wa!=r)Wa=Wa.parentNode;if(Wa==r)return;var
nb=Wa.getAttribute(ub.z);this.applySpyStyle(ba);var
kb=i.clientX()+jsx3.EventHelp.DEFAULTSPYLEFTOFFSET;var
Xa=i.clientY()+jsx3.EventHelp.DEFAULTSPYTOPOFFSET;i.he();var
H=this;if(j.Us)window.clearTimeout(j.Us);j.Us=window.setTimeout(function(){j.Us=null;if(H.getParent()!=null)H.Yu(i,nb,ba,Wa);},jsx3.EventHelp.SPYDELAY);}};b._ebMouseMove=function(q,g){if(jsx3.EventHelp.isDragging()&&this.getCanDrop()==1){var
za=q.srcElement();if(za==null)return;var
_=za.getAttribute(ub.G);var
nb=za;while(nb.getAttribute(ub.z)==null&&nb!=g)nb=nb.parentNode;if(nb==g)return;var
Hb=nb.getAttribute(ub.z);if(_==ub.H){var
v=(this.getRecordNode(Hb)).getAttribute(ub.O)==ub.q;if(!v&&!j.aZ){var
wa=this;q.he();j.aZ=window.setTimeout(function(){delete j[ub.fa];if(wa.getParent()!=null)wa.lG(q,Hb);},j.L3);}}else if(_==ub.I){var
I=jsx3.EventHelp.getDragSource();var
Ca=jsx3.EventHelp.getDragType();var
J=this.doEvent(ub.ga,{objEVENT:q,strRECORDID:Hb,objSOURCE:I,strDRAGID:jsx3.EventHelp.getDragId(),strDRAGIDS:jsx3.EventHelp.getDragIds(),strDRAGTYPE:Ca,objGUI:nb});if(J===false)return;var
O=this.getAbsolutePosition(g,nb);var
Ab=this.getAbsolutePosition(g,nb.childNodes[0]);var
Lb=this.yR(g);var
t=Lb.style;var
fb=O.L;if(Ab.H/3>q.getOffsetY()){var
na=this.getAbsolutePosition(g,g);t.top=Ab.T-4+ub.ha;t.width=Math.max(0,na.W-fb-8)+ub.ha;t.height=ub.ia;t.backgroundImage=ub.j+j.INSERT_BEFORE_IMG+ub.l;Lb.setAttribute(ub.Y,ub.Z);}else{fb=fb+26;t.width=ub.ja;t.height=ub.ja;t.top=Ab.T-10+Ab.H+ub.ha;t.backgroundImage=ub.j+j.APPEND_IMG+ub.l;Lb.setAttribute(ub.Y,ub.ka);}t.left=fb+ub.ha;Lb.setAttribute(ub._,Hb);t.display=ub.S;}}};b.yR=function(n){return (this.getRendered(n)).lastChild;};b.BJ=function(o){var
z=this.yR(o);z.style.display=ub.T;z.removeAttribute(ub.Y);z.removeAttribute(ub._);};b.Yu=function(f,d,q,c){this.removeSpyStyle(q);var
z=this.doEvent(ub.ea,{objEVENT:f,strRECORDID:d});if(z)this.showSpy(z,f);};b.nk=function(q,g){var
Mb=q.isFakeOut(g);var
Ya=q.fromElement();if(Ya==null)return;var
Ha=Ya.getAttribute(ub.G);if(!Mb&&jsx3.EventHelp.isDragging()&&this.getCanDrop()==1){this.BJ(q);window.clearTimeout(j.aZ);var
Oa=jsx3.EventHelp.JSXID;var
Ab=jsx3.EventHelp.DRAGTYPE;var
Na=Ya.parentNode.parentNode.getAttribute(ub.z);var
xa=Ya.parentNode.parentNode;var
tb=this.doEvent(ub.la,{objEVENT:q,strRECORDID:Na,objSOURCE:Oa,strDRAGID:jsx3.EventHelp.getDragId(),strDRAGIDS:jsx3.EventHelp.getDragIds(),strDRAGTYPE:Ab,objGUI:xa});}else if(Ha==ub.I&&this.hasEvent(ub.ea)){var
vb=q.toElement();if(!vb||vb.id!=ub.ma){jsx3.sleep(jsx3.gui.Interactive.hideSpy);this.removeSpyStyle(Ya);if(j.Us)window.clearTimeout(j.Us);}}};b._ebKeyDown=function(f,s){if(this.jsxsupermix(f,s))return;var
xb=f.keyCode();var
Aa=this.getXML();var
ja=(f.srcElement()).parentNode.parentNode;if(ja!=null&&ja.getAttribute(ub.z)!=null){var
rb=ja.getAttribute(ub.z);if(xb>=37&&xb<=40){var
w=this.getRecordNode(rb);var
na=w.getAttribute(ub.N)==ub.q;if(na||w.selectSingleNode(ub.U)!=null){var
x=true;var
V=w.getAttribute(ub.O)==ub.q;}else var
x=false;if(xb==37){if(x&&V){this.lG(f,rb,false);}else this.x3(w);}else if(xb==38){this.x3(w);}else if(xb==39){if(na&&!V){var
Nb=this;this.lG(f,rb,true,function(){Nb.zQ(rb);});}else if(x&&!V){this.lG(f,rb,true);}else this.rJ(w);}else if(xb==40)this.rJ(w);f.cancelAll();}else if(xb==9){if(f.shiftKey()){B.focusPrevious(this.getRendered(s),f);}else B.focusNext(this.getRendered(s),f);}else if(f.spaceKey()||f.enterKey()){var
Bb=this.Zs(rb);if(Bb&&f.enterKey()){this.n2(f);}else this.A4(f,rb,jsx3.gui.isMouseEventModKey(f)||f.shiftKey(),true);f.cancelAll();}}};b.x3=function(h){var
Ga=this.Yz(h.getAttribute(ub.z));if(Ga!=null)this.zQ(Ga);};b.rJ=function(k){var
kb=this.cA(k.getAttribute(ub.z));if(kb!=null)this.zQ(kb);};b.Yz=function(l){var
ha=this.BB(l);if(ha!=null){var
N=ha.previousSibling;if(N!=null){while(N.childNodes[1].style.display==ub.S){var
F=N.childNodes[1].lastChild;if(F==null)break;N=F;}return N.getAttribute(ub.z);}else return ha.parentNode.parentNode.getAttribute(ub.z);}return null;};b.cA=function(c){var
ib=this.BB(c);if(ib!=null){if(ib.childNodes[1].style.display==ub.S){var
R=ib.childNodes[1].firstChild;if(R!=null)return R.getAttribute(ub.z);}var
fa=ib.nextSibling;if(fa!=null){return fa.getAttribute(ub.z);}else{var
Ca=this.getId();var
Na=ib.parentNode.parentNode;while(Na!=null&&Na.id&&Na.id.indexOf(Ca)==0){if(Na.nextSibling!=null)return Na.nextSibling.getAttribute(ub.z);Na=Na.parentNode.parentNode;}}}return null;};b.executeRecord=function(m){var
mb=null;mb=this.isOldEventProtocol();this.n2(mb,m);};b.n2=function(k,o){var
Ua=null;if(o==null)Ua=this.c8();else if(!jsx3.$A.is(o))Ua=[o];else Ua=o;for(var
Ya=0;Ya<Ua.length;Ya++){var
na=Ua[Ya];if(na==null||!this.Ig(na))continue;var
G=this.getRecordNode(na);var
pa=G.getAttribute(ub.na);if(pa){var
tb={strRECORDID:na};tb.objRECORD=G;if(k instanceof jsx3.gui.Event)tb.objEVENT=k;this.eval(pa,this._getEvtContext(tb));}}if(k)this.doEvent(ub.na,{objEVENT:k,objRECORD:this.getRecordNode(Ua[0]),strRECORDIDS:Ua,strRECORDID:Ua[0]});};b.Bg=function(l,a){var
ta=null;var
ob=l.srcElement();if(ob!=null&&jsx3.util.strEmpty(ob.getAttribute(ub.G)))ob=ob.parentNode;if(ob!=null&&ob.getAttribute(ub.G)!=null&&(ob.getAttribute(ub.G)==ub.I||ob.getAttribute(ub.G)==ub.J))ta=ob.parentNode.parentNode.getAttribute(ub.z);if(ta)this.n2(l);};j.Tj={};j.Tj[ub.oa]=true;j.Tj[ub.pa]=true;j.Tj[ub.qa]=true;j.Tj[ub.ra]=true;j.Tj[ub.W]=true;j.Tj[ub.sa]=true;j.Tj[ub.ta]=true;j.Tj[ub.ua]=true;j.Tj[ub.va]=true;b.Rc=function(f,c,l){this.ag(f,c,l,3);};b.Vm=function(r){this.applyDynamicProperties();if(this.getParent()&&(r==null||isNaN(r.parentwidth)||isNaN(r.parentheight))){r=(this.getParent()).ng(this);}else if(r==null)r={};r.boxtype=ub.wa;r.tagname=ub.xa;if(r.left==null)r.left=0;if(r.top==null)r.top=0;if(r.width==null)r.width=ub.ya;if(r.height==null)r.height=ub.ya;var
Ia,Ha;if((Ia=this.getBorder())!=null&&Ia!=ub.r)r.border=Ia;if((Ha=this.getPadding())!=null&&Ha!=ub.r)r.padding=Ha;return new
jsx3.gui.Painted.Box(r);};b.paint=function(){this.applyDynamicProperties();var
Ca=this.getId();var
A=this.doTransform();if(!A)A=this.getNoDataMessage();A=A+(ub.za+jsx3.gui.Block.SPACE+ub.Aa+this.pi(ub.va,ub.Ba)+ub.Ca+this.uj()+ub.Da);var
F=ub.r;if(this.getEnabled()==1)F=this.Pj(j.Tj,0);var
Xa=this.renderAttributes(null,true);var
Fa=this.Wl(true);Fa.setAttributes(this.Rh()+F+ub.Ea+Ca+ub.Aa+this.di()+ub.Fa+Xa);Fa.setStyles(this.ze()+this.Uc()+this.ti()+this.Gd()+this.dg()+this.wm()+this._i()+this.yg()+this.qg()+this.Ne()+this.Ae());return (Fa.paint()).join(A+ub.Ga);};b.doTransform=function(d){var
G={};var
P=d!=null;if(!P){var
Xa=this.getXML();if(Xa){var
hb=Xa.getChildIterator();if(hb.hasNext())d=(hb.next()).getAttribute(ub.z);}}var
tb=this.getUriResolver();var
oa=this.getIcon(),Bb=this.getIconMinus(),Oa=this.getIconPlus();if(d!=null)G.jsxrootid=d;G.jsxtabindex=this.getIndex()==null?0:this.getIndex();G.jsxselectedimage=j.SELECTEDIMAGE;G.jsxicon=oa?tb.resolveURI(oa):ub.r;G.jsxiconminus=Bb?tb.resolveURI(Bb):ub.r;G.jsxiconplus=Oa?tb.resolveURI(Oa):ub.r;G.jsxtransparentimage=jsx3.gui.Block.SPACE;G.jsxdragtype=ub.Ha;G.jsxid=this.getId();G.jsxuseroot=P?1:this.getRoot();G.jsxfragment=P?1:0;G.jsxpath=jsx3.getEnv(ub.Ia);G.jsxpathapps=jsx3.getEnv(ub.Ja);G.jsxpathprefix=(this.getUriResolver()).getUriPrefix();G.jsxappprefix=(this.getServer()).getUriPrefix();var
Db=this.getXSLParams();for(var J in Db)G[J]=Db[J];return this.Xl(this.jsxsupermix(G));};b.onXmlBinding=function(c){this.jsxsupermix(c);this.repaint();};b.getNoDataMessage=function(){return this.jsxnodata==null?j.DEFAULTNODATAMSG:this.jsxnodata;};b.onSetChild=function(f){return false;};j.getVersion=function(){return ub.Ka;};});jsx3.Tree=jsx3.gui.Tree;
