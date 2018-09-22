package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum Gender {
	MALE(1,"男"),FEMALE(2,"女");
	private final int index;
	private final String mean;
	private Gender(int index,String mean) {
		this.index = index;
		this.mean = mean;
	}
	
	/**
	 * 返回枚举中文说明
	 * @return
	 */
	public String getChineseName() {
		return mean;
	}
	public int getIndex() {
		return index;
	}
	
	/**
	 * 按照index的值返回对应枚举
	 * @param index
	 * @return
	 */
	public static Gender getFromInt(int index) {
		for(Gender gender: Gender.values()) {
			if(gender.getIndex() == index) {
				return gender;
			}
		}
		return null;
	}
}
