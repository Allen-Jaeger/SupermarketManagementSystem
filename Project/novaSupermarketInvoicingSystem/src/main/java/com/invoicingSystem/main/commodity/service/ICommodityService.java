package com.invoicingSystem.main.commodity.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;

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
	public void deleteAll(List<Commodity> commodities);
}
