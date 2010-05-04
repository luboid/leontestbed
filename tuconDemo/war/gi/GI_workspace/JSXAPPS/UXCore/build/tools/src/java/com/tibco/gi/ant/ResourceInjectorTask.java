/*
 * Copyright (c) 2001-2009, TIBCO Software Inc.
 * Use, modification, and distribution subject to terms of license.
 */

package com.tibco.gi.ant;

import java.io.File;

import com.tibco.gi.tools.ResourceInjector;
import org.apache.tools.ant.BuildException;
import org.apache.tools.ant.Task;

/**
 * Ant interface for the {@link com.tibco.gi.tools.ResourceInjector} tool.
 *
 * @author Jesse Costello-Good
 */
public class ResourceInjectorTask extends Task {

  private File file;
  private String token;
  private String bundle;
  private String locales;
  private boolean strict = false;

  public void execute() throws BuildException {
    ResourceInjector injector = new ResourceInjector();
    injector.setTextFile(file);
    injector.setBundleResource(bundle);
    injector.setLocaleKeys(locales.split("\\s*,\\s*"));
    injector.setReplacementToken(token);
    injector.setStrict(strict);

    try {
      injector.run();
    } catch (Exception e) {
      e.printStackTrace();
      throw new BuildException(e);
    }
  }

  /**
   * Ant setter method for the JavaScript file into which the resources are injected.
   *
   * @param file  the input JavaScript file.
   * @see ResourceInjector#setTextFile
   */
  public void setFile(File file) {
    this.file = file;
  }

  /**
   * Ant setter method for token in the source file that is replaced with the resource injection.
   *
   * @param token  the replacement token.
   * @see ResourceInjector#setReplacementToken
   */
  public void setToken(String token) {
    this.token = token;
  }

  /**
   * Ant setter method for the name of the resource bundle.
   *
   * @param bundle  the name of the bundle resource.
   * @see ResourceInjector#setBundleResource
   */
  public void setBundle(String bundle) {
    this.bundle = bundle;
  }

  /**
   * Ant setter method for locales to include in the injection. The locales are a comma-separated list of locale
   * keys of the form <code>ll_CC</code>.
   *
   * @param locales  the locales to include in the injection.
   * @see ResourceInjector#setLocaleKeys
   */
  public void setLocales(String locales) {
    this.locales = locales;
  }

  public void setStrict(boolean strict) {
    this.strict = strict;
  }
}
