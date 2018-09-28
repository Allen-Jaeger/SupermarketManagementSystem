package com.invoicingSystem.main.commodity.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;


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


    
    private CommodityType commodityType;//货单类型
   
    
    
    public CommodityType getCommodityType() {
        return commodityType;
    }
    public void setCommodityType(CommodityType commodityType) {
        this.commodityType = commodityType;
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
                
                
                Predicate[] pre = new Predicate[predicate.size()];
                return query.where(predicate.toArray(pre)).getRestriction();
            }
        };
    }
    
}
