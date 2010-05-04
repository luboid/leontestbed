jsx3.lang.Class.defineClass("com.tibco.cmi.desktop.Desktop", 
  jsx3.gui.Block, 
  null, 
  function(DESKTOP, instance){
	   var systemUtil = com.tibco.cmi.system.util;
     instance.onRsrcLoad = function(){
			 this.init();
			 var me = this;
			 this.loadMenu();
     };
    
		instance.init = function(){
		   DESKTOP.Nav = this.getDescendantOfName("TabbedNav");
			 DESKTOP.Nav.activeView = null;
			 DESKTOP.me = this.getDescendantOfName('desktop');
			 DESKTOP.help = null;
			 DESKTOP.logout = null;
			 
    };
		
		instance.loadMenuPaneResource = function(pluginid,id,container){
		   jsx3.log('load:'+pluginid);
		   var plugin = this.getPlugIn().getEngine().getPlugIn(pluginid);
			 jsx3.log(plugin+':'+id);
		   plugin.load().when(jsx3.$F(function(){plugin.loadRsrcComponent(id,container);this.repaint();}).bind(this));
		}
		
		instance.loadMenu = function(){
		   var TabbedNav = DESKTOP.Nav;
			 var autoBtn = null;
			 this.getPlugIn().getExtPoint("menu").processExts(jsx3.$F(function(ext,xml){
			     var objMenuBtn = new tibco.uxcore.gui.TabbedNavMenuButton();
					 objMenuBtn.setText(xml.attr("text"));
					 var cdf = jsx3.xml.CDF.Document.newDocument();
					 cdf.insertRecord({
					    jsxid:'id',
							jsxtext:xml.attr('text'),
							strRsrcId:xml.attr('strRsrcId'),
							pluginid:ext.getPlugIn().getId()
					 });
					 objMenuBtn.getFirstChild().setXMLString(cdf.getXML().toString());
           TabbedNav.setChild(objMenuBtn);
					 if(xml.attr('auto')){
					     autoBtn = objMenuBtn; 
					 }
			 }).bind(this));
			 setTimeout(function(){var recordids = autoBtn.getFirstChild().getRecordIds();
			 autoBtn.selected(null, recordids[0], autoBtn.getFirstChild().getRecordNode(recordids[0]));},0);
		};
})

