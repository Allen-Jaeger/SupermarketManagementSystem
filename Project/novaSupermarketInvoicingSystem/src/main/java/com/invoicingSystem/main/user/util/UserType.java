package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum UserType {
	MANAGER(1,"超级管理员"),
	PURCHASER(2,"采购员"),
	KEEPER(3,"货品管理员"),
	SALESMAN(4,"销售员");
	
	private final int index;
	private final String mean;
	private UserType(int index,String mean) {
		this.index = index;
		this.mean = mean;
	}
	public String getChineseName() {
		return mean;
	}
	public int getIndex() {
		return index;
	}
}
