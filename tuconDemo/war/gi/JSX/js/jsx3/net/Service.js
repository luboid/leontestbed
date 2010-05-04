/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.net.Service",null,[jsx3.util.EventDispatcher],function(c,g){var
ub={A:"1.00",Aa:"SOAP-ENV",Ab:"I",Ac:"1.0",Ad:'.getDocument("',Ae:'.setDocument("',Af:"The XSLT could not be compiled from the CXF source document:\n\t",B:"positiveInteger",Ba:"http://schemas.xmlsoap.org/soap/envelope/",Bb:"stubsrc",Bc:"headers/record",Bd:'").selectSingleNode("',Be:'",jsx3.xml.CDF.Document.newDocument());',Bf:"compile",C:"100",Ca:"SOAP-ENC",Cb:"namespace",Cc:"name",Cd:'").getValue();',Ce:'this.CDFCONTEXT.context.createNode(jsx3.xml.Entity.TYPEELEMENT,"record");',Cf:'<xsl:template match="/">',D:"negativeInteger",Da:"http://schemas.xmlsoap.org/soap/encoding/",Db:"The server namespace referenced by this jsx3.net.Service instance could not be resolved. Please validate that the namespace is correct: ",Dc:"value",Dd:"The map has a rule that references an invalid path to a node in the XML cache document, ",De:"jsxid",Df:"@",E:"-30",Ea:"xsi",Eb:"jsx3.IDE",Ec:"Invalid method. setTimeouts() no longer valid. Use setTimeout() instead.",Ed:": ",Ee:'this.CDFCONTEXT.context.setAttribute("',Ef:'<xsl:template match="*|@*" mode="x',F:"nonPositiveInteger",Fa:"http://www.w3.org/2001/XMLSchema-instance",Fb:"When using the XML Mapping Utility, you must have at lease one GUI component open for edit within GI Builder. Otherwise, there is no server instance to to use as the server context. For now, the IDE context will be used.",Fc:"timeout",Fd:"The map has a rule that references an invalid XML document in the cache: ",Fe:'","',Ff:'">',G:"-40",Ga:"xsd",Gb:"stubpath",Gc:"//record[@jsxskip]",Gd:"CDF Document",Ge:"*[name()='record' and (record or mappings or (@xpointer and not(@xpointer='')))]",Gf:"mappings/record[@name='CDF Document' or @name='CDF Record' or @name='CDF Attribute']",H:"nonNegativeInteger",Ha:"http://www.w3.org/2001/XMLSchema",Hb:"O",Hc:"jsxskip",Hd:"Map to CDF Document",He:"*[local-name()='",Hf:'<data jsxid="jsxroot">',I:"-10",Ia:"xml",Ib:"The URL for the rules file does not reference a valid CXF document. Please make sure that the URL is correct (",Ic:"Creating the request message for the operation, '",Id:'");',Ie:"record[@jsxtext='",If:"</data>",J:"duration",Ja:"http://www.w3.org/XML/1998/namespace",Jb:") and that it returns a valid document:\n\t",Jc:"', using the rules file located at, '",Jd:"CDF Record",Je:"The call to the operation, '",Jf:'<record jsxid="{generate-id()}">',K:"1696-09-01T00:00:00",Ka:"http://xsd.tns.tibco.com/gi/json/2007/",Kb:"jsxrulesxml",Kc:"/",Kd:"Map to CDF Record",Ke:"', hosted at '",Kf:"</record>",L:"dateTime",La:"onSuccess",Lb:"//record[@opname='",Lc:/^([^:]*)(:)/,Ld:'this.CDFCONTEXT.records.next().selectNodes("record");',Le:"' just returned with the HTTP Status code, ",Lf:'<xsl:attribute name="',M:"10-25-2004T11:34:01",Ma:"onError",Mb:"']",Mc:"The stub path (typically the path to the SOAP Envelope Body) does not return a valid node (",Md:"CDF Attribute",Me:"' has returned an error (HTTP Status Code: '",Mf:'"><xsl:value-of select="."/></xsl:attribute>',N:"gYear",Na:"onTimeout",Nb:"//record[@type='T']",Nc:").",Nd:"Map to CDF Attribute",Ne:"').\nDescription: ",Nf:'<xsl:apply-templates select="',O:"2005",Oa:"onInvalid",Ob:"record[@type='",Oc:"The outbound stub URL does not reference a valid document.  Please make sure that the URL is correct (",Od:'this.CDFCONTEXT.context.getAttribute("',Oe:"The static JSON string did not return a valid JSON object when evaluated. The inbound filter (e.g., doInboundFilter()) as well as the inbound mappings (e.g., doInboundMap()) will not be executed.",Of:'" mode="x',P:"10-25-2004",Pa:"onProcessRule",Pb:"function",Pc:"getServiceMessage",Pd:"Script",Pe:"The static JSON string did not return a valid JSON object when evaluated. The inbound filter (e.g., doInboundFilter()) as well as the inbound mappings (e.g., doInboundMap()) will not be executed.\nDescription:",Pf:'"/>',Q:"gMonthDay",Qa:"onResponse",Qb:"object",Qc:"jsx",Qd:"Map to Script",Qe:"' did not return a valid response document. The inbound filter (e.g., doInboundFilter()) as well as the inbound mappings (e.g., doInboundMap()) will not be executed.\nDescription: ",Qf:"</xsl:template>",R:"12-25",Ra:"",Rb:"jsxhttprequest",Rc:"xmlns:",Rd:"this.eval(",Re:"Executing in Static mode, using service message proxy, '",Rf:"record[not(mappings/record[@name='CDF Record' and @value and not(@value='')])]",S:"gDay",Sa:"\t:\t",Sb:"//record[@type='W']",Sc:"mappings/record[@name='CDF Record' and @value and not(@value='')]/@value",Sd:");",Se:"'.",T:"25",Ta:"\r\n",Tb:"src",Tc:"//record[@jsxid='",Td:"???",Te:"An alternate message exchange pattern was encountered for the mapping rule: one-way. The inbound filter and inbound mappings will NOT be run.",U:"gMonth",Ua:"{",Ub:"endpoint",Uc:"The rule node identified by the jsxid, '",Ud:"restrictions/record[@name='nillable' and @value='true']",Ue:"The Cache document, '",V:"12",Va:",",Vb:"Executing the Outbound Filter.",Vc:"', cannot be located. Processing will proceed normally with the active rule and will not be handled by the referenced (unresolved) rule.",Vd:"repeat",Ve:"', is being referenced as a bound CDF document for the operation, '",W:"gYearMonth",Wa:"}",Wb:"onbeforesend",Wc:"type",Wd:"groupref",We:"'. However, this document cannot be located.",X:"2004-12",Xa:"The XML document could not be converted to JSON, because it does not belong to the namespace, ",Xb:"Executing the Inbound Filter.",Xc:"A",Xd:"soaparray",Xe:"mode",Y:"base64Binary",Ya:"safename",Yb:"onafterreceive",Yc:"jsxtext",Yd:"soaparraytype",Ye:"Executing the Inbound Mappings.",Z:"bGJpcmRlYXVAdGliY28uY29t",Za:"array",Zb:"An alternate message exchange pattern was encountered for the mapping rule: one-way. The inbound filter will not be run.",Zc:":",Zd:"Array",Ze:"F",_:"float",_a:"array/literal",_b:"method",_c:"D",_d:"arrayType",_e:"This operation uses a compiled XSLT document to transform the server results to CDF.",a:"Lorem ipsum dolor sit amet consectetuer adipiscing elit In pharetra wisi non dolor Pellentesque a ipsum Nulla laoreet erat a nulla In porta luctus justo Pellentesque arcu odio sollicitudin ac hendrerit non ornare et risus Proin aliquam viverra ligula Aliquam eget lectus eu lorem convallis volutpat Aliquam erat volutpat",aa:"134.52",ab:'"',ac:"POST",ad:"ancestor-or-self::record[(@type='I' or @type='O') and @soapuse='encoded' and @soapencstyle='",ae:"record[@jsxtext='arrayType']/@ttns",af:"jsx3.xml.Template",b:"string",ba:"0.923874",bb:'":[',bc:"jsonp",bd:"datatype",be:"record[@jsxtext='arrayType']/@datatype",bf:"The compiled transformation was successful. Adding the CDF to the server's cache.",c:"int",ca:"anyURI",cb:"[",cc:"record",cd:"simple",ce:"./*",cf:".//record/mappings/record[@name='CDF Document']",d:"1000",da:"http://www.generalinterface.org/",db:"literal",dc:"tns",dd:/[^:]*[:]?/,de:"restrictions/record[@name!='minoccur' and @name!='maxoccur']",df:"The CDF document that was just created could not be cached, because it has no name. Update the Rules document to use a name for the CDF document being created.",e:"integer",ea:"NMTOKEN",eb:"]",ec:"Running in static mode. Using sample response document at '",ed:"xsd:",ee:"restrictions/record[@name='enumeration' and @value='",ef:"CDF Mappings require that the first mapping be of type 'CDF Document' and that this mapping type exist only once for an output. Update the Rules document to use a a CDF Document mapping.",f:"2000",fa:"Y",fb:"simpletype",fc:"'",fd:"ttns",fe:"enumeration",ff:"The merge failed and a CDF Document could not be created, using the compiled CXF. Run this operation in an uncompiled state to better discern the cause of this error:\n\t",g:"double",ga:"NMTOKENS",gb:"simpletype/literal",gc:"get",gd:"xsi:type",ge:"maxExclusive",gf:"jsx:",h:"1.234",ha:"NO",hb:'":',hc:"The static response URL does not reference a valid file. The transaction has been cancelled.  Please make sure that the URL is correct (",hd:"Create Node",he:"maxInclusive",hf:"xmlns:jsx='",i:"boolean",ia:"Name",ib:/^true$|^false$|^null$|^[1-9]+(?:(?:[0-9]*\.*)|\.*)[0-9]*$/,ic:") and that it returns a valid JSON object:\n\t",id:"<",ie:"minInclusive",j:"true",ja:"abc",jb:/^xml|^\d|[\W]/i,jc:"The static response URL does not reference a valid document. The transaction has been cancelled.  Please make sure that the URL is correct (",jd:">",je:"minExclusive",jf:"//",k:"date",ka:"NCName",kb:"( ",kc:/^script$/i,kd:"mappings/record",ke:"length",kf:"An alternate message exchange pattern was encountered for the mapping rule: one-way. The inbound mappings will not be run.",l:"2005-10-19Z",la:"abcdefg",lb:")",lc:"Contacting JSON Service at '",ld:"DOM",le:"maxLength",lf:"doInboundMap",m:"time",ma:"token",mb:"svc.json",mc:"jsxservicecallback_",md:"Map to DOM",me:"minLength",mf:"//*[@xmlns:",n:"22:33:12Z",na:"language",nb:"json",nc:"callback",nd:'jsx3.GO("',ne:"pattern",nf:"]/@xmlns:",o:"short",oa:"en-cockney",ob:"null",oc:"?",od:',"',oe:"validate",of:"jsx3.net.Service.getURLForNS",p:"1",pa:"normalizedString",pb:"number",pc:"-1",pd:").getValue();",pe:"Invalidate",pf:"Could not finde the URI for the given namespace prefix.",q:"unsignedLong",qa:"ID",qb:"val",qc:"&",qd:"OUTBOUND",qe:" != ",qf:"3.0.00",r:"26216842",ra:"IDREFS",rb:"enum",rc:"=",rd:"Could not map the JSX object named, '",re:"INBOUND",rf:'<?xml version="1.0" ?>',s:"unsignedInt",sa:"ENTITY",sb:/^\W/g,sc:"jsxservicecall_",sd:"', because it is null.",se:"jsx3.gui.Form",sf:'<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" ',t:"10",ta:"ENTITIES",tb:"x",tc:"script",td:"NODE",te:"jsx3.gui.RadioButton",tf:'<xsl:output method="xml" omit-xml-declaration="no"/>',u:"unsignedShort",ua:"QName",ub:/^xml/i,uc:"Using static request document located at '",ud:"CACHE",ue:"jsx3.gui.CheckBox",uf:"</xsl:stylesheet>",v:"unsignedByte",va:"qname",vb:"xxx",vc:"The static request URL does not reference a valid document. The transaction has been cancelled.  Please make sure that the URL is correct (",vd:"::",ve:"false",vf:'="',w:"byte",wa:"hexBinary",wb:/^\d/,wc:"The request message could not be generated. The transaction has been cancelled",wd:"Map to Cache Node",we:"jsx3.gui.Block",wf:" ",x:"long",xa:"\\u255\\u254",xb:"d",xc:"Sending request to remote service located at '",xd:'jsx3.getApp("',xe:"Locate Node",xf:' exclude-result-prefixes="',y:"48216842",ya:"notation",yb:/\W/g,yc:"Setting HTTP Request Header, ",yd:'")',ye:').setValue("',yf:'" >',z:"decimal",za:"here is a note",zb:".",zc:" ==> ",zd:"jsx3.CACHE",ze:'").setValue("',zf:"\n"};c.simpletypes={};c.simpletypestext=ub.a;c.simpletypes[ub.b]=function(){var
zb=parseInt(Math.random()*(c.simpletypestext.length-15));return jsx3.util.strTrim(c.simpletypestext.substring(zb,zb+15));};c.simpletypes[ub.c]=ub.d;c.simpletypes[ub.e]=ub.f;c.simpletypes[ub.g]=ub.h;c.simpletypes[ub.i]=ub.j;c.simpletypes[ub.k]=ub.l;c.simpletypes[ub.m]=ub.n;c.simpletypes[ub.o]=ub.p;c.simpletypes[ub.q]=ub.r;c.simpletypes[ub.s]=ub.t;c.simpletypes[ub.u]=ub.p;c.simpletypes[ub.v]=ub.t;c.simpletypes[ub.w]=ub.t;c.simpletypes[ub.x]=ub.y;c.simpletypes[ub.z]=ub.A;c.simpletypes[ub.B]=ub.C;c.simpletypes[ub.D]=ub.E;c.simpletypes[ub.F]=ub.G;c.simpletypes[ub.H]=ub.t;c.simpletypes[ub.F]=ub.I;c.simpletypes[ub.J]=ub.K;c.simpletypes[ub.L]=ub.M;c.simpletypes[ub.N]=ub.O;c.simpletypes[ub.k]=ub.P;c.simpletypes[ub.Q]=ub.R;c.simpletypes[ub.S]=ub.T;c.simpletypes[ub.U]=ub.V;c.simpletypes[ub.W]=ub.X;c.simpletypes[ub.Y]=ub.Z;c.simpletypes[ub._]=ub.aa;c.simpletypes[ub.z]=ub.ba;c.simpletypes[ub.ca]=ub.da;c.simpletypes[ub.ea]=ub.fa;c.simpletypes[ub.ga]=ub.ha;c.simpletypes[ub.ia]=ub.ja;c.simpletypes[ub.ka]=ub.la;c.simpletypes[ub.ma]=ub.fa;c.simpletypes[ub.na]=ub.oa;c.simpletypes[ub.pa]=c.simpletypes[ub.b];c.simpletypes[ub.qa]=ub.qa;c.simpletypes[ub.ra]=ub.ra;c.simpletypes[ub.sa]=ub.sa;c.simpletypes[ub.ta]=ub.ta;c.simpletypes[ub.ua]=ub.va;c.simpletypes[ub.wa]=ub.xa;c.simpletypes[ub.ya]=ub.za;c.inc_inc=0;c.IE={};c.IE[ub.Aa]=ub.Ba;c.IE[ub.Ca]=ub.Da;c.IE[ub.Ea]=ub.Fa;c.IE[ub.Ga]=ub.Ha;c.IE[ub.Ia]=ub.Ja;c.json_namespace=ub.Ka;c.ON_SUCCESS=ub.La;c.ON_ERROR=ub.Ma;c.ON_TIMEOUT=ub.Na;c.ON_INVALID=ub.Oa;c.ON_PROCESS_RULE=ub.Pa;g.init=function(i,d,s,p){this.setRulesURL(i);this.setOperationName(d);if(s!=null)this.setOutboundURL(s);if(p!=null)this.setInboundURL(p);var
za=new
jsx3.net.Request();za.subscribe(jsx3.HttpRequest.EVENT_ON_RESPONSE,this,ub.Qa);this.setRequest(za);};g.getSupportedNamespaces=function(){var
hb=ub.Ra;for(var cb in c.IE)hb=hb+(cb+ub.Sa+c.IE[cb]+ub.Ta);return hb;};c.XML2JSON=function(b){var
Hb=b.getRootNode();if(Hb&&Hb.getNamespaceURI()==ub.Ka){var
O=[];for(var
sa=Hb.getChildIterator();sa.hasNext();)O.push(c._convertXML(sa.next()));return ub.Ua+O.join(ub.Va)+ub.Wa;}else c.gU(2,ub.Xa+ub.Ka);};c._convertXML=function(b){var
lb=b.getNamespaceURI();var
M=b.getAttribute(ub.Ya)||b.getBaseName();var
Fb,Eb,S;if(lb==ub.Ka+ub.Za||lb==ub.Ka+ub._a){Fb=lb==ub.Ka+ub.Za?ub.ab+M+ub.bb:ub.cb;var
wb=[];for(var
sb=b.getChildIterator();sb.hasNext();){var
cb=sb.next();for(var
ha=cb.getChildIterator();ha.hasNext();){var
V=ha.next();var
U=V.getNamespaceURI();wb.push(U.indexOf(ub.db)>-1?c._convertXML(V):ub.Ua+c._convertXML(V)+ub.Wa);}}Eb=wb.join(ub.Va);S=ub.eb;}else if(lb.indexOf(ub.Ka+ub.fb)==0){Fb=lb.indexOf(ub.gb)==-1?ub.ab+M+ub.hb:ub.Ra;if(c._jsonstringreg.exec(b.getValue())){Eb=b.getValue();}else Eb=jsx3.util.strEscapeJSON(b.getValue());S=ub.Ra;}else{var
pa=(b.getChildNodes()).size()>=1;Fb=ub.ab+M+ub.hb+(pa?ub.Ua:ub.Ra);var
wb=[];for(var
sb=b.getChildIterator();sb.hasNext();)wb.push(c._convertXML(sb.next()));Eb=wb.join(ub.Va);S=pa?ub.Wa:ub.Ra;}return Fb+Eb+S;};c._jsonstringreg=ub.ib;c._saferegname=ub.jb;c.JSON2XML=function(k){if(typeof k==ub.b)try{k=jsx3.eval(ub.kb+k+ub.lb);}catch(Kb){var
ab=jsx3.lang.NativeError.wrap(Kb);var
Va=jsx3._msg(ub.mb,k,ab.getMessage());throw new
jsx3.Exception(Va);}var
xa=new
jsx3.xml.Document();xa.createDocumentElement(ub.nb,ub.Ka);c._convertObject(k,xa);return xa;};c._convertObject=function(m,n){var
Jb=typeof m;if(m==null){Jb=ub.ob;m=ub.ob;}if(Jb==ub.b||Jb==ub.pb||Jb==ub.i||Jb==ub.ob){var
Ua=n.createNode(1,ub.qb,ub.Ka+ub.gb);n.appendChild(Ua);Ua.setValue(m);}else if(jsx3.$A.is(m)){var
_a=n.createNode(1,ub.qb,ub.Ka+ub._a);n.appendChild(_a);for(var
Kb=0;Kb<m.length;Kb++){var
Ua=_a.createNode(1,ub.rb,ub.Ka+ub.rb);_a.appendChild(Ua);c._convertObject(m[Kb],Ua);}}else for(var la in m){var
S=c._saferegname.exec(la)?((((la.replace(ub.sb,ub.tb)).replace(ub.ub,ub.vb)).replace(ub.ub,ub.vb)).replace(ub.wb,ub.xb)).replace(ub.yb,ub.zb):null;var
pa=m[la];Jb=typeof pa;if(pa==null){Jb=ub.ob;pa=ub.ob;}if(Jb==ub.b||Jb==ub.pb||Jb==ub.i||Jb==ub.ob){var
Ua=n.createNode(1,S||la,ub.Ka+ub.fb);n.appendChild(Ua);if(S)Ua.setAttribute(ub.Ya,la,c.IE[ub.Ia]);Ua.setValue(pa);}else if(jsx3.$A.is(pa)){var
_a=n.createNode(1,S||la,ub.Ka+ub.Za);n.appendChild(_a);if(S)_a.setAttribute(ub.Ya,la,c.IE[ub.Ia]);for(var
Kb=0;Kb<pa.length;Kb++){var
Ua=_a.createNode(1,ub.rb,ub.Ka+ub.rb);_a.appendChild(Ua);c._convertObject(pa[Kb],Ua);}}else{var
Ua=n.createNode(1,S||la,ub.Ka);n.appendChild(Ua);if(S)Ua.setAttribute(ub.Ya,la,c.IE[ub.Ia]);c._convertObject(pa,Ua);}}};g.getRulesURL=function(){return this.jsxrulesurl;};g.setRulesURL=function(b){this.jsxrulesurl=b;this.resetRulesTree();return this;};g._getOutboundStubDocument=function(){if(this.jsxstubdocument instanceof jsx3.xml.Document)return this.jsxstubdocument;};g.setOutboundStubDocument=function(a){this.jsxstubdocument=a;return this;};g.getOutboundStubURL=function(){if(this.jsxstuburl==null){var
yb=this.getMEPNode(ub.Ab);if(yb){var
Pa=yb.getAttribute(ub.Bb);return Pa!=null&&jsx3.util.strTrim(Pa)!=ub.Ra?Pa:null;}}else return this.jsxstuburl;};g.setOutboundStubURL=function(m){this.jsxstuburl=m;return this;};g.getNamespace=function(){var
Jb=this.getServer();return Jb!=null?Jb.getEnv(ub.Cb):null;};g.getServer=function(){if(this._jsxgl){return this._jsxgl;}else if(this.jsxserverns){var
J=jsx3.lang.System.getApp(this.jsxserverns);if(J instanceof jsx3.app.Server){return J;}else c.gU(2,ub.Db+this.jsxserverns);}else{var
ra=jsx3.System.getAllApps();for(var
ba=0;ba<ra.length;ba++)if(ra[ba].getEnv(ub.Cb)!=ub.Eb)return ra[ba];}if(jsx3.IDE){c.gU(2,ub.Fb);return jsx3.IDE;}};g.setNamespace=function(h){if(h instanceof jsx3.app.Server){this._jsxgl=h;this.jsxserverns=h.getEnv(ub.Cb);}else{this._jsxgl=null;this.jsxserverns=h;}return this;};g.getOutboundStubPath=function(){if(this.jsxstubpath==null){var
Ba=this.getMEPNode(ub.Ab);if(Ba){var
T=Ba.getAttribute(ub.Gb);return T!=null&&jsx3.util.strTrim(T)!=ub.Ra?T:null;}}else return this.jsxstubpath;};g.setOutboundStubPath=function(o){this.jsxstubpath=o;return this;};g.getInboundURL=function(){if(this.jsxinboundurl==null){var
v=this.getMEPNode(ub.Hb);if(v){var
_=v.getAttribute(ub.Bb);return _!=null&&jsx3.util.strTrim(_)!=ub.Ra?_:null;}}else return this.jsxinboundurl;};g.setInboundURL=function(o){this.jsxinboundurl=o;return this;};g.getOutboundURL=function(){return this.jsxoutboundurl;};g.setOutboundURL=function(l){this.jsxoutboundurl=l;return this;};g.getOperationName=function(){return this.operation;};g.setOperationName=function(k){this.operation=k;return this;};g.getRulesXML=function(){if(!this.jsxrulesxml){var
Aa=this.getRulesURL();var
Lb=new
jsx3.xml.Document();Lb.load(Aa);if(Lb.hasError()){c.gU(2,ub.Ib+Aa+ub.Jb+Lb.getError());}else this.jsxrulesxml=Lb;}return this.jsxrulesxml;};g.setRulesXML=function(b){this.jsxrulesxml=b;};g.resetRulesTree=function(){delete this[ub.Kb];return this;};g.getOperationNode=function(){var
F=this.getRulesXML();if(F){var
Gb=F.selectSingleNode(ub.Lb+this.getOperationName()+ub.Mb);return Gb?Gb:(this.getRulesXML()).selectSingleNode(ub.Nb);}};g.getMEPNode=function(n){var
T=this.getOperationNode();return T?T.selectSingleNode(ub.Ob+n+ub.Mb):null;};g.getUserName=function(){return this.jsxusername;};g.setUserName=function(j){this.jsxusername=j;return this;};g.getUserPass=function(){return this.jsxuserpass;};g.setUserPass=function(j){this.jsxuserpass=j;return this;};g.setOnSuccess=function(q){this.jsxonsuccess=q;return this;};g.setOnError=function(q){this.jsxonerror=q;return this;};g.onSuccess=function(){this.publish({subject:ub.La});var
_a=typeof this.jsxonsuccess;if(_a==ub.Pb||_a==ub.Qb){this.jsxonsuccess(this);}else if(_a==ub.b)this.eval(this.jsxonsuccess);};g.onError=function(){this.publish({subject:ub.Ma});var
S=typeof this.jsxonerror;if(S==ub.Pb||S==ub.Qb){this.jsxonerror(this);}else if(S==ub.b)this.eval(this.jsxonerror);};g.setRequest=function(e){if(e!=null){this.jsxhttprequest=e;}else delete this[ub.Rb];};g.getRequest=function(){return this.jsxhttprequest;};g.getInboundDocument=function(){return this.jsxinbounddocument==null?null:this.jsxinbounddocument;};g.setInboundDocument=function(i){this.jsxinbounddocument=i;};g.getOutboundDocument=function(){return this.jsxoutbounddocument==null?null:this.jsxoutbounddocument;};g.setOutboundDocument=function(j){this.jsxoutbounddocument=j;};g.getWSDL=function(){if(this.wsdl==null){var
Gb=(this.getRulesXML()).selectSingleNode(ub.Sb);if(Gb){var
Fa=Gb.getAttribute(ub.Tb);}else return;}return this.wsdl==null?this.wsdl=jsx3.CACHE.openDocument(Fa):this.wsdl;};g.getEndpointURL=function(){return this.jsxserviceurl==null?(this.getOperationNode()).getAttribute(ub.Ub):this.jsxserviceurl;};g.setEndpointURL=function(m){this.jsxserviceurl=m;return this;};g.doOutboundFilter=function(n){c.gU(5,ub.Vb);if(n==null)n=(this.getMEPNode(ub.Ab)).getAttribute(ub.Wb);this.eval(n);};g.doInboundFilter=function(q){c.gU(5,ub.Xb);if(q==null){var
Mb=this.getMEPNode(ub.Hb);if(Mb){q=Mb.getAttribute(ub.Yb);}else{c.gU(5,ub.Zb);return;}}this.eval(q);};g.getMethod=function(){if(this.jsxmethod==null){var
vb=(this.getOperationNode()).getAttribute(ub._b);if(jsx3.util.strEmpty(vb))vb=ub.ac;this.jsxmethod=vb;}return this.jsxmethod;};g.setMethod=function(o){this.jsxmethod=o;};g.getJSONP=function(){if(this.jsxjsonp==null)this.jsxjsonp=(this.getOperationNode()).getAttribute(ub.bc)==ub.p;return this.jsxjsonp;};g.setJSONP=function(k){this.jsxjsonp=k;};g._setValid=function(e){this.S6=e;};g._isValid=function(){return this.S6;};g._isJSON=function(n){var
E=this.getMEPNode(n);var
ga=E.selectSingleNode(ub.cc);return ga&&ga.getAttribute(ub.dc)==ub.Ka;};g.doCall=function(q){var
Na=this.getRulesXML();if(Na!=null)if(!this.getMode()){var
kb=(this.getServer()).resolveURI(this.getInboundURL());c.gU(5,ub.ec+kb+ub.fc);if(this._isJSON(ub.Hb)){var
Qa=jsx3.net.Request.open(ub.gc,kb,false);Qa.send();var
y=Qa.getResponseText();if(!jsx3.util.strEmpty(y)){jsx3.sleep(function(){this.onResponse({target:{getResponseText:function(){return y;}}});},null,this);}else c.gU(2,ub.hc+kb+ub.ic+w.getError());}else{var
w=((this.getServer()).getCache()).getOrOpenDocument(kb,kb);if(w.hasError()){c.gU(2,ub.jc+kb+ub.Jb+w.getError());}else{w=w.cloneDocument();jsx3.sleep(function(){this.onResponse({target:{getResponseXML:function(){return w;}}});},null,this);}}}else if((this.getMethod()).search(ub.kc)==0){var
lb=((this.getServer()).resolveURI(this.getEndpointURL())).toString();c.gU(5,ub.lc+lb+ub.fc);var
Lb=this.getUniqueId();if(this.getJSONP()){var
N=ub.mc+Lb;var
u=this;window[N]=function(k){u.doRespond(k);};var
tb=typeof this.getJSONP()==ub.b?this.getJSONP():ub.nc;lb=lb+(lb.indexOf(ub.oc)==ub.pc?ub.oc:ub.qc)+tb+ub.rc+N;}(this.getServer()).loadInclude(lb,ub.sc+Lb,ub.tc,false);}else{var
ba=this.getOutboundURL();var
I;if(ba){ba=(this.getServer()).resolveURI(ba);c.gU(5,ub.uc+ba+ub.fc);I=((this.getServer()).getCache()).getOrOpenDocument(ba,ba);if(I.hasError()){c.gU(2,ub.vc+ba+ub.Jb+I.getError());return;}else I=I.cloneDocument();}else{I=this.getServiceMessage();if((this.getMethod()).toUpperCase()==ub.ac&&!I){c.gU(4,ub.wc);return;}}if(!this._isValid()&&q){return false;}else{this.setOutboundDocument(I);this.doOutboundFilter();c.gU(5,ub.xc+this.getEndpointURL()+ub.fc);var
fb=this.getRequest();fb.open(this.getMethod(),this.getEndpointURL(),true,this.getUserName(),this.getUserPass());var
t=this.getHeaders();var
vb;for(vb in t)if(!(typeof t[vb]==ub.Pb||typeof t[vb]==ub.Qb)){fb.setRequestHeader(vb.toString(),t[vb]);c.gU(5,ub.yc+vb+ub.zc+t[vb]+ub.fc);}var
Db;if(this._isJSON(ub.Ab)){Db=c.XML2JSON(I);}else Db=I!=null&&I instanceof jsx3.xml.Document&&!I.hasError()?I.serialize(ub.Ac):null;fb.send(Db,this.getTimeout());return true;}}};g.setRequestHeader=function(f,i){var
Ea=this.getHeaders();Ea[f]=i;};g.getHeaders=function(){if(this.jsxheaders==null){this.jsxheaders={};var
da=(this.getOperationNode()).selectNodes(ub.Bc);for(var
Y=da.iterator();Y.hasNext();){var
qa=Y.next();this.jsxheaders[qa.getAttribute(ub.Cc)+ub.Ra]=qa.getAttribute(ub.Dc)+ub.Ra;}}return this.jsxheaders;};g.setTimeouts=function(s,n,i,q){c.gU(4,ub.Ec);return this;};g.onTimeout=function(){this.publish({subject:ub.Na});};g.setTimeout=function(s,q,d){(this.getRequest()).subscribe(ub.Fc,this,ub.Na);this.subscribe(ub.Na,q,d);this.jsxtimeout=s;return this;};g.getTimeout=function(){return this.jsxtimeout;};g.resetRules=function(){var
x=(this.getRulesXML()).selectNodes(ub.Gc);for(var
Ya=x.iterator();Ya.hasNext();)(Ya.next()).removeAttribute(ub.Hc);return this;};g._resetNamespaceRegistry=function(){this.nshash={};this.nsinc=0;};c.gU=function(h,l){if(c.aM==null)if(jsx3.util.Logger){c.aM=jsx3.util.Logger.getLogger(c.jsxclass.getName());if(c.aM==null)return;}else return;c.aM.log(h,l);};g._reset=function(){this.resetRules();this._setValid(true);this._resetNamespaceRegistry();};g.getServiceMessage=function(d,k){var
Aa=new
jsx3.util.Timer(c.jsxclass,this.getEndpointURL());var
Ka,Hb;this._reset();var
xa=this.getOperationNode();c.gU(5,ub.Ic+this.getOperationName()+ub.Jc+this.getRulesURL()+ub.fc);if(!k){Ka=this._getOutboundStubDocument();k=this.getOutboundStubURL();}if(k||Ka instanceof jsx3.xml.Document){var
ea=this.getServer();if(!(Ka instanceof jsx3.xml.Document)){k=ea.resolveURI(k);Ka=((this.getServer()).getCache()).getOrOpenDocument(k,k);}if(!Ka.hasError()){var
Lb=this.getOutboundStubPath();var
Ca=Lb.split(ub.Kc);var
Sa={};for(var
y=0;y<Ca.length;y++)if(Ca[y].search(ub.Lc)>-1)Sa[RegExp.$1]=1;Ka=Ka.cloneDocument();Hb=Ka.selectSingleNode(Lb,Ka.getDeclaredNamespaces(Sa));if(!Hb){c.gU(2,ub.Mc+Lb+ub.Nc);return;}}else{c.gU(2,ub.Oc+k+ub.Jb+Ka.getError());return;}}var
rb=xa.selectSingleNode(ub.Ob+(d==null?ub.Ab:(d.substring(0,1)).toUpperCase())+ub.Mb);var
jb=rb.selectNodes(ub.cc);var
S;for(var
y=jb.iterator();y.hasNext();)S=this.doAddAndRecurse(Ka,Hb,y.next(),d,true);Aa.log(ub.Pc);return Ka?Ka:S;};g.registerNamespace=function(d,b,q){var
Na=ub.Ra;var
Ga=null;if(d==c.IE[ub.Ia]){Na=ub.Ia;Ga=d;}else if(d!=ub.Ra&&this.nshash[d]!=null){Ga=d;Na=this.nshash[d];}else if(d!=ub.Ra){this.nsinc++;this.nshash[d]=ub.Qc+this.nsinc;Ga=d;Na=ub.Qc+this.nsinc;if(q!=true){var
xb=b.getRootNode();xb.setAttribute(ub.Rc+Na,Ga);}}return {prefix:Na,uri:Ga};};g.doAddAndRecurse=function(_jsxg,_jsxp,l,a,b){if(l.getAttribute(ub.Hc))return;var
sb=false;var
Ta=this;var
V=function(n){n.setAttribute(ub.Hc,ub.p);};var
hb=function(p){p.removeAttribute(ub.Hc);};var
rb=function(i){(i.getParent()).removeChild(i);};var
fa=function(j){Ta.setNodeValue(Jb,j);};var
da=function(h){return Ta.getNamedNodeChild(h,l);};var
U=function(k){(Ta.getNamedRuleChild(k,l)).setAttribute(ub.Hc,ub.p);};var
w=function(k){(Ta.getNamedRuleChild(k,l)).setAttribute(ub.Hc,ub.p);};var
Qa=function(o){(Ta.getNamedRuleChild(o,l)).removeAttribute(ub.Hc);};var
va=function(n){Ta.CDFCONTEXT.context=Ta.CDFCONTEXT.context.selectSingleNode(n);};var
S=function(f){Ta.CDFCONTEXT.records=Ta.CDFCONTEXT.context.selectNodes(f);};var
Ia=l.selectSingleNode(ub.Sc);if(Ia){var
Gb=l.selectSingleNode(ub.Tc+Ia.getValue()+ub.Mb);if(Gb!=null){if(this.CDFCONTEXT&&this.CDFCONTEXT.records&&this.CDFCONTEXT.records.hasNext())l=Gb;}else c.gU(2,ub.Uc+Ia.getValue()+ub.Vc);}var
wa=l.getAttribute(ub.dc);var
t=wa?this.registerNamespace(wa,_jsxg,b||l.getAttribute(ub.Wc)==ub.Xc):{prefix:ub.Ra,uri:null};var
Fb=l.getAttribute(ub.Yc);if(l.getAttribute(ub.Wc)==ub.Xc){var
db=true;var
Jb=_jsxg.createNode(2,t.prefix+(t.prefix!=ub.Ra?ub.Zc:ub.Ra)+Fb,t.uri);_jsxp.setAttributeNode(Jb);}else if(l.getAttribute(ub.Wc)==ub._c){var
db=false;var
Jb=_jsxg.createNode(4);_jsxp.appendChild(Jb);}else{var
db=false;if(_jsxg){var
Jb=_jsxg.createNode(1,t.prefix+(t.prefix!=ub.Ra?ub.Zc:ub.Ra)+Fb,t.uri);_jsxp.appendChild(Jb);}else{_jsxg=new
jsx3.xml.Document();var
Jb=_jsxg.createDocumentElement(t.prefix+(t.prefix!=ub.Ra?ub.Zc:ub.Ra)+l.getAttribute(ub.Yc),t.uri);}var
pb=l.selectSingleNode(ub.ad+c.IE[ub.Ca]+ub.Mb);if(pb!=null&&pb!=ub.Ra){var
F;if((F=l.getAttribute(ub.bd))!=null&&F!=ub.Ra){var
C=l.getAttribute(ub.cd);if(C!=null&&C!=ub.Ra){if(F.indexOf(ub.Zc)>0)F=F.replace(ub.dd,ub.Ra);F=ub.ed+F;}else{if(F.indexOf(ub.Zc)>0)F=F.replace(ub.dd,ub.Ra);wa=l.getAttribute(ub.fd);t=this.registerNamespace(wa,_jsxg,b);F=t.prefix==ub.Ra?F:t.prefix+ub.Zc+F;}var
ha=_jsxg.createNode(2,ub.gd,ub.Fa);ha.setValue(F);Jb.setAttributeNode(ha);}}}this.publish({subject:ub.Pa,rule:l,action:ub.hd,description:ub.id+Jb.getNodeName()+ub.jd,level:6});var
Sa=l.selectNodes(ub.kd);var
_=false;var
zb;var
tb,eb;for(var
G=Sa.iterator();G.hasNext();){var
gb=this.CDFCONTEXT?this.CDFCONTEXT.context:null;var
Ha=this.CDFCONTEXT?this.CDFCONTEXT.records:null;var
P=this.CDFCONTEXT&&this.CDFCONTEXT.parentContext?this.CDFCONTEXT.parentcontext:null;var
lb=G.next();var
Ba=lb.getAttribute(ub.Cc);var
Va=lb.getAttribute(ub.Dc);var
L=this.getNamespace();if(L==null||jsx3.util.strTrim(L)==ub.Ra)L=null;if(Ba==ub.ld){var
O=jsx3.GO(Va,L);if(O!=null){this.publish({subject:ub.Pa,rule:l,action:ub.md,description:ub.nd+Va+ub.ab+(L?ub.od+L+ub.ab:ub.Ra)+ub.pd,level:6});this.doMapAndUpdate(Jb,O,ub.qd,l);}else c.gU(2,ub.rd+Va+ub.sd);}else if(Ba==ub.td||Ba==ub.ud){var
Ja=Va.split(ub.vd);var
xb=Ja[0];var
R=this.getServer();if(R!=null){var
Wa=(R.getCache()).getDocument(xb);}else var
Wa=jsx3.CACHE.getDocument(xb);if(Wa!=null){var
ya=Wa.selectSingleNode(Ja[1]);if(ya!=null){this.publish({subject:ub.Pa,rule:l,action:ub.wd,description:(L?ub.xd+L+ub.yd:ub.zd)+ub.Ad+Ja[0]+ub.Bd+Ja[1]+ub.Cd,level:6});this.updateNode(Jb,ya,ub.qd);}else c.gU(2,ub.Dd+Ja[0]+ub.Ed+Ja[1]+ub.zb);}else c.gU(2,ub.Fd+Ja[0]+ub.zb);}else if(Ba==ub.Gd){this.publish({subject:ub.Pa,rule:l,action:ub.Hd,description:(L?ub.xd+L+ub.yd:ub.zd)+ub.Ad+Va+ub.Id,level:6});this.getCDFDocument(Va,ub.qd,L);}else if(Ba==ub.Jd){var
Ya;if(Ya=this.CDFCONTEXT.records.next()){this.publish({subject:ub.Pa,rule:l,action:ub.Kd,description:ub.Ld,level:6});tb=Ya;eb=Ya.selectNodes(ub.cc);this.CDFCONTEXT=new
c.CdfContext(tb,this.CDFCONTEXT,eb);zb=true;_=true;}else{rb(Jb);sb=true;zb=false;}}else if(Ba==ub.Md){var
xa=this.CDFCONTEXT.context.getAttribute(Va);if(xa){this.publish({subject:ub.Pa,rule:l,action:ub.Nd,description:ub.Od+Va+ub.Id,level:6});fa(xa);}}else if(Ba==ub.Pd){this.publish({subject:ub.Pa,rule:l,action:ub.Qd,description:ub.Rd+Va+ub.Sd,level:6});var
ma={RULENODE:l,MESSAGENODE:Jb,my:Ta,OBJECTNAME:Va,OBJECTTYPE:Ba,CDFCONTEXTPARENT:P,CDFCONTEXT:gb,CDFRECORDS:Ha,setCDFRecords:S,setCDFContext:va,enableNamedRule:Qa,disableNamedRule:w,enableReferencedRule:V,disableReferencedRule:hb,skipNamedRule:U,getNamedChild:da,setValue:fa,removeChild:rb};var
qa=this.eval(Va,ma);}}if(Jb.getValue()==ub.Ra&&a!=null&&l.selectSingleNode(ub.cc)==null){var
ob=l.getAttribute(ub.bd);if(ob!=null&&ob!=ub.Ra){var
Pa=c.simpletypes[ob.substring(ob.indexOf(ub.Zc)+1)];var
yb=Pa!=null?typeof Pa==ub.Pb?Pa():Pa:ub.Td;Jb.setValue(yb);}}else if(!sb&&Jb.getValue()==ub.Ra&&l.selectSingleNode(ub.cc)==null&&l.getAttribute(ub.Wc)!=ub.Xc&&!b&&l.selectSingleNode(ub.Ud)==null){rb(Jb);sb=true;}if(sb!=true)this.validate(Jb,l);if(zb==null){var
I=(I=l.getAttribute(ub.Vd))!=null?I:false;zb=this.eval(I);}if(!sb&&l.getAttribute(ub.Wd)!=ub.p&&(l.getParent()).getAttribute(ub.Wd)==ub.p){var
Da=false;var
ia=_jsxp;var
Nb=l.getParent();while(Nb.getAttribute(ub.Wd)==ub.p){Nb=Nb.getParent();var
Hb=ia;ia=ia.getParent();}if(db){_jsxp.removeAttributeNode(Jb);ia.setAttributeNode(Jb);}else ia.insertBefore(Jb,Hb);}else if(l.getAttribute(ub.Wd)==ub.p){var
Da=true;}else var
Da=false;var
cb=l.selectNodes(ub.cc);for(var
G=cb.iterator();G.hasNext();)this.doAddAndRecurse(_jsxg,Jb,G.next(),a,null);if(_&&this.CDFCONTEXT)this.CDFCONTEXT=this.CDFCONTEXT.parentcontext;var
wa=l.getAttribute(ub.Xd);if(wa!=null&&wa!=ub.Ra){t=this.registerNamespace(wa,_jsxg,b);Jb.setValue(t.prefix+ub.Zc+l.getAttribute(ub.Yd));}if(l.getAttribute(ub.bd)==ub.Zd&&l.getAttribute(ub.fd)==ub.Da){var
T=Jb.getAttributes();for(var
G=T.iterator();G.hasNext();){var
v=G.next();if(v.getBaseName()==ub._d){var
bb=(l.selectSingleNode(ub.ae)).getValue();var
nb=this.nshash[bb];var
H=nb+ub.Zc+(l.selectSingleNode(ub.be)).getValue()+ub.cb+(Jb.selectNodes(ub.ce)).size()+ub.eb;v.setValue(H);}}}if(zb&&!Da){this.doAddAndRecurse(_jsxg,_jsxp,l,a,null);}else if(Da&&!db)(Jb.getParent()).removeChild(Jb);return _jsxg;};g.findNameByValue=function(q,f){for(var K in q)if(q[K]==f)return K.toString();};g.validate=function(k,q){var
Cb=new
jsx3.util.Timer(c.jsxclass,this.getEndpointURL());var
Pa=q.selectNodes(ub.de);var
Jb=true;if(Pa.size()>0){var
y=k.getValue()+ub.Ra;if(!q.selectSingleNode(ub.ee+y+ub.Mb))for(var
Fa=Pa.iterator();Jb&&Fa.hasNext();){var
wa=Fa.next();var
Ga=wa.getAttribute(ub.Cc);var
gb=wa.getAttribute(ub.Dc);if(Ga==ub.fe){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.ge&&!(y<gb)){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.he&&!(y<=gb)){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.ie&&!(y>=gb)){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.je&&!(y>gb)){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.ke&&y.length!=Number(gb)){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.le&&y.length>Number(gb)){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.me&&y.length<Number(gb)){this.invalidate(k,q,y,Ga,gb);Jb=false;}else if(Ga==ub.ne){var
Ya=new
RegExp(gb);if(y.search(Ya)!=0){this.invalidate(k,q,y,Ga,gb);Jb=false;}}}}Cb.log(ub.oe);return Jb;};g.invalidate=function(n,l,k,o,s){this._setValid(false);this.publish({subject:ub.Oa,rule:l,message:n,type:o,value:s});this.publish({subject:ub.Pa,rule:l,action:ub.pe,description:k+ub.qe+o+ub.Zc+s,level:3});};g.updateNode=function(p,r,j){if(j==ub.re){var
B=p;var
wb=r;}else{var
B=r;var
wb=p;}var
Va=this.getNodeValue(B);this.setNodeValue(wb,Va);};g.setNodeValue=function(a,f){a.setValue(f+ub.Ra);};g.getNodeValue=function(n){return n.getValue();};g.doMapAndUpdate=function(e,k,r,d){if(jsx3.gui.Form&&k.instanceOf(ub.se)){if(jsx3.gui.RadioButton&&k.instanceOf(ub.te)){if(r==ub.re){k.setGroupValue(this.getNodeValue(e));}else{var
za=k.getGroupValue();this.setNodeValue(e,za==null?ub.Ra:za);}}else if(jsx3.gui.CheckBox&&k.instanceOf(ub.ue)){if(r==ub.re){var
tb=this.getNodeValue(e);k.setChecked(this.eval(tb)?1:0);}else this.setNodeValue(e,k.getChecked()?ub.j:ub.ve);}else if(r==ub.re){k.setValue(this.getNodeValue(e));}else if(r==ub.qd)this.setNodeValue(e,k.getValue()+ub.Ra);}else if(jsx3.gui.Block&&k.instanceOf(ub.we))if(r==ub.re){k.setText(this.getNodeValue(e),true);}else this.setNodeValue(e,k.getText());};g.doReadAndRecurse=function(r,m){var
Qa=this;var
ra=function(a){return Qa.getNamedNodeChild(a,r);};var
Ib=m.selectSingleNode(ub.Sc);if(Ib){var
pb=m.selectSingleNode(ub.Tc+Ib.getValue()+ub.Mb);if(pb!=null){m=pb;}else c.gU(2,ub.Uc+Ib.getValue()+ub.Vc);}this.publish({subject:ub.Pa,rule:m,action:ub.xe,description:ub.id+r.getNodeName()+ub.jd,level:6});var
P=m.selectNodes(ub.kd);var
ib=true;var
pa=false;for(var
U=P.iterator();U.hasNext();){var
rb=this.CDFCONTEXT?this.CDFCONTEXT.context:null;var
Db=U.next();var
Bb=Db.getAttribute(ub.Cc);var
Ta=Db.getAttribute(ub.Dc);var
mb=this.getNamespace();if(Bb==ub.ld){var
Gb=jsx3.GO(Ta,mb);if(Gb!=null){this.publish({subject:ub.Pa,rule:m,action:ub.md,description:ub.nd+Ta+ub.ab+(mb?ub.od+mb+ub.ab:ub.Ra)+ub.ye+r.getValue()+ub.Id,level:6});this.doMapAndUpdate(r,Gb,ub.re,m);}else c.gU(2,ub.rd+Ta+ub.sd);}else if(Bb==ub.td||Bb==ub.ud){var
V=Ta.split(ub.vd);var
sa=V[0];var
F=this.getServer();if(F!=null){var
G=(F.getCache()).getDocument(sa);}else var
G=jsx3.CACHE.getDocument(sa);if(G!=null){var
B=G.selectSingleNode(V[1]);if(B!=null){this.publish({subject:ub.Pa,rule:m,action:ub.wd,level:6,description:(mb?ub.xd+mb+ub.yd:ub.zd)+ub.Ad+V[0]+ub.Bd+V[1]+ub.ze+jsx3.util.strTruncate(r.getValue(),30,null,0.6666666666666666)+ub.Id});this.updateNode(r,B,ub.re);}else c.gU(2,ub.Dd+V[0]+ub.Ed+V[1]+ub.zb);}else c.gU(2,ub.Fd+V[0]+ub.zb);}else if(Bb==ub.Gd){this.publish({subject:ub.Pa,rule:m,action:ub.Hd,description:(mb?ub.xd+mb+ub.yd:ub.zd)+ub.Ae+Ta+ub.Be,level:6});this.getCDFDocument(Ta,ub.re,mb);}else if(Bb==ub.Jd){this.publish({subject:ub.Pa,rule:m,action:ub.Kd,description:ub.Ce,level:6});var
R=this.CDFCONTEXT.context.createNode(1,ub.cc);R.setAttribute(ub.De,this.getUniqueId());this.CDFCONTEXT.context.appendChild(R);this.CDFCONTEXT=new
c.CdfContext(R,this.CDFCONTEXT);pa=true;}else if(Bb==ub.Md){this.publish({subject:ub.Pa,rule:m,action:ub.Nd,description:ub.Ee+Ta+ub.Fe+jsx3.util.strTruncate(r.getValue(),30,null,0.6666666666666666)+ub.Id,level:6});this.CDFCONTEXT.context.setAttribute(Ta,r.getValue());ib=false;}else if(Bb==ub.Pd){this.publish({subject:ub.Pa,rule:m,action:ub.Qd,description:ub.Rd+Ta+ub.Sd,level:6});var
ob={my:Qa,OBJECTNAME:Ta,OBJECTTYPE:Bb,CDFCONTEXT:rb,MESSAGENODE:r,RULENODE:m,RECURSE:ib,getNamedChild:ra};this.eval(Ta,ob);}}if(ib)this._doReadAndRecurse(m,r);if(pa)this.CDFCONTEXT=this.CDFCONTEXT.parentcontext;};g._doReadAndRecurse=function(d,m){var
_=d.selectNodes(ub.Ge);for(var
Xa=_.iterator();Xa.hasNext();){var
wb=Xa.next();var
Za=wb.getAttribute(ub.Yc);if(wb.getAttribute(ub.Wc)==ub.Xc){var
U=m.getAttributes();L2:for(var
Nb=U.iterator();Nb.hasNext();){var
ca=Nb.next();if(ca.getBaseName()==Za){this.doReadAndRecurse(ca,wb);break L2;}}}else if(wb.getAttribute(ub.Wd)==ub.p){this._doReadAndRecurse(wb,m);}else{var
U=m.selectNodes(ub.He+Za+ub.Mb);for(var
Nb=U.iterator();Nb.hasNext();)this.doReadAndRecurse(Nb.next(),wb);}}};c.CdfContext=function(n,k,f){this.context=n;this.parentcontext=k;this.records=f;};g.getNamedNodeChild=function(b,l){var
Ba=l.getChildNodes();for(var
Ha=Ba.iterator();Ha.hasNext();){var
E=Ha.next();var
la=E.getBaseName();if(la==b)return E;}};g.doval=function(a){this.eval(a);};g.getNamedRuleChild=function(s,n){return n.selectSingleNode(ub.Ie+s+ub.Mb);};g.getUniqueId=function(){return jsx3.xml.CDF.getKey();};g.doRespond=function(m){if(this._isJSON(ub.Hb)&&!(m.target&&m.target.getResonseText instanceof Function)){this.onResponse({target:{getResponseText:function(){return m;}}});}else this.onResponse(m);};g.onResponse=function(k){var
I=k.target;if(I instanceof jsx3.net.Request){this.responseheaders=I.getAllResponseHeaders();this.status=I.getStatus();this.statusText=I.getStatusText();c.gU(5,ub.Je+this.getOperationName()+ub.Ke+this.getEndpointURL()+ub.Le+this.status);if(this.status!=200&&this.status!=202){var
na=true;c.gU(2,ub.Je+this.getOperationName()+ub.Ke+I.getURL()+ub.Me+this.status+ub.Ne+this.statusText);}else var
na=false;var
pb;if(this._isJSON(ub.Hb)){var
Ca=I.getResponseText();try{pb=c.JSON2XML(Ca);if(!pb){c.gU(2,ub.Oe);return;}}catch(Kb){var
wb=jsx3.lang.NativeError.wrap(Kb);c.gU(2,ub.Pe+wb.getMessage());return;}}else pb=I.getResponseXML();if(pb&&!pb.hasError()){this.setInboundDocument(pb);}else if(this.getMEPNode(ub.Hb)){c.gU(2,ub.Je+this.getOperationName()+ub.Ke+this.getEndpointURL()+ub.Qe+this.statusText);this.onError();return;}}else{var
pb;if(this._isJSON(ub.Hb)){var
Ca=I.getResponseText();try{pb=c.JSON2XML(Ca);if(!pb){c.gU(2,ub.Oe);return;}}catch(Kb){var
wb=jsx3.lang.NativeError.wrap(Kb);c.gU(2,ub.Pe+wb.getMessage());return;}}else pb=I.getResponseXML();this.setInboundDocument(pb);this.status=200;this.statusText=ub.Re+this.getInboundURL()+ub.Se;var
na=this.getStatus()!=200&&this.getStatus!=202;}var
za=this.getMEPNode(ub.Hb);if(za){this.doInboundFilter();this.doInboundMap();}else c.gU(5,ub.Te);if(na){this.onError();}else this.onSuccess();};g.getCDFDocument=function(f,k,q){var
Ca=this.getServer();var
jb=Ca!=null?Ca.getCache():jsx3.CACHE;if(k==ub.qd){var
D=jb.getDocument(f);if(D){this.CDFCONTEXT=new
c.CdfContext(D.getRootNode(),null,(D.getRootNode()).selectNodes(ub.cc));}else c.gU(2,ub.Ue+f+ub.Ve+this.getOperationName()+ub.We);}else{var
D=jsx3.xml.CDF.Document.newDocument();jb.setDocument(f,D);this.CDFCONTEXT=new
c.CdfContext(D.getRootNode(),null);this._jsxallcdfs[f]=jb;}};g.getStatus=function(){var
Va=this._status||this.status;return !Va?200:Va;};g.setStatus=function(o){this._status=o;};g.getMode=function(){return this._jsxmode!=null?this._jsxmode:(this.getServer()).getEnv(ub.Xe);};g.setMode=function(k){this._jsxmode=k;};g.doInboundMap=function(){var
Ka=new
jsx3.util.Timer(c.jsxclass,this.getEndpointURL());c.gU(5,ub.Ye);var
ba=this.getOperationNode();if(ba){var
B=this.getInboundDocument();var
Ta=this.getStatus();var
oa=Ta!=200&&Ta!=202&&Ta!=0?ub.Ze:ub.Hb;if(oa==ub.Hb&&this.dh instanceof jsx3.xml.Document){c.gU(5,ub._e);jsx3.require(ub.af);var
Wa=new
jsx3.xml.Template(this.dh);var
Ua=jsx3.xml.CDF.Document.wrap(Wa.transformToObject(B));if(!Ua.hasError()){c.gU(5,ub.bf);var
va=this.getMEPNode(ub.Hb);var
ia=va.selectSingleNode(ub.cf);if(ia){var
G=ia.getAttribute(ub.Dc);if(G&&(G=jsx3.util.strTrim(String(G)))!=ub.Ra){var
Ca=this.getServer();var
R=Ca!=null?Ca.getCache():jsx3.CACHE;R.setDocument(G,Ua);}else c.gU(2,ub.df);}else c.gU(2,ub.ef);}else c.gU(2,ub.ff+Ua.getError());}else{var
Jb=this.getMEPNode(oa);if(Jb==null&&oa==ub.Ze)Jb=this.getMEPNode(ub.Hb);if(Jb){var
S=Jb.selectNodes(ub.cc);for(var
fb=S.iterator();fb.hasNext();){var
M=fb.next();var
za=M.getAttribute(ub.Yc);var
ja=M.getAttribute(ub.dc);var
da=ub.Ra;if(ja!=null&&jsx3.util.strTrim(ja)!=ub.Ra){da=ub.gf;B.setSelectionNamespaces(ub.hf+ja+ub.fc);}var
z=ub.jf+da+za;var
Za=B.selectSingleNode(z);if(Za!=null){this._jsxallcdfs={};if(!Za.equals(B.getRootNode())){var
Xa=Za.getParent();var
ma=Xa.selectNodes(da+za);for(var
ya=ma.iterator();ya.hasNext();)this.doReadAndRecurse(ya.next(),M);}else this.doReadAndRecurse(Za,M);for(var ha in this._jsxallcdfs){var
Na=this._jsxallcdfs[ha];Na.setDocument(ha,Na.getDocument(ha));}}}}else c.gU(5,ub.kf);}}Ka.log(ub.lf);};c.getNSForURL=function(e,b){var
Hb=(e.getRootNode()).getAttributes();for(var
ca=Hb.size()-1;ca>=0;ca--)if((Hb.get(ca)).getValue()==b)return (Hb.get(ca)).getBaseName();};c.getURLForNS=function(b,n){if(jsx3.util.strEmpty(n))return null;try{var
Db=b.selectSingleNode(ub.mf+n+ub.nf+n);}catch(Kb){var
Sa={};Sa.FUNCTION=ub.of;Sa.PREFIX=n+ub.Ra;Sa.DESCRIPTION=ub.pf;jsx3.util.Logger.logError(Sa);return null;}return Db?Db.getValue():null;};c.getVersion=function(){return ub.qf;};g.compile=function(){var
Ma=new
jsx3.util.Timer(c.jsxclass,this.getEndpointURL());this._resetCompiler();var
O=this.getMEPNode(ub.Hb);var
J=[];J.push(ub.rf);J.push(ub.sf);J.push(ub.tf);this._compile(O,J,true);J.push(ub.uf);var
B=[],Na=[];for(var rb in this.Xm){B.push(this.Xm[rb]);Na.push(ub.Rc+this.Xm[rb]+ub.vf+rb+ub.ab);}J[1]+=(Na.join(ub.wf)+ub.xf+B.join(ub.wf)+ub.yf);var
x=J.join(ub.zf);var
Db=new
jsx3.xml.Document();Db.loadXML(x);if(Db.hasError()){c.gU(2,ub.Af+Db.getError());return;}else this.dh=Db;Ma.log(ub.Bf);return Db;};g._compile=function(e,a,i){var
E=this.MO(e);if(i){a.push(ub.Cf);}else{var
ra=E?E.prefix+ub.Zc:ub.Ra;var
Bb=e.getAttribute(ub.Yc);if(e.getAttribute(ub.Wc)==ub.Xc)Bb=ub.Df+Bb;var
P=e.getAttribute(ub.De);a.push(ub.Ef+P+ub.Ff);}var
pa=e.selectNodes(ub.Gf);var
na=[];for(var
x=pa.iterator();x.hasNext();){var
xa=x.next();var
Kb=xa.getAttribute(ub.Cc);var
yb=xa.getAttribute(ub.Dc);if(Kb==ub.Gd){a.push(ub.Hf);na.push(ub.If);}else if(Kb==ub.Jd){a.push(ub.Jf);na.push(ub.Kf);}else a.push(ub.Lf+yb+ub.Mf);}var
L=e.selectNodes(ub.cc);for(var
x=L.iterator();x.hasNext();){var
pb=x.next();var
I;var
Va=pb.selectSingleNode(ub.Sc);if(Va){var
zb=pb.selectSingleNode(ub.Tc+Va.getValue()+ub.Mb);if(zb!=null){I=pb.getAttribute(ub.Yc);pb=zb;}}var
Mb=this.MO(pb);var
ra=Mb?Mb.prefix+ub.Zc:ub.Ra;if(i)ra=ub.jf+ra;var
Bb=I||pb.getAttribute(ub.Yc);if(pb.getAttribute(ub.Wc)==ub.Xc)Bb=ub.Df+Bb;var
P=pb.getAttribute(ub.De);a.push(ub.Nf+ra+Bb+ub.Of+P+ub.Pf);}for(var
x=na.length-1;x>=0;x--)a.push(na[x]);a.push(ub.Qf);L=e.selectNodes(ub.Rf);for(var
x=L.iterator();x.hasNext();){var
pb=x.next();this._compile(pb,a);}};g._resetCompiler=function(){this.dh=null;this.Xm={};this.Rb=0;};g.MO=function(j){var
T=j.getAttribute(ub.dc);if(T==c.IE[ub.Ia]){return;this.Xm[T]=ub.Ia;return {prefix:ub.Ia,namespace:T};}else if(T&&(T=jsx3.util.strTrim(String(T)))!=ub.Ra){if(!this.Xm[T]){this.Rb+=1;this.Xm[T]=ub.Qc+this.Rb;}return {prefix:ub.Qc+this.Rb,namespace:T};}};});jsx3.net.Service.prototype.getOperation=jsx3.net.Service.prototype.getOperationName;jsx3.net.Service.prototype.setOperation=jsx3.net.Service.prototype.setOperationName;jsx3.net.Service.prototype.getStubURL=jsx3.net.Service.prototype.getOutboundStubURL;jsx3.net.Service.prototype.setStubURL=jsx3.net.Service.prototype.setOutboundStubURL;jsx3.net.Service.prototype.addHeader=jsx3.net.Service.prototype.setRequestHeader;jsx3.net.Service.prototype.setServiceURL=jsx3.net.Service.prototype.setEndpointURL;jsx3.Service=jsx3.net.Service;
