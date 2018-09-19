package com.invoicingSystem.main.indent.util;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public enum IndentStatus {
	INIT(1,"初始化"),
	CHECKING(2,"审核中"),
	APPROVED(3,"审核通过/提货中"),	//货物在采购员手中
	EXTRACTING(4,"入库清点中"),		//货物在仓库管理员手中
	FINISHED(5,"订单完成"),
	ERROR(6,"订单异常");

	private final int index;
	private final String mean;
	private IndentStatus(int index,String mean) {
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
