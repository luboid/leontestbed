package com.topfinance.cfg;

import java.io.File;
import java.io.FileWriter;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

import junit.framework.TestCase;

import org.apache.commons.io.IOUtils;
import org.simpleframework.xml.ElementMap;
import org.simpleframework.xml.Serializer;
import org.simpleframework.xml.core.Persister;
import org.simpleframework.xml.strategy.CycleStrategy;
import org.simpleframework.xml.strategy.Strategy;

import com.topfinance.cfg.xml.OmCfgPortIn;
import com.topfinance.cfg.xml.OmCfgNode;
import com.topfinance.cfg.xml.OmCfgOperation;
import com.topfinance.cfg.xml.OmCfgPortOut;
import com.topfinance.cfg.xml.OmCfgProtocol;
import com.topfinance.cfg.xml.OmCfgRouteRule;
import com.topfinance.cfg.xml.OmCfgTransInAMQ;
import com.topfinance.cfg.xml.OmCfgTransInJetty;
import com.topfinance.cfg.xml.XmlCfgReader;
import com.topfinance.plugin.cnaps2.AckRoot;
import com.topfinance.runtime.OpInfo;

public class TestDummy extends TestCase implements CfgConstants {
	public static String PREFIX_HOST_AMQ = "amqhost";
	public static String BROKER_URL_HOST = "tcp://localhost:61610";

	public static String PREFIX_PARTNER_AMQ = "amqpartner";
	public static String BROKER_URL_PARTNER = "tcp://localhost:61111";

	// TODO this has to be "jetty", refering to
	// JettyHttpComponent.createEndpoint().
	// This has to be regarded as a bug which deny usage of non-default schema
	// name
	public static String PREFIX_HOST_JETTY = "jettyhost";
	public static String HTTPURL_UP_IN_ECHO = "http://127.0.0.1:6060/echo";

	public static String QUEUE_UP_IN_ECHO = "queue:up_in_echo";

	public static String QUEUE_UP_OUT_ECHO = "queue:up_out_echo";

	// 1
	public static String OPERATION_101 = "ibps.101.001.01";
	public static String OPERATION_102 = "ibps.102.001.01";
	// 客户发起汇兑业务报文
	public static String OPERATION_111 = "hvps.111.001.01";
	public static String OPERATION_112 = "hvps.112.001.01";
	public static String OPERATION_141 = "hvps.141.001.01";
	public static String OPERATION_142 = "hvps.142.001.01";
	public static String OPERATION_143 = "hvps.143.001.01";
	public static String OPERATION_144 = "hvps.144.001.01";
	public static String OPERATION_151 = "hvps.151.001.01";
	public static String OPERATION_152 = "hvps.152.001.01";
	public static String OPERATION_153 = "hvps.153.001.01";

	public static String OPERATION_121 = "beps.121.001.01";
	public static String OPERATION_122 = "beps.122.001.01";
	public static String OPERATION_123 = "beps.123.001.01";

	public static String OPERATION_124 = "beps.124.001.01";
	public static String OPERATION_125 = "beps.125.001.01";
	public static String OPERATION_127 = "beps.127.001.01";
	public static String OPERATION_128 = "beps.128.001.01";
	public static String OPERATION_130 = "beps.130.001.01";
	public static String OPERATION_131 = "beps.131.001.01";
	public static String OPERATION_132 = "beps.132.001.01";
	public static String OPERATION_133 = "beps.133.001.01";
	public static String OPERATION_134 = "beps.134.001.01";

	// 3
	public static String OPERATION_303 = "ccms.303.001.02";
	public static String OPERATION_307 = "ccms.307.001.02";
	public static String OPERATION_308 = "ccms.308.001.02";
	public static String OPERATION_310 = "ccms.310.001.01";
	public static String OPERATION_311 = "ccms.311.001.01";
	public static String OPERATION_312 = "ccms.312.001.01";
	public static String OPERATION_313 = "ccms.313.001.01";
	public static String OPERATION_314 = "ccms.314.001.01";
	public static String OPERATION_315 = "ccms.315.001.01";
	public static String OPERATION_316 = "ccms.316.001.01";
	public static String OPERATION_317 = "ccms.317.001.01";
	public static String OPERATION_318 = "ccms.318.001.01";
	public static String OPERATION_319 = "ccms.319.001.01";
	public static String OPERATION_350 = "nets.350.001.01";
	public static String OPERATION_351 = "nets.351.001.01";
	public static String OPERATION_353 = "nets.353.001.01";
	public static String OPERATION_354 = "nets.354.001.01";
	public static String OPERATION_355 = "nets.355.001.01";
	public static String OPERATION_356 = "nets.356.001.01";
	public static String OPERATION_357 = "saps.357.001.01";
	public static String OPERATION_358 = "saps.358.001.01";
	public static String OPERATION_359 = "saps.359.001.01";
	public static String OPERATION_360 = "saps.360.001.01";
	public static String OPERATION_361 = "saps.361.001.01";
	public static String OPERATION_362 = "saps.362.001.01";
	public static String OPERATION_363 = "saps.363.001.01";
	public static String OPERATION_364 = "saps.364.001.01";
	public static String OPERATION_365 = "saps.365.001.01";
	public static String OPERATION_366 = "saps.366.001.01";
	public static String OPERATION_367 = "saps.367.001.01";
	public static String OPERATION_368 = "saps.368.001.01";
	public static String OPERATION_369 = "saps.369.001.01";
	public static String OPERATION_370 = "saps.370.001.01";
	public static String OPERATION_371 = "saps.371.001.01";
	public static String OPERATION_372 = "saps.372.001.01";
	public static String OPERATION_373 = "saps.373.001.01";
	public static String OPERATION_374 = "saps.374.001.01";
	public static String OPERATION_375 = "saps.375.001.01";
	public static String OPERATION_376 = "nets.376.001.01";
	public static String OPERATION_377 = "nets.377.001.01";
	public static String OPERATION_381 = "beps.381.001.01";
	public static String OPERATION_382 = "beps.382.001.01";
	public static String OPERATION_383 = "beps.383.001.01";
	public static String OPERATION_384 = "beps.384.001.01";
	public static String OPERATION_385 = "beps.385.001.01";
	public static String OPERATION_386 = "beps.386.001.01";
	public static String OPERATION_387 = "beps.387.001.01";
	public static String OPERATION_388 = "beps.388.001.01";
	public static String OPERATION_391 = "beps.391.001.01";
	public static String OPERATION_392 = "beps.392.001.01";
	public static String OPERATION_393 = "beps.393.001.01";
	public static String OPERATION_394 = "beps.394.001.01";
	public static String OPERATION_395 = "beps.395.001.01";
	public static String OPERATION_397 = "beps.397.001.01";
	public static String OPERATION_398 = "beps.398.001.01";

	// 4
	public static String OPERATION_401 = "beps.401.001.01";
	public static String OPERATION_402 = "beps.402.001.01";
	public static String OPERATION_403 = "beps.403.001.01";
	public static String OPERATION_404 = "beps.404.001.01";
	public static String OPERATION_405 = "nets.405.001.01";
	public static String OPERATION_406 = "nets.406.001.01";
	public static String OPERATION_407 = "nets.407.001.01";
	public static String OPERATION_411 = "beps.411.001.01";
	public static String OPERATION_412 = "beps.412.001.01";
	public static String OPERATION_413 = "beps.413.001.01";
	public static String OPERATION_414 = "beps.414.001.01";
	public static String OPERATION_415 = "beps.415.001.01";
	public static String OPERATION_416 = "beps.416.001.01";
	public static String OPERATION_417 = "beps.417.001.01";

	// 6
	public static String OPERATION_601 = "saps.601.001.01";
	public static String OPERATION_603 = "saps.601.001.02";
	// 清算回执报文<saps.604.001.01>
	public static String OPERATION_604 = "saps.604.001.01";
	public static String OPERATION_606 = "saps.606.001.01";
	public static String OPERATION_607 = "saps.607.001.01";
	public static String OPERATION_608 = "pbcs.608.001.01";
	public static String OPERATION_609 = "saps.609.001.01";
	public static String OPERATION_610 = "saps.610.001.01";
	public static String OPERATION_611 = "saps.611.001.01";
	public static String OPERATION_612 = "saps.612.001.01";
	public static String OPERATION_613 = "saps.613.001.01";
	public static String OPERATION_614 = "saps.614.001.01";
	public static String OPERATION_615 = "saps.615.001.01";
	public static String OPERATION_616 = "saps.616.001.01";
	public static String OPERATION_617 = "nets.617.001.01";
	public static String OPERATION_618 = "nets.618.001.01";

	// 7
	public static String OPERATION_710 = "hvps.710.001.01";
	public static String OPERATION_711 = "hvps.711.001.01";
	public static String OPERATION_712 = "hvps.712.001.01";
	public static String OPERATION_713 = "hvps.713.001.01";
	public static String OPERATION_714 = "hvps.714.001.01";
	public static String OPERATION_715 = "hvps.715.001.01";
	public static String OPERATION_716 = "hvps.716.001.01";
	public static String OPERATION_717 = "hvps.717.001.01";
	public static String OPERATION_720 = "beps.720.001.01";
	public static String OPERATION_721 = "beps.721.001.01";
	public static String OPERATION_722 = "beps.722.001.01";
	public static String OPERATION_723 = "beps.723.001.01";
	public static String OPERATION_724 = "beps.724.001.01";
	public static String OPERATION_725 = "beps.725.001.01";
	public static String OPERATION_726 = "beps.726.001.01";
	public static String OPERATION_730 = "saps.730.001.01";
	public static String OPERATION_731 = "saps.731.001.01";
	public static String OPERATION_732 = "saps.732.001.01";
	public static String OPERATION_733 = "saps.733.001.01";
	public static String OPERATION_734 = "saps.734.001.01";
	public static String OPERATION_735 = "saps.735.001.01";
	public static String OPERATION_736 = "saps.736.001.01";
	public static String OPERATION_737 = "saps.737.001.01";
	public static String OPERATION_738 = "saps.738.001.01";

	// 8
	public static String OPERATION_801 = "ccms.801.001.02";
	public static String OPERATION_803 = "ccms.803.001.02";
	public static String OPERATION_805 = "ccms.805.001.02";
	public static String OPERATION_806 = "ccms.806.001.02";
	public static String OPERATION_807 = "ccms.807.001.02";
	public static String OPERATION_809 = "ccms.809.001.02";
	public static String OPERATION_811 = "ccms.811.001.01";

	// 9
	public static String OPERATION_900 = "ccms.900.001.02";
	public static String OPERATION_903 = "ccms.903.001.02";
	public static String OPERATION_906 = "ccms.906.001.01";
	public static String OPERATION_907 = "ccms.907.001.02";
	public static String OPERATION_911 = "ccms.911.001.02";
	public static String OPERATION_913 = "ccms.913.001.01";
	public static String OPERATION_915 = "ccms.915.001.01";
	public static String OPERATION_916 = "ccms.916.001.01";
	public static String OPERATION_917 = "ccms.911.001.02";
	public static String OPERATION_919 = "ccms.919.001.01";
	public static String OPERATION_921 = "ccms.921.001.01";
	public static String OPERATION_926 = "ccmc.926.001.01";
	public static String OPERATION_990 = "ccms.990.001.01";
	public static String OPERATION_CCMS_990_001_02 = "ccms.990.001.02";
	public static String OPERATION_991 = "ccms.991.001.01";
	public static String OPERATION_992 = "ccms.992.001.01";

	public static OpInfo OPINFO_101 = new OpInfo(TestDummy.OPERATION_101, "A100", "01000");
	public static OpInfo OPINFO_102 = new OpInfo(TestDummy.OPERATION_102, "B100", "01000");
	public static OpInfo OPINFO_601 = new OpInfo(TestDummy.OPERATION_601, "C100", "01000");

	public static OpInfo OPINFO_111 = new OpInfo(TestDummy.OPERATION_111, "A202", "05003");
	// public static OpInfo OPINFO_111 = new OpInfo(TestDummy.OPERATION_111,
	// "A100", "02101");
	public static OpInfo OPINFO_604 = new OpInfo(TestDummy.OPERATION_604, "", "");

	public final static String FILE_A = "D:/bankConnector/source/bin/runBC-A-config-FILE.xml";

	public void testLoadConfigure() {
		try {
			System.out.println("testLoadConfigure...");

			// XmlCfgReader instance =
			// XmlCfgReader.getInstance(XmlCfgReader.FILESTORE);

			XmlCfgReader instance = XmlCfgReader.getInstance(FILE_A);

			System.out.println("size of protocols: " + instance.getDataHolder().listProtocol.size());
			System.out.println("size of operations: " + instance.getDataHolder().listOperation.size());
			System.out.println("size of listTransIns: " + instance.getDataHolder().listTransIn.size());
			// System.out.println("protocol belong to peration: "+
			// (instance.listOperation.get(0).getProtocol()==instance.listProtocol.get(0)));
			//

		} catch (Exception ex) {
			ex.printStackTrace();
		}
	};

	public void testDumpConfigure() {
		try {
			System.out.println("serialize configuration...");
			XmlCfgReader instance = new XmlCfgReader(XmlCfgReader.FILESTORE);
			// build the dummy data for testing

			// transportInfo
			OmCfgTransInAMQ ti1 = new OmCfgTransInAMQ();
			ti1.setName("PREFIX_HOST_AMQ");
			ti1.setProvider(JMS_PROVIDER_AMQ);
			ti1.setPrefix(PREFIX_HOST_AMQ);
			ti1.setBrokerUrl(BROKER_URL_HOST);
			instance.getDataHolder().listTransIn.add(ti1);

			OmCfgTransInAMQ ti2 = new OmCfgTransInAMQ();
			ti2.setName("PREFIX_PARTNER_AMQ");
			ti2.setProvider(JMS_PROVIDER_AMQ);
			ti2.setPrefix(PREFIX_PARTNER_AMQ);
			ti2.setBrokerUrl(BROKER_URL_PARTNER);
			instance.getDataHolder().listTransIn.add(ti2);

			OmCfgTransInJetty ti3 = new OmCfgTransInJetty();
			ti3.setName("PREFIX_HOST_JETTY");
			ti3.setProvider(HTTP_PROVIDER_JETTY);
			ti3.setPrefix(PREFIX_HOST_JETTY);
			instance.getDataHolder().listTransIn.add(ti3);

			// protocol
			OmCfgProtocol protocol = new OmCfgProtocol();
			protocol.setName("PROTOCOL_CNAPS2");
			protocol.setName(PROTOCOL_CNAPS2);
			// protocol.setUpSendAckToPP(BOOLEAN_FALSE);
			// protocol.setDownRecievePPAck(BOOLEAN_FALSE);
			instance.getDataHolder().listProtocol.add(protocol);

			// operation

			OmCfgOperation opn1 = new OmCfgOperation();
			opn1.setName(OPERATION_101);
			opn1.setProtocol(protocol);
			// opn1.setUpIsEnabled(BOOLEAN_TRUE);
			// opn1.setUpReplyType(OP_REPLY_TYPE_ASYNC);
			// opn1.setUpIsReply(BOOLEAN_FALSE);
			// opn1.setDownIsEnabled(BOOLEAN_TRUE);
			// opn1.setDownReplyType(OP_REPLY_TYPE_ASYNC);
			// opn1.setDownIsReply(BOOLEAN_FALSE);
			instance.getDataHolder().listOperation.add(opn1);

			OmCfgOperation opn2 = new OmCfgOperation();
			opn2.setName(OPERATION_102);
			opn2.setProtocol(protocol);
			// opn2.setUpIsEnabled(BOOLEAN_TRUE);
			// opn2.setUpReplyType(OP_REPLY_TYPE_NOTIFY);
			// opn1.setUpIsReply(BOOLEAN_TRUE);
			// opn2.setDownIsEnabled(BOOLEAN_FALSE);
			instance.getDataHolder().listOperation.add(opn2);

			OmCfgOperation opn3 = new OmCfgOperation();
			opn3.setName(OPERATION_601);
			opn3.setProtocol(protocol);
			// opn3.setUpIsEnabled(BOOLEAN_FALSE);
			// opn3.setDownIsEnabled(BOOLEAN_TRUE);
			// opn3.setDownReplyType(OP_REPLY_TYPE_NOTIFY);
			// opn1.setDownIsReply(BOOLEAN_TRUE);
			instance.getDataHolder().listOperation.add(opn3);

			// Inport
			OmCfgPortIn ip1 = new OmCfgPortIn();
			ip1.setName("QUEUE_UP_IN_ECHO");
			// ip1.setTransportInfo(ti1);
			ip1.setUrl(QUEUE_UP_IN_ECHO);
			ip1.setDirection(DIRECTION_UP);
			ip1.setProtocol(protocol);
			instance.getDataHolder().listInPort.add(ip1);

			OmCfgPortIn ip2 = new OmCfgPortIn();
			ip2.setName("HTTPURL_UP_IN_ECHO");
			// ip2.setTransportInfo(ti3);
			ip2.setUrl(HTTPURL_UP_IN_ECHO);
			ip2.setDirection(DIRECTION_UP);
			ip2.setProtocol(protocol);
			instance.getDataHolder().listInPort.add(ip2);

			// OutPort
			OmCfgPortOut op1 = new OmCfgPortOut();
			// op1.setTransportInfo(ti2);
			op1.setUrl(QUEUE_UP_OUT_ECHO);
			op1.setName("QUEUE_UP_OUT_ECHO");
			op1.setDirection(DIRECTION_UP);
			instance.getDataHolder().listOutPort.add(op1);

			// nodes
			OmCfgNode host1 = new OmCfgNode();
			host1.setName("host1");
			host1.setType(NODETYPE_HOST);
			// host1.setIdentity("host1");
			instance.getDataHolder().listNode.add(host1);

			OmCfgNode host2 = new OmCfgNode();
			host2.setName("host2");
			host2.setType(NODETYPE_HOST);
			// host2.setIdentity("host2");
			instance.getDataHolder().listNode.add(host2);

			OmCfgNode partner1 = new OmCfgNode();
			partner1.setName("partner1");
			partner1.setType(NODETYPE_PARTNER);
			// partner1.setIdentity("partner1");
			instance.getDataHolder().listNode.add(partner1);

			OmCfgRouteRule rr1 = new OmCfgRouteRule();
			rr1.setName("rr1");
			rr1.setOperationMask("ibps.");
			rr1.setOutPort(op1);
			rr1.setSequence(1);
			// rr1.setInPort(ip1);
			rr1.setDirection(DIRECTION_UP);
			instance.getDataHolder().listRouteRule.add(rr1);
			Strategy strategy = new CycleStrategy("id", "ref");
			Serializer serializer = new Persister(strategy);

			File result = new File(XmlCfgReader.FILESTORE);

			serializer.write(instance, result);
			System.out.println("Done");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public static class DataHolder {
		@ElementMap(entry = "config", key = "key", attribute = true, inline = true, required = false)
		private Map<String, Object> config = new HashMap<String, Object>();

		public Map<String, Object> getConfig() {
			return config;
		}

		public void setConfig(Map<String, Object> config) {
			this.config = config;
		}

	}

	public void testHandleMap() {
		try {
			DataHolder dh = new DataHolder();
			Map<String, Object> obj = dh.getConfig();
			obj.put("key1", "val1");
			obj.put("key2", "val2");
			Serializer serializer = new Persister();

			Writer out = new StringWriter();
			serializer.write(dh, out);

			String s = out.toString();

			debug("s=" + s);

			System.out.println("Done");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void testDumpDoc() {
		try {
			System.out.println("serialize sample document...");
			// DocRoot docRoot = new DocRoot();
			// docRoot.setDocId("123");
			// docRoot.setHostIdentity("1234");
			// docRoot.setPartnerIdentity("5678");
			// docRoot.setOpName("ibps.102.001.01");
			// docRoot.setOrigDocId("");
			// String res = docRoot.toText();
			// IOUtils.write(res, new FileWriter(new
			// File(DummyCfgReader.SAMPLEDOC)));

			System.out.println("Done");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	public void testDumpAck() {
		try {
			System.out.println("serialize sample ack...");
			AckRoot ackRoot = new AckRoot();
			ackRoot.setMsgId("abc");
			ackRoot.setMsgProCd(AckRoot.MSG_PRO_CD_SUCCESS);

			String res = ackRoot.dumpToString();
			IOUtils.write(res, new FileWriter(new File(XmlCfgReader.SAMPLEACK)));
			System.out.println("Done");
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}

	private void debug(String s) {
		System.out.println(s);

	}
}
