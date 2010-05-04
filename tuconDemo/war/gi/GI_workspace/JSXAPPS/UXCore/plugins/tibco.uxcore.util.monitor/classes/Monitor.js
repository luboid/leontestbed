jsx3.lang.Class.defineClass("tibco.uxcore.util.Monitor", jsx3.gui.Block, null, function(KLASS, instance) {

  var folders = jsx3.$A([
    {id: "@folder.system", name: "System", open:0, image: "folder_system.png"},
    {id: "@folder.uxcore", name: "Core",   open:0, image: "folder_core.png"},
    {id: "@folder.user",   name: "User",   open:1, image: "folder.png"}
  ]);

  var treeOpenStatus = [];
  folders.each(function(folder) {
    treeOpenStatus[folder.id] = folder.open;
    folder.plugins = jsx3.$A([]);
  });

  instance.getEngine = function() {
    return jsx3.amp.Engine.getEngine(this.getServer());
  };

  instance.onRsrcLoad = function() {
    this._tree = this.getDescendantOfName("tree");
    this._tree.toggleHandler = jsx3.$F(this.toggleHandler).bind(this);
    this._tree.selectHandler = jsx3.$F(this.selectHandler).bind(this);

    this._menu = this.getAncestorOfType("jsx3.gui.Dialog").getDescendantOfName("menu");
    this._menu.executeHandler = function(strRecordId) {
      this.selectItem(strRecordId, this.isItemSelected(strRecordId) ? false : true);
      this.getAncestorOfType("jsx3.gui.Dialog").monitor.refresh();
    };

    this._content = this.getDescendantOfName("content");
    this._content.clickLinkHandler = jsx3.$F(this.clickLinkHandler).bind(this);
    
    this._txtQueryValue = this.getDescendantOfName("txtQueryValue");
    this._txtQueryValue.executeHandler = jsx3.$F(this.doSearch).bind(this);

    this._btnGoBack = this.getDescendantOfName("btnGoBack");
    this._btnGoBack.execute = jsx3.$F(this.goBack).bind(this);
    this._btnGoForward = this.getDescendantOfName("btnGoForward");
    this._btnGoForward.execute = jsx3.$F(this.goForward).bind(this);
    this._history = [];
    this._historyindex = -1;

    this.refresh();
  };

  instance.toggleHandler = function(tree, strRecordId, objRecord, bOpen) {
    treeOpenStatus[strRecordId] = bOpen ? 1 : 0;
  };

  instance.selectHandler = function(tree, strRecordId) {
    var record = tree.getRecord(strRecordId), success = false;
    if(record && record.jsxtype == "plugin") {
      success = this.loadPlugInDetail(strRecordId);
    }
    if(record && record.jsxtype == "extPoint") {
      success = this.loadExtPointDetail(strRecordId);
    }
    if(success) this.visit(strRecordId, record.jsxtype);
  };

  instance.clickLinkHandler = function(id, type, bRecord) {
    var success = false;
    if(type == "plugin") {
      success = this.loadPlugInDetail(id);
      this._tree.setValue(id);
    }
    if(type == "extPoint") {
      success = this.loadExtPointDetail(id);
      this._tree.setValue(id);
    }
    if(bRecord !== false && success) this.visit(id, type);
  };

  instance.queryExecuteHandler = function() {
    var queryValue = this._txtQueryValue.getValue();
    if(queryValue) {
      this._queryResultIndex = this._queryResultIndex + 1;
      if(this._lastQueryValue != queryValue) {
        this._lastQueryValue = queryValue;
        this._queryResults = this._tree.getXML().selectNodes("//record[contains(@jsxtext, '" + queryValue +"')]").map(function(record) {
          return record.getAttribute("jsxid");
        });
        
        this._queryResults.sort();
        this._queryResultIndex = 0;
      }
      if(this._queryResults.size()>0) {
        if(this._queryResultIndex>=this._queryResults.size()) this._queryResultIndex = 0;
        this._tree.setValue(this._queryResults.get(this._queryResultIndex));
        this._tree.revealRecord(this._tree.getValue(), this._tree.getParent());
        this.selectHandler(this._tree, this._tree.getValue());
        this._txtQueryValue.setBackgroundColor("#FFF", true);
      } else {
        this._txtQueryValue.setBackgroundColor("#F88", true);
      }
    }
  };

  instance.doSearch = function() {
    var queryValue = this._txtQueryValue.getValue();
    if(queryValue) {
      var cdfResult = jsx3.xml.CDF.Document.newDocument();
      this._tree.getXML().selectNodes("//record[contains(@jsxid, '" + queryValue +"')]").map(function(record) {
        cdfResult.insertRecord({jsxid:record.getAttribute("jsxid"), type:record.getAttribute("jsxtype")});
        return record.getAttribute("jsxid");
      });
      this.getDescendantOfName("layoutRows").setRows("200,*",true);
      var objContent = this.getDescendantOfName("blkSearchResults");

      objContent.setXSLId(this.getPlugIn().getId() + ".xslResults");
      objContent.resetXmlCacheData();
      objContent.setXSLParam("jsxpluginpath", this.getPlugIn().resolveURI("\\"));
      objContent.setXMLString(cdfResult.toString());
      objContent.repaint();
    }

  };

  instance.doClearSearch = function() {
    this._txtQueryValue.setValue("", true);
    this.getDescendantOfName("layoutRows").setRows("27,*",true);
  };

  instance.refresh = function(menu) {
    this._bShowClassPlugIn = this._menu.isItemSelected("showClassPlugIn");
    this._bShowExtensionPoint = this._menu.isItemSelected("showExtensionPoint");
    this._bShowExtension = this._menu.isItemSelected("showExtension");
    this.initPlugInList();
  };

  instance.createNode = function(obj, type) {
    if(type == "plugin") {
      var plugin = obj;
      this.cdf.insertRecord({
        jsxid: plugin.getId(), 
        jsxtype: type,
        jsxtext: plugin.getId(), 
        jsximg: plugin.isLoaded()? "images/pluginloaded.png" : "images/plugin.png",
        jsxtip: plugin.getId() + "(ext:" + plugin.getExts().length + ", extPoint:"  + plugin.getExtPoints().length + ")",
        jsxopen: treeOpenStatus[plugin.getId()]
      }, plugin.folderId);
    }
    if(type == "extPoint") {
      var xp = obj;
      this.cdf.insertRecord({
        jsxid: xp.getId(),
        jsxtype: type,
        jsxtext : xp.getLocalId(),
        jsximg: "images/extPoint.png",
        jsxtip: xp.getId() + "(ext:" + xp.getExts().length + ")"
      }, xp.getPlugIn().getId());
    }
    if(type == "ext") {
      var ext = obj;
      var name = ext.getLocalId();
      if(name) {
        this.cdf.insertRecord({
          jsxid: ext.getId(),
          jsxtype: type,
          jsxtext : ext.getLocalId(),
          jsximg: "images/ext.png"
        }, ext.getPlugIn().getId());
      } else {
        this.cdf.insertRecord({
          jsxid: "@anonymous@" + ext.getPlugIn().getId() + "@" + ext.getPointId(),
          jsxtype: type,
          jsxtext : "? <" + ext.getPointId() + ">",
          jsxstyle : "color:#666;font-style:italic",
          jsximg: "images/ext.png"
        }, ext.getPlugIn().getId());        
      }
    }
    if(type == "folder") {
      var folder = obj;
      this.cdf.insertRecord({
        jsxid: folder.id, 
        jsxtext: folder.name + "("+ folder.plugins.length +")", 
        jsxopen: treeOpenStatus[folder.id], 
        jsximg: "images/" + folder.image,
        jsxstyle: "font-weight:bold;"
      }, "@folders");
    }
  };

  instance.createPlugInNode = function(obj) { return this.createNode(obj, "plugin"); };
  instance.createFolderNode = function(obj) { return this.createNode(obj, "folder"); };
  instance.createExtPointNode = function(obj) { return this.createNode(obj, "extPoint"); };
  instance.createExtNode = function(obj) { return this.createNode(obj, "ext"); };
  
  instance.clearDetail = function() {
    var pane = this.getDescendantOfName("paneDetail");
    pane.removeChildren();
  };

  instance.loadPlugInDetail = function(plugInId) {
    
    var plugin = this.getEngine().getPlugIn(plugInId);
    if(!plugin) { return false; }

    var pluginXML = new jsx3.xml.Document();
    var pluginNode = pluginXML.createDocumentElement("plugin");
    pluginNode.setAttribute("id", plugin.getId());
    pluginNode.setAttribute("class", plugin.getClass().toString());
    pluginNode.setAttribute("image", "images/plugin.png");
    pluginNode.setAttribute("load", plugin.isLoaded() ? "loaded" : "");
    pluginNode.setAttribute("name", plugin.getName());

    plugin.getExtPoints().each(function(extPoint) {
      var node = pluginNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "extension-point");
      node.setAttribute("id", extPoint.getId());
      pluginNode.appendChild(node);
    });

    plugin.getExts().each(function(ext) {
      var node = pluginNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "extension");
      node.setAttribute("id", ext.getId());
      node.setAttribute("point", ext.getPointId());
      pluginNode.appendChild(node);
    });

    plugin.getResources().each(function(ext) {
      var node = pluginNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "resource");
      node.setAttribute("id", ext.getLocalId());
      node.setAttribute("type", ext.getType());
      node.setAttribute("loadtype", ext.getLoadType());
      node.setAttribute("path", ext.getPath() || "(null)");
      node.setAttribute("load", ext.isLoaded() ? "loaded" : "");
      pluginNode.appendChild(node);
    });

    plugin.getRequires().each(function(req) {
      var node = pluginNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "require");
      node.setAttribute("id", req);
      node.setAttribute("load", plugin.getEngine().getPlugIn(req).isLoaded() ? "loaded" : "" );
      pluginNode.appendChild(node);
    });

    var objContent = this.getDescendantOfName("content");
    objContent.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);

    objContent.setXSLId(this.getPlugIn().getId() + ".xslPlugin");
    objContent.resetXmlCacheData();
    objContent.setXSLParam("jsxpluginpath", this.getPlugIn().resolveURI("\\"));
    objContent.setXMLString(pluginXML.toString());
    objContent.repaint();
    return true;
  };

  instance.loadExtPointDetail = function(extPointId) {
    var extPoint = this.getEngine().getExtPoint(extPointId);
    if(!extPoint) { return false; }

    var extPointXML = new jsx3.xml.Document();
    var extPointNode = extPointXML.createDocumentElement("extension-point");
    extPointNode.setAttribute("id", extPoint.getId());
    extPointNode.setAttribute("plugin", extPoint.getPlugIn().getId());

    extPoint.getExts().each(function(ext) {
      var node = extPointNode.createNode(jsx3.xml.Entity.TYPEELEMENT, "extension");
      node.setAttribute("id", ext.getId());
      node.setAttribute("point", ext.getPointId());
      node.setAttribute("plugin", ext.getPlugIn().getId());
      extPointNode.appendChild(node);
    });

    var objContent = this.getDescendantOfName("content");
    objContent.setDisplay(jsx3.gui.Block.DISPLAYBLOCK);

    objContent.setXSLId(this.getPlugIn().getId() + ".xslExtPoint");
    objContent.resetXmlCacheData();
    objContent.setXSLParam("jsxpluginpath", this.getPlugIn().resolveURI("\\"));
    objContent.setXMLString(extPointXML.toString());
    objContent.repaint();
    return true;
  };

  instance.initPlugInList = function() {

    var monitor = this;

    folders.each(function(folder) {
      folder.plugins = jsx3.$A([]);
    });

    var engine = this.getEngine();
    var plugins = engine.getPlugIns();
    var cdf = jsx3.xml.CDF.Document.newDocument();
    this.cdf = cdf;
    cdf.insertRecord({jsxid:"@folders", jsxtext:"Root"});

    //cdf.insertRecord({jsxid:"rootNode", jsxtext:"PlugIns", jsxopen:1});
    plugins.each(jsx3.$F(function(plugin) {
      if(!this._bShowClassPlugIn && plugin.instanceOf("jsx3.amp.ClassPlugIn")) { return; }
      if(plugin.getId().indexOf("jsx3")>-1) {
        folders[0].plugins.push(plugin);
      } else if(plugin.getId().indexOf("tibco.uxcore")>-1) {
        folders[1].plugins.push(plugin);
      } else if(plugin.getId() == "com.google.gears" || plugin.getId() == "net.sf.editarea") {
        folders[0].plugins.push(plugin);
      } else {
        folders[2].plugins.push(plugin);
      }
    }).bind(this));

    folders.each(function(folder) {
      if(folder.plugins.length>0) {

        monitor.createFolderNode(folder);
        
        folder.plugins.each(function(plugin) {
          plugin.folderId = folder.id;
          monitor.createPlugInNode(plugin);
          if(monitor._bShowExtensionPoint) {
            plugin.getExtPoints().each(function(xp) {
              monitor.createExtPointNode(xp);
            });
          }
          if(monitor._bShowExtension) {
            plugin.getExts().each(function(xp) {
              monitor.createExtNode(xp);
            });
          }
        });
      }
    });

    this._tree.setXMLString(cdf.toString());
    this._tree.resetCacheData();
    this._tree.repaint();
  };

  instance.updateNavButtons = function() {
    this.getDescendantOfName("btnGoBack").setEnabled(this.hasBack(), true);
    this.getDescendantOfName("btnGoForward").setEnabled(this.hasForward(), true);
  };

  instance.hasBack = function() {
    return this._historyindex > 0;
  };

  instance.hasForward = function() {
    return this._history.length > this._historyindex + 1;
  };
  
  instance.goBack = function() {
    if (this._historyindex > 0) {
      var record = this._history[--this._historyindex];
      this.clickLinkHandler(record[0], record[1], false);
      this.updateNavButtons();
    }
  };

  instance.goForward = function() {
    if (this._history.length > this._historyindex + 1) {
      var record = this._history[++this._historyindex];
      this.clickLinkHandler(record[0], record[1], false);      
      this.updateNavButtons();
    }
  };

  instance.visit = function(jsxid, jsxtype) {
    var record = [jsxid, jsxtype];
    this._history.splice(++this._historyindex, this._history.length);
    this._history[this._historyindex] = record;
    this.updateNavButtons();
  };

});