======================================================================
UXCore - Building

======================================================================
Requirements

  Compiling the Uxcore requires the following software:

  * JDK 1.5 or newer (http://java.sun.com)
  * Apache Ant 1.6.5 or newer (http://ant.apache.org)

======================================================================
Building

  Ant is used to create a Uxcore build. The main build
  file is build/build.xml. The following command builds Uxcore
  with the default build parameters:

  %> ant

  By default this creates a build in ../dist/. This directory can
  by overridden with the build.loc.dist build parameter, for example:

  %> ant -Dbuild.loc.dist=../myuxcore


======================================================================
Obfuscation: 
     each source JavaScript is parsed and re-serialized
     to remove comments and whitespace, rename local variables and
     method parameters, and obfuscate the names of any JavaScript
     members marked with relevant metadata. This step is accomplished
     using the com.tibco.gi.tools.Obfuscator Java tool.

metadata include the following:
 @jsxobf-clobber, @jsxobf-clobber-shared, @jsxobf-bless: 
 these metadata tags affect the JavaScript declaration that immediately follows the tag. 
 The tag should be contained in a JavaScript line or range comment. 
 If any text follows the tag inside the comment on the same line, 
 then this text is taken as a white space-separated list of names to apply the command to. 
 Otherwise, immediately following the range comment should be a JavaScript statement setting 
 the target of the tag to some value. The name that is affected is the last JavaScript 
 identifier before the equals sign. That name will be clobber (or blessed if @jsxobf-bless) anywhere it 
 appears in the script context in which the tag appears. The name is also clobbered/blessed 
 even if it is in a JavaScript string but only if is equal to the entire string and not if 
 it is only a subsequence of the string. If a name needs to be clobbered and renamed to the 
 same value in more than one script context, then the -shared version of the tag should be used. 
 The current implementation of the obfuscator renames every name as though it were shared but future 
 versions may honor the difference between the shared and unshared names. 
 
======================================================================
For more infomation about the Obfuscation tools please read the BUILD
in 'http://svn.tibco.com/svn/gi/trunk/gi/build/'
