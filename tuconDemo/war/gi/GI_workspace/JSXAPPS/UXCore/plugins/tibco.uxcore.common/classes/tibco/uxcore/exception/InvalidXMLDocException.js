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
 * A special exception type thrown when trying to load an invalid xml document.
 */
jsx3.Class.defineClass("tibco.uxcore.exception.InvalidXMLDocException", jsx3.lang.Exception, null, function(ex, ex_prototype) {

  /**
   * The instance initializer.
   * @param strMsg {String}  the message for this exception
   * @param objCause {jsx3.lang.Exception} the exception that caused this exception (optional)
   */
  ex_prototype.init = function(strMsg, objCause) {
      var message = "InvalidXMLDocException";
      if(strMsg) {
          message += ": " + strMsg;
      }
      this.jsxsuper(message, objCause);
  };
});
