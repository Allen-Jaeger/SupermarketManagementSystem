package com.invoicingSystem.main.commodity.util;

/**
 * @author LiJuncong
 * at 2018年9月22日
 */

public enum CommodityType {

	/**
	 * 粮油零食
	 */
	FOOD(0,"粮油零食"),
	/**
	 * 酒水饮料
	 */
	DRINK(1,"酒水饮料"),
	/**
	 * 家居清洁
	 */
	DAILY(2,"家居清洁"),
	/**
	 * 电器
	 */
	ELETRICAL(3,"电器"),
	/**
	 * 厨房用品
	 */
	COOKER(4,"厨房用品"),
	/**
	 * 美容洗浴
	 */
	BATH(5,"美容洗浴"),
	/**
	 * 母婴用品
	 */
	INFANT(6,"母婴用品"),
	/**
	 * 果蔬生鲜
	 */
	FRESH(7,"果蔬生鲜");
	
	
	private final int index;
	private final String mean;
	private CommodityType(int index,String mean) {
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
