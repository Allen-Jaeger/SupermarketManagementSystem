package com.invoicingSystem.main.commodity.util;

/**
 * @author LiJuncong
 * at 2018年9月20日
 */

public enum CommodityStatus {
	PURCHASING(1,"采购中"),
	UNSALEABLE(2,"不可售的"),
	SALEABLE(2,"可售的"),
	SOLD(4,"已经出售的");

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
