package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum UserType {
	SUPER_MANAGER(1,"超级管理员"),
	PURCHASER(2,"采购员"),
	KEEPER(3,"仓库管理员"),
	STORE_MANAGER(4,"门店管理员"),
	SALESMAN(5,"销售员");
	
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
