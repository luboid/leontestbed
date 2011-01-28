package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.topfinance.cfg.ICfgTransInJetty;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("JETTY")
public class JpaCfgTransInJetty extends JpaCfgTransIn implements ICfgTransInJetty {

}
