package com.invoicingSystem.main.shop.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

	/* 
	 * 前端显示
	 */
	@Override
	public List<Map<String, String>> getAllForMapList() {
		List<Map<String, String>> list= new ArrayList<Map<String, String>>();
		for(Shop shop : shopRepository.findAll()) {
			Map<String,String> map = new HashMap<>();
			map.put("index", shop.getId().toString());
			map.put("name", shop.getName());
			list.add(map);
		}
		return list;
	}

}
