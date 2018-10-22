package com.invoicingSystem.main.statistics.purchaseStatistics.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Join;
import javax.persistence.criteria.JoinType;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.apache.commons.lang.StringUtils;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.indent.domain.Indent;
import com.invoicingSystem.main.indent.util.IndentType;
import com.invoicingSystem.main.warehouse.domain.Warehouse;

/**
 * @author Suxj
 * 采购订单统计
 * 动态查询
 **/
public class PurchaseStatisticsQueryDTO {
	@DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss") 
    private Date createTimeStart;//查询开始日期
    @DateTimeFormat(pattern="yyyy/MM/dd HH:mm:ss")
    private Date createTimeEnd;//查询结束日期
    private IndentType indentType = IndentType.PURCHASE;//采购单
    private Long warehouseId;//towarehouse id
//    private String commodityName;//商品名称
//    private Long barCode;//商品条形码
   
    public PurchaseStatisticsQueryDTO() {}
	public Date getCreateTimeStart() {
		return createTimeStart;
	}
	public void setCreateTimeStart(Date createTimeStart) {
		this.createTimeStart = createTimeStart;
	}
	public Date getCreateTimeEnd() {
		return createTimeEnd;
	}
	public void setCreateTimeEnd(Date createTimeEnd) {
		this.createTimeEnd = createTimeEnd;
	}
	public IndentType getIndentType() {
		return indentType;
	}
	public void setIndentType(IndentType indentType) {
		this.indentType = indentType;
	}
	public Long getWarehouseId() {
		return warehouseId;
	}
	public void setWarehouseId(Long warehouseId) {
		this.warehouseId = warehouseId;
	}
//	public String getCommodityName() {
//		return commodityName;
//	}
//	public void setCommodityName(String commodityName) {
//		this.commodityName = commodityName;
//	}
//	public Long getBarCode() {
//		return barCode;
//	}
//	public void setBarCode(Long barCode) {
//		this.barCode = barCode;
//	}
    
    //某仓库全部商品采购
	public static Specification<Indent> buildSpecification(final PurchaseStatisticsQueryDTO queryDTO){
		return new Specification<Indent>() {
	       @Override
	        public Predicate toPredicate(Root<Indent> root, CriteriaQuery<?> query, CriteriaBuilder cb) {
	        	//1.初始化查询条件列表
	            List<Predicate> predicate = new ArrayList<Predicate>();

//	            if(StringUtils.isBlank(queryDTO.getCommodityName())&&queryDTO.getBarCode()==null){}//前台选择全部商品选项
//	            if (queryDTO.getBarCode()!=null) {
////	            	Join<Commodity,Indent> Join = root.join("indent",JoinType.LEFT);
////                	predicate.add(
//////                			cb.equal(root.get("toWarehouse").get("id").as(Long.class), queryDTO.getWarehouseId())
////		                	cb.equal(Join.get("barCode").as(Long.class), queryDTO.getBarCode())
////	                );
//                	
////                	Join<Indent,Commodity> commodityJoin = root.join(root.getModel().getSingularAttribute("indent", Commodity.class),JoinType.LEFT);
//	            	Join<Indent, Commodity> commodityJoin = root.join(root.getModel().getList("commodities", Commodity.class),JoinType.LEFT);
//	            	predicate.add(
//                			cb.equal(commodityJoin.get("barCode").as(Long.class), queryDTO.getBarCode())
//                	);
//                	
//				}
//	            if(StringUtils.isNotBlank(queryDTO.getCommodityName())){
//	            	
//	            }
	            
	            if(queryDTO.getWarehouseId()!=null) {
	                Join<Warehouse,Indent> Join = root.join("toWarehouse",JoinType.LEFT);
                	predicate.add(
//                			cb.equal(root.get("toWarehouse").get("id").as(Long.class), queryDTO.getWarehouseId())
		                	cb.equal(Join.get("id").as(Long.class), queryDTO.getWarehouseId())
	                );
                }
	            
	            
                
                if(queryDTO.getIndentType()!=null) {
                	predicate.add(
	                		cb.equal(root.get("indentType").as(IndentType.class), queryDTO.getIndentType())
	                );
                }
                
                if(queryDTO.getCreateTimeStart()!=null&&queryDTO.getCreateTimeEnd()!=null) {
                	predicate.add(
	                		cb.between(root.get("createDate").as(Date.class), queryDTO.getCreateTimeStart(), queryDTO.getCreateTimeEnd())
	                );
                }
          
            
	          
	            Predicate[] pre = new Predicate[predicate.size()];
//	            return query.where(predicate.toArray(pre)).getRestriction();
	            return cb.and(predicate.toArray(pre));
	        }
	    };
	}
    
    

}
