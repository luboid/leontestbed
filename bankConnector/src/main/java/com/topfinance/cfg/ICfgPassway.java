package com.topfinance.cfg;

import java.util.List;

public interface ICfgPassway extends ICfgItem{
    
    public ICfgNode getHostNode();
    public void setHostNode(ICfgNode node);
    
    public ICfgNode getPartnerNode();
    public void setPartnerNode(ICfgNode node);
    
//    public List<ICfgProtocolBinding> getListProtocolBinding();
//    public void setListProtocolBinding(List<ICfgProtocolBinding> listProtocolBinding);
//    
}
