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
import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.warehouse.domain.Warehouse;


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

/**
 * @author lzy
 * at 2018年10月10日 下午16:15:00
 * 添加关于仓库与超市的商品查询
 */
public class CommodityQueryDTO {

    private CommodityType commodityType;//商品类型
    private Warehouse warehouse;
    private Shop shop;
    private Long placeId;
    private String name;
    private String searchType;
    private String placeType;
    private CommodityStatus commodityStatus;
    
    public CommodityType getCommodityType() {
        return commodityType;
    }
    public void setCommodityType(CommodityType commodityType) {
        this.commodityType = commodityType;
    }
    
    public Long getPlaceId() {
        return placeId;
    }
    public void setPlaceId(Long placeId) {
        this.placeId = placeId;
    }
    
    public Warehouse getWarehouse() {
        return warehouse;
    }
    public void setWarehouse(Warehouse warehouse) {
        this.warehouse = warehouse;
    }

    public Shop getShop() {
        return shop;
    }
    public void setShop(Shop shop) {
        this.shop = shop;
    }
    
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    
    public String getSearchType() {
        return searchType;
    }
    public void setSearchType(String searchType) {
        this.searchType = searchType;
    }
    
    public String getPlaceType() {
        return placeType;
    }
    public void setPlaceType(String placeType) {
        this.placeType = placeType;
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
                
                if (null!=commodityQueryDTO.getWarehouse()) {//在实体读取数据库是读取不到warehouse的相关信息...已解决 更改商品表.
                    predicate.add(criteriaBuilder.equal(root.get("warehouse").as(Warehouse.class),
                            commodityQueryDTO.getWarehouse()));
                }
                
                if (null!=commodityQueryDTO.getShop()) {//同上
                    predicate.add(criteriaBuilder.equal(root.get("shop").as(Shop.class),
                            commodityQueryDTO.getShop()));
                }
                
                if (null!=commodityQueryDTO.getName()&&!commodityQueryDTO.getName().equals("")) {//模糊查询要用like
                    predicate.add(criteriaBuilder.like(root.get("name").as(String.class),
                            "%"+commodityQueryDTO.getName()+"%"));
                }

                Predicate[] pre = new Predicate[predicate.size()];
                return query.where(predicate.toArray(pre)).getRestriction();
            }
        };
    }


    
}
