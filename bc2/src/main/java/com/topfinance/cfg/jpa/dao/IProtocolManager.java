package com.topfinance.cfg.jpa.dao;

import java.util.List;

import com.topfinance.cfg.jpa.JpaCfgProtocol;
import com.topfinance.db.dao.DbException;
import com.topfinance.db.dao.IBaseManager;

public interface IProtocolManager extends IBaseManager{

	//获得传输协议	
	public JpaCfgProtocol getProtocol(Integer uid) throws DbException;

	//增加传输协议
	public void addProtocol(JpaCfgProtocol o) throws DbException;

	//删除传输协议
	public void deleteProtocol(JpaCfgProtocol o) throws DbException;
	public void deleteProtocol(Integer o) throws DbException;

	//编辑传输协议
	public void editProtocol(JpaCfgProtocol o) throws DbException;

	//获得传输协议列表
	public List getAllProtocolList() throws DbException;
}