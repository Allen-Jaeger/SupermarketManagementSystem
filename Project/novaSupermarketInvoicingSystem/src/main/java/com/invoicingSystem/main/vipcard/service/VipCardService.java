package com.invoicingSystem.main.vipcard.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.vipcard.domain.VipCard;
import com.invoicingSystem.main.vipcard.repository.IVipCardRepository;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Transactional
@Service
public class VipCardService implements IVipCardService{
	@Autowired
	IVipCardRepository vipCardRepository;
	
	@Override
	public void save(VipCard vipCard) {
		// TODO Auto-generated method stub
		vipCardRepository.save(vipCard);
	}

	@Override
	public VipCard findById(Long id) {
		// TODO Auto-generated method stub
		return vipCardRepository.findById(id).get();
	}

}
