/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.util.Dojo","jsx3.gui.Block");jsx3.util.Dojo.load();dojo.require("dojox.lang.docs");dojo.require("dojo._base.connect");dojo.require("dojo._base.Deferred");dojo.require("dojo._base.json");dojo.require("dojo._base.array");dojo.require("dojo._base.Color");dojo.require("dojo._base.browser");dojo.require("dijit.dijit");dojo.require("dojox.html._base");jsx3.Class.defineClass("jsx3.gui.DojoWidget",jsx3.gui.Block,null,function(l,e){var
ub={A:"getJSON",B:"(",C:")",D:"prop",E:"master.xml",F:"GI_Builder/plugins/jsx3.ide.palette.properties/templates/master.xml",G:"1",H:"dojo",I:"Dojo",J:"attributeMap",K:"params",L:"string",M:'attr("',N:'")',O:'", val)',P:"boolean",Q:"jsxselect",R:/\n/,S:"jsxtextarea",T:"jsxtext",U:"objJSX.set",V:"(vntValue);",W:"enum",X:"jsxid",Y:"jsx3.Boolean.TRUE",Z:"True",_:"jsx3.Boolean.FALSE",a:"/dijit/themes/",aa:"False",b:"/",ba:"event",c:".css",ca:"objEVENT",d:"head",da:"jsx3.gui.Event",e:"style",ea:"the browser event that triggers this event.",f:"type",g:"text/css",h:"dijit_",i:"No dijitClassName defined",j:"open",k:".dijitPopup",l:"jsx30block",m:"onChange",n:"value",o:"beforeEnd",p:"tundra",q:"100%",r:"_",s:"undefined",t:"function",u:"extends",v:"id",w:"class",x:"get",y:"set",z:"object"};e.dijit=null;var
va={};var
Bb;l._insertThemeStyleSheets=function(b,a){var
qa=jsx3.util.Dojo.getPath(ub.a+b+ub.b+b+ub.c);if(!va[qa]){l._insertStyleSheet(qa,a);dojo.addClass(dojo.body(),b);}};l._insertStyleSheet=function(g,r){var
sa=r.ownerDocument;var
M=(sa.getElementsByTagName(ub.d))[0];var
Pa=va[g];if(!Pa){Pa=va[g]=sa.createElement(ub.e);Pa.setAttribute(ub.f,ub.g);M.appendChild(Pa);dojo.xhrGet({url:g,sync:true,load:function(j){var
j=dojox.html._adjustCssPaths(g,j);if(Pa.styleSheet){if(!Pa.styleSheet.cssText){Pa.styleSheet.cssText=j;}else Pa.styleSheet.cssText+=j;}else Pa.appendChild(sa.createTextNode(j));}});}};e.init=function(q,h,c,o,a,g){this.dijitProps=g||{};this.jsxsuper(q,h,c,o,a);this._createDijit(this.dijitProps);};e.onAfterAssemble=function(){var
ia={};for(var M in this)if(M.substring(0,6)==ub.h)ia[M.substring(6)]=this[M];this.jsxsuper.apply(this,arguments);this._createDijit(ia);for(var M in this._jsxHj)this.setEvent(this._jsxHj[M],M);};e.onSetChild=function(){return false;};e._subPropId=function(){return this.dijitClassName;};e._createDijit=function(o){if(!this.dijit){if(!this.dijitClassName)throw new
Error(ub.i);dojo._postLoad=true;dojo.require(this.dijitClassName);if(!Bb&&dijit.popup){Bb=true;dojo.connect(dijit.popup,ub.j,function(){(dojo.query(ub.k)).addClass(ub.l);});}this.dijit=new
(dojo.getObject(this.dijitClassName))(o);setupAccessors(this);var
nb=this;dojo.connect(nb.dijit,ub.m,function(){nb.dijit_value=nb.dijit.attr(ub.n);});}};e.isDomPaint=function(){return !(!this.dijitClassName);};e.paintDom=function(){jsx3.html.insertAdjacentHTML(document.body,ub.o,this.paint());var
_a=document.body.lastChild;l._insertThemeStyleSheets(ub.p,_a);if(this.dijitStyleSheets)dojo.forEach(this.dijitStyleSheets,function(m){l._insertStyleSheet(jsx3.util.Dojo.getPath(ub.b+m),_a);});this.dijit.placeAt(_a);if(this.getHeight())_a.firstChild.style.height=ub.q;return _a;};e.attr=function(a,r){return this.dijit.attr.apply(this.dijit,arguments);};e.onDestroy=function(r){this.dijit.destroyRecursive();this.jsxsuper(r);};e.setEvent=function(c,h){(this.getEvents())[h]=c;var
xa=this._eventHandles=this._eventHandles||{};if(xa[h])dojo.disconnect(xa[h]);var
E=this;xa[h]=dojo.connect(this.dijit,h,function(event){E.doEvent(h,{objEVENT:event});});return this;};function
iterateProperties(q,a){var
D,kb=q.dijit.constructor;while(kb){for(var Ga in kb.properties){D=true;if(Ga.charAt(0)!=ub.r){var
Fb=kb.properties[Ga];var
ya=typeof q.dijit[Ga];if(!Fb.type&&ya!=ub.s&&ya!=ub.t)Fb.type=ya;a(kb.properties[Ga],Ga);}}kb=kb[ub.u];}if(!D)for(var Ga in q.dijit){var
rb=typeof q.dijit[Ga];if(Ga.charAt(0)!=ub.r&&rb!=ub.t)a({type:rb},Ga);}}var
Db=[];function
setupAccessors(k){if(!Ea)Db.push(k);iterateProperties(k,function(b,i){var
oa=(i.charAt(0)).toUpperCase()+i.substring(1,i.length);if(i!=ub.v&&i!=ub.w)if(!k[ub.x+oa]&&!k[ub.y+oa]){var
Ca=k[ub.x+oa]=function(){return k.dijit.attr(i);};Ca._dojoGetter=true;var
Nb=k.dijit.constructor.prototype[i];if(Nb&&typeof Nb==ub.z)k[ub.A+oa]=function(){return ub.B+dojo.toJson(k.dijit.attr(i))+ub.C;};k[ub.y+oa]=function(h){k[ub.h+i]=h;k.dijit.attr(i,h);};}});}var
Ea;e.getMetadataXML=function(o){if(!Ea){Ea=true;dojox.lang.docs.init();for(var
y=0,Ma=Db.length;y<Ma;y++)setupAccessors(Db[y]);}var
P=this;var
La,Pa=this.dijit.constructor;var
Fb=jsx3.xml.CDF.Document.newDocument();if(o==ub.D){Fb.insertRecord({include:ub.E,absinclude:ub.F,group:ub.z});Fb.insertRecord({group:ub.G,jsxid:ub.H,jsxtext:ub.I});function
addProperty(a,y){if(a.type==ub.z&&a.name!=ub.J&&a.name!=ub.K)return;var
Sa=(y.charAt(0)).toUpperCase()+y.substring(1,y.length);if(P[ub.x+Sa]._dojoGetter){var
Gb=Pa.prototype[y];var
sb={jsxid:y,jsxtext:Sa,jsxtip:a.description,eval:a.type==ub.L?0:1,docgetter:typeof Gb==ub.s?ub.M+y+ub.N:ub.x+Sa,docsetter:typeof Gb==ub.s?ub.M+y+ub.O:ub.y+Sa,getter:Gb&&typeof Gb==ub.z?ub.A+Sa:ub.x+Sa,jsxmask:a.type==ub.P?ub.Q:ub.R.test(Pa.prototype[y])?ub.S:ub.T,jsxexecute:ub.U+Sa+ub.V};var
E=Fb.insertRecord(sb,ub.H);if(a.type==ub.P){var
xb=Fb.getXML();var
T=xb.createNode(1,ub.W);T.setAttribute(ub.X,ub.Y);T.setAttribute(ub.T,ub.Z);E.appendChild(T);var
ta=xb.createNode(1,ub.W);ta.setAttribute(ub.X,ub._);ta.setAttribute(ub.T,ub.aa);E.appendChild(ta);}}}iterateProperties(P,addProperty);for(var y in {position:1,1:1,font:1,box_nobg:1,css:1,interaction:1,access:1})Fb.insertRecord({include:ub.E,absinclude:ub.F,group:y});}else if(o==ub.ba){function
addMethod(s,y){Fb.insertRecord({group:ub.H,jsxid:y,jsxtext:y,jsxtip:s.description},ub.H);Fb.insertRecord({jsxid:ub.ca,type:ub.da,jsxtext:ub.ea},y);}while(Pa){for(var y in Pa.methods){La=true;if(y.charAt(0)!=ub.r)addMethod(Pa.methods[y],y);}Pa=Pa[ub.u];}if(!La)for(var y in this.dijit)if(y.charAt(0)!=ub.r&&typeof this.dijit[y]==ub.t)addMethod({},y);}return Fb;};});
