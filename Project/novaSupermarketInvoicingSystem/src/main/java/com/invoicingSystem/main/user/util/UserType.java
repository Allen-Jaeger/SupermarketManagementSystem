package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum UserType {
	SUPER_MANAGER(1,"超级管理员"),
	PURCHASER(2,"采购员"),
	KEEPER(3,"仓库管理员"),
	STORE_MANAGER(4,"门店管理员"),
	SALESMAN(5,"销售员");
	
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
	public static String allToJsonString() {
		StringBuffer strBf = new StringBuffer();
//		strBf.append("{");
		for(UserType userType: UserType.values()) {
			strBf.append("{");
			strBf.append(" \"index\": \""+userType.index+"\", ");
			strBf.append(" \"name\": \""+userType.mean+"\" ");
			strBf.append("},");
		}
		strBf.deleteCharAt(strBf.length()-1);
//		strBf.append("}");
		return strBf.toString();
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
