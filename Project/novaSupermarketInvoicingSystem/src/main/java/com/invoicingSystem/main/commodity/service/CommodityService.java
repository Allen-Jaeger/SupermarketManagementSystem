package com.invoicingSystem.main.commodity.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.repository.ICommodityRepository;
import com.invoicingSystem.main.commodity.util.CommodityStatus;
import com.invoicingSystem.main.common.web.ExtjsPageRequest;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Transactional
@Service
public class CommodityService implements ICommodityService {
	@Autowired
	ICommodityRepository commodityRepository;
	@Override
	public void save(Commodity commodity) {
		// TODO Auto-generated method stub
		commodityRepository.save(commodity);
	}

	@Override
	public Commodity findById(Long id) {
		// TODO Auto-generated method stub
		return commodityRepository.findById(id).get();
	}

	@Override
	public Page<Commodity> findAll(Pageable pageable) {
		
		return commodityRepository.findAll(pageable);
	}

	@Override
	public Page<Commodity> findAll(Specification<Commodity> spec, Pageable pageable) {
		// TODO Auto-generated method stub
		return commodityRepository.findAll(spec,pageable);
	}

	@Override
	public Page<Commodity> findCommodities(CommodityStatus commodityStatus,Pageable pageable) {
	
		return commodityRepository.findCommodities(commodityStatus, pageable);
	}

	@Override
	public Page<Commodity> findCommoditiesByIndentId(Long indentId, Pageable pageable) {
		
		return commodityRepository.findCommoditiesByIndentId(indentId,pageable); 
	}

	@Override
	public Commodity findByIndentIdAndCommodityName(Long indentId, String commodityName) {
		
		return (Commodity) commodityRepository.findByIndentIdAndCommodityName(indentId, commodityName);
	}

	
	
	
	
	

}
