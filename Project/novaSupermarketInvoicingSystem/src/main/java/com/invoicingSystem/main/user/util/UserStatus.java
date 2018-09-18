package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum UserStatus {

	NORMAL(1,"正常的"),
	FROZEN(2,"冻结的"),
	LAIDOFF(3,"被解雇的");

	private final int index;
	private final String mean;
	private UserStatus(int index,String mean) {
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
