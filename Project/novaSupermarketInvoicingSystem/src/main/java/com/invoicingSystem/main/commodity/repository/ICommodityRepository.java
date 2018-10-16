package com.invoicingSystem.main.commodity.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;


/**
 * @author LiJuncong
 * at 2018年9月19日
 * 
 */

/**
 * @author wzh
 * at 2018年9月27日 上午10:15:18
 * 继承JpaSpecificationExecutor
 */
public interface ICommodityRepository extends PagingAndSortingRepository<Commodity, Long>,JpaSpecificationExecutor<Commodity>{

	 @Query("from Commodity commodity where commodity.commodityStatus =?1") 
	    public Page<Commodity> findCommodities(CommodityStatus commodityStatus,Pageable pageable); 
	
	 @Query("from Commodity commodity where commodity.indent.id =?1") 
	    public Page<Commodity> findCommoditiesByIndentId(Long indentId,Pageable pageable); 
	 
	 @Query("from Commodity commodity where commodity.indent.id =?1 and commodity.name = ?2") 
	    public Commodity findByIndentIdAndCommodityName(Long indentId,String commodityName); 

}
