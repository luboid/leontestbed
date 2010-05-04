jsx3.require("jsx3.lang.Exception");

if(!tibco) {
/**
 * The top-level package.
 */
jsx3.lang.Package.definePackage("tibco", function(tibco) {
});
}

if(!tibco.uxcore) {
/**
 * The root package for all ActiveMatrix Admin UI classes.
 */
jsx3.lang.Package.definePackage("tibco.uxcore", function(admin) {
});
}

/**
 * A special exception type thrown when a request is made to load an invalid resource type.
 */
jsx3.Class.defineClass("tibco.uxcore.exception.UnsupportedResourceTypeException", jsx3.lang.Exception, null, function(ex, ex_prototype) {

  /**
   * The instance initializer.
   * @param strType {String} the resource type whose load was requested
   */
  ex_prototype.init = function(strType) {
      var message = "Invalid resource type: " + strType + ".";
      if(strType == "service") {
          message += " Please use the tibco.uxcore.System.loadService() method to load Services.";
      }
      this.jsxsuper(message);
  };
});
