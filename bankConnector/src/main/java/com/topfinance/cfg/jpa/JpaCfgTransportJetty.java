package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.topfinance.cfg.ICfgTransportJetty;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("JETTY")
public class JpaCfgTransportJetty extends JpaCfgTransportInfo implements ICfgTransportJetty {

}
