package test;

public class VerifyGwXML {
    public void testGwXml() {
        
        com.cnaps2.xml.iso20022.pacs.v00800102.Document doc101 = new com.cnaps2.xml.iso20022.pacs.v00800102.Document();
        doc101.getFiToFICstmrCdtTrf();
        
        com.cnaps2.xml.iso20022.pacs.v00200103.Document doc102 = new com.cnaps2.xml.iso20022.pacs.v00200103.Document();
        doc102.getFiToFIPmtStsRpt();
        
        
    }
}
