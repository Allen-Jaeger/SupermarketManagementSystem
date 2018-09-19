package com.invoicingSystem.main.shop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.invoicingSystem.main.shop.domain.Shop;
import com.invoicingSystem.main.shop.repository.IShopRepository;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */
@Service
@Transactional
public class ShopService implements IShopService{

	@Autowired
	IShopRepository shopRepository;
	
	@Override
	public void save(Shop shop) {
		// TODO Auto-generated method stub
		shopRepository.save(shop);
	}

	@Override
	public Shop findById(Long id) {
		// TODO Auto-generated method stub
		return shopRepository.findById(id).get();
	}

}
