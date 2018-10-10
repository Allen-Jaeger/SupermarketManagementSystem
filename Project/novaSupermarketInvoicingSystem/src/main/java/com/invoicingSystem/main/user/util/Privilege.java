package com.invoicingSystem.main.user.util;

/**
 * @author LiJuncong
 * at 2018年9月18日
 */

public enum Privilege {
	ALL(0,"所有"),
	EDIT_WAREHOUSE(1,"编辑仓库"),
	DIAGRAMS(2,"查看统计记录"),
	EDIT_USER(3,"编辑所有用户信息"),
	COMFIRM_INDENT(4,"确认货物入库"),
	EDIT_COMMODITY(5,"编辑商品信息"),	
	EDIT_INDENT(6,"编辑运货单"),
	CHECK_INDENT(7,"审批采购单"),
	LOOK_INDENT(8,"查看采购单"),
	CHANGE_SHOP_COMMODITY(9,"修改商店在售量"),
	CHANGE_WAREHOUSE_COMMODITY(10,"修改库存量"),
	EDIT_SHOP(11,"编辑商店"),
	EDIT_CARD(12,"编辑会员卡");

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
