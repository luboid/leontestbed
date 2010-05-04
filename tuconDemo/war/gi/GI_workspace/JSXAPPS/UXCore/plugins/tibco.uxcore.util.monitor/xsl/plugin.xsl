<?xml version="1.0"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
xmlns:msxsl="urn:schemas-microsoft-com:xslt">

    <xsl:param name="jsxpluginpath"></xsl:param>
    <xsl:template match="/">
        <div class="plugindoc" style="padding:20px 10px 20px 10px;font-family:Verdana,Arial,sans-serif;font-size:11px;">
            <xsl:apply-templates select="/plugin" mode="plugin" />
        </div>
    </xsl:template>
    <xsl:template match="plugin" mode="plugin">
        <div class="head" style="border-bottom:1px dashed #999">
            <div style="font-size:15px;font-weight:bold">
                <span style="background:url({$jsxpluginpath}/images/plugin{@load}.png) 0 2px no-repeat;padding-left:20px;">
                  <xsl:value-of select="@id" />
                </span>
                <span style="font-size:9px;color:red;vertical-align:super;font-weight:normal;padding:0 0 0 4px">
                  <xsl:value-of select="@load"/>
                </span>
                
            </div>
            <div style="font-style:italic;color:#666;font-size:10px;padding:0 0 5 20;">
            Class:&lt;<xsl:value-of select="@class" />&gt;</div>
            <div style="padding:0 0 20 0;font-size:10px;border-bottom:1px solid #999;margin-bottom:1px"><xsl:value-of select="@name"/>&#160;</div>
        </div>
        <xsl:if test="extension-point">
            
            <h3 style="font-size:12px;font-weight:bold">
              <span style="background-image:url({$jsxpluginpath}/images/extPoint.png);background-repeat:no-repeat;padding:0 0 10px 20px;">
              Extension points:
              </span>
            </h3>
            
            <div class="indent" style="padding-left:0px">
                <ul>
                    <xsl:for-each select="extension-point">
                        <li>
                            <div class="jsxdoc_link" onclick="jsx3.html.getJSXParent(this).clickLinkHandler('{@id}','extPoint');" style="text-decoration:underline;cursor:pointer;color:#33F">
                                <xsl:value-of select="@id" />
                            </div>
                        </li>
                    </xsl:for-each>
                </ul>
            </div>
        </xsl:if>
        <xsl:if test="extension">
            <h3 style="font-size:12px;font-weight:bold">
              <span style="background-image:url({$jsxpluginpath}/images/ext.png);background-repeat:no-repeat;padding:0 0 10px 20px;">
              Extensions:
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
                            extend &lt;<span onclick="jsx3.html.getJSXParent(this).clickLinkHandler('{@point}','extPoint');" style="text-decoration:underline;cursor:pointer;color:#33F"><xsl:value-of select="@point" /></span>&gt;</span>
                        </li>
                    </xsl:for-each>
                </ul>
            </div>
        </xsl:if>
        <xsl:if test="resource">

            <h3 style="font-size:12px;font-weight:bold">
              <span style="background-image:url({$jsxpluginpath}/images/resource.png);background-repeat:no-repeat;padding:0 0 10px 20px;">
              Resources:
              </span>
            </h3>
            <div class="indent" style="padding-left:0px">
                <ul>
                    <xsl:for-each select="resource">
                        <li>
                            <span style="color:#33F;font-size:11px;">
                              [<xsl:value-of select="@type"/>]
                            </span>
                            <span>
                                <xsl:value-of select="@id" />
                            </span>
                            <span style="font-style:italic;color:#666;font-size:10px;">
                              (<xsl:value-of select="@path"/>,<xsl:value-of select="@loadtype"/>)
                            </span>
                            <span style="font-size:9px;color:red;vertical-align:super">
                              <xsl:value-of select="@load"/>
                            </span>
                        </li>
                    </xsl:for-each>
                </ul>
            </div>
        </xsl:if>
        <xsl:if test="require">

            <h3 style="font-size:12px;font-weight:bold">
              <span style="background-image:url({$jsxpluginpath}/images/pluginloaded.png);background-repeat:no-repeat;padding:0 0 10px 20px;">
              Requires:
              </span>
            </h3>
            <div class="indent" style="padding-left:0px">
                <ul>
                    <xsl:for-each select="require">
                        <li>
                            <span onclick="jsx3.html.getJSXParent(this).clickLinkHandler('{@id}','plugin');" style="text-decoration:underline;cursor:pointer;color:#33F">
                                <xsl:value-of select="@id" />
                            </span>
                            <span style="font-size:9px;color:red;vertical-align:super;padding-left:3px">
                              <xsl:value-of select="@load"/>
                            </span>
                        </li>
                    </xsl:for-each>
                </ul>
            </div>
        </xsl:if>
    </xsl:template>
</xsl:stylesheet>
