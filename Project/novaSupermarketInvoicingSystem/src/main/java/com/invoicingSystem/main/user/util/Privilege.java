package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum Privilege {
	ALL(1,"所有"),
	DIAGRAMS(2,"查看统计记录"),
	EDIT_USER(3,"编辑所有用户信息"),
	EDIT_SELF(4,"编辑个人信息"),
	EDIT_COMMODITY(5,"编辑商品信息"),	
	EDIT_INDENT(6,"编辑采货单"),
	CHECK_INDENT(7,"审批采购单"),
	LOOK_INDENT(8,"查看采购单"),
	CHANGE_SHELF(9,"修改货架在售量"),
	CHANGE_WAREHOUSE(10,"修改库存量");

	private final int index;
	private final String mean;
	private Privilege(int index,String mean) {
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
