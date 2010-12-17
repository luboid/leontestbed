package com.topfinance.cfg.jpa;

import com.topfinance.cfg.ICfgDownOutMH;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("DOWNOUT")
public class JpaCfgDownOutMH extends JpaCfgMsgHandler implements ICfgDownOutMH {



}
