package com.invoicingSystem.main.commodity.domain;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;

import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;
import com.invoicingSystem.main.warehouse.domain.Warehouse;
import com.invoicingSystem.main.warehouse.repository.IWarehouseRepository;


/**
* @author Lzy
* @version 创建时间：2018年9月26日 上午9:12:33
* 类说明 : 动态查询DTO类
*
*/

/**
 * @author wzh
 * at 2018年9月27日 上午10:15:59
 * 添加动态查询
 */
public class CommodityQueryDTO {

    private CommodityType commodityType;//商品类型
    private Warehouse warehouse;
    private Long warehouseId;
    private CommodityStatus commodityStatus;
    
    public CommodityType getCommodityType() {
        return commodityType;
    }
    public void setCommodityType(CommodityType commodityType) {
        this.commodityType = commodityType;
    }
    
    public Long getWarehouseId() {
        return warehouseId;
    }
    public void setWarehouseId(Long warehouseId) {
        this.warehouseId = warehouseId;
    }
    
    public Warehouse getWarehouse() {
        return warehouse;
    }
    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public CommodityStatus getCommodityStatus() {
		return commodityStatus;
	}
	public void setCommodityStatus(CommodityStatus commodityStatus) {
		this.commodityStatus = commodityStatus;
	}
	
	
	
	@SuppressWarnings({ "serial"})
    public static Specification<Commodity> getWhereClause(final CommodityQueryDTO commodityQueryDTO) {
        return new Specification<Commodity>() {
            @Override
            public Predicate toPredicate(Root<Commodity> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
            	
                List<Predicate> predicate = new ArrayList<>();
        
                if (null!=commodityQueryDTO.getCommodityType()) {
                    predicate.add(criteriaBuilder.equal(root.get("commodityType").as(CommodityType.class),
                            commodityQueryDTO.getCommodityType()));
                }
                
                if (null!=commodityQueryDTO.getCommodityStatus()) {
                    predicate.add(criteriaBuilder.equal(root.get("commodityStatus").as(CommodityStatus.class),
                            commodityQueryDTO.getCommodityStatus()));
                }
                
                if (null!=commodityQueryDTO.getWarehouse()) {//在实体读取数据库是读取不到warehouse的相关信息...
                    predicate.add(criteriaBuilder.equal(root.get("warehouse").as(Warehouse.class),
                            commodityQueryDTO.getWarehouse()));
                }

                Predicate[] pre = new Predicate[predicate.size()];
                return query.where(predicate.toArray(pre)).getRestriction();
            }
        };
    }


    
}
