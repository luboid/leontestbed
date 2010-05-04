/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */
jsx3.require("jsx3.xml.Cacheable","jsx3.gui.Form","jsx3.gui.Block","jsx3.gui.Matrix.Column","jsx3.util.MessageFormat");jsx3.Class.defineClass("jsx3.gui.Matrix",jsx3.gui.Block,[jsx3.gui.Form,jsx3.xml.Cacheable,jsx3.xml.CDF],function(m,q){var
ub={A:"Race condition with view...",Aa:'src="',Ab:"jsxbeforeedit",Ac:"E",Ad:'class="jsx30matrixcolumn_cell_value"',B:"px",Ba:'"',Bb:"undefined",Bc:"colgroup",Bd:"test",C:"table",Ca:"FS",Cb:"YD",Cc:"c1",Cd:"$jsx_cell_value_template_id='",D:"jsxcolspan",Da:"xD",Db:"_jsxyP",Dc:"_C",Dd:"_value'",E:"jsxindent",Ea:' class="jsx30matrix_scrollh"',Eb:"jsxbeforeappend",Ec:"visibility:hidden;",Ed:"//xsl:call-template",F:"0+",Fa:"z-index:10;overflow:auto;",Fb:"jsxroot",Fc:'<div class="jsx30matrix_resize_anchor" jsxindex="',Fd:"name",G:"0",Ga:"overflow:hidden;background-color:#e8e8f5;z-index:11;",Gb:"jsxafterappend",Gc:'" style="left:',Gd:"_value",H:"object",Ha:"_ebMouseOutDropIcon",Hb:"true",Hc:"px;",Hd:"ui_controller",I:"",Ia:"&#160;",Ib:"_jsxOM",Ic:"width:",Id:"//xsl:template[@name='ui_controller']//xsl:call-template",J:/\d*%/,Ja:'<div class="jsx30matrix_scroll_info"><span class="jsx30matrix_scroll_info">&#160;</span></div>',Jb:"jsxafteredit",Jc:"px;background-image:url(",Jd:"Error with column ",K:"*",Ka:'<div class="jsx30matrix_resize_bar">&#160;</div>',Kb:"jsxaftercommit",Kc:");height:",Kd:": ",L:"Matrix Width Recalc, Pass 1 (",La:'<div class="jsx30matrix_drop_icon" ',Lb:"jsxtype",Lc:'px;" ',Ld:/width:\d*px;/,M:"): ",Ma:">&#160;</div>",Mb:"plusminus",Mc:"jsxindex",Md:"{$jsx_first_row_width_style}",N:"Matrix Width Recalc, Pass 2a (",Na:"F7",Nb:"paged",Nc:"jsxbeforeresize",Nd:"default",O:"Matrix Width Recalc, Pass 2b (",Oa:'<div id="',Ob:"record",Oc:"Bv",Od:/\{0\}/g,P:"Matrix Width Recalc, Pass 3 (",Pa:'_masks" class="jsx30matrix_masks">',Pb:"./record",Pc:"//record",Pd:"@",Q:"Matrix Width Recalc, Pass 4 (",Qa:"</div>",Qb:"jsxopen",Qc:"jsxafterresize",Qd:/<\/xsl:template>\s*$/,R:"100%",Ra:"paint.masks",Rb:"Fetch the content belonging to: ",Rc:"-6px",Rd:"</xsl:template>",S:"box",Sa:"_masks",Sb:"position:relative;",Sc:"Panel pool max (",Sd:"xsl",T:"div",Ta:"repaint.data",Tb:"jsxcontextindex",Tc:") exceeded by: ",Td:"jsx_use_categories",U:"inline",Ua:'_head" class="jsx30matrix_head"',Ub:"jsxtoggle",Uc:"reaping panel: ",Ud:"jsxabspath",V:"tr",Va:'cellspacing="0" cellpadding="0" class="jsx30matrix_head_table"',Vb:"pagedfocusdelay",Vc:"structure",Vd:"jsxhomepath",W:"If the header border and body border do not share the same pixel width, the columns in the matrix may not align as expected (",Wa:"_head",Wb:"<div id='JSX' class='jsx30matrix_dragicon' style='",Wc:"jsx_",Wd:"<tr",X:")\nHeader Border (",Xa:'<table id="',Xb:"'>",Xc:"tbody",Xd:"loading",Y:") != Body Border (",Ya:'_ghost" cellspacing="0" cellpadding="0" class="jsx30matrix_ghost" style="width:',Yb:"<table class='",Yc:"_jsx_",Yd:"kH",Z:")",Za:'px;"><tr>',Zb:"class",Zc:"-",Zd:"_jsxBF",_:"img",_a:"</tr></table>",_b:"' style='",_c:"jsxscroll",_d:"sort",a:"jsx:///images/matrix/select.gif",aa:"mouseover",ab:"BeforeEnd",ac:"style",ad:"horizontal",ae:/<ids>([\s\S]*)\s*,\s*<\/ids>/,b:"jsx:///images/matrix/insert_before.gif",ba:"mouseout",bb:"Cw",bc:"<tr class='",bd:"jsx3.gui.Matrix.seek",be:"[",c:"jsx:///images/matrix/append.gif",ca:"dblclick",cb:"jsxmenu",cc:"</tr></table></div>",cd:"Matrix_timeout",ce:"]",d:"font-weight:bold",da:"keydown",db:"jsxbeforesort",dc:/input|textarea/i,dd:"vertical",de:"count",e:"jsx:///images/matrix/minus.gif",ea:"mousedown",eb:"jsxaftersort",ec:"jsxbeforedrop",ed:"O8",ee:/(\d+)/,f:"jsx:///images/matrix/plus.gif",fa:"click",fb:"_jsxDY",fc:"7px",fd:"fetching panel: ",fe:"Getting Record Count: ",g:"jsx:///images/matrix/file.gif",ga:"mouseup",gb:"text",gc:"dropverb",gd:"contextnodes",ge:"The paging model was overridden (disabled) because the rendering mode is hierarchical and stepped paging was not explicitly set.",h:"ascending",ha:'id="',hb:"jsxafterreorder",hc:"insertbefore",hd:"jsxrownumber",he:".//record",i:"descending",ia:'" class="jsx30matrix',ib:"focusdelay",ic:"12px",id:"Matrix2pass",ie:"JSXDRAGID",j:"jsx:///images/matrix/sort_desc.gif",ja:" ",jb:"_jsxX6",jc:"append",jd:"format.sync",je:"id",k:"jsx:///images/matrix/sort_asc.gif",ka:'" ',kb:/(-\S)/gi,kc:"rowcontext",kd:"format.async",ke:"\\b(",l:'<xsl:call-template xmlns:xsl="http://www.w3.org/1999/XSL/Transform" name="{0}">\n  <xsl:with-param name="jsx_is_first_panel_row" select="$jsx_is_first_panel_row"/>\n  <xsl:with-param name="jsx_row_number" select="$jsx_row_number"/>\n  <xsl:with-param name="jsx_rowbg" select="$jsx_rowbg"/>\n  <xsl:with-param name="jsx_cdfkey" select="$jsx_cdfkey"/>\n  <xsl:with-param name="jsx_descendant_index" select="$jsx_descendant_index"/>\n</xsl:call-template>',la:"_onMouseUp",lb:";",lc:"jsxspy",ld:"position:absolute;left:0px;top:",le:")\\b",m:"<xsl:when xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" test=\"$jsx_cell_value_template_id=''{0}''\">\n  <xsl:for-each select=\"//*[@jsxid=$jsx_record_context]\">\n    <xsl:call-template name=\"{0}\">\n    </xsl:call-template>\n  </xsl:for-each>\n</xsl:when>\n",ma:"selectstart",mb:":",mc:"_jsxMK",md:"autorow",me:"BeforeBegin",n:"<xsl:template xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" name=\"{0}\">\n  <xsl:param name=\"jsx_is_first_panel_row\"/>\n  <xsl:param name=\"jsx_row_number\"/>\n  <xsl:param name=\"jsx_rowbg\"/>\n  <xsl:param name=\"jsx_cdfkey\"/>\n  <xsl:param name=\"jsx_descendant_index\"/>\n  <xsl:param name=\"jsx_selection_bg\"><xsl:choose>\n     <xsl:when test=\"@jsxselected=1\">background-image:url(<xsl:value-of select=\"$jsx_selection_bg_url\"/>);</xsl:when>\n   </xsl:choose></xsl:param>\n  <xsl:param name=\"jsx_cell_width\" select=\"''{2}''\"/>\n  <xsl:param name=\"jsx_true_width\">\n    <xsl:choose><xsl:when test=\"$jsx_use_categories!=''0'' and not(@jsxcategory=''0'') and (@jsxcategory or record)\">{3}</xsl:when><xsl:otherwise><xsl:value-of select=\"$jsx_cell_width\"/></xsl:otherwise></xsl:choose>\n  </xsl:param>\n  <xsl:param name=\"jsx_first_row_width_style\">\n    <xsl:choose><xsl:when test=\"$jsx_is_first_panel_row\">width:<xsl:value-of select=\"$jsx_true_width\"/>px;</xsl:when></xsl:choose>\n  </xsl:param>\n  <xsl:param name=\"jsx_colspan\">\n    <xsl:choose><xsl:when test=\"$jsx_use_categories!=''0'' and not(@jsxcategory=''0'') and (@jsxcategory or record)\"><xsl:value-of select=\"$jsx_column_count\"/></xsl:when><xsl:otherwise>1</xsl:otherwise></xsl:choose>\n  </xsl:param>\n  {1}\n</xsl:template>",na:"HZ",nb:"jsxunselectable",nc:"jsx30spyglassbuffer",nd:"panel",ne:"td",o:'<xsl:call-template name="{0}">\n  <xsl:with-param name="jsx_cell_width" select="$jsx_true_width"/>\n  <xsl:with-param name="jsx_row_number" select="$jsx_row_number"/>\n  <xsl:with-param name="jsx_descendant_index" select="$jsx_descendant_index"/>\n</xsl:call-template>',oa:'_body" class="jsx30matrix_body" ',ob:"1",oc:"jsxcanceldrop",od:"Fetching records: ",oe:"*[",p:"Viewing rows {0} to {1} of {2}",pa:"mousewheel",pb:"jsxexecute",pc:"body",pd:" - to - ",pe:/^(on(?:mousedown|click|focus|blur|mouseup|mouseover|mouseout|dblclick|scroll|keydown|keypress))/i,q:"jsxpaintpage",qa:"lk",qb:"jsxid",qc:"hierachical",qd:"//xsl:template[@name='row_template']//tr",qe:/(?:border:|border-top|border-left|border-bottom|border-right|padding|height|width|background-color)[^;]*;/gi,r:"deep",ra:"vF",rb:"_jsxhU",rc:"jsx30matrix_drop_icon",rd:"//xsl:template[@name='row_template']//tr/xsl:choose/xsl:when",re:"strId",s:"shallow",sa:"aV",sb:"_jsxUY",sc:"JSX_GENERIC",sd:"//xsl:choose/xsl:when/xsl:choose",t:"hierarchical",ta:"gN",tb:"//record[@",tc:"jsxadopt",td:"focus",u:"jsx:///xsl/jsxmatrix.xsl",ua:"mousemove",ub:"jsxselected",uc:"jsxctrldrop",ud:"tu",v:"<?xml version=\"1.0\" encoding=\"UTF-8\"?><xsl:stylesheet xmlns:xsl=\"http://www.w3.org/1999/XSL/Transform\" version=\"1.0\"><xsl:output method=\"xml\" omit-xml-declaration=\"yes\"/><xsl:param name=\"jsx_id\"/><xsl:param name=\"jsx_1\"/><xsl:param name=\"jsx_2\"/><xsl:param name=\"jsx_3\"/><xsl:param name=\"jsx_4\"/><xsl:param name=\"jsx_5\"/><xsl:param name=\"jsx_6\"/><xsl:param name=\"jsx_7\"/><xsl:param name=\"jsx_8\"/><xsl:param name=\"jsx_9\"/><xsl:param name=\"jsx_10\"/><xsl:param name=\"jsx_use_categories\">0</xsl:param><xsl:param name=\"jsx_column_count\">1</xsl:param><xsl:param name=\"jsx_drag_type\">JSX_GENERIC</xsl:param><xsl:param name=\"jsx_panel_index\"/><xsl:param name=\"jsx_column_widths\"/><xsl:param name=\"jsx_panel_css\"/><xsl:param name=\"jsx_icon\"/><xsl:param name=\"jsx_icon_minus\"/><xsl:param name=\"jsx_icon_plus\"/><xsl:param name=\"jsx_transparent_image\"/><xsl:param name=\"jsx_paging_model\">0</xsl:param><xsl:param name=\"jsx_mode\">panel</xsl:param><xsl:param name=\"jsx_cell_value_template_id\">_jsx_{serverns}_{serial}_value</xsl:param><xsl:param name=\"jsx_record_context\">cdfkey</xsl:param><xsl:param name=\"jsx_min_exclusive\">-1</xsl:param><xsl:param name=\"jsx_max_exclusive\">1000000</xsl:param><xsl:param name=\"jsx_column_index\">-1</xsl:param><xsl:param name=\"jsx_sort_path\">jsxid</xsl:param><xsl:param name=\"jsx_sort_direction\">ascending</xsl:param><xsl:param name=\"jsx_sort_type\">text</xsl:param><xsl:param name=\"jsx_selection_bg_url\">JSX/images/list/select.gif</xsl:param><xsl:param name=\"jsx_selection_model\">1</xsl:param><xsl:param name=\"jsx_rowbg1\"/><xsl:param name=\"jsx_rowbg2\"/><xsl:param name=\"jsx_treehead_bgcolor\"/><xsl:param name=\"jsx_treehead_fontweight\"/><xsl:param name=\"jsx_autorow_style\">background-color:#fbf89f;</xsl:param><xsl:param name=\"jsx_rendering_model\">hierarchical</xsl:param><xsl:param name=\"jsx_rendering_context\">jsxroot</xsl:param><xsl:param name=\"jsx_rendering_context_child\"/><xsl:param name=\"jsx_indent\">16</xsl:param><xsl:param name=\"jsx_context_index\">1</xsl:param><xsl:param name=\"jsx_no_tip\">0</xsl:param><xsl:param name=\"jsx_no_empty_indent\">0</xsl:param><xsl:param name=\"jsx_img_resolve\">1</xsl:param><xsl:param name=\"jsxtitle\"/><xsl:param name=\"jsxasyncmessage\"/><xsl:param name=\"jsxpath\"/><xsl:param name=\"jsxpathapps\"/><xsl:param name=\"jsxpathprefix\"/><xsl:param name=\"jsxappprefix\"/><xsl:template match=\"/\"><JSX_FF_WELLFORMED_WRAPPER><xsl:choose><xsl:when test=\"$jsxasyncmessage and $jsxasyncmessage!=''\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30matrix_rowtable\" id=\"{$jsx_id}_asyncmsg\" style=\"{$jsx_panel_css}width:{$jsx_column_widths}px;\"><tr><td style=\"padding: 3px;\"><xsl:value-of select=\"$jsxasyncmessage\"/></td></tr></table></xsl:when><xsl:when test=\"$jsx_mode = 'cellvalue'\"><xsl:choose><xsl:when test=\"0\"/></xsl:choose></xsl:when><xsl:when test=\"$jsx_rendering_model = 'shallow'\"><xsl:choose><xsl:when test=\"$jsx_mode = 'count'\"><xsl:value-of select=\"count(//*[@jsxid=$jsx_rendering_context]/record)\"/></xsl:when><xsl:when test=\"$jsx_mode = 'autorow'\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30matrix_rowtable\" id=\"{$jsx_id}jsx_-1\" jsxautorow=\"true\" style=\"{$jsx_panel_css}width:{$jsx_column_widths}px;\"><xsl:call-template name=\"row_template\"><xsl:with-param name=\"jsx_row_number\">-1</xsl:with-param></xsl:call-template></table></xsl:when><xsl:when test=\"$jsx_mode = 'record'\"><xsl:for-each select=\"//*[@jsxid=$jsx_rendering_context]/record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/><xsl:if test=\"@jsxid = $jsx_rendering_context_child\"><xsl:apply-templates mode=\"entry\" select=\".\"><xsl:with-param name=\"jsx_row_number\" select=\"position()\"/></xsl:apply-templates></xsl:if></xsl:for-each></xsl:when><xsl:when test=\"$jsx_mode = 'sort'\"><ids><xsl:apply-templates mode=\"sort\" select=\"//*[@jsxid=$jsx_rendering_context]/record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/></xsl:apply-templates></ids></xsl:when><xsl:otherwise><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30matrix_rowtable\" id=\"{$jsx_id}jsx_{$jsx_panel_index}\" style=\"{$jsx_panel_css}width:{$jsx_column_widths}px;\"><xsl:for-each select=\"//*[@jsxid=$jsx_rendering_context]/record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/><xsl:apply-templates mode=\"entry\" select=\".\"><xsl:with-param name=\"jsx_row_number\" select=\"position()\"/></xsl:apply-templates></xsl:for-each></table></xsl:otherwise></xsl:choose></xsl:when><xsl:when test=\"$jsx_rendering_model = 'deep'\"><xsl:choose><xsl:when test=\"$jsx_mode = 'count'\"><xsl:value-of select=\"count(//*[@jsxid=$jsx_rendering_context]//record)\"/></xsl:when><xsl:when test=\"$jsx_mode = 'autorow'\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30matrix_rowtable\" id=\"{$jsx_id}jsx_-1\" jsxautorow=\"true\" style=\"{$jsx_panel_css}width:{$jsx_column_widths}px;\"><xsl:call-template name=\"row_template\"><xsl:with-param name=\"jsx_row_number\">-1</xsl:with-param></xsl:call-template></table></xsl:when><xsl:when test=\"$jsx_mode = 'record'\"><xsl:for-each select=\"//*[@jsxid=$jsx_rendering_context]//record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/><xsl:if test=\"@jsxid = $jsx_rendering_context_child\"><xsl:apply-templates mode=\"entry\" select=\".\"><xsl:with-param name=\"jsx_row_number\" select=\"position()\"/></xsl:apply-templates></xsl:if></xsl:for-each></xsl:when><xsl:when test=\"$jsx_mode = 'sort'\"><ids><xsl:apply-templates mode=\"sort\" select=\"//*[@jsxid=$jsx_rendering_context]//record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/></xsl:apply-templates></ids></xsl:when><xsl:otherwise><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30matrix_rowtable\" id=\"{$jsx_id}jsx_{$jsx_panel_index}\" style=\"{$jsx_panel_css}width:{$jsx_column_widths}px;\"><xsl:for-each select=\"//*[@jsxid=$jsx_rendering_context]//record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/><xsl:apply-templates mode=\"entry\" select=\".\"><xsl:with-param name=\"jsx_row_number\" select=\"position()\"/></xsl:apply-templates></xsl:for-each></table></xsl:otherwise></xsl:choose></xsl:when><xsl:when test=\"$jsx_rendering_model = 'hierarchical'\"><xsl:choose><xsl:when test=\"$jsx_mode = 'count'\"><xsl:value-of select=\"count(//*[@jsxid=$jsx_rendering_context]//record)\"/></xsl:when><xsl:when test=\"$jsx_mode = 'record'\"><xsl:for-each select=\"//*[@jsxid=$jsx_rendering_context]/record[@jsxid=$jsx_rendering_context_child]\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/><xsl:apply-templates mode=\"hierarchical_entry\" select=\".\"><xsl:with-param name=\"jsx_row_number\" select=\"position()\"/><xsl:with-param name=\"jsx_adjusted_width\" select=\"$jsx_column_widths\"/><xsl:with-param name=\"jsx_descendant_index\" select=\"$jsx_context_index\"/></xsl:apply-templates></xsl:for-each></xsl:when><xsl:when test=\"$jsx_mode = 'sort'\"><ids><xsl:apply-templates mode=\"hierarchical_sort\" select=\"//*[@jsxid=$jsx_rendering_context]/record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/></xsl:apply-templates></ids></xsl:when><xsl:otherwise><xsl:for-each select=\"//*[@jsxid=$jsx_rendering_context]/record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/><xsl:apply-templates mode=\"hierarchical_entry\" select=\".\"><xsl:with-param name=\"jsx_row_number\" select=\"position()\"/><xsl:with-param name=\"jsx_adjusted_width\" select=\"$jsx_column_widths\"/><xsl:with-param name=\"jsx_descendant_index\" select=\"$jsx_context_index\"/></xsl:apply-templates></xsl:for-each></xsl:otherwise></xsl:choose></xsl:when></xsl:choose></JSX_FF_WELLFORMED_WRAPPER></xsl:template><xsl:template match=\"node()\" mode=\"entry\"><xsl:param name=\"jsx_row_number\"/><xsl:choose><xsl:when test=\"$jsx_row_number = '-1' or ($jsx_row_number &gt; $jsx_min_exclusive and $jsx_row_number &lt; $jsx_max_exclusive)\"><xsl:call-template name=\"row_template\"><xsl:with-param name=\"jsx_row_number\" select=\"$jsx_row_number\"/></xsl:call-template></xsl:when></xsl:choose></xsl:template><xsl:template match=\"node()\" mode=\"sort\">\"<xsl:value-of select=\"@jsxid\"/>\",</xsl:template><xsl:template match=\"node()\" mode=\"hierarchical_sort\">\"<xsl:value-of select=\"@jsxid\"/>\",<xsl:apply-templates mode=\"hierarchical_sort\" select=\"record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/></xsl:apply-templates></xsl:template><xsl:template match=\"node()\" mode=\"hierarchical_entry\"><xsl:param name=\"jsx_row_number\"/><xsl:param name=\"jsx_adjusted_width\"/><xsl:param name=\"jsx_descendant_index\"/><div jsxtype=\"structure\" style=\"position:relative;\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30matrix_rowtable\" id=\"{$jsx_id}jsx_0\" style=\"{$jsx_panel_css}width:{$jsx_adjusted_width}px;\"><xsl:call-template name=\"row_template\"><xsl:with-param name=\"jsx_row_number\" select=\"$jsx_min_exclusive + 1\"/><xsl:with-param name=\"jsx_descendant_index\" select=\"$jsx_descendant_index\"/></xsl:call-template></table><div jsxcontextindex=\"{$jsx_descendant_index + 1}\" style=\"display:none;\"><xsl:choose><xsl:when test=\"record\"><xsl:choose><xsl:when test=\"@jsxopen='1'\"><xsl:attribute name=\"style\">position:relative;display:block;</xsl:attribute></xsl:when></xsl:choose><xsl:choose><xsl:when test=\"@jsxopen='1' or $jsx_paging_model != 4 \"><xsl:for-each select=\"record\"><xsl:sort data-type=\"{$jsx_sort_type}\" order=\"{$jsx_sort_direction}\" select=\"@*[name()=$jsx_sort_path]\"/><xsl:apply-templates mode=\"hierarchical_entry\" select=\".\"><xsl:with-param name=\"jsx_row_number\" select=\"position()\"/><xsl:with-param name=\"jsx_adjusted_width\" select=\"$jsx_adjusted_width\"/><xsl:with-param name=\"jsx_descendant_index\" select=\"$jsx_descendant_index + 1\"/></xsl:apply-templates></xsl:for-each></xsl:when><xsl:otherwise><xsl:text>&#160;</xsl:text></xsl:otherwise></xsl:choose></xsl:when><xsl:otherwise><xsl:text>&#160;</xsl:text></xsl:otherwise></xsl:choose></div></div></xsl:template><xsl:template name=\"ui_controller\"><xsl:param name=\"jsx_descendant_index\"/><xsl:param name=\"jsx_cell_width\"/><xsl:param name=\"jsx_row_number\">0</xsl:param><xsl:param name=\"jsx_style\" select=\"@jsxstyle\"/><table cellpadding=\"0\" cellspacing=\"0\" class=\"jsx30matrix_rowtable\" jsxindent=\"{($jsx_descendant_index -1) * $jsx_indent}\"><xsl:attribute name=\"style\">position:relative;float:right;width:<xsl:value-of select=\"$jsx_cell_width - (($jsx_descendant_index -1) * $jsx_indent)\"/>px;height:16px;</xsl:attribute><tr style=\"{$jsx_style}\"><xsl:if test=\"@jsxclass\"><xsl:attribute name=\"class\"><xsl:value-of select=\"@jsxclass\"/></xsl:attribute></xsl:if><td jsxtype=\"plusminus\"><xsl:attribute name=\"jsxtype\"><xsl:choose><xsl:when test=\"record and $jsx_paging_model = 4 and not(@jsxopen=1)\">paged</xsl:when><xsl:otherwise>plusminus</xsl:otherwise></xsl:choose></xsl:attribute><xsl:attribute name=\"style\">vertical-align:top;width:<xsl:choose><xsl:when test=\"$jsx_no_empty_indent='1' and not(../record/record)\">0</xsl:when><xsl:otherwise>16</xsl:otherwise></xsl:choose>px;background-image:url(<xsl:choose><xsl:when test=\"record and @jsxopen=1\"><xsl:value-of select=\"$jsx_icon_minus\"/></xsl:when><xsl:when test=\"record and $jsx_paging_model = 4\"><xsl:value-of select=\"$jsx_icon_plus\"/></xsl:when><xsl:when test=\"record\"><xsl:value-of select=\"$jsx_icon_plus\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"$jsx_transparent_image\"/></xsl:otherwise></xsl:choose>);background-repeat:no-repeat;</xsl:attribute><xsl:text>&#160;</xsl:text></td><td jsxtype=\"icon\" unselectable=\"on\"><xsl:choose><xsl:when test=\"@jsximg = ''\"><xsl:attribute name=\"style\">width:1px;</xsl:attribute><span style=\"display:none;width:1px;height:1px;\"/></xsl:when><xsl:when test=\"@jsximg\"><xsl:attribute name=\"style\">width:16px;vertical-align:top;</xsl:attribute><xsl:variable name=\"src1\"><xsl:choose><xsl:when test=\"$jsx_img_resolve='1'\"><xsl:apply-templates mode=\"uri-resolver\" select=\"@jsximg\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"@jsximg\"/></xsl:otherwise></xsl:choose></xsl:variable><img class=\"jsx30matrix_plusminus\" jsxtype=\"icon\" src=\"{$src1}\" unselectable=\"on\"/></xsl:when><xsl:when test=\"$jsx_icon=''\"><xsl:attribute name=\"style\">width:1px;</xsl:attribute><span style=\"display:none;width:1px;height:1px;\"><xsl:text>&#160;</xsl:text></span></xsl:when><xsl:otherwise><xsl:attribute name=\"style\">width:16px;vertical-align:top;</xsl:attribute><img class=\"jsx30matrix_plusminus\" jsxtype=\"icon\" src=\"{$jsx_icon}\" unselectable=\"on\"/></xsl:otherwise></xsl:choose><xsl:text>&#160;</xsl:text></td><td jsxtype=\"text\" style=\"vertical-align:top;\"><xsl:attribute name=\"jsxtreenode\"><xsl:choose><xsl:when test=\"record\">branch</xsl:when><xsl:otherwise>leaf</xsl:otherwise></xsl:choose></xsl:attribute><xsl:call-template name=\"ui_controller\"><xsl:with-param name=\"jsx_cell_width\" select=\"$jsx_cell_width\"/><xsl:with-param name=\"jsx_row_number\" select=\"$jsx_row_number\"/><xsl:with-param name=\"jsx_descendant_index\" select=\"$jsx_descendant_index\"/></xsl:call-template></td></tr></table></xsl:template><xsl:template name=\"row_template\"><xsl:param name=\"jsx_descendant_index\"/><xsl:param name=\"jsx_row_number\">0</xsl:param><xsl:param name=\"jsxdragtype\" select=\"$jsx_drag_type\"/><xsl:param name=\"jsx_style\"><xsl:choose><xsl:when test=\"$jsx_row_number = -1\"><xsl:value-of select=\"$jsx_autorow_style\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"@jsxstyle\"/></xsl:otherwise></xsl:choose></xsl:param><xsl:param name=\"jsx_cdfkey\"><xsl:choose><xsl:when test=\"$jsx_row_number = -1\">jsxautorow</xsl:when><xsl:otherwise><xsl:value-of select=\"@jsxid\"/></xsl:otherwise></xsl:choose></xsl:param><xsl:param name=\"jsx_groupname\"><xsl:choose><xsl:when test=\"@jsxgroupname\"><xsl:value-of select=\"@jsxgroupname\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"$jsx_id\"/></xsl:otherwise></xsl:choose></xsl:param><xsl:param name=\"jsx_rowbg\"><xsl:choose><xsl:when test=\"$jsx_rendering_model != 'hierarchical' and ($jsx_rowbg1 or $jsx_rowbg2) and $jsx_row_number != -1\"><xsl:text>background-color:</xsl:text><xsl:choose><xsl:when test=\"$jsx_row_number mod 2 = 0\"><xsl:value-of select=\"$jsx_rowbg1\"/></xsl:when><xsl:otherwise><xsl:value-of select=\"$jsx_rowbg2\"/></xsl:otherwise></xsl:choose><xsl:text>;</xsl:text></xsl:when><xsl:when test=\"record and ($jsx_rendering_model = 'hierarchical') and $jsx_treehead_bgcolor\"><xsl:text>background-color:</xsl:text><xsl:value-of select=\"$jsx_treehead_bgcolor\"/><xsl:text>;font-weight:</xsl:text><xsl:value-of select=\"$jsx_treehead_fontweight\"/><xsl:text>;border-right-color:</xsl:text><xsl:value-of select=\"$jsx_treehead_bgcolor\"/><xsl:text>;</xsl:text></xsl:when></xsl:choose></xsl:param><xsl:param name=\"jsx_is_first_panel_row\" select=\"$jsx_row_number - 1 = $jsx_min_exclusive or $jsx_row_number = -1\"/><tr JSXDragId=\"{$jsx_cdfkey}\" JSXDragType=\"{$jsx_drag_type}\" id=\"{$jsx_id}_jsx_{$jsx_cdfkey}\" jsxid=\"{$jsx_cdfkey}\" jsxrownumber=\"{$jsx_row_number}\" jsxtype=\"record\" style=\"{$jsx_rowbg}{$jsx_style}\"><xsl:if test=\"@jsxclass\"><xsl:attribute name=\"class\"><xsl:value-of select=\"@jsxclass\"/></xsl:attribute></xsl:if><xsl:if test=\"@jsxtip and $jsx_no_tip != '1'\"><xsl:attribute name=\"title\"><xsl:value-of select=\"@jsxtip\"/></xsl:attribute></xsl:if><xsl:choose><xsl:when test=\"$jsx_use_categories='0' or @jsxcategory='0' or (not(@jsxcategory='1') and not(record))\"></xsl:when></xsl:choose></tr></xsl:template><xsl:template match=\"* | @*\" mode=\"uri-resolver\"><xsl:param name=\"uri\" select=\".\"/><xsl:choose><xsl:when test=\"starts-with($uri,'JSX/')\"><xsl:value-of select=\"concat($jsxpath, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'JSXAPPS/')\"><xsl:value-of select=\"concat($jsxpathapps, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'GI_Builder/')\"><xsl:value-of select=\"concat($jsxpath, $uri)\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsx:///')\"><xsl:value-of select=\"concat($jsxpath, 'JSX/', substring($uri,8))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsx:/')\"><xsl:value-of select=\"concat($jsxpath, 'JSX/', substring($uri,6))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp:///')\"><xsl:value-of select=\"concat($jsxappprefix, substring($uri,11))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp://')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,10))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxapp:/')\"><xsl:value-of select=\"concat($jsxappprefix, substring($uri,9))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxuser:///')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,11))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxuser:/')\"><xsl:value-of select=\"concat($jsxpathapps, substring($uri,9))\"/></xsl:when><xsl:when test=\"starts-with($uri,'jsxaddin://')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"starts-with($uri,'/')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"contains($uri,'://')\"><xsl:value-of select=\"$uri\"/></xsl:when><xsl:when test=\"not($jsxpathprefix='') and not(starts-with($uri, $jsxpathprefix))\"><xsl:apply-templates mode=\"uri-resolver\" select=\".\"><xsl:with-param name=\"uri\" select=\"concat($jsxpathprefix, $uri)\"/></xsl:apply-templates></xsl:when><xsl:otherwise><xsl:value-of select=\"$uri\"/></xsl:otherwise></xsl:choose></xsl:template></xsl:stylesheet>",va:"au",vb:"='1']",vc:"jsxdrop",vd:"blur",w:"_jsxb6",wa:"nq",wb:"url(",wc:"N",wd:"W3",x:"scroll",xa:' class="jsx30matrix_scrollv"',xb:"jsxselect",xc:"S",xd:' colspan="{$jsx_colspan}" jsxcolspan="{$jsx_colspan}" ',y:"none",ya:"display:none;",yb:"jsxchange",yc:"W",yd:' jsxtype="cell" class="jsx30matrixcolumn_cell" id="{$jsx_id}_jsx_{$jsx_cdfkey}_jsx_',z:"block",za:"z-index:10;overflow:scroll;",zb:"jsxautorow",zc:"jsxlazy",zd:"{$jsx_selection_bg}{$jsx_rowbg}"};var
Qa=jsx3.util.Logger.getLogger(m.jsxclass.getName());var
gb=jsx3.gui.Event;var
La=jsx3.gui.Interactive;var
A=jsx3.xml.CDF;var
Ya=jsx3.gui.Block;var
yb=jsx3.gui.Painted.Box;var
Ua=jsx3.html;m.GF=500;m.bu=1;m.b8=150;m.AUTO_SCROLL_INTERVAL=50;m.SELECTION_BG=ub.a;m.INSERT_BEFORE_IMG=jsx3.resolveURI(ub.b);m.APPEND_IMG=jsx3.resolveURI(ub.c);m.FOCUS_STYLE=ub.d;m.ICON_MINUS=ub.e;m.ICON_PLUS=ub.f;m.ICON=ub.g;m.SORT_ASCENDING=ub.h;m.SORT_DESCENDING=ub.i;m.SORT_DESCENDING_IMG=jsx3.resolveURI(ub.j);m.SORT_ASCENDING_IMG=jsx3.resolveURI(ub.k);m.MINIMUM_COLUMN_WIDTH=8;m.DEFAULT_HEADER_HEIGHT=20;m.AUTOROW_NONE=0;m.AUTOROW_LAST_ROW=1;m.AUTOROW_FIRST_ROW=2;m.CG=(new
jsx3.xml.Document()).loadXML(ub.l);m.kt=(new
jsx3.xml.Document()).loadXML(ub.m);m.pA=new
jsx3.util.MessageFormat(ub.n);m.kQ=new
jsx3.util.MessageFormat(ub.o);m.DEFAULT_INFO_LABEL=ub.p;m.ON_PAINT_PAGE=ub.q;m.PAGING_OFF=0;m.PAGING_2PASS=1;m.PAGING_CHUNKED=2;m.PAGING_PAGED=3;m.PAGING_STEPPED=4;m.SELECTION_UNSELECTABLE=0;m.SELECTION_ROW=1;m.SELECTION_MULTI_ROW=2;m.REND_DEEP=ub.r;m.REND_SHALLOW=ub.s;m.REND_HIER=ub.t;m.DEFAULT_ROW_HEIGHT=20;m.DEFAULT_PANEL_POOL_COUNT=5;m.DEFAULT_ROWS_PER_PANEL=50;m.DEFAULT_REAPER_INTERVAL=250;m.DEFAULT_PANEL_QUEUE_SIZE=3;m.DEFAULTXSLURL=jsx3.resolveURI(ub.u);m.Hs=(new
jsx3.xml.XslDocument()).loadXML(ub.v);m.DEFAULT_XSL_URL=m.DEFAULTXSLURL;m.SCROLL_INC=36;q._jsxyy=[];q.init=function(o){this.jsxsuper(o);};q.Rc=function(e,b,n){var
hb=this.Wl(true,e);delete this[ub.w];var
sb=yb.getScrollSize()+1;var
Oa=this.getScaleWidth()==1?e.parentwidth-sb:this.x8();var
la=this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT);hb.recalculate(e,b,n);var
Pa=hb.lg(0);Pa.recalculate({parentwidth:this.v4(),parentheight:la},b?b.childNodes[0]:null,n);var
va=(Pa.lg(0)).lg(0);va.recalculate({parentwidth:Oa,parentheight:la},b&&b.childNodes[0]?Ua.selectSingleElm(b,0,0,0):null,n);var
Ha=hb.Qi()-la;var
Ma=hb.lg(1);Ma.recalculate({parentwidth:this.v4(),parentheight:Ha},b?b.childNodes[1]:null,n);var
eb=Ma.ll()+Ma.Qi();Ha=hb.Qi()-this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT);var
ma={};ma.left=Ma.getOffsetWidth()-1;ma.top=0;ma.height=eb+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)-(sb-yb.getScrollSizeOffset(ub.x));var
fb=hb.lg(2);fb.recalculate(ma,b?b.childNodes[2]:null,n);var
qa={};qa.top=eb+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)-sb;qa.width=Ma.Nd();var
ga=hb.lg(3);ga.recalculate(qa,b?b.childNodes[3]:null,n);var
C=ga.lg(0);var
ba=this.getScaleWidth()||Oa-sb<=hb.Nd()?0:Oa;C.recalculate({width:ba},b&&b.childNodes[3]?b.childNodes[3].childNodes[0]:null,n);if(b&&b.childNodes[3])if(this.getSuppressHScroller(0)==1||this.getScaleWidth()==1||C.Nd()<=ga.Nd()){b.childNodes[3].style.display=ub.y;this.setScrollLeft(0);}else b.childNodes[3].style.display=ub.z;var
z={};z.left=ma.left+1;z.top=eb+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)-sb;z.height=hb.Qi()-z.top;var
H=hb.lg(4);H.recalculate(z,b&&b.childNodes[4]?b.childNodes[4]:null,n);var
Na=this.Xi();var
ia=this.oC(Ma.Nd());var
tb=false;for(var
jb=0;jb<Na.length;jb++){var
_a=Na[jb].Rc({parentwidth:ia[jb],parentheight:la},b?Na[jb].getRendered():null,n);tb=tb||_a==null||_a.w;}if(!tb){}else if(b&&b.childNodes[0]){var
S=[];for(var
jb=0;jb<Na.length;jb++)S.push((Na[jb].Wl(true)).getPaintedWidth());this.hG(b.childNodes[0].childNodes[0],S);ia=[];for(var
jb=0;jb<Na.length;jb++)ia.push((Na[jb].Wl(true)).getOffsetWidth());this.dV(b.childNodes[0].childNodes[0],ia);S=[];for(var
jb=0;jb<Na.length;jb++)S.push(((Na[jb].Wl(true)).lg(1)).getPaintedWidth());if(this.getRenderingModel()==m.REND_HIER){var
Cb=this.EH({contextnodes:b.childNodes[1].childNodes[0].childNodes});this._Y(Cb,S);}else this.hG(b.childNodes[1].childNodes[0],S);}else{Qa.trace(ub.A);jsx3.sleep(function(){if(this.getParent())this.ge((this.getParent()).ng(this),true);},null,this);}this.rV();};q.dV=function(i,o){var
wb=0;for(var
y=1;y<i.childNodes.length;y++){var
Nb=i.childNodes[y];wb=wb+o[y-1];Nb.style.left=wb-4+ub.B;}};q.hG=function(k,s){var
wa=this.x8();for(var
v=0;v<k.childNodes.length;v++){var
la=k.childNodes[v];if(la.tagName.toLowerCase()==ub.C){la.style.width=wa+ub.B;var
na=this.mI(la);if(jsx3.CLASS_LOADER.FX3){while(na){for(var
hb=0;hb<na.childNodes.length;hb++)na.childNodes[hb].style.width=s[hb]+ub.B;na=na.nextSibling;}}else if(na)for(var
hb=0;hb<na.childNodes.length;hb++)na.childNodes[hb].style.width=s[hb]+ub.B;}}};q._Y=function(l,s){var
z=this.x8();var
Va=z-(this.oC())[0]+s[0];for(var
Y=0;Y<l.length;Y++){var
ca=l[Y];if(!(ca&&ca.childNodes))continue;var
Kb=ca.parentNode;if(Kb.tagName.toLowerCase()!=ub.C)Kb=Kb.parentNode;var
vb=z-parseInt(Kb.style.width);Kb.style.width=z+ub.B;for(var
ua=0;ua<ca.childNodes.length;ua++){var
ob=ua==0&&ca.childNodes[0].getAttribute(ub.D)>1?Va:s[ua];ca.childNodes[ua].style.width=ob+ub.B;if(ua==0&&this.getRenderNavigators(1)!=0){Kb=ca.childNodes[ua].childNodes[0].childNodes[0];var
X=ob-Kb.getAttribute(ub.E);Kb.style.width=Math.max(0,X)+ub.B;}}}};q.x8=function(l){if(!l)l=this.oC();return eval(l.join(ub.F)+ub.G)/10;};q.oC=function(a){if(typeof this._jsxb6==ub.H){return this._jsxb6.truewidths;}else{if(!a){a=this.v4();var
Za={width:1000,height:10};var
O=this.getBodyBorder();if(O!=null&&O!=ub.I)Za.border=O;a=a-(Za.width-(new
yb(Za)).Nd());}var
ma=[];var
za=0;var
Y;var
Oa=0;var
Eb=this.Xi();var
Mb={percent:[],wildcard:[],pixel:[]};for(var
Da=0;Da<Eb.length;Da++){var
W=Eb[Da].getWidth();if((jsx3.util.strTrim(String(W))).search(ub.J)==0){Mb.percent.unshift(Da);Y=parseInt(parseInt(W)/100*a);}else if(!isNaN(W)){Mb.pixel.unshift(Da);Y=Number(W);}else{Mb.wildcard.unshift(Da);if(this.getScaleWidth()){Oa++;Y=ub.K;}else Y=m.Column.DEFAULT_WIDTH;}if(!isNaN(Y))za=za+Y;ma.push(Y);}Qa.trace(ub.L+this.getName()+ub.M+ma);if(this.getScaleWidth()){var
Cb=a-za;var
db;if(Oa&&Cb>=0&&parseInt(Cb/Oa)>8){var
R=Oa;var
nb=Cb/Oa;if(nb>parseInt(nb)){nb=parseInt(nb);db=Cb-(Oa-1)*nb;}else db=nb;for(var
Da=0;Da<ma.length;Da++)if(ma[Da]==ub.K){ma[Da]=Oa==1?db:nb;Oa--;}Oa=R;}else if(Oa)for(var
Da=0;Da<ma.length;Da++)if(ma[Da]==ub.K)ma[Da]=8;Qa.trace(ub.N+this.getName()+ub.M+ma);var
v=this.x8(ma);var
V=v-a;if(V>0){var
ia=V;if(Mb.wildcard.length)ia=this.lU(ma,Mb.wildcard,V);if(Mb.percent.length&&ia>0)ia=this.lU(ma,Mb.percent,ia);if(Mb.pixel.length&&ia>0)ia=this.lU(ma,Mb.pixel,ia);}Qa.trace(ub.O+this.getName()+ub.M+ma);}for(var
Da=0;Da<ma.length;Da++)if(ma[Da]<8)ma[Da]=8;Qa.trace(ub.P+this.getName()+ub.M+ma);var
v=this.x8(ma);var
Cb=a-v;if(Cb>0)ma[ma.length-1]+=Cb;Qa.trace(ub.Q+this.getName()+ub.M+ma);this._jsxb6={truewidths:ma};return ma;}};q.lU=function(n,r,e){var
xb=0;var
P=parseInt(e/r.length);for(var
ca=0;ca<r.length;ca++){var
xa=r[ca];if(ca==r.length-1)P=e-(r.length-1)*P;if(n[xa]-P<8){xb=xb+(8-(n[xa]-P));n[xa]=8;}else n[xa]-=P;}return xb;};q.v4=function(){var
sa=((this.getParent()).ng(this)).parentwidth;return this.getSuppressVScroller(0)==1?sa:sa-yb.getScrollSize();};q.ng=function(n){var
Cb=n.getDisplayIndex();return {parentwidth:Cb!=null?(this.oC())[Cb]:null,parentheight:((this.Wl(true)).lg(0)).Qi()};};q.Vm=function(l){this.applyDynamicProperties();if(this.getParent()&&(l==null||isNaN(l.parentwidth)||isNaN(l.parentheight))){l=(this.getParent()).ng(this);this.aI();}else if(l==null)l={};var
Va=yb.getScrollSize()+1;l.left=0;l.top=0;l.width=ub.R;l.height=ub.R;l.boxtype=ub.S;l.tagname=ub.T;var
Db=new
yb(l);var
ab=this.getScaleWidth()==1?this.v4():this.x8();var
zb={};zb.left=0;zb.top=0;zb.height=this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT);zb.width=ub.R;zb.parentwidth=this.v4();zb.boxtype=ub.S;zb.tagname=ub.T;var
Wa;if((Wa=this.getHeaderBorder())!=null&&Wa!=ub.I)zb.border=Wa;var
qa=new
yb(zb);Db.bl(qa);var
Kb={};Kb.tagname=ub.T;Kb.boxtype=ub.S;Kb.top=0;Kb.left=0;var
y=new
yb(Kb);qa.bl(y);var
x={};x.left=0;x.top=0;x.width=ub.R;x.parentwidth=qa.Nd();x.boxtype=ub.S;x.tagname=ub.C;var
Q=new
yb(x);y.bl(Q);var
Z={};Z.boxtype=ub.U;Z.tagname=ub.V;var
ya=new
yb(Z);Q.bl(ya);var
_=Db.Qi()-this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT);var
aa={};aa.left=0;aa.top=this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT);aa.parentwidth=this.v4();aa.width=ub.R;aa.parentheight=_;aa.height=ub.R;aa.boxtype=ub.S;aa.tagname=ub.T;if((Wa=this.getBodyBorder())!=null&&Wa!=ub.I)aa.border=Wa;var
U=new
yb(aa);Db.bl(U);if(this.getHeaderHeight()!=0&&qa.getBorderWidth()!=U.getBorderWidth())Qa.warn(ub.W+this.getName()+ub.X+this.getHeaderBorder()+ub.Y+this.getBodyBorder()+ub.Z);var
tb={};tb.tagname=ub.T;tb.boxtype=ub.S;tb.top=0;tb.left=0;var
Ca=new
yb(tb);U.bl(Ca);var
xa=U.ll()+U.Qi();var
pb={};pb.boxtype=ub.S;pb.tagname=ub.T;pb.left=U.getOffsetWidth()-1;pb.top=0;pb.width=Va;pb.height=xa+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)-(Va-yb.getScrollSizeOffset(ub.x));var
ba=new
yb(pb);Db.bl(ba);var
Jb={};Jb.boxtype=ub.U;Jb.tagname=ub._;Jb.empty=true;Jb.left=0;Jb.top=0;Jb.width=1;Jb.height=this.getPagingModel()!=3?0:this.jI()+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)+Va;var
ua=new
yb(Jb);ba.bl(ua);var
Gb={};Gb.boxtype=ub.S;Gb.tagname=ub.T;Gb.left=U.Jg();Gb.top=xa+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)-Va;Gb.height=Va;Gb.width=U.Nd();var
E=new
yb(Gb);Db.bl(E);var
oa={};oa.boxtype=ub.U;oa.tagname=ub._;oa.empty=true;oa.left=0;oa.top=0;oa.width=ab-Va<=Db.Nd()?0:ab;oa.height=1;var
K=new
yb(oa);E.bl(K);var
nb={};nb.boxtype=ub.S;nb.tagname=ub.T;nb.left=pb.left+1;nb.top=xa+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)-Va;nb.width=Va-1;nb.height=Db.Qi()-nb.top;var
X=new
yb(nb);Db.bl(X);return Db;};m.Tj={};m.Tj[ub.aa]=true;m.Tj[ub.ba]=true;m.Tj[ub.ca]=true;m.Tj[ub.da]=true;m.Tj[ub.ea]=true;m.Tj[ub.fa]=true;m.Tj[ub.ga]=true;q.paint=function(){this.applyDynamicProperties();var
z=this.getId();var
K=this.getClassName();var
E=this.Wl(true);E.setAttributes(ub.ha+z+ub.ia+(K?ub.ja+K:ub.I)+ub.ka+this.di()+this.pi(ub.ga,ub.la));var
y=this.Pj(m.Tj,1);if(jsx3.CLASS_LOADER.IE)y=y+this.pi(ub.ma,ub.na,1);var
R=E.lg(1);R.setAttributes(ub.ha+z+ub.oa+y);var
Ka=R.lg(0);Ka.setStyles(this.Uc()+this.ti());Ka.setAttributes(this.pi(ub.pa,ub.qa,2));var
v=E.lg(2);v.setAttributes(this.pi(ub.x,ub.ra)+this.pi(ub.aa,ub.sa)+this.pi(ub.ba,ub.ta)+this.pi(ub.ua,ub.va)+this.pi(ub.ea,ub.wa)+Ua.pe+ub.xa);var
pa=this.getSuppressVScroller(0)==1?ub.ya:ub.I;v.setStyles(ub.za+pa);var
G=v.lg(0);G.setAttributes(ub.Aa+Ya.SPACE+ub.Ba);var
wb=E.lg(3);wb.setAttributes(this.pi(ub.x,ub.Ca)+this.pi(ub.ea,ub.Da)+Ua.pe+ub.Ea);pa=this.getSuppressHScroller(0)==1||this.getScaleWidth()==1||(wb.lg(0)).Nd()<=wb.Nd()?ub.ya:ub.I;wb.setStyles(ub.Fa+pa);var
Mb=wb.lg(0);Mb.setAttributes(ub.Aa+Ya.SPACE+ub.Ba);var
Jb=E.lg(4);Jb.setStyles(ub.Ga);var
Nb=ub.I;var
D=this.getPagingModel(0);if(D==0||D==4){if(this.MQ()==2)Nb=Nb+this.Z0(-1);Nb=Nb+this.Z0(0);if(this.MQ()==1)Nb=Nb+this.Z0(-1);}var
Ga=this.qz(true);var
ia=this.pi(ub.ba,ub.Ha);var
B=(E.paint()).join(this.eB()+(R.paint()).join((Ka.paint()).join(Nb+Ga))+(v.paint()).join((G.paint()).join(ub.I))+(wb.paint()).join((Mb.paint()).join(ub.I))+(Jb.paint()).join(ub.Ia)+ub.Ja+ub.Ka+ub.La+ia+ub.Ma);return B;};q.onAfterPaint=function(k){var
O=this.getPagingModel(0);if(O==0||O==4){this.F7();}else if(this.EK()||!this._jsxCX)jsx3.sleep(this.F7,ub.Na+this.getId(),this);};q.onAfterRestoreView=function(d){this.synchronizeVScroller();};q.qz=function(f){var
Ta=this.getPagingModel(0);var
Y=Ta==0||Ta==4;if(f&&Y||!f&&!Y){var
Eb=new
jsx3.util.Timer(m.jsxclass,this);var
wb=this.Xi();var
ja=[];for(var
X=0;X<wb.length;X++){var
O=wb[X];var
cb=O.getEditMasks();for(var
x=0;x<cb.length;x++){var
Ia=cb[x];if(m.ZJ(Ia,O))if(Ia.emGetType()==m.EditMask.NORMAL||Ia.emGetType()==m.EditMask.DIALOG)ja.push(Ia);}}var
M=ub.Oa+this.getId()+ub.Pa+this.paintChildren(ja)+ub.Qa;Eb.log(ub.Ra);return M;}return ub.I;};q.resetMask=function(){this.endEditSession();};q.repaintData=function(){var
Lb=new
jsx3.util.Timer(m.jsxclass,this);var
Ba=this.vD();if(Ba){var
x=this.getScrollTop();var
Bb=ub.I;var
K=this.getPagingModel(0);if(K==0||K==4){this.MA();if(this.MQ()==2)Bb=Bb+this.Z0(-1);Bb=Bb+this.Z0(0);if(this.MQ()==1)Bb=Bb+this.Z0(-1);}var
eb=this.getDocument(Ba);var
tb=eb.getElementById(this.getId()+ub.Sa);if(tb){tb.style.display=ub.y;Ba.parentNode.appendChild(tb);}Ba.innerHTML=Bb;this.F7(false,true);if(tb){tb.style.display=ub.I;Ba.appendChild(tb);}jsx3.sleep(function(){this.CE(x);},null,this);}Lb.log(ub.Ta);};q.CE=function(b){var
db=this.vD();if(b==null)b=this.getScrollTop();var
hb=db?db.offsetHeight:0;if(hb<b){this.setScrollTop(hb);}else this.setScrollTop(b);this.rV(db);};q.eB=function(){var
Z=this.getId();var
xa=this.Wl(true);var
Fa=((this.Wl(true)).lg(0)).Qi();var
na=xa.lg(0);na.setAttributes(ub.ha+Z+ub.Ua);var
qb=na.lg(0);var
L=qb.lg(0);L.setAttributes(ub.Va);var
ob=L.lg(0);var
F=[];var
Aa=this.oC();var
V=this.Xi();for(var
Na=0;Na<V.length;Na++){V[Na].Wc({parentwidth:Aa[Na],parentheight:Fa},null);F.push(V[Na].paint());}var
v=(na.paint()).join((qb.paint()).join((L.paint()).join((ob.paint()).join(F.join(ub.I)))+this.kZ(V)));return v;};q.repaintHead=function(){var
_=this.getDocument();var
Mb=_.getElementById(this.getId()+ub.Wa);if(Mb){var
sb=this.eB();Ua.setOuterHTML(Mb,sb);}};q.tl=function(e,h){var
Cb=(this.getServer()).getJSXById(h.id);var
Hb=Cb.getDisplayIndex();this.YM(Hb);if(e.leftButton()&&Hb>=this.getFixedColumnIndex(0)&&this.getCanReorder()!=0){gb.publish(e);var
za=ub.Xa+this.getId()+ub.Ya+parseInt(h.offsetWidth)+ub.Za+Ua.getOuterHTML(h)+ub._a;var
Ba=(this.getRendered(e)).childNodes[0].childNodes[0];Ua.insertAdjacentHTML(Ba,ub.ab,za);var
qa=Ba.lastChild;var
Gb=this.oC();var
M=0;for(var
_a=0;_a<this.pH();_a++)M=M+Gb[_a];qa.style.left=M+ub.B;this._jsxi4=M;var
G=this.v4();var
rb=this.x8()-G;var
t=this;var
wa=this.getScrollLeft();La._beginMoveConstrained(e,qa,function(c,b){if(rb>0){var
R=parseInt(c/G*rb);t.setScrollLeft(R);c=c+R-wa;}return [c,0];});gb.subscribe(ub.ga,this,ub.bb);}else if(e.rightButton()){var
zb=Cb.getMenu();if(zb){var
U=(Cb.getServer()).getJSX(zb);if(U!=null){var
Sa={objEVENT:e,objMENU:U};var
H=Cb.doEvent(ub.cb,Sa);if(H!==false){if(H instanceof Object&&H.objMENU instanceof jsx3.gui.Menu)U=H.objMENU;U.showContextMenu(e,Cb);}}}}};q.Cw=function(o){jsx3.EventHelp.reset();gb.unsubscribe(ub.ga,this,ub.bb);var
Nb=(this.getRendered(o.event)).childNodes[0].childNodes[0].lastChild;var
ha=parseInt(Nb.style.left);Ua.removeNode(Nb);var
Ja=this.getChildren();var
ca=this.Xi();var
ta=ca[this.pH()];var
pa=jsx3.util.arrIndexOf(Ja,ta);if(ha==this._jsxi4){if(this.getCanSort()!=0)this.DQ(o.event);}else if(this.getCanReorder()!=0){var
jb=this.oC();var
Bb=0;for(var
sb=0;sb<ca.length;sb++){if(Bb>=ha){var
T=ca[sb];var
O=jsx3.util.arrIndexOf(Ja,T);this.YL(o.event,ta,T);return;}Bb=Bb+jb[sb];}this.YL(o.event,ta,ca[ca.length-1],true);}};q.d6=function(h){return h.getSortPath();};q.FT=function(f){return f.getSortDataType();};q.DQ=function(k){var
R=this.Xi();var
ka=R[this.pH()];if(ka&&ka.getCanSort()!=0&&this.getCanSort()!=0){this.mR();var
Mb=jsx3.util.arrIndexOf(this.getChildren(),ka);var
Ba=this.d6(ka);var
hb=this.FT(ka);var
ea=this.doEvent(ub.db,{objEVENT:k,objCOLUMN:ka,strSORTPATH:Ba,strSORTTYPE:hb});if(ea!==false){if(ea!=null&&typeof ea==ub.H)if(ea.objCOLUMN!=null){ka=ea.objCOLUMN;Ba=this.d6(ka);hb=this.FT(ka);}this.setSortPath(Ba);this.setSortType(hb);this.doSort();this.doEvent(ub.eb,{objEVENT:k,objCOLUMN:ka,strSORTPATH:Ba,strSORTTYPE:hb,strDIRECTION:this.getSortDirection(),_gipp:1});}}};q.doSort=function(o){if(o){this.setSortDirection(o);}else this.setSortDirection(this.getSortDirection()==ub.h?ub.i:ub.h);var
O=this.getSortPath();var
E=this.Xi();for(var
ob=0;ob<E.length;ob++)E[ob]._applySortIcon(E[ob].getSortPath()==O);delete this[ub.fb];this.repaintData();};q.getSortPath=function(){return this.jsxsortpath==null?ub.I:this.jsxsortpath;};q.setSortPath=function(p){this.jsxsortpath=p;};q.getSortType=function(){return this.jsxsorttype==null?ub.gb:this.jsxsorttype;};q.setSortType=function(n){this.jsxsorttype=n;};q.getSortDirection=function(){return this.jsxsortdirection==null?ub.h:this.jsxsortdirection;};q.setSortDirection=function(b){this.jsxsortdirection=b;};q.getCanSort=function(){return this.jsxsort;};q.setCanSort=function(s){this.jsxsort=s;};q.YL=function(r,h,f,i){var
vb=this.Xi();var
Ra=jsx3.util.arrIndexOf(vb,h);var
la=jsx3.util.arrIndexOf(vb,f);var
E=this.getFixedColumnIndex(-1);var
ba=h.getChildIndex();if(Ra<=E)return;if(la<E)f=(this.Xi())[E];if(!f)return;var
D=i?this.adoptChild(h,true):this.insertBefore(h,f,true);if(D){var
Xa=h.getChildIndex();this.doEvent(ub.hb,{objEVENT:r,intOLDINDEX:ba,intNEWINDEX:Xa,_gipp:1});}};q.adoptChild=function(l,h,a){this.jsxsuper(l,false,a);this.aI();if(h!==false)this.repaint();};q.insertBefore=function(b,n,p){var
cb=this.jsxsuper(b,n,false);if(cb){this.aI();if(p!=false)this.repaint();}return cb;};q.getCanReorder=function(){return this.jsxreorder;};q.setCanReorder=function(n){this.jsxreorder=n;};q.focusRowById=function(d){this.focusCellByIndex(d,0);};q.focusCellById=function(l,c){if(this.getRenderingModel()==m.REND_HIER)this.revealRecord(l);var
na=this.WA(l,c);if(na){Ua.focus(na);}else if(this.U6(l))jsx3.sleep(function(){jsx3.sleep(function(){this.focusCellById(l,c);},ub.ib,this);},ub.ib,this);};q.focusCellByIndex=function(k,e){if(this.getRenderingModel()==m.REND_HIER)this.revealRecord(k);var
ua=this.jO(k,e);if(ua){Ua.focus(ua);}else if(this.U6(k))jsx3.sleep(function(){jsx3.sleep(function(){this.focusCellByIndex(k,e);},ub.ib,this);},ub.ib,this);};q.U6=function(n){if(this.getPagingModel()==3){var
Sa=this.getSortedIds();var
Ra=Sa.length;for(var
Q=0;Q<Ra;Q++)if(Sa[Q]==n){this.setScrollTop(this.getRowHeight(m.DEFAULT_ROW_HEIGHT)*Q);this._jsxDY=this.getRowHeight(m.DEFAULT_ROW_HEIGHT)*Q;(this.ps()).unshift({index:this.QF()});this.O8();return true;}}return false;};q.tu=function(j,c){this.jz(j,c,true);this._scrollIntoView(c);};q.W3=function(l,a){};q.getFocusStyle=function(a){return this.jsxfocusstyle?this.jsxfocusstyle:a?a:null;};q.setFocusStyle=function(n){delete this[ub.jb];this.jsxfocusstyle=n;};q.o6=function(d,o){if(typeof this._jsxX6!=ub.H)this._jsxX6=this.O4(this.getFocusStyle(m.FOCUS_STYLE));this.Po(d,this._jsxX6,o);};q.O4=function(r){var
J=ub.kb;var
u={};var
I=r.split(ub.lb);for(var
jb=0;jb<I.length;jb++){var
ia=I[jb]+ub.I;var
O=ia.split(ub.mb);if(O&&O.length==2){var
ua=O[0].replace(J,function(a,s){return (s.substring(1)).toUpperCase();});u[ua]=O[1];}}return u;};q.Po=function(h,o,k){if(k){for(var Cb in o)h.style[Cb]=o[Cb];}else for(var Cb in o)h.style[Cb]=ub.I;};q.PO=function(){return this._jsxcU;};q.vz=function(k){if(this._jsxcU!=k){var
M=this.DO();if(M)this.o6(M,false);}this._jsxcU=k;};q.resetFocusContext=function(a){this.vz();};q.DO=function(){return (this.getDocument()).getElementById(this.PO());};q.jz=function(k,b,f){this.kK(k);var
sa=true;var
ga=this.Xi();var
qb=ga[b.cellIndex];var
Ga=qb.getEditMasks();for(var
L=0;L<Ga.length;L++){var
Ha=Ga[L];if(m.ZJ(Ha,qb))if(Ha.emGetType()!=m.EditMask.NORMAL){sa=false;break;}}if(!f&&sa)Ua.focus(b);this.vz(b.id);this.o6(b,true);this.RA(k,b);};q.Bg=function(a,l){this.Cn(a);};q.Cn=function(p,j){if(j==null)j=this.getSelectedIds();for(var
Fa=0;Fa<j.length;Fa++){var
fb=j[Fa];var
Da=this.getRecordNode(fb);if(Da.getAttribute(ub.nb)==ub.ob)continue;this.eval(Da.getAttribute(ub.pb),this._getEvtContext({strRECORDID:fb}));}if(j.length)this.doEvent(ub.pb,{objEVENT:p,strRECORDID:j[0],strRECORDIDS:j});};q.executeRecord=function(c){var
bb=this.getRecordNode(c);if(bb)this.eval(bb.getAttribute(ub.pb),this._getEvtContext({strRECORDID:c}));};q.RA=function(l,a){var
Da=this.getSelectionModel(1);var
Fb=this.XA(a);var
vb=Fb.cell;var
kb=vb?vb.cellIndex:null;var
qa=Fb.row;var
db=qa.getAttribute(ub.qb);var
ba=this.MQ()&&this.CM(qa);if(!ba)if((this.I3()).ctrl){this.LK(db);if(this.isRecordSelected(db)){this.Du(l,db,null);}else this.VO(l,db,qa,true,kb);}else if((this.I3()).shift){var
Eb=this.uD();if(Eb){this.DD(l,qa,kb);}else{this.LK(db);this.VO(l,db,null,false,kb);}}else{this.LK(db);if(!this.isRecordSelected(db))this.VO(l,db,null,false,kb);}this.S1(l,vb,(this.Xi())[kb],ba);delete this[ub.rb];};q.dX=function(){if(!this._jsxUY)this._jsxUY={bg:(this.getServer()).resolveURI(this.getSelectionBG(m.SELECTION_BG))};return this._jsxUY.bg;};q.getSelectionBG=function(p){return this.jsxselectionbg?this.jsxselectionbg:p?p:null;};q.setSelectionBG=function(c){delete this[ub.sb];this.jsxselectionbg=c;};q.LK=function(r){this._jsxkT=r;};q.uD=function(){return this._jsxkT;};q.gD=function(){return (this.getDocument()).getElementById(this.uD());};q.A3=function(c,n,g){g.push(c);var
I=c.getParent();return !I.equals(n)?this.A3(I,n,g):g;};q.getSelectedNodes=function(){return (this.getXML()).selectNodes(ub.tb+ub.ub+ub.vb);};q.getSelectedIds=function(){var
Bb=[];var
R=(this.getXML()).selectNodeIterator(ub.tb+ub.ub+ub.vb);while(R.hasNext()){var
Ca=R.next();Bb[Bb.length]=Ca.getAttribute(ub.qb);}return Bb;};q.Ig=function(h){var
S=this.getRecord(h);return S&&(S[ub.nb]==null||S[ub.nb]!=ub.ob);};q.isRecordSelected=function(l){var
bb=this.getRecord(l);return bb!=null&&bb[ub.ub]==ub.ob;};q.selectRecord=function(b){if(this.getSelectionModel()==0)return;if(!this.Ig(b))return;this.VO(false,b,null,this.getSelectionModel()==2);};q.deselectRecord=function(c){this.Du(false,c,null);};q.deselectAllRecords=function(){var
fa=this.getSelectedIds();var
Q=fa.length;for(var
Ea=0;Ea<Q;Ea++)this.Du(false,fa[Ea]);};q.VO=function(e,b,n,f,o){var
Fa=this.getSelectionModel(1);var
sb=this.getRecordNode(b);var
Ga=f||e&&this.getCanDrag()==1;if(Fa==0||!sb||sb.getAttribute(ub.ub)==ub.ob&&Ga||sb.getAttribute(ub.nb)==ub.ob)return false;var
za=f&&Fa==2;if(!za)this.deselectAllRecords();sb.setAttribute(ub.ub,ub.ob);n=n||this.wN(b);if(n!=null){var
H=ub.wb+this.dX()+ub.Z;for(var
Mb=0;Mb<n.childNodes.length;Mb++)n.childNodes[Mb].style.backgroundImage=H;}this.Wz(e,b,o);return true;};q.Du=function(i,g,r){var
ka=this.getRecordNode(g);if(!ka||ka.getAttribute(ub.ub)!=ub.ob)return false;ka.removeAttribute(ub.ub);r=r||this.wN(g);if(r!=null&&r.childNodes){r.style.backgroundImage=ub.I;for(var
B=0;B<r.childNodes.length;B++)r.childNodes[B].style.backgroundImage=ub.I;}this.Wz(i);return true;};q.DD=function(n,a,o){if(!a)return;var
Fb=this.uD();var
I=a.getAttribute(ub.qb);if(!this.Ig(Fb)||!this.Ig(I))return;var
Z=this.getSelectedIds();var
Wa=Z.length;for(var
xb=0;xb<Wa;xb++)this.Du(false,Z[xb],this.wN(Z[xb]));Z=this.getSortedIds();var
Y=new
jsx3.util.List(Z);var
vb=Y.indexOf(Fb);var
jb=Y.indexOf(I);var
oa=Math.min(vb,jb);var
M=Math.max(vb,jb);var
za=Z.length;var
ca=0;for(var
xb=oa;xb<=M;xb++)this.VO(false,Z[xb],this.wN(Z[xb]),true,o);this.Wz(n,I,o);};q.Wz=function(l,d,s){if(l&&l instanceof gb){this.doEvent(ub.xb,{objEVENT:l,strRECORDID:d,strRECORDIDS:this.getSelectedIds(),objCOLUMN:s!=null?(this.Xi())[s]:null,_gipp:1});this.doEvent(ub.yb,{objEVENT:l});}};q.S1=function(r,k,f,s){var
Ha=f.getEditMask();if(Ha!=null){var
db,Ma;if(s){var
Sa=this.a3();Ma=Sa[f.getPath()];db=ub.zb;}else{db=k.parentNode.getAttribute(ub.qb);Ma=f.getValueForRecord(db);}var
Ea=this.getRendered(k);var
w=this.vD();var
Cb=Ha.emGetType()==m.EditMask.NORMAL||Ha.emGetType()==m.EditMask.DIALOG;if(Cb){var
ib=this.doEvent(ub.Ab,{objEVENT:r,strRECORDID:db,objCOLUMN:f});if(ib===false)return;if(ib!=null&&typeof ib==ub.H)if(typeof ib.objMASK!=ub.Bb)Ha=ib.objMASK;}var
xb=Ua.getRelativePosition(w,k);var
X=Ua.getRelativePosition(Ea,Ea);X.W-=parseInt(w.style.left);X.H-=parseInt(w.style.top);var
Aa=this._jsxOM;if(Aa&&Aa.mask&&Aa.mask.emGetSession())this.endEditSession();if(Ha.Hx(Ma,xb,X,this,f,db,k)){this._jsxOM={mask:Ha,column:f,recordId:db,value:Ma};gb.subscribeLoseFocus(this,(this.getRendered(k)).childNodes[1],ub.Cb);}}};q.getAutoRowSession=function(){return this.a3();};q.a3=function(){if(!this._jsxyP){this._jsxyP={jsxid:jsx3.xml.CDF.getKey()};this._jsxz3={jsxid:this._jsxyP.jsxid};}return this._jsxyP;};q.q5=function(){if(this._jsxyP)for(var oa in this._jsxyP)if(this._jsxz3[oa]!=this._jsxyP[oa]&&!(jsx3.util.strEmpty(this._jsxyP[oa])&&jsx3.util.strEmpty(this._jsxz3[oa])))return true;return false;};q.wM=function(b){var
aa=this.a3();aa[b.column.getPath()]=b.newvalue;};q.F0=function(i,r){if(r!==false)this.kK(i);var
ha=this.a3();if(ha!=null&&!jsx3.util.strEmpty(ha.jsxid)){delete this[ub.Db];var
Ha;if(i)Ha=this.doEvent(ub.Eb,{objEVENT:i,objRECORD:ha});if(Ha!==false){var
K=this.insertRecord(ha,this.getRenderingContext(ub.Fb),true);if(i)this.doEvent(ub.Gb,{objEVENT:i,objRECORDNODE:K,_gipp:1});}var
M={jsxid:ub.zb};this.insertRecord(M,null,false);this.redrawRecord(ub.zb,2);this.deleteRecord(ub.zb,false);}};q.commitAutoRowSession=function(e,f){this.F0(e,false);if(!isNaN(f)){var
tb=this.wN(ub.zb);if(tb&&tb.childNodes[+f])Ua.focus(tb.childNodes[+f]);}};q.BP=function(){delete this[ub.Db];};q.CM=function(r){if(!r)return false;if(r.getAttribute(ub.qb)!=ub.zb)return false;var
Hb=r.parentNode;if(Hb.tagName.toLowerCase()!=ub.C)Hb=Hb.parentNode;return Hb.getAttribute(ub.zb)==ub.Hb;};q.kK=function(o,b){var
Da=this._jsxOM;if(Da!=null){if(!b){delete this[ub.Ib];gb.unsubscribeLoseFocus(this);}var
wa=b?Da.mask.emGetValue():Da.mask.DW();var
z=Da.recordId==ub.zb&&this.MQ()&&this.CM(this.wN(ub.zb));var
O=true;if(o&&z){var
mb=this.wN(ub.zb);O=Ua.findElementUp(o.srcElement(),function(f){return f==mb;},true)==null;}if(!(O&&z&&this.q5()))if(Da.value===wa)return;var
ba=Da.mask.emGetType()==m.EditMask.NORMAL||Da.mask.emGetType()==m.EditMask.DIALOG;var
nb=true;if(ba){if(o!=null)nb=this.doEvent(ub.Jb,{objEVENT:o,strRECORDID:Da.recordId,objCOLUMN:Da.column,strNEWVALUE:wa});if(nb!=null&&typeof nb==ub.H)if(typeof nb.strNEWVALUE!=ub.Bb)wa=nb.strNEWVALUE;var
Ab=Da.column.getPath()==ub.qb;if(Ab&&this.getRecordNode(wa))nb=false;if(nb!==false){if(b)Da.value=wa;if(z){Da.newvalue=wa;this.wM(Da);var
da=this.a3();var
Bb={};for(var u in da)Bb[u]=da[u];Bb.jsxid=ub.zb;this.insertRecord(Bb,null,false);this.redrawCell(ub.zb,Da.column);this.deleteRecord(ub.zb,false);if(O&&!b&&this.q5())this.F0(o,false);}else if(Ab){this.insertRecordProperty(Da.recordId,ub.qb,wa,false);this.redrawCell(wa,Da.column);}else{Da.column.setValueForRecord(Da.recordId,wa);this.redrawCell(Da.recordId,Da.column);}}}if(o!=null&&nb!==false)this.doEvent(ub.Kb,{objEVENT:o,strRECORDID:Da.recordId,objCOLUMN:Da.column,strVALUE:wa,_gipp:1});}};q.endEditSession=function(p){this.kK(p);};q.collapseEditSession=function(f,g){var
H=this._jsxOM;if(H!=null){H.mask.emCollapseEdit(f);this.endEditSession(f);Ua.focus(g);}};q.YD=function(k){var
Ka=k.event.srcElement();var
y=this._jsxOM;if(y&&!y.f1&&!y.mask.containsHtmlElement(Ka))this.kK(k.event);};m.ZJ=function(l,o){if(l._jsxkO)return true;if(l.instanceOf(jsx3.gui.Form)){m.EditMask.jsxclass.mixin(l,true);}else if(jsx3.gui.Dialog&&l instanceof jsx3.gui.Dialog){m.DialogMask.jsxclass.mixin(l,false);m.BlockMask.jsxclass.mixin(l,true);m.EditMask.jsxclass.mixin(l,true);}else if(l instanceof Ya){m.BlockMask.jsxclass.mixin(l,true);m.EditMask.jsxclass.mixin(l,true);}else return false;l.emInit(o);l._jsxkO=true;return true;};q.qh=function(p,i){p.cancelBubble();gb.publish(p);var
fa=p.srcElement();var
Y=this.XA(fa);var
ma=fa.getAttribute(ub.Lb);if(ma==ub.Mb||ma==ub.Nb){this.Ms(p,fa);}else while(fa&&fa!=i){if(fa.getAttribute(ub.Lb)==ub.Ob)if(!jsx3.gui.isMouseEventModKey(p)&&!p.shiftKey()){var
Ja=Y.row.getAttribute(ub.qb);var
Ib=this.getSelectedIds();var
ra=Ib.length==1&&Ja==Ib[0]?false:p;this.deselectAllRecords();this.VO(ra,Ja,Y.row,false,Y.cell?Y.cell.cellIndex:null);return;}fa=fa.parentNode;}};q.Ms=function(p,i,d){var
va=this.DC(i);var
T=(this.mI(va.previousSibling)).getAttribute(ub.qb);var
qb=this.getRecordNode(T);if(!qb.selectSingleNode(ub.Pb))return;if(d==null)d=false;if(i.nodeType==3)i=i.parentNode;var
z=i.getAttribute(ub.Lb);if(va.style.display==ub.y||d){d=true;qb.setAttribute(ub.Qb,ub.ob);va.style.display=ub.I;if(this.getRenderNavigators(1)!=0)i.style.backgroundImage=ub.wb+(this.getUriResolver()).resolveURI(this.getIconMinus(m.ICON_MINUS))+ub.Z;if(this.kW(va)){Qa.trace(ub.Rb+T);var
fa={};fa.jsx_panel_css=ub.Sb;fa.jsx_column_widths=this.x8();fa.jsx_rendering_context=T;fa.jsx_context_index=va.getAttribute(ub.Tb);va.innerHTML=this.doTransform(fa);if(this.getRenderNavigators(1)!=0)i.setAttribute(ub.Lb,ub.Mb);var
Ba={painted:1,token:m.getToken(),contextnodes:va.childNodes};(this.T6())[0]=Ba;this.QM(Ba);}}else{qb.removeAttribute(ub.Qb);va.style.display=ub.y;if(this.getRenderNavigators(1)!=0)i.style.backgroundImage=ub.wb+(this.getUriResolver()).resolveURI(this.getIconPlus(m.ICON_PLUS))+ub.Z;}this.rV();if(p)this.doEvent(ub.Ub,{objEVENT:p,strRECORDID:T,objRECORD:qb,bOPEN:d,_gipp:1});};q.toggleItem=function(o,r){var
Kb=this.jO(o,0);if(Kb!=null){while(Kb&&Kb.getAttribute&&Kb.getAttribute(ub.Lb)!=ub.Mb&&Kb.getAttribute(ub.Lb)!=ub.Nb)Kb=Kb.childNodes[0];this.Ms(false,Kb,r);}};q.revealRecord=function(k){var
Eb=this.getRecordNode(k);if(Eb){if(this.getRenderingModel()==m.REND_HIER){var
fa=[];do
fa.push(Eb.getAttribute(ub.qb));while((Eb=Eb.getParent())!=null&&Eb.getNodeName()==ub.Ob);for(var
cb=fa.length-1;cb>=0;cb--)this.toggleItem(fa[cb],true);}this.synchronizeVScroller();var
kb=this.jO(k,0);if(kb){this._scrollIntoView(kb);}else if(this.U6(k))jsx3.sleep(function(){jsx3.sleep(function(){var
kb=this.jO(k,0);if(kb)this._scrollIntoView(kb);},ub.Vb,this);},ub.Vb,this);}};q.DC=function(p){while(!p.tagName||p&&p.tagName&&p.tagName.toLowerCase()!=ub.C||p.id==ub.I)p=p.parentNode;return p.nextSibling;};q.getDragIcon=function(e,h,b,c){var
ga=jsx3.EventHelp.DRAGIDS;var
Ba=ub.I;var
ca=e.id;var
Fa=0.4;var
vb=e.getAttribute(ub.qb);if(h.Ig(vb)&&jsx3.util.arrIndexOf(ga,vb)==-1)ga.push(vb);for(var
Sa=0;Sa<ga.length&&Sa<4;Sa++){var
T=h.wN(ga[Sa]);if(T)Ba=Ba+h.hU(T,Fa);Fa=Fa-0.1;}return Ba;};q.hU=function(g,l){var
Ca=g;while(Ca.tagName.toLowerCase()!=ub.C)Ca=Ca.parentNode;return ub.Wb+Ua.getCSSOpacity(l)+ub.Xb+ub.Yb+Ca.getAttribute(ub.Zb)+ub._b+Ca.getAttribute(ub.ac)+ub.Xb+ub.bc+g.getAttribute(ub.Zb)+ub._b+g.getAttribute(ub.ac)+ub.Xb+g.innerHTML+ub.cc;};if(jsx3.CLASS_LOADER.IE)q.HZ=function(f,g){var
pa=f.srcElement();var
ob=this.getSelectionModel()!=0;if(ob&&!(pa&&pa.tagName.search(ub.dc)==0))f.cancelAll();};q.Xg=function(c,j){var
X=true;this.MR(c);if(c.leftButton()){var
Ra=c.srcElement();var
ra=this.XA(Ra);if(ra==null)return;if(ra){j=ra.cell;if(this.PO()!=j.id){Ua.focus(j);}else{this.rF();this.jz(c,j);}if(this.getCanDrag()==1&&this.getSelectionModel(1)>0){var
vb=this.getSelectedIds();var
t=ra.row.getAttribute(ub.qb);var
O=jsx3.util.List.wrap(vb);if(O.indexOf(t)==-1)vb=[t];if(this.Ig(t)&&jsx3.util.arrIndexOf(vb,t)==-1)vb.push(t);this.doDrag(c,ra.row,this.getDragIcon,{strDRAGIDS:vb});X=true;}else X=this._jsxOM!=null;}}if(X){gb.publish(c);c.cancelAll();}};q.Pe=function(r,n){var
w=r.toElement();if(!w)return;var
sa=w.getAttribute(ub.Lb);var
Eb=this.XA(w);if(!Eb)return;var
Ab=Eb.row.getAttribute(ub.qb);n=this.MZ(Eb.row);if(jsx3.EventHelp.isDragging()&&this.getCanDrop()==1&&(jsx3.EventHelp.getDragIds())[0]!=null){if(sa==ub.Mb&&(this.getRecordNode(Ab)).getAttribute(ub.Qb)!=ub.ob||sa==ub.Nb){var
nb=this;r.he();m.TOGGLETIMEOUT=window.setTimeout(function(){if(nb.getParent()!=null)nb.Ms(r,w);},m.GF);}var
Q=this.doEvent(ub.ec,{objEVENT:r,strRECORDID:Ab,objSOURCE:jsx3.EventHelp.getDragSource(),strDRAGIDS:jsx3.EventHelp.getDragIds(),strDRAGTYPE:jsx3.EventHelp.getDragType(),objGUI:n});if(!(Q===false)){var
oa=this.getRendered(r);var
eb=this.getAbsolutePosition(oa,Eb.row);var
z=this.yR(oa);var
rb=this.getRenderingModel()==m.REND_HIER&&this.getRenderNavigators(1)!=0?parseInt(Eb.row.childNodes[0].childNodes[0].childNodes[0].getAttribute(ub.E)):4;if(this.getRenderingModel()!=m.REND_HIER||eb.H/3>r.getOffsetY()){z.style.top=eb.T-4+ub.B;z.style.width=this.v4()-rb-8+ub.B;z.style.height=ub.fc;z.style.backgroundImage=ub.wb+m.INSERT_BEFORE_IMG+ub.Z;z.setAttribute(ub.gc,ub.hc);}else{rb=rb+26;z.style.width=ub.ic;z.style.height=ub.ic;z.style.top=eb.T-10+eb.H+ub.B;z.style.backgroundImage=ub.wb+m.APPEND_IMG+ub.Z;z.setAttribute(ub.gc,ub.jc);}z.style.left=rb+ub.B;z.setAttribute(ub.kc,Ab);z.style.display=ub.z;}}else if(this.getEvent(ub.lc)){this.applySpyStyle(w);var
Kb=r.clientX()+jsx3.EventHelp.DEFAULTSPYLEFTOFFSET;var
x=r.clientY()+jsx3.EventHelp.DEFAULTSPYTOPOFFSET;r.he();var
nb=this;var
fb=(this.Xi())[Eb.cell.cellIndex];if(m.SPYTIMEOUT)window.clearTimeout(m.SPYTIMEOUT);m.SPYTIMEOUT=window.setTimeout(function(){m.SPYTIMEOUT=null;if(nb.getParent()!=null)nb.Yu(r,Ab,fb,w);},jsx3.EventHelp.SPYDELAY);}};q.Yu=function(p,j,d,k){this.removeSpyStyle(k);var
V=this.doEvent(ub.lc,{objEVENT:p,objCOLUMN:d,strRECORDID:j});if(V)this.showSpy(V,p);};q.aV=function(a,l){this.BJ(l.parentNode);if(jsx3.EventHelp.isDragging()&&this.getCanDrop()==1&&(jsx3.EventHelp.getDragIds())[0]!=null){var
ma=this;this._jsxMK={offsety:a.getOffsetY(),offsetheight:l.offsetHeight,scrollheight:l.scrollHeight};this._jsxMK.interval=window.setInterval(function(){ma.bX();},m.AUTO_SCROLL_INTERVAL);}};q.bX=function(){if(this._jsxMK.offsety<this._jsxMK.offsetheight/2){if(this.getScrollTop()>0)this.setScrollTop(this.getScrollTop()-20);}else if(this.getScrollTop()<this._jsxMK.scrollheight)this.setScrollTop(this.getScrollTop()+20);};q.gN=function(p,i){if(this._jsxMK){window.clearInterval(this._jsxMK.interval);delete this[ub.mc];}};q.au=function(r,n){if(jsx3.EventHelp.isDragging()&&this.getCanDrop()==1&&(jsx3.EventHelp.getDragIds())[0]!=null&&this._jsxMK){this._jsxMK.offsety=r.getOffsetY();this._jsxMK.offsetheight=n.offsetHeight;this._jsxMK.scrollheight=n.scrollHeight;}};q._ebMouseOutDropIcon=function(s,j){if(!s.isFakeOut(j.parentNode.childNodes[1]))this.BJ(j.parentNode);};q.nk=function(h,e){var
Fa=h.fromElement();if(h.isFakeOut(e))this.BJ(e.parentNode);if(!jsx3.EventHelp.isDragging()&&this.getEvent(ub.lc)){var
la=h.toElement();var
da=false;try{da=!la||la.className!=ub.nc;}catch(Kb){da=true;}if(da){jsx3.sleep(La.hideSpy);this.removeSpyStyle(Fa);if(m.SPYTIMEOUT)window.clearTimeout(m.SPYTIMEOUT);}}if(Fa==null||h.isFakeOut(e.parentNode)&&Fa.getAttribute(ub.Lb)!=ub.Mb)return;var
fb=Fa.getAttribute(ub.Lb);var
U=this.XA(Fa);if(!U)return;var
z=U.row.getAttribute(ub.qb);e=this.MZ(U.row);if(jsx3.EventHelp.isDragging()&&this.getCanDrop()==1){if(fb==ub.Mb)window.clearTimeout(m.TOGGLETIMEOUT);var
w=this.doEvent(ub.oc,{objEVENT:h,strRECORDID:z,objSOURCE:jsx3.EventHelp.getDragSource(),strDRAGIDS:jsx3.EventHelp.getDragIds(),strDRAGTYPE:jsx3.EventHelp.getDragType(),objGUI:e});this.BJ(this.getRendered(h));}};q.XA=function(l){var
Ga=l;var
kb=null;while(Ga.getAttribute(ub.Lb)!=ub.Ob){kb=Ga;Ga=Ga.parentNode;if(!Ga.tagName||Ga.tagName.toLowerCase()==ub.pc||Ga.id==this.getId())return null;}return {row:Ga,cell:kb};};q.MZ=function(p){if(this.getRenderingModel()==ub.qc){p=(this.DC(p)).parentNode;}else if(this.getPagingModel(0)!=3)while(p.tagName.toLowerCase()!=ub.C)p=p.parentNode;return p;};q.eo=function(e,h){};q.lk=function(r,n){var
Lb=r.getWheelDelta();var
X=this.vD();var
ca=this.getScrollTop();ca=Math.max(0,Math.min(ca-Lb*m.SCROLL_INC,X.offsetHeight));this.collapseEditSession(r,n);this.setScrollTop(ca,n);r.cancelAll();};q._isDescendantOrSelf=function(r,l){while(r&&l){if(r.equals(l))return true;r=r.getParent();}return false;};q._onMouseUp=function(a,l){var
qb=a.srcElement()&&(a.srcElement()).className==ub.rc?(this.wN((a.srcElement()).getAttribute(ub.kc))).childNodes[0]:a.srcElement();var
Eb=this.XA(qb);if(this.getCanDrop()==1&&jsx3.EventHelp.isDragging()){if(jsx3.EventHelp.getDragType()==ub.sc){jsx3.sleep(function(){this.BJ();},null,this);var
ua=jsx3.EventHelp.getDragSource();if(ua&&ua.instanceOf(jsx3.xml.CDF)){var
Va=jsx3.gui.isMouseEventModKey(a);var
L=ua.doEvent(ub.tc,{objEVENT:a,strRECORDID:jsx3.EventHelp.getDragId(),strRECORDIDS:jsx3.EventHelp.getDragIds(),objTARGET:this,bCONTROL:Va});var
mb=this.yR(this.getRendered(a));var
na=mb.getAttribute(ub.gc)==ub.hc;var
Xa=Eb?Eb.row.getAttribute(ub.qb):null;var
rb={objEVENT:a,objSOURCE:ua,strDRAGIDS:jsx3.EventHelp.getDragIds(),strDRAGTYPE:jsx3.EventHelp.getDragType(),strDRAGID:jsx3.EventHelp.getDragId(),strRECORDID:Xa,bINSERTBEFORE:na,objCOLUMN:Eb!=null?(this.Xi())[Eb.cell.cellIndex]:null,bALLOWADOPT:L!==false};var
nb=this.doEvent(Va?ub.uc:ub.vc,rb);if(L!==false&&nb!==false){var
qa=jsx3.EventHelp.getDragIds();var
kb=Eb?this.getRecordNode(Eb.row.getAttribute(ub.qb)):null;for(var
vb=0;vb<qa.length;vb++){var
ja=ua.getRecordNode(qa[vb]);if(kb&&kb.equals(ja)&&na&&kb.getNextSibling()){kb=kb.getNextSibling();Xa=kb.getAttribute(ub.qb);}if(!(this==ua&&Eb&&this._isDescendantOrSelf(kb,ja))){ua.deleteRecordProperty(qa[vb],ub.ub,false);var
V;if(na){V=true;var
Fb=this.adoptRecordBefore(ua,qa[vb],Xa);}else{V=Eb!=null;var
Ra;if(this.getRenderingModel()==m.REND_HIER&&Eb){Ra=Eb.row.getAttribute(ub.qb);}else Ra=this.getRenderingContext();var
Fb=this.adoptRecord(ua,qa[vb],Ra,Eb!=null);}}}if(!V&&!Eb)this.repaint();}}}jsx3.EventHelp.reset();}else if(a.rightButton()){var
oa=this.getMenu();if(oa){var
Ka=(this.getServer()).getJSX(oa);if(Ka!=null){var
jb,Aa;if(Eb){jb=(this.Xi())[Eb.cell.cellIndex];Aa=Eb.row.getAttribute(ub.qb);}var
wa={objEVENT:a,objMENU:Ka,strRECORDID:Aa,objCOLUMN:jb};var
ab=this.doEvent(ub.cb,wa);if(ab!==false){if(ab instanceof Object&&ab.objMENU instanceof jsx3.gui.Menu)Ka=ab.objMENU;Ka.showContextMenu(a,this,Aa);}}}}};q.MR=function(l){this._jsxhU={ctrl:jsx3.gui.isMouseEventModKey(l),shift:l.shiftKey(),alt:l.altKey()};};q.I3=function(){return this._jsxhU!=null?this._jsxhU:{};};q._ebKeyDown=function(l,a){if(this.jsxsupermix(l,a))return;var
cb=l.keyCode();var
ba=l.hasModifier(true);var
C=cb==9&&!ba;var
Pa=this.getSelectionModel(1);this.MR(l);if(this.PO()==null){var
za=this.qt();if(za){this.vz(za.id);}else return;}var
N=this.DO();var
D=this.MQ()&&N&&this.CM(N.parentNode);var
ea=false;if(D&&(cb==13||cb==40||cb==38||N.parentNode.lastChild==N&&(C&&!l.shiftKey()||cb==39)||N.parentNode.firstChild==N&&(C&&l.shiftKey()||cb==37))){var
M=N.cellIndex;if(cb==13){this.kK(l);var
Q=N.parentNode;if(!Q)Q=this.wN(ub.zb);if(Q&&Q.childNodes[M])Ua.focus(Q.childNodes[M]);}else if(this.MQ()==2&&cb==40){var
Ab=this.nI();if(Ab){var
U=this.mI(Ab);if(U)Ua.focus(U.childNodes[M]);}}else if(this.MQ()==1&&cb==38){var
Ab=this.gS();if(Ab){var
U=this.ZH(Ab);if(U)Ua.focus(U.childNodes[M]);}}else if(N.parentNode.lastChild==N&&(C&&!l.shiftKey()||cb==39)){Ua.focus(N.parentNode.firstChild);}else if(N.parentNode.firstChild==N&&(C&&l.shiftKey()||cb==37))Ua.focus(N.parentNode.lastChild);ea=true;}else if(N){var
M=N.cellIndex;var
ha=N.parentNode.getAttribute(ub.qb);if(cb==38||cb==13&&l.shiftKey()){var
kb=this.P2(ub.wc,N,true,M);ea=this.DB(kb);}else if(cb==40||cb==13&&!l.shiftKey()&&Pa==0){var
kb=this.P2(ub.xc,N,true,M);ea=this.DB(kb);}else if(cb==37||C&&l.shiftKey()){if(this.getRenderingModel()==m.REND_HIER&&M==0&&this.getSuppressVScroller()!=1){var
Aa=N.parentNode.getAttribute(ub.qb);var
wb=this.getRecordNode(Aa);var
va=wb.getAttribute(ub.Qb);if(va==1&&wb.selectSingleNode(ub.Ob)){var
P=this.tX(N);this.Ms(l,P,false);ea=true;}else{var
kb=this.P2(ub.yc,N,true,M);ea=this.DB(kb);}}if(!ea){var
kb=this.P2(ub.yc,N,true,M);ea=this.DB(kb);}}else if(cb==39||C&&!l.shiftKey()){if(this.getRenderingModel()==m.REND_HIER&&M==0&&this.getSuppressVScroller()!=1){var
Aa=N.parentNode.getAttribute(ub.qb);var
wb=this.getRecordNode(Aa);var
va=wb.getAttribute(ub.Qb);if(va!=1&&(wb.getAttribute(ub.zc)==ub.ob||wb.selectSingleNode(ub.Ob))){var
P=this.tX(N);this.Ms(l,P,true);ea=true;}else{var
kb=this.P2(ub.Ac,N,true,M);ea=this.DB(kb);}}if(!ea){var
kb=this.P2(ub.Ac,N,true,M);ea=this.DB(kb);}}else if(cb==13){this.Cn(l);ea=true;}else if(C&&l.shiftKey()){this.focus();ea=true;}else if(C){Ua.focus((this.getRendered(l)).lastChild);ea=true;}}if(ea)l.cancelAll();};q.DB=function(n){if(n){jsx3.sleep(function(){try{Ua.focus(n);}catch(Kb){}});return true;}};q.tX=function(d){var
Y=d.childNodes[0].childNodes[0];var
pa=this.mI(Y);if(pa)return pa.childNodes[0];};q.WL=function(){return this._jsxP9;};q.rF=function(o){this._jsxP9=o;};q.P2=function(f,l,j,k){var
ba=this.getSelectionModel(1);if(f==ub.Ac){this.rF();if(l.parentNode.lastChild!=l){return l.nextSibling;}else if(l.parentNode.lastChild==l&&ba>0){return l.parentNode.firstChild;}else{f=ub.xc;l=l.parentNode.firstChild;k=0;}}else if(f==ub.yc){this.rF();if(l.parentNode.firstChild!=l){return l.previousSibling;}else if(l.parentNode.firstChild==l&&ba>0){return l.parentNode.lastChild;}else{f=ub.wc;l=l.parentNode.lastChild;k=l.cellIndex;}}var
Za=this.AL(f,l.parentNode,j);if(Za){if(this.WL()&&(f==ub.wc||f==ub.xc)&&Za.childNodes.length>1){k=this.WL();this.rF();}var
ab=Za.childNodes[k];if(ab){return ab;}else{this.rF(k);return Za.childNodes[0];}}else return null;};q.AL=function(g,c,s){if(g==ub.yc)g=ub.wc;else if(g==ub.Ac)g=ub.xc;if(this.getRenderingModel()==m.REND_HIER)return this.O6(g,c);if(g==ub.wc&&c.previousSibling&&c.previousSibling.tagName.toLowerCase()!=ub.Bc){return c.previousSibling;}else if(g==ub.xc&&c.nextSibling){return c.nextSibling;}else{var
Y=this.O0(this.kw(c));var
fb;var
L=this.getRenderingModel()==m.REND_HIER?this.EK():(this.T6()).length;if(g==ub.wc&&Y==0||g==ub.xc&&Y==L-1){if(g==ub.wc&&this.MQ()==2||g==ub.xc&&this.MQ()==1)return this.mI(this.IT());else return null;}else if(g==ub.wc&&(fb=this.lx(Y-1))!=null){var
wa=this.getRenderingModel()==m.REND_HIER?1:this.getRowsPerPanel(m.DEFAULT_ROWS_PER_PANEL);return this.ZH(fb);}else if(g==ub.xc&&(fb=this.lx(Y+1))!=null)return this.mI(fb);}return null;};q.O6=function(a,p){var
qa=p;if(a==ub.wc){while(qa.tagName.toLowerCase()!=ub.C)qa=qa.parentNode;var
Eb=this.zu(qa.parentNode.previousSibling);if(Eb)return Eb;var
wb=qa.parentNode.parentNode.previousSibling;return this.mI(wb);}else if(a==ub.xc){while(qa.tagName.toLowerCase()!=ub.C)qa=qa.parentNode;var
Hb=qa.nextSibling;if(Hb&&Hb.style.display.toLowerCase()!=ub.y){var
ha=Hb.childNodes[0].childNodes[0];return this.mI(ha);}Hb=qa.parentNode.nextSibling;if(Hb){var
ha=Hb.childNodes[0];return this.mI(ha);}return this.f4(qa.parentNode);}return null;};q.zu=function(i){if(i){var
sa=i.childNodes[1];if(sa&&sa.style.display.toLowerCase()!=ub.y&&sa.childNodes.length){var
Pa=sa.lastChild;sa=Pa.childNodes[1];if(sa&&sa.style.display.toLowerCase()!=ub.y&&sa.childNodes.length){return this.zu(Pa);}else return this.mI(Pa.childNodes[0]);}return this.mI(i.childNodes[0]);}return null;};q.f4=function(a){var
D=a.parentNode.parentNode.nextSibling;if(D){return this.mI(D.childNodes[0]);}else{var
Ia=a.parentNode.parentNode;if(Ia)return this.f4(Ia);}return null;};q._scrollIntoView=function(a){var
lb=this.getRendered(a);if(lb){var
Sa=Ua.getRelativePosition(this.vD(lb),a);var
Oa=this.getScrollTop();var
zb=Sa.T;var
V=yb.getScrollSize();var
Jb=lb.childNodes[3].style.display==ub.y?0:V;var
eb=parseInt(((this.Wl(true)).lg(1)).Qi()-Jb+1);if(!(zb>Oa&&zb+Sa.H<Oa+eb)){var
Da=Math.abs(zb-Oa);var
xa=Math.abs(zb-(Oa+eb)+Sa.H+1);if(xa<Da){if(xa==0)xa=Sa.H;this.setScrollTop(Oa+xa);}else this.setScrollTop(zb-(V+1));}if(this.getScaleWidth()!=1){var
C=this.getScrollLeft();var
Fb=Sa.L;var
xb=parseInt(((this.Wl(true)).lg(1)).Nd()-V+1);if(!(Fb>C&&Fb+Sa.W<C+(xb-(V+1)))){var
N=Math.abs(Fb-C);var
F=Math.abs(Fb-(C+xb));if(F<N){this.setScrollLeft(Fb);}else this.setScrollLeft(Fb-(V+1));}}}};q.kZ=function(s){var
T=[];var
Pa=0;var
O=(this.Wl()).lg(0);var
W=O.Qi();var
N=this.oC();for(var
oa=0;oa<s.length;oa++){var
Y=s[oa].Wl();Pa=Pa+Y.getOffsetWidth();var
Fb=this.getResizable()!=0&&oa<s.length-1&&s[oa].getResizable()!=0;if(Fb){var
eb=this.pi(ub.ea,ub.Cc,3)+this.pi(ub.ca,ub.Dc,3);var
Aa=ub.I;}else{var
eb=ub.I;var
Aa=ub.Ec;}T.push(ub.Fc+oa+ub.Gc+(Pa-4)+ub.Hc+Aa+ub.Ic+4+ub.Jc+Ya.SPACE+ub.Kc+W+ub.Lc+eb+ub.Ma);}return T.join(ub.I);};q.c1=function(k,e){if(!k.leftButton())return;gb.publish(k);this.collapseEditSession(k,e);var
xb=jsx3.util.arrIndexOf(this.getChildren(),(this.Xi())[Number(e.getAttribute(ub.Mc))]);this.YM(xb);if(typeof this._jsxZ2==ub.H&&(new
Date()).valueOf()-this._jsxZ2.timestamp<200)return;var
Gb=this.doEvent(ub.Nc,{objEVENT:k,intCOLUMNINDEX:xb});if(!(Gb===false)){var
Na=this.rU();var
Pa=parseInt(e.style.left)-this.getScrollLeft();this._jsxresizeorigin={origin:Pa};Na.style.left=Pa+ub.B;La._beginMoveConstrained(k,Na,function(i,p){return [i,0];});gb.subscribe(ub.ga,this,ub.Oc);}this._jsxZ2={timestamp:(new
Date()).valueOf()};k.cancelAll();};q._C=function(o,a){if(!o.leftButton())return;gb.publish(o);var
Cb=this.pH(Cb);var
Bb=Math.round((this.getFontSize()||jsx3.gui.Block.DEFAULTFONTSIZE)*3/4);var
Sa=this.getChild(this.pH());var
nb=Sa.getPath();var
Gb=0;var
xb=this.getXML();var
z=xb.selectNodeIterator(ub.Pc);while(z.hasNext()){var
Db=z.next();Gb=Math.max((Db.getAttribute(nb)).length,Gb);}var
kb=Bb*Gb;(this.getChild(this.pH())).setWidth(kb,true);this.CE();o.cancelAll();};q.pH=function(){return this._jsxp4;};q.YM=function(p){this._jsxp4=p;};q.rU=function(){return (this.getRendered()).childNodes[6];};q.yR=function(g){if(!g)g=this.getRendered();return g.childNodes[7];};q.BJ=function(i){var
Bb=this.yR(i);Bb.style.display=ub.y;Bb.removeAttribute(ub.gc);Bb.removeAttribute(ub.kc);};q.Bv=function(j){jsx3.EventHelp.reset();gb.unsubscribe(ub.ga,this,ub.Oc);if(parseInt((this.rU()).style.left)!=this._jsxresizeorigin.origin){var
P=this.Rz();var
aa=this.pH();var
X=this.doEvent(ub.Qc,{objEVENT:j.event,vntWIDTH:P,intCOLUMNINDEX:aa,_gipp:1});if(!(X===false))(this.getChild(this.pH())).setWidth(P,true);this.CE();}(this.rU()).style.left=ub.Rc;};q.Rz=function(){var
ba=this.rU();var
mb=parseInt(ba.style.left);var
w=this.Xi();var
ob=this.oC();var
Fb=(this.getChild(this.pH())).getDisplayIndex();for(var
Ca=0;Ca<Fb;Ca++)mb=mb-ob[Ca];mb=mb+this.getScrollLeft();return mb<8?8:mb;};q.getResizable=function(){return this.jsxresize;};q.setResizable=function(p){this.jsxresize=p;};q.MA=function(){this.mR();var
S=Math.max(1,Math.ceil(this.EK(true)/this.getRowsPerPanel(m.DEFAULT_ROWS_PER_PANEL)));this.QY(new
Array(S));};q.F7=function(d,n){if(this.getParent()==null)return;this.BP();this.endEditSession();this.rF();this.LK();this.vz();this.MA();var
Wa=(this.T6()).length;var
Ib=this.getPagingModel(0);if(Ib==0||Ib==4){var
Ea={painted:1,token:m.getToken(),index:0};if(this.getRenderingModel()==m.REND_HIER)Ea.contextnodes=(this.vD()).childNodes;(this.T6())[0]=Ea;this.QM(Ea,true);if(this.MQ()){var
pb={painted:1,token:m.getToken(),index:-1};this.QM(pb,true);}}else{(this.vD()).innerHTML=ub.I;if(Ib==3){(this.vD()).style.height=this.jI()+ub.B;var
zb=this.QF()?this.QF():0;var
ab;var
U=this.getPanelQueueSize(m.DEFAULT_PANEL_QUEUE_SIZE);var
fb=parseInt(U/2);var
mb=U-fb;for(var
Ca=zb+mb;Ca>=zb-fb;Ca--)if(Ca>=0&&this.xL(Ca))(this.ps()).unshift({index:Ca});this.O8();}else if(Ib==2){for(var
Ca=0;Ca<Wa;Ca++)(this.ps()).push({index:Ca});if(this.MQ()==2){(this.ps()).unshift({index:-1});}else if(this.MQ()==1)(this.ps()).push({index:-1});this.O8();}else if(Ib==1){(this.ps()).unshift({index:0});if(this.MQ()==2){(this.ps()).unshift({index:-1});}else if(this.MQ()==1)(this.ps()).push({index:-1});this.O8();}if(!n){var
nb=this.qz(false);if(nb){var
Q=this.vD();if(Q.lastChild)Ua.insertAdjacentHTML(Q.lastChild,ub.ab,nb);else Q.innerHTML=nb;}}}if(d!==false)this.CE();};q.MQ=function(){return this.getPagingModel()==3||this.getRenderingModel()==m.REND_HIER?0:this.getAutoRow();};q.getAutoRow=function(){return this.jsxautorow;};q.setAutoRow=function(g){this.jsxautorow=g;};q.g2=function(){if(this.getPagingModel()==3){var
R=this.T6();var
_a=(this.vD()).childNodes.length;var
P=this.getPanelPoolSize(m.DEFAULT_PANEL_POOL_COUNT);var
qb=_a-P;if(qb>0){Qa.trace(ub.Sc+P+ub.Tc+qb);var
na=this.QF();var
x=R.length;if(x/2>na){qb=this._u(R,x-1,na+1,qb,-1);if(qb<=0)return;qb=this._u(R,0,na-1,qb,1);if(qb<=0)return;}else{qb=this._u(R,0,na-1,qb,1);if(qb<=0)return;qb=this._u(R,x-1,na+1,qb,-1);if(qb<=0)return;}}}};q._u=function(h,p,d,o,s){for(var
Ha=p;s==-1&&Ha>d||s==1&&Ha<d;Ha=Ha+s){if(h[Ha]!=null){if(this._jsxm4&&this._jsxm4.length){var
_a=h[Ha].token;var
Ba=new
jsx3.util.List(this._jsxm4);this._jsxm4=(Ba.filter(function(a){return _a!=a[5].token;})).toArray();}h[Ha]=null;o--;Qa.trace(ub.Uc+Ha);var
ab=this.lx(Ha);if(ab)Ua.removeNode(ab);}if(o<=0)return 0;}return o;};q.nI=function(){var
ca=this.vD();var
qa=ca.childNodes;for(var
ob=0;ob<qa.length;ob++)if(qa[ob].tagName.toLowerCase()==ub.C&&qa[ob].getAttribute(ub.zb)!=ub.Hb||this.getRenderingModel()==m.REND_HIER&&qa[ob].getAttribute(ub.Lb)==ub.Vc)return this.getRenderingModel()==m.REND_HIER?qa[ob].firstChild:qa[ob];};q.gS=function(){var
ma=this.vD();var
u=ma.childNodes;for(var
Lb=u.length-1;Lb>=0;Lb--)if(u[Lb].tagName.toLowerCase()==ub.C&&u[Lb].getAttribute(ub.zb)!=ub.Hb||this.getRenderingModel()==m.REND_HIER&&u[Lb].getAttribute(ub.Lb)==ub.Vc)return this.getRenderingModel()==m.REND_HIER?u[Lb].firstChild:u[Lb];};q.IT=function(){return this.lx(-1);};q.lx=function(h){var
N=this.getDocument();return N.getElementById(this.getId()+ub.Wc+h);};q.O0=function(d){return parseInt((d.id+ub.I).replace(this.getId()+ub.Wc,ub.I));};q.kw=function(r){if(r.parentNode.tagName.toLowerCase()==ub.C)return r.parentNode;return r.parentNode.parentNode;};q.RQ=function(n,a){if(!isNaN(n))n=this.lx(n);if(n){var
Fa=0;for(var
Cb=0;Cb<n.childNodes.length;Cb++)if(n.childNodes[Cb].tagName.toLowerCase()==ub.Xc){return n.childNodes[Cb].childNodes[a];}else if(n.childNodes[Cb].tagName.toLowerCase()==ub.V){return n.childNodes[a+Fa];}else Fa++;}return null;};q.wN=function(p){var
Ga=this.getId()+ub.Yc+p;var
ba=this.getDocument();return ba.getElementById(Ga);};q.IL=function(c){var
xb=this.wN(c);return xb?(this.kw(this.wN(c))).parentNode:null;};q.WA=function(s,j){var
xb=this.Xi();for(var
Hb=0;Hb<xb.length;Hb++)if(xb[Hb].getPath()==j){var
H=this.getId()+ub.Yc+s+ub.Yc+Hb;var
M=this.getDocument();return M.getElementById(H);}return null;};q.jO=function(b,k){var
Ib=this.wN(b);return Ib?Ib.childNodes[k]:null;};q.qt=function(){var
ya=this.RQ(0,0);return ya?ya.childNodes[0]:null;};q.mI=function(g){return this.RQ(g,0);};q.ZH=function(f){var
tb=this.RQ(f,0);return tb?tb.parentNode.lastChild:null;};q.xD=function(i,d){this.collapseEditSession(i,d);};q.nq=function(d,i){this.collapseEditSession(d,i);};q.FS=function(a,l){var
rb=l.parentNode;var
ya=rb.childNodes[0].childNodes[0];var
N=rb.childNodes[1].childNodes[0];var
Mb=l.scrollLeft;rb.childNodes[1].scrollLeft=0;ya.style.left=ub.Zc+Mb+ub.B;N.style.left=ub.Zc+Mb+ub.B;if(a)this.doEvent(ub._c,{objEVENT:a,strDIRECTION:ub.ad,intPOSITION:Mb});};q.vF=function(f,g){var
_a=this.vD(g.parentNode);_a.parentNode.scrollTop=0;this._jsxDY=g.scrollTop;_a.style.top=ub.Zc+this._jsxDY+ub.B;var
fb=this.QF();if(this.getPagingModel(0)==3){var
K=this.getScrollInfoLabel(this._getLocaleProp(ub.bd));if(K!=ub.I){(this.GT(g.parentNode)).style.display=ub.z;window.clearTimeout(this._jsxlS);var
H=this;this._jsxlS=window.setTimeout(function(){if(g&&g.parentNode)(H.GT(g.parentNode)).style.display=ub.y;},1000);jsx3.sleep(function(){if(this.getParent()==null)return;if(g&&g.parentNode){var
t=this.getRowHeight(m.DEFAULT_ROW_HEIGHT);var
db=parseInt(this._jsxDY/t)+1;var
Fa=(this.Wl(true)).Qi();var
Bb=this.EK();var
Ba=db+parseInt(Fa/t)-1;if(Ba>Bb)Ba=Bb;var
_=new
jsx3.util.MessageFormat(K);(this.GT(g.parentNode)).childNodes[0].innerHTML=_.format(db,Ba,Bb);}},ub.cd+this.getId(),this);}var
Da;var
Mb=this.getPanelQueueSize(m.DEFAULT_PANEL_QUEUE_SIZE);var
la=parseInt(Mb/2);var
Cb=Mb-la;for(var
Z=fb+Cb;Z>=fb-la;Z--)if(Z>=0&&this.xL(Z)){(this.ps()).unshift({index:Z});if((this.ps()).length>Mb)var
Ab=(this.ps()).pop();Da=true;}if(Da)this.O8(_a);}this.doEvent(ub._c,{objEVENT:f,strDIRECTION:ub.dd,intPOSITION:this._jsxDY});};q.GT=function(n){return n.childNodes[5];};q.QF=function(){return parseInt(this._jsxDY/(this.getRowsPerPanel(m.DEFAULT_ROWS_PER_PANEL)*this.getRowHeight(m.DEFAULT_ROW_HEIGHT)));};q.O8=function(c){jsx3.sleep(function(){if(this.getParent()==null)return;if((this.ps()).length){var
tb=(this.ps()).shift();if(this.xL(tb.index))this.OS(this.Z0(tb.index),c,tb.index);if((this.ps()).length)this.O8(c);}},ub.ed+this.getId(),this);};q.ps=function(){return this._jsxyy;};q.mR=function(){this._jsxyy=[];};q.OS=function(p,l,n){if(!l)l=this.vD();if(l){var
lb={index:n,painted:1,token:m.getToken()};(this.T6())[n]=lb;Qa.trace(ub.fd+n);Ua.insertAdjacentHTML(l,ub.ab,p);this.QM(lb);this.rV(l);var
X=this;window.setTimeout(function(){if(X.getParent()==null)return;X.g2();},this.getReaperInterval(m.DEFAULT_REAPER_INTERVAL));}};q.getIterableRows=function(){var
ja,V;var
R=[];V=this.getRendered();if(V)if(this.getRenderingModel()==m.REND_HIER){var
W=this.getRenderingContext(ub.Fb);var
I=this.getRecordNode(W);var
qb=[];for(var
Ia=I.selectNodeIterator(ub.Pb);Ia.hasNext();){var
hb=Ia.next();var
Mb=hb.getAttribute(ub.qb);qb.push(this.IL(Mb));}R=this.EH({contextnodes:qb});}else{var
Da=V.childNodes[1].childNodes[0].childNodes;var
fa;for(var
Ia=0;Ia<Da.length;Ia++){fa=Da[Ia];fa=this.mI(fa);if(fa){fa=fa.parentNode;var
Ja=fa.childNodes.length;for(var
u=0;u<Ja;u++){var
M=fa.childNodes[u];if(M.tagName.toLowerCase()==ub.V)R.push(M);}}}}return R;};q.EH=function(p){var
sb=[];if(p.contextnodes){for(var
Kb=0;Kb<p.contextnodes.length;Kb++)if(p.contextnodes[Kb].getAttribute(ub.Lb)==ub.Vc)sb.push.apply(sb,this.cE(p.contextnodes[Kb]));}else{var
hb=p.index;var
fa=this.lx(hb);if(fa){fa=this.mI(fa);if(fa){fa=fa.parentNode;var
lb=fa.childNodes.length;for(var
va=0;va<lb;va++){var
Gb=fa.childNodes[va];if(Gb.tagName.toLowerCase()==ub.V)sb.push(Gb);}}}}return sb;};q.cE=function(d,s){if(s==null)s=[];s.push(this.mI(d.firstChild));if(d.lastChild){var
na=d.lastChild.childNodes;for(var
fa=0;fa<na.length;fa++)if(na[fa].tagName)this.cE(na[fa],s);}return s;};m.c5=0;m.getToken=function(){m.c5+=1;return m.c5;};q.getContentElement=function(g,i){var
Fa=this.WA(g,i);if(Fa)if(Fa.cellIndex==0&&this.getRenderingModel()==m.REND_HIER&&this.getRenderNavigators(1)!=0){var
Q=Fa.childNodes[0].childNodes[0];while(Q&&Q.tagName.toLowerCase()!=ub.V)Q=Q.childNodes[0];if(Q)return Q.lastChild.firstChild;}else return Fa.childNodes[0];};q.QM=function(f,h){var
Ka=new
jsx3.util.Timer(m.jsxclass,this);if(!jsx3.$A.is(this._jsxm4))this._jsxm4=[];var
Ab=this._jsxm4;if(this.EK()==0&&!this.MQ())return;var
y=this.getServer();var
Mb=this.Xi();var
Q=new
Array(Mb.length);var
C=false;for(var
Eb=0;Eb<Mb.length;Eb++){var
Va=Mb[Eb].bf();if(Va){Q[Eb]=Va;C=true;}}if(!C)return;var
eb=this.EH(f);if(f.contextnodes){f.index=true;delete f[ub.gd];}var
wb=eb.length;var
Pa=this.getRenderingModel()==m.REND_HIER&&this.getRenderNavigators(1)!=0;var
Bb=[];for(var
Eb=0;Eb<Mb.length;Eb++){var
Va=Q[Eb];if(Va)Bb.push([Eb,Va,Mb[Eb]]);}for(var
M=0;M<wb;M++){var
Sa=eb[M];var
sb=Sa.getAttribute(ub.qb);var
wa=Sa.getAttribute(ub.hd);for(var
B=0;B<Bb.length;B++){var
Ca=null;var
Eb=Bb[B][0];var
Va=Bb[B][1];var
Lb=Bb[B][2];if(Pa&&Eb==0){var
Na=Sa.childNodes[0].childNodes[0].childNodes[0];while(Na&&Na.tagName.toLowerCase()!=ub.V)Na=Na.childNodes[0];if(Na)Ca=Na.lastChild.firstChild;}else if(Sa.childNodes[Eb])Ca=Sa.childNodes[Eb].childNodes[0];if(Ca)if(h){Va.format(Ca,sb,this,Lb,wa,y);}else Ab[Ab.length]=[Va,Ca,sb,Lb,wa,f];}}if(Bb.length>0&&eb.length>0)jsx3.sleep(this.Pt,ub.id+this.getId(),this);Ka.log(ub.jd);};q.Pt=function(){if(this.getParent()==null){this._jsxm4=[];return;}var
ra=new
jsx3.util.Timer(m.jsxclass,this);var
X=this.getServer();var
la=(new
Date()).getTime();var
fa=la;while(this._jsxm4.length>0&&fa-la<m.b8){var
Ca=this._jsxm4.shift();var
eb=Ca[5];var
I=eb.index;if(!I){var
sa=(this.T6())[eb.index];I=sa!=null&&sa.token==eb.token;}if(I){Ca[0].format(Ca[1],Ca[2],this,Ca[3],Ca[4],X);fa=(new
Date()).getTime();}}if(this._jsxm4.length>0)jsx3.sleep(this.Pt,ub.id+this.getId(),this);ra.log(ub.kd);};q.vD=function(k){if(!k)k=this.getRendered();return k?k.childNodes[1].childNodes[0]:null;};q.jI=function(){var
P=this.getPagingModel(0);var
za=null;if(P==3){za=this.EK()*this.getRowHeight(m.DEFAULT_ROW_HEIGHT);}else{var
v=this.vD();za=v?parseInt(v.offsetHeight):0;}return za;};q.xL=function(k){if(k==-1||k>=0&&k<(this.T6()).length&&(this.T6())[k]==null){var
zb=this.getDocument();var
C=zb.getElementById(this.getId()+ub.Wc+k);return !C;}return false;};q.Z0=function(k){var
qa=this.Wl(true);var
w=this.getRowsPerPanel(m.DEFAULT_ROWS_PER_PANEL);var
mb=this.getPagingModel(0);if(mb==3){var
N=this.getRowHeight(m.DEFAULT_ROW_HEIGHT);var
J=ub.ld+w*N*k+ub.Hc;var
Ha=w*k;var
E=Ha+w+1;}else{var
J=ub.Sb;var
Ba=ub.I;if(mb==2){var
Ha=w*k;var
E=Ha+w+1;}else{var
ia=this.EK();var
Ha=0;var
E=ia+1;}}var
Ra={};Ra.jsx_min_exclusive=Ha;Ra.jsx_max_exclusive=E;Ra.jsx_panel_index=k;Ra.jsx_panel_css=J;Ra.jsx_column_widths=this.x8();Ra.jsx_rendering_context=this.getRenderingContext(ub.Fb);Ra.jsx_mode=k==-1?ub.md:ub.nd;Qa.trace(ub.od+Ha+ub.pd+E);return this.doTransform(Ra);};q.resetXmlCacheData=function(o){if(this.getPagingModel()==3)this.setScrollTop(0);this.aI(true);this.jsxsupermix(o);};q.resetCacheData=function(k){if(this.getPagingModel()==3)this.setScrollTop(0);this.aI(true);this.jsxsupermix(k);};q.setXMLId=function(j){this.aI(true);return this.jsxsupermix(j);};q.repaint=function(){this.aI(true);return this.jsxsuper();};q.setXMLString=function(n){this.aI(true);return this.jsxsupermix(n);};q.setXMLURL=function(c){this.aI(true);return this.jsxsupermix(c);};q.getXSL=function(){return this.t4();};q.t4=function(i){var
fb=new
jsx3.util.Timer(m.jsxclass,this);var
Cb=m.Hs||(jsx3.getSharedCache()).getOrOpenDocument(m.DEFAULTXSLURL,null,jsx3.xml.XslDocument.jsxclass);if(i)return Cb;var
Ma=(this.getServer()).getCache();var
ha=Ma.getDocument(this.getXSLId());if(ha==null){ha=Cb.cloneDocument();Ma.setDocument(this.getXSLId(),ha);var
la=this.getRenderingModel(m.REND_DEEP);var
Ab=this.Xi();var
kb=ha.selectSingleNode(ub.qd);var
bb=ha.selectSingleNode(ub.rd);var
y=ha.selectSingleNode(ub.sd);var
ma=this.x8();var
K=this.uj()+this.pi(ub.td,ub.ud)+this.pi(ub.vd,ub.wd);for(var
Db=0;Db<Ab.length;Db++){var
Ib=Ab[Db];var
va=Ib.getId();var
Eb=(Ib.Wl(true)).lg(1);var
N=Eb.lg(0);var
qa=Db==0&&la==m.REND_HIER?ub.xd:ub.I;Eb.setAttributes(K+qa+ub.yd+Db+ub.Ba);Eb.setStyles(Ib.On()+Ib.Qm()+Ib.Hg()+Ib.yi()+Ib.fo()+Ib.lo()+Ib.am()+ub.zd);N.setAttributes(ub.Ad);N.setStyles(Ib.Sb()+Ib.Fd());var
aa=m.kt.cloneDocument();aa.setAttribute(ub.Bd,ub.Cd+va+ub.Dd);(aa.selectSingleNode(ub.Ed)).setAttribute(ub.Fd,va+ub.Gd);y.appendChild(aa);if(la==m.REND_HIER&&Db==0&&this.getRenderNavigators(1)!=0){var
Ca=m.kQ.format(ub.Hd);var
Ja=ha.selectSingleNode(ub.Id);Ja.setAttribute(ub.Fd,va+ub.Gd);var
Fa=(N.paint()).join(ub.I);aa.loadXML(Fa);if(!aa.hasError()){(Ja.getParent()).appendChild(aa);aa.appendChild(Ja);}else Qa.error(ub.Jd+Ib+ub.Kd+aa.getError());}else var
Ca=m.kQ.format(va+ub.Gd);var
Ca=((Eb.paint()).join((N.paint()).join(Ca))).replace(ub.Ld,ub.Md);var
Lb=Eb.getPaintedWidth();var
Aa=Db==0?ma-(this.oC())[0]+Lb:Lb;var
rb=m.pA.format(va,Ca,String(Lb),String(Aa));aa.loadXML(rb);if(!aa.hasError()){ha.appendChild(aa);}else Qa.error(ub.Jd+Ib+ub.Kd+aa.getError());var
ta=(Ib.getValueTemplate(m.Column.TEMPLATES[ub.Nd])).replace(ub.Od,ub.Pd+Ib.getPath());var
mb=Ib.getEditMask();if(mb!=null&&m.ZJ(mb)&&mb.emGetType()==m.EditMask.FORMAT){var
J=new
jsx3.xml.Document();ta=ta.replace(ub.Qd,(mb.emPaintTemplate()).replace(ub.Od,ub.Pd+Ib.getPath())+ub.Rd);}aa.loadXML(ta);if(!aa.hasError()){aa.setAttribute(ub.Fd,va+ub.Gd);ha.appendChild(aa);}aa=m.CG.cloneNode(true);aa.setAttribute(ub.Fd,va);if(Db==0)kb.insertBefore(aa,bb.getParent());else bb.appendChild(aa);}}fb.log(ub.Sd);return ha;};m.MH=function(i){return i&&i.getDisplay()!=ub.y;};q.Xi=function(){return (this.getChildren()).filter(m.MH);};q.doTransform=function(b){if(!b)b={};b.jsx_id=this.getId();b.jsx_rendering_model=this.getRenderingModel(m.REND_DEEP);b.jsx_paging_model=this.getPagingModel(0);var
Gb=this.getUriResolver();if(b.jsx_rendering_model==ub.t){var
fb=this.getIcon(m.ICON),Ga=this.getIconMinus(m.ICON_MINUS),M=this.getIconPlus(m.ICON_PLUS);if(b.jsx_icon==null)b.jsx_icon=fb?Gb.resolveURI(fb):ub.I;if(b.jsx_icon_minus==null)b.jsx_icon_minus=Ga?Gb.resolveURI(Ga):ub.I;if(b.jsx_icon_plus==null)b.jsx_icon_plus=M?Gb.resolveURI(M):ub.I;b.jsx_transparent_image=Ya.SPACE;}b.jsx_sort_path=this.getSortPath();b.jsx_sort_direction=this.getSortDirection();b.jsx_sort_type=this.getSortType();b.jsx_selection_model=this.getSelectionModel(1);b.jsx_selection_bg_url=this.dX();var
E=this.getXSLParams();for(var vb in E)b[vb]=E[vb];if(b.jsx_use_categories&&this.getRenderingModel()!=m.REND_HIER)delete b[ub.Td];b.jsx_column_count=(this.Xi()).length;b.jsxpath=jsx3.getEnv(ub.Ud);b.jsxpathapps=jsx3.getEnv(ub.Vd);b.jsxpathprefix=(this.getUriResolver()).getUriPrefix();b.jsxappprefix=(this.getServer()).getUriPrefix();var
Jb=this.jsxsupermix(b);Jb=this.Xl(Jb);return !b.jsx_return_at_all_costs&&Jb.indexOf(ub.Wd)==-1?ub.I:Jb;};q.onXmlBinding=function(b){this.jsxsupermix(b);this.repaintData();};q.getXML=function(){var
Lb=this.jsxsupermix();if(!this._jsxCX){var
Va=!Lb.hasError()&&Lb.getNamespaceURI()==jsx3.app.Cache.XSDNS&&Lb.getNodeName()==ub.Xd;if(Va){var
y=this.getServer();if(y){this._jsxCX=true;(y.getCache()).subscribe(this.getXMLId(),this,ub.Yd);}}}return Lb;};q.kH=function(k){k.target.unsubscribe(k.subject,this);this._jsxCX=false;this.aI(true);jsx3.sleep(this.F7,ub.Na+this.getId(),this);};q.aI=function(l){if(!this.getServer())return;delete this[ub.Zd];if(!l){this.resetXslCacheData();this.clearBoxProfile(true);delete this[ub.w];}};q.getSortedIds=function(){var
kb=this.doTransform({jsx_mode:ub._d,jsx_rendering_context:this.getRenderingContext(ub.Fb),jsx_return_at_all_costs:true});return kb.search(ub.ae)>-1?window.eval(ub.be+RegExp.$1+ub.ce):[];};q.EK=function(h){if(h)delete this[ub.Zd];if(this._jsxBF){return this._jsxBF.maxlen;}else{if((this.getXML()).hasError())return 0;var
Ha={};Ha.jsx_mode=ub.de;Ha.jsx_rendering_model=this.getRenderingModel(m.REND_DEEP);Ha.jsx_rendering_context=this.getRenderingContext(ub.Fb);var
G=this.t4(true);G.reset();G.setParams(Ha);var
Cb=G.transform(this.getXML());var
_a=Cb.search(ub.ee)>-1?parseInt(RegExp.$1):0;Qa.trace(ub.fe+_a);this._jsxBF={maxlen:_a};if(this.getPagingModel()==3){var
Bb=this.Wl();var
Hb=this.getRendered();if(Bb&&Hb){Bb=(Bb.lg(2)).lg(0);var
fb=this.getRowHeight(m.DEFAULT_ROW_HEIGHT)*_a;Bb.recalculate({height:fb+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)},Hb.childNodes[2].childNodes[0],null);}}return _a;}};q.T6=function(){return this._jsxcN||[];};q.QY=function(k){this._jsxcN=k;};q.getSelectionModel=function(p){return this.jsxselectionmodel!=null?this.jsxselectionmodel>2?0:this.jsxselectionmodel:p!=null?p:null;};q.setSelectionModel=function(r){this.jsxselectionmodel=r;};q.getRowHeight=function(f){return this.jsxrowheight!=null?this.jsxrowheight:f!=null?f:null;};q.setRowHeight=function(b,l){this.jsxrowheight=b;this.aI();if(!l)this.repaint();};q.getRowsPerPanel=function(s){return this.jsxrowsperpanel?this.jsxrowsperpanel:s?s:null;};q.setRowsPerPanel=function(k,h){this.jsxrowsperpanel=k;this.aI(true);if(!h)this.repaint();};q.getPanelQueueSize=function(i){return this.jsxpaintqueuesize?this.jsxpaintqueuesize:i?i:null;};q.setPanelQueueSize=function(e){this.jsxpaintqueuesize=e;};q.getReaperInterval=function(n){return this.jsxreaperinterval?this.jsxreaperinterval:n?n:null;};q.setReaperInterval=function(c){this.jsxreaperinterval=c;};q.getPanelPoolSize=function(b){return this.jsxpanelpoolsize?this.jsxpanelpoolsize:b?b:null;};q.setPanelPoolSize=function(i){this.jsxpanelpoolsize=i;this.aI(true);};q.getPagingModel=function(i){if(this.getRenderingModel()==m.REND_HIER&&this.jsxpagingmodel!=4){Qa.trace(ub.ge);return 0;}return !isNaN(this.jsxpagingmodel)?this.jsxpagingmodel:!isNaN(i)?i:null;};q.setPagingModel=function(e){this.jsxpagingmodel=e;this.aI();};q.getHeaderHeight=function(f){return this.jsxheaderheight!=null?Number(this.jsxheaderheight):f?f:null;};q.setHeaderHeight=function(o,r){this.jsxheaderheight=o;this.clearBoxProfile(true);if(!r)this.repaint();};q.getScrollInfoLabel=function(e){return this.jsxscrollinfolabel!=null?this.jsxscrollinfolabel:e?e:null;};q.setScrollInfoLabel=function(b){this.jsxscrollinfolabel=b;};q.getScrollLeft=function(){var
T=this.getRendered();return T?T.childNodes[3].scrollLeft:0;};q.setScrollLeft=function(j){var
zb=this.getRendered();if(zb&&zb.childNodes[3]){zb.childNodes[3].scrollLeft=j;if(zb.childNodes[3].style.display==ub.y)this.FS(false,zb.childNodes[3]);}};q.getScrollTop=function(){return this._jsxDY?this._jsxDY:0;};q.zT=function(){var
ma=this.getRendered();return ma&&ma.childNodes[2]?ma.childNodes[2].scrollTop:this.getScrollTop();};q.setScrollTop=function(i,e){if(i<0)i=0;e=this.getRendered(e);if(e&&e.childNodes[2]){if(e.childNodes[2].scrollTop==0&&i==0)e.childNodes[2].scrollTop=1;e.childNodes[2].scrollTop=i;}};q.synchronizeVScroller=function(){this.rV();};q.rV=function(n){if(!n)n=this.vD();if(!n)return;if(this.getPagingModel()!=3){var
rb=((this.Wl()).lg(2)).lg(0);rb.recalculate({height:n.offsetHeight+this.getHeaderHeight(m.DEFAULT_HEADER_HEIGHT)},n.parentNode.parentNode.childNodes[2].childNodes[0],null);var
na=this.zT();if(this.getScrollTop()!=na){this.setScrollTop(na);n.style.top=ub.Zc+na+ub.B;}}else if(this.getScrollTop()!=this.zT())this.setScrollTop(this.zT()-1);if(n.parentNode.parentNode.childNodes[3].style.display==ub.y){this.setScrollLeft(0);}else if(this.getScaleWidth()!=1){var
wb=n.offsetWidth-n.parentNode.parentNode.offsetWidth;var
Q=this.getScrollLeft();if(Q>wb)this.setScrollLeft(wb);}this.h5();};q.h5=function(){var
cb=this.getRendered();if(cb)cb.childNodes[4].style.display=this.getSuppressVScroller(0)==1?ub.y:ub.I;};q.getScaleWidth=function(){return this.jsxscalewidth;};q.setScaleWidth=function(l){this.jsxscalewidth=l;this.ce();return this;};q.onSetChild=function(c){if(c instanceof m.Column){this.aI();return true;}return false;};q.paintChild=function(p,l){if(!l)this.repaint();};q.onRemoveChild=function(i,d){this.jsxsuper(i,d);this.aI();this.repaint();};q.getHeaderBorder=function(){return this.jsxheaderborder;};q.setHeaderBorder=function(k){this.jsxheaderborder=k;this.clearBoxProfile(true);this.repaintHead();};q.getBodyBorder=function(){return this.jsxbodyborder;};q.setBodyBorder=function(k,a){this.jsxbodyborder=k;this.aI();if(!a)this.repaint();};q.getValue=function(){var
pa=this.getSelectionModel();if(pa==2){return this.getSelectedIds();}else return (this.getSelectedIds())[0];};q.doValidate=function(){var
Db=(this.getSelectedNodes()).size()>0||this.getRequired()==0;this.setValidationState(Db?1:0);return this.getValidationState();};q.getRenderingModel=function(s){return this.jsxrenderingmodel?this.jsxrenderingmodel:s?s:null;};q.setRenderingModel=function(s,e){this.jsxrenderingmodel=s;this.aI();if(!e)this.repaint();};q.getRenderingContext=function(f){return this.jsxrenderingcontext!=null&&this.jsxrenderingcontext!=ub.I?this.jsxrenderingcontext:f!=null?f:null;};q.setRenderingContext=function(s,l){this.jsxrenderingcontext=s;this.aI(true);if(!l)this.repaint();};q.getSuppressHScroller=function(p){return this.jsxsuppresshscroll!=null?this.jsxsuppresshscroll:p!=null?p:null;};q.setSuppressHScroller=function(b){this.jsxsuppresshscroll=b;var
Ra=this.getRendered();if(Ra&&Ra.childNodes[3]){Ra.childNodes[3].style.display=b!=1?ub.z:ub.y;this.h5();}};q.getSuppressVScroller=function(f){return this.jsxsuppressvscroll!=null?this.jsxsuppressvscroll:f!=null?f:null;};q.setSuppressVScroller=function(g,e){this.jsxsuppressvscroll=g;this.aI();if(e){var
Z=this.getRendered();if(Z&&Z.childNodes[2]){Z.childNodes[2].style.display=g!=1?ub.z:ub.y;this.h5();}}else this.repaint();};q.getFixedColumnIndex=function(r){return this.jsxfixedcolumnindex!=null?this.jsxfixedcolumnindex:r!=null?r:null;};q.setFixedColumnIndex=function(i){this.jsxfixedcolumnindex=i;};q.getRenderNavigators=function(k){return this.jsxrendernavigators!=null?this.jsxrendernavigators:k!=null?k:null;};q.setRenderNavigators=function(f,h){this.jsxrendernavigators=f;this.aI();if(!h)this.repaint();};q.getIcon=function(i){return this.jsxicon!=null&&this.jsxicon!=ub.I?this.jsxicon:i?i:null;};q.setIcon=function(s){this.jsxicon=s;};q.getIconMinus=function(s){return this.jsxiconminus!=null&&this.jsxiconminus!=ub.I?this.jsxiconminus:s?s:null;};q.setIconMinus=function(c){this.jsxiconminus=c;};q.getIconPlus=function(h){return this.jsxiconplus!=null&&this.jsxiconplus!=ub.I?this.jsxiconplus:h?h:null;};q.setIconPlus=function(s){this.jsxiconplus=s;};q.deleteRecord=function(d,r){var
fb=this.getXML();var
ma=fb.selectSingleNode(this.Ee(d));if(ma!=null){ma=(ma.getParent()).removeChild(ma);if(r!==false){this.redrawRecord(d,0);if(this.getRenderingModel()!=m.REND_HIER){var
Ma=ma.selectNodes(ub.he);for(var
Fb=Ma.size()-1;Fb>=0;Fb--){var
Da=Ma.get(Fb);this.redrawRecord(Da.getAttribute(ub.qb),0);}}}return ma;}return null;};q.insertRecordProperty=function(c,p,l,i){if(p==ub.qb){var
B=this.jsxsupermix(c,p,l,false);var
va=this.wN(c);if(va){va.setAttribute(ub.qb,l);va.setAttribute(ub.ie,l);var
za=this.getId()+ub.Yc+l;va.setAttribute(ub.je,za);var
oa=va.childNodes;za=za+ub.Yc;for(var
bb=0;bb<oa.length;bb++)oa[bb].setAttribute(ub.je,za+bb);if(i!=false)this.redrawRecord(l,2);return B;}}else return this.jsxsupermix(c,p,l,i);};q.redrawCell=function(g,p,l,h){var
Na=p.getDisplayIndex();var
R=this.jO(g,Na);if(R){var
Ga;if(this.getRenderingModel()==m.REND_HIER){var
Ka=this.IL(g);var
Bb=Ka.parentNode;var
Ma=this.h2(g,Bb.getAttribute(ub.Tb));var
Fa=new
jsx3.xml.Document();if(!h){h=Fa.loadXML(Ma);while(h&&h.getBaseName()!=ub.V)h=h.getFirstChild();if(!h)return;}if(p.getChildIndex()==0&&this.getRenderNavigators(1)!=0){var
qb=h.getFirstChild();while(qb&&qb.getBaseName()!=ub.V)qb=qb.getFirstChild();var
ya=R.childNodes[0];while(ya&&ya.tagName.toLowerCase()!=ub.V)ya=ya.childNodes[0];if(!qb||!ya)return;Ga=this.qy(qb,ya,2);}else Ga=this.qy(h,R.parentNode,Na);}else{var
ya=R.parentNode;if(!h)h=this.uE(g);if(this.getRenderingModel()==m.REND_HIER){while(h&&h.getBaseName()!=ub.V)h=h.getFirstChild();if(!h)return;}Ga=this.qy(h,ya,Na);}Ga=Ga.childNodes[0];var
Ja=p.bf();if(Ja){var
H=R.parentNode;Ja.format(Ga,H.getAttribute(ub.qb),this,p,H.getAttribute(ub.hd),this.getServer());}if(!l){var
Cb=this.Xi();var
mb=new
RegExp(ub.ke+p.getPath()+ub.le);for(var
L=0;L<Cb.length;L++){var
ob=Cb[L].getTriggers()+ub.I;if(Cb[L]!=p&&(Cb[L].getPath()==p.getPath()||ob.search(mb)>=0))this.redrawCell(g,Cb[L],true,h);}}}};q.redrawMappedCells=function(a,l){var
lb=this.Xi();for(var
wb=0;wb<lb.length;wb++)if(lb[wb].getPath()==l){this.redrawCell(a,lb[wb],false);return;}};q.h2=function(l,o){return this.doTransform({jsx_mode:ub.Ob,jsx_panel_css:ub.Sb,jsx_column_widths:this.x8(),jsx_context_index:o?o:1,jsx_rendering_context:((this.getRecordNode(l)).getParent()).getAttribute(ub.qb),jsx_rendering_context_child:l});};q.redrawRecord=function(p,h,a){var
mb=this.vD();if(p!=null&&h==2){if(this.getRenderingModel()==m.REND_HIER){var
z=this.IL(p);var
u=z.parentNode;var
Ja=this.h2(p,u.getAttribute(ub.Tb));Ua.setOuterHTML(z,Ja);z=this.IL(p);var
L={painted:1,token:m.getToken(),contextnodes:[z]};(this.T6())[0]=L;this.QM(L);}else{var
ta=this.Ex(this.wN(p),p);this.k7(ta,p);}}else if(p!=null&&h==0){if(this.getRenderingModel()==m.REND_HIER){var
E=this.IL(p);if(E){var
Bb=E.parentNode;Ua.removeNode(E);if(Bb.childNodes.length==0){var
jb=Bb.previousSibling;var
xa=this.mI(jb);if(xa){var
Ca=xa.getAttribute(ub.qb);this.redrawRecord(Ca,2);}}this.rV();}}else if(this.getPagingModel(0)!=3){var
E=this.wN(p);if(E){var
y=E.parentNode;if(y.childNodes.length==1){if(y.tagName.toLowerCase()!=ub.C)y=y.parentNode;Ua.removeNode(y);}else{var
zb=E.nextSibling;if(E.parentNode.firstChild==E&&zb)for(var
cb=0;cb<E.childNodes.length;cb++)zb.childNodes[cb].style.width=E.childNodes[cb].style.width;Ua.removeNode(E);this.rV();}}}else this.repaint();}else if(p!=null&&h==3){if(this.getPagingModel(0)!=3){var
O=this.getRecordNode(p);var
Y=O.getNextSibling();var
ba=Y.getAttribute(ub.qb);if(this.getRenderingModel()==m.REND_HIER){var
N=this.IL(ba);var
Ja=this.h2(p,N.parentNode.getAttribute(ub.Tb));Ua.insertAdjacentHTML(N,ub.me,Ja);var
L={painted:1,token:m.getToken(),contextnodes:[N.previousSibling]};(this.T6())[0]=L;this.QM(L);this.rV(mb);}else{var
V=this.wN(ba);var
K=V.parentNode;var
ta=this.TY(K,p);K.insertBefore(ta,V);if(K.firstChild==ta)for(var
cb=0;cb<ta.childNodes.length;cb++){ta.childNodes[cb].style.width=V.childNodes[cb].style.width;V.childNodes[cb].style.width=ub.I;}this.k7(ta,p);this.rV(mb);if(a!==false)this.iC(O);}}else this.repaint();}else if(p!=null&&h==1)if(this.getPagingModel(0)!=3){if(this.getRenderingModel()==m.REND_HIER){var
Nb=((this.getRecordNode(p)).getParent()).getAttribute(ub.qb);var
z=this.IL(Nb);var
u=z.lastChild;if(this.kW(u)){this.toggleItem(Nb,true);}else{var
Ja=this.h2(p,u.getAttribute(ub.Tb));Ua.insertAdjacentHTML(u,ub.ab,Ja);var
L={painted:1,token:m.getToken(),contextnodes:[u.lastChild]};(this.T6())[0]=L;this.QM(L);this.rV(mb);}}else{var
K=this.gS();if(K==null||K.firstChild==null){this.repaintData();}else{if(K.firstChild.tagName.toLowerCase()==ub.Xc)K=K.firstChild;var
ta=this.TY(K,p);K.appendChild(ta);this.k7(ta,p);this.rV(mb);if(a!==false)this.iC(this.getRecordNode(p));}}}else this.repaint();};q.iC=function(l){if(this.getRenderingModel(m.REND_DEEP)==m.REND_DEEP){var
t=l.selectNodeIterator(ub.he);while(t.hasNext()){l=t.next();this.redrawRecord(l.getAttribute(ub.qb),1,false);}}};q.kW=function(j){return j.childNodes.length==0||j.childNodes.length==1&&j.childNodes[0].nodeType!=1;};q.k7=function(l,d){var
F=this.Xi();for(var
Za=0;Za<F.length;Za++){var
L=F[Za];var
V=L.bf();if(V){var
Na=l.childNodes[Za].childNodes[0];V.format(Na,d,this,L,l.getAttribute(ub.hd),this.getServer());}}};q.TY=function(h,r){var
U=this.getDocument();var
ra=this.uE(r);var
ya=U.createElement(ub.V);m.ID(ra,ya,true);for(var
Hb=ra.getChildIterator();Hb.hasNext();){ra=Hb.next();var
Db=U.createElement(ub.ne);m.ID(ra,Db,true);ya.appendChild(Db);Db.innerHTML=(ra.getFirstChild()).getXML();}return ya;};q.uE=function(k){var
Kb={};Kb.jsx_column_widths=this.x8();Kb.jsx_rendering_context=((this.getRecordNode(k)).getParent()).getAttribute(ub.qb);Kb.jsx_rendering_context_child=k;Kb.jsx_mode=ub.Ob;var
tb=this.doTransform(Kb);var
Ca=new
jsx3.xml.Document();Ca.loadXML(tb);return Ca.getRootNode();};q.Ex=function(n,b){var
ra=this.uE(b);m.ID(ra,n,false);var
C=0;for(var
Hb=ra.getChildIterator();Hb.hasNext();){ra=Hb.next();var
Db=n.childNodes[C];m.ID(ra,Db,false);Db.innerHTML=(ra.getFirstChild()).getXML();C++;}return n;};q.qy=function(i,s,k){var
ea=i.selectSingleNode(ub.oe+(k+1)+ub.ce);var
Nb=s.childNodes[k];m.ID(ea,Nb,false);Nb.innerHTML=(ea.getFirstChild()).getXML();return Nb;};m.ID=function(f,r,l){var
ab=f.getAttributeNames();var
Fb=ub.pe;var
xb=ub.qe;for(var
H=0;H<ab.length;H++){var
la=ab[H];var
ta=f.getAttribute(la);if(la.match(Fb)){Ua.addEventListener(r,la.toLowerCase(),ta);}else if(la==ub.Zb){r.className=ta;}else if(la==ub.ac){jsx3.gui.Painted.ao(r,l?ta:ta.replace(xb,ub.I));}else r.setAttribute(la,ta);}};q.setValue=function(h){this.deselectAllRecords();if(h){if(jsx3.$A.is(h)){if(this.getSelectionModel()!=2&&h.length>1)throw new
jsx3.IllegalArgumentException(ub.re,h);}else h=[h];for(var
Ea=0;Ea<h.length;Ea++)this.selectRecord(h[Ea]);this.revealRecord(h[0]);}else{this.synchronizeVScroller();this.setScrollTop(0);}return this;};q.getMaskProperties=function(){return Ya.MASK_NO_EDIT;};});jsx3.Class.defineClass("jsx3.gui.Matrix.ColumnFormat",null,null,function(l,b){var
ub={A:"",a:"short",b:"long",c:"TV",d:"jE",e:"JE",f:"@",g:/^@(datetime|date|time|number)\b/,h:"{0,",i:"}",j:"@message",k:"objDiv",l:"strCDFKey",m:"objMatrix",n:"objMatrixColumn",o:"intRowNumber",p:"objServer",q:/&lt;/g,r:"<",s:/&gt;/g,t:">",u:/&quot;/g,v:'"',w:/&amp;/g,x:"&",y:"function",z:"jsxtext"};var
Kb=jsx3.gui.Matrix;l.Lp={medium:2,full:4};l.Lp[ub.a]=1;l.Lp[ub.b]=3;l.Fr={integer:1,percent:1,currency:1};l.BI={unescape:ub.c,unescape_all:ub.d,lookup:ub.e};l.getInstance=function(g,j){var
Jb=null;var
Ka=null;if(g.charAt(0)==ub.f&&(Ka=l.BI[g.substring(1)])!=null){Jb=new
l();Jb.format=l[Ka];}else if(g.match(ub.g)){Jb=new
Kb.MessageFormat(j,ub.h+g.substring(1)+ub.i);}else if(g.indexOf(ub.j)==0)Jb=new
Kb.MessageFormat(j,g.substring(9));return Jb;};b.init=function(){};b.validate=function(){return true;};b.format=jsx3.Method.newAbstract(ub.k,ub.l,ub.m,ub.n,ub.o,ub.p);l.TV=function(j,d,f,q,k,s){l.jE(j,d,f,q,k,s,jsx3.xml.Template.supports(1));};l.jE=function(g,o,c,a,d,k,r){if(!r)g.innerHTML=(((g.innerHTML.replace(ub.q,ub.r)).replace(ub.s,ub.t)).replace(ub.u,ub.v)).replace(ub.w,ub.x);};l.JE=function(d,j,s,h,q,f){var
eb=h.getEditMask();if(eb&&eb.OK)eb=eb.OK();if(eb!=null&&typeof eb.getRecordNode==ub.y){var
Ea=s.getRecordNode(j);if(Ea){var
Z=h.getValueForRecord(j);var
wb=eb.getRecordNode(Z);d.innerHTML=jsx3.util.strEscapeHTML(wb?wb.getAttribute(ub.z):Z!=null?Z:ub.A);}}};});jsx3.Class.defineClass("jsx3.gui.Matrix.MessageFormat",jsx3.gui.Matrix.ColumnFormat,null,function(d,q){q.init=function(b,a){this.XY=new
jsx3.util.MessageFormat(a,(b.getServer()).getLocale());};q.format=function(n,s,j,m,h,o){var
v=m.getValueForRecord(s);if(v)try{var
xb=o.getLocale();if(xb!=this.XY._locale)this.XY.setLocale(xb);n.innerHTML=this.XY.format(v);}catch(Kb){jsx3.util.Logger.GLOBAL.error(this.XY,jsx3.NativeError.wrap(Kb));}};});jsx3.Class.defineInterface("jsx3.gui.Matrix.EditMask",null,function(e,r){var
ub={a:"jsxbeginmask",b:"_jsxTy"};var
qa=jsx3.gui.Matrix;e.NORMAL=1;e.FORMAT=2;e.DIALOG=3;r.emInit=function(f){};r.emGetType=function(){return e.NORMAL;};r.emPaintTemplate=function(){return this.paint();};r.Hx=function(i,f,h,n,p,q,d){this._jsxTy={matrix:n,column:p,recordId:q,td:d,value:i};var
Wa=this.emBeginEdit(i,f,h,n,p,q,d)!==false;if(Wa)this.doEvent(ub.a,{objMATRIX:n,objCOLUMN:p,strRECORDID:q,strVALUE:i,_gipp:1});return Wa;};r.replayMask=function(c){this._jsxTy={matrix:c.objMATRIX,column:c.objCOLUMN,recordId:c.strRECORDID,td:null,value:c.strVALUE};};r.emBeginEdit=function(m,b,d,i,l,c,s){};r.DW=function(){var
t=this.emEndEdit();delete this[ub.b];return t;};r.emEndEdit=function(){return this.emGetValue();};r.emGetValue=function(){return null;};r.suspendEditSession=function(){(this.getAncestorOfType(qa))._jsxOM.f1=true;};r.resumeEditSession=function(){(this.getAncestorOfType(qa))._jsxOM.f1=false;};r.emGetSession=function(){return this._jsxTy;};r.commitEditMask=function(d,m){if(this._jsxTy)this._jsxTy.matrix.kK(d,m);};r.emCollapseEdit=function(l){};});jsx3.Class.defineInterface("jsx3.gui.Matrix.BlockMask",jsx3.gui.Matrix.EditMask,function(p,a){var
ub={a:"none",b:""};var
Za=jsx3.gui.Matrix;var
aa=jsx3.gui.Block;var
rb=jsx3.html;a.emInit=function(d){this.setDisplay(ub.a,true);this.setDimensions(0,0,null,null,true);this.setRelativePosition(0,true);this._jsxhm=this.getWidth();this._jsxhf=this.getHeight();var
qa=this.OK();if(qa){var
Lb=qa.getRelativePosition();var
Ib=qa.getDisplay();Za.ZJ(qa,d);qa.setRelativePosition(Lb,true);qa.setDisplay(Ib,true);}};a.emGetType=function(){return Za.EditMask.NORMAL;};a.emBeginEdit=function(s,o,b,e,f,h,m){var
wb=isNaN(this._jsxhm)?o.W:parseInt(this._jsxhm);var
ia=isNaN(this._jsxhf)?o.H:parseInt(this._jsxhf);this.setMaskValue(s);this.setDimensions(o.L,o.T,wb,ia,true);this.setDisplay(ub.b,true);var
Y=this.getMaskFirstResponder()||this;rb.focus(Y);};a.emGetValue=function(){return this.getMaskValue();};a.getMaskFirstResponder=function(){return this.OK();};a.getMaskValue=function(){var
Ua=this.OK();return Ua!=null?Ua.getValue():null;};a.setMaskValue=function(h){var
qa=this.OK();if(qa!=null)qa.setValue(h);};a.OK=function(){return (this.getDescendantsOfType(jsx3.gui.Form))[0];};a.emEndEdit=function(){var
F=this.getMaskValue();this.setDisplay(ub.a,true);return F;};});jsx3.Class.defineInterface("jsx3.gui.Matrix.DialogMask",jsx3.gui.Matrix.BlockMask,function(l,k){var
ub={a:"",b:"none"};var
ja=jsx3.gui.Matrix;var
lb=jsx3.html;k.emInit=function(s){ja.BlockMask.prototype.emInit.call(this,s);var
Da=this.getParent();while(Da!=null){if(jsx3.gui.Window&&Da instanceof jsx3.gui.Window){Da=Da.getRootBlock();break;}else if(jsx3.gui.Dialog&&Da instanceof jsx3.gui.Dialog)break;Da=Da.getParent();}if(Da==null)Da=(this.getServer()).getRootBlock();Da.paintChild(this);};k.emGetType=function(){return ja.EditMask.DIALOG;};k.emBeginEdit=function(m,b,d,r,a,c,s){this._jsxTy={matrix:r,column:a,recordId:c,td:s};var
pa=(this.getRendered(s)).parentNode.parentNode;var
M=lb.getRelativePosition(pa,pa);var
K=lb.getRelativePosition(pa,s);var
Ba=this._jsxhm;var
Ea=this._jsxhf;var
G=[M.W-K.L-b.W,K.L,b.W];var
A=-1;for(var
Fb=0;Fb<G.length&&A<0;Fb++)if(Ba<=G[Fb])A=Fb;if(A<0)L5:for(var
Fb=0;Fb<G.length&&A<0;Fb++){for(var
x=0;x<G.length;x++)if(G[Fb]<G[x])continue L5;A=Fb;}var
hb=A==2;var
va=[M.H-K.T-(hb?b.H:0),K.T+(hb?0:b.H)];var
Za=-1;for(var
Fb=0;Fb<va.length&&Za<0;Fb++)if(Ea<=va[Fb])Za=Fb;if(Za<0)L6:for(var
Fb=0;Fb<va.length&&Za<0;Fb++){for(var
x=0;x<va.length;x++)if(va[Fb]<va[x])continue L6;Za=Fb;}Ba=Math.min(Ba,G[A]);Ea=Math.min(Ea,va[Za]);var
u=[K.L+b.W,K.L-Ba,K.L][A];var
aa=[K.T+(hb?b.H:0),K.T-Ea+(hb?0:b.H)][Za];this.setMaskValue(m);this.setDimensions(u,aa,Ba,Ea,true);this.setDisplay(ub.a,true);lb.updateCSSOpacity(this.getRendered(),0.9);var
v=this.getMaskFirstResponder()||this;lb.focus(v);};k.OK=function(){var
va=this.getChild(0)==this.getCaptionBar()?this.getChild(1):this.getChild(0);return va!=null?(va.getDescendantsOfType(jsx3.gui.Form))[0]:null;};k.emCollapseEdit=function(e){this.setDisplay(ub.b,true);};k.Mj=function(){};});
