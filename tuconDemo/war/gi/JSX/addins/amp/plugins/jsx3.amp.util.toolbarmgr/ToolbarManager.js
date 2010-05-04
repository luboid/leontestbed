jsx3.Class.defineClass("jsx3.amp.util.ToolbarManager",null,null,function(g,o){var
U=jsx3.amp;o.init=function(a){this._bar=a;this._items=jsx3.$A();this._sections=jsx3.$A();this._lastInSection={};};o.addSection=function(l,b){this._sections.push({name:l,div:b});};o.addItem=function(f){var
Db=f.getSection();var
wb=-1;var
Ta=this._sections.find(function(s){wb++;return s.name==Db;});var
ub=false,ob=null;if(Ta){var
V=this._lastInSection[Db];if(V){ob=V.getNextSibling();}else{ub=Ta.div;for(var
Cb=wb-1;Cb>=0;Cb--){var
La=this._sections[Cb].name;if(this._lastInSection[La]){ob=this._lastInSection[La].getNextSibling();break;}}}}var
Hb=f.paint(ub);this._bar.insertBefore(Hb,ob);this._lastInSection[Db]=Hb;};});jsx3.Class.defineClass("jsx3.amp.util.ToolbarItem",null,null,function(j,m){var
ub={a:".",b:"id",c:"img",d:"tip",e:"section",f:"button",g:"jsx3.gui.ToolbarButton",h:"false;",i:"enabled",j:"false",k:"true",l:"state",m:"native",n:"execute"};var
vb={a:ub.a,b:ub.b,c:ub.c,d:ub.d,e:ub.e,f:ub.f,g:ub.g,h:ub.h,i:ub.i,j:ub.j,k:ub.k,l:ub.l,m:ub.m,n:ub.n};var
ga=jsx3.amp;var
C=ga.Bindable;m.init=function(h,p){this._ext=h;this._xml=p;};m.getId=function(){return this._ext.getId()+vb.a+this._xml.attr(vb.b);};m.getType=function(){return this._xml.nname();};m.getImg=function(){var
rb=this._xml.attr(vb.c);return rb?jsx3.net.URIResolver.JSX.relativizeURI((this._ext.getPlugIn()).resolveURI(rb)):null;};m.getTip=function(){return this._xml.attr(vb.d);};m.getSection=function(){return this._xml.attr(vb.e);};m.paint=function(l){var
qa=null;var
aa=this.getType();if(aa==vb.f){jsx3.require(vb.g);qa=new
jsx3.gui.ToolbarButton(this.getId());qa.setImage((this.getImg()).toString());qa.setTip(this.getTip());qa.setDivider(l);qa.setEvent(vb.h,jsx3.gui.Interactive.EXECUTE);qa.subscribe(jsx3.gui.Interactive.EXECUTE,this,this._execute);var
Cb=this._xml.attr(vb.i);if(Cb)if(ga.PlugIn.isBindExpr(Cb)){(this._ext.getPlugIn()).regBindExpr(Cb,function(k){qa.setEnabled(k,true);});}else if(Cb==vb.j)qa.setEnabled(false);else if(Cb==vb.k)qa.setEnabled(true);else qa.setEnabled(this._ext.eval(Cb));var
R=this._xml.attr(vb.l);if(R){qa.setType(jsx3.gui.ToolbarButton.TYPECHECK);if(ga.PlugIn.isBindExpr(R)){(this._ext.getPlugIn()).regBindExpr(R,function(g){qa.setState(g,true);});}else qa.setState(this._ext.eval(R));}}else if(aa==vb.m){var
za=(this._xml.toNative()).getFirstChild();qa=(((this._ext.getPlugIn()).getServer()).getRootBlock()).loadXML(za,false,this._ext.getPlugIn());if(qa.setDivider)qa.setDivider(l);}else throw new
jsx3.Exception();return qa;};m._execute=function(p){this._ext.eval(this._xml.attr(vb.n),{item:p.target});};});
