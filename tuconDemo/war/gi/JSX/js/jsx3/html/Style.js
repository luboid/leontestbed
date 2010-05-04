/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.Class.defineClass("jsx3.html.Style",null,null,function(o,h){var
ub={a:"alpha(opacity=",b:")",c:"progid:DXImageTransform.Microsoft.AlphaImageLoader(src='",d:"', sizingMethod='scale')",e:"url("};h.init=function(){this.jsxsuper();};if(jsx3.CLASS_LOADER.IE){o.getCSSOpacity=function(j){return ub.a+(isNaN(j)?j:j*100)+ub.b;};o.getCSSPNG=function(d){return ub.c+d+ub.d;};}else{o.getCSSOpacity=function(i){return i;};o.getCSSPNG=function(m){return ub.e+m+ub.b;};}});
