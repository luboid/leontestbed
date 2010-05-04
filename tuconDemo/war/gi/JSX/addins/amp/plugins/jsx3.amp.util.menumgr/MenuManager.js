jsx3.Class.defineClass("jsx3.amp.util.MenuManager",null,null,function(q,p){var
ub={a:"No menu bar or parent menu for menu: ",b:"/",c:"Invalid menu path for action: "};var
mb={a:ub.a,b:ub.b,c:ub.c};var
Ba=jsx3.amp;var
na=jsx3.util.Logger.getLogger(q.jsxclass.getName());p.init=function(){this.iA={};this.Ny={};};p.addMenuBar=function(h,s){this.iA[h]=s;};p.getMenu=function(r){return this.Ny[r];};p.getMenus=function(){var
va=jsx3.$A();for(var ma in this.Ny)va.push(this.Ny[ma]);return va;};p.finishInit=function(){for(var Mb in this.Ny){var
sa=this.Ny[Mb];var
zb=this.iA[sa.getPath()];if(zb){zb.setChild(sa.getNativeMenu());(sa.getNativeMenu()).setSourceXML(sa.getXML());zb.paintChild(sa.getNativeMenu());}}};p.addMenu=function(j){var
ka=this.iA[j.getPath()];var
fa=this.Fq(j.getPath());if(ka){}else{var
I=this.Ny[fa[0]];if(I){I.addItem(j,fa[1]);}else na.warn(mb.a+fa[0]);}var
v=fa[0]+j.getId()+mb.b;this.Ny[v]=j;};p.addItem=function(h){var
v=this.Fq(h.getPath());var
_a=this.Ny[v[0]];if(_a){_a.addItem(h,v[1]);}else na.warn(mb.c+v[0]);};p.Fq=function(g){var
ga=g.split(mb.b);var
ia=ga[ga.length-1];var
D=(ga.slice(0,ga.length-1)).join(mb.b)+mb.b;return [D,ia];};});jsx3.Class.defineClass("jsx3.amp.util.MenuItem",null,null,function(k,e){var
ub={a:".",b:"id",c:"label",d:"img",e:"tip",f:"menupath",g:"/",h:"execute",i:"enabled",j:"with(this){",k:"}",l:"selected",m:"hotkey"};var
Eb={a:ub.a,b:ub.b,c:ub.c,d:ub.d,e:ub.e,f:ub.f,g:ub.g,h:ub.h,i:ub.i,j:ub.j,k:ub.k,l:ub.l,m:ub.m};var
Ca=jsx3.amp;e.init=function(q,a){this.WW=q;this.C6=a;};e.attr=function(h){return this.C6.attr(h);};e.getId=function(){return this.WW.getId()+Eb.a+this.attr(Eb.b);};e.getLabel=function(){return this.attr(Eb.c);};e.getImg=function(){var
ma=this.attr(Eb.d);return ma?jsx3.net.URIResolver.JSX.relativizeURI((this.WW.getPlugIn()).resolveURI(ma)):null;};e.getTip=function(){return this.attr(Eb.e);};e.getPath=function(){return this.attr(Eb.f);};e.wH=function(){var
Z=this.getPath();if(Z.lastIndexOf(Eb.g)!=Z.length-1)Z=Z+Eb.g;return Z+this.getId();};e.execute=function(){var
x=this.attr(Eb.h);if(x){var
t=(this.getRootMenu()).getNativeMenu();((this.WW.getPlugIn()).load()).when((jsx3.$F(function(){try{this.eval(x,{menu:t});}catch(ya){Ca.LOG.error(jsx3.NativeError.wrap(ya));}})).bind(this.WW));}};e.toString=function(){return this.getId();};e.isEnabled=function(){var
nb=this.C6.attr(Eb.i);if(nb&&Ca.PlugIn.isBindExpr(nb))return Boolean((this.WW.getPlugIn()).eval(Eb.j+nb.substring(1,nb.length-1)+Eb.k));return true;};e.isSelected=function(){var
Jb=this.C6.attr(Eb.l);if(Jb&&Ca.PlugIn.isBindExpr(Jb))return Boolean((this.WW.getPlugIn()).eval(Eb.j+Jb.substring(1,Jb.length-1)+Eb.k));return false;};e.getHotKey=function(){return this.attr(Eb.m);};e.getMenu=function(){return this._parent;};e.getRootMenu=function(){var
O=this;while(O._parent)O=O._parent;return O;};e.getExt=function(){return this.WW;};});jsx3.Class.defineClass("jsx3.amp.util.Menu",jsx3.amp.util.MenuItem,null,function(r,p){var
ub={a:"jsx3.amp.util.MenuManager",b:"divider",c:"id",d:"section",e:"jsxroot",f:"//*[@jsxid='",g:"']",h:"jsxid",i:"1",j:"0",k:"record",l:"record | record/record",m:"Error: no item with ID ",n:"path",o:"jsx3.gui.Menu",p:"1;",q:"Vq",r:"IK",s:"jsxdisableescape",t:"yes",u:""};var
Ha={a:ub.a,b:ub.b,c:ub.c,d:ub.d,e:ub.e,f:ub.f,g:ub.g,h:ub.h,i:ub.i,j:ub.j,k:ub.k,l:ub.l,m:ub.m,n:ub.n,o:ub.o,p:ub.p,q:ub.q,r:ub.r,s:ub.s,t:ub.t,u:ub.u};var
Ya=jsx3.amp;var
na=jsx3.util.Logger.getLogger(Ha.a);p.init=function(b,c){this.jsxsuper(b,c);this.Qs=[];this.y7={};this.Ez={};(c.children()).each((jsx3.$F(function(i){if(i.nname()==Ha.b)this.addSection(i.attr(Ha.c),true);else if(i.nname()==Ha.d)this.addSection(i.attr(Ha.c),false);})).bind(this));};p.getItem=function(e){var
G=this.Ez[e];if(!G)for(var xb in this.Ez)if(this.Ez[xb] instanceof r){G=this.Ez[xb].getItem(e);if(G)break;}return G;};p.Vq=function(f){var
M=f.context.strPARENTID;if(M==null)M=Ha.e;var
Ga=this._menu.getXML();var
ib=Ga.selectSingleNode(Ha.f+M+Ha.g);if(!ib)ib=Ga;var
wb=null,O=ib;while(!wb){wb=this.getItem(O.getAttribute(Ha.h));O=O.getParent();if(O==null)wb=this;}wb.onShow(this._menu,ib);};p.getXML=function(){var
Fb=jsx3.xml.CDF.Document.newDocument();for(var
lb=0;lb<this.Qs.length;lb++){var
Ab=this.Qs[lb];for(var
fa=0;fa<Ab._items.length;fa++){var
Kb=Ab._items[fa];var
F=Fb.insertRecord({jsxid:Kb.getId(),jsxtext:Kb.getLabel(),jsximg:Kb.getImg(),jsxtip:Kb.getTip(),jsxkeycode:Kb.getHotKey(),jsxdivider:fa==0&&Ab._divider?Ha.i:Ha.j});if(Kb instanceof r){var
ga=Kb.getXML();for(var
C=ga.selectNodeIterator(Ha.k);C.hasNext();)F.appendChild((C.next()).cloneNode(true));}}}return Fb;};p.onShow=function(k,f){for(var
nb=f.selectNodeIterator(Ha.l);nb.hasNext();){var
Ja=(nb.next()).getAttribute(Ha.h);if(Ja){var
Kb=this.Ez[Ja];if(Kb){k.enableItem(Ja,Kb.isEnabled());k.selectItem(Ja,Kb.isSelected());}else{Kb=this.getItem(Ja);if(Kb)k.enableItem(Ja,Kb.isEnabled());else na.warn(Ha.m+Ja);}}}};p.IK=function(d){var
sa=d.context.strRECORDID;var
I=this.getItem(sa);if(I)I.execute();};p.getId=function(){return this.attr(Ha.c);};p.getPath=function(){return this.attr(Ha.n);};p.getNativeMenu=function(){if(this._menu==null){jsx3.require(Ha.o);this._menu=new
jsx3.gui.Menu(this.getId(),this.getLabel());this._menu.setEvent(Ha.p,jsx3.gui.Interactive.MENU);this._menu.subscribe(jsx3.gui.Interactive.MENU,this,Ha.q);this._menu.subscribe(jsx3.gui.Interactive.EXECUTE,this,Ha.r);this._menu.setXSLParam(Ha.s,Ha.t);}return this._menu;};p.addSection=function(h,f){var
ea={_id:h,_divider:f,_items:[]};this.Qs.push(ea);this.y7[h]=ea;};p.addItem=function(d,o){var
Oa=this.y7[o]||this.y7[Ha.u];if(!Oa){this.addSection(Ha.u,false);Oa=this.y7[Ha.u];}this.Ez[d.getId()]=d;Oa._items.push(d);d._parent=this;};p.getItems=function(){var
B=jsx3.$A();for(var
ka=0;ka<this.Qs.length;ka++){var
ob=this.Qs[ka];for(var
Mb=0;Mb<ob._items.length;Mb++)B.push(ob._items[Mb]);}return B;};});
