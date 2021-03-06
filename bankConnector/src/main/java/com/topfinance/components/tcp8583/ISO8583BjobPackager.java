package com.topfinance.components.tcp8583;

import org.jpos.iso.IFA_AMOUNT;
import org.jpos.iso.IFA_BINARY;
import org.jpos.iso.IFA_BITMAP;
import org.jpos.iso.IFA_LLCHAR;
import org.jpos.iso.IFA_LLLCHAR;
import org.jpos.iso.IFA_LLNUM;
import org.jpos.iso.IFA_NUMERIC;
import org.jpos.iso.IF_CHAR;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISOFieldPackager;

/**
 * ISO 8583 v1987 ASCII Packager
 *
 * @author apr@cs.com.uy
 * @version $Id: ISO8583BjobPackager.java,v 1.5 2003/05/16 04:15:15 alwyns Exp $
 * @see ISOPackager
 * @see ISOBasePackager
 * @see ISOComponent
 */
public class ISO8583BjobPackager extends ISOBasePackager {
    protected ISOFieldPackager fld[] = {
			new IFA_NUMERIC (  5, "���������"),
			new IFA_BITMAP  ( 16, "BITMAPͼ�����"),
    /*001*/ new IFA_NUMERIC (  0, "��������"),
    /*002*/ new IF_CHAR     ( 24, "���ʺ�"),
    /*003*/ new IFA_LLNUM   (  3, "������"),
    /*004*/ new IFA_NUMERIC ( 12, "���2(�����)"),
    /*005*/ new IFA_NUMERIC ( 12, "���2(�����)"),
    /*006*/ new IFA_NUMERIC ( 12, "���3(�����)"),
    /*007*/ new IFA_NUMERIC ( 10, "�������ں�ʱ��"),
    /*008*/ new IFA_NUMERIC ( 13, ""),
    /*009*/ new IFA_NUMERIC (  3, ""),
    /*010*/ new IFA_NUMERIC ( 16, ""),
    /*011*/ new IFA_NUMERIC (  6, "ϵͳ������ƺ�"),
    /*012*/ new IFA_NUMERIC (  6, "����ʱ��"),
    /*013*/ new IFA_NUMERIC (  4, "��������"),
    /*014*/ new IFA_NUMERIC (  8, "����У��"),
    /*015*/ new IFA_NUMERIC (  8, ""),
    /*016*/ new IFA_NUMERIC (  4, ""),
    /*017*/ new IFA_NUMERIC (  6, ""),
    /*018*/ new IFA_NUMERIC (  4, ""),
    /*019*/ new IFA_NUMERIC (  6, ""),
    /*020*/ new IFA_NUMERIC (  7, ""),
    /*021*/ new IFA_NUMERIC (  7, ""),
    /*022*/ new IFA_NUMERIC (  3, "������뷽ʽ"),
    /*023*/ new IFA_NUMERIC (  3, "��Ŀ����"),
    /*024*/ new IFA_NUMERIC (  8, ""),
    /*025*/ new IFA_NUMERIC (  5, "�����ˮ��"),
    /*026*/ new IFA_NUMERIC (  8, ""),
    /*027*/ new IFA_NUMERIC (  1, "��/���־"),
    /*028*/ new IFA_NUMERIC ( 12, "���"),
    /*029*/ new IFA_AMOUNT  ( 12, "���"),
    /*030*/ new IFA_AMOUNT  ( 12, "���"),
    /*031*/ new IFA_AMOUNT  ( 12, "���"),
    /*032*/ new IFA_AMOUNT  (  5, ""),
    /*033*/ new IFA_LLNUM   (  5, ""),
    /*034*/ new IFA_LLNUM   ( 28, "�ʺ�4"),
    /*035*/ new IFA_LLCHAR  ( 37, "�ڶ��ŵ����"),
    /*036*/ new IFA_LLNUM   ( 24, "����ŵ����"),
    /*037*/ new IFA_LLLCHAR ( 10, "���Ʊ�־"),
    /*038*/ new IF_CHAR     (  3, "ժҪ��"),
    /*039*/ new IF_CHAR     (  4, "��Ӧ����"),
    /*040*/ new IF_CHAR     (  2, "���ֺ�"),
    /*041*/ new IF_CHAR     (  3, "������1"),
    /*042*/ new IF_CHAR     ( 16, "�ʻ�����"),
    /*043*/ new IF_CHAR     ( 10, "ƾ֤��" ),
    /*044*/ new IF_CHAR     (  9, "�ͻ���"),
    /*045*/ new IFA_LLCHAR  ( 76, "��һ�ŵ����"),
    /*046*/ new IFA_LLCHAR  ( 13, "���ʺ�2"),
    /*047*/ new IFA_LLLCHAR (  3, "���ʺ�2"),
    /*048*/ new IFA_LLLCHAR ( 16, "����2"),
    /*049*/ new IFA_LLLCHAR (  2, "����"),
    /*050*/ new IF_CHAR     (118, ""),
    /*051*/ new IF_CHAR     (123, ""   ),
    /*052*/ new IFA_BINARY  ( 16, "����"),
    /*053*/ new IFA_NUMERIC ( 12, ""),
    /*054*/ new IFA_LLLCHAR (139, ""),
    /*055*/ new IFA_LLLCHAR ( 70, ""),
    /*056*/ new IFA_LLLCHAR ( 57, ""),
    /*057*/ new IFA_LLLCHAR (232, ""),
    /*058*/ new IFA_LLLCHAR (172, ""),
    /*059*/ new IFA_LLLCHAR ( 64, ""),
    /*060*/ new IFA_LLLCHAR (  1, ""),
    /*061*/ new IFA_LLLCHAR (  6, "����"),
    /*062*/ new IFA_LLLCHAR (  4, "������2"),
    /*063*/ new IFA_LLLCHAR (  1, "״̬��־"),
    /*064*/ new IFA_BINARY  ( 16, "�ͻ�����"),
    /*065*/ new IFA_BINARY  (  2, ""),
    /*066*/ new IFA_NUMERIC (  1, "״̬2"),
    /*067*/ new IFA_NUMERIC (  2, "״̬4"),
    /*068*/ new IFA_NUMERIC ( 16, "��Ϣ/����1"),
    /*069*/ new IFA_NUMERIC ( 16, "��Ϣ/����2"),
    /*070*/ new IFA_NUMERIC (  3, "Լ�ڴ���"),
    /*071*/ new IFA_NUMERIC (  4, "���"),
    /*072*/ new IFA_NUMERIC (  2, "��������"),
    /*073*/ new IFA_NUMERIC (  8, "����"),
    /*074*/ new IFA_NUMERIC ( 10, "����1"),
    /*075*/ new IFA_NUMERIC ( 10, "����2"),
    /*076*/ new IFA_NUMERIC ( 10, "����3"),
    /*077*/ new IFA_NUMERIC ( 10, "����4"),
    /*078*/ new IFA_NUMERIC ( 10, "����5"),
    /*079*/ new IFA_NUMERIC ( 10, "����6"),
    /*080*/ new IFA_NUMERIC ( 10, "����7"),
    /*081*/ new IFA_NUMERIC ( 10, "�ͻ���"),
    /*082*/ new IFA_NUMERIC (  4, "ǰ̨�ն˺�"),
    /*083*/ new IFA_NUMERIC (  4, "�ļ���¼���"),
    /*084*/ new IFA_NUMERIC ( 12, "ƾ֤��1"),
    /*085*/ new IFA_NUMERIC ( 12, "ƾ֤��2"),
    /*086*/ new IFA_NUMERIC ( 16, "���8"),
    /*087*/ new IFA_NUMERIC ( 16, "���9"),
    /*088*/ new IFA_NUMERIC ( 16, "���10"),
    /*089*/ new IFA_NUMERIC ( 16, "���11"),
    /*090*/ new IFA_NUMERIC (  6, ""),
    /*091*/ new IF_CHAR     (  1, "����"),
    /*092*/ new IF_CHAR     (  2, "״̬3"),
    /*093*/ new IF_CHAR     (  5, "���к�"),
    /*094*/ new IF_CHAR     ( 16, "֧Ʊ����"),
    /*095*/ new IF_CHAR     ( 42, "��ע2"),
    /*096*/ new IFA_BINARY  (  8, "�м��"),
    /*097*/ new IFA_AMOUNT  ( 17, ""),
    /*098*/ new IF_CHAR     ( 25, ""),
    /*099*/ new IFA_LLNUM   (  9, "������"),
    /*100*/ new IFA_LLNUM   (  5, "���ܻ�"),
    /*101*/ new IFA_LLCHAR  ( 20, "��Ч֤��"),
    /*102*/ new IFA_LLCHAR  ( 24, "�ʺ�2"),
    /*103*/ new IFA_LLCHAR  ( 24, "�ʺ�3"),
    /*104*/ new IFA_LLLCHAR ( 52, "��ע��ԭ��"),
    /*105*/ new IFA_LLLCHAR ( 16, " ����"), 
    /*106*/ new IFA_LLLCHAR (  5, ""), 
    /*107*/ new IFA_LLLCHAR (  1, ""),
    /*108*/ new IFA_LLLCHAR (  1, ""),
    /*109*/ new IFA_LLLCHAR (  1, ""),
    /*110*/ new IFA_LLLCHAR (  1, ""),
    /*111*/ new IFA_LLLCHAR (  1, ""), 
    /*112*/ new IFA_LLLCHAR ( 16, ""),
    /*113*/ new IFA_LLLCHAR ( 64, ""),
    /*114*/ new IFA_LLLCHAR (180, ""),
    /*115*/ new IFA_LLLCHAR ( 16, ""),
    /*116*/ new IFA_LLLCHAR (122, ""  ),
    /*117*/ new IFA_LLLCHAR (  1, ""),
    /*118*/ new IFA_LLLCHAR ( 59, ""),
    /*119*/ new IFA_LLLCHAR (270, ""),
    /*120*/ new IFA_LLLCHAR ( 76, ""),
    /*121*/ new IFA_LLLCHAR (  50, ""),
    /*122*/ new IFA_LLLCHAR (  50, ""),
    /*123*/ new IFA_LLLCHAR (  50, ""),
    /*124*/ new IFA_LLLCHAR (  50, ""),
    /*125*/ new IFA_LLLCHAR (  50, ""),
    /*126*/ new IFA_LLLCHAR (  1, ""),
    /*127*/ new IFA_LLLCHAR (  1, ""),
    /*128*/ new IFA_BINARY  (  8, ""),
        };
    public ISO8583BjobPackager() {
        super();
        setFieldPackager(fld);
    }
}
