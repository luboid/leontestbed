(function(plugIn){
	plugIn.paint = function(objContainer){
	  // var Engine = tibco.mft.xconsole.dwr.Engine;
	  // Engine.setErrorHandler(plugIn.dwrErrorHandler);
	  this.loadRsrcComponent("Desktop_xml", objContainer);
	};
	//overwrite the select function
	tibco.uxcore.gui.TabbedNavMenuButton.prototype.selected = function(objEVENT, strRECORDID, objRECORD, auxObj){
	  var tabnav = this.getAncestorOfType(tibco.uxcore.gui.TabbedNav);
		var desktop = tabnav.getParent().getParent();
		var menuPane = tabnav.getTabbedPane(this);
		var rsrcPlugin = objRECORD.getAttribute('pluginid');
		var rsrcId = objRECORD.getAttribute('strRsrcId');
		if(tabnav.activeMenu){
		  jsx3.log('active');
		  tabnav.activeMenu.setBorder('0px solid #ffffff',true);
			tabnav.activeMenu.setColor('#D1E6F9',true);
		}
		this.setBorder('0px solid #338BDA; 1px solid #338BDA; 0px solid #338BDA; 1px solid #338BDA;',true);
		this.setColor("#F3DBFC", true);
		if(menuPane.getChild(0) && menuPane.getChild() != tabnav.activeView){
		  tabnav.activeView.setDisplay(jsx3.gui.Block.DISPLAYNONE);
			tabnav.activeView.repaint();
			menuPane.setVisibility(jsx3.gui.Block.VISIBILITYVISIBLE);
		}
		else {
		  if(tabnav.activeView){
			   tabnav.activeView.setDisplay(jsx3.gui.Block.DISPLAYNONE);
			}
		  desktop.loadMenuPaneResource(rsrcPlugin,rsrcId,menuPane);
		}
		menuPane.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);
		menuPane.setVisibility(jsx3.gui.Block.VISIBILITYVISIBLE);
		menuPane.repaint();
		tabnav.activeView = menuPane;
		tabnav.activeMenu = this;
		var selectedTab = this.getText();
	};
	// plugIn.dwrErrorHandler = function(msg,exception){
		// jsx3.amp.Engine.getEngine(plugIn.getServer()).getPlugIn("tibco.mft.xconsole.system").publish({
       	 	     // subject:"mftAlert",
       	 	     // alertType:tibco.mft.deploy.system.util.DLG_TYPE_ALERT,
       	 	     // dlgTitle:tibco.mft.deploy.system.util.getDynProp("@tibco_mftalert_caption_error"),
       	 	     // dlgDesc:tibco.mft.deploy.system.util.getExceptionMsg(msg,exception),
       	 	     // dlgDetail:exception.detailErrMsg,
       	 	     // funOk:null,
       	 	     // funCancel:null
       	 // });
	// };
})(this)
