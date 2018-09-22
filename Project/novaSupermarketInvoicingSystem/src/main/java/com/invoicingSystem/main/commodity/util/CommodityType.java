package com.invoicingSystem.main.commodity.util;

/**
 * @author LiJuncong
 * at 2018年9月22日
 */

public enum CommodityType {

	/**
	 * 粮油零食
	 */
	FOOD(1,"粮油零食"),
	/**
	 * 酒水饮料
	 */
	DRINK(2,"酒水饮料"),
	/**
	 * 家居清洁
	 */
	DAILY(3,"家居清洁"),
	/**
	 * 电器
	 */
	ELETRICAL(4,"电器"),
	/**
	 * 厨房用品
	 */
	COOKER(5,"厨房用品"),
	/**
	 * 美容洗浴
	 */
	BATH(6,"美容洗浴"),
	/**
	 * 母婴用品
	 */
	INFANT(7,"母婴用品"),
	/**
	 * 果蔬生鲜
	 */
	FRESH(8,"果蔬生鲜");
	
	
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
