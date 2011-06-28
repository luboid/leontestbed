package com.topfinance.transform.util;

import org.jpos.iso.IFA_BITMAP;
import org.jpos.iso.IFA_LLLCHAR;
import org.jpos.iso.IFA_LLLLCHAR;
import org.jpos.iso.IFA_NUMERIC;
import org.jpos.iso.IFB_LLLHCHAR;
import org.jpos.iso.IF_CHAR;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISOComponent;
import org.jpos.iso.ISOFieldPackager;
import org.jpos.iso.ISOPackager;

/**
 * ISO 8583 v1987 ASCII Packager
 * 
 * @author 
 * @version $Id: ISOIBPSPackager.java,v 1.5 2003/05/16 04:15:15 alwyns Exp $
 * @see ISOPackager
 * @see ISOBasePackager
 * @see ISOComponent
*/
public class ISOIBPSPackager extends ISOBasePackager {
    protected ISOFieldPackager fld[] = {
			new IFA_NUMERIC (  5, "���������"),
			new IFA_BITMAP  ( 16, "BITMAPͼ�����"),
  /*PP001*/ new IF_CHAR(35,"�������к�"),
  /*PP002*/ new IF_CHAR(35,"�տ����к�"),
  /*PP003*/ new IF_CHAR(35,"�տ��˿������к�"),
  /*PP004*/ new IFA_NUMERIC(18,"���ҷ�š����"),
  /*PP005*/ new IF_CHAR(35,"�����������к�"),
  /*PP006*/ new IFA_LLLCHAR(120,"���������"),//ԭ������������60������jpos��֧�����ģ�ֻ����GBK->ISO8859��ת�������г�������һ��
  /*PP007*/ new IF_CHAR(8,"���Ͻ�������"),
  /*PP008*/ new IF_CHAR(60,"���Ͻ��׵���"),
  /*PP009*/ new IFA_LLLLCHAR(512,"���Ͻ���˵��"),//ͬ��
  /*PP010*/ new IFA_LLLLCHAR(4092,"����"),//ͬ��
  /*PP011*/ new IF_CHAR(35,"ҵ����ջ�/����ֱ�Ӳ�����"),
  /*PP012*/ new IF_CHAR(35,"ԭԤ��Ȩ�������"),
  /*PP013*/ new IF_CHAR(35,"֧���������"),
  /*PP014*/ new IF_CHAR(35,"�����˿������к�"),
  /*PP015*/ new IF_CHAR(35,"ҵ������"),
  /*PP016*/ new IFB_LLLHCHAR(2048,"������Ϣ"),
  /*PP017*/ new IF_CHAR(2048,"���У��URL��Ϣ"),
  /*PP018*/ new IF_CHAR(8,"ԭҵ��ί������"),
  /*PP019*/ new IF_CHAR(8,"ί������"),
  /*PP020*/ new IF_CHAR(35,"�����������"),
  /*PP021*/ new IF_CHAR(35,"�������"),
  /*PP022*/ new IF_CHAR(1,"��������"),
  /*PP023*/ new IF_CHAR(8,"ǩԼ����"),
  /*PP024*/ new IFA_LLLLCHAR(512,"ǩԼ˵��"),//ͬ��
  /*PP025*/ new IF_CHAR(35,"Ӧ�����"),
  /*PP026*/ new IFA_NUMERIC(18,"����֧�������"),
  /*PP027*/ new IFA_NUMERIC(18,"���ս������"),
  /*PP028*/ new IFA_NUMERIC(18,"�ۼ�֧�������"),
  /*PP029*/ new IF_CHAR(35,"ǩԼЭ���"),
  /*PP030*/ new IFA_NUMERIC(18,"���ʽ������"),
  /*PP031*/ new IF_CHAR(4,"��֤��ʽ"),
  /*PP032*/ new IF_CHAR(2048,"��֤��Ϣ"),
  /*PP033*/ new IF_CHAR(4,"ԭҵ�����ͺ�"),
  /*PP034*/ new IF_CHAR(2,"ԭҵ����״̬"),
  /*PP035*/ new IF_CHAR(8,"ԭҵ����������"),
  /*PP036*/ new IF_CHAR(2,"ԭҵ�������"),
  /*PP037*/ new IF_CHAR(35,"ҵ�����/ԭ��ѯ��"),
  /*PP038*/ new IF_CHAR(8,"ԭҵ��ί������"),
  /*PP039*/ new IF_CHAR(35,"ԭҵ�����"),
  /*PP040*/ new IF_CHAR(8,"��ϸ��Ŀ"),
  /*PP041*/ new IFA_LLLCHAR (1, "��ϸ�嵥"), 
  /*PP042*/ new IF_CHAR(1,"��/���˱�ʶ"),
  /*PP043*/ new IF_CHAR(4,"ҵ�����ͺ�"),
  /*PP044*/ new IF_CHAR(8, "����ϵͳ���"),
  /*PP045*/ new IF_CHAR(8,"T-1��������"),
 /*PP046*/ new IF_CHAR(8,"T+1��������"),
  /*PP047*/ new IF_CHAR(8,"T+2��������"),
  /*PP048*/ new IF_CHAR(4,"���вο�ʱ��"),
  /*PP049*/ new IF_CHAR(1,"�����ڼ��ձ�־"),
  /*PP050*/ new IF_CHAR(2,"ҵ���ִ״̬"),
  /*PP051*/ new IF_CHAR(8,"���?����ʱ��"),
  /*PP052*/ new IF_CHAR(35,"�������"),
  /*PP053*/ new IF_CHAR(20,"ԭ��������"),
  /*PP054*/ new IF_CHAR(35,"ԭ�������"),
  /*PP055*/ new IF_CHAR(2,"����״̬"),
  /*PP056*/ new IF_CHAR(8,"��������"),
  /*PP057*/ new IF_CHAR(2,"�����"),
  /*PP058*/ new IFA_LLLCHAR (1, "������"),
  /*PP059*/ new IF_CHAR(32,"�������˺�"),
  /*PP060*/ new IF_CHAR(2,"�������˻�����"),
  /*PP061*/ new IFA_LLLCHAR (32, "�տ����˺�"),
  /*PP062*/ new IFA_LLLCHAR(120, "���������"),//ͬ��
  /*PP063*/ new IFA_LLLCHAR (35, "�տ��������к�"),
  /*PP064*/ new IF_CHAR(35,"ԭҵ�����������к�"),
  /*PP065*/ new IF_CHAR(8,"��������"),
  /*PP066*/ new IF_CHAR(4,"ҵ�����ͱ���"),
    /*067*/ new IFA_LLLCHAR (1, ""),
    /*068*/ new IFA_LLLCHAR (1, ""),
    /*069*/ new IFA_LLLCHAR (1, ""),
    /*070*/ new IFA_LLLCHAR (1, ""),
    /*071*/ new IFA_LLLCHAR (1, ""),
    /*072*/ new IFA_LLLCHAR (  1, ""),
    /*073*/ new IFA_LLLCHAR (  1, ""),
    /*074*/ new IFA_LLLCHAR (  1, ""),
    /*075*/ new IFA_LLLCHAR (  1, ""),
    /*076*/ new IFA_LLLCHAR (  1, ""),
    /*077*/ new IFA_LLLCHAR (  1, ""),
    /*078*/ new IFA_LLLCHAR (  1, ""),
    /*079*/ new IFA_LLLCHAR (  50, ""),
    /*080*/ new IFA_LLLCHAR (  50, ""),
    /*081*/ new IFA_LLLCHAR (  50, ""),
    /*082*/ new IFA_LLLCHAR (  50, ""),
    /*083*/ new IFA_LLLCHAR (  50, ""),
    /*084*/ new IFA_LLLCHAR (  50, ""),
    /*085*/ new IFA_LLLCHAR (  50, ""),
    /*086*/ new IFA_LLLCHAR (  50, ""),
    /*087*/ new IFA_LLLCHAR (  50, ""),
    /*088*/ new IFA_LLLCHAR (  50, ""),
    /*089*/ new IFA_LLLCHAR (  50, ""),
    /*090*/ new IFA_LLLCHAR (  50, ""),
    /*091*/ new IFA_LLLCHAR (  50, ""),
    /*092*/ new IFA_LLLCHAR (  50, ""),
    /*093*/ new IFA_LLLCHAR (  50, ""),
    /*094*/ new IFA_LLLCHAR (  50, ""),
    /*095*/ new IFA_LLLCHAR (  50, ""),
    /*096*/ new IFA_LLLCHAR (  50, ""),
    /*097*/ new IFA_LLLCHAR (  50, ""),
    /*098*/ new IFA_LLLCHAR (  50, ""),
    /*099*/ new IFA_LLLCHAR (  50, ""),
    /*100*/ new IFA_LLLCHAR (  50, ""),
    /*101*/ new IFA_LLLCHAR (  50, ""),
    /*102*/ new IFA_LLLCHAR (  50, ""),
    /*103*/ new IFA_LLLCHAR (  50, ""),
    /*104*/ new IFA_LLLCHAR (  50, ""),
    /*105*/ new IFA_LLLCHAR (  50, ""), 
    /*106*/ new IFA_LLLCHAR (  50, ""), 
    /*107*/ new IFA_LLLCHAR (  50, ""),
    /*108*/ new IFA_LLLCHAR (  50, ""),
    /*109*/ new IFA_LLLCHAR (  50, ""),
    /*110*/ new IFA_LLLCHAR (  50, ""),
    /*111*/ new IFA_LLLCHAR (  50, ""), 
    /*112*/ new IFA_LLLCHAR (  50, ""),
    /*113*/ new IFA_LLLCHAR (  50, ""),
    /*114*/ new IFA_LLLCHAR (  50, ""),
    /*115*/ new IFA_LLLCHAR (  50, ""),
    /*116*/ new IFA_LLLCHAR (  50, ""),
    /*117*/ new IFA_LLLCHAR (  50, ""),
    /*118*/ new IFA_LLLCHAR (  50, ""),
    /*119*/ new IFA_LLLCHAR (  50, ""),
    /*120*/ new IFA_LLLCHAR (  50, ""),
    /*121*/ new IFA_LLLCHAR (  50, ""),
    /*122*/ new IFA_LLLCHAR (  50, ""),
    /*123*/ new IFA_LLLCHAR (  50, ""),
    /*124*/ new IFA_LLLCHAR (  50, ""),
    /*125*/ new IFA_LLLCHAR (  50, ""),
    /*126*/ new IFA_LLLCHAR (  50, ""),
    /*127*/ new IFA_LLLCHAR (  50, ""),
    /*128*/ new IFA_LLLCHAR (  50, "")
   };
    
    // used within package, don't directly use it by runtime
    ISOIBPSPackager() {
        super();
        setFieldPackager(fld);
    }
}
