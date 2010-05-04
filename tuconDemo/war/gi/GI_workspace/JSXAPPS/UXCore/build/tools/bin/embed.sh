#!/bin/sh
#
# Command line interface for com.tibco.gi.tools.FileEmbedder
#

PREFIX=`dirname "$0"`

# Support running from source distribution directory structure or
# package directory structure
if test -f "$PREFIX/lib/jsx-tools.jar"; then
  CLASSPATH="${PREFIX}/lib/jsx-tools.jar"
  CLASSPATH="${CLASSPATH}:${PREFIX}/lib/args4j-2.0.11.jar"
  CLASSPATH="${CLASSPATH}:${PREFIX}/lib/xalan-serializer-2.7.jar"
else
  if test -f "${PREFIX}/../jsx-tools.jar"; then
    CLASSPATH="${PREFIX}/../jsx-tools.jar"
    CLASSPATH="${CLASSPATH}:${PREFIX}/../lib/args4j/args4j-2.0.11.jar"
    CLASSPATH="${CLASSPATH}:${PREFIX}/../lib/xml/xalan-serializer-2.7.jar"
  else
    echo "Could not find jsx-tools.jar"
    exit 1
  fi
fi

java -classpath "$CLASSPATH" com.tibco.gi.cli.FileEmbedderCLI "$@"
