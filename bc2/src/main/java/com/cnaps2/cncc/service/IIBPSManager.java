package com.cnaps2.cncc.service;

import java.util.Hashtable;
import java.util.List;

import com.topfinance.db.dao.DbException;
import com.topfinance.db.dao.IBaseManager;

public interface IIBPSManager extends IBaseManager{

	//获得MsgTree列表
	public List getMsgTree() throws DbException;

	//获得MsgList列表
	public List getMsgList() throws DbException;

	//获得IBPS101列表
	public List getList(Class msg) throws DbException;

	//获得列表中文定义
	public Hashtable getColumnDef(String tableName) throws DbException;

}