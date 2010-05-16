package com.topfinance.components.named;

import org.apache.activemq.camel.component.ActiveMQComponent;
import org.apache.activemq.camel.component.ActiveMQConfiguration;
import org.apache.camel.component.jms.JmsConfiguration;

public class NamedAMQComponent extends ActiveMQComponent {
    @Override
    protected JmsConfiguration createConfiguration() {
        return new NamedAMQConfiguration();
    }
}
