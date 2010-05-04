/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.xml.DojoDataStore",null,[jsx3.xml.CDF],function(b,a){var
ub={a:"Not supported"};var
T=jsx3.xml.CDF;b.aM=jsx3.util.Logger.getLogger(T.jsxclass.getName());a.init=function(p){this.store=p;};function
createNode(r,c){var
I=new
jsx3.xml.DataStoreItem();I.item=c;I.store=r;return I;}a.insertRecord=function(s,g,k){var
I=this.store.newItem(s);if(k)this.redrawRecord(this.store.getIdentity(I),1);return createNode(this.store,I);};a.insertRecordNode=function(k,j,p){throw new
jsx3.Exception(ub.a);};function
operationById(o,q,h){o.fetchItemByIdentity({identity:q,onItem:function(c){h(o,c);}});}a.insertRecordProperty=function(g,q,n,r){operationById(this.store,g,function(k,j){k.setValue(j,q,n);});if(r)this.redrawRecord(g,2);return this;};a.deleteRecordProperty=function(r,l,m){operationById(this.store,r,function(n,g){n.unsetAttribute(g,l);});if(m)this.redrawRecord(r,2);};a.adoptRecord=function(c,k,l,f){throw new
jsx3.Exception(ub.a);};a.insertRecordBefore=function(o,l,g){return this.insertRecord(o,null,g);};a.adoptRecordBefore=function(d,j,c,e){return this.adoptRecord(d,j,c,e);};a.deleteRecord=function(f,l){operationById(this.store,f,function(g,n){g.deleteItem(n);});if(l)this.redrawRecord(f,0);};a.getRecord=function(q){var
va;operationById(this.store,q,function(r,c){va={};var
rb=r.getAttributes(c);for(var
Qa=0;Qa<rb.length;Qa++)va[rb[Qa]]=r.getValue(c,rb[Qa]);});return va;};a.getRecordIds=function(){var
xa=[];var
V=this.store;V.fetch({syncMode:true,query:this.query,onComplete:function(s){var
Ba,N=0;while(Ba=s[N])xa[N++
]=V.getIdentity(Ba);}});return xa;};a.getRecordNode=function(g){var
S;operationById(store,g,function(q,d){S=createNode(q,d);});return S;};a.resetData=function(l){throw new
jsx3.Exception(ub.a);};a.reloadFromSource=function(j){};a.redrawRecord=function(){};a.assignIds=function(){};a.getKey=function(){throw new
jsx3.Exception(ub.a);};a.newDocument=function(){throw new
jsx3.Exception(ub.a);};a.getVersion=function(){return 1;};a.convertProperties=function(d,r,s){throw new
jsx3.Exception(ub.a);};a.hasError=function(){return false;};a.getNamespaceURI=function(){return null;};a.getRootNode=function(){return null;};a.getNative=function(){throw new
jsx3.Exception(ub.a);};});jsx3.Class.defineClass("jsx3.xml.DataStoreItem",jsx3.xml.Entity,null,function(p,f){f.init=function(){};f.getAttribute=function(m){return this.store.getValue(this.item,m);};f.getAttributeNames=function(){return this.store.getAttributes();};});
