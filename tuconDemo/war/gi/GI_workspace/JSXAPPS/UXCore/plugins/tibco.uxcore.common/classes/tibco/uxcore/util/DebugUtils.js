/**
* The package containing general utility classes for MatrixAdmin
*/
jsx3.lang.Package.definePackage("tibco.uxcore.util", function(util) {
});

/**
* The tibco.uxcore.util.DebugUtils class provides utility functions helpful in
* debugging and performance tuning.
*/
jsx3.lang.Class.defineClass("tibco.uxcore.util.DebugUtils", null, null,
    function(utilClass) {

        /**
        * Utility function to print the hierarchy of objects from the root block down to the specified component.
        * Useful for determining the parent hierarchy of the object. <br /><br />
        * The log for each node will have the following format:<br /><br />
        * <b>ClassName:Name:jsxid</b>
        *
        * @param obj {jsx3.gui.Painted} the object whose parent hierarchy structure you wish to print
        */
        utilClass.logHierarchy = function(obj) {
             var parents = [];
            var parent = obj.getParent();
            var i = 0;
            while(parent) {
                parents[i] = parent;
                parent = parent.getParent();
                i++;
            }
            i--;
            var buffer = "";
            for(i; i >= 0; i--) {
                jsx3.log(buffer + parents[i].getClass().getName() + ":" + parents[i].getName() + ":" + parents[i].getId());
                buffer += "  ";
            }
            jsx3.log(buffer + obj.getClass().getName() + ":" + obj.getName() + ":" + obj.getId());
        };

        /**
        * Utility function to print the hierarchy of objects using the specified object as the root.<br /><br />
        * Useful for determining the child hierarchy of the object. <br /><br />
        * The log for each node will have the following format:<br /><br />
        * <b>ClassName:Name:jsxid</b>
        *
        * @param obj {jsx3.gui.Painted} the object whose parent hierarchy structure you wish to print
        * @param indent {String} a string to be prefixed to each entry at this level.  Typically, this will be <code>null</code>
        *               in a user-call to this function, and only the recursive calls will set this value to indent
        *               each level of the hierarchy, but an identifier could be used by the user to prefix each line if desired.
        */
        utilClass.printTree = function(obj, indent) {
            if(!indent) {
                indent = "";
            }
            jsx3.log(indent + obj.getClass().getName() + ":" + obj.getName() + ":" + obj.getId());
            var children = obj.getChildren();
            for(var i = 0; i<children.length; i++) {
                this.printTree(children[i],indent + "  ");
            }
        };
    }
);
