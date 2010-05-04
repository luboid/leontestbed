<?xml version="1.0"?>
<!--
  ~ Copyright (c) 2001-2009, TIBCO Software Inc.
  ~ Use, modification, and distribution subject to terms of license.
  -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" omit-xml-declaration="yes"/>
  <xsl:param name="jsxpluginpath"></xsl:param>
  <xsl:template match="/data">
    <div> <!-- for Fx -->
    <xsl:variable name="resultCount" select="count(//record)"/>
    <xsl:choose>
      <xsl:when test="$resultCount=0">
        <xsl:text>No results found.</xsl:text>
      </xsl:when>
      <xsl:otherwise>
        <xsl:text>Found </xsl:text>
        <xsl:value-of select="$resultCount"/>
        <xsl:text> result</xsl:text><xsl:if test="$resultCount > 1">s</xsl:if><xsl:text>.</xsl:text>

        <div style="padding:4px 0px 0px 0px;color:#33F;font-size:11px;">
          <xsl:apply-templates select="./record">
            <xsl:sort select="@jsxtype" data-type="text" order="ascending"/>
            <xsl:sort select="@jsxid" data-type="text" order="ascending"/>
          </xsl:apply-templates>
        </div>
      </xsl:otherwise>
    </xsl:choose>
    </div>
  </xsl:template>

  <xsl:template match="record[@type='plugin']">
    <div style="padding-left:10px;">
      <span style="text-decoration:underline;cursor:pointer;line-height:18px;background-image:url({$jsxpluginpath}/images/pluginloaded.png);background-repeat:no-repeat;padding:0 0 10px 20px;" onclick="jsx3.html.getJSXParent(this).getAncestorOfName('pluginMonitor').clickLinkHandler('{@jsxid}','plugin');">
        <xsl:value-of select="@jsxid"/>
      </span>
    </div>
  </xsl:template>

  <xsl:template match="record[@type='extPoint']">
    <div style="padding-left:10px;">
      <span style="text-decoration:underline;cursor:pointer;line-height:18px;background:url({$jsxpluginpath}/images/extPoint.png) 10px 0 no-repeat;padding:0 0 10px 30px;" onclick="jsx3.html.getJSXParent(this).getAncestorOfName('pluginMonitor').clickLinkHandler('{@jsxid}','extPoint');">
        <xsl:value-of select="@jsxid"/>
      </span>
    </div>
  </xsl:template>

</xsl:stylesheet>
