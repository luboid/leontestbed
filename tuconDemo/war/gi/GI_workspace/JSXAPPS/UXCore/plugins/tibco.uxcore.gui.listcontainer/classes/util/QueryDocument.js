/**
* Search Utility Class
*/

jsx3.lang.Class.defineClass("tibco.uxcore.util.QueryDocument", null, null,
    function(DOCUMENT, document) {

        DOCUMENT.TYPE_FILTER = "filter";
        DOCUMENT.TYPE_SIMPLESEARCH = "simpleSearch";
        DOCUMENT.TYPE_ADVANCEDSEARCH = "advancedSearch";
        DOCUMENT.OPERATOR_AND = "and";
        DOCUMENT.OPERATOR_OR  = "or";

        DOCUMENT.COND_MATCH = "match";
        DOCUMENT.COND_RANGE = "range";
        
        DOCUMENT.newDocument = function(id, type) {
            return new tibco.uxcore.util.QueryXML(id, type);
        };

        DOCUMENT.wrapDocument = function(xml) {
            var queryDoc = new tibco.uxcore.util.QueryXML(null, null, xml);
            return queryDoc;
        };

        var $Condition = {
            getType : function() {
                return this.getNodeName();
            },

            getOperator : function() {
                return this.getOperatorNode().getNodeName();
            },

            getAttributesNode : function() {
                return this.selectSingleNode("attributes");
            },

            getOperatorNode : function() {
                return this.selectSingleNode("attributes/*");
            },

            getAttributes : function() {
                var attrs = jsx3.$A(this.selectNodes("attributes/*/*").toArray()).map(
                    function(entity) { return entity.getValue(); }
                );
                return attrs.join(",");
            },

            getQueryValue : function() {
                if(this.getType() == DOCUMENT.COND_MATCH) {
                    return this.getAttribute("value");
                }
                if(this.getType() == DOCUMENT.COND_RANGE) {
                    return this.selectSingleNode("//lower").getValue();
                }
            },

            getQueryValue1 : function() {
                return this.getQueryValue();
            },

            getQueryValue2 : function() {
                if(this.getType() == DOCUMENT.COND_MATCH) {
                    return null;
                }
                if(this.getType() == DOCUMENT.COND_RANGE) {
                    return this.selectSingleNode("//upper").getValue();
                }
            }

        }

        document.init = function(id, type, xml) {
            if(!xml) {
                this._document = new jsx3.xml.Document()
                var rootNode = this._document.createDocumentElement("search");
                if(type) rootNode.setAttribute("type","filter");
                if(id) rootNode.setAttribute("id", id);
                var rootCondNode = rootNode.createNode(jsx3.xml.Entity.TYPEELEMENT,"or");
                rootNode.appendChild(rootCondNode);
            } else {
                this._document = xml;
            }
            return this;
        };

        document.setType = function(type) {
            var root = this._document.getRootNode();
            root.setAttribute("type", type);
            return this;
        };

        document.getType = function(type) {
            return this._document.getRootNode().getAttribute("type");
        };

        document.setSearchId = function(id) {
            this._document.getRootNode().setAttribute("id", id);
            return this;
        };

        document.getSearchId = function() {
            return this._document.getRootNode().getAttribute("id");
        };

        document.getXML = function() {
            return this._document;
        };

        document.createMatchCondition = function (attributes, v1) {
            this.createCondition ( DOCUMENT.COND_MATCH, DOCUMENT.OPERATOR_OR, attributes, v1);
        };

        document.createRangeCondition = function (attributes, v1, v2) {
            this.createCondition ( DOCUMENT.COND_RANGE, DOCUMENT.OPERATOR_OR, attributes, v1, v2);
        };

        document.createCondition = function( condType, condOperator, attributes, queryValue1, queryValue2 ) {
            
            var TYPEELEMENT = jsx3.xml.Entity.TYPEELEMENT;
            var createNode = function(parentNode, tag, value) {
                var node = parentNode.createNode(TYPEELEMENT, tag);
                parentNode.appendChild(node);
                if(value) node.setValue(value);
                return node;
            }

            var orNode = this.getXML().getRootNode().getFirstChild();

            var condNode = createNode(orNode, condType);
            if( condType == DOCUMENT.COND_MATCH) {
                condNode.setAttribute("value", queryValue1);
            }
            if( condType == DOCUMENT.COND_RANGE) {
                var lowerNode = createNode(condNode,"lower", queryValue1);
                var upperNode = createNode(condNode,"upper", queryValue2);
            }
                        
            var attributesNode =  createNode(condNode,"attributes");
            var orAndNode = createNode(attributesNode,condOperator);
            
            if (!(attributes instanceof Array)) {
                attributes = attributes != null  ? attributes.split(/\s*,\s*/g) : [];
            }

            jsx3.$A(attributes).each(function(value) {
                createNode(orAndNode,"attribute", value);
            });
        };

        document.getRootNode = function() {
            return this._document.getRootNode();
        };

        document.getOperatorNode = function() {
            return this.getRootNode().getFirstChild();
        };

        document.getConditions = function() {
            return jsx3.$A(this.getOperatorNode().getChildNodes().toArray()).map(function(obj) {
                return jsx3.$O(obj).extend($Condition);
            });
        };

        document.getFirstCondition = function() {
            return jsx3.$O(this.getOperatorNode().getFirstChild()).extend($Condition);
        };
        
        
    }
);

