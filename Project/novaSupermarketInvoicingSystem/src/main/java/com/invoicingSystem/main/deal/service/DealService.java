package com.invoicingSystem.main.deal.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.invoicingSystem.main.deal.domain.Deal;
import com.invoicingSystem.main.deal.repository.IDealRepository;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Transactional
@Service
public class DealService implements IDealService{
	@Autowired
	IDealRepository dealRepository;
	@Override
	public void save(Deal deal) {
		// TODO Auto-generated method stub
		dealRepository.save(deal);
	}

	@Override
	public Deal findById(Long id) {
		// TODO Auto-generated method stub
		return dealRepository.findById(id).get();
	}
	
	
}
