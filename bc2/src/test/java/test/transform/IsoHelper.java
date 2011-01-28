package test.transform;

import java.lang.reflect.Constructor;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISOFieldPackager;
import org.jpos.iso.ISOMsg;

import test.transform.IsoSchema.IsoField;

import com.topfinance.cfg.ICfgFormat8583;
import com.topfinance.util.Iso8583Util;

public class IsoHelper {
    
    private static void debug(String s) {
        System.out.println(s);
    }
    
    public static String pack(ISOBasePackager packager, IsoObj obj) {

        try {
//            ISOMsg m = new ISOMsg();
//            m.setPackager(packager);
        	
        	ISOMsg m = Iso8583Util.emptyMsg(packager);
        	
            for(int i=0;i<=128;i++) {
                String v = BeanUtils.getProperty(obj, "f"+i);
                if(v!=null) {
                    m.set(i, v);
                }
            }
            
            debug("f95="+obj.getF95());
            debug("f96="+obj.getF96());
            debug("f97="+obj.getF97());
            debug("f98="+obj.getF98());
            
            byte[] raw = m.pack();
            System.out.println("b=" + new String(raw, "UTF-8") + "..");

            String res = Iso8583Util.packMsg(m);
            
            return res;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }
    
    public static String pack(IsoSchema schema, IsoObj obj) {

        try {
//            ISOMsg m = new ISOMsg();
//            m.setPackager(toPackager(schema));
        	ISOMsg m = Iso8583Util.emptyMsg(toPackager(schema));
            
            for(int i=0;i<=128;i++) {
                String v = BeanUtils.getProperty(obj, "f"+i);
                if(v!=null) {
                    m.set(i, v);
                }
            }

            byte[] raw = m.pack();
            System.out.println("b=" + new String(raw, "UTF-8") + "..");

            String res = Iso8583Util.packMsg(m);
            
            return res;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }
    
    
    
    public static IsoObj parse(ISOMsg isomsg) {
        try {
            IsoObj res = new IsoObj();

            // TODO maxnumber decided by schema?
            for (int i = 0; i <=128; i++) {
                String v = Iso8583Util.getField(isomsg, i);
                if (v != null) {
                    debug("in IsoHelper.parse(): Msg[" + i + "]=" + v);
                    BeanUtils.setProperty(res, "f" + i, v);
                }
            }

            return res;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }
    public static IsoObj parse(IsoSchema schema, String s) {
        try {
            IsoObj res = new IsoObj();

            ISOMsg unpacked = Iso8583Util.unpackMsg(s, toPackager(schema));

            // TODO maxnumber decided by schema?
            for (int i = 0; i <=128; i++) {
                String v = Iso8583Util.getField(unpacked, i);
                if (v != null) {
                    debug("in IsoHelper.parse(): Msg[" + i + "]=" + v);
                    BeanUtils.setProperty(res, "f" + i, v);
                }
            }

            return res;
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new RuntimeException(ex);
        }
    }
    
	public static String getField(IsoObj obj, String pos) {
		try{ 
			String res = BeanUtils.getProperty(obj, "f"+pos);
			return res;
    	} catch (Exception ex) {
    		ex.printStackTrace();
    		throw new RuntimeException(ex);
    	}		
    }
    
    public static ISOBasePackager toPackager(IsoSchema schema) {
        List<ISOFieldPackager> fields = new ArrayList<ISOFieldPackager>();

        for (IsoSchema.IsoField f : schema.getFields()) {

            ISOFieldPackager field = null;

            try {
                Class clazz = Class.forName("org.jpos.iso." + f.getType());
                Constructor con = clazz.getDeclaredConstructor(new Class[] {
                        int.class, String.class });
                field = (ISOFieldPackager) con.newInstance(new Object[] {
                        f.getLength(), f.getDesc() });
//            } catch (SecurityException e) {
//                e.printStackTrace();
//            } catch (IllegalArgumentException e) {
//                e.printStackTrace();
//            } catch (ClassNotFoundException e) {
//                e.printStackTrace();
//            } catch (NoSuchMethodException e) {
//                e.printStackTrace();
//            } catch (InstantiationException e) {
//                e.printStackTrace();
//            } catch (IllegalAccessException e) {
//                e.printStackTrace();
//            } catch (InvocationTargetException e) {
//                e.printStackTrace();
//            }
            } catch (Exception ex) {
                ex.printStackTrace();
                throw new RuntimeException(ex);
            }
            fields.add(field);

        }
        
        ISOBasePackager packager = new ISOBasePackager() {};
        packager.setFieldPackager(fields.toArray(new ISOFieldPackager[0]));
        
        return packager;
        
    }
    
    public static IsoSchema fromConfig(List<ICfgFormat8583> list) {
    	IsoSchema schema = new IsoSchema();
    	schema.getFields().clear();
    	for(ICfgFormat8583 f8583 : list) {
    		schema.getFields().add(new IsoField(f8583.getType(),f8583.getLength(),f8583.getDesc()));
    	}
    	
    	return schema;
    }
    
}   
