package com.topfinance.cfg.jpa;

import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import com.topfinance.cfg.ICfgUpInMH;

@SuppressWarnings("serial")
@Entity
@DiscriminatorValue("UPIN")
public class JpaCfgUpInMH extends JpaCfgMsgHandler implements ICfgUpInMH {




}
