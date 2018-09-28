package com.invoicingSystem.main.commodity.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.lang.Nullable;

import com.invoicingSystem.main.commodity.domain.Commodity;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface ICommodityService {
	public void save(Commodity commodity);
	public Commodity findById(Long id);
	public Page<Commodity> findAll(Pageable pageable);
	Page<Commodity> findAll(@Nullable Specification<Commodity> spec, Pageable pageable);
	public Page<Commodity> findCommodities(Pageable pageable); 
}
