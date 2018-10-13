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
	 * 洗护清洁
	 */
	DAILY(2,"清洁洗护"),
	/**
	 * 电器
	 */
	ELETRICAL(3,"家电数码"),
	/**
	 * 厨房用品
	 */
	COOKER(4,"厨房用品"),
	/**
	 * 美容首饰
	 */
	BATH(5,"首饰美容"),
	/**
	 * 玩具母婴
	 */
	INFANT(6,"玩具母婴"),
	/**
	 * 果蔬生鲜
	 */
	FRESH(7,"果蔬生鲜"),
	/**
	 * 时装箱包
	 */
	DRESS(8,"时装箱包"),
	/**
	 * 家具摆饰
	 */
	FURNITURE(9,"家具摆饰"),
	/**
	 *  体育棋牌
	 */
	SPORT(10,"体育棋牌"),
	/**
	 *  文具书簿
	 */
	STUDY(11,"文具书簿"),
	/**
	 * 其他;
	 */
	ELSE(12,"其他");
	
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
