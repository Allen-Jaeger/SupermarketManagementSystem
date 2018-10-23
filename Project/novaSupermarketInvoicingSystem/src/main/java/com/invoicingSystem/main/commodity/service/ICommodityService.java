package com.invoicingSystem.main.commodity.service;


import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;
import org.springframework.web.multipart.MultipartFile;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.commodity.util.CommodityType;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface ICommodityService {
	public void save(Commodity commodity);
	public Commodity findById(Long id);
	public Page<Commodity> findAll(Pageable pageable);
	Page<Commodity> findAll(@Nullable Specification<Commodity> spec, Pageable pageable);
	public Page<Commodity> findCommodities(CommodityStatus commodityStatus,Pageable pageable); 
	public Page<Commodity> findCommoditiesByIndentId(Long indentId,Pageable pageable); 
	public Commodity findByIndentIdAndCommodityName(Long indentId,String commodityName);
	public String writePic(Commodity commodity, MultipartFile pic);
	public List<Commodity> findAllByBarcode(Long barcode);
	public Commodity findComModelByBarcode(Long barCode);
	public String deleteComModel(Long barcode);
	public void deleteAll(List<Commodity> commodities);
	public Page<Commodity> findAllStock(Pageable pageable);


	public Page<Commodity> findByCommodityType(Integer commodityType,Pageable pageable);

	public Commodity findByBarCodeAndExpDateFromWareHouse(Long wareHouseId,Long barCode,Date ExpDate);
	public Commodity findByBarCodeAndExpDateFromShop(Long shopId,Long barCode,Date ExpDate);

	public String deleteById(Long id);
}
