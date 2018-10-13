package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum UserType {
	SUPER_MANAGER(0,"超级管理员"),
	PURCHASER(1,"采购员"),
	KEEPER(2,"仓库管理员"),
	STORE_MANAGER(3,"门店管理员"),
	SALESMAN(4,"销售员");
	
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
	
//	已经利用反射+泛型实现
//	public static List<Map<String,String>> allToMap(){
//		List<Map<String,String>> list = new ArrayList<>();
//		for(UserType userType: UserType.values()) {
//			Map<String, String> map = new HashMap<>();
//			map.put("index", String.valueOf(userType.index));
//			map.put("name", userType.mean);
//			list.add(map);
//		}
//		return list;
//	}
}
