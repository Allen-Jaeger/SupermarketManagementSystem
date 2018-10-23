package com.invoicingSystem.main.statistics.salesStatistics.domain;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
/**
 * @author Suxj
 * 销售订单统计
 * 
 **/
public class SalesStatisticsQueryDTO {
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss") 
    private Date starDate;//查询开始日期
    @DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")
    private Date endDate;//查询结束日期
    private Long shopId;//shop id
	public Date getStarDate() {
		return starDate;
	}
	public void setStarDate(Date starDate) {
		this.starDate = starDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	public Long getShopId() {
		return shopId;
	}
	public void setShopId(Long shopId) {
		this.shopId = shopId;
	}
    
    
    
}
