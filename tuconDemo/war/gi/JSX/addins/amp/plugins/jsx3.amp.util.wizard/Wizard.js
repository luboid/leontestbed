jsx3.Class.defineClass("jsx3.amp.util.Wizard",null,[jsx3.util.EventDispatcher],function(n,d){var
ub={a:"next",b:"previous",c:"cancel",d:"finish",e:"controller",f:"_wizard"};var
mb={a:ub.a,b:ub.b,c:ub.c,d:ub.d,e:ub.e,f:ub.f};var
Ba=jsx3.amp;n.NEXT=mb.a;n.PREVIOUS=mb.b;n.CANCEL=mb.c;n.FINISH=mb.d;(jsx3.$O(d)).extend({init:function(){this.XX=jsx3.$A();this.de=-1;this.WS={};},getSession:function(){return this.WS;},loadController:function(h){return n.PLUGIN.loadRsrcComponent(mb.e,h);},renderIn:function(j){this.SH=this.loadController(j);this.SH.getWizard=(jsx3.$F(function(){return this;})).bind(this);if(this.XX.length>0){this.de=0;var
kb=this.XX[0];this.pX(kb);}},setButtonState:function(i,f,o,c){this.SH.setButtonState(i,f,o,c);},pX:(jsx3.$F(function(s){this.setButtonState(s.mayPrevious(),s.mayNext(),s.mayFinish(),s.mayCancel());var
Ua=s.getUI();if(Ua){this.Or(Ua);this.VE(s);}else{this.Or();(s.tV(this.SH.getContentPane())).when((jsx3.$F(this.VE)).bind(this,[s]));}})).slept(),VE:function(q){this.SH.setTitle(q.getTitle());q.onEnter(this.WS);var
nb=q.getFirstResponder();if(nb)nb.focus();},Or:function(g){(jsx3.$A((this.SH.getContentPane()).getChildren())).each(function(s){s.setDisplay(g==s?jsx3.gui.Block.DISPLAYBLOCK:jsx3.gui.Block.DISPLAYNONE,true);});},cancel:function(){var
qb=this.XX[this.de];if(!qb||qb.mayCancel())this.publish({subject:n.CANCEL});},finish:function(){var
qa=this.XX[this.de];if(qa&&qa.mayFinish()){var
F=qa.onNext();(this.n9(F)).when((jsx3.$F(function(){qa.onExit(this.WS);this.publish({subject:n.FINISH});})).bind(this));}},next:function(){var
O=this.XX[this.de];if(O&&O.mayNext()){var
ma=O.onNext();(this.n9(ma)).when((jsx3.$F(function(){this.P5(O,ma,1);this.publish({subject:n.NEXT});})).bind(this));}},previous:function(){var
da=this.XX[this.de];if(da&&da.mayPrevious()){var
La=da.onPrevious();(this.n9(La)).when((jsx3.$F(function(){this.P5(da,La,-1);this.publish({subject:n.PREVIOUS});})).bind(this));}},n9:jsx3.$Y(function(s){var
xa=(s.args())[0];if(xa.alert){var
Va=this.SH.getAncestorOfType(jsx3.gui.Dialog)||this.SH.getServer();Va.alert(xa.title,xa.message,function(h){h.doClose();if(xa.ok)s.done();});}else if(xa.ok)s.done();}),P5:function(c,i,j){var
Va=this.de+j;var
Ab=this.XX[Va];if(Ab){c.onExit(this.WS);this.de=Va;this.pX(Ab);}},addPane:function(o){o._wizard=this;this.XX.push(o);},getPane:function(l){return this.XX[l];},getPaneCount:function(){return this.XX.length;},getPaneIndex:function(c){return this.XX.indexOf(c);},removePane:function(a){var
N=this.XX.splice(a,1);if(N[0])delete N[0][mb.f];}});});jsx3.Class.defineClass("jsx3.amp.util.WizardPane",null,[jsx3.util.EventDispatcher],function(j,p){var
Bb=jsx3.amp;p.init=function(k,d){this.iG=k;this.sV=d;};p.tV=jsx3.$Y(function(l){var
tb=(l.args())[0];if(this.iG instanceof Bb.Resource){(this.iG.load()).when((jsx3.$F(function(){if(this.sV instanceof Bb.PlugIn){this.SH=this.sV.loadRsrcComponent(this.iG,tb);}else this.SH=tb.loadXML(this.iG.getData(),null,this.sV);this.SH.getPane=(jsx3.$F(function(){return this;})).bind(this);l.done();})).bind(this));}else if(this.iG instanceof jsx3.xml.Entity){this.SH=tb.loadXML(this.iG,null,this.sV);this.SH.getPane=(jsx3.$F(function(){return this;})).bind(this);if(this.sV instanceof Bb.PlugIn)this.SH.getPlugIn=(jsx3.$F(function(){return this;})).bind(this.sV);l.done();}else throw new
jsx3.Exception();});p.getTitle=function(){return this.SH.getTitle?this.SH.getTitle():null;};p.getUI=function(){return this.SH;};p.getFirstResponder=function(){return this.SH.getFirstResponder?this.SH.getFirstResponder():null;};p.getWizard=function(){return this._wizard;};p.onNext=function(){if(this.SH.onTryNext){var
cb=this.SH.onTryNext();if(cb)return cb;}return {ok:true};};p.onPrevious=function(){if(this.SH.onTryPrevious){var
_=this.SH.onTryPrevious();if(_)return _;}return {ok:true};};p.onEnter=function(m){if(this.SH.onReveal)this.SH.onReveal(m);};p.onExit=function(o){if(this.SH.onConceal)this.SH.onConceal(o);};p.mayPrevious=function(){var
Kb=(this.getWizard()).getPaneIndex(this);return Kb>0;};p.mayCancel=function(){return true;};p.mayNext=function(){var
Gb=(this.getWizard()).getPaneIndex(this);return Gb<(this.getWizard()).getPaneCount()-1;};p.mayFinish=function(){var
va=(this.getWizard()).getPaneIndex(this);return va==(this.getWizard()).getPaneCount()-1;};});
