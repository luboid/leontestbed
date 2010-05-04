<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:msxsl="urn:schemas-microsoft-com:xslt">

    <xsl:param name="jsxpluginpath"></xsl:param>
    <xsl:template match="/">
        <div style="padding:20px 10px 20px 10px;font-family:Verdana,Arial,sans-serif;font-size:11px;">
            <xsl:apply-templates select="/extension-point" mode="extension-point" />
        </div>
    </xsl:template>
    <xsl:template match="extension-point" mode="extension-point">
        <div style="border-bottom:1px dashed #999">
            <div style="font-size:12px;font-weight:normal;padding:0 0 0 4px;text-decoration:underline;height:18px;cursor:pointer;color:#33F"
            onclick="jsx3.html.getJSXParent(this).clickLinkHandler('{@plugin}','plugin');">
              <xsl:value-of select="@plugin"/>
            </div>
            <div style="font-size:15px;font-weight:bold;padding-bottom:30px;border-bottom:1px solid #999;margin-bottom:1px">
                <span style="background:url({$jsxpluginpath}/images/extPoint.png) 0 2px no-repeat;padding-left:20px;">
                  <xsl:value-of select="@id" />
                </span>
            </div>
        </div>
        <xsl:choose>
          <xsl:when test="extension">
              <h3 style="font-size:12px;font-weight:bold">
                <span style="background-image:url({$jsxpluginpath}/images/ext.png);background-repeat:no-repeat;padding:0 0 10px 20px;">
                All extensions:
                </span>
              </h3>
              <div class="indent" style="padding-left:0px">
                  <ul>
                      <xsl:for-each select="extension">
                          <li>
                              <span class="jsxdoc_link">
                                  <xsl:value-of select="@id" />
                              </span>
                              <span style="font-style:italic;color:#666;font-size:10px;">
                              in &lt;<span onclick="jsx3.html.getJSXParent(this).clickLinkHandler('{@plugin}','plugin');" style="text-decoration:underline;cursor:pointer;color:#33F"><xsl:value-of select="@plugin" /></span>&gt;</span>
                          </li>
                      </xsl:for-each>
                  </ul>
              </div>
          </xsl:when>
          <xsl:otherwise>
              <h3 style="font-size:11px;font-weight:bold;font-style:italic;color:#666;">
                <span style="background-image:url({$jsxpluginpath}/images/ext.png);background-repeat:no-repeat;padding:0 0 10px 20px;">
                (No extensions)
                </span>
              </h3>
          </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
</xsl:stylesheet>
