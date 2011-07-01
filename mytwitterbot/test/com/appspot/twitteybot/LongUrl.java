package com.appspot.twitteybot;

import com.google.api.client.util.Key;

public class LongUrl {
    
    @Key
    private String longUrl;

    public String getLongUrl() {
        return longUrl;
    }

    public void setLongUrl(String longUrl) {
        this.longUrl = longUrl;
    }
    
}
