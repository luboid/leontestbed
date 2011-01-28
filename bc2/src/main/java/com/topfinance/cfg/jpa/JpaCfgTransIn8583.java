package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.topfinance.cfg.ICfgTransIn8583;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("8583")
public class JpaCfgTransIn8583 extends JpaCfgTransIn implements ICfgTransIn8583 {

}
