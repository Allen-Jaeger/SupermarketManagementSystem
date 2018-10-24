package com.invoicingSystem.main.order.repository;

import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.invoicingSystem.main.order.domain.OrderInfo;

@Repository
public interface OrderInfoRepository extends JpaRepository<OrderInfo, Long>{
	
	//季度查询
	@Query(value="select CONCAT(YEAR(pay_time),'_',quarter(pay_time)) quarter,sum(goods_total_cost) as quarterTotalCosts, sum(order_amount) as quarterTotalSales FROM t_order_info WHERE shop_id = :shopid and pay_time BETWEEN :starDate AND :endDate group by quarter",nativeQuery=true)
	public List<Object> findAllSalesByQuarter(@Param("shopid") Long shopid,@Param("starDate") Date starDate,@Param("endDate") Date endDate);
	//月份查询
	@Query(value="SELECT  date_format(pay_time, '%Y-%m')month ,sum(goods_total_cost) as mothTotalCosts, sum(order_amount) as mothTotalSales FROM t_order_info WHERE shop_id = :shopid and pay_time BETWEEN :starDate AND :endDate group by date_format(pay_time, '%Y-%m')",nativeQuery=true)
	public List<Object> findAllSalesByMonth(@Param("shopid") Long shopid,@Param("starDate") Date starDate,@Param("endDate") Date endDate);
	//查询时间段的所有销售订单
	@Query("select orderId,payTime,goodsTotalCost,orderAmount from OrderInfo orderInfo where orderInfo.shopId = :shopid and orderInfo.payTime BETWEEN :starDate AND :endDate")
	public List<Object> findAllSalesByDates(@Param("shopid") Long shopid,@Param("starDate") Date starDate,@Param("endDate") Date endDate);

}
