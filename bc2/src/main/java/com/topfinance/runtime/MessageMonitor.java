package com.topfinance.runtime;

import java.util.HashSet;
import java.util.Set;

public class MessageMonitor {
    
    // TODO make this class thread-safe
    
    private static Set<MessageListener> listeners = new HashSet<MessageListener>();
    
    
    public static void registerListener(MessageListener listener) {
        listeners.add(listener);
    }
    public static void deregisterListener(MessageListener listener) {
        listeners.remove(listener);
    }    
    public static void fireEvent(MessageEvent event) {
        for(MessageListener listener : listeners) {
            listener.onMessage(event);
        }
    }
    
}
