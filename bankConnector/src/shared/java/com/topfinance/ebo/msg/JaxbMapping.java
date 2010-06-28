package com.topfinance.ebo.msg;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

@Retention(RetentionPolicy.RUNTIME)
public @interface JaxbMapping {
    public String objPath();
}
