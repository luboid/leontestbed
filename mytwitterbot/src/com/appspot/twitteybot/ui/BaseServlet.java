package com.appspot.twitteybot.ui;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;

public abstract class BaseServlet extends HttpServlet {
    public static final long PAGE_SIZE = 3;

    public static final long NO_TXN = -1;

    protected long getTxnId(HttpServletRequest req) {
        return getLongPara(req, Pages.PARAM_TXN_ID, NO_TXN);
    }

    protected long getStart(HttpServletRequest req) {
        return getLongPara(req, Pages.PARAM_START, 0);
    }

    protected long getEnd(HttpServletRequest req) {
        return getLongPara(req, Pages.PARAM_END, PAGE_SIZE);
    }

    protected long getLongPara(HttpServletRequest req, String para, long def) {
        long txnId = def;
        try {
            String t = req.getParameter(para);
            if (t != null && t.length() > 0) {
                txnId = Long.parseLong(t);
            }
        } catch (NumberFormatException e) {
        }
        return txnId;
    }
}
