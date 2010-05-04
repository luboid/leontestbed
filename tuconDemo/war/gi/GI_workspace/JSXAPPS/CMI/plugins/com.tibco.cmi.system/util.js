jsx3.lang.Class.defineClass("com.tibco.cmi.system.util", 
  null, 
  null, 
  function(KLASS, instance){
  
		KLASS.DLG_TYPE_PROMOTE = "promote";
  	KLASS.DLG_TYPE_ALERT = "alert";
		
		KLASS.getServer = function(){
				return com.tibco.cmi;
		};

		KLASS.getDynProp = function(key,strtokens){
				var server = KLASS.getServer();
				return server.getDynamicProperty.apply(server,arguments);
			};
			
		KLASS.promote = function(type,title,desc,detail,funok,funcancel){
		  jsx3.amp.Engine.getEngine(KLASS.getServer()).getPlugIn("com.tibco.cmi.system").publish({
       	 	     subject:"mftAlert",
       	 	     alertType:type,
       	 	     dlgTitle:title,
       	 	     dlgDesc:desc,
       	 	     dlgDetail:detail,
       	 	     funOk:funok,
       	 	     funCancel:funcancel
			});
		}
		
		KLASS.getExceptionMsg = function(message,exception){
			var msg;    
/* 		  if(exception && exception.javaClassName  == 'com.tibco.ax.tcm.messenger.runtime.webengine.gui.servlet.DwrSessionTimeoutException'){
			  document.location.reload();
		  }
			if (message && message != "Error" && message != "Timeout")
				  msg = message;
			else if(message == "Timeout"){
				  msg = this.getDynProp("@tibco_mftalert_dwr_timeout");
			}
			else{
				  msg = this.getDynProp("@tibco_mftalert_dwr_error");
			} */
			msg = message;
			return msg;
		}
		
		KLASS.showTipMsg = function(objmtx,objcol,record_id){
			var att = objcol.getPath();
			var tempText=objmtx.getContentElement(record_id,att).innerHTML.replace(/&nbsp;\s*$/ig, "");
			var isText = tempText.indexOf("<");
			if(isText != -1)
			{
				tempText = objmtx.getRecordNode(record_id).getAttribute(att);
			}
			var UA = navigator.userAgent.toLowerCase();
			var isOpera = UA.indexOf("opera")!=-1;
			var isIE = UA.indexOf("msie")!=-1&&(document.all&&!isOpera);
			var isKon = UA.indexOf("konqueror")!=-1;
			var isSafari = UA.indexOf("safari")!=-1||isKon;
			if(tempText.length == 0){return;}
			else if(tempText.length <= 30)
			{
				var tipWidth = tempText.length*8;
			}
			else {var tipWidth = 210}
			var formatMsg = "<div style='width:"+tipWidth+"px;word-wrap:break-word;white-space:-moz-pre-wrap;overflow:hidden;padding:0 0 0 0'>" + 												tempText + "</div>";
				
				return formatMsg;
		};
		
})

