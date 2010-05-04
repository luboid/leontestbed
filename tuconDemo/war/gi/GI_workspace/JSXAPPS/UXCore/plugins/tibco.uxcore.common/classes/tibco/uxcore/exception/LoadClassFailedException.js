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
 * A special exception type thrown when a class has failed to load.
 */
jsx3.Class.defineClass("tibco.uxcore.exception.LoadClassFailedException", jsx3.lang.Exception, null, function(ex, ex_prototype) {

  /**
   * The instance initializer.
   * @param message {String} the message for this exception
   * @param objCause {jsx3.lang.Exception} the exception that caused this error (optional)
   */
  ex_prototype.init = function(message, objCause) {
      this.jsxsuper(message, objCause);
  };

});
