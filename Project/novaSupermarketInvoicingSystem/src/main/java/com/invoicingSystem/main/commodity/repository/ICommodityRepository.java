package com.invoicingSystem.main.commodity.repository;


import java.util.Date;
import java.util.List;

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
 * @author W.Z.H. ,LiJuncong
 * at 2018年9月27日 上午10:15:18
 * 继承JpaSpecificationExecutor
 */
public interface ICommodityRepository extends PagingAndSortingRepository<Commodity, Long>,JpaSpecificationExecutor<Commodity>{

	@Query("from Commodity commodity where commodity.commodityStatus =?1")
	public Page<Commodity> findCommodities(CommodityStatus commodityStatus, Pageable pageable);

	@Query("from Commodity commodity where commodity.indent.id =?1")
	public Page<Commodity> findCommoditiesByIndentId(Long indentId, Pageable pageable);

	@Query("from Commodity commodity where commodity.indent.id =?1 and commodity.name = ?2")
	public Commodity findByIndentIdAndCommodityName(Long indentId, String commodityName);

	@Query("from Commodity commodity where commodity.barCode=?1")
	public List<Commodity> findAllByBarcode(Long barCode);
	
	@Query("from Commodity commodity where commodity.barCode=?1 "
			+ "AND (commodity.commodityStatus=?2 OR commodity.commodityStatus=?3)")
	public Commodity findComModelByBarcode(Long barCode, CommodityStatus s1,CommodityStatus s2);

	@Query("from Commodity commodity where commodity.commodityStatus IS NOT ?2 AND commodity.commodityStatus IS NOT ?1")
	public Page<Commodity> findAllStock(CommodityStatus s1,CommodityStatus s2,Pageable pageable);
	
	@Query("from Commodity commodity where commodity.commodityStatus=2 and commodity.warehouse.id =?1 and commodity.barCode = ?2 and commodity.period=?3")
    public Commodity findByBarCodeAndExpDateFromWareHouse(Long wareHouseId,Long barCode,Date ExpDate);
	
	@Query("from Commodity commodity where commodity.commodityStatus=2 and commodity.shop.id =?1 and commodity.barCode = ?2 and commodity.period=?3")
    public Commodity findByBarCodeAndExpDateFromShop(Long shopId,Long barCode,Date ExpDate);
	
	public Page<Commodity> findByCommodityType(CommodityType commodityType,Pageable pageable);
}
