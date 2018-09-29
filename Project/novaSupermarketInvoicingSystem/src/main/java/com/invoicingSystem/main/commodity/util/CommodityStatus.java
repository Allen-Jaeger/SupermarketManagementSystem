package com.invoicingSystem.main.commodity.util;

/**
 * @author LiJuncong
 * at 2018年9月20日
 */

public enum CommodityStatus {
	PURCHASING(0,"采购中"),
	UNSALEABLE(1,"不可售的"),
	SALEABLE(2,"可售的"),
	SOLD(3,"已经出售的"),
	/**
	 * 以下两种状态供进货和管理商品模板使用
	 */
	ALLOW(4,"允许进货"),
	UNALLOWED(5,"不允许进货");

	private final int index;
	private final String mean;
	private CommodityStatus(int index,String mean) {
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
