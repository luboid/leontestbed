package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.topfinance.cfg.ICfgTransport8583;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("8583")
public class JpaCfgTransport8583 extends JpaCfgTransportInfo implements ICfgTransport8583 {

}
