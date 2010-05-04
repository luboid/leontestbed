jsx3.require("jsx3.util.DateFormat");

/**
 * MatrixHelper
 * @private
 */
jsx3.lang.Class.defineClass("tibco.uxcore.util.MatrixHelper", null, null,
        function(matrixHelper) {
            matrixHelper.formatter = new jsx3.util.DateFormat("MM/dd/yyyy hh:mm:ss aa", tibco.uxcore.System.getServer().getLocale())


            // returns true if CDF string s1 has the same data as CDF string s2;
            // ignore "jsxselected" like UI specific attribute.
            matrixHelper.isDataEqual = function(s1, s2) {
                return s1.replace(/ jsxselected=\"(1|0)\"/, "") == s2.replace(/ jsxselected=\"(1|0)\"/, "")
            }

            matrixHelper.isCDFDataEqual = function(entity1, entity2, arrIgnoreAtts, bCheckOrder, bEmptyEqualsNull) {
                if(typeof(bEmptyEqualsNull) == "undefined") {
                    bEmptyEqualsNull = true
                }
                var entity1Empty = false;
                var entity2Empty = false;
                if(!entity1 || (entity1.getChildNodes().size() == 0)) {
                    entity1Empty = true;
                }
                if(!entity2 || (entity2.getChildNodes().size() == 0)) {
                    entity2Empty = true;
                }
                if(entity1Empty != entity2Empty) {
                    return false;
                }
                if(entity1Empty && entity2Empty) {
                    return true;
                }
                return this.isRecordEqual(entity1, entity2, arrIgnoreAtts, true, bCheckOrder, bEmptyEqualsNull)
            }

            matrixHelper.areChildrenEqual = function(entity1, entity2, arrIgnoreAtts, bCheckOrder, bEmptyEqualsNull) {
                if(typeof(bEmptyEqualsNull) == "undefined") {
                    bEmptyEqualsNull = true
                }
                var children1 = entity1.getChildNodes();
                var children2 = entity2.getChildNodes();
                if(children1.size() != children2.size()) {
                    return false;
                }
                var child2 = null;
                for(var i=0; i<children1.size(); i++) {
                    var child1 = children1.get(i);
                    var id = child1.getAttribute("jsxid");
                    if(id) {
                        if(bCheckOrder) {
                            child2 = ((i==0) ? children2.get(0) : child2.getNextSibling());
                            if(child2.getAttribute("jsxid") != id) {
                                return false;
                            }
                        }
                        else {
                            child2 = entity2.selectSingleNode("record[@jsxid='" + id + "']");
                        }
                        if(!child2) {
                            return false;
                        }
                        var val = this.isRecordEqual(child1,child2, arrIgnoreAtts, true, bCheckOrder, bEmptyEqualsNull);
                        if(!val) {
                            return false;
                        }
                    }
                }
                child2 = null;
                return true;
            }

            matrixHelper.areAttributesEqual = function(entity1, entity2, arrIgnoreAtts, bEmptyEqualsNull) {
//                jsx3.log("Checking atts");
//                jsx3.log("entity1: " + entity1);
//                jsx3.log("entity2: " + entity2);
                if(typeof(bEmptyEqualsNull) == "undefined") {
                    bEmptyEqualsNull = true
                }
                var checkedAtts = new jsx3.util.List(0);
                var ignoredAtts = new jsx3.util.List(arrIgnoreAtts);
                var attNames1 = entity1.getAttributeNames();
                for(var i=0; i<attNames1.length; i++) {
                    var attName = attNames1[i];
//                    jsx3.log("att: " + attName);
                    if(!ignoredAtts.contains(attName)) {
//                        jsx3.log("Checking");
                        var val1 = entity1.getAttribute(attName);
                        var val2 = entity2.getAttribute(attName);
                        if(!this.valuesEqual(val1, val2, bEmptyEqualsNull)) {
//                            jsx3.log(val1 + " != " + val2);
                            return false;
                        }
//                        jsx3.log(val1 + " == " + val2);
                    }
//                    else {
//                        jsx3.log("Is in the ignored list");
//                    }
                    checkedAtts.add(attName);
                }
                var attNames2 = entity2.getAttributeNames();
                for(var i=0; i<attNames2.length; i++) {
                    var attName = attNames2[i];
//                    jsx3.log("att2: " + attName);
                    if(!(checkedAtts.contains(attName) || ignoredAtts.contains(attName))) {
//                        jsx3.log("Checking")
                        var val1 = entity1.getAttribute(attName);
                        var val2 = entity2.getAttribute(attName);
                        if(!this.valuesEqual(val1, val2, bEmptyEqualsNull)) {
//                            jsx3.log(val1 + " != " + val2);
                            return false;
                        }
//                        jsx3.log(val1 + " == " + val2);
                    }
//                    else {
//                        jsx3.log("is in the ignored or checked list");
//                    }
                }
//                jsx3.log("all atts equal");
                return true;
            }

            matrixHelper.valuesEqual = function(a, b, bEmptyEqualsNull) {
                var aNull = (a == null) || (typeof a == "undefined");
                var bNull = (b == null) || (typeof b == "undefined");
                if(bEmptyEqualsNull) {
                    if(a == "") {
                        aNull = true;
                    }
                    if(b == "") {
                        bNull = true;
                    }
                }
                if(aNull != bNull) {
                    return false;
                }
                else if(aNull && bNull) {
                    return true;
                }
                return (("" + a) == ("" + b));
            }

            matrixHelper.isRecordEqual = function(entity1, entity2, arrIgnoreAtts, bCheckChildren, bCheckOrder, bEmptyEqualsNull) {
                if(typeof(bEmptyEqualsNull) == "undefined") {
                    bEmptyEqualsNull = true
                }
                if(!entity1 || !entity2) {
                    return false;
                }
                if(bCheckChildren) {
                    var val = this.areChildrenEqual(entity1, entity2, arrIgnoreAtts, bCheckOrder, bEmptyEqualsNull);
                    if(!val) {
                        return false;
                    }
                }
                return this.areAttributesEqual(entity1, entity2, arrIgnoreAtts, bEmptyEqualsNull)
            }

            matrixHelper.formatDate = function(myDateLong) {
                var formattedDate;
                try {
                    formattedDate = matrixHelper.formatter.format(new Date(Number(myDateLong)));
                }catch(e) {

                    formattedDate = matrixHelper.formatter.format(new Date());    //if there is a problem, sending
                                                                                //current time
                }
                return formattedDate;
            }
        }
        )
