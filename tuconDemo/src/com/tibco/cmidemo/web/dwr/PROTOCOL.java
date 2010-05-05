package com.tibco.cmidemo.web.dwr;

import java.util.ArrayList;
import java.util.List;
import com.tibco.cmidemo.dao.ColumnConst;
import com.tibco.cmidemo.hibernate.GiProtocol;
import com.tibco.cmidemo.util.DBUtil;
import com.tibco.cmidemo.web.WebAppException;

/**
 * 
 * EnabledProtocol
 * 
 * @author xliu May 4, 2010
 * 
 */
public class PROTOCOL extends DWR {

    public static List<GiProtocol> getEnabledProtocolList(String parentId) throws WebAppException {

        return getList(GiProtocol.class, parentId, ColumnConst.TP_BININDEX);
    }

    public static List<String> getDisabledProtocolList(String parentId) throws WebAppException {

        List<String> disabled = new ArrayList<String>();
        List<String> enabled = new ArrayList<String>();
        
        List<GiProtocol> temp = getEnabledProtocolList(parentId);
        if(temp != null) {
            for (GiProtocol e_prot : temp) {
                enabled.add(e_prot.getName());
            } 
        }
        
        List<String> installed_protList = DBUtil.getInstalledProtList();
        if(installed_protList != null) {
            for (String protName : installed_protList) {
                if (!enabled.contains(protName))
                    disabled.add(protName);
            }
        }

        return disabled;
    }

    public static GiProtocol getProtocol(long id) throws WebAppException {

        return getById(GiProtocol.class, id);
    }

    public static void enableProtocols(Long partnerId, List<String> protNames) throws WebAppException {

        for (String protName : protNames) {
            // leon: default to be 1 which is same as in bc
            GiProtocol prot = new GiProtocol(protName, partnerId, 1);
            save(prot);
        }
    }

    public static void disableProtocols(List<Long> prots) throws WebAppException {

        remove(prots, GiProtocol.class);
    }
}
