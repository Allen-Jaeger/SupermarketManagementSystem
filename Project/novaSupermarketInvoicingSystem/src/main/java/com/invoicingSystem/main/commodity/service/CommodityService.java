package com.invoicingSystem.main.commodity.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invoicingSystem.main.commodity.domain.Commodity;
import com.invoicingSystem.main.commodity.repository.ICommodityRepository;

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

}