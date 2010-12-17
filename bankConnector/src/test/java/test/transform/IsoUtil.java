package test.transform;

import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.beanutils.BeanUtils;
import org.jpos.iso.ISOBasePackager;
import org.jpos.iso.ISOFieldPackager;
import org.jpos.iso.ISOMsg;

public class IsoUtil {
    
    public static String pack(IsoSchema schema, IsoObj obj) {

        try {

            List<ISOFieldPackager> fields = new ArrayList<ISOFieldPackager>();

            for (IsoSchema.IsoField f : schema.getFields()) {

                ISOFieldPackager field = null;

                try {
                    Class clazz = Class.forName("org.jpos.iso." + f.getType());
                    Constructor con = clazz.getDeclaredConstructor(new Class[] {
                            int.class, String.class });
                    field = (ISOFieldPackager) con.newInstance(new Object[] {
                            f.getLength(), f.getDesc() });
                } catch (SecurityException e) {
                    e.printStackTrace();
                } catch (IllegalArgumentException e) {
                    e.printStackTrace();
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                } catch (NoSuchMethodException e) {
                    e.printStackTrace();
                } catch (InstantiationException e) {
                    e.printStackTrace();
                } catch (IllegalAccessException e) {
                    e.printStackTrace();
                } catch (InvocationTargetException e) {
                    e.printStackTrace();
                }
                fields.add(field);

            }

            ISOMsg m = new ISOMsg();

            ISOBasePackager packager = new ISOBasePackager() {};
            packager.setFieldPackager(fields.toArray(new ISOFieldPackager[0]));
            m.setPackager(packager);
            
            for(int i=0;i<6;i++) {
                String v = BeanUtils.getProperty(obj, "f"+i);
                if(v!=null) {
                    m.set(i, v);
                }
            }
            

            byte[] b = m.pack();
            System.out.println("b=" + new String(b, "UTF-8") + "..");

            return new String(b, "UTF-8");
        } catch (Exception ex) {
            throw new RuntimeException(ex);
        }
    }
    
    public static IsoObj parse(String s) {
        return null;
    }
    
    
}   
