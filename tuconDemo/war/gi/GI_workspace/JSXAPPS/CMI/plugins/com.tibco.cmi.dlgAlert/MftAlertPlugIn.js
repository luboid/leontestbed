(function(plugIn){
	jsx3.$O(plugIn).extend({
		initializeDlg:function(dlgType,dlgTitle,dlgDesc,dlgDetails,funok,funcancel){
			var uiRoot = plugIn.loadRsrcComponent("MftAlertDlg_xml",plugIn.getServer().getBodyBlock());
			uiRoot.getDescendantOfName("winBarTitle").setText(dlgTitle,true);
			uiRoot.getDescendantOfName("blkdesc").setText(dlgDesc,true);
			
			if(funok){
			  uiRoot.getDescendantOfName("btnok").subscribe(jsx3.gui.Interactive.EXECUTE,function(){funok();uiRoot.doClose()});
		  }
		  else {
		  	uiRoot.getDescendantOfName("btnok").subscribe(jsx3.gui.Interactive.EXECUTE,function(){uiRoot.doClose()});
		  }
			if(funcancel){
				uiRoot.getDescendantOfName("btncancel").subscribe(jsx3.gui.Interactive.EXECUTE,function(){funcancel();uiRoot.doClose()});
			}
			else {
				uiRoot.getDescendantOfName("btncancel").subscribe(jsx3.gui.Interactive.EXECUTE,function(){uiRoot.doClose()});
			}
			if(dlgType == com.tibco.cmi.system.util.DLG_TYPE_ALERT){
				 uiRoot.getDescendantOfName("btncancel").setDisplay(jsx3.gui.Block.DISPLAYNONE,true);
			}
			if(dlgDetails){
				uiRoot.getDescendantOfName("lbldetails").setDisplay(jsx3.gui.Block.DISPLAYBLOCK,true);
				uiRoot.getDescendantOfName("blkdetails").setText(dlgDetails,true);
			}
	  }
	});
})(this)