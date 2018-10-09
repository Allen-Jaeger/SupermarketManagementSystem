package com.invoicingSystem.main.shop.service;

import java.util.List;
import java.util.Map;

import com.invoicingSystem.main.shop.domain.Shop;

/**
 * @author LiJuncong
 * at 2018年9月19日
 */

public interface IShopService {
	public void save(Shop shop);
	public Shop findById(Long id);
	public List<Map<String,String>> getAllForMapList();
}
