package com.invoicingSystem.main.indent.util;

/**
 * @author LiJuncong
 * at 2018年9月20日
 */

public enum IndentType {
	
	PURCHASE(1,"采购"),
	TRANSPORT(2,"内部调货"),
	TO_SHOP(3,"送货到门店"),
	RETREAT(4,"撤货回仓库");
	
	private final int index;
	private final String mean;
	private IndentType(int index,String mean) {
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
