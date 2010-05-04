<?xml version="1.0" encoding="UTF-8"?>
<!--
  ~ Copyright (c) 2001-2009, TIBCO Software Inc.
  ~ Use, modification, and distribution subject to terms of license.
  -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:msxsl="urn:schemas-microsoft-com:xslt">

  <xsl:output method="xml" omit-xml-declaration="yes"/>

  <xsl:param name="jsxtabindex">0</xsl:param>
  <xsl:param name="jsxleftbuffer">36</xsl:param>
  <xsl:param name="jsxselectedimage"></xsl:param>
  <xsl:param name="jsxtransparentimage"></xsl:param>
  <xsl:param name="jsxsubmenuimage"></xsl:param>
  <xsl:param name="jsxdragtype">JSX_GENERIC</xsl:param>
  <xsl:param name="jsxrootid">jsxroot</xsl:param>
  <xsl:param name="jsxid">jsxroot</xsl:param>
  <xsl:param name="jsxsortpath"></xsl:param>
  <xsl:param name="jsxsortdirection">ascending</xsl:param>
  <xsl:param name="jsxsorttype">text</xsl:param>
  <xsl:param name="jsxpath"></xsl:param>
  <xsl:param name="jsxpathapps"></xsl:param>
  <xsl:param name="jsxpathprefix"></xsl:param>
  <xsl:param name="jsxappprefix"></xsl:param>
  <xsl:param name="jsxdisableescape">no</xsl:param>
  <xsl:param name="jsxmode">0</xsl:param>
  <xsl:param name="jsxkeycodes"></xsl:param>
  <xsl:param name="jsx_img_resolve">1</xsl:param>
  <xsl:param name="jsxtitle"></xsl:param>
  <xsl:param name="jsxasyncmessage"></xsl:param>

  <xsl:template match="/">
    <JSX_FF_WELLFORMED_WRAPPER>
      <xsl:choose>
        <xsl:when test="$jsxasyncmessage and $jsxasyncmessage!=''">
          <xsl:value-of select="$jsxasyncmessage"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:apply-templates select="//*[@jsxid=$jsxrootid]"/>
        </xsl:otherwise>
      </xsl:choose>
    </JSX_FF_WELLFORMED_WRAPPER>
  </xsl:template>

  <xsl:template match="*">
    <xsl:param name="mystyle" select="@jsxstyle"/>

    <xsl:variable name="jsxleftbuffer_sel">
      <xsl:text>left:</xsl:text>
      <xsl:choose>
        <xsl:when test="$jsxleftbuffer &gt; 12">
          <xsl:value-of select="$jsxleftbuffer - 11"/>
        </xsl:when>
        <xsl:otherwise>
          <xsl:text>-9</xsl:text>
        </xsl:otherwise>
      </xsl:choose>
      <xsl:text>px</xsl:text>
    </xsl:variable>
    <xsl:variable name="jsxleftbuffer_txt">
      <xsl:text>padding-left:</xsl:text><xsl:value-of select="$jsxleftbuffer"/><xsl:text>px</xsl:text>
    </xsl:variable>

    <xsl:for-each select="record">
      <xsl:sort select="@*[name()=$jsxsortpath]" data-type="{$jsxsorttype}" order="{$jsxsortdirection}"/>
      <xsl:choose>
        <xsl:when test="@jsxdivider[.='1']">
          <div class="jsx30menu_{$jsxmode}_div" jsxtype="Divider" jsxdisabled="1">
            <div>&#160;</div>
          </div>
        </xsl:when>
      </xsl:choose>
      <div id="{$jsxid}_{@jsxid}" tabindex="{$jsxtabindex}" jsxid="{@jsxid}">
        <xsl:choose>
          <xsl:when test="@jsxdisabled='1' or (record and not(record[not(@jsxdisabled='1')]))">
            <xsl:attribute name="class">jsx30menu_<xsl:value-of select="$jsxmode"/>_itemdis</xsl:attribute>
          </xsl:when>
          <xsl:otherwise>
            <xsl:attribute name="class">jsx30menu_<xsl:value-of select="$jsxmode"/>_item</xsl:attribute>
          </xsl:otherwise>
        </xsl:choose>
        <xsl:choose>
          <xsl:when test="@jsxtip">
            <xsl:attribute name="title">
              <xsl:value-of select="@jsxtip"/>
            </xsl:attribute>
          </xsl:when>
        </xsl:choose>
        <xsl:if test="@jsxdisabled='1'">
          <xsl:attribute name="jsxdisabled">1</xsl:attribute>
        </xsl:if>
        <xsl:attribute name="jsxtype">
          <xsl:choose>
            <xsl:when test="record or (@jsxlazy > 0)">Book</xsl:when>
            <xsl:otherwise>Leaf</xsl:otherwise>
          </xsl:choose>
        </xsl:attribute>
        <xsl:choose>
          <xsl:when test="@jsximg">
            <xsl:variable name="src1">
              <xsl:choose>
                <xsl:when test="$jsx_img_resolve='1'"><xsl:apply-templates select="@jsximg" mode="uri-resolver"/></xsl:when>
                <xsl:otherwise><xsl:value-of select="@jsximg"/></xsl:otherwise>
              </xsl:choose>
            </xsl:variable>
            <img style="position:absolute;left:2px;top:2px;width:16px;height:16px;" src="{$src1}"/>
          </xsl:when>
        </xsl:choose>
        <xsl:choose>
          <xsl:when test="@jsxselected = 1">
            <img class="jsx30menu_{$jsxmode}_sel" src="{$jsxselectedimage}" style="{$jsxleftbuffer_sel}"/>
          </xsl:when>
        </xsl:choose>
        <xsl:choose>
          <xsl:when test="record or (@jsxlazy > 0)">
            <div class="jsx30menu_{$jsxmode}_kc" style="{$mystyle};{$jsxleftbuffer_txt}">
              <table class="jsx30menu_{$jsxmode}_kct">
                <tr>
                  <td class="name">
                    <xsl:apply-templates select="." mode="jsxtext"/>
                  </td>
                  <td class="keycode" style="background-image:url({$jsxsubmenuimage});background-position:right 2px;background-repeat:no-repeat;">&#160;</td>
                </tr>
              </table>
            </div>
          </xsl:when>
          <xsl:otherwise>
            <div class="jsx30menu_{$jsxmode}_kc" style="{$mystyle};{$jsxleftbuffer_txt}">
              <table class="jsx30menu_{$jsxmode}_kct">
                <tr>
                  <td class="name">
                    <xsl:apply-templates select="." mode="jsxtext"/>
                  </td>
                  <xsl:if test="@jsxkeycode">
                    <td class="keycode">
                      <xsl:apply-templates select="." mode="keycode"/>
                    </td>
                  </xsl:if>
                </tr>
              </table>
            </div>
          </xsl:otherwise>
        </xsl:choose>
      </div>
    </xsl:for-each>
  </xsl:template>

  <xsl:template match="record" mode="keycode">
    <xsl:variable name="after" select="substring-after($jsxkeycodes, concat(@jsxid,':'))"/>
    <xsl:choose>
      <xsl:when test="$after">
        <xsl:value-of select="substring-before($after, '|')"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="@jsxkeycode"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="record" mode="jsxtext">
    <xsl:choose>
      <xsl:when test="$jsxdisableescape='yes'">
        <xsl:apply-templates select="@jsxtext" mode="disable-output-escp"/>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="@jsxtext"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <!-- From jsxlib.xsl -->
  <xsl:template match="* | @*" mode="uri-resolver">
    <xsl:param name="uri" select="."/>
    <xsl:choose>
      <xsl:when test="starts-with($uri,'JSX/')">
        <xsl:value-of select="concat($jsxpath, $uri)"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'JSXAPPS/')">
        <xsl:value-of select="concat($jsxpathapps, $uri)"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'GI_Builder/')">
        <xsl:value-of select="concat($jsxpath, $uri)"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsx:///')">
        <xsl:value-of select="concat($jsxpath, 'JSX/', substring($uri,8))"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsx:/')">
        <xsl:value-of select="concat($jsxpath, 'JSX/', substring($uri,6))"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsxapp:///')">
        <xsl:value-of select="concat($jsxappprefix, substring($uri,11))"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsxapp://')">
        <xsl:value-of select="concat($jsxpathapps, substring($uri,10))"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsxapp:/')">
        <xsl:value-of select="concat($jsxappprefix, substring($uri,9))"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsxuser:///')">
        <xsl:value-of select="concat($jsxpathapps, substring($uri,11))"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsxuser:/')">
        <xsl:value-of select="concat($jsxpathapps, substring($uri,9))"/>
      </xsl:when>
      <xsl:when test="starts-with($uri,'jsxaddin://')">
        <!-- cannot resolve addin links in XSL -->
        <xsl:value-of select="$uri"/>
        <!---->
      </xsl:when>
      <xsl:when test="starts-with($uri,'/')">
        <xsl:value-of select="$uri"/>
      </xsl:when>
      <xsl:when test="contains($uri,'://')">
        <xsl:value-of select="$uri"/>
      </xsl:when>
      <xsl:when test="not($jsxpathprefix='') and not(starts-with($uri, $jsxpathprefix))">
        <xsl:apply-templates select="." mode="uri-resolver">
          <xsl:with-param name="uri" select="concat($jsxpathprefix, $uri)"/>
        </xsl:apply-templates>
      </xsl:when>
      <xsl:otherwise>
        <xsl:value-of select="$uri"/>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>

  <xsl:template match="* | @*" mode="disable-output-escp">
    <xsl:call-template name="disable-output-escp">
      <xsl:with-param name="value" select="."/>
    </xsl:call-template>
  </xsl:template>

  <xsl:template name="disable-output-escp">
    <xsl:param name="value" select="."/>
    <xsl:choose>
      <xsl:when test="function-available('msxsl:node-set')">
        <xsl:value-of disable-output-escaping="yes" select="$value"/>
      </xsl:when>
      <xsl:otherwise>
        <span class="disable-output-escp"><xsl:value-of select="$value"/></span>
      </xsl:otherwise>
    </xsl:choose>
  </xsl:template>
  
</xsl:stylesheet>
