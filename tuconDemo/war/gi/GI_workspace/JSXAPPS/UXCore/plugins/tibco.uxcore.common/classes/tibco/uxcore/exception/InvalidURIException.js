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
 * A special exception type thrown when a URI argument to a function is not valid.
 */
jsx3.Class.defineClass("tibco.uxcore.exception.InvalidURIException", jsx3.lang.Exception, null, function(ex, ex_prototype) {

  /**
   * The instance initializer.
   * @param strMsg {String} the message for this exception
   */
  ex_prototype.init = function(strMsg) {
      this.jsxsuper(message);
  };
});
